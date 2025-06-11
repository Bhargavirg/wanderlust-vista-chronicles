import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import FocusMode from "@/components/blog/FocusMode";
import ImageCarousel from "@/components/blog/ImageCarousel";
import VideoEmbed from "@/components/blog/VideoEmbed";
import PlagiarismChecker from "@/components/blog/PlagiarismChecker";
import ArticleInteractions from "@/components/blog/ArticleInteractions";
import CommentsSection from "@/components/blog/CommentsSection";
import { mockData } from "@/data/blogData";
import { Button } from "@/components/ui/button";
import { BookOpenText, Image as ImageIcon, Video as VideoIcon, ArrowLeft, Scan } from "lucide-react";
import { calculateReadingTime, formatReadingTime } from "@/utils/readingTimeUtils";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getContentById, getAllPublishedContent } from "@/services/contentService";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [focusModeActive, setFocusModeActive] = useState(false);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [plagiarismDialogOpen, setPlagiarismDialogOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    async function loadPost() {
      if (!slug) return;
      
      setLoading(true);
      try {
        console.log("Fetching post with slug:", slug);
        const contentData = await getContentById(slug);
        console.log("Fetched post content:", contentData);
        
        if (contentData) {
          setPost(contentData);
          
          // Load related content
          const allContent = await getAllPublishedContent();
          const related = allContent
            .filter(item => item.id !== slug && item.category_id === contentData.category_id)
            .slice(0, 3);
            
          setRelatedPosts(related);
        } else {
          // Fall back to mock data - adjusted to improve error handling
          console.warn("No content found with slug:", slug);
          toast({
            title: "Content Not Found",
            description: "The requested article could not be found",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        toast({
          title: "Error",
          description: "Failed to load post content",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-6 px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-6 px-4">
          <div className="text-center text-gray-500 py-12">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p>Sorry, the post you are looking for could not be found.</p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Format the post content for display
  const formatPostContent = (post: any) => {
    if (!post) return "";
    
    // Check if main_content exists and contains HTML
    if (post.main_content && post.main_content.trim()) {
      return post.main_content;
    } 
    
    // Fall back to description if main_content is empty
    if (post.description && post.description.trim()) {
      return post.description;
    }
    
    return "No content available.";
  };

  const postContent = formatPostContent(post);
  
  // Calculate reading time
  const { minutes, seconds } = calculateReadingTime(postContent);
  const readingTime = formatReadingTime(minutes, seconds);

  // Get post images for carousel
  const postImages = [
    post.cover_image,
    ...(post.additional_images || [])
  ].filter(Boolean);

  // Get image captions
  const imageCaptions = postImages.map((_, index) => 
    index === 0 ? "Featured image for this post" : `Additional image ${index}`
  );

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
              Published on {new Date(post.created_at || post.publishedAt).toLocaleDateString()} in{" "}
              <span className="text-primary font-medium hover:underline">
                {post.category?.name || post.category}
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
              
              {/* Plagiarism Checker Dialog */}
              {user && (
                <Dialog open={plagiarismDialogOpen} onOpenChange={setPlagiarismDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Scan size={16} />
                      Check Plagiarism
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Plagiarism Checker</DialogTitle>
                      <DialogDescription>
                        Check if this content has similarities with other articles in our database.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <PlagiarismChecker contentText={postContent} />
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              
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

        {/* Display post images using carousel */}
        {postImages.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-6"
          >
            <ImageCarousel 
              images={postImages} 
              captions={imageCaptions} 
            />
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="prose dark:prose-invert max-w-none"
        >
          {/* Display post content */}
          <div dangerouslySetInnerHTML={{ __html: postContent }} />
          
          {/* Video embed if available */}
          {post.video_url && (
            <div className="my-8 rounded-lg bg-gray-50 dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-medium mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <VideoIcon size={20} className="text-primary" />
                Featured Video
              </h3>
              <VideoEmbed 
                src={post.video_url}
                type={post.video_type || "youtube"}
                title="Featured video for this post"
              />
            </div>
          )}
        </motion.div>

        {/* Article Interactions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <ArticleInteractions 
            contentId={post.id}
            onCommentClick={() => setCommentsOpen(true)}
          />
        </motion.div>

        {/* Comments Section */}
        <CommentsSection 
          contentId={post.id}
          isOpen={commentsOpen}
          onClose={() => setCommentsOpen(false)}
        />

        {/* Related posts section */}
        {relatedPosts.length > 0 && (
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
        )}
      </motion.main>
      <Footer />
      
      <AnimatePresence>
        {focusModeActive && (
          <FocusMode 
            content={postContent}
            title={post.title}
            onExit={() => setFocusModeActive(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostDetail;
