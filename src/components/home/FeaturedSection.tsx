
import { BlogPost } from "@/components/blog/BlogCard";
import BlogCard from "@/components/blog/BlogCard";
import { motion } from "framer-motion";

interface FeaturedSectionProps {
  featuredPost: BlogPost;
  recentPosts: BlogPost[];
}

const FeaturedSection = ({ featuredPost, recentPosts }: FeaturedSectionProps) => {
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
          <BlogCard post={featuredPost} featured={true} className="shadow-lg hover:shadow-xl transition-all duration-300" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post, index) => (
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
