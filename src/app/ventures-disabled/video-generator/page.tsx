
'use client';

import { Film, BrainCircuit, Mic, Clapperboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default function VideoGeneratorPage() {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat py-12"
      style={{
        backgroundImage: "url('/images/20250717_0536_Urban-Tech Luxury Pattern_simple_compose_01k0c60kwafcgs9xcf1jyc9yme.png')",
      }}
      data-ai-hint="luxury pattern"
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Film className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            NMotion AI Video Generator
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            A creative platform for generating AI-powered videos. Enter an idea, and we'll handle the script, voiceover, and visuals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <FeatureCard
            icon={<BrainCircuit className="h-8 w-8 text-primary" />}
            title="AI Scriptwriting"
            description="Enter your video idea, and GPT writes a compelling script."
          />
          <FeatureCard
            icon={<Mic className="h-8 w-8 text-primary" />}
            title="AI Voiceover"
            description="ElevenLabs generates a professional voiceover for your script."
          />
          <FeatureCard
            icon={<Clapperboard className="h-8 w-8 text-primary" />}
            title="AI Visuals"
            description="Pika Labs creates stunning visuals to bring your video to life."
          />
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/video-generator/signup">Create Your Video</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="text-center bg-background/80">
      <CardHeader>
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
