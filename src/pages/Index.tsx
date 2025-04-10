
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedSection from "@/components/home/FeaturedSection";
import Hero from "@/components/home/Hero";
import CategoriesList from "@/components/home/CategoriesList";
import { mockData } from "@/data/blogData";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Index = () => {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <FeaturedSection 
            featuredPost={mockData.featured} 
            recentPosts={mockData.recent} 
          />
          
          <CategoriesList blogData={mockData} />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
