
import React, { useState, useEffect } from "react";
import { Moon, Sun, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { calculateReadingTime, formatReadingTime } from "@/utils/readingTimeUtils";

interface FocusModeProps {
  content: string;
  onExit: () => void;
  title: string;
}

const FocusMode = ({ content, onExit, title }: FocusModeProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { minutes, seconds, wordCount } = calculateReadingTime(content);
  const totalSeconds = minutes * 60 + seconds;
  
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => {
        const newTime = prev + 1;
        const newProgress = Math.min((newTime / totalSeconds) * 100, 100);
        setProgress(newProgress);
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [totalSeconds]);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
      style={{ overflowY: 'auto' }}
    >
      <div className="sticky top-0 z-10 backdrop-blur-md bg-opacity-80 border-b border-gray-200 dark:border-gray-800">
        <div className="container flex items-center justify-between py-4">
          <Button variant="ghost" onClick={onExit}>
            Exit Focus Mode
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary">
              <Timer size={14} className="mr-1" />
              <span className="text-sm">
                {formatReadingTime(minutes, seconds)} ({wordCount} words)
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Light mode" : "Dark mode"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>
        </div>
        
        <div className="h-1 bg-gray-200 dark:bg-gray-800">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className={`container py-12 max-w-3xl mx-auto ${isDarkMode ? 'prose-invert' : ''}`}>
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        <div className="prose dark:prose-invert max-w-none">
          {content.split('\n').map((paragraph, i) => (
            paragraph ? <p key={i}>{paragraph}</p> : <br key={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FocusMode;
