import { useState } from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/data/blogData";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Atom, Rocket, History, Globe, Leaf, BookOpen, Camera, Palette, Flower2, Film, Flag, Trophy, 
  Book, CloudRain, Brain, Shovel, Mountain, ScrollText, LineChart, Music, Globe2 } from "lucide-react";

interface CategorySectionProps {
  title: string;
  category: 'science' | 'technology' | 'history' | 'culture' | 'nature' | 'space' | 'wildlife' | 
    'art' | 'flowers' | 'anime' | 'politics' | 'sports' | 'stories' | 
    'psychology' | 'archaeology' | 'mythology' | 'climate' | 'current-affairs' | 
    'music' | 'business-economics' | 'deep-earth-geology' | 'ancient-civilizations' |
    'education' | 'health' | 'travel' | 'food' | 'fashion' | 'technology' | 'entertainment';
  posts: BlogPost[];
}

const CategorySection = ({ title, category, posts }: CategorySectionProps) => {
  const [visiblePosts, setVisiblePosts] = useState(3);
  
  const showMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 3, posts.length));
  };

  const getCategoryIcon = () => {
    switch (category) {
      case "science":
        return <Atom className="size-5" />;
      case "technology":
        return <Rocket className="size-5" />;
      case "history":
        return <History className="size-5" />;
      case "culture":
        return <Globe className="size-5" />;
      case "nature":
      case "wildlife":
        return <Leaf className="size-5" />;
      case "space":
        return <Rocket className="size-5" />;
      case "art":
        return <Palette className="size-5" />;
      case "flowers":
        return <Flower2 className="size-5" />;
      case "anime":
        return <Film className="size-5" />;
      case "politics":
        return <Flag className="size-5" />;
      case "sports":
        return <Trophy className="size-5" />;
      case "stories":
        return <BookOpen className="size-5" />;
      // Add icons for the new categories
      case "psychology":
        return <Brain className="size-5" />;
      case "archaeology":
        return <Shovel className="size-5" />;
      case "mythology":
        return <Book className="size-5" />;
      case "climate":
        return <CloudRain className="size-5" />;
      case "current-affairs":
        return <Globe2 className="size-5" />;
      case "music":
        return <Music className="size-5" />;
      case "business-economics":
        return <LineChart className="size-5" />;
      case "deep-earth-geology":
        return <Mountain className="size-5" />;
      case "ancient-civilizations":
        return <ScrollText className="size-5" />;
      case "education":
        return <BookOpen className="size-5" />;
      case "health":
        return <Brain className="size-5" />;
      case "travel":
        return <Globe className="size-5" />;
      case "food":
        return <Book className="size-5" />;
      case "fashion":
        return <Camera className="size-5" />;
      case "entertainment":
        return <Film className="size-5" />;
      default:
        return <Camera className="size-5" />;
    }
  };

  const getCategoryBackground = () => {
    switch (category) {
      case "science":
        return "https://cdn.pixabay.com/photo/2019/12/03/21/29/mountains-4671122_1280.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "technology":
        return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "history":
        return "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "culture":
        return "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "nature":
        return "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "space":
        return "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "wildlife":
        return "https://images.unsplash.com/photo-1504173010664-32509aeebb62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "art":
        return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "flowers":
        return "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "anime":
        return "https://images.unsplash.com/photo-1567016507665-356928ac6679?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "politics":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "sports":
        return "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "stories":
        return "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      // Add backgrounds for the new categories
      case "psychology":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "archaeology":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "mythology":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "climate":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "current-affairs":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "music":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "business-economics":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "deep-earth-geology":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "ancient-civilizations":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "education":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "health":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "travel":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "food":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "fashion":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      case "entertainment":
        return "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
      default:
        return "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
    }
  };

  const categoryColors: Record<string, string> = {
    science: "from-blue-500/80 to-blue-600",
    technology: "from-purple-500/80 to-purple-600",
    history: "from-amber-500/80 to-amber-600",
    culture: "from-emerald-500/80 to-emerald-600",
    nature: "from-green-500/80 to-green-600",
    space: "from-indigo-500/80 to-indigo-600",
    wildlife: "from-orange-500/80 to-orange-600",
    art: "from-rose-500/80 to-rose-600",
    flowers: "from-pink-500/80 to-pink-600",
    anime: "from-fuchsia-500/80 to-fuchsia-600",
    politics: "from-red-500/80 to-red-600",
    sports: "from-lime-500/80 to-lime-600",
    stories: "from-teal-500/80 to-teal-600",
    // Add colors for the new categories
    psychology: "from-violet-500/80 to-violet-600",
    archaeology: "from-amber-700/80 to-amber-800",
    mythology: "from-indigo-600/80 to-indigo-700",
    climate: "from-sky-500/80 to-sky-600",
    "current-affairs": "from-blue-600/80 to-blue-700",
    music: "from-pink-600/80 to-pink-700",
    "business-economics": "from-green-600/80 to-green-700",
    "deep-earth-geology": "from-yellow-600/80 to-yellow-700",
    "ancient-civilizations": "from-stone-500/80 to-stone-600",
    education: "from-blue-400/80 to-blue-500",
    health: "from-emerald-400/80 to-emerald-500",
    travel: "from-cyan-500/80 to-cyan-600",
    food: "from-orange-400/80 to-orange-500",
    fashion: "from-rose-400/80 to-rose-500",
    entertainment: "from-purple-400/80 to-purple-500"
  };

  return (
    <section className="py-12">
      <div className="container">
        {/* Category header with background image - National Geographic style */}
        <div 
          className="relative h-48 mb-12 rounded-xl overflow-hidden"
          style={{ 
            backgroundImage: `url(${getCategoryBackground()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute left-0 top-0 h-full w-2 bg-sky-500"></div>
          <div className="absolute inset-0 flex items-center p-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-full bg-gradient-to-r ${categoryColors[category]} text-white`}>
                  {getCategoryIcon()}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {title}
                </h2>
              </div>
              <p className="text-white/80 max-w-2xl">
                {category === 'science' && 'Explore the latest discoveries and scientific breakthroughs.'}
                {category === 'technology' && 'Discover innovations and technological advances changing our world.'}
                {category === 'history' && 'Journey through time to understand our shared human past.'}
                {category === 'culture' && 'Experience traditions and expressions from around the world.'}
                {category === 'nature' && 'Connect with the natural beauty and wonders of our planet.'}
                {category === 'space' && 'Venture into the cosmos and unlock the mysteries of the universe.'}
                {category === 'wildlife' && 'Discover the amazing diversity of life on Earth.'}
                {category === 'art' && 'Experience human creativity and expression across different mediums.'}
                {category === 'flowers' && 'Discover the beautiful world of flowers and their significance.'}
                {category === 'anime' && 'Explore Japanese animation and its cultural impact worldwide.'}
                {category === 'politics' && 'Stay informed about global affairs, governance, and policy developments.'}
                {category === 'sports' && 'Follow athletic competitions and sporting events from around the globe.'}
                {category === 'stories' && 'Immerse yourself in compelling narratives and meaningful tales.'}
                {/* Add descriptions for the new categories */}
                {category === 'psychology' && 'Understand the human mind, behavior, and mental processes.'}
                {category === 'archaeology' && 'Discover ancient artifacts and lost civilizations.'}
                {category === 'mythology' && 'Explore ancient stories, legendary beings, and cultural beliefs.'}
                {category === 'climate' && 'Learn about weather patterns and climate science.'}
                {category === 'current-affairs' && 'Stay updated with the latest news and global events.'}
                {category === 'music' && 'Experience the art and influence of music across time and cultures.'}
                {category === 'business-economics' && 'Understand markets, financial trends, and economic principles.'}
                {category === 'deep-earth-geology' && 'Explore Earth\'s structure, rocks, and geological forces.'}
                {category === 'ancient-civilizations' && 'Uncover the mysteries of lost cultures and ancient wisdom.'}
                {category === 'education' && 'Explore learning methods, educational systems, and knowledge acquisition.'}
                {category === 'health' && 'Learn about wellness, medical advances, and healthy living practices.'}
                {category === 'travel' && 'Discover amazing destinations and travel experiences around the world.'}
                {category === 'food' && 'Explore culinary traditions, recipes, and food culture.'}
                {category === 'fashion' && 'Follow trends, styles, and the evolution of clothing and design.'}
                {category === 'entertainment' && 'Stay updated with films, shows, and entertainment media.'}
              </p>
              <Link 
                to={`/category/${category}`}
                className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-white border-b border-sky-500 hover:border-white transition-colors"
              >
                View all articles
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, visiblePosts).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <BlogCard key={post.id} post={post} className="shadow hover:shadow-md transition-all duration-300" />
            </motion.div>
          ))}
        </div>
        
        {visiblePosts < posts.length && (
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              onClick={showMorePosts}
              className="px-8 border-dashed hover:border-solid"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
