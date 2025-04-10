
import React, { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Maximize2, Minimize2, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoEmbedProps {
  src: string;
  title?: string;
  description?: string;
  type?: "youtube" | "vimeo" | "mp4" | "other";
}

const VideoEmbed = ({ 
  src, 
  title = "Video content", 
  description = "", 
  type = "other" 
}: VideoEmbedProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();
  
  // Extract YouTube video ID from URL
  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };
  
  // Extract Vimeo video ID from URL
  const getVimeoEmbedUrl = (url: string) => {
    const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|)(\d+)(?:|\/\?)/;
    const match = url.match(regExp);
    const videoId = match ? match[2] : null;
    
    return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
  };

  const toggleFullscreen = () => {
    const videoElement = document.getElementById('video-container');
    
    if (!document.fullscreenElement) {
      videoElement?.requestFullscreen().catch((err) => {
        toast({
          title: "Error",
          description: `Could not enable fullscreen mode: ${err.message}`,
          variant: "destructive",
        });
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  const shareVideo = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description || "Check out this video",
        url: src,
      })
      .catch(() => {
        navigator.clipboard.writeText(src);
        toast({
          title: "Link copied",
          description: "Video link copied to clipboard",
        });
      });
    } else {
      navigator.clipboard.writeText(src);
      toast({
        title: "Link copied",
        description: "Video link copied to clipboard",
      });
    }
  };

  const renderVideo = () => {
    switch (type) {
      case "youtube":
        return (
          <iframe
            src={getYoutubeEmbedUrl(src)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-md"
          />
        );
      case "vimeo":
        return (
          <iframe
            src={getVimeoEmbedUrl(src)}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-md"
          />
        );
      case "mp4":
        return (
          <video
            src={src}
            controls
            className="absolute top-0 left-0 w-full h-full rounded-md"
            title={title}
          />
        );
      default:
        // For other video types, try to embed as generic video
        return (
          <video
            src={src}
            controls
            className="absolute top-0 left-0 w-full h-full rounded-md"
            title={title}
          >
            Your browser doesn't support this video format.
          </video>
        );
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative w-full overflow-hidden rounded-md shadow-md group" id="video-container">
        <AspectRatio ratio={16 / 9}>
          {renderVideo()}
        </AspectRatio>
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-black/60 border-none text-white hover:bg-black/80"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</p>
              </TooltipContent>
            </Tooltip>
            
            {description && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 bg-black/60 border-none text-white hover:bg-black/80"
                    onClick={() => toast({
                      title: "Video Information",
                      description: description,
                    })}
                  >
                    <Info size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Video information</p>
                </TooltipContent>
              </Tooltip>
            )}
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 bg-black/60 border-none text-white hover:bg-black/80"
                  onClick={shareVideo}
                >
                  <Share2 size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share video</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {title && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      )}
    </div>
  );
};

export default VideoEmbed;
