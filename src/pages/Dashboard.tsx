
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { mockData } from "@/data/blogData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Fix: Combine all posts from the different categories for display
  const allPosts = Object.values(mockData.byCategory).flat();
  // Also include featured and recent posts
  const combinedPosts = [
    ...(mockData.featured ? [mockData.featured] : []), 
    ...(mockData.recent || []), 
    ...allPosts
  ];
  // Remove duplicates by ID
  const uniquePosts = Array.from(new Map(combinedPosts.map(post => [post?.id, post])).values()).filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <Link to="/new-post">
            <Button>Create New Post</Button>
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {uniquePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
