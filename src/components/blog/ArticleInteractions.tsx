
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Bookmark, Eye } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import {
  addInteraction,
  removeInteraction,
  getInteractionCounts,
  getUserInteractions,
  InteractionType
} from "@/services/interactionService";

interface ArticleInteractionsProps {
  contentId: string;
  onCommentClick: () => void;
}

const ArticleInteractions = ({ contentId, onCommentClick }: ArticleInteractionsProps) => {
  const { user } = useAuth();
  const [counts, setCounts] = useState({
    likes: 0,
    shares: 0,
    saves: 0,
    views: 0
  });
  const [userInteractions, setUserInteractions] = useState({
    liked: false,
    shared: false,
    saved: false,
    viewed: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
    
    if (user && !userInteractions.viewed) {
      handleInteraction('view');
    }
  }, [contentId, user]);

  const loadData = async () => {
    try {
      const [countsData, userInteractionsData] = await Promise.all([
        getInteractionCounts(contentId),
        user ? getUserInteractions(contentId, user.id) : Promise.resolve({
          liked: false,
          shared: false,
          saved: false,
          viewed: false
        })
      ]);
      
      setCounts(countsData);
      setUserInteractions(userInteractionsData);
    } catch (error) {
      console.error('Error loading interaction data:', error);
    }
  };

  const handleInteraction = async (type: InteractionType) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to interact with articles",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const currentlyActive = userInteractions[`${type}d` as keyof typeof userInteractions];
      
      if (currentlyActive && type !== 'view') {
        await removeInteraction(contentId, user.id, type);
        setUserInteractions(prev => ({ ...prev, [`${type}d`]: false }));
        setCounts(prev => ({ ...prev, [type + 's']: prev[type + 's' as keyof typeof prev] - 1 }));
      } else {
        await addInteraction(contentId, user.id, type);
        setUserInteractions(prev => ({ ...prev, [`${type}d`]: true }));
        setCounts(prev => ({ ...prev, [type + 's']: prev[type + 's' as keyof typeof prev] + 1 }));
      }

      if (type === 'share') {
        await navigator.share({
          title: 'Check out this article',
          url: window.location.href,
        }).catch(() => {
          navigator.clipboard.writeText(window.location.href);
          toast({
            title: "Link Copied",
            description: "Article link copied to clipboard",
          });
        });
      }

      if (type !== 'view') {
        toast({
          title: "Success",
          description: `Article ${type}${currentlyActive ? ' removed' : 'd'} successfully`,
        });
      }
    } catch (error) {
      console.error(`Error ${type}ing article:`, error);
      toast({
        title: "Error",
        description: `Failed to ${type} article`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-6 bg-gray-50 dark:bg-gray-800 rounded-lg my-6">
      <Button
        variant={userInteractions.liked ? "default" : "outline"}
        size="sm"
        onClick={() => handleInteraction('like')}
        disabled={loading}
        className="flex items-center gap-2"
      >
        <Heart className={`h-4 w-4 ${userInteractions.liked ? 'fill-current' : ''}`} />
        <span>{counts.likes}</span>
        <span className="hidden sm:inline">Like</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onCommentClick}
        className="flex items-center gap-2"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">Comment</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleInteraction('share')}
        disabled={loading}
        className="flex items-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        <span>{counts.shares}</span>
        <span className="hidden sm:inline">Share</span>
      </Button>

      <Button
        variant={userInteractions.saved ? "default" : "outline"}
        size="sm"
        onClick={() => handleInteraction('save')}
        disabled={loading}
        className="flex items-center gap-2"
      >
        <Bookmark className={`h-4 w-4 ${userInteractions.saved ? 'fill-current' : ''}`} />
        <span>{counts.saves}</span>
        <span className="hidden sm:inline">Save</span>
      </Button>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Eye className="h-4 w-4" />
        <span>{counts.views}</span>
        <span className="hidden sm:inline">views</span>
      </div>
    </div>
  );
};

export default ArticleInteractions;
