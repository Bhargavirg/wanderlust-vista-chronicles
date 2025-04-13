
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Film, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VideosPage = () => {
  // Sample video data
  const videos = [
    {
      id: "v1",
      title: "Secrets of the Deep Ocean",
      description: "Explore the mysteries of the deepest parts of our oceans",
      thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      embedId: "dIiO8bhqZxQ",
      duration: "12:45",
      category: "Nature"
    },
    {
      id: "v2",
      title: "Wonders of the Amazon Rainforest",
      description: "Journey through the most biodiverse ecosystem on Earth",
      thumbnail: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      embedId: "JEGYpEcHSbw",
      duration: "15:20",
      category: "Wildlife"
    },
    {
      id: "v3",
      title: "Ancient Monuments: Lost Civilizations",
      description: "Uncovering the mysteries of ancient architectural marvels",
      thumbnail: "https://images.unsplash.com/photo-1562979314-bee7453e911c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      embedId: "rRi-IjrG-dc",
      duration: "18:30",
      category: "History"
    },
    {
      id: "v4",
      title: "Space Exploration: Journey to the Stars",
      description: "The latest discoveries in astronomy and space exploration",
      thumbnail: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      embedId: "GoW8Tf7hTGA",
      duration: "21:15",
      category: "Space"
    },
    {
      id: "v5",
      title: "The Art of Traditional Japanese Cuisine",
      description: "Exploring the techniques and philosophy behind Japanese cooking",
      thumbnail: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      embedId: "M-7KUpW7ORI",
      duration: "14:50",
      category: "Food"
    },
    {
      id: "v6",
      title: "Cultural Festivals Around the World",
      description: "Celebrating diversity through traditional festivals",
      thumbnail: "https://images.unsplash.com/photo-1604342427969-5f06aa2e60c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      embedId: "QOaYtf61tGo",
      duration: "16:40",
      category: "Culture"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Film className="h-6 w-6 text-sky-500" />
            <h1 className="text-3xl font-bold">Videos</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
            Explore our collection of educational and inspiring videos about science, nature, history, and culture from around the world.
          </p>
        </div>

        {/* Featured video */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Featured Video</h2>
          <div className="bg-black rounded-lg overflow-hidden shadow-xl">
            <div className="aspect-video">
              <iframe 
                src="https://www.youtube.com/embed/dIiO8bhqZxQ" 
                title="Earth's Natural Wonders"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
            <div className="p-4 bg-gray-900 text-white">
              <h3 className="text-xl font-bold">Secrets of the Deep Ocean</h3>
              <p className="text-gray-300 mt-1">Explore the mysteries of the deepest parts of our oceans</p>
            </div>
          </div>
        </div>

        {/* Video grid */}
        <h2 className="text-xl font-semibold mb-4">All Videos</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {videos.map((video) => (
            <motion.div 
              key={video.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button 
                    size="icon" 
                    className="rounded-full w-12 h-12 bg-sky-500/90 hover:bg-sky-600 text-white"
                    asChild
                  >
                    <Link to={`/video/${video.id}`}>
                      <Play className="w-6 h-6" />
                    </Link>
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm flex-1">
                  {video.description}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {video.category}
                  </span>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-sky-500 p-0"
                    asChild
                  >
                    <Link to={`/video/${video.id}`}>
                      Watch Now
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default VideosPage;
