import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BlogCard from "../components/blog/BlogCard";
import { mockData, BlogPost } from "../data/blogData";
import { Atom, Rocket, History, Globe, Leaf, BookOpen, Camera } from "lucide-react";
import { motion } from "framer-motion";
import VideoEmbed from "../components/blog/VideoEmbed";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (category) {
      // Get posts from mockData
      const categoryPosts = mockData.byCategory[category as keyof typeof mockData.byCategory] || [];
      
      // Get user submitted posts from localStorage
      const userPostsJSON = localStorage.getItem('earthLensUserPosts');
      let userPosts: Record<string, BlogPost> = {};
      
      if (userPostsJSON) {
        try {
          userPosts = JSON.parse(userPostsJSON);
          
          // Filter user posts by the current category
          const userCategoryPosts = Object.values(userPosts).filter(
            post => post.category === category
          );
          
          // Combine and set all posts
          setPosts([...categoryPosts, ...userCategoryPosts]);
        } catch (error) {
          console.error("Error parsing user posts:", error);
          setPosts([...categoryPosts]);
        }
      } else {
        setPosts([...categoryPosts]);
      }
    }
  }, [category]);
  
  // Get category-specific header image
  const getCategoryBackground = () => {
    switch (category) {
      case "marine-life":
        return "https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "monuments":
        return "https://cdn.pixabay.com/photo/2019/12/28/14/29/tajmahal-4724799_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "food":
        return "https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "literature":
        return "https://cdn.pixabay.com/photo/2015/05/09/15/42/book-759873_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "art":
        return "https://cdn.pixabay.com/photo/2013/02/24/18/33/vincent-van-gogh-85799_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80";
      case "flowers":
        return "https://cdn.pixabay.com/photo/2016/03/16/13/41/cherry-blossom-1260641_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80";
      case "anime":
        return "https://cdn.pixabay.com/photo/2018/08/27/00/07/toy-3633751_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80";
      case "politics":
        return "https://cdn.pixabay.com/photo/2017/05/31/23/01/politics-2361943_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80";
      case "sports":
        return "https://cdn.pixabay.com/photo/2024/08/21/13/03/ai-generated-8986207_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80";
      case "stories":
        return "https://cdn.pixabay.com/photo/2015/07/27/20/16/book-863418_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80";
      case "travel":
        return "https://cdn.pixabay.com/photo/2016/11/23/14/51/stone-circles-1853340_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80";
      case "science":
        return "https://cdn.pixabay.com/photo/2023/03/15/20/48/robots-7855433_1280.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "technology":
        return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "history":
        return "https://i.pinimg.com/736x/5d/11/47/5d1147d0747d68d53179235a0362222c.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "culture":
        return "https://cdn.pixabay.com/photo/2024/12/09/16/22/boat-9255590_1280.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "nature":
        return "https://cdn.pixabay.com/photo/2020/11/03/16/13/road-5710320_1280.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero header with full screen background image and blog cards slider on right */}
      <header className="category-header">
        <div 
          className="category-header__image"
          style={{ backgroundImage: `url(${getCategoryBackground()})` }}
        >
          <div className="category-header__overlay"></div>
          <div className="category-header__content">
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
        </div>
        
        <div className="category-header__slider">
          <h3 className="text-xl font-bold mb-4 text-white">Explore Posts</h3>
          <div className="category-slider__scroll-container" ref={scrollRef}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="category-slider__card">
                  <BlogCard post={post} />
                </div>
              ))
            ) : (
              <p className="text-white">No posts found in this category.</p>
            )}
          </div>
          <button
            className="category-slider__nav-button category-slider__nav-button--left"
            onClick={() => scrollSlider("left")}
            aria-label="Scroll left"
          >
            &#8249;
          </button>
          <button
            className="category-slider__nav-button category-slider__nav-button--right"
            onClick={() => scrollSlider("right")}
            aria-label="Scroll right"
          >
            &#8250;
          </button>
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
          {/* Removed old grid of posts since slider is now in header */}
        </div>
      </main>
      
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

      {/* Gallery section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Gallery</h2>
          <div className="gallery-grid">
            <img src="https://cdn.pixabay.com/photo/2023/12/12/13/28/waterfall-8445292_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Gallery Image 1" />
            <img src="https://cdn.pixabay.com/photo/2020/02/01/20/05/hummingbird-hawkmoth-4811285_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Gallery Image 2" />
            <img src="https://cdn.pixabay.com/photo/2011/12/15/11/37/galaxy-11188_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Gallery Image 3" />
            <img src="https://cdn.pixabay.com/photo/2023/06/27/10/51/pier-8091934_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="Gallery Image 4" />
            <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2019/06/13/16/06/dance-4271941_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2020/06/25/20/53/fish-5340878_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2010/12/01/space-shuttle-774_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2019/06/06/13/36/italy-4256017_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2021/01/16/09/05/meal-5921491_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2024/01/18/10/50/cormorant-8516719_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2017/02/19/15/28/sunset-2080072_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2017/12/03/22/11/winter-landscape-2995987_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2020/06/22/15/37/insect-5329603_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2023/01/14/19/50/ai-generated-7718952_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2016/11/29/02/53/python-1866944_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2012/09/26/17/40/air-force-58066_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2016/10/31/18/14/dessert-1786311_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2022/08/19/15/14/lions-7397126_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2016/05/31/23/21/badminton-1428047_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2016/03/16/17/32/crocus-1261310_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2018/01/26/18/56/nature-3109484_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />    
            <img src="https://cdn.pixabay.com/photo/2021/12/26/08/32/lantern-6894507_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />  
            <img src="https://cdn.pixabay.com/photo/2024/05/22/16/37/seagull-8781110_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2012/11/28/11/25/satellite-67718_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2021/03/11/06/57/flower-6086288_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2023/11/19/14/10/hangzhou-8398789_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2023/08/15/03/25/great-wall-of-china-8191166_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            <img src="https://cdn.pixabay.com/photo/2018/02/28/20/19/nature-3188987_1280.jpg?auto=format&fit=crop&w=400&q=80" alt="" />
            
           
           
           
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
