
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface KidsStory {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  age_group: string;
  duration: string;
  category: string;
}

interface KidsStoryListProps {
  filter: "all" | "3-5" | "6-8" | "9-12";
}

const KidsStoryList = ({ filter }: KidsStoryListProps) => {
  const [stories, setStories] = useState<KidsStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      let query = supabase
        .from('kids_stories')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (filter !== "all") {
        query = query.eq('age_group', filter);
      }

      const { data, error } = await query;
      
      if (error) {
        toast({
          title: "Error fetching stories",
          description: error.message,
          variant: "destructive",
        });
        console.error("Error fetching stories:", error);
        setStories([]);
      } else {
        setStories(data || []);
      }
      setIsLoading(false);
    };

    fetchStories();

    // Set up realtime subscription for kids_stories
    const channel = supabase
      .channel('public:kids_stories')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'kids_stories' 
      }, (payload) => {
        console.log('Change received!', payload);
        // Refresh the stories when there's a change
        fetchStories();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [filter, toast]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-video bg-muted animate-pulse"></div>
            <CardHeader>
              <div className="h-6 w-3/4 bg-muted animate-pulse rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted animate-pulse rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-muted animate-pulse rounded"></div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
              <div className="h-9 w-24 bg-muted animate-pulse rounded"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-muted-foreground mb-4">No stories found for this age group.</p>
        <Button asChild>
          <Link to="/kids/create">Create a Story</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {stories.map((story) => (
        <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="aspect-video relative overflow-hidden bg-purple-100">
            <img 
              src={story.thumbnail_url} 
              alt={story.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {story.duration}
            </div>
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{story.title}</CardTitle>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Ages {story.age_group}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">{story.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="text-xs text-muted-foreground">{story.category}</span>
            <Button asChild size="sm">
              <Link to={`/kids/story/${story.id}`}>Watch Now</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default KidsStoryList;
