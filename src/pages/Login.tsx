
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Camera, Globe, Compass, Bird, Mountain, TreePine, Laptop } from "lucide-react";
import Footer from "@/components/layout/Footer";
import ImageCarousel from "@/components/blog/ImageCarousel";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real app, this would connect to an authentication service
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Login successful",
        description: "Welcome back to Earth Lens!",
      });
      
      navigate("/home");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Array of educational images for the carousel
  const educationalImages = [
    "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
  ];
  
  const captions = [
    "Explore the wonders of the night sky",
    "Discover breathtaking landscapes and natural phenomena",
    "Journey through Earth's most spectacular waterways",
    "Venture into ancient forests and learn about ecosystems"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div 
        className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="w-full flex">
          {/* Left side with animated text and image carousel */}
          <motion.div 
            className="hidden md:flex md:w-1/2 flex-col justify-center text-white pr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-8">
              <div className="w-12 h-12 bg-yellow-400 flex items-center justify-center">
                <Globe className="h-8 w-8 text-black" />
              </div>
              <h1 className="text-4xl font-bold">EARTH LENS</h1>
            </div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">Explore Our Amazing Planet</h2>
            <p className="text-xl mb-8 opacity-90">Discover fascinating stories about science, nature, history, and culture from around the globe.</p>
            
            {/* Image Carousel */}
            <div className="mb-8">
              <ImageCarousel images={educationalImages} captions={captions} />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <TreePine className="h-6 w-6 mb-2" />
                <h3 className="font-medium mb-1">10K+</h3>
                <p className="text-sm opacity-80">Photos</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <Bird className="h-6 w-6 mb-2" />
                <h3 className="font-medium mb-1">1.5K+</h3>
                <p className="text-sm opacity-80">Species</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <Mountain className="h-6 w-6 mb-2" />
                <h3 className="font-medium mb-1">500+</h3>
                <p className="text-sm opacity-80">Expeditions</p>
              </div>
            </div>
          </motion.div>
          
          {/* Right side with login form */}
          <motion.div 
            className="w-full md:w-1/2 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md dark:bg-gray-800/90">
              <CardHeader className="space-y-1">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-400 flex items-center justify-center md:hidden">
                      <Globe className="h-5 w-5 text-black" />
                    </div>
                    <div className="text-3xl font-bold text-primary bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-600 md:hidden">
                      EARTH LENS
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/50 dark:bg-gray-900/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/50 dark:bg-gray-900/50"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary" />
                    <label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300">Remember me</label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                  <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary hover:underline">
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
      
      {/* Additional video or educational content */}
      <div className="bg-black py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="text-white">
              <h3 className="text-yellow-400 text-xl font-semibold mb-2">LATEST VIDEO</h3>
              <p className="text-lg font-bold mb-1">Secrets of the Deep Ocean</p>
              <p className="text-sm opacity-70">Explore the mysteries of the deepest parts of our oceans</p>
              <Button variant="link" className="text-yellow-400 hover:text-yellow-300 p-0 mt-2">
                Watch Now
              </Button>
            </div>
            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md col-span-2">
              <div className="relative w-full h-0 pb-[56.25%]">
                <iframe 
                  src="https://www.youtube.com/embed/dIiO8bhqZxQ" 
                  title="Earth's Natural Wonders"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
