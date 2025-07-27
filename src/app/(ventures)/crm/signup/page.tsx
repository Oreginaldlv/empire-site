
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';
import { CrmSignupForm } from '../crm-signup-form';
import { Dialog } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/use-auth'; // Import the useAuth hook
import { Loader2 } from 'lucide-react';

export default function CrmSignupPage() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const { user, profile, loading, isAuthenticated } = useAuth(); // Use the useAuth hook

  // Redirect if user is already authenticated and has a venture
  useEffect(() => {
    if (!loading && isAuthenticated && profile?.venture) {
      router.push(`/${profile.venture}/start`); // Redirect to their assigned venture
    }
  }, [isAuthenticated, profile, loading, router]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(false);
      // Allow time for the dialog to close before navigating
      setTimeout(() => {
        router.push('/crm'); // Redirect back to the venture page if dialog is closed
      }, 200);
    }
  };

  if (loading || (isAuthenticated && profile?.venture)) {
    // Show a loading indicator or null while checking auth state or if redirecting
    return (
         <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <Users className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Get Started with LeadLoop CRM
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Organize your contacts and streamline your outreach.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-4xl">
        {/* Render the dialog and form only if not loading and user is not already assigned a venture */}
        {!loading && (!isAuthenticated || !profile?.venture) && (
           <Dialog open={open} onOpenChange={handleOpenChange}>
             <CrmSignupForm />
           </Dialog>
        )}
      </div>
    </div>
  );
}
