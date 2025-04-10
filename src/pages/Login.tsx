
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";

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
      
      // For demo purposes, just notify and redirect
      toast({
        title: "Login successful",
        description: "Welcome back to BlogVista!",
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

  return (
    <div className="min-h-screen flex flex-col">
      <div 
        className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="w-full flex">
          {/* Left side with animated text */}
          <motion.div 
            className="hidden md:flex md:w-1/2 flex-col justify-center text-white pr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6 leading-tight">Welcome to BlogVista</h1>
            <p className="text-xl mb-8 opacity-90">Share your stories, discover new perspectives, and connect with bloggers worldwide.</p>
            <div className="flex space-x-4">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <h3 className="font-medium mb-1">10K+</h3>
                <p className="text-sm opacity-80">Active Users</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <h3 className="font-medium mb-1">50K+</h3>
                <p className="text-sm opacity-80">Blog Posts</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <h3 className="font-medium mb-1">6</h3>
                <p className="text-sm opacity-80">Categories</p>
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
                  <div className="text-3xl font-bold text-primary bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
                    BlogVista
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-center">Welcome Back!</CardTitle>
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
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 hover:opacity-90" 
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
      <Footer />
    </div>
  );
};

export default Login;
