
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Search, X } from "lucide-react";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  // This would be connected to auth in the full implementation
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">BlogVista</span>
          </Link>
          
          <div className="hidden md:flex gap-6">
            <Link to="/category/food" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Food
            </Link>
            <Link to="/category/travel" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Travel
            </Link>
            <Link to="/category/nature" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Nature
            </Link>
            <Link to="/category/flowers" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Flowers
            </Link>
            <Link to="/category/space" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Space
            </Link>
            <Link to="/category/wildlife" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Wildlife
            </Link>
          </div>
        </div>

        {isSearchOpen ? (
          <div className="flex-1 ml-auto mr-4 max-w-sm flex items-center">
            <Input
              type="search"
              placeholder="Search blogs..."
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
                  onClick={() => navigate('/new-post')}
                  className="hidden md:flex"
                >
                  New Post
                </Button>
                <Button 
                  variant="default"
                  onClick={() => navigate('/dashboard')}
                  className="hidden md:flex"
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
                  className="hidden md:flex"
                >
                  Register
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
                      to="/category/food"
                      className="text-sm font-medium transition-colors"
                    >
                      Food
                    </Link>
                    <Link 
                      to="/category/travel"
                      className="text-sm font-medium transition-colors"
                    >
                      Travel
                    </Link>
                    <Link 
                      to="/category/nature"
                      className="text-sm font-medium transition-colors"
                    >
                      Nature
                    </Link>
                    <Link 
                      to="/category/flowers"
                      className="text-sm font-medium transition-colors"
                    >
                      Flowers
                    </Link>
                    <Link 
                      to="/category/space"
                      className="text-sm font-medium transition-colors"
                    >
                      Space
                    </Link>
                    <Link 
                      to="/category/wildlife"
                      className="text-sm font-medium transition-colors"
                    >
                      Wildlife
                    </Link>
                  </div>
                  <div className="grid gap-2">
                    {isLoggedIn ? (
                      <>
                        <Button variant="outline" onClick={() => navigate('/new-post')}>
                          New Post
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/dashboard')}>
                          Dashboard
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setIsLoggedIn(false);
                            navigate('/');
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
                        <Button variant="default" onClick={() => navigate('/register')}>
                          Register
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
