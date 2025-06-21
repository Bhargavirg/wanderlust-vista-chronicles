
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUp, Loader2, Send, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  storyContent: z.string().min(50, "Story content must be at least 50 characters"),
  coverImage: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
  authorName: z.string().min(2, "Author name must be at least 2 characters"),
  authorLocation: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const AddStory = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      storyContent: "",
      coverImage: "",
      authorName: user?.user_metadata?.full_name || "",
      authorLocation: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast.error("You must be logged in to share a story");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('echoes_faces')
        .insert({
          title: data.title,
          description: data.description,
          story_content: data.storyContent,
          cover_image: data.coverImage || null,
          author_name: data.authorName,
          author_location: data.authorLocation || null,
          author_id: user.id,
        });

      if (error) {
        console.error("Error creating story:", error);
        throw error;
      }
      
      toast.success("Your story has been shared successfully!");
      navigate("/echoes-faces");
    } catch (error) {
      console.error("Error creating story:", error);
      toast.error("Failed to share your story. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImagePreview(url);
    form.setValue("coverImage", url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container max-w-4xl">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-red-500 mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold">Share Your Story</h1>
            </div>
            <p className="text-muted-foreground">
              Every story matters. Share your journey, inspire others, and become part of our community.
            </p>
          </div>

          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Your Heartfelt Story</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Story Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Give your story a meaningful title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brief Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="A short summary of your story"
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="authorName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="How should we credit you?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="authorLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="City, Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="coverImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cover Image URL (Optional)</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <div className="relative flex-1">
                                  <Input
                                    placeholder="https://example.com/image.jpg"
                                    onChange={handleImagePreview}
                                    {...field}
                                  />
                                  <ImageUp className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-6">
                      {/* Image preview */}
                      <div className="aspect-video rounded-md border overflow-hidden bg-muted">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={() => setImagePreview("")}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            <div className="text-center">
                              <Heart className="mx-auto h-12 w-12 mb-2" />
                              <p>Cover image preview</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <FormField
                        control={form.control}
                        name="storyContent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Story</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell your story... Share your experiences, challenges, victories, lessons learned. What would you want others to know?"
                                className="min-h-[200px] resize-y"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <CardFooter className="flex justify-end gap-2 px-0">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sharing...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Share Story
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddStory;
