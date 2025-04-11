
import { useState } from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/data/blogData";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Atom, Rocket, History, Globe, Leaf, BookOpen, Camera } from "lucide-react";

interface CategorySectionProps {
  title: string;
  category: 'science' | 'technology' | 'history' | 'culture' | 'nature' | 'space' | 'wildlife';
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
        return <BookOpen className="size-5" />;
      default:
        return <Camera className="size-5" />;
    }
  };

  const getCategoryBackground = () => {
    switch (category) {
      case "science":
        return "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "technology":
        return "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "history":
        return "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "culture":
        return "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "nature":
        return "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "space":
        return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
      case "wildlife":
        return "https://images.unsplash.com/photo-1504173010664-32509aeebb62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
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
    wildlife: "from-orange-500/80 to-orange-600"
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
          <div className="absolute left-0 top-0 h-full w-2 bg-yellow-400"></div>
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
              </p>
              <Link 
                to={`/category/${category}`}
                className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-white border-b border-yellow-400 hover:border-white transition-colors"
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
