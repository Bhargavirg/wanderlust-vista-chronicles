import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Camera, Globe, Compass, Bird, Mountain, TreePine, Laptop, Users } from "lucide-react";
import Footer from "@/components/layout/Footer";
import CategorySlider from "@/components/blog/CategorySlider";

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
      
      // Store login state in localStorage for the demo
      localStorage.setItem("isLoggedIn", "true");
      
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

  const handleJoinCommunity = () => {
    // If user is logged in, redirect to home page, otherwise to login
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/home");
    } else {
      // Since we're already on login page, just scroll to the login form
      const loginForm = document.querySelector(".login-form");
      if (loginForm) {
        loginForm.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main login section with background */}
      <div 
        className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="w-full flex">
          {/* Left side with animated text and stats */}
          <motion.div 
            className="hidden md:flex md:w-1/2 flex-col justify-center text-white pr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-8">
              <div className="w-12 h-12 bg-sky-500 flex items-center justify-center">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold">EARTH LENS</h1>
            </div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">Explore Our Amazing Planet</h2>
            <p className="text-xl mb-8 opacity-90">Discover fascinating stories about science, nature, history, and culture from around the globe.</p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
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
                    <div className="w-8 h-8 bg-sky-500 flex items-center justify-center md:hidden">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-primary bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600 md:hidden">
                      EARTH LENS
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit} className="login-form">
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
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold" 
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
      
      {/* Category slider section */}
      <div className="bg-black py-10">
        <div className="container">
          <CategorySlider />
        </div>
      </div>
      
      {/* Additional video or educational content - Larger size */}
      <div className="bg-black py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="text-white">
              <h3 className="text-sky-400 text-xl font-semibold mb-2">LATEST VIDEO</h3>
              <p className="text-2xl font-bold mb-2">Secrets of the Deep Ocean</p>
              <p className="text-base opacity-70">Explore the mysteries of the deepest parts of our oceans</p>
              <Button variant="link" className="text-sky-400 hover:text-sky-300 p-0 mt-2">
                Watch Now
              </Button>
            </div>
            <div className="col-span-2">
              <div className="rounded-lg overflow-hidden shadow-2xl">
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
      </div>

      {/* OUR MISSION Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">OUR MISSION</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-4">
                At Earth Lens, our mission is to inspire curiosity and foster a deeper connection with our planet. We believe in the power of visual storytelling to educate, inspire, and drive positive change in how we interact with the natural world.
              </p>
              <p className="text-lg text-gray-700">
                Through captivating photography, expert insights, and immersive experiences, we aim to highlight the beauty of Earth's ecosystems while raising awareness about conservation efforts and environmental challenges facing our world today.
              </p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-56 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" alt="Night sky with stars" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-gray-900">Discover</h3>
                <p className="text-sm text-gray-600">Exploring our universe's wonders</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative h-56 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" alt="Forest and mountain landscape" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-gray-900">Protect</h3>
                <p className="text-sm text-gray-600">Preserving our natural heritage</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="relative h-56 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" alt="Diverse community" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-gray-900">Connect</h3>
                <p className="text-sm text-gray-600">Building global communities</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="relative h-56 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1592388748465-8c756747660c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" alt="Educational environment" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-gray-900">Educate</h3>
                <p className="text-sm text-gray-600">Sharing knowledge for all</p>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={handleJoinCommunity}
              className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-lg text-lg font-semibold"
            >
              <Users className="mr-2" />
              Join Our Community
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
