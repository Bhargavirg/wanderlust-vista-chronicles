
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowRight, GraduationCap, BookOpen, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80)", backgroundSize: "cover", backgroundPosition: "center" }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      
      {/* Animated dots pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-tight">
              Discover Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">Amazing</span> World
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl text-white/90 mb-8 max-w-xl mx-auto">
              Explore fascinating articles and videos about science, technology, history, and culture. Expand your knowledge and understanding of our incredible planet.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          >
            <Button 
              onClick={() => navigate('/category/science')} 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white border-0 px-8 py-6 text-lg shadow-lg"
            >
              <GraduationCap className="mr-2" />
              Explore Science
            </Button>
            
            <Button 
              onClick={() => navigate('/category/history')} 
              variant="outline" 
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white px-8 py-6 text-lg"
            >
              <BookOpen className="mr-2" />
              Discover History
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
                <div className="font-bold text-2xl md:text-3xl mb-1">10,000+</div>
                <p className="text-sm">Educational Articles</p>
              </div>
              <div>
                <div className="font-bold text-2xl md:text-3xl mb-1">500+</div>
                <p className="text-sm">Documentary Videos</p>
              </div>
              <div>
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
