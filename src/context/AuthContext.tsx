
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  signOut: async () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Current path:", location.pathname);
    
    let authListenerSetup = false;
    
    // Set up auth state listener FIRST
    const setupAuthListener = () => {
      if (authListenerSetup) return;
      
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          console.log("Auth state changed:", event, session?.user?.email);
          setSession(session);
          setUser(session?.user ?? null);
          
          // If session exists, fetch the user profile
          if (session?.user) {
            setTimeout(() => {
              fetchProfile(session.user.id);
            }, 0);
            
            // If we're on the login page and have a session, navigate to home
            if (location.pathname === '/login' || location.pathname === '/') {
              navigate('/home');
            }
          } else {
            setProfile(null);
            
            // If we're NOT on a public path and have no session, navigate to login
            const publicPaths = ['/login', '/register', '/join-community', '/'];
            if (!publicPaths.includes(location.pathname)) {
              navigate('/login');
            }
          }
        }
      );
      
      authListenerSetup = true;
      return subscription;
    };
    
    // Setup the auth listener
    const subscription = setupAuthListener();

    // THEN check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Initial session check:", session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          fetchProfile(session.user.id);
          
          // Only navigate to home if explicitly on the login page
          if (location.pathname === '/login') {
            navigate('/home');
          }
        } else {
          // If no session and not on a public path, redirect to login
          const publicPaths = ['/login', '/register', '/join-community', '/'];
          if (!publicPaths.includes(location.pathname)) {
            navigate('/login');
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error checking session:", error);
        setLoading(false);
      }
    };
    
    checkSession();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      setProfile(data);
    } catch (error) {
      console.error('Error in profile fetch:', error);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // Clear session and user state
      setSession(null);
      setUser(null);
      setProfile(null);
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      
      // Explicitly navigate to login after signout
      navigate('/login', { replace: true });
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: error.message || "There was a problem signing out.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
