
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CreditCard, Film, Users, Shirt, Rocket, FileText } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

const ventures = [
  {
    name: 'Oreginald Credit',
    title: 'Credit Repair SaaS',
    tagline: 'Rebuild your credit, reshape your future.',
    href: '/credit-repair/signup',
    Icon: CreditCard,
    image: '/images/Credit/logo.png',
    dataAiHint: 'finance abstract',
  },
  {
    name: 'VBoy Empire',
    title: 'Entertainment & Merch',
    tagline: 'Exclusive content and apparel for the true fan.',
    href: '/vboy-empire/signup',
    Icon: Shirt,
    image: '/images/Vboy/20250717_1445_VBoy Empire Redesign_remix_01k0d5drgqfp88hvgh4n506r5v.png',
    dataAiHint: 'music concert',
  },
  {
    name: 'LeadLoop CRM',
    title: 'CRM for Leads',
    tagline: 'Connect, parse, and manage leads intelligently.',
    href: '/crm/signup',
    Icon: Users,
    image: '/images/Vboy/20250717_1511_LeadLoop CRM Logo_simple_compose_01k0d719svec2v071sgh8magez.png',
    dataAiHint: 'business network',
  },
  {
    name: 'NMotion AI',
    title: 'AI Video Generator',
    tagline: 'Create stunning videos from simple ideas.',
    href: '/video-generator/signup',
    Icon: Film,
    image: '/images/Vboy/20250717_1510_Futuristic NMotion Logo_simple_compose_01k0d6ywn7ejhravmc9h5r3hms.png',
    dataAiHint: 'abstract motion',
  },
  {
    name: 'Oreginald Business Builder',
    title: 'AI Business Builder',
    tagline: 'Your AI co-founder for launching a new venture.',
    href: '/business-builder/signup',
    Icon: Rocket,
    image: '/images/Vboy/20250717_1505_Oreginald Logo Design_simple_compose_01k0d6nz3rfh6btq0mnt1vfk4b.png',
    dataAiHint: 'startup rocket',
  },
    {
    name: 'Empire Wills & Trusts',
    title: 'Estate Planning',
    tagline: 'Secure your legacy for generations to come.',
    href: '/wills-and-trusts/signup',
    Icon: FileText,
    image: 'https://placehold.co/1200x800.png',
    dataAiHint: 'legal document',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 md:space-y-20 py-12 md:py-24">
      <section className="container mx-auto px-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Construct Your Digital Empire
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          Leverage our suite of AI-powered tools and services to build, manage, and grow your ventures. Your dynasty starts now.
        </p>
        <div className="mt-8">
            <Button size="lg" asChild>
                <Link href="/auth">Begin Building</Link>
            </Button>
        </div>
      </section>

      <section className="w-full">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {ventures.map((venture, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden group border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-primary/20">
                    <CardContent className="relative flex aspect-video items-center justify-center p-0">
                      <Image
                        src={venture.image}
                        alt={venture.name}
                        width={1200}
                        height={800}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={venture.dataAiHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                        <div className="flex items-center gap-4">
                           <div className='p-2 rounded-lg bg-primary/20'>
                             <venture.Icon className='w-8 h-8 text-primary' />
                           </div>
                           <div>
                            <h2 className="font-headline text-2xl font-bold">
                              {venture.name}
                            </h2>
                            <p className="text-sm text-muted-foreground text-white/80">
                              {venture.tagline}
                            </p>
                          </div>
                        </div>
                        <Link href={venture.href} className="mt-4">
                          <Button
                            variant="default"
                            className="mt-4 group/button"
                          >
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        </Carousel>
      </section>
    </div>
  );
}
