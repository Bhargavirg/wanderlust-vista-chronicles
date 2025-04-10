
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface VideoEmbedProps {
  src: string;
  title?: string;
  type?: "youtube" | "vimeo" | "mp4" | "other";
}

const VideoEmbed = ({ src, title = "Video content", type = "other" }: VideoEmbedProps) => {
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
    <div className="relative w-full overflow-hidden rounded-md">
      <AspectRatio ratio={16 / 9}>
        {renderVideo()}
      </AspectRatio>
    </div>
  );
};

export default VideoEmbed;
