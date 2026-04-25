
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, UploadCloud, FileScan, Mail, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export default function CreditRepairPage() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage:
            "url('/images/20250717_0536_Urban-Tech Luxury Pattern_simple_compose_01k0c60kwafcgs9xcf1jyc9yme.png')",
        }}
        data-ai-hint="luxury pattern"
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Image
              src="/images/Credit/logo.png"
              alt="Oreginald Credit Partners Logo"
              width={200}
              height={200}
              className="mx-auto"
            />
            <h1 className="mt-4 font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
              Oreginald Credit
            </h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              A fully modern SaaS credit repair platform offering both DIY and DFY
              (Done For You) services.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/credit-repair/signup">Get Started For Free</Link>
              </Button>
               <Button size="lg" variant="outline" asChild>
                <Link href="/credit-repair/login">Client Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
              A simple, transparent process to improve your credit score.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <UploadCloud className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold">1. Upload Report</h3>
              <p className="text-muted-foreground mt-2">Securely upload your credit report from any bureau.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <FileScan className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold">2. Analyze & Identify</h3>
              <p className="text-muted-foreground mt-2">Our AI analyzes your report for errors and negative items.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Mail className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold">3. Dispute & Track</h3>
              <p className="text-muted-foreground mt-2">Generate and send dispute letters, then track their status.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Choose Your Plan</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Whether you want to do it yourself or have us handle everything, we have a plan for you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">DIY Plan</CardTitle>
                <CardDescription>For the hands-on individual.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-4xl font-bold">$49<span className="text-lg font-normal text-muted-foreground">/mo</span></p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> AI-Powered Report Analysis</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Unlimited Dispute Letters</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Letter Tracking Dashboard</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Community Support</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/credit-repair/signup?plan=diy">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-primary border-2 flex flex-col relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">Most Popular</div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">DFY (Done For You) Plan</CardTitle>
                <CardDescription>Let our experts handle it all.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-4xl font-bold">$99<span className="text-lg font-normal text-muted-foreground">/mo</span></p>
                 <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Everything in DIY Plan</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Dedicated Credit Expert</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Bureau Communication</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Monthly Progress Calls</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="default" asChild>
                   <Link href="/credit-repair/signup?plan=dfy">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">What Our Clients Say</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Real results from real people.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">"Oreginald Credit helped me remove three negative items from my report in just two months. My score jumped 60 points!"</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Jane Doe</p>
                  <p className="text-sm text-muted-foreground">Los Angeles, CA</p>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">"The DIY plan was perfect for me. The AI tools made it so easy to find errors I never would have caught on my own."</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Michael Smith</p>
                  <p className="text-sm text-muted-foreground">Houston, TX</p>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">"The DFY service was worth every penny. It saved me so much time and stress. Highly recommend!"</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Amanda Starr</p>
                  <p className="text-sm text-muted-foreground">Miami, FL</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Embedded Chatbot Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Have Questions?</h2>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Our specialized credit repair chatbot is here to help. Ask anything about our services, the credit repair process, or get a personalized recommendation.
            </p>
            <div id="chatbot-credit" className="mt-8 mx-auto w-full max-w-lg h-96 bg-background rounded-lg shadow-lg border">
                {/* Chatbot will be embedded here */}
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    Chatbot coming soon...
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
