
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Search, X, Compass } from "lucide-react";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  // This would be connected to auth in the full implementation
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sky-500 flex items-center justify-center">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">EARTH LENS</span>
          </Link>
          
          <div className="hidden md:flex gap-6">
            <Link to="/category/science" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Science
            </Link>
            <Link to="/category/technology" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Technology
            </Link>
            <Link to="/category/history" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              History
            </Link>
            <Link to="/category/culture" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Culture
            </Link>
            <Link to="/category/nature" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Nature
            </Link>
            <Link to="/category/art" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Art
            </Link>
            <Link to="/category/flowers" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Flowers
            </Link>
          </div>
        </div>

        {isSearchOpen ? (
          <div className="flex-1 ml-auto mr-4 max-w-sm flex items-center">
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(false)}
              className="ml-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close search</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>

            {isLoggedIn ? (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => navigate('/add-content')}
                  className="hidden md:flex"
                >
                  Add Content
                </Button>
                <Button 
                  variant="default"
                  onClick={() => navigate('/dashboard')}
                  className="hidden md:flex bg-sky-500 hover:bg-sky-600 text-white"
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="hidden md:flex"
                >
                  Login
                </Button>
                <Button 
                  variant="default"
                  onClick={() => navigate('/register')}
                  className="hidden md:flex bg-sky-500 hover:bg-sky-600 text-white"
                >
                  Subscribe
                </Button>
              </>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-6 pt-6">
                  <div className="grid gap-3">
                    <Link 
                      to="/category/science"
                      className="text-sm font-medium transition-colors"
                    >
                      Science
                    </Link>
                    <Link 
                      to="/category/technology"
                      className="text-sm font-medium transition-colors"
                    >
                      Technology
                    </Link>
                    <Link 
                      to="/category/history"
                      className="text-sm font-medium transition-colors"
                    >
                      History
                    </Link>
                    <Link 
                      to="/category/culture"
                      className="text-sm font-medium transition-colors"
                    >
                      Culture
                    </Link>
                    <Link 
                      to="/category/nature"
                      className="text-sm font-medium transition-colors"
                    >
                      Nature
                    </Link>
                    <Link 
                      to="/category/art"
                      className="text-sm font-medium transition-colors"
                    >
                      Art
                    </Link>
                    <Link 
                      to="/category/flowers"
                      className="text-sm font-medium transition-colors"
                    >
                      Flowers
                    </Link>
                  </div>
                  <div className="grid gap-2">
                    {isLoggedIn ? (
                      <>
                        <Button variant="outline" onClick={() => navigate('/add-content')}>
                          Add Content
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/dashboard')}>
                          Dashboard
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setIsLoggedIn(false);
                            navigate('/home');
                          }}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" onClick={() => navigate('/login')}>
                          Login
                        </Button>
                        <Button 
                          variant="default" 
                          onClick={() => navigate('/register')}
                          className="bg-sky-500 hover:bg-sky-600 text-white"
                        >
                          Subscribe
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
