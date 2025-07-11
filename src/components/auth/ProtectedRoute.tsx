
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Show toast only when we know user is not authenticated (not on initial load)
    if (!loading && !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page.",
        variant: "destructive",
      });
    }
  }, [loading, user]);

  // If still loading, return loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
        <p className="ml-3 text-lg">Loading...</p>
      </div>
    );
  }

  // If not logged in, redirect to login with the return path
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If logged in, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
