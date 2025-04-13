
import { Button } from "@/components/ui/button";
import { Compass, Camera, Film, BookOpen, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  
  const handleWatchVideos = () => {
    // Redirect to a dedicated videos page or section
    // For now, we'll just redirect to a special category for videos
    navigate('/category/videos');
  };
  
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80)", backgroundSize: "cover", backgroundPosition: "center" }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      
      {/* Blue rectangle accent - replacing yellow */}
      <div className="absolute top-0 left-0 h-full w-1.5 bg-sky-500"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center items-center mb-6">
              <div className="w-12 h-12 bg-sky-500 flex items-center justify-center mr-3">
                <Compass className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                EARTH LENS
              </h1>
            </div>
            <p className="text-xl text-white/90 mb-8 max-w-xl mx-auto">
              Experience our world through a new perspective. Explore fascinating articles and videos about science, nature, history, and culture.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          >
            <Button 
              onClick={() => navigate('/add-content')} 
              size="lg"
              className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 text-lg shadow-lg"
            >
              <Plus className="mr-2" />
              Add Content
            </Button>
            
            <Button 
              onClick={handleWatchVideos} 
              variant="outline" 
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white px-8 py-6 text-lg"
            >
              <Film className="mr-2" />
              Watch Videos
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mt-16"
          >
            <div className="grid grid-cols-3 gap-8 text-center text-white/80">
              <div>
                <Camera className="h-6 w-6 mx-auto mb-2" />
                <div className="font-bold text-2xl md:text-3xl mb-1">10,000+</div>
                <p className="text-sm">Photos & Articles</p>
              </div>
              <div>
                <Film className="h-6 w-6 mx-auto mb-2" />
                <div className="font-bold text-2xl md:text-3xl mb-1">500+</div>
                <p className="text-sm">Documentary Videos</p>
              </div>
              <div>
                <BookOpen className="h-6 w-6 mx-auto mb-2" />
                <div className="font-bold text-2xl md:text-3xl mb-1">50+</div>
                <p className="text-sm">Expert Contributors</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
