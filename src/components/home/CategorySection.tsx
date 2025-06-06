
import { useState } from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/data/blogData";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Atom, Rocket, History, Globe, Leaf, BookOpen, Camera, Palette, Flower2, Film, Flag, Trophy, 
  Book, CloudRain, Brain, Shovel, Mountain, ScrollText, LineChart, Music, Globe2 } from "lucide-react";

// Mock data for science category
const mockSciencePosts: BlogPost[] = [
  {
    id: "5",
    title: "Quantum Computing Breakthrough",
    excerpt: "Scientists achieve new milestone in quantum computing that could revolutionize technology.",
    content: "A major breakthrough in quantum computing...",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Dr. Quantum Scientist",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    category: "science",
    publishedAt: "2024-01-14",
    readingTime: "4 min read"
  },
  {
    id: "6",
    title: "CRISPR Gene Editing Advances",
    excerpt: "New developments in gene editing technology promise treatments for genetic diseases.",
    content: "Recent advances in CRISPR technology...",
    coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Dr. Bio Engineer",
      avatar: "https://i.pravatar.cc/150?img=6"
    },
    category: "science",
    publishedAt: "2024-01-11",
    readingTime: "6 min read"
  },
  {
    id: "7",
    title: "Renewable Energy Innovations",
    excerpt: "Breakthrough in solar panel efficiency could transform renewable energy landscape.",
    content: "Solar energy technology has reached...",
    coverImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Energy Researcher",
      avatar: "https://i.pravatar.cc/150?img=7"
    },
    category: "science",
    publishedAt: "2024-01-09",
    readingTime: "5 min read"
  }
];

const CategorySection = () => {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const title = "Science & Discovery";
  const category = "science";
  const posts = mockSciencePosts;
  
  const showMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 3, posts.length));
  };

  const getCategoryIcon = () => {
    return <Atom className="size-5" />;
  };

  const getCategoryBackground = () => {
    return "https://cdn.pixabay.com/photo/2019/12/03/21/29/mountains-4671122_1280.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
  };

  const categoryColors: Record<string, string> = {
    science: "from-blue-500/80 to-blue-600",
  };

  return (
    <section className="py-12">
      <div className="container">
        {/* Category header with background image */}
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
                Explore the latest discoveries and scientific breakthroughs.
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
