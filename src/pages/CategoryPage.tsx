import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { FilterX, ChevronLeft, ChevronRight } from "lucide-react";
import { mockData } from "@/data/blogData";
import { motion } from "framer-motion";
import "./CategoryPage.css";
import { getContentByCategory } from "@/services/contentService";
import { toast } from "@/hooks/use-toast";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
          const formattedPosts = contentData.map(item => {
            // Add proper type checking for author property
            const authorName = item.author?.username || item.author?.full_name || "Anonymous";
            const authorAvatar = item.author?.avatar_url || "https://i.pravatar.cc/150?img=32";
            
            return {
              id: item.id,
              title: item.title || "Untitled Post",
              excerpt: item.description || "",
              coverImage: item.cover_image || "https://images.unsplash.com/photo-1496449903678-68ddcb189a24",
              category: item.category?.slug || category,
              author: {
                name: authorName,
                avatar: authorAvatar
              },
              publishedAt: item.created_at
            };
          });
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

  // Navigation for slider
  const handlePrevSlide = () => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 360; // Approximate width of each card + gap
    scrollContainerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
    
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleNextSlide = () => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 360; // Approximate width of each card + gap
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    if (currentSlideIndex < posts.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

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

  const getCategoryIcon = () => {
    switch (category) {
      case "science":
        return "🔬";
      case "technology":
        return "🚀";
      case "history":
        return "🏛️";
      case "culture":
        return "🌎";
      case "nature":
        return "🌿";
      case "space":
        return "🌌";
      case "wildlife":
        return "🦁";
      default:
        return "📚";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Full screen category header with image and slider */}
      <div className="category-header">
        {/* Left side: Full screen background image */}
        <div 
          className="category-header__image"
          style={{ backgroundImage: `url(${getCategoryBanner()})` }}
        >
          <div className="category-header__overlay"></div>
          <div className="category-header__content">
            <div className="flex items-center mb-2">
              <div className="w-12 h-12 bg-yellow-400 flex items-center justify-center rounded-full mr-3 text-2xl">
                {getCategoryIcon()}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{getCategoryTitle()}</h1>
            </div>
            <p className="text-lg text-white/90 max-w-2xl mt-2">
              {getCategoryDescription()}
            </p>
          </div>
        </div>

        {/* Right side: Slider container */}
        <div className="category-header__slider">
          <h2 className="text-2xl font-bold text-white mb-6">Explore Posts</h2>
          
          {loading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-700/50 animate-pulse rounded-lg h-72 w-full" />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <>
              <div 
                ref={scrollContainerRef}
                className="category-slider__scroll-container"
              >
                {posts.map((post, index) => (
                  <div key={post.id} className="category-slider__card">
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
              
              {/* Navigation buttons */}
              {posts.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevSlide}
                    className="category-slider__nav-button category-slider__nav-button--left"
                    disabled={currentSlideIndex === 0}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={handleNextSlide}
                    className="category-slider__nav-button category-slider__nav-button--right"
                    disabled={currentSlideIndex >= posts.length - 1}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-800/50 rounded-lg">
              <FilterX className="h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-300 mb-2">No posts found</h2>
              <p className="text-gray-400 text-center max-w-md mb-6">
                There are currently no posts in the {getCategoryTitle()} category. Check back soon for new content!
              </p>
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
