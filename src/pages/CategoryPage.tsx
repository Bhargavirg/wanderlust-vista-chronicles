
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { FilterX, ChevronLeft, ChevronRight, Atom, Rocket, History, Globe, Leaf, BookOpen, Camera } from "lucide-react";
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
  const scrollRef = useRef<HTMLDivElement>(null);

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
            // We need to create an author object since it doesn't exist in the type
            const authorInfo = {
              name: "Anonymous",
              avatar: "https://i.pravatar.cc/150?img=32"
            };
            
            // If the item has an author property (added via type assertion in contentService.ts)
            if ((item as any).author) {
              const author = (item as any).author;
              authorInfo.name = author.username || author.full_name || "Anonymous";
              authorInfo.avatar = author.avatar_url || "https://i.pravatar.cc/150?img=32";
            }
            
            return {
              id: item.id,
              title: item.title || "Untitled Post",
              excerpt: item.description || "",
              coverImage: item.cover_image || "https://images.unsplash.com/photo-1496449903678-68ddcb189a24",
              category: item.category?.slug || category,
              author: authorInfo,
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

  // Get the category banner image
  function getCategoryBackground() {
    switch (category) {
      case "ancient-civilizations":
        return "https://cdn.pixabay.com/photo/2015/09/02/12/25/pantheone-918531_1280.jpg";
      case "archaeology":
        return "https://cdn.pixabay.com/photo/2016/07/30/13/04/easter-island-1557162_1280.jpg";
      case "business-economics":
        return "https://cdn.pixabay.com/photo/2017/10/25/19/46/piggy-bank-2889042_1280.jpg";
      case "climate":
        return "https://cdn.pixabay.com/photo/2017/03/16/21/10/landscape-2150112_1280.jpg";
      case "current-affairs":
        return "https://cdn.pixabay.com/photo/2016/02/19/11/46/social-network-1209859_1280.jpg";
      case "deep-earth-geology":
        return "https://cdn.pixabay.com/photo/2023/07/20/11/00/cave-8138930_1280.jpg";
      case "marine-life":
        return "https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_1280.jpg";
      case "monuments":
        return "https://cdn.pixabay.com/photo/2019/12/28/14/29/tajmahal-4724799_1280.jpg";
      case "food":
        return "https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1280.jpg";
      case "literature":
        return "https://cdn.pixabay.com/photo/2015/05/09/15/42/book-759873_1280.jpg";
      case "art":
        return "https://cdn.pixabay.com/photo/2013/02/24/18/33/vincent-van-gogh-85799_1280.jpg";
      case "flowers":
        return "https://cdn.pixabay.com/photo/2016/03/16/13/41/cherry-blossom-1260641_1280.jpg";
      case "anime":
        return "https://cdn.pixabay.com/photo/2018/08/27/00/07/toy-3633751_1280.jpg";
      case "politics":
        return "https://cdn.pixabay.com/photo/2017/05/31/23/01/politics-2361943_1280.jpg";
      case "sports":
        return "https://cdn.pixabay.com/photo/2024/08/21/13/03/ai-generated-8986207_1280.jpg";
      case "stories":
        return "https://cdn.pixabay.com/photo/2015/07/27/20/16/book-863418_1280.jpg";
      case "travel":
        return "https://cdn.pixabay.com/photo/2016/11/23/14/51/stone-circles-1853340_1280.jpg";
      case "science":
        return "https://cdn.pixabay.com/photo/2023/03/15/20/48/robots-7855433_1280.jpg";
      case "technology":
        return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "history":
        return "https://i.pinimg.com/736x/5d/11/47/5d1147d0747d68d53179235a0362222c.jpg";
      case "culture":
        return "https://cdn.pixabay.com/photo/2024/12/09/16/22/boat-9255590_1280.jpg";
      case "nature":
        return "https://cdn.pixabay.com/photo/2020/11/03/16/13/road-5710320_1280.jpg";
      case "space":
        return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "wildlife":
        return "https://images.unsplash.com/photo-1504173010664-32509aeebb62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      default:
        return "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
    }
  };

  // Get category title
  function getCategoryTitle() {
    if (!category) return "Category";
    
    // Handle special cases
    if (category === "deep-earth-geology") {
      return "Deep Earth & Geology";
    }
    if (category === "ancient-civilizations") {
      return "Ancient Civilizations";
    }
    if (category === "business-economics") {
      return "Business & Economics";
    }
    if (category === "current-affairs") {
      return "Current Affairs";
    }
    if (category === "marine-life") {
      return "Marine Life";
    }
    
    // Default title formatting
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
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
      case "deep-earth-geology":
        return "Explore the mysteries beneath our feet, from plate tectonics to volcanic activity and rock formations.";
      case "ancient-civilizations":
        return "Discover the fascinating history of human civilizations from ancient Egypt to Mesopotamia and beyond.";
      case "archaeology":
        return "Explore ancient ruins and artifacts that reveal secrets about human history and past civilizations.";
      case "business-economics":
        return "Understand market trends, business strategies and economic principles that shape our global economy.";
      case "climate":
        return "Learn about climate change, weather patterns and environmental challenges facing our planet.";
      case "current-affairs":
        return "Stay informed about today's most important events and stories from around the world.";
      default:
        return "Explore fascinating content in this category.";
    }
  }

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
  
  // Scroll slider left or right
  const scrollSlider = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
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
          style={{ backgroundImage: `url(${getCategoryBackground()})` }}
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

      {/* Gallery section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <img src="https://cdn.pixabay.com/photo/2023/12/12/13/28/waterfall-8445292_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Gallery Image 1" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2020/02/01/20/05/hummingbird-hawkmoth-4811285_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Gallery Image 2" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2011/12/15/11/37/galaxy-11188_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Gallery Image 3" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2023/06/27/10/51/pier-8091934_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Gallery Image 4" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Bird" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2019/06/13/16/06/dance-4271941_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Dance" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2020/06/25/20/53/fish-5340878_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Fish" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Laptop" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2010/12/01/space-shuttle-774_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Space Shuttle" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2019/06/06/13/36/italy-4256017_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Italy" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2021/01/16/09/05/meal-5921491_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Meal" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2024/01/18/10/50/cormorant-8516719_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Cormorant" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2017/02/19/15/28/sunset-2080072_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Sunset" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2017/12/03/22/11/winter-landscape-2995987_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Winter" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2020/06/22/15/37/insect-5329603_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Insect" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2023/01/14/19/50/ai-generated-7718952_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="AI Generated" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2016/11/29/02/53/python-1866944_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Python" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2012/09/26/17/40/air-force-58066_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Air Force" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2016/10/31/18/14/dessert-1786311_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Dessert" className="w-full h-48 object-cover rounded-lg" />
            <img src="https://cdn.pixabay.com/photo/2022/08/19/15/14/lions-7397126_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Lions" className="w-full h-48 object-cover rounded-lg" />
          </div>
        </div>
      </section>
      
      {/* Related topics section */}
      {posts.length > 0 && (
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
