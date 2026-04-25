
'use client';

import { useAuth } from '@/hooks/use-auth';
import { CreditIntakeForm } from '../intake-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2, CreditCard } from 'lucide-react';

export default function CreditRepairStartPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <CreditCard className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Welcome Back, {user.email}
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            You're already logged in. Let's continue your credit repair journey.
          </p>
          <div className="mx-auto mt-12 max-w-2xl">
             <Button size="lg" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
             </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <CreditCard className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Let's Get Started
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Fill out the form below to begin your credit repair journey.
           Already have an account?{' '}
            <Link href="/auth" className="text-primary hover:underline">
              Log in here
            </Link>
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-2xl">
        <CreditIntakeForm />
      </div>
    </div>
  );
}
