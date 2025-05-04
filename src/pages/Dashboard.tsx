import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Grid3X3, List, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const [gridView, setGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // Fetch content when component mounts or user changes
  useEffect(() => {
    const fetchContent = async () => {
      if (!user) {
        setPosts([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        // Get all content for the current user
        const { data, error } = await supabase
          .from('content')
          .select(`
            *,
            category:categories(name, slug),
            author:author_id(id, profiles(username, avatar_url, full_name))
          `)
          .eq('author_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [user]);
  
  // Filter posts by search query
  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      post.title?.toLowerCase().includes(query) || 
      post.description?.toLowerCase().includes(query) ||
      post.category?.name?.toLowerCase().includes(query) ||
      post.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    );
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Manage and create your blog posts
            </p>
          </div>
          <div className="flex gap-2 flex-col sm:flex-row w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search posts..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Link to="/new-post">
                <Button variant="outline">Create Classic Post</Button>
              </Link>
              <Link to="/add-content">
                <Button>
                  <Plus className="mr-1 h-4 w-4" />
                  Create Rich Content
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredPosts.length} posts found
          </p>
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-0.5 rounded-md">
            <Button 
              variant={gridView ? "default" : "ghost"} 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setGridView(true)}
            >
              <Grid3X3 size={16} />
            </Button>
            <Button 
              variant={!gridView ? "default" : "ghost"} 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setGridView(false)}
            >
              <List size={16} />
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading your content...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            {searchQuery ? (
              <p className="text-gray-500 dark:text-gray-400">No posts found matching your search criteria.</p>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-500 dark:text-gray-400">You haven't created any content yet.</p>
                <Link to="/add-content">
                  <Button>
                    <Plus className="mr-1 h-4 w-4" />
                    Create Your First Post
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className={gridView 
              ? "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "flex flex-col gap-4"
            }
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={item}>
                <BlogCard 
                  post={{
                    id: post.id,
                    title: post.title,
                    excerpt: post.description,
                    coverImage: post.cover_image,
                    category: post.category?.slug || "nature",
                    author: {
                      name: post.author?.profiles?.full_name || post.author?.profiles?.username || "Anonymous",
                      avatar: post.author?.profiles?.avatar_url || "https://i.pravatar.cc/150?img=32"
                    },
                    publishedAt: post.created_at,
                  }} 
                  hasVideo={!!post.video_url} 
                  className={!gridView ? "md:grid md:grid-cols-2" : ""}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
