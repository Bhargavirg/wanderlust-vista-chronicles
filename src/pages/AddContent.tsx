
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Camera, Video, FileText, Upload, Loader2, Globe, MapPin, BookOpen, Users, Check } from "lucide-react";
import MediaUploader from "@/components/blog/MediaUploader";
import { EducationalMetadata } from "@/types/mediaTypes";
import VideoEmbed from "@/components/blog/VideoEmbed";

const AddContent = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [mainContent, setMainContent] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Media states
  const [images, setImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoType, setVideoType] = useState<"youtube" | "vimeo" | "mp4" | "other">("youtube");
  
  // Educational metadata
  const [educationalMetadata, setEducationalMetadata] = useState<EducationalMetadata>({
    difficulty: "beginner",
    ageRange: "All ages",
    subjects: [],
    factCheck: false,
    expertReviewed: false,
  });

  // Demo videos
  const sampleVideos = [
    {
      title: "Earth's Natural Wonders",
      src: "https://www.youtube.com/watch?v=Qw6uXh9yM54",
      type: "youtube" as const,
      description: "Explore the most breathtaking landscapes on our planet"
    },
    {
      title: "Deep Ocean Exploration",
      src: "https://www.youtube.com/watch?v=Y2tm40uMhDI",
      type: "youtube" as const,
      description: "Journey to the depths of our mysterious oceans"
    },
    {
      title: "Wildlife in Natural Habitats",
      src: "https://www.youtube.com/watch?v=35RQ_h6gVOA",
      type: "youtube" as const,
      description: "Observe animals in their natural environments"
    },
    {
      title: "Space: The Final Frontier",
      src: "https://www.youtube.com/watch?v=udAL48P5NJU",
      type: "youtube" as const,
      description: "Explore the wonders of our universe"
    },
    {
      title: "Cultural Traditions Around the World",
      src: "https://www.youtube.com/watch?v=O-t2h2UDEys",
      type: "youtube" as const,
      description: "Discover diverse cultural practices from different societies"
    },
    {
      title: "Amazing Animal Facts",
      src: "https://www.youtube.com/watch?v=VWEvj3N40JA",
      type: "youtube" as const,
      description: "Learn fascinating facts about animals from around the world"
    }
  ];

  const handleImagesSelected = (imageUrls: string[]) => {
    setImages(imageUrls);
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
        description: "Please enter a title for your content.",
        variant: "destructive",
      });
      return;
    }
    
    if (!category) {
      toast({
        title: "Category required",
        description: "Please select a category for your content.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    // In a real app, this would save the content to a database
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: isDraft ? "Draft saved" : "Content published",
        description: isDraft 
          ? "Your draft has been saved successfully." 
          : "Your content has been published successfully.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="relative py-12 bg-cover bg-center" style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80)`
      }}>
        <div className="absolute left-0 top-0 h-full w-2 bg-yellow-400"></div>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Share Your Perspective</h1>
            <p className="text-lg opacity-90">Add educational content to inspire and inform others about our amazing world.</p>
          </div>
        </div>
      </div>
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="bg-yellow-400 py-4 px-6">
              <h2 className="text-xl font-bold text-black">Create New Content</h2>
            </div>
            
            <form onSubmit={(e) => handleSubmit(e, false)} className="p-6">
              <div className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2">Basic Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter a descriptive title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="culture">Culture</SelectItem>
                          <SelectItem value="nature">Nature</SelectItem>
                          <SelectItem value="wildlife">Wildlife</SelectItem>
                          <SelectItem value="space">Space</SelectItem>
                          <SelectItem value="art">Art</SelectItem>
                          <SelectItem value="food">Food</SelectItem>
                          <SelectItem value="flowers">Flowers</SelectItem>
                          <SelectItem value="anime">Anime</SelectItem>
                          <SelectItem value="politics">Politics</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="stories">Stories</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          id="location"
                          placeholder="Where was this content captured/created?"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter a brief summary of your content (100-200 characters)"
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="relative">
                      <Input
                        id="tags"
                        placeholder="Enter tags separated by commas"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-gray-500">e.g., rainforest, biodiversity, amazon</p>
                  </div>
                </div>
                
                {/* Educational Metadata */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2">Educational Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ageRange">Target Age Range</Label>
                      <Select 
                        value={educationalMetadata.ageRange} 
                        onValueChange={(val) => setEducationalMetadata({...educationalMetadata, ageRange: val})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All ages">All ages</SelectItem>
                          <SelectItem value="Elementary (5-10)">Elementary (5-10)</SelectItem>
                          <SelectItem value="Middle School (11-13)">Middle School (11-13)</SelectItem>
                          <SelectItem value="High School (14-18)">High School (14-18)</SelectItem>
                          <SelectItem value="College (18+)">College (18+)</SelectItem>
                          <SelectItem value="Adult">Adult</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select 
                        value={educationalMetadata.difficulty} 
                        onValueChange={(val: "beginner" | "intermediate" | "advanced") => setEducationalMetadata({...educationalMetadata, difficulty: val})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="factCheck" 
                        checked={educationalMetadata.factCheck}
                        onChange={(e) => setEducationalMetadata({...educationalMetadata, factCheck: e.target.checked})}
                        className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                      />
                      <label htmlFor="factCheck" className="text-sm">Fact Checked</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox"
                        id="expertReview"
                        checked={educationalMetadata.expertReviewed}
                        onChange={(e) => setEducationalMetadata({...educationalMetadata, expertReviewed: e.target.checked})}
                        className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                      />
                      <label htmlFor="expertReview" className="text-sm">Expert Reviewed</label>
                    </div>
                  </div>
                </div>
                
                {/* Content Tabs */}
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
              </div>
              
              <div className="flex justify-end space-x-4 mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={isSubmitting}
                >
                  Save as Draft
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Publish Content
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddContent;
