
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Heart, Eye, Plus, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface EchoesStory {
  id: string;
  title: string;
  description: string;
  story_content: string;
  cover_image: string | null;
  author_name: string;
  author_location: string | null;
  views_count: number;
  likes_count: number;
  created_at: string;
  published: boolean;
  featured: boolean;
}

const EchoesAndFaces = () => {
  const { user } = useAuth();

  const { data: stories, isLoading, error } = useQuery({
    queryKey: ['echoes-faces'],
    queryFn: async () => {
      console.log("Fetching echoes and faces stories...");
      
      const { data, error } = await supabase
        .from('echoes_faces')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching stories:", error);
        throw error;
      }
      
      console.log("Fetched stories data:", data);
      return data as EchoesStory[];
    },
  });

  useEffect(() => {
    console.log("EchoesAndFaces page loaded");
  }, []);

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

  if (error) {
    console.error("EchoesAndFaces error:", error);
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Echoes and Faces</h2>
            <p className="text-gray-600">Loading heartfelt stories from our community...</p>
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
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Echoes and Faces</h1>
              <p className="text-lg text-gray-600">
                Real stories from real people. Share your journey, inspire others.
              </p>
            </div>
            {user && (
              <Button asChild>
                <Link to="/add-story">
                  <Plus className="mr-2 h-4 w-4" />
                  Share Your Story
                </Link>
              </Button>
            )}
          </div>
          
          {stories && stories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    {story.cover_image ? (
                      <img
                        src={story.cover_image}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                        <Heart className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-semibold line-clamp-2">{story.title}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium">{story.author_name}</span>
                      {story.author_location && (
                        <>
                          <MapPin className="mx-1 h-3 w-3" />
                          <span>{story.author_location}</span>
                        </>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3 mb-4">{story.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Eye className="mr-1 h-3 w-3" />
                          <span>{story.views_count}</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="mr-1 h-3 w-3" />
                          <span>{story.likes_count}</span>
                        </div>
                      </div>
                      <Link
                        to={`/echoes-faces/${story.id}`}
                        className="text-primary hover:underline"
                      >
                        Read Story
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Stories Yet</h3>
              <p className="text-gray-600 mb-4">Be the first to share your heartfelt story!</p>
              {user && (
                <Button asChild>
                  <Link to="/add-story">
                    <Plus className="mr-2 h-4 w-4" />
                    Share Your Story
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EchoesAndFaces;
