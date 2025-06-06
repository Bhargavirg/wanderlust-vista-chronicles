
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Image, Plus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Define the schema for form validation
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  ageGroup: z.string().min(1, "Please select an age group"),
  category: z.string().min(1, "Please select a category"),
  thumbnailUrl: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  duration: z.string().min(1, "Please enter the duration"),
  content: z.string().optional(),
  videoUrl: z.string().url("Please enter a valid URL").or(z.string().length(0)).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateKidsStory = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urlInput, setUrlInput] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      ageGroup: "",
      category: "",
      thumbnailUrl: "",
      duration: "",
      content: "",
      videoUrl: "",
    },
  });

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setUrlInput(url);
    form.setValue("thumbnailUrl", url);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Check if we have a URL for the thumbnail
      if (!values.thumbnailUrl) {
        toast({
          variant: "destructive",
          title: "Thumbnail required",
          description: "Please provide an image URL.",
        });
        return;
      }
      
      // Get the user ID
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please log in to create a story.",
        });
        navigate("/login");
        return;
      }
      
      // Insert the story into the database
      const { error } = await supabase
        .from("kids_stories")
        .insert({
          title: values.title,
          description: values.description,
          age_group: values.ageGroup,
          category: values.category,
          thumbnail_url: values.thumbnailUrl,
          duration: values.duration,
          content: values.content,
          video_url: values.videoUrl || null,
          author_id: user.id,
        });
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Story created",
        description: "Your story has been published successfully!",
      });
      
      navigate("/kids");
      
    } catch (error) {
      console.error("Error creating story:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create story. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Create a Kids Story</h1>
              <p className="text-muted-foreground">Share educational and entertaining stories with children</p>
            </div>
            <Button variant="outline" onClick={() => navigate("/kids")}>Cancel</Button>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Story Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter a catchy title..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 5 min" {...field} />
                            </FormControl>
                            <FormDescription>
                              How long does it take to read or watch?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="ageGroup"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age Group</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select age group" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="3-5">Ages 3-5</SelectItem>
                                <SelectItem value="6-8">Ages 6-8</SelectItem>
                                <SelectItem value="9-12">Ages 9-12</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Animals">Animals</SelectItem>
                                <SelectItem value="Adventure">Adventure</SelectItem>
                                <SelectItem value="Educational">Educational</SelectItem>
                                <SelectItem value="Fantasy">Fantasy</SelectItem>
                                <SelectItem value="Nature">Nature</SelectItem>
                                <SelectItem value="Science">Science</SelectItem>
                                <SelectItem value="Friendship">Friendship</SelectItem>
                                <SelectItem value="Family">Family</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Provide a short description of the story..." 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Image className="mr-2 h-5 w-5" />
                    Thumbnail Image
                  </h3>
                  
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={urlInput}
                        onChange={handleUrlChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Paste a direct link to an image from Pinterest, Unsplash, or any other source
                    </FormDescription>
                  </FormItem>
                  
                  {urlInput && (
                    <div className="border rounded-lg p-4 mt-4">
                      <h4 className="text-sm font-medium mb-2">Preview:</h4>
                      <img
                        src={urlInput}
                        alt="URL preview"
                        className="max-h-[200px] mx-auto"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                        }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Story Content
                  </h3>
                  
                  <Tabs defaultValue="text" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="text">Text Story</TabsTrigger>
                      <TabsTrigger value="video">Video Story</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="text" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Story Text</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Write your story here..." 
                                className="min-h-[300px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              You can use simple HTML tags for formatting
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="video" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="videoUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Video URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://www.youtube.com/embed/..." 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Paste an embedded video URL (YouTube, Vimeo, etc.)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Alert>
                        <AlertDescription>
                          For YouTube videos, use the embed URL format: https://www.youtube.com/embed/VIDEO_ID
                        </AlertDescription>
                      </Alert>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Separator />
              
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/kids")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Publishing..." : "Publish Story"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateKidsStory;
