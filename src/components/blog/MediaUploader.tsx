
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Image, X, Video, Plus, Upload } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "@/hooks/use-toast";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

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
      toast({
        title: "Invalid URL",
        description: "Please enter a valid image URL",
        variant: "destructive"
      });
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
      toast({
        title: "Invalid URL",
        description: "Please enter a valid video URL",
        variant: "destructive"
      });
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
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      
      if (imageUrls.length + filesArray.length > maxImages) {
        toast({
          title: "Too many images",
          description: `You can only upload a maximum of ${maxImages} images`,
          variant: "destructive"
        });
        return;
      }
      
      // Convert files to data URLs
      filesArray.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              const newImages = [...imageUrls, e.target.result.toString()];
              setImageUrls(newImages);
              onImagesSelected(newImages);
            }
          };
          reader.readAsDataURL(file);
        } else {
          toast({
            title: "Invalid file type",
            description: "Please upload only image files",
            variant: "destructive"
          });
        }
      });
    }
  };
  
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (file.type.startsWith('video/')) {
        const localVideoUrl = URL.createObjectURL(file);
        setVideoUrl(localVideoUrl);
        onVideoSelected(localVideoUrl, "mp4");
        setShowVideoInput(false);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload only video files",
          variant: "destructive"
        });
      }
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
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentImageInput}
              onChange={(e) => setCurrentImageInput(e.target.value)}
              placeholder="Enter image URL (from Pixabay, Unsplash, etc.)"
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <Button onClick={handleAddImage}>Add URL</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">or</div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload from device
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowImageInput(false)}
            >
              Cancel
            </Button>
          </div>
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
              placeholder="Enter YouTube, Vimeo or video URL"
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <Button onClick={handleAddVideo}>Add URL</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">or</div>
            <input
              ref={videoFileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoFileChange}
            />
            <Button 
              variant="outline" 
              onClick={() => videoFileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload video file
            </Button>
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
