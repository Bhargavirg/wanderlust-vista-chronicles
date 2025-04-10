
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { mockData } from "@/data/blogData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Grid3X3, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [gridView, setGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fix: Combine all posts from the different categories for display
  const allPosts = Object.values(mockData.byCategory || {}).flat();
  // Also include featured and recent posts
  const combinedPosts = [
    ...(mockData.featured ? [mockData.featured] : []), 
    ...(mockData.recent || []), 
    ...allPosts
  ];
  // Remove duplicates by ID
  let uniquePosts = Array.from(new Map(combinedPosts.map(post => [post?.id, post])).values()).filter(Boolean);
  
  // Filter posts by search query
  if (searchQuery) {
    uniquePosts = uniquePosts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

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
              <Link to="/add-post">
                <Button>
                  <Plus className="mr-1 h-4 w-4" />
                  Create Rich Post
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {uniquePosts.length} posts found
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
        
        {uniquePosts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">No posts found. Try changing your search criteria.</p>
          </div>
        )}
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className={gridView 
            ? "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "flex flex-col gap-4"
          }
        >
          {uniquePosts.map((post) => (
            <motion.div key={post.id} variants={item}>
              <BlogCard 
                post={post} 
                // In a real app, this would come from the post data
                hasVideo={post.id.includes("1") || post.id.includes("5")} 
                className={!gridView ? "md:grid md:grid-cols-2" : ""}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
