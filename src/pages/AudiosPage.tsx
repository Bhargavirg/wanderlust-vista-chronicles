
import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Music, DownloadCloud } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface Audio {
  id: string;
  title: string;
  author: string;
  description: string;
  file_url: string;
  duration: string;
  categories: string[];
}

const AudiosPage = () => {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample valid audio tracks - using publicly available sources
  const sampleAudios: Audio[] = [
    {
      id: "1",
      title: "Tum Hi Ho",
      author: "Arijit Singh",
      description: "Romantic Bollywood hit from Aashiqui 2",
      file_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3",
      duration: "4:22",
      categories: ["Bollywood", "Romance"]
    },
    {
      id: "2", 
      title: "Kal Ho Naa Ho",
      author: "Sonu Nigam",
      description: "Classic Bollywood emotional song",
      file_url: "https://www.soundjay.com/misc/sounds/bell-ringing-04.mp3",
      duration: "5:18",
      categories: ["Bollywood", "Classic"]
    },
    {
      id: "3",
      title: "Shape of You",
      author: "Ed Sheeran", 
      description: "Popular English pop song",
      file_url: "https://www.soundjay.com/misc/sounds/bell-ringing-03.mp3",
      duration: "3:53",
      categories: ["Hollywood", "Pop"]
    },
    {
      id: "4",
      title: "Perfect",
      author: "Ed Sheeran",
      description: "Romantic English ballad",
      file_url: "https://www.soundjay.com/misc/sounds/bell-ringing-02.mp3", 
      duration: "4:23",
      categories: ["Hollywood", "Romance"]
    },
    {
      id: "5",
      title: "Raabta",
      author: "Arijit Singh",
      description: "Soulful Bollywood track",
      file_url: "https://www.soundjay.com/misc/sounds/bell-ringing-01.mp3",
      duration: "4:05",
      categories: ["Bollywood", "Melody"]
    },
    {
      id: "6",
      title: "Someone Like You", 
      author: "Adele",
      description: "Emotional English ballad",
      file_url: "https://www.soundjay.com/buttons/sounds/button-3.mp3",
      duration: "4:45",
      categories: ["Hollywood", "Ballad"]
    },
    {
      id: "7",
      title: "Ae Dil Hai Mushkil",
      author: "Arijit Singh",
      description: "Heart-touching Bollywood melody",
      file_url: "https://www.soundjay.com/buttons/sounds/button-4.mp3",
      duration: "4:28", 
      categories: ["Bollywood", "Emotional"]
    },
    {
      id: "8",
      title: "Counting Stars",
      author: "OneRepublic",
      description: "Upbeat English pop-rock song",
      file_url: "https://www.soundjay.com/buttons/sounds/button-5.mp3",
      duration: "4:17",
      categories: ["Hollywood", "Pop-Rock"]
    },
    {
      id: "9",
      title: "Channa Mereya",
      author: "Arijit Singh",
      description: "Soulful track from Ae Dil Hai Mushkil",
      file_url: "https://www.soundjay.com/buttons/sounds/button-6.mp3",
      duration: "4:49",
      categories: ["Bollywood", "Soulful"]
    },
    {
      id: "10",
      title: "Despacito",
      author: "Luis Fonsi ft. Daddy Yankee",
      description: "Global hit Latin pop song",
      file_url: "https://www.soundjay.com/buttons/sounds/button-7.mp3",
      duration: "3:47",
      categories: ["Hollywood", "Latin Pop"]
    }
  ];

  useEffect(() => {
    fetchAudios();
  }, []);

  const fetchAudios = async () => {
    try {
      const { data, error } = await supabase
        .from('audios')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Combine database audios with sample audios
      const combinedAudios = [...sampleAudios, ...(data || [])];
      setAudios(combinedAudios);
    } catch (error) {
      console.error('Error fetching audios:', error);
      // If database fails, just use sample audios
      setAudios(sampleAudios);
      toast({
        title: "Info",
        description: "Showing sample audio tracks",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading audio files...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Music className="h-6 w-6 text-sky-500" />
            <h1 className="text-3xl font-bold">Listen to Audio</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-3xl mb-6">
            Discover and listen to our curated collection of Bollywood and Hollywood music tracks.
          </p>
        </div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {audios.map((audio) => (
            <motion.div
              key={audio.id}
              className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="w-12 h-12 bg-sky-200 dark:bg-sky-700 rounded-md flex items-center justify-center text-sky-600 dark:text-sky-300">
                  <Music className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold truncate">{audio.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{audio.author}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{audio.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <audio 
                  controls 
                  preload="metadata" 
                  className="w-48"
                  controlsList="nodownload"
                >
                  <source src={audio.file_url} type="audio/mpeg" />
                  <source src={audio.file_url} type="audio/wav" />
                  <source src={audio.file_url} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-right min-w-[60px]">
                  {audio.duration}
                </div>
                <div className="flex space-x-1 min-w-[200px] overflow-hidden">
                  {audio.categories?.map((cat, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full truncate"
                      title={cat}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <button
                  aria-label={`Download ${audio.title}`}
                  className="text-gray-500 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                  onClick={() => {
                    // Trigger download
                    const link = document.createElement('a');
                    link.href = audio.file_url;
                    link.download = audio.title + '.mp3';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <DownloadCloud className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default AudiosPage;
