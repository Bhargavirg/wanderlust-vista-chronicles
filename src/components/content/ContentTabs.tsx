
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Camera, Video, Upload } from "lucide-react";
import MediaUploader from "@/components/blog/MediaUploader";
import VideoEmbed from "@/components/blog/VideoEmbed";

interface ContentTabsProps {
  mainContent: string;
  setMainContent: (value: string) => void;
  coverImage: string;
  setCoverImage: (value: string) => void;
  images: string[];
  setImages: (images: string[]) => void;
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  videoType: "youtube" | "vimeo" | "mp4" | "other";
  setVideoType: (type: "youtube" | "vimeo" | "mp4" | "other") => void;
  sampleVideos: {
    title: string;
    src: string;
    type: "youtube" | "vimeo" | "mp4" | "other";
    description: string;
  }[];
}

const ContentTabs = ({
  mainContent,
  setMainContent,
  coverImage,
  setCoverImage,
  images,
  setImages,
  videoUrl,
  setVideoUrl,
  videoType,
  setVideoType,
  sampleVideos
}: ContentTabsProps) => {
  const handleImagesSelected = (imageUrls: string[]) => {
    setImages(imageUrls);
  };

  const handleVideoSelected = (url: string, type: "youtube" | "vimeo" | "mp4" | "other") => {
    setVideoUrl(url);
    setVideoType(type);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold border-b pb-2">Content</h3>
      
      <Tabs defaultValue="text">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Text
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Images
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Video
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="pt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Main Article Content</Label>
            <Textarea
              id="content"
              placeholder="Write your educational content here..."
              rows={12}
              value={mainContent}
              onChange={(e) => setMainContent(e.target.value)}
              className="font-serif"
            />
            <p className="text-xs text-gray-500">
              Pro tip: Include relevant details, facts, and keep your content engaging and informative.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="pt-4 space-y-4">
          <div className="space-y-4">
            <Label>Cover Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {coverImage ? (
                <div className="relative">
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="max-h-40 mx-auto rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setCoverImage("")}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Enter the URL for your cover image or upload from your device
                  </p>
                  <div className="flex gap-2 max-w-md mx-auto">
                    <Input 
                      placeholder="Enter image URL (Pixabay, Unsplash, etc.)" 
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                    />
                    <Button type="button" className="whitespace-nowrap">
                      Add Cover
                    </Button>
                  </div>
                  <div className="mt-2">
                    <input
                      type="file"
                      accept="image/*"
                      id="cover-upload"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            if (e.target?.result) {
                              setCoverImage(e.target.result.toString());
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => document.getElementById('cover-upload')?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload from device
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2 mt-6">
              <Label>Additional Images</Label>
              <MediaUploader
                onImagesSelected={handleImagesSelected}
                onVideoSelected={handleVideoSelected}
                maxImages={10}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="video" className="pt-4 space-y-4">
          <div className="space-y-2">
            <Label>Video Content</Label>
            <p className="text-sm text-gray-500 mb-4">
              Add a video to enhance your educational content. You can use YouTube, Vimeo, Pixabay or upload directly from your device.
            </p>
            
            <MediaUploader
              onImagesSelected={handleImagesSelected}
              onVideoSelected={handleVideoSelected}
              maxImages={0}
            />
            
            {videoUrl && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Video Preview</h4>
                <VideoEmbed 
                  src={videoUrl} 
                  type={videoType} 
                  title="Your uploaded video" 
                />
              </div>
            )}
            
            <div className="mt-8 space-y-4">
              <h4 className="font-medium mb-2 text-lg border-b pb-2">Featured Educational Videos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleVideos.map((video, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <VideoEmbed 
                      src={video.src} 
                      type={video.type} 
                      title={video.title} 
                      description={video.description}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentTabs;
