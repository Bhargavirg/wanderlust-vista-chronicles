
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative py-12 md:py-24 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/placeholder.svg)" }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
            Discover Amazing Stories
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Explore captivating blogs across food, travel, nature, and more. 
            Share your own adventures with the world.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => navigate('/add-post')} 
              size="lg"
              className="mt-2 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
            >
              <PlusCircle className="mr-2" />
              Create New Post
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
