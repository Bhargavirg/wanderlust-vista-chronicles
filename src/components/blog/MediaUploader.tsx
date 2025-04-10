
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Image, X, Video, Plus } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface MediaUploaderProps {
  onImagesSelected: (imageUrls: string[]) => void;
  onVideoSelected: (videoUrl: string, type: "youtube" | "vimeo" | "mp4" | "other") => void;
  maxImages?: number;
}

const MediaUploader = ({
  onImagesSelected,
  onVideoSelected,
  maxImages = 5
}: MediaUploaderProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoType, setVideoType] = useState<"youtube" | "vimeo" | "mp4" | "other">("youtube");
  const [showImageInput, setShowImageInput] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [currentImageInput, setCurrentImageInput] = useState("");

  const handleAddImage = () => {
    if (!currentImageInput.trim()) return;
    
    // Validate URL
    try {
      new URL(currentImageInput);
      
      const newImages = [...imageUrls, currentImageInput];
      setImageUrls(newImages);
      setCurrentImageInput("");
      onImagesSelected(newImages);
      
      if (newImages.length >= maxImages) {
        setShowImageInput(false);
      }
    } catch (e) {
      // Invalid URL, handle error
      console.error("Invalid URL:", currentImageInput);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImages);
    onImagesSelected(newImages);
  };

  const handleAddVideo = () => {
    if (!videoUrl.trim()) return;
    
    try {
      new URL(videoUrl);
      onVideoSelected(videoUrl, determineVideoType(videoUrl));
      setShowVideoInput(false);
    } catch (e) {
      console.error("Invalid URL:", videoUrl);
    }
  };

  const determineVideoType = (url: string): "youtube" | "vimeo" | "mp4" | "other" => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube";
    } else if (url.includes("vimeo.com")) {
      return "vimeo";
    } else if (url.endsWith(".mp4")) {
      return "mp4";
    } else {
      return "other";
    }
  };

  return (
    <div className="space-y-4">
      {/* Image Gallery Preview */}
      {imageUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative group">
              <AspectRatio ratio={16/9}>
                <img 
                  src={url} 
                  alt={`Gallery image ${index + 1}`} 
                  className="w-full h-full object-cover rounded-md"
                  onError={(e) => {
                    // Set to placeholder on error
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image";
                  }}
                />
              </AspectRatio>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Image Upload Controls */}
      {showImageInput ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={currentImageInput}
            onChange={(e) => setCurrentImageInput(e.target.value)}
            placeholder="Enter image URL"
            className="flex-1 px-3 py-2 border rounded-md"
          />
          <Button onClick={handleAddImage}>Add</Button>
          <Button 
            variant="outline" 
            onClick={() => setShowImageInput(false)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        imageUrls.length < maxImages && (
          <Button
            variant="outline"
            onClick={() => setShowImageInput(true)}
            className="w-full py-6"
          >
            <Image className="mr-2 h-5 w-5" />
            {imageUrls.length === 0 ? "Add Images" : "Add More Images"}
          </Button>
        )
      )}

      {/* Video Upload Controls */}
      {showVideoInput ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Enter YouTube, Vimeo or MP4 video URL"
              className="flex-1 px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddVideo}>Add Video</Button>
            <Button 
              variant="outline" 
              onClick={() => setShowVideoInput(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => setShowVideoInput(true)}
          className="w-full py-6"
        >
          <Video className="mr-2 h-5 w-5" />
          Add Video
        </Button>
      )}
    </div>
  );
};

export default MediaUploader;
