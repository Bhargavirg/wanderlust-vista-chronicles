
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import SearchPage from "@/pages/SearchPage";
import ImageSearchPage from "@/pages/ImageSearchPage";
import VideosPage from "@/pages/VideosPage";
import AudiosPage from "@/pages/AudiosPage";
import CategoryPage from "@/pages/CategoryPage";
import PostDetail from "@/pages/PostDetail";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import AddContent from "@/pages/AddContent";
import AddPost from "@/pages/AddPost";
import NewPost from "@/pages/NewPost";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import MagazinePage from "@/pages/MagazinePage";
import ShareYourThought from "@/pages/ShareYourThought";
import JoinCommunity from "@/pages/JoinCommunity";
import KidsZone from "@/pages/KidsZone";
import CreateKidsStory from "@/pages/CreateKidsStory";
import KidsStoryView from "@/pages/KidsStoryView";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster />
          <div className="min-h-screen bg-background font-sans antialiased">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<Index />} />
              <Route path="/contact" element={<Index />} />
              <Route path="/privacy" element={<Index />} />
              <Route path="/terms" element={<Index />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/images" element={<ImageSearchPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/audios" element={<AudiosPage />} />
              <Route path="/kids" element={<KidsZone />} />
              <Route path="/kids/create" element={<CreateKidsStory />} />
              <Route path="/kids/story/:storyId" element={<KidsStoryView />} />
              <Route path="/magazine" element={<MagazinePage />} />
              <Route path="/share-thought" element={<ShareYourThought />} />
              <Route path="/join-community" element={<JoinCommunity />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/add-content" 
                element={
                  <ProtectedRoute>
                    <AddContent />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/add-post" 
                element={
                  <ProtectedRoute>
                    <AddPost />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/new-post" 
                element={
                  <ProtectedRoute>
                    <NewPost />
                  </ProtectedRoute>
                } 
              />
              <Route path="/category/:categorySlug" element={<CategoryPage />} />
              <Route path="/post/:slug" element={<PostDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
