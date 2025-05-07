
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, User, Menu, X, LogOut, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchTerm);
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-950 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and site name */}
        <div className="flex items-center">
          <Link to="/home" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-sky-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">EL</span>
            </div>
            <span className="text-xl font-bold hidden md:inline-block dark:text-white">
              Earth Lens
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/home" className="text-sm font-medium hover:text-sky-500 dark:text-gray-300 dark:hover:text-white">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:text-sky-500 dark:text-gray-300 dark:hover:text-white">
            Dashboard
          </Link>
          <Link to="/category/nature" className="text-sm font-medium hover:text-sky-500 dark:text-gray-300 dark:hover:text-white">
            Nature
          </Link>
          <Link to="/category/science" className="text-sm font-medium hover:text-sky-500 dark:text-gray-300 dark:hover:text-white">
            Science
          </Link>
          <Link to="/category/history" className="text-sm font-medium hover:text-sky-500 dark:text-gray-300 dark:hover:text-white">
            History
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Search form */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative mr-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-1 pl-8 pr-3 rounded-full text-sm border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <Search className="h-4 w-4 absolute left-2 text-gray-400" />
          </form>
          
          {/* Join Community button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/join-community')}
            className="hidden md:flex"
          >
            Join Community
          </Button>
          
          {/* Subscribe button */}
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => navigate('/subscribe')}
            className="hidden md:flex"
          >
            Subscribe
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full"
                  aria-label="User menu"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User" />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/add-content">Add Content</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate('/login')} variant="outline" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </Button>
          )}
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 space-y-4 border-t border-gray-200 dark:border-gray-800">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="flex items-center relative mb-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-9 pr-3 rounded-md text-sm border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
            />
            <Search className="h-4 w-4 absolute left-3 text-gray-400" />
          </form>
          
          <Link 
            to="/home" 
            className="block py-2 text-base font-medium hover:text-sky-500 dark:text-gray-300 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="block py-2 text-base font-medium hover:text-sky-500 dark:text-gray-300 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/category/nature" 
            className="block py-2 text-base font-medium hover:text-sky-500 dark:text-gray-300 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            Nature
          </Link>
          <Link 
            to="/category/science" 
            className="block py-2 text-base font-medium hover:text-sky-500 dark:text-gray-300 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            Science
          </Link>
          <Link 
            to="/category/history" 
            className="block py-2 text-base font-medium hover:text-sky-500 dark:text-gray-300 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            History
          </Link>
          
          <div className="flex flex-col space-y-2 pt-2">
            <Button 
              variant="outline"
              onClick={() => {
                navigate('/join-community');
                setMobileMenuOpen(false);
              }}
            >
              Join Community
            </Button>
            
            <Button 
              variant="default"
              onClick={() => {
                navigate('/subscribe');
                setMobileMenuOpen(false);
              }}
            >
              Subscribe
            </Button>
            
            {!user && (
              <Link 
                to="/login" 
                className="block py-2 text-base font-medium text-sky-500 hover:text-sky-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
