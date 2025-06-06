
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import KidsStoryList from "@/components/kids/KidsStoryList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const KidsZone = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching kids stories for:", searchQuery);
    // Will implement actual search functionality later
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="container py-6">
          {/* Hero Section */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-6 mb-8">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Kids Zone</h1>
              <p className="text-lg mb-6">Discover fun and educational animated stories for children of all ages</p>
              <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
                <Input
                  type="search"
                  placeholder="Search for stories..."
                  className="w-full pl-10 bg-white/20 text-white placeholder:text-white/70 border-white/30 focus-visible:ring-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>

          {/* Age Group Tabs */}
          <div className="mb-8">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Stories</TabsTrigger>
                  <TabsTrigger value="3-5">Ages 3-5</TabsTrigger>
                  <TabsTrigger value="6-8">Ages 6-8</TabsTrigger>
                  <TabsTrigger value="9-12">Ages 9-12</TabsTrigger>
                </TabsList>

                <Button asChild className="flex items-center gap-2">
                  <Link to="/kids/create">
                    <BookOpen className="h-4 w-4" />
                    <span>{isMobile ? "Create" : "Create Story"}</span>
                  </Link>
                </Button>
              </div>

              <TabsContent value="all">
                <KidsStoryList filter="all" />
              </TabsContent>
              <TabsContent value="3-5">
                <KidsStoryList filter="3-5" />
              </TabsContent>
              <TabsContent value="6-8">
                <KidsStoryList filter="6-8" />
              </TabsContent>
              <TabsContent value="9-12">
                <KidsStoryList filter="9-12" />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Featured Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-video relative overflow-hidden bg-purple-100">
                  <img 
                    src="https://images.unsplash.com/photo-1501286353178-1ec871fac821?auto=format&fit=crop&w=800" 
                    alt="Monkey Adventures" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full">Featured</div>
                </div>
                <CardHeader>
                  <CardTitle>The Monkey's Adventure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Join Milo the monkey on an exciting journey through the jungle as he learns about friendship and courage.</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-sm text-purple-600 font-medium">Ages 6-8</span>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/kids/story/1">Watch Story</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-video relative overflow-hidden bg-blue-100">
                  <img 
                    src="https://images.unsplash.com/photo-1441057206919-63d19fac2369?auto=format&fit=crop&w=800" 
                    alt="Penguin Pals" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full">Featured</div>
                </div>
                <CardHeader>
                  <CardTitle>Penguin Pals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Two penguin friends explore the icy world of Antarctica and discover the importance of helping others.</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-sm text-purple-600 font-medium">Ages 3-5</span>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/kids/story/2">Watch Story</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* Categories Grid */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Animals', 'Adventure', 'Educational', 'Fantasy', 'Nature', 'Science', 'Friendship', 'Family'].map((category) => (
                <Link 
                  key={category} 
                  to={`/kids/category/${category.toLowerCase()}`}
                  className="bg-gradient-to-br from-indigo-50 to-purple-100 p-4 rounded-lg text-center hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <h3 className="text-lg font-medium text-purple-800">{category}</h3>
                  <p className="text-xs text-purple-600 mt-1">Stories</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KidsZone;
