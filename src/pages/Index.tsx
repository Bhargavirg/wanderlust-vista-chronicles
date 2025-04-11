
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
import { Atom, BookOpen, Globe, History, Rocket, Leaf, Camera, Palette, Flower2 } from "lucide-react";

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
                  <NavigationMenuTrigger className="bg-transparent">
                    <Palette className="mr-2 h-4 w-4" />
                    Art
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] md:grid-cols-2">
                      <Link to="/category/art" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">All Art</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Explore human creativity across different mediums
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Visual Arts</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Painting, sculpture and other visual expressions
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Digital Art</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Modern creative expressions using technology
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Art History</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Evolution of artistic movements and styles
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    <Flower2 className="mr-2 h-4 w-4" />
                    Flowers
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] md:grid-cols-2">
                      <Link to="/category/flowers" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">All Flowers</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Discover the beautiful world of flowers
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Rare Species</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Unusual and exotic flowering plants
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Gardening</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Growing and caring for flowers
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Cultural Significance</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Symbolism and meaning of flowers across cultures
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/add-content" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 focus:outline-none">
                      <Camera className="mr-2 h-4 w-4" />
                      Add Content
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        {/* Featured bar - Changed from yellow to sky blue */}
        <div className="bg-sky-500 py-2 my-4">
          <div className="container">
            <h2 className="text-white font-bold text-lg">FEATURED CONTENT</h2>
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
        
        {/* Content creation CTA - Changed from yellow to sky blue */}
        <div className="bg-gray-900 text-white py-16 mt-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block bg-sky-500 px-4 py-1 text-white font-bold mb-6">
                SHARE YOUR PERSPECTIVE
              </div>
              <h2 className="text-4xl font-bold mb-4">Become a Contributor</h2>
              <p className="text-lg mb-8">
                Join our community of explorers, scientists, and storytellers. Share your knowledge and experiences with the world.
              </p>
              <Link 
                to="/add-content"
                className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 font-semibold text-lg transition-colors"
              >
                Add Your Content
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
