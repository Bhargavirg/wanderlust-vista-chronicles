
import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  embed_id: string;
  duration: string;
  category: string;
}

const VideosPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching videos:', error);
        } else {
          setVideos(data || []);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-1 container py-6">
          <div className="text-center">Loading videos...</div>
        </main>
        <Footer />
      </div>
    );
  }

  const featuredVideo = videos[0];
  const otherVideos = videos.slice(1);

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
        {featuredVideo && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Featured Video</h2>
            <div className="bg-black rounded-lg overflow-hidden shadow-xl">
              <div className="aspect-video">
                <iframe 
                  src={`https://www.youtube.com/embed/${featuredVideo.embed_id}`}
                  title={featuredVideo.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
              <div className="p-4 bg-gray-900 text-white">
                <h3 className="text-xl font-bold">{featuredVideo.title}</h3>
                <p className="text-gray-300 mt-1">{featuredVideo.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Video grid */}
        <h2 className="text-xl font-semibold mb-4">All Videos</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {otherVideos.map((video) => (
            <motion.div 
              key={video.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.embed_id}`}
                    title={video.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
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
