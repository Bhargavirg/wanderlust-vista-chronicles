
import { BlogPost } from "../../data/blogData";
import BlogCard from "../blog/BlogCard";
import { motion } from "framer-motion";

// Mock data for featured section
const mockFeaturedPost: BlogPost = {
  id: "1",
  title: "The Wonders of Deep Ocean Exploration",
  excerpt: "Dive into the mysterious depths of our oceans and discover the incredible creatures and ecosystems that thrive in the abyss.",
  content: "The deep ocean remains one of Earth's last frontiers...",
  coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  author: {
    name: "Dr. Marine Explorer",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  category: "science",
  publishedAt: "2024-01-15",
};

const mockRecentPosts: BlogPost[] = [
  {
    id: "2",
    title: "Climate Change and Arctic Wildlife",
    excerpt: "How rising temperatures are affecting polar bear populations and Arctic ecosystems.",
    content: "Recent studies show significant changes...",
    coverImage: "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    category: "nature",
    publishedAt: "2024-01-12",
  },
  {
    id: "3",
    title: "Space Exploration: Mars Mission Updates",
    excerpt: "Latest developments in NASA's Mars exploration program and future mission plans.",
    content: "The red planet continues to fascinate...",
    coverImage: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Dr. Space Researcher",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    category: "space",
    publishedAt: "2024-01-10",
  },
  {
    id: "4",
    title: "Ancient Civilizations: New Archaeological Discoveries",
    excerpt: "Recent excavations reveal fascinating insights into lost civilizations and their technologies.",
    content: "Archaeologists have uncovered...",
    coverImage: "https://images.unsplash.com/photo-1539650116574-75c0c6d73142?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Prof. History Expert",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    category: "history",
    publishedAt: "2024-01-08",
  }
];

const FeaturedSection = () => {
  return (
    <section className="container py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Featured
        </h2>
        <div className="h-1 flex-1 mx-4 bg-gradient-to-r from-primary/20 to-transparent rounded-full" />
      </div>
      
      <div className="grid gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BlogCard post={mockFeaturedPost} featured={true} className="shadow-lg hover:shadow-xl transition-all duration-300" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRecentPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard post={post} className="shadow hover:shadow-md transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
