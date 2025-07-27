
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth'; // Import the useAuth hook
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function VentureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    // Extract the venture slug from the pathname
    const ventureSlug = pathname.split('/')[1]; // Assuming the structure is /[venture]...

    if (!loading) {
      if (!isAuthenticated) {
        // If not authenticated, redirect to login
        toast({
            variant: 'destructive',
            title: 'Unauthorized',
            description: 'Please log in to access this venture.',
        });
        router.push('/auth');
      } else if (profile && profile.venture !== ventureSlug) {
        // If authenticated but venture doesn't match, redirect
         toast({
            variant: 'destructive',
            title: 'Access Denied',
            description: `You do not have access to the ${ventureSlug} venture. Please contact support or upgrade your plan.`, // Customize message
        });
        // Redirect to user's assigned venture or a general dashboard
        router.push(profile.venture ? `/${profile.venture}/start` : '/dashboard');
      }
    }
  }, [isAuthenticated, profile, loading, pathname, router, toast]);

   if (loading) {
    // Optionally show a loading indicator while authentication state is being determined
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }


  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Button variant="ghost" asChild>
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Hub</span>
              </Link>
            </Button>
          </div>
          {/* Add conditional rendering for auth buttons here if needed */}
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
