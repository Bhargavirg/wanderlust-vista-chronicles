
import React from 'react';
import { BlogData } from "../../data/blogData";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import BlogCard from "../blog/BlogCard";

interface CategoriesListProps {
  blogData: BlogData;
}

const CategoriesList = ({ blogData }: CategoriesListProps) => {
  // Define the allowed categories that match the BlogPost interface
  const allowedCategories = [
    'science', 'technology', 'history', 'culture', 'nature', 'space', 'wildlife', 
    'art', 'flowers', 'anime', 'politics', 'sports', 'stories', 'travel', 'food',
    'monuments', 'marinelife', 'literature', 'deep-earth-geology', 'ancient-civilization',
    'climate', 'psychology', 'archaeology', 'mythology', 'business-economics', 'music', 'current-affairs'
  ] as const;
  
  type AllowedCategory = typeof allowedCategories[number];

  // Type guard to check if a string is an AllowedCategory
  const isAllowedCategory = (category: string): category is AllowedCategory => {
    return allowedCategories.includes(category as AllowedCategory);
  };

  // Get category color for styling
  const getCategoryColor = (category: string): string => {
    const categoryColors: Record<string, string> = {
      science: "from-blue-500/80 to-blue-600",
      technology: "from-purple-500/80 to-purple-600",
      history: "from-amber-500/80 to-amber-600",
      culture: "from-emerald-500/80 to-emerald-600",
      nature: "from-green-500/80 to-green-600",
      space: "from-indigo-500/80 to-indigo-600",
      wildlife: "from-orange-500/80 to-orange-600",
      art: "from-pink-500/80 to-pink-600",
      flowers: "from-red-500/80 to-red-600",
      anime: "from-purple-500/80 to-purple-600",
      politics: "from-gray-500/80 to-gray-600",
      sports: "from-yellow-500/80 to-yellow-600",
      stories: "from-teal-500/80 to-teal-600",
      travel: "from-cyan-500/80 to-cyan-600",
      food: "from-lime-500/80 to-lime-600",
      monuments: "from-rose-500/80 to-rose-600",
      marinelife: "from-violet-500/80 to-violet-600",
      literature: "from-slate-500/80 to-slate-600",
      // New categories
      "deep-earth-geology": "from-amber-700/80 to-amber-800",
      "ancient-civilization": "from-stone-500/80 to-stone-600",
      "climate": "from-sky-500/80 to-sky-600",
      "psychology": "from-fuchsia-500/80 to-fuchsia-600",
      "archaeology": "from-amber-600/80 to-amber-700",
      "mythology": "from-indigo-600/80 to-indigo-700",
      "business-economics": "from-green-600/80 to-green-700",
      "music": "from-pink-600/80 to-pink-700",
      "current-affairs": "from-blue-600/80 to-blue-700",
    };
    
    return categoryColors[category] || "from-sky-500/80 to-sky-600";
  };

  // Function to get a background image for each category
  const getCategoryBackgroundImage = (category: string): string => {
    const posts = blogData.byCategory[category];
    if (posts && posts.length > 0) {
      return posts[0].screenSizeImage || posts[0].coverImage;
    }
    
    // Fallback images if no posts are available
    const fallbackImages: Record<string, string> = {
      science: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69",
      technology: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      history: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
      culture: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
      nature: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
      space: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9",
      wildlife: "https://cdn.pixabay.com/photo/2019/11/26/19/57/animal-4655388_1280.jpg",
      art: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      flowers: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
      anime: "https://images.unsplash.com/photo-1517263904808-5dcf1f1a7a3a",
      politics: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
      sports: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
      stories: "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
      travel: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      food: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
      monuments: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
      marinelife: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      literature: "https://i.pinimg.com/736x/4c/be/72/4cbe72bd4c75c1fa36fd416d1601c816.jpg",
      // New categories
      "deep-earth-geology": "https://cdn.pixabay.com/photo/2016/11/21/17/46/craters-1846775_1280.jpg",
      "ancient-civilization": "https://cdn.pixabay.com/photo/2016/11/19/14/11/ancient-1839467_1280.jpg",
      "climate": "https://cdn.pixabay.com/photo/2017/02/27/08/50/cyclone-2102397_1280.jpg",
      "psychology": "https://cdn.pixabay.com/photo/2018/01/27/10/09/perception-3110812_1280.jpg",
      "archaeology": "https://cdn.pixabay.com/photo/2017/05/19/15/08/stonehenge-2326750_1280.jpg",
      "mythology": "https://cdn.pixabay.com/photo/2016/08/26/01/32/poseidon-1621062_1280.jpg",
      "business-economics": "https://cdn.pixabay.com/photo/2018/02/08/10/22/desk-3139127_1280.jpg",
      "music": "https://cdn.pixabay.com/photo/2022/08/31/20/47/concert-7424190_1280.jpg",
      "current-affairs": "https://cdn.pixabay.com/photo/2016/11/14/04/45/audience-1822866_1280.jpg",
      default: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    };
    
    return fallbackImages[category] || fallbackImages.nature;
  };

  // Function to get category description
  const getCategoryDescription = (category: string): string => {
    const descriptions: Record<string, string> = {
      science: 'Explore the latest discoveries and scientific breakthroughs.',
      technology: 'Discover innovations and technological advances changing our world.',
      history: 'Journey through time to understand our shared human past.',
      culture: 'Delve into the rich tapestry of human culture and traditions.',
      nature: 'Connect with the natural beauty and wonders of our planet.',
      space: 'Venture into the cosmos and unlock the mysteries of the universe.',
      wildlife: 'Discover the amazing diversity of life on Earth.',
      art: 'Experience the beauty and creativity of human expression.',
      flowers: 'Explore the vibrant world of flowers and their meanings.',
      anime: 'Dive into the colorful and imaginative world of anime.',
      politics: 'Stay informed about the latest political developments and discussions.',
      sports: 'Get the latest updates and insights from the world of sports.',
      stories: 'Immerse yourself in captivating tales and narratives.',
      travel: 'Explore the world and discover new cultures and experiences.',
      food: 'Savor the flavors and culinary delights from around the globe.',
      monuments: 'Discover the architectural wonders and historical landmarks of our world.',
      marinelife: 'Explore the wonders of the ocean and its diverse ecosystems.',
      literature: 'Dive into the world of books and literary masterpieces.',
      // New categories
      "deep-earth-geology": 'Discover the fascinating science of Earth\'s structure and geological formations.',
      "ancient-civilization": 'Explore the mysteries of lost civilizations and ancient wisdom.',
      "climate": 'Understand our planet\'s climate systems and environmental challenges.',
      "psychology": 'Delve into the complexities of the human mind and behavior.',
      "archaeology": 'Uncover the secrets of the past through archaeological discoveries.',
      "mythology": 'Journey through the legends and myths that shaped human cultures.',
      "business-economics": 'Stay informed about markets, finance, and economic trends.',
      "music": 'Celebrate the art and influence of music across cultures and time.',
      "current-affairs": 'Keep up with the most important events and issues of our time.',
      default: 'Explore a variety of topics and discover something new.',
    };
    
    return descriptions[category] || '';
  };
  
  // Add CSS for hiding scrollbars
  const scrollbarHideStyle = `
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;
  
  return (
    <>
      {/* Add a style element for scrollbar hiding */}
      <style>{scrollbarHideStyle}</style>
      
      {Object.entries(blogData.byCategory).map(([category, posts]) => {
        // Check if this category is in our allowed list
        if (!isAllowedCategory(category) || posts.length === 0) {
          return null;
        }
        
        const safeCategory = category;
        const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
        const gradientClass = getCategoryColor(safeCategory);
        const backgroundImage = getCategoryBackgroundImage(safeCategory);
        const description = getCategoryDescription(safeCategory);
        
        return (
          <section key={category} className="relative mb-16">
            <div className="h-[500px] w-full relative overflow-hidden">
              {/* Background image */}
              <img 
                src={backgroundImage}
                alt={categoryTitle} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-black/30"></div>
              
              <div className="container mx-auto h-full relative z-10">
                <div className="flex h-full">
                  {/* Left content area (title, description, button) */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                      Explore {categoryTitle}
                    </h2>
                    <p className="text-white/90 text-base md:text-lg mb-6 max-w-md">
                      {description}
                    </p>
                    <Link 
                      to={`/category/${category}`}
                      className="inline-flex items-center gap-1 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors max-w-fit"
                    >
                      View all articles
                      <ChevronRight className="size-4" />
                    </Link>
                  </div>
                  
                  {/* Right content area (scrollable cards) */}
                  <div className="hidden md:flex md:w-1/2 items-center justify-end">
                    <div className="relative w-full">
                      {/* Scroll navigation buttons */}
                      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <button 
                          onClick={(e) => {
                            const container = e.currentTarget.closest('.relative')?.querySelector('.scroll-container') as HTMLElement;
                            if (container) {
                              container.scrollLeft -= 320; // Approximate card width + gap
                            }
                          }}
                          className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
                          aria-label="Scroll left"
                        >
                          <ChevronLeft size={20} />
                        </button>
                      </div>
                      
                      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                        <button 
                          onClick={(e) => {
                            const container = e.currentTarget.closest('.relative')?.querySelector('.scroll-container') as HTMLElement;
                            if (container) {
                              container.scrollLeft += 320; // Approximate card width + gap
                            }
                          }}
                          className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
                          aria-label="Scroll right"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                      
                      {/* Horizontal scrolling container for cards */}
                      <div 
                        className="scroll-container flex overflow-x-auto pb-6 pt-2 px-2 gap-4 scrollbar-hide snap-x"
                      >
                        {posts.map((post) => (
                          <div 
                            key={post.id} 
                            className="flex-shrink-0 w-[300px] snap-start"
                          >
                            <BlogCard 
                              post={post} 
                              className="bg-white shadow-lg h-full" 
                            />
                          </div>
                        ))}
                      </div>
                      
                      {/* Scroll indicator dots */}
                      <div className="flex justify-center mt-4 gap-1">
                        {Array.from({ length: Math.min(5, posts.length) }).map((_, i) => (
                          <div 
                            key={i} 
                            className="w-2 h-2 rounded-full bg-white/50"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile view for cards (shows below the hero section on small screens) */}
            <div className="md:hidden container mx-auto px-4 -mt-20">
              <div className="relative">
                <div className="overflow-x-auto flex gap-4 pb-6 scrollbar-hide snap-x">
                  {posts.map((post) => (
                    <div 
                      key={post.id} 
                      className="flex-shrink-0 w-[280px] snap-start"
                    >
                      <BlogCard 
                        post={post} 
                        className="bg-white shadow-lg h-full" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default CategoriesList;
