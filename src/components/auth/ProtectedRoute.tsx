
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  // If still loading, return nothing
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!user) {
    toast({
      title: "Authentication required",
      description: "Please log in to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
