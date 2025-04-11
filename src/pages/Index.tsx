
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedSection from "@/components/home/FeaturedSection";
import Hero from "@/components/home/Hero";
import CategoriesList from "@/components/home/CategoriesList";
import { mockData } from "@/data/blogData";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Atom, BookOpen, Globe, History, Rocket } from "lucide-react";

const Index = () => {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* Educational Categories Navigation */}
        <div className="py-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    <Atom className="mr-2 h-4 w-4" />
                    Science
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] md:grid-cols-2">
                      <Link to="/category/science" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">All Science</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Latest discoveries and scientific breakthroughs
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Physics</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Quantum mechanics, relativity and fundamental forces
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Biology</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Life sciences, genetics, and evolutionary biology
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Environment</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Climate science and ecological research
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    <Rocket className="mr-2 h-4 w-4" />
                    Technology
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] md:grid-cols-2">
                      <Link to="/category/technology" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">All Technology</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Latest innovations and technological advances
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">AI & Computing</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Artificial intelligence and computational advances
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Sustainable Tech</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Green technology and environmental solutions
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Future Tech</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Emerging technologies shaping our future
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    <History className="mr-2 h-4 w-4" />
                    History
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] md:grid-cols-2">
                      <Link to="/category/history" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">All History</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Exploring our shared human past
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Ancient Civilizations</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Early human societies and their achievements
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Medieval Period</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Life and events during the Middle Ages
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Modern History</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Events that shaped our current world
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    <Globe className="mr-2 h-4 w-4" />
                    Culture
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] md:grid-cols-2">
                      <Link to="/category/culture" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">All Culture</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Human traditions and expressions around the world
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Art & Architecture</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Creative expressions across civilizations
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Traditions</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Cultural practices and ceremonies worldwide
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Languages</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Exploration of human communication systems
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="#" className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Education Resources
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <FeaturedSection 
            featuredPost={mockData.featured} 
            recentPosts={mockData.recent} 
          />
          
          <CategoriesList blogData={mockData} />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
