
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
  profiles?: { username: string; full_name: string; avatar_url: string };
}

const AllPosts = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['all-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select(`
          *,
          categories (name, slug),
          profiles (username, full_name, avatar_url)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our Post interface
      return data?.map(item => ({
        ...item,
        // Handle profiles array - take the first profile if it exists
        profiles: Array.isArray(item.profiles) && item.profiles.length > 0 
          ? item.profiles[0] 
          : item.profiles || null
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
                      name: post.profiles?.full_name || post.profiles?.username || "Anonymous",
                      avatar: post.profiles?.avatar_url || "https://i.pravatar.cc/150?img=3"
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
