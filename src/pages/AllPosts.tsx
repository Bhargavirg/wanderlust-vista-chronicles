
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image: string;
  created_at: string;
  author_id: string;
  category_id: string;
  published: boolean;
  featured: boolean;
  views_count: number;
  likes_count: number;
  tags: string[];
  categories?: { name: string; slug: string };
  author_profiles?: { username: string; full_name: string; avatar_url: string };
}

const AllPosts = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['all-posts'],
    queryFn: async () => {
      console.log("Fetching all posts...");
      
      // First, try to get posts with author_profiles relationship
      let query = supabase
        .from('content')
        .select(`
          *,
          categories (name, slug),
          author_profiles (username, full_name, avatar_url)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      let { data, error } = await query;

      // If author_profiles doesn't work, fall back to a simpler query
      if (error && error.message.includes("author_profiles")) {
        console.log("Falling back to simpler query without author relationship");
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('content')
          .select(`
            *,
            categories (name, slug)
          `)
          .eq('published', true)
          .order('created_at', { ascending: false });
        
        data = fallbackData;
        error = fallbackError;
      }

      if (error) {
        console.error("Error fetching posts:", error);
        throw error;
      }
      
      console.log("Fetched posts data:", data);
      
      // Transform the data to match our Post interface
      return data?.map(item => ({
        ...item,
        // Handle author_profiles - could be null if relationship doesn't exist
        author_profiles: item.author_profiles || null,
        // Handle categories - Supabase returns an array but we want an object  
        categories: Array.isArray(item.categories) && item.categories.length > 0
          ? item.categories[0]
          : item.categories || null
      })) as Post[];
    },
  });

  useEffect(() => {
    console.log("AllPosts page loaded");
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.error("AllPosts error:", error);
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error loading posts</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">All Posts</h1>
            <p className="text-lg text-gray-600">
              Discover all the amazing content from our community of writers and creators.
            </p>
          </div>
          
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={{
                    id: post.id,
                    title: post.title,
                    excerpt: post.description || "",
                    coverImage: post.cover_image || "/placeholder.svg",
                    category: post.categories?.name || "Uncategorized",
                    author: {
                      name: post.author_profiles?.full_name || post.author_profiles?.username || "Anonymous",
                      avatar: post.author_profiles?.avatar_url || "https://i.pravatar.cc/150?img=3"
                    },
                    publishedAt: post.created_at,
                    readTime: "5 min read"
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts available</h3>
              <p className="text-gray-600">Be the first to create a post!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllPosts;
