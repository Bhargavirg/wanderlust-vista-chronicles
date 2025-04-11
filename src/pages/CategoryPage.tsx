
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { mockData } from "@/data/blogData";
import { Atom, Rocket, History, Globe, Leaf, BookOpen, Camera } from "lucide-react";
import { motion } from "framer-motion";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Access posts for the specific category from the byCategory object
  const categoryPosts = category ? mockData.byCategory[category] || [] : [];
  
  // Get category-specific header image
  const getCategoryBackground = () => {
    switch (category) {
      case "science":
        return "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "technology":
        return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "history":
        return "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "culture":
        return "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "nature":
        return "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "space":
        return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "wildlife":
        return "https://images.unsplash.com/photo-1504173010664-32509aeebb62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      default:
        return "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
    }
  };
  
  // Get category icon
  const getCategoryIcon = () => {
    switch (category) {
      case "science":
        return <Atom className="h-8 w-8" />;
      case "technology":
        return <Rocket className="h-8 w-8" />;
      case "history":
        return <History className="h-8 w-8" />;
      case "culture":
        return <Globe className="h-8 w-8" />;
      case "nature":
        return <Leaf className="h-8 w-8" />;
      case "space":
        return <BookOpen className="h-8 w-8" />;
      case "wildlife":
        return <Leaf className="h-8 w-8" />;
      default:
        return <Camera className="h-8 w-8" />;
    }
  };
  
  // Get category description
  const getCategoryDescription = () => {
    switch (category) {
      case "science":
        return "Explore the latest discoveries and scientific breakthroughs shaping our understanding of the world.";
      case "technology":
        return "Discover innovations and technological advances that are changing how we live and work.";
      case "history":
        return "Journey through time to understand our shared human past and how it shapes our present.";
      case "culture":
        return "Experience traditions and expressions from diverse communities around the world.";
      case "nature":
        return "Connect with the natural beauty and wonders of our planet's most spectacular landscapes.";
      case "space":
        return "Venture into the cosmos and unlock the mysteries of the universe beyond our atmosphere.";
      case "wildlife":
        return "Discover the amazing diversity of life on Earth and learn about conservation efforts.";
      default:
        return "Explore fascinating stories and educational content about our world.";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero header with background image - National Geographic style */}
      <header 
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ 
          backgroundImage: `url(${getCategoryBackground()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute left-0 h-full w-2 bg-yellow-400"></div>
        <div className="container relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-yellow-400 text-black">
              {getCategoryIcon()}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {category && category.charAt(0).toUpperCase() + category.slice(1)}
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl">
            {getCategoryDescription()}
          </p>
        </div>
      </header>
      
      {/* Yellow bar - National Geographic style */}
      <div className="bg-yellow-400 py-2">
        <div className="container">
          <h2 className="text-black font-bold text-lg">EXPLORE {category && category.toUpperCase()}</h2>
        </div>
      </div>
      
      <main className="flex-1 py-12">
        <div className="container">
          {categoryPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <BlogCard key={post.id} post={post} className="shadow-md hover:shadow-lg transition-all" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400 py-16">
              <Camera className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p className="text-xl font-semibold">No posts found in the {category} category.</p>
              <p className="mt-2">Check back soon for new educational content.</p>
            </div>
          )}
        </div>
      </main>
      
      {/* Related topics section */}
      {categoryPosts.length > 0 && (
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">Related Topics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Research", "Education", "Discoveries", "Perspectives"].map((topic) => (
                <div 
                  key={topic}
                  className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <h3 className="font-medium">{topic}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category && `${category.charAt(0).toUpperCase() + category.slice(1)} ${topic.toLowerCase()}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
