
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="bg-muted py-12 md:py-24">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Discover Amazing Stories
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Explore captivating blogs across food, travel, nature, and more. 
            Share your own adventures with the world.
          </p>
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
    </section>
  );
};

export default Hero;
