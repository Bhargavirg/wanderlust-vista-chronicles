
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";
import { mockData } from "@/data/blogData";
import { motion } from "framer-motion";
import "./CategoryPage.css";
import { getContentByCategory } from "@/services/contentService";
import { toast } from "@/hooks/use-toast";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch content for this category
  useEffect(() => {
    async function loadContent() {
      if (!category) return;
      
      setLoading(true);
      try {
        const contentData = await getContentByCategory(category);
        console.log("Fetched category content:", contentData);
        
        if (contentData && contentData.length > 0) {
          // Map the content data to the expected BlogPost format
          const formattedPosts = contentData.map(item => ({
            id: item.id,
            title: item.title || "Untitled Post",
            excerpt: item.description || "",
            coverImage: item.cover_image || "https://images.unsplash.com/photo-1496449903678-68ddcb189a24",
            category: item.category?.slug || category,
            author: {
              // Get author name from appropriate fields, with fallback
              name: item.author ? "Author" : "Anonymous",
              avatar: "https://i.pravatar.cc/150?img=32"
            },
            publishedAt: item.created_at
          }));
          setPosts(formattedPosts);
        } else {
          // Fallback to mock data if no real content available
          const mockPosts = mockData.byCategory[category as keyof typeof mockData.byCategory] || [];
          setPosts(mockPosts);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        toast({
          title: "Error",
          description: "Failed to load content for this category",
          variant: "destructive",
        });
        
        // Fallback to mock data
        const mockPosts = mockData.byCategory[category as keyof typeof mockData.byCategory] || [];
        setPosts(mockPosts);
      } finally {
        setLoading(false);
      }
    }
    
    loadContent();
  }, [category]);

  // Get the category title
  function getCategoryTitle() {
    if (!category) return "Category";
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  // Get category banner image
  function getCategoryBanner() {
    switch (category) {
      case "science":
        return "https://images.unsplash.com/photo-1582719471384-894fbb16e074";
      case "technology":
        return "https://images.unsplash.com/photo-1581089781785-603411fa81e5";
      case "history":
        return "https://images.unsplash.com/photo-1461360370896-922624d12aa1";
      case "culture":
        return "https://images.unsplash.com/photo-1566438480900-0609be27a4be";
      case "nature":
        return "https://images.unsplash.com/photo-1518495973542-4542c06a5843";
      case "space":
        return "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb";
      case "wildlife":
        return "https://images.unsplash.com/photo-1504173010664-32509aeebb62";
      default:
        return "https://images.unsplash.com/photo-1496449903678-68ddcb189a24";
    }
  }

  // Get category description
  function getCategoryDescription() {
    switch (category) {
      case "science":
        return "Explore the latest discoveries and scientific breakthroughs from around the world.";
      case "technology":
        return "Discover innovations and technological advances that are changing how we live and work.";
      case "history":
        return "Journey through time to understand the events and people that shaped our world.";
      case "culture":
        return "Experience the rich diversity of human traditions, art, and collective experiences.";
      case "nature":
        return "Connect with the natural beauty and wonders that make our planet special.";
      case "space":
        return "Venture into the cosmos and unlock the mysteries of stars, planets, and galaxies.";
      case "wildlife":
        return "Discover the amazing diversity of animals and their incredible adaptations.";
      default:
        return "Explore fascinating content in this category.";
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div 
        className="category-banner"
        style={{ backgroundImage: `url(${getCategoryBanner()})` }}
      >
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {getCategoryTitle()}
          </motion.h1>
          <motion.p 
            className="text-lg text-white/90 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {getCategoryDescription()}
          </motion.p>
        </div>
      </div>

      <main className="flex-1 container mx-auto py-12 px-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg h-72" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <FilterX className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-2">No posts found</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
              There are currently no posts in this category. Check back soon for new content!
            </p>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
