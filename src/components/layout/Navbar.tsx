
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Search, X, Compass, ChevronDown, Film, Flag, Trophy, BookOpen, Leaf, Anchor, Landmark, BookText, Utensils } from "lucide-react";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  // This would be connected to auth in the full implementation
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Check if search query matches any category
      const categories = [
        "science", "technology", "travel", "history", "culture", 
        "nature", "space", "wildlife", "marine-life", "monuments", 
        "literature", "art", "flowers", "food", "anime", 
        "politics", "sports", "stories"
      ];
      
      const matchedCategory = categories.find(category => 
        category.toLowerCase() === searchQuery.toLowerCase() || 
        searchQuery.toLowerCase().includes(category)
      );
      
      if (matchedCategory) {
        navigate(`/category/${matchedCategory}`);
      } else {
        // If not a category, treat as general search
        navigate(`/category/search?q=${encodeURIComponent(searchQuery)}`);
      }
      
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

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
            <Link to="/category/travel" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Travel
            </Link>
            <Link to="/category/history" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              History
            </Link>
            <Link to="/category/culture" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Culture
            </Link>
            
            {/* More categories dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
                More
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white dark:bg-gray-800">
                <DropdownMenuItem asChild>
                  <Link to="/category/nature" className="flex items-center w-full cursor-pointer">Nature</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/space" className="flex items-center w-full cursor-pointer">Space</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/wildlife" className="flex items-center w-full cursor-pointer">
                    <Leaf className="h-4 w-4 mr-2" />
                    Wildlife
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/marine-life" className="flex items-center w-full cursor-pointer">
                    <Anchor className="h-4 w-4 mr-2" />
                    Marine Life
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/monuments" className="flex items-center w-full cursor-pointer">
                    <Landmark className="h-4 w-4 mr-2" />
                    Monuments
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/literature" className="flex items-center w-full cursor-pointer">
                    <BookText className="h-4 w-4 mr-2" />
                    Literature
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/art" className="flex items-center w-full cursor-pointer">Art</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/flowers" className="flex items-center w-full cursor-pointer">Flowers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/food" className="flex items-center w-full cursor-pointer">
                    <Utensils className="h-4 w-4 mr-2" />
                    Food
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/anime" className="flex items-center w-full cursor-pointer">
                    <Film className="h-4 w-4 mr-2" />
                    Anime
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/politics" className="flex items-center w-full cursor-pointer">
                    <Flag className="h-4 w-4 mr-2" />
                    Politics
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/sports" className="flex items-center w-full cursor-pointer">
                    <Trophy className="h-4 w-4 mr-2" />
                    Sports
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/stories" className="flex items-center w-full cursor-pointer">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Stories
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isSearchOpen ? (
          <form onSubmit={handleSearch} className="flex-1 ml-auto mr-4 max-w-sm flex items-center">
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Button 
              variant="ghost" 
              size="icon" 
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="ml-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close search</span>
            </Button>
          </form>
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
                      to="/category/travel"
                      className="text-sm font-medium transition-colors"
                    >
                      Travel
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
                    <Link 
                      to="/category/marine-life"
                      className="text-sm font-medium transition-colors"
                    >
                      Marine Life
                    </Link>
                    <Link 
                      to="/category/monuments"
                      className="text-sm font-medium transition-colors"
                    >
                      Monuments
                    </Link>
                    <Link 
                      to="/category/literature"
                      className="text-sm font-medium transition-colors"
                    >
                      Literature
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
                    <Link 
                      to="/category/food"
                      className="text-sm font-medium transition-colors"
                    >
                      Food
                    </Link>
                    <Link 
                      to="/category/anime"
                      className="text-sm font-medium transition-colors"
                    >
                      Anime
                    </Link>
                    <Link 
                      to="/category/politics"
                      className="text-sm font-medium transition-colors"
                    >
                      Politics
                    </Link>
                    <Link 
                      to="/category/sports"
                      className="text-sm font-medium transition-colors"
                    >
                      Sports
                    </Link>
                    <Link 
                      to="/category/stories"
                      className="text-sm font-medium transition-colors"
                    >
                      Stories
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
