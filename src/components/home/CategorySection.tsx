
import { useState } from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/components/blog/BlogCard";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface CategorySectionProps {
  title: string;
  category: 'food' | 'travel' | 'nature' | 'flowers' | 'space' | 'wildlife';
  posts: BlogPost[];
}

const CategorySection = ({ title, category, posts }: CategorySectionProps) => {
  const [visiblePosts, setVisiblePosts] = useState(3);
  
  const showMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 3, posts.length));
  };

  const categoryColors: Record<string, string> = {
    food: "from-category-food/80 to-category-food",
    travel: "from-category-travel/80 to-category-travel", 
    nature: "from-category-nature/80 to-category-nature",
    flowers: "from-category-flowers/80 to-category-flowers",
    space: "from-category-space/80 to-category-space",
    wildlife: "from-category-wildlife/80 to-category-wildlife"
  };

  return (
    <section className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
          ${categoryColors[category]}">
          {title}
        </h2>
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
