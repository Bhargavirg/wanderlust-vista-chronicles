
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { mockData } from "@/data/blogData";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fix: Access posts for the specific category from the byCategory object
  const categoryPosts = category ? mockData.byCategory[category] || [] : [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <header className="py-12 md:py-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white">
            Category: {category}
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
            Explore all the articles related to {category}.
          </p>
        </div>
      </header>
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          {categoryPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>No posts found in the {category} category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
