
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MediaUploader from "@/components/blog/MediaUploader";
import { Image, Video, Loader2, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoType, setVideoType] = useState<"youtube" | "vimeo" | "mp4" | "other">("youtube");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setCoverImage(file);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setCoverImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload only image files",
          variant: "destructive",
        });
      }
    }
  };

  const handleImagesSelected = (imageUrls: string[]) => {
    setAdditionalImages(imageUrls);
  };

  const handleVideoSelected = (url: string, type: "youtube" | "vimeo" | "mp4" | "other") => {
    setVideoUrl(url);
    setVideoType(type);
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your post.",
        variant: "destructive",
      });
      return;
    }
    
    if (!category) {
      toast({
        title: "Category required",
        description: "Please select a category for your post.",
        variant: "destructive",
      });
      return;
    }
    
    if (!coverImage && !coverImagePreview) {
      toast({
        title: "Cover image required",
        description: "Please upload a cover image for your post.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    // In a real app, this would upload the image and save the post to a database
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: isDraft ? "Draft saved" : "Post published",
        description: isDraft 
          ? "Your draft has been saved successfully." 
          : "Your post has been published successfully.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
          
          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="culture">Culture</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="wildlife">Wildlife</SelectItem>
                  <SelectItem value="space">Space</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="flowers">Flowers</SelectItem>
                  <SelectItem value="anime">Anime</SelectItem>
                  <SelectItem value="politics">Politics</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="stories">Stories</SelectItem>
                  <SelectItem value="archaeology">Archaeology</SelectItem>
                  <SelectItem value="psychology">Psychology</SelectItem>
                  <SelectItem value="climate">Climate</SelectItem>
                  <SelectItem value="mythology">Mythology</SelectItem>
                  <SelectItem value="current-affairs">Current Affairs</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="business-economics">Business & Economics</SelectItem>
                  <SelectItem value="deep-earth-geology">Deep Earth & Geology</SelectItem>
                  <SelectItem value="ancient-civilizations">Ancient Civilizations</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Tabs defaultValue="image" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Cover Image
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Additional Media
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="image">
                <div 
                  className="border-2 border-dashed border-muted rounded-lg p-6 text-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {coverImagePreview ? (
                    <div className="relative">
                      <img
                        src={coverImagePreview}
                        alt="Cover preview"
                        className="max-h-60 mx-auto rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setCoverImage(null);
                          setCoverImagePreview("");
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Image className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4 flex flex-col items-center text-sm leading-6 text-muted-foreground">
                        <label
                          htmlFor="cover-image"
                          className="relative cursor-pointer rounded-md bg-background px-3 py-2 text-sm font-semibold text-primary ring-1 ring-inset ring-primary hover:bg-primary/10"
                        >
                          <span>Upload image</span>
                          <input
                            id="cover-image"
                            name="cover-image"
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="mt-2">or drag and drop</p>
                        <p className="mt-1">or paste image URL</p>
                        <div className="mt-2 flex w-full max-w-xs gap-2">
                          <Input 
                            placeholder="Image URL" 
                            className="flex-1"
                            value={coverImagePreview}
                            onChange={(e) => setCoverImagePreview(e.target.value)}
                          />
                          <Button 
                            type="button" 
                            size="sm" 
                            disabled={!coverImagePreview}
                            onClick={() => {
                              // Validate URL
                              try {
                                new URL(coverImagePreview);
                              } catch (e) {
                                toast({
                                  title: "Invalid URL",
                                  description: "Please enter a valid image URL",
                                  variant: "destructive",
                                });
                                return;
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="media">
                <div className="border rounded-lg p-6">
                  <h3 className="font-medium mb-4">Add Additional Media</h3>
                  <MediaUploader 
                    onImagesSelected={handleImagesSelected}
                    onVideoSelected={handleVideoSelected}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <div className="border rounded-md p-2">
                <div className="flex items-center space-x-2 mb-2 border-b pb-2">
                  <Button type="button" variant="ghost" size="sm">
                    Bold
                  </Button>
                  <Button type="button" variant="ghost" size="sm">
                    Italic
                  </Button>
                  <Button type="button" variant="ghost" size="sm">
                    Link
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="ml-auto">
                    <Image className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                  <Button type="button" variant="ghost" size="sm">
                    <Video className="h-4 w-4 mr-2" />
                    Add Video
                  </Button>
                </div>
                <Textarea
                  id="content"
                  placeholder="Write your post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[300px] border-0 focus-visible:ring-0"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={(e) => handleSubmit(e, true)}
              >
                Save as Draft
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish Post"
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewPost;
