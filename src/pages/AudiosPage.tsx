
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Music, DownloadCloud } from "lucide-react";
import { motion } from "framer-motion";

const AudiosPage = () => {
  // Sample audio data with royalty-free audio URLs
  const audios = [
    {
      id: "a1",
      title: "Forest Ambience",
      author: "Nature Sounds",
      description: "Relaxing forest sounds with birds chirping",
      src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      duration: "3:45",
      categories: ["Nature", "Ambient", "Relaxing"]
    },
    {
      id: "a2",
      title: "Ocean Waves",
      author: "Ocean Recordings",
      description: "Peaceful ocean waves for meditation",
      src: "https://file-examples.com/storage/fe68c982be66f447a9512b3/2017/11/file_example_MP3_700KB.mp3",
      duration: "2:30",
      categories: ["Ocean", "Meditation", "Peaceful"]
    },
    {
      id: "a3",
      title: "Rain Drops",
      author: "Weather Sounds",
      description: "Gentle rain falling on leaves",
      src: "https://file-examples.com/storage/fe68c982be66f447a9512b3/2017/11/file_example_MP3_1MG.mp3",
      duration: "4:12",
      categories: ["Rain", "Nature", "Calming"]
    },
    {
      id: "a4",
      title: "Bird Songs",
      author: "Wildlife Audio",
      description: "Morning bird songs in the wilderness",
      src: "https://file-examples.com/storage/fe68c982be66f447a9512b3/2017/11/file_example_MP3_2MG.mp3",
      duration: "5:20",
      categories: ["Birds", "Wildlife", "Morning"]
    }
  ];

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
            Discover and listen to our curated collection of nature sounds and ambient audio tracks.
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
                <audio controls preload="none" className="w-48">
                  <source src={audio.src} type="audio/mpeg" />
                  <source src={audio.src} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-right min-w-[60px]">
                  {audio.duration}
                </div>
                <div className="flex space-x-1 min-w-[200px] overflow-hidden">
                  {audio.categories.map((cat, idx) => (
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
                    link.href = audio.src;
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
