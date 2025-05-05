import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Camera, Globe, Compass, Bird, Mountain, TreePine, Laptop, Users, Book, Map, Ship, Landmark, Cloud, Brain, Shovel, Smile, Building, DollarSign, Music, Eye, EyeOff } from "lucide-react";
import Footer from "@/components/layout/Footer";
import CategorySlider from "@/components/blog/CategorySlider";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/home");
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back to Earth Lens!",
      });
      
      navigate("/home");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinCommunity = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main login section with background */}
      <div 
        className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
        style={{ 
          backgroundImage: "url(https://cdn.pixabay.com/photo/2023/10/26/08/24/autumn-8342089_1280.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80)", backgroundSize: "cover", backgroundPosition: "center" 
         
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
            
            <div className="grid grid-cols-4 gap-4 mb-8">
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
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <Book className="h-6 w-6 mb-2" />
                <h3 className="font-medium mb-1">2K+</h3>
                <p className="text-sm opacity-80">Articles</p>
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
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white/50 dark:bg-gray-900/50 pr-10"
                      />
                      <button 
                        type="button" 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
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
      
      {/* Featured images from different categories */}
      <div className="bg-black pb-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6 text-white">Featured Discoveries</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden shadow-xl h-72">
              <div className="relative w-full h-full group">
                <img 
                  src="https://i.pinimg.com/736x/af/70/8f/af708fe0315bfb554c55758ea7ad84c6.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" 
                  alt="Monument interior"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center mb-2">
                    <Landmark className="h-6 w-6 text-sky-400 mr-2" />
                    <h4 className="text-xl font-bold text-white">Monuments</h4>
                  </div>
                  <p className="text-white/80">Architectural wonders from across the world</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl h-72">
              <div className="relative w-full h-full group">
                <img 
                  src="https://images.unsplash.com/photo-1518877593221-1f28583780b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" 
                  alt="Whale breaching"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center mb-2">
                    <Ship className="h-6 w-6 text-sky-400 mr-2" />
                    <h4 className="text-xl font-bold text-white">Marinelife</h4>
                  </div>
                  <p className="text-white/80">Discover the wonders beneath the waves</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl h-72">
              <div className="relative w-full h-full group">
                <img 
                  src="https://i.pinimg.com/736x/d7/c3/0f/d7c30f51352c5f7793a90fd98640a71d.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" 
                  alt="Travel landscape"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center mb-2">
                    <Map className="h-6 w-6 text-sky-400 mr-2" />
                    <h4 className="text-xl font-bold text-white">Travel</h4>
                  </div>
                  <p className="text-white/80">Explore destinations around the globe</p>
                </div>
              </div>
            </div>

            {/* New featured categories - first row */}
            <div className="rounded-lg overflow-hidden shadow-xl h-72">
              <div className="relative w-full h-full group">
                <img 
                  src="https://cdn.pixabay.com/photo/2016/11/21/17/46/craters-1846775_1280.jpg" 
                  alt="Deep Earth & Geology"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center mb-2">
                    <Mountain className="h-6 w-6 text-sky-400 mr-2" />
                    <h4 className="text-xl font-bold text-white">Deep Earth & Geology</h4>
                  </div>
                  <p className="text-white/80">Explore Earth's structure and geological forces</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl h-72">
              <div className="relative w-full h-full group">
                <img 
                  src="https://cdn.pixabay.com/photo/2016/11/19/14/11/ancient-1839467_1280.jpg" 
                  alt="Ancient Civilization"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center mb-2">
                    <Building className="h-6 w-6 text-sky-400 mr-2" />
                    <h4 className="text-xl font-bold text-white">Ancient Civilization</h4>
                  </div>
                  <p className="text-white/80">Discover lost cultures and forgotten wisdom</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl h-72">
              <div className="relative w-full h-full group">
                <img 
                  src="https://cdn.pixabay.com/photo/2017/02/27/08/50/cyclone-2102397_1280.jpg" 
                  alt="Climate"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center mb-2">
                    <Cloud className="h-6 w-6 text-sky-400 mr-2" />
                    <h4 className="text-xl font-bold text-white">Climate</h4>
                  </div>
                  <p className="text-white/80">Weather patterns and environmental science</p>
                </div>
              </div>
            </div>

            {/* New featured categories - second row */}
            <div className="rounded-lg overflow-hidden shadow-xl h-72">
              <div className="relative w-full h-full group">
                <img 
                  src="https://cdn.pixabay.com/photo/2018/01/27/10/09/perception-3110812_1280.jpg" 
                  alt="Psychology"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center mb-2">
                    <Brain className="h-6 w-6 text-sky-400 mr-2" />
                    <h4 className="text-xl font-bold text-white">Psychology</h4>
                  </div>
                  <p className="text-white/80">Understanding the human mind and behavior</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl h-72">
              <div className="relative w-full h-full group">
                <img 
                  src="https://cdn.pixabay.com/photo/2017/05/19/15/08/stonehenge-2326750_1280.jpg" 
                  alt="Archaeology"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center mb-2">
                    <Shovel className="h-6 w-6 text-sky-400 mr-2" />
                    <h4 className="text-xl font-bold text-white">Archaeology</h4>
                  </div>
                  <p className="text-white/80">Uncovering history through artifacts</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl h-72">
              <div className="relative w-full h-full group">
                <img 
                  src="https://cdn.pixabay.com/photo/2016/08/26/01/32/poseidon-1621062_1280.jpg" 
                  alt="Mythology"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center mb-2">
                    <Smile className="h-6 w-6 text-sky-400 mr-2" />
                    <h4 className="text-xl font-bold text-white">Mythology</h4>
                  </div>
                  <p className="text-white/80">Ancient stories and legendary beings</p>
                </div>
              </div>
            </div>
          </div>
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
                    src="https://cdn.pixabay.com/video/2021/08/19/85674-591865490_large.mp4" 
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
              <div className="relative h-64 overflow-hidden">
                <img src="https://i.pinimg.com/736x/d7/d7/34/d7d734cc480aa49609131f1cd29d3b20.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" alt="Night sky with stars" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
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
              <div className="relative h-64 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1506744038136-4627383780b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" alt="Forest and mountain landscape" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
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
              <div className="relative h-64 overflow-hidden">
                <img src="https://i.pinimg.com/736x/97/6e/07/976e07bb3d401b8f587771277137d9d1.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" alt="Diverse community" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
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
              <div className="relative h-64 overflow-hidden">
                <img src="https://i.pinimg.com/736x/b8/71/e9/b871e986257d183f82f46da06e2e9360.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" alt="Educational environment" className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
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
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-full mx-auto">
            <img 
              src="https://i.pinimg.com/736x/59/df/b0/59dfb02d36fc4733eea72f7d61131626.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" 
              alt="Nature 1" 
              className="w-full h-[50vh] object-cover rounded-lg shadow-md"
            />
            <img 
              src="https://i.pinimg.com/736x/47/85/d5/4785d57c50f308203332bfb78366713e.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" 
              alt="Nature 2" 
              className="w-full h-[50vh] object-cover rounded-lg shadow-md"
            />
            <img 
              src="https://images.unsplash.com/photo-1518877593221-1f28583780b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" 
              alt="Nature 3" 
              className="w-full h-[50vh] object-cover rounded-lg shadow-md"
            />
            <img 
              src="https://cdn.pixabay.com/photo/2024/05/25/20/19/planet-8787642_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" 
              alt="Nature 4" 
              className="w-full h-[50vh] object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
