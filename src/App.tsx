
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddContent from "./pages/AddContent";
import PostDetail from "./pages/PostDetail";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import ImageSearchPage from "./pages/ImageSearchPage";
import VideosPage from "./pages/VideosPage";
import AudiosPage from "./pages/AudiosPage";
import MagazinePage from "./pages/MagazinePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/image-search" element={<ImageSearchPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/audios" element={<AudiosPage />} />
              <Route path="/magazine" element={<MagazinePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/category/:categorySlug" element={<CategoryPage />} />
              <Route path="/post/:postId" element={<PostDetail />} />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
