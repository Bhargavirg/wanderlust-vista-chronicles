import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, this would clear auth tokens, etc.
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/login");
  };

  return (
    <footer className="border-t footer-bg-image">
      
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold">BlogVista</span>
            </Link>
            <p className="text-sm text-black">
              A platform for sharing stories, experiences, and knowledge through beautiful blogs.
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/food" className="text-sm text-black hover:text-primary transition-colors">
                  Food
                </Link>
              </li>
              <li>
                <Link to="/category/travel" className="text-sm text-black hover:text-primary transition-colors">
                  Travel
                </Link>
              </li>
              <li>
                <Link to="/category/nature" className="text-sm text-black hover:text-primary transition-colors">
                  Nature
                </Link>
              </li>
              <li>
                <Link to="/category/flowers" className="text-sm text-black hover:text-primary transition-colors">
                  Flowers
                </Link>
              </li>
              <li>
                <Link to="/category/space" className="text-sm text-black hover:text-primary transition-colors">
                  Space
                </Link>
              </li>
              <li>
                <Link to="/category/wildlife" className="text-sm text-black hover:text-primary transition-colors">
                  Wildlife
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-medium mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-black hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-black hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-black hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-black hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-black">
            © {new Date().getFullYear()} BlogVista. All rights reserved.
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout} 
            className="mt-4 md:mt-0 flex items-center gap-2 text-black hover:text-primary hover:bg-muted"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
