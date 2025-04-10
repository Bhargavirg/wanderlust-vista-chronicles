
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import FocusMode from "@/components/blog/FocusMode";
import ImageCarousel from "@/components/blog/ImageCarousel";
import VideoEmbed from "@/components/blog/VideoEmbed";
import { mockData } from "@/data/blogData";
import { Button } from "@/components/ui/button";
import { BookOpenText, Image as ImageIcon, Video as VideoIcon, ArrowLeft } from "lucide-react";
import { calculateReadingTime, formatReadingTime } from "@/utils/readingTimeUtils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [focusModeActive, setFocusModeActive] = useState(false);
  
  // Fix: Access the posts from the byCategory object, combining all categories
  const allPosts = Object.values(mockData.byCategory || {}).flat();
  // Also include featured and recent posts to ensure we find all posts
  const combinedPosts = [
    ...(mockData.featured ? [mockData.featured] : []), 
    ...(mockData.recent || []), 
    ...allPosts
  ];
  // Remove duplicates by ID
  const uniquePosts = Array.from(new Map(combinedPosts.map(post => [post?.id, post])).values()).filter(Boolean);
  // Find the post by ID
  const post = uniquePosts.find((p) => p?.id === postId);

  // Mock media data for demonstration purposes
  // In a real app, this would come from the backend
  const sampleImages = post ? [
    post.coverImage,
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  ] : [];
  
  const sampleCaptions = [
    "Featured image for this blog post",
    "Illustration of technology concept",
    "Close-up of computer components"
  ];
  
  const sampleVideo = {
    src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    type: "youtube" as const,
    title: "Key concepts explained",
    description: "This video explains the core concepts discussed in this article in detail."
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-6 px-4">
          <div className="text-center text-gray-500 py-12">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p>Sorry, the post you are looking for could not be found.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { minutes, seconds } = calculateReadingTime(post.excerpt);
  const readingTime = formatReadingTime(minutes, seconds);

  // Find related posts with the same category
  const relatedPosts = uniquePosts
    .filter((p) => p?.category === post.category && p?.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-3 px-4 shadow-sm">
        <div className="container mx-auto">
          <Link to="/home" className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </div>
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 container mx-auto py-6 px-4"
      >
        <div className="mb-6">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
          >
            {post.title}
          </motion.h1>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-gray-600 dark:text-gray-400">
              Published on {new Date(post.publishedAt).toLocaleDateString()} in{" "}
              <span 
                className="text-primary font-medium hover:underline"
              >
                {post.category}
              </span>
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm flex items-center gap-1 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {readingTime}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setFocusModeActive(true)}
                      className="flex items-center gap-1"
                    >
                      <BookOpenText size={16} />
                      Focus Mode
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Read in distraction-free mode</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Display multiple images using carousel */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-6"
        >
          <ImageCarousel 
            images={sampleImages} 
            captions={sampleCaptions} 
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="prose dark:prose-invert max-w-none"
        >
          <p>{post.excerpt}</p>
          
          {/* Video embed example */}
          <div className="my-8 rounded-lg bg-gray-50 dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <VideoIcon size={20} className="text-primary" />
              Featured Video
            </h3>
            <VideoEmbed 
              src={sampleVideo.src}
              type={sampleVideo.type}
              title={sampleVideo.title}
              description={sampleVideo.description}
            />
          </div>

          <p className="mt-6">
            {post.excerpt} {/* Duplicate content for demo purposes */}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <span className="w-8 h-1 bg-primary block rounded-full"></span>
            More Like This
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </motion.div>
      </motion.main>
      <Footer />
      
      <AnimatePresence>
        {focusModeActive && (
          <FocusMode 
            content={post.excerpt}
            title={post.title}
            onExit={() => setFocusModeActive(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostDetail;
