
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { BlogPost } from "@/components/blog/BlogCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Edit, Trash2 } from "lucide-react";

// Mock data for user's posts
const mockUserPosts: BlogPost[] = [
  {
    id: "101",
    title: "My Journey Through the Amazon Rainforest",
    excerpt: "Personal experiences and photos from a life-changing trek through the world's largest rainforest.",
    coverImage: "https://images.unsplash.com/photo-1569097756865-19de5f64d335",
    category: "travel",
    author: {
      name: "Your Name",
      avatar: "https://i.pravatar.cc/150?img=68",
    },
    publishedAt: "2025-04-01T16:30:00Z",
  },
  {
    id: "102",
    title: "Homemade Pasta: A Family Recipe",
    excerpt: "Sharing my grandmother's secret pasta recipe that's been passed down through generations.",
    coverImage: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    category: "food",
    author: {
      name: "Your Name",
      avatar: "https://i.pravatar.cc/150?img=68",
    },
    publishedAt: "2025-03-15T14:20:00Z",
  },
  {
    id: "103",
    title: "Photographing the Milky Way: Equipment and Techniques",
    excerpt: "A comprehensive guide to astrophotography based on years of night sky shooting.",
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    category: "space",
    author: {
      name: "Your Name",
      avatar: "https://i.pravatar.cc/150?img=68",
    },
    publishedAt: "2025-02-28T20:45:00Z",
  },
];

// Mock draft posts
const mockDraftPosts: (Omit<BlogPost, "publishedAt"> & { updatedAt: string })[] = [
  {
    id: "draft-101",
    title: "The Hidden Waterfalls of Costa Rica",
    excerpt: "Draft post about discovering secret waterfalls during my Costa Rica trip.",
    coverImage: "https://images.unsplash.com/photo-1546587348-d12660c30c50",
    category: "nature",
    author: {
      name: "Your Name",
      avatar: "https://i.pravatar.cc/150?img=68",
    },
    updatedAt: "2025-04-05T09:15:00Z",
  },
  {
    id: "draft-102",
    title: "Rare Wildflower Species in the Rocky Mountains",
    excerpt: "A guide to identifying and photographing endangered alpine flowers.",
    coverImage: "https://images.unsplash.com/photo-1490750967868-88aa4486c946",
    category: "flowers",
    author: {
      name: "Your Name",
      avatar: "https://i.pravatar.cc/150?img=68",
    },
    updatedAt: "2025-04-03T11:20:00Z",
  },
];

const Dashboard = () => {
  const [posts, setPosts] = useState(mockUserPosts);
  const [drafts, setDrafts] = useState(mockDraftPosts);
  const navigate = useNavigate();

  const handleDeletePost = (postId: string, isDraft: boolean = false) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${isDraft ? "draft" : "post"}?`
    );
    
    if (confirmDelete) {
      if (isDraft) {
        setDrafts(drafts.filter((draft) => draft.id !== postId));
      } else {
        setPosts(posts.filter((post) => post.id !== postId));
      }
      
      toast({
        title: `${isDraft ? "Draft" : "Post"} deleted`,
        description: `The ${isDraft ? "draft" : "post"} has been successfully deleted.`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button onClick={() => navigate("/new-post")}>Create New Post</Button>
          </div>
          
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="posts">Published Posts</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts">
              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You haven't published any posts yet.</p>
                  <Button onClick={() => navigate("/new-post")}>Create your first post</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <Card key={post.id}>
                      <div className="md:flex">
                        <div className="md:w-1/4">
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="h-48 w-full object-cover md:h-full"
                          />
                        </div>
                        <div className="md:w-3/4 flex flex-col">
                          <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
                            <CardDescription>
                              Published on {new Date(post.publishedAt).toLocaleDateString()}
                              <span className="ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                              </span>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{post.excerpt}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between mt-auto">
                            <div>
                              <Button 
                                variant="outline"
                                size="sm"
                                className="mr-2"
                                onClick={() => navigate(`/edit-post/${post.id}`)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => navigate(`/post/${post.id}`)}
                            >
                              View Post
                            </Button>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="drafts">
              {drafts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You have no draft posts.</p>
                  <Button onClick={() => navigate("/new-post")}>Create a new post</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {drafts.map((draft) => (
                    <Card key={draft.id}>
                      <div className="md:flex">
                        <div className="md:w-1/4">
                          <img 
                            src={draft.coverImage} 
                            alt={draft.title}
                            className="h-48 w-full object-cover md:h-full"
                          />
                        </div>
                        <div className="md:w-3/4 flex flex-col">
                          <CardHeader>
                            <CardTitle>{draft.title}</CardTitle>
                            <CardDescription>
                              Last updated on {new Date(draft.updatedAt).toLocaleDateString()}
                              <span className="ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                                Draft
                              </span>
                              <span className="ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                {draft.category.charAt(0).toUpperCase() + draft.category.slice(1)}
                              </span>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{draft.excerpt}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between mt-auto">
                            <div>
                              <Button 
                                variant="outline"
                                size="sm"
                                className="mr-2"
                                onClick={() => navigate(`/edit-post/${draft.id}`)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeletePost(draft.id, true)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Post published",
                                  description: "Your draft has been published successfully.",
                                });
                                setDrafts(drafts.filter(d => d.id !== draft.id));
                                // In a real app, we would convert the draft to a published post here
                              }}
                            >
                              Publish
                            </Button>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your account information and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <img 
                        src="https://i.pravatar.cc/150?img=68"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Your Name</h3>
                      <p className="text-sm text-muted-foreground">user@example.com</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Change Avatar
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Account Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-3xl font-bold">{posts.length}</p>
                            <p className="text-sm text-muted-foreground">Published Posts</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-3xl font-bold">{drafts.length}</p>
                            <p className="text-sm text-muted-foreground">Draft Posts</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-3xl font-bold">327</p>
                            <p className="text-sm text-muted-foreground">Total Views</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Account Settings</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        Edit Profile Information
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Notification Preferences
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-destructive hover:bg-destructive/10">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
