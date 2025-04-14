
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "@/hooks/use-toast";
import { EducationalMetadata } from "@/types/mediaTypes";
import { mockData, BlogPost } from "@/data/blogData";
import { v4 as uuidv4 } from 'uuid';
import PageHeader from "@/components/content/PageHeader";
import ContentForm from "@/components/content/ContentForm";

// Define the CategoryType to match the BlogPost interface
type CategoryType = "science" | "technology" | "history" | "culture" | "nature" | "space" | "wildlife" | 
  "travel" | "marinelife" | "monuments" | "literature" | "art" | "flowers" | "food" | "anime" | "politics" | "sports" | "stories";

const AddContent = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // Get postId from URL if in edit mode
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryType>("nature");
  const [description, setDescription] = useState("");
  const [mainContent, setMainContent] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalPost, setOriginalPost] = useState<BlogPost | null>(null);
  
  // Current user info - in a real app, this would come from authentication
  const currentUser = {
    id: localStorage.getItem('userId') || "user-123", // Simulate logged in user
    name: localStorage.getItem('userName') || "User Contributor",
    avatar: "https://i.pravatar.cc/150?img=32"
  };
  
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

  // Load post data if in edit mode
  useEffect(() => {
    if (postId) {
      // In a real app, this would be an API call to get post data
      const loadPostForEditing = () => {
        // Try to get from localStorage first
        const existingPostsJSON = localStorage.getItem('earthLensUserPosts');
        if (existingPostsJSON) {
          const existingPosts = JSON.parse(existingPostsJSON);
          if (existingPosts[postId]) {
            return existingPosts[postId];
          }
        }
        
        // Otherwise look in mockData
        let foundPost: BlogPost | null = null;
        
        // Check in recent posts
        if (mockData.recent) {
          foundPost = mockData.recent.find(post => post.id === postId) || null;
        }
        
        // Check in categories if not found
        if (!foundPost) {
          for (const category in mockData.byCategory) {
            const categoryPosts = mockData.byCategory[category];
            foundPost = categoryPosts.find(post => post.id === postId) || null;
            if (foundPost) break;
          }
        }
        
        return foundPost;
      };
      
      const post = loadPostForEditing();
      if (post) {
        // Populate form with post data
        setTitle(post.title);
        setCategory(post.category as CategoryType);
        setDescription(post.excerpt || "");
        setCoverImage(post.coverImage);
        setTags(post.subCategory || "");
        setMainContent(post.content || "");
        
        // Set educational metadata if available
        if (post.educationalContent) {
          setEducationalMetadata({
            difficulty: post.educationalContent.difficulty,
            ageRange: post.educationalContent.ageGroup || "All ages",
            subjects: [],
            factCheck: false,
            expertReviewed: false,
          });
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
    }
  }, [postId, navigate]);

  const isAuthor = () => {
    if (!originalPost) return true; // If creating new post
    
    // In a real app, this would check against authenticated user ID
    return originalPost.author.name === currentUser.name;
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

    // Prepare post object
    const postData: BlogPost = isEditMode && originalPost ? 
      { 
        ...originalPost,
        title,
        excerpt: description || `${mainContent.substring(0, 120)}...`,
        content: mainContent,
        coverImage: coverImage || originalPost.coverImage,
        category,
        subCategory: tags.split(',')[0] || undefined,
        educationalContent: educationalMetadata.difficulty ? {
          difficulty: educationalMetadata.difficulty,
          ageGroup: educationalMetadata.ageRange, 
          learningObjectives: []
        } : undefined,
        updatedAt: new Date().toISOString()
      } : 
      {
        id: uuidv4(),
        title: title,
        excerpt: description || `${mainContent.substring(0, 120)}...`,
        content: mainContent,
        coverImage: coverImage || "https://images.unsplash.com/photo-1557683316-973673baf926",
        category: category,
        author: {
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
        publishedAt: new Date().toISOString(),
        subCategory: tags.split(',')[0] || undefined,
        educationalContent: educationalMetadata.difficulty ? {
          difficulty: educationalMetadata.difficulty,
          ageGroup: educationalMetadata.ageRange, 
          learningObjectives: []
        } : undefined
      };

    try {
      // In a real app, this would be an API call to save or update the post
      
      // Get existing posts from localStorage
      const existingPostsJSON = localStorage.getItem('earthLensUserPosts');
      let existingPosts: Record<string, BlogPost> = {};
      
      if (existingPostsJSON) {
        existingPosts = JSON.parse(existingPostsJSON);
      }
      
      // Add or update post in localStorage
      localStorage.setItem('earthLensUserPosts', JSON.stringify({
        ...existingPosts,
        [postData.id]: postData
      }));
      
      // Update mock data
      if (!isEditMode) {
        // Add new post
        if (!mockData.byCategory[category]) {
          mockData.byCategory[category] = [];
        }
        
        mockData.byCategory[category].unshift(postData);
        
        // Also add to recent posts if that exists
        if (mockData.recent) {
          mockData.recent.unshift(postData);
        }
      } else {
        // Update existing post in mockData categories
        Object.keys(mockData.byCategory).forEach(cat => {
          const index = mockData.byCategory[cat].findIndex(post => post.id === postData.id);
          if (index !== -1) {
            mockData.byCategory[cat][index] = postData;
          }
        });
        
        // Update in recent posts if exists
        if (mockData.recent) {
          const recentIndex = mockData.recent.findIndex(post => post.id === postData.id);
          if (recentIndex !== -1) {
            mockData.recent[recentIndex] = postData;
          }
        }
      }
      
      // Show success message
      toast({
        title: isEditMode 
          ? "Content updated" 
          : isDraft ? "Draft saved" : "Content published",
        description: isEditMode 
          ? "Your content has been updated successfully." 
          : isDraft ? "Your draft has been saved successfully." : "Your content has been published successfully.",
      });
      
      // Navigate to the category page to see the post
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

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!originalPost || !isAuthor()) {
      toast({
        title: "Permission denied",
        description: "You can only delete your own content.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // In a real app, this would be an API call to delete the post
      
      // Remove from localStorage
      const existingPostsJSON = localStorage.getItem('earthLensUserPosts');
      if (existingPostsJSON) {
        const existingPosts = JSON.parse(existingPostsJSON);
        if (existingPosts[originalPost.id]) {
          delete existingPosts[originalPost.id];
          localStorage.setItem('earthLensUserPosts', JSON.stringify(existingPosts));
        }
      }
      
      // Remove from mockData categories
      Object.keys(mockData.byCategory).forEach(cat => {
        mockData.byCategory[cat] = mockData.byCategory[cat].filter(post => post.id !== originalPost.id);
      });
      
      // Remove from recent posts if exists
      if (mockData.recent) {
        mockData.recent = mockData.recent.filter(post => post.id !== originalPost.id);
      }
      
      toast({
        title: "Content deleted",
        description: "Your content has been deleted successfully.",
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error deleting your content. Please try again.",
        variant: "destructive",
      });
      console.error("Error deleting content:", error);
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
              authorId={originalPost?.author?.name}
              currentUserId={currentUser.name}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddContent;
