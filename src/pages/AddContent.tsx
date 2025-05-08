import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "@/hooks/use-toast";
import { EducationalMetadata } from "@/types/mediaTypes";
import PageHeader from "@/components/content/PageHeader";
import ContentForm from "@/components/content/ContentForm";
import { addContent, updateContent, getContentById } from "@/services/contentService";
import { getAllCategories } from "@/services/categoryService";
import { useAuth } from "@/context/AuthContext";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";

// Define the CategoryType to match the BlogPost interface
type CategoryType = "science" | "technology" | "history" | "culture" | "nature" | "space" | "wildlife" | 
  "travel" | "marinelife" | "monuments" | "literature" | "art" | "flowers" | "food" | "anime" | "politics" | "sports" | "stories" |
  "psychology" | "archaeology" | "mythology" | "climate" | "current-affairs" | "music" | "business-economics" | "deep-earth-geology" | "ancient-civilizations";

const AddContent = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // Get postId from URL if in edit mode
  const { user, profile } = useAuth();
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryType>("nature");
  const [categoryId, setCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);
  const [description, setDescription] = useState("");
  const [mainContent, setMainContent] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalPost, setOriginalPost] = useState<any | null>(null);
  
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

  // Load categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        console.log("Fetched categories:", categoriesData);
        if (categoriesData && categoriesData.length > 0) {
          setCategories(categoriesData);
        } else {
          console.warn("No categories found");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again.",
          variant: "destructive",
        });
      }
    };
    fetchCategories();
  }, []);

  // Load post data if in edit mode
  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const post = await getContentById(postId);
          if (post) {
            // Populate form with post data
            setTitle(post.title);
            setCategory(post.category?.slug as CategoryType || "nature");
            setCategoryId(post.category_id);
            setDescription(post.description || "");
            setCoverImage(post.cover_image || "");
            setTags(post.tags?.join(", ") || "");
            setMainContent(post.main_content || "");
            
            // Set additional images if available
            if (post.additional_images && post.additional_images.length > 0) {
              setImages(post.additional_images);
            }
            
            // Set video data if available
            if (post.video_url) {
              setVideoUrl(post.video_url);
              setVideoType((post.video_type as any) || "youtube");
            }
            
            // Set location if available
            if (post.location) {
              setLocation(post.location);
            }
            
            // Handle educational metadata properly with type checking
            if (post.educational_metadata) {
              const metadata = post.educational_metadata;
              
              // Create a properly typed educational metadata object with safe type checks
              const typedMetadata: EducationalMetadata = {
                difficulty: typeof metadata === 'object' && metadata !== null && 'difficulty' in metadata && 
                  typeof metadata.difficulty === 'string' ? 
                  metadata.difficulty as "beginner" | "intermediate" | "advanced" : 
                  "beginner",
                  
                ageRange: typeof metadata === 'object' && metadata !== null && 'ageRange' in metadata && 
                  typeof metadata.ageRange === 'string' ? 
                  metadata.ageRange : 
                  "All ages",
                  
                subjects: typeof metadata === 'object' && metadata !== null && 'subjects' in metadata && 
                  Array.isArray(metadata.subjects) ? 
                  metadata.subjects as string[] : 
                  [],
                  
                factCheck: typeof metadata === 'object' && metadata !== null && 'factCheck' in metadata ? 
                  Boolean(metadata.factCheck) : 
                  false,
                  
                expertReviewed: typeof metadata === 'object' && metadata !== null && 'expertReviewed' in metadata ? 
                  Boolean(metadata.expertReviewed) : 
                  false,
              };
              
              setEducationalMetadata(typedMetadata);
            }
            
            // Set original post for reference
            setOriginalPost(post);
            setIsEditMode(true);
          } else {
            // Post not found - redirect to dashboard
            toast({
              title: "Post not found",
              description: "The post you are trying to edit could not be found.",
              variant: "destructive",
            });
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Error fetching post:", error);
          toast({
            title: "Error",
            description: "Failed to load post for editing. Please try again.",
            variant: "destructive",
          });
          navigate("/dashboard");
        }
      };
      
      fetchPost();
    }
  }, [postId, navigate]);

  // Updated useEffect to properly handle category selection and get the correct categoryId
  useEffect(() => {
    if (categories.length > 0) {
      const selectedCategory = categories.find(cat => cat.slug === category);
      if (selectedCategory) {
        setCategoryId(selectedCategory.id);
        console.log("Selected category ID:", selectedCategory.id);
      } else {
        console.warn("Category not found for slug:", category);
        // Try to find a default category
        const defaultCategory = categories.find(cat => cat.slug === 'nature');
        if (defaultCategory) {
          setCategoryId(defaultCategory.id);
          setCategory('nature' as CategoryType);
          console.log("Falling back to default category:", defaultCategory.id);
        } else if (categories.length > 0) {
          // If still no match, just use the first available category
          setCategoryId(categories[0].id);
          setCategory(categories[0].slug as CategoryType);
          console.log("Using first available category:", categories[0].id);
        }
      }
    }
  }, [category, categories]);

  const isAuthor = () => {
    if (!originalPost) return true; // If creating new post
    if (!user) return false;
    
    // Check if current user is the author
    return originalPost.author_id === user.id;
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
    
    // Check if categoryId was found
    if (!categoryId) {
      toast({
        title: "Category error",
        description: "Selected category could not be found. Please try again or select a different category.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if user is authenticated
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to publish content.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    // Check if user is author when editing
    if (isEditMode && !isAuthor()) {
      toast({
        title: "Permission denied",
        description: "You can only edit your own content.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Prepare content data with correct tags handling
      const contentData = {
        title,
        description,
        mainContent,
        categoryId,
        coverImage: coverImage || "https://images.unsplash.com/photo-1557683316-973673baf926",
        additionalImages: images.length > 0 ? images : [],
        videoUrl,
        videoType,
        location,
        tags,
        educationalMetadata
      };

      console.log("Submitting content with data:", contentData);
      console.log("Category selected:", category);
      console.log("Category ID being used:", categoryId);

      if (isEditMode && originalPost) {
        // Update existing content
        const result = await updateContent(originalPost.id, contentData);
        console.log("Update result:", result);
        toast({
          title: "Content updated",
          description: isDraft 
            ? "Your draft has been updated successfully." 
            : "Your content has been updated successfully.",
        });
      } else {
        // Add new content
        const result = await addContent(contentData, user.id, isDraft);
        console.log("Add result:", result);
        toast({
          title: isDraft ? "Draft saved" : "Content published",
          description: isDraft 
            ? "Your draft has been saved successfully." 
            : "Your content has been published successfully.",
        });
      }
      
      // Navigate to the dashboard
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error saving content:", error);
      let errorMessage = "There was an error saving your content. Please try again.";
      
      if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      if (error.code === "42501") {
        errorMessage = "Permission denied. You may not have the required permissions to publish content.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!originalPost || !isAuthor() || !user) {
      toast({
        title: "Permission denied",
        description: "You can only delete your own content.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Delete the content
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', originalPost.id);
      
      if (error) throw error;
      
      toast({
        title: "Content deleted",
        description: "Your content has been deleted successfully.",
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error deleting content:", error);
      toast({
        title: "Error",
        description: error.message || "There was an error deleting your content. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <PageHeader 
        title={isEditMode ? "Edit Your Content" : "Share Your Perspective"} 
        subtitle={isEditMode 
          ? "Update your educational content to make it even better" 
          : "Add educational content to inspire and inform others about our amazing world."
        }
        showBackLink={true}
      />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="bg-yellow-400 py-4 px-6">
              <h2 className="text-xl font-bold text-black">
                {isEditMode ? "Edit Content" : "Create New Content"}
              </h2>
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
              isEditMode={isEditMode}
              onDelete={handleDelete}
              authorId={originalPost?.author_id}
              currentUserId={user?.id}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddContent;
