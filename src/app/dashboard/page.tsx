
'use client';

import { useAuth } from '@/hooks/use-auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
       <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <p>Loading...</p>
       </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
       <div className="mx-auto max-w-3xl">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Welcome, {user.email}
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            This is your personalized dashboard. Manage your active ventures, update your account, and more.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>My Ventures</CardTitle>
                    <CardDescription>View and manage your active subscriptions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">You have no active ventures yet.</p>
                     <Button className="mt-4" asChild>
                        <Link href="/">Explore Ventures</Link>
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Update your profile and billing information.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Button disabled>Update Info (Coming Soon)</Button>
                </CardContent>
            </Card>
          </div>
       </div>
    </div>
  );
}

