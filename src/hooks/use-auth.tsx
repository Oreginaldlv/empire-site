
'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { auth } from '@/lib/firebase'; // Import the auth instance
import { onAuthStateChanged, User } from 'firebase/auth'; // Import from firebase/auth
import { getUserProfile } from '@/lib/firebase/firestore';


interface UserProfile {
  uid: string;
  email: string;
  venture: string;
  createdAt: any; // Use appropriate type for timestamp
  subscriptionStatus: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({ 
    user: null, 
    profile: null,
    loading: true,
    isAuthenticated: false 
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => { // Use the imported auth instance
      setLoading(true);
      if (user) {
        setUser(user);
        const userProfile = await getUserProfile(user.uid);
        setProfile(userProfile as UserProfile | null);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAuthenticated = !loading && user !== null;

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAuthenticated }}>
        {children}
    </AuthContext.Provider>
  );
}
