
'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { onAuthStateChanged } from '@/lib/firebase/auth';
import type { User } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';

export const AuthContext = createContext<{ user: User | null }>({ user: null });

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);


  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
