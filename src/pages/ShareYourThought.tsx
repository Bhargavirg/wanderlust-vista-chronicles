import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Comment {
  id: string;
  comment_text: string;
  username: string;
  avatar_url: string;
  created_at: string;
}

interface Thought {
  id: string;
  content: string;
  username: string;
  avatar_url: string;
  created_at: string;
  likes_count: number;
  comments?: Comment[];
  user_liked?: boolean;
}

const dummyUsernames = ['alice', 'bob', 'charlie', 'dave', 'eve', 'frank', 'grace', 'henry'];
const dummyAvatars = [
  'https://i.pravatar.cc/40?img=1',
  'https://i.pravatar.cc/40?img=2',
  'https://i.pravatar.cc/40?img=3',
  'https://i.pravatar.cc/40?img=4',
  'https://i.pravatar.cc/40?img=5',
  'https://i.pravatar.cc/40?img=6',
  'https://i.pravatar.cc/40?img=7',
  'https://i.pravatar.cc/40?img=8',
];

const getRandomUser = () => {
  const index = Math.floor(Math.random() * dummyUsernames.length);
  return { username: dummyUsernames[index], avatarUrl: dummyAvatars[index] };
};

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

const ShareYourThought = () => {
  const { user } = useAuth();
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [newThoughtContent, setNewThoughtContent] = useState('');
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThoughts();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('thoughts-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'thoughts' }, () => {
        fetchThoughts();
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'thought_comments' }, () => {
        fetchThoughts();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'thought_likes' }, () => {
        fetchThoughts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchThoughts = async () => {
    try {
      // Fetch thoughts with comments count
      const { data: thoughtsData, error: thoughtsError } = await supabase
        .from('thoughts')
        .select(`
          *,
          thought_comments(id, comment_text, username, avatar_url, created_at),
          thought_likes(id, user_id)
        `)
        .order('created_at', { ascending: false });

      if (thoughtsError) throw thoughtsError;

      const formattedThoughts: Thought[] = thoughtsData?.map(thought => ({
        id: thought.id,
        content: thought.content,
        username: thought.username,
        avatar_url: thought.avatar_url,
        created_at: thought.created_at,
        likes_count: thought.thought_likes?.length || 0,
        comments: thought.thought_comments || [],
        user_liked: thought.thought_likes?.some((like: any) => like.user_id === user?.id) || false
      })) || [];

      setThoughts(formattedThoughts);
    } catch (error) {
      console.error('Error fetching thoughts:', error);
      toast({
        title: "Error",
        description: "Failed to load thoughts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddThought = async () => {
    if (newThoughtContent.trim() === '') return;
    
    const randomUser = getRandomUser();
    
    try {
      const { error } = await supabase
        .from('thoughts')
        .insert({
          content: newThoughtContent.trim(),
          user_id: user?.id || null,
          username: user?.email?.split('@')[0] || randomUser.username,
          avatar_url: randomUser.avatarUrl
        });

      if (error) throw error;

      setNewThoughtContent('');
      toast({
        title: "Success",
        description: "Your thought has been shared!",
      });
    } catch (error) {
      console.error('Error adding thought:', error);
      toast({
        title: "Error",
        description: "Failed to share your thought",
        variant: "destructive",
      });
    }
  };

  const handleAddComment = async (thoughtId: string) => {
    const commentText = commentInputs[thoughtId];
    if (!commentText || commentText.trim() === '') return;
    
    const randomUser = getRandomUser();
    
    try {
      const { error } = await supabase
        .from('thought_comments')
        .insert({
          thought_id: thoughtId,
          comment_text: commentText.trim(),
          user_id: user?.id || null,
          username: user?.email?.split('@')[0] || randomUser.username,
          avatar_url: randomUser.avatarUrl
        });

      if (error) throw error;

      setCommentInputs({ ...commentInputs, [thoughtId]: '' });
      toast({
        title: "Success",
        description: "Comment added!",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    }
  };

  const toggleLike = async (thoughtId: string, currentlyLiked: boolean) => {
    try {
      if (currentlyLiked) {
        // Remove like
        const { error } = await supabase
          .from('thought_likes')
          .delete()
          .match({ thought_id: thoughtId, user_id: user?.id || null });
        
        if (error) throw error;
      } else {
        // Add like
        const { error } = await supabase
          .from('thought_likes')
          .insert({
            thought_id: thoughtId,
            user_id: user?.id || null
          });
        
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading thoughts...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://i.pinimg.com/736x/0a/8b/4f/0a8b4f8c4b4a2e8c9f7e5d3a1b2c3d4e.jpg)'
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto p-6 max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Share Your Thoughts</h1>

          <div className="mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow">
            <textarea
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 text-lg bg-transparent"
              rows={4}
              placeholder="What's on your mind?"
              value={newThoughtContent}
              onChange={(e) => setNewThoughtContent(e.target.value)}
            />
            <button
              onClick={handleAddThought}
              className="mt-3 px-6 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition font-semibold"
            >
              Share Thought
            </button>
          </div>

          <div>
            {thoughts.length === 0 && (
              <p className="text-center text-white">No thoughts yet. Be the first to share your thoughts!</p>
            )}

            {thoughts.map(thought => (
              <div key={thought.id} className="mb-6 p-4 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow hover:shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition">
                <div className="flex items-start space-x-4">
                  <img src={thought.avatar_url} alt={thought.username} className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900 dark:text-gray-100">@{thought.username}</span>
                      <span className="text-gray-500 text-sm">· {formatTimeAgo(thought.created_at)}</span>
                    </div>
                    <p className="mt-1 mb-3 whitespace-pre-wrap text-gray-800 dark:text-gray-200 text-lg">{thought.content}</p>

                    <div className="flex items-center space-x-6 text-gray-500">
                      <button
                        onClick={() => toggleLike(thought.id, thought.user_liked || false)}
                        className={`flex items-center space-x-1 hover:text-red-500 transition ${thought.user_liked ? 'text-red-500' : ''}`}
                        aria-label="Like"
                      >
                        <Heart className={`w-5 h-5 ${thought.user_liked ? 'fill-current' : ''}`} />
                        <span>{thought.likes_count}</span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-5 h-5" />
                        <span>{thought.comments?.length || 0}</span>
                      </div>
                      <button className="flex items-center space-x-1 hover:text-green-500 transition">
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Comments</h4>
                      {(!thought.comments || thought.comments.length === 0) && (
                        <p className="text-gray-400 text-sm">No comments yet.</p>
                      )}
                      {thought.comments?.map(comment => (
                        <div key={comment.id} className="mb-2 flex items-start space-x-3">
                          <img src={comment.avatar_url} alt={comment.username} className="w-8 h-8 rounded-full" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-900 dark:text-gray-100">@{comment.username}</span>
                              <span className="text-gray-500 text-xs">· {formatTimeAgo(comment.created_at)}</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{comment.comment_text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent"
                        value={commentInputs[thought.id] || ''}
                        onChange={(e) =>
                          setCommentInputs({ ...commentInputs, [thought.id]: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddComment(thought.id);
                          }
                        }}
                      />
                      <button
                        onClick={() => handleAddComment(thought.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ShareYourThought;
