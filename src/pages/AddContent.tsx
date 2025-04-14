
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "@/hooks/use-toast";
import { EducationalMetadata } from "@/types/mediaTypes";
import { mockData, BlogPost } from "@/data/blogData";
import { v4 as uuidv4 } from 'uuid';
import PageHeader from "@/components/content/PageHeader";
import ContentForm from "@/components/content/ContentForm";

// Define the CategoryType to match the BlogPost interface
type CategoryType = "science" | "technology" | "history" | "culture" | "nature" | "space" | "wildlife";

const AddContent = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryType>("nature");
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

    // Create a new post object that matches the BlogPost interface
    const newPost: BlogPost = {
      id: uuidv4(),
      title: title,
      excerpt: description || `${mainContent.substring(0, 120)}...`,
      coverImage: coverImage || "https://images.unsplash.com/photo-1557683316-973673baf926",
      category: category,
      author: {
        name: "User Contributor",
        avatar: "https://i.pravatar.cc/150?img=32", // Default avatar
      },
      publishedAt: new Date().toISOString(),
      // Optional properties
      subCategory: tags.split(',')[0] || undefined,
      educationalContent: educationalMetadata.difficulty ? {
        difficulty: educationalMetadata.difficulty,
        ageGroup: educationalMetadata.ageRange, // Changed from ageRange to ageGroup to match the BlogPost interface
        learningObjectives: []
      } : undefined
    };

    try {
      // In a real app, this would save to a database
      // For now we're adding to the mock data and storing in localStorage
      
      // Add new post to appropriate category
      if (!mockData.byCategory[category]) {
        mockData.byCategory[category] = [];
      }
      
      mockData.byCategory[category].unshift(newPost);
      
      // Also add to recent posts if that exists
      if (mockData.recent) {
        mockData.recent.unshift(newPost);
      }
      
      // Save to localStorage to persist between page refreshes
      const existingPostsJSON = localStorage.getItem('earthLensUserPosts');
      let existingPosts: Record<string, BlogPost> = {};
      
      if (existingPostsJSON) {
        existingPosts = JSON.parse(existingPostsJSON);
      }
      
      localStorage.setItem('earthLensUserPosts', JSON.stringify({
        ...existingPosts,
        [newPost.id]: newPost
      }));
      
      // Show success message
      toast({
        title: isDraft ? "Draft saved" : "Content published",
        description: isDraft 
          ? "Your draft has been saved successfully." 
          : "Your content has been published successfully.",
      });
      
      // Navigate to the category page to see the new post
      navigate(`/category/${category}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your content. Please try again.",
        variant: "destructive",
      });
      console.error("Error saving content:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <PageHeader 
        title="Share Your Perspective" 
        subtitle="Add educational content to inspire and inform others about our amazing world."
      />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="bg-yellow-400 py-4 px-6">
              <h2 className="text-xl font-bold text-black">Create New Content</h2>
            </div>
            
            <ContentForm
              title={title}
              setTitle={setTitle}
              category={category}
              setCategory={setCategory}
              description={description}
              setDescription={setDescription}
              mainContent={mainContent}
              setMainContent={setMainContent}
              location={location}
              setLocation={setLocation}
              tags={tags}
              setTags={setTags}
              coverImage={coverImage}
              setCoverImage={setCoverImage}
              images={images}
              setImages={setImages}
              videoUrl={videoUrl}
              setVideoUrl={setVideoUrl}
              videoType={videoType}
              setVideoType={setVideoType}
              educationalMetadata={educationalMetadata}
              setEducationalMetadata={setEducationalMetadata}
              isSubmitting={isSubmitting}
              sampleVideos={sampleVideos}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddContent;
