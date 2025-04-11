
import { useState } from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/data/blogData";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Atom, Rocket, History, Globe, Leaf, BookOpen } from "lucide-react";

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
        return <BookOpen className="size-5" />;
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
    <section className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full bg-gradient-to-r ${categoryColors[category]} text-white`}>
            {getCategoryIcon()}
          </div>
          <h2 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${categoryColors[category]}`}>
            {title}
          </h2>
        </div>
        <Link 
          to={`/category/${category}`}
          className="group flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
        >
          View all
          <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </Link>
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
    </section>
  );
};

export default CategorySection;
