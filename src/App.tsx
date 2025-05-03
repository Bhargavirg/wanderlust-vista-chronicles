
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import PostDetail from "./pages/PostDetail";
import CategoryPage from "./pages/CategoryPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewPost from "./pages/NewPost";
import AddPost from "./pages/AddPost";
import AddContent from "./pages/AddContent";
import NotFound from "./pages/NotFound";
import VideosPage from "./pages/VideosPage";
import JoinCommunity from "./pages/JoinCommunity";
import { AuthProvider } from "./context/AuthContext";
import { initializeCategories } from "./services/categoryService";

const queryClient = new QueryClient();

const AppContent = () => {
  useEffect(() => {
    // Initialize categories when app starts
    initializeCategories().catch(console.error);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/home" element={<Index />} />
      <Route path="/post/:postId" element={<PostDetail />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/category/videos" element={<VideosPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/new-post" element={<NewPost />} />
      <Route path="/add-post" element={<AddPost />} />
      <Route path="/add-content" element={<AddContent />} />
      <Route path="/edit-content/:postId" element={<AddContent />} />
      <Route path="/join-community" element={<JoinCommunity />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
