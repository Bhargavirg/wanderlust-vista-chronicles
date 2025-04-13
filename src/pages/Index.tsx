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
import { Atom, BookOpen, Globe, History, Rocket, Leaf, Camera, Palette, Flower2, Film, Flag, Trophy, ChevronDown, Landmark, BookText, Anchor, Utensils, Plane } from "lucide-react";

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
                    <Plane className="mr-2 h-4 w-4" />
                    Travel
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] md:grid-cols-2">
                      <Link to="/category/travel" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">All Travel</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Explore destinations around the globe
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Adventures</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Thrilling experiences for the adventurous soul
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Cultural Experiences</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Immersive cultural experiences around the world
                        </p>
                      </Link>
                      <Link to="#" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium">Travel Tips</div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Practical advice for better journeys
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
                
                {/* Updated "More" dropdown in the navigation menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    <ChevronDown className="mr-2 h-4 w-4" />
                    More
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[600px] md:grid-cols-3">
                      <Link to="/category/nature" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium flex items-center">
                          <Leaf className="h-4 w-4 mr-2" />
                          Nature
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Explore the wonders of our natural world
                        </p>
                      </Link>
                      <Link to="/category/wildlife" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium flex items-center">
                          <Leaf className="h-4 w-4 mr-2" />
                          Wildlife
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Discover amazing animal species around the globe
                        </p>
                      </Link>
                      <Link to="/category/marine-life" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium flex items-center">
                          <Anchor className="h-4 w-4 mr-2" />
                          Marine Life
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Discover the fascinating world beneath the waves
                        </p>
                      </Link>
                      <Link to="/category/monuments" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium flex items-center">
                          <Landmark className="h-4 w-4 mr-2" />
                          Monuments
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Historical structures and architectural marvels
                        </p>
                      </Link>
                      <Link to="/category/literature" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium flex items-center">
                          <BookText className="h-4 w-4 mr-2" />
                          Literature
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          The world of books and written expression
                        </p>
                      </Link>
                      <Link to="/category/space" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium flex items-center">
                          <Rocket className="h-4 w-4 mr-2" />
                          Space
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Journey to the cosmos and beyond
                        </p>
                      </Link>
                      <Link to="/category/art" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium flex items-center">
                          <Palette className="h-4 w-4 mr-2" />
                          Art
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Human creativity across mediums
                        </p>
                      </Link>
                      <Link to="/category/flowers" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium flex items-center">
                          <Flower2 className="h-4 w-4 mr-2" />
                          Flowers
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Botanical wonders around the world
                        </p>
                      </Link>
                      <Link to="/category/food" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium flex items-center">
                          <Utensils className="h-4 w-4 mr-2" />
                          Food
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Culinary arts and global cuisines
                        </p>
                      </Link>
                      <Link to="/category/anime" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium flex items-center">
                          <Film className="h-4 w-4 mr-2" />
                          Anime
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Japanese animation and culture
                        </p>
                      </Link>
                      <Link to="/category/politics" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium flex items-center">
                          <Flag className="h-4 w-4 mr-2" />
                          Politics
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Global affairs and governance
                        </p>
                      </Link>
                      <Link to="/category/sports" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium flex items-center">
                          <Trophy className="h-4 w-4 mr-2" />
                          Sports
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Athletic competitions worldwide
                        </p>
                      </Link>
                      <Link to="/category/stories" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <div className="font-medium flex items-center">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Stories
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          Compelling narratives and tales
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
