
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, MessageSquare } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

const Footer = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <footer className="border-t relative">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://i.pinimg.com/736x/76/35/97/7635976ab877363b3b08882c25c7bd12.jpg)'
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-white">BlogVista</span>
            </Link>
            <p className="text-sm text-gray-200 mb-4">
              A platform for sharing stories, experiences, and knowledge through beautiful blogs.
            </p>
            <div className="mt-4">
              <Link to="/share-thought">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 bg-sky-500 text-white hover:bg-sky-600 border-sky-500"
                >
                  <MessageSquare className="w-4 h-4" />
                  Share Your Thought
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-base font-medium mb-4 text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/food" className="text-sm text-gray-200 hover:text-sky-400 transition-colors">
                  Food
                </Link>
              </li>
              <li>
                <Link to="/category/travel" className="text-sm text-gray-200 hover:text-sky-400 transition-colors">
                  Travel
                </Link>
              </li>
              <li>
                <Link to="/category/nature" className="text-sm text-gray-200 hover:text-sky-400 transition-colors">
                  Nature
                </Link>
              </li>
              <li>
                <Link to="/category/flowers" className="text-sm text-gray-200 hover:text-sky-400 transition-colors">
                  Flowers
                </Link>
              </li>
              <li>
                <Link to="/category/space" className="text-sm text-gray-200 hover:text-sky-400 transition-colors">
                  Space
                </Link>
              </li>
              <li>
                <Link to="/category/wildlife" className="text-sm text-gray-200 hover:text-sky-400 transition-colors">
                  Wildlife
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-medium mb-4 text-white">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-200 hover:text-sky-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-200 hover:text-sky-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-200 hover:text-sky-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-200 hover:text-sky-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-200">
            © {new Date().getFullYear()} BlogVista. All rights reserved.
          </p>
          <div className="flex gap-2 mt-4 md:mt-0">
            {user ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout} 
                className="flex items-center gap-2 text-gray-200 hover:text-sky-400 hover:bg-white/10"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogin} 
                className="flex items-center gap-2 text-gray-200 hover:text-sky-400 hover:bg-white/10"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
