import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function UnavailableServicePage() {
  return (
    <main className="bg-background">
      <section className="container mx-auto flex min-h-[70vh] items-center px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border bg-card p-8 text-center shadow-sm md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Service update
          </p>
          <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight md:text-5xl">
            This Service Is Not Available Yet
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Oreginald Inc. is currently focused on AI Automation Systems for local service
            businesses. Our active service helps businesses capture leads, follow up faster,
            send reminders, request reviews, and reduce missed opportunities.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/ai-workflows">
                View AI Automation Systems
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
