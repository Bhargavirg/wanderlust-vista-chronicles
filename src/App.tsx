import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import PostDetail from "./pages/PostDetail";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewPost from "./pages/NewPost";
import AddPost from "./pages/AddPost";
import AddContent from "./pages/AddContent";
import NotFound from "./pages/NotFound";
import VideosPage from "./pages/VideosPage";
import JoinCommunity from "./pages/JoinCommunity";
import MagazinePage from "./pages/MagazinePage";
import { AuthProvider } from "./context/AuthContext";
import { initializeCategories } from "./services/categoryService";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const AppContent = () => {
  useEffect(() => {
    // Initialize categories when app starts
    initializeCategories().catch(console.error);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/join-community" element={<JoinCommunity />} />
      <Route path="/home" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/post/:postId" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
      <Route path="/category/:category" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
      <Route path="/category/videos" element={<ProtectedRoute><VideosPage /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/new-post" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
      <Route path="/add-post" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
      <Route path="/add-content" element={<ProtectedRoute><AddContent /></ProtectedRoute>} />
      <Route path="/edit-content/:postId" element={<ProtectedRoute><AddContent /></ProtectedRoute>} />
      <Route path="/magazine" element={<ProtectedRoute><MagazinePage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
