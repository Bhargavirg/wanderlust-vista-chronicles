
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Heart, Eye, MapPin, ArrowLeft, Calendar } from "lucide-react";

const StoryDetail = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();

  const { data: story, isLoading, error } = useQuery({
    queryKey: ['echoes-story', storyId],
    queryFn: async () => {
      if (!storyId) throw new Error("Story ID is required");
      
      const { data, error } = await supabase
        .from('echoes_faces')
        .select('*')
        .eq('id', storyId)
        .eq('published', true)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!storyId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h2>
            <p className="text-gray-600 mb-4">The story you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/echoes-faces")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Stories
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/echoes-faces")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Stories
          </Button>

          <article className="prose prose-lg max-w-none">
            {story.cover_image && (
              <div className="aspect-video mb-8 rounded-lg overflow-hidden">
                <img
                  src={story.cover_image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{story.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{story.description}</p>
              
              <div className="flex items-center justify-between border-b border-gray-200 pb-6">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-semibold text-gray-900">{story.author_name}</p>
                    {story.author_location && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>{story.author_location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{new Date(story.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="mr-1 h-4 w-4" />
                    <span>{story.views_count}</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="mr-1 h-4 w-4" />
                    <span>{story.likes_count}</span>
                  </div>
                </div>
              </div>
            </header>

            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {story.story_content}
            </div>
          </article>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Share Your Story Too</h3>
              <p className="text-gray-600 mb-4">Every story matters and can inspire someone else.</p>
              <Button onClick={() => navigate("/add-story")}>
                <Heart className="mr-2 h-4 w-4" />
                Share Your Story
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StoryDetail;
