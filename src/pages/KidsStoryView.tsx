
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Define the KidsStory interface
interface KidsStory {
  id: string;
  title: string;
  description: string;
  content: string;
  video_url: string | null;
  thumbnail_url: string;
  age_group: string;
  duration: string;
  category: string;
  author_id: string;
  created_at: string;
}

// Define the Author interface
interface Author {
  id: string;
  username: string;
  avatar_url: string | null;
}

const KidsStoryView = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const [story, setStory] = useState<KidsStory | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [relatedStories, setRelatedStories] = useState<KidsStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStory = async () => {
      setIsLoading(true);
      if (!storyId) return;

      try {
        // Fetch the story
        const { data: storyData, error: storyError } = await supabase
          .from('kids_stories')
          .select('*')
          .eq('id', storyId)
          .single();

        if (storyError) {
          throw storyError;
        }

        if (storyData) {
          setStory(storyData);

          // Fetch the author
          if (storyData.author_id) {
            const { data: authorData, error: authorError } = await supabase
              .from('profiles')
              .select('id, username, avatar_url')
              .eq('id', storyData.author_id)
              .single();

            if (!authorError && authorData) {
              setAuthor(authorData);
            }
          }

          // Fetch related stories based on category or age_group
          const { data: relatedData, error: relatedError } = await supabase
            .from('kids_stories')
            .select('*')
            .eq('category', storyData.category)
            .neq('id', storyId)
            .limit(3);

          if (!relatedError && relatedData) {
            setRelatedStories(relatedData);
          }
        }
      } catch (error) {
        console.error("Error fetching story:", error);
        toast({
          variant: "destructive",
          title: "Error loading story",
          description: "Failed to load the story. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [storyId, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-1">
          <div className="container py-8">
            <div className="w-full max-w-4xl mx-auto">
              <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mb-4"></div>
              <div className="aspect-video bg-gray-200 animate-pulse rounded-lg mb-6"></div>
              <div className="h-8 w-full bg-gray-200 animate-pulse rounded mb-4"></div>
              <div className="h-24 w-full bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-1">
          <div className="container py-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
              <p className="mb-6">The story you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link to="/kids">Back to Kids Zone</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="container py-6">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/kids">Kids Zone</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/kids/category/${story.category.toLowerCase()}`}>{story.category}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {story.title}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
              
              <div className="mb-6 relative rounded-lg overflow-hidden">
                {story.video_url ? (
                  <AspectRatio ratio={16/9}>
                    <iframe 
                      src={story.video_url} 
                      title={story.title}
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </AspectRatio>
                ) : (
                  <AspectRatio ratio={16/9} className="relative">
                    <img 
                      src={story.thumbnail_url} 
                      alt={story.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Button variant="outline" size="lg" className="rounded-full bg-white/20 backdrop-blur-sm border-white/40">
                        <Play className="h-12 w-12 text-white" />
                      </Button>
                    </div>
                  </AspectRatio>
                )}
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-purple-50">Ages {story.age_group}</Badge>
                  <Badge variant="outline" className="bg-blue-50">{story.duration}</Badge>
                  <Badge variant="outline" className="bg-green-50">{story.category}</Badge>
                </div>
                
                {author && (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={author.avatar_url || ''} />
                      <AvatarFallback>{author.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">By {author.username}</span>
                  </div>
                )}
              </div>
              
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-2">Story Description</h2>
                <p className="mb-6">{story.description}</p>
                
                {story.content && (
                  <>
                    <h2 className="text-xl font-semibold mb-2">Story</h2>
                    <div 
                      className="bg-purple-50 p-6 rounded-lg mb-6" 
                      dangerouslySetInnerHTML={{ __html: story.content }}
                    />
                  </>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Related Stories
              </h2>
              <div className="space-y-4">
                {relatedStories.length > 0 ? (
                  relatedStories.map((relatedStory) => (
                    <Card key={relatedStory.id} className="overflow-hidden">
                      <Link to={`/kids/story/${relatedStory.id}`} className="block">
                        <AspectRatio ratio={16/9}>
                          <img 
                            src={relatedStory.thumbnail_url} 
                            alt={relatedStory.title} 
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                        <div className="p-3">
                          <h3 className="font-medium leading-tight mb-1">{relatedStory.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {relatedStory.description}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">Ages {relatedStory.age_group}</Badge>
                            <Badge variant="outline" className="text-xs">{relatedStory.duration}</Badge>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No related stories found.</p>
                )}
                
                <Separator className="my-6" />
                
                <div className="text-center">
                  <h3 className="font-medium mb-2">Discover More Stories</h3>
                  <Button asChild className="w-full">
                    <Link to="/kids">Browse All Stories</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KidsStoryView;
