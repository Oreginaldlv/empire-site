import Link from 'next/link';
import {
  ArrowRight,
  BellRing,
  CalendarCheck2,
  CheckCircle2,
  ClipboardList,
  MessageSquareReply,
  PhoneMissed,
  Star,
} from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const auditHref = '/ai-workflows#lead-form';
const pricingHref = '/ai-workflows#pricing';

const problems = [
  'Calls get missed while you are serving customers.',
  'Messages sit too long and hot leads go cold.',
  'Quote requests are forgotten in texts, email, voicemail, or notes.',
  'Customers do not get appointment reminders.',
  'Reviews are not requested after the job is complete.',
  'Owners waste time chasing leads manually instead of doing the work.',
];

const solutions = [
  'Capture leads from forms, calls, or messages',
  'Send instant follow-up so prospects know they were received',
  'Log customer information into a sheet or CRM',
  'Alert the owner when a new lead or ready customer comes in',
  'Send appointment reminders to reduce no-shows',
  'Request Google reviews and reactivate old customers',
];

const industries = [
  {
    title: 'Barbers & salons',
    text: 'Capture booking requests, send reminders, and follow up with clients who have not scheduled yet.',
  },
  {
    title: 'Cleaning companies',
    text: 'Capture quote requests, follow up automatically, and keep every lead organized.',
  },
  {
    title: 'Mobile detailers',
    text: 'Respond quickly to service requests and move customers toward a booked appointment.',
  },
  {
    title: 'Contractors',
    text: 'Track estimate requests, alert the owner, and keep follow-up from falling through the cracks.',
  },
  {
    title: 'Lawn care businesses',
    text: 'Turn missed calls and seasonal inquiries into organized leads and reminder-driven follow-up.',
  },
  {
    title: 'Caterers & small restaurants',
    text: 'Capture catering requests, collect key details, and prepare the next step for quotes or deposits.',
  },
];

const faqs = [
  {
    question: 'Do I need to know technology?',
    answer: 'No. We set it up and show you how to use it.',
  },
  {
    question: 'What does the system do?',
    answer: 'It captures leads, follows up, logs customer info, and alerts you.',
  },
  {
    question: 'Can it work with my current website?',
    answer:
      'In most cases, yes. We can connect forms, calendars, email, SMS, spreadsheets, or payment links depending on your setup.',
  },
  {
    question: 'How much does it cost?',
    answer: 'The starter system is $297 setup plus $49/month maintenance.',
  },
  {
    question: 'Is this a full AI employee?',
    answer:
      'No. It is a lead capture and follow-up system that helps reduce missed opportunities.',
  },
  {
    question: 'How fast can this be set up?',
    answer:
      'Basic systems can be prepared once the business information, offer, contact method, and workflow details are provided.',
  },
];

export default function Home() {
  return (
    <main className="bg-background">
      <section className="border-b bg-gradient-to-br from-primary/15 via-background to-secondary/10">
        <div className="container mx-auto grid gap-10 px-4 py-16 md:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="max-w-3xl space-y-6">
            <Badge variant="outline" className="px-4 py-1 text-xs uppercase tracking-[0.24em]">
              AI automation systems for local service businesses
            </Badge>
            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                Stop Losing Customers When You Miss Calls, Messages, or Follow-Ups
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground md:text-xl/relaxed">
                We install AI automation systems that capture leads, follow up instantly, help
                book appointments, send reminders, and alert you when a customer is ready.
              </p>
              <p className="font-medium text-foreground">
                Built for local service businesses that need more booked jobs without hiring more staff.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href={auditHref}>
                  Book a Free Automation Audit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={pricingHref}>Get Started for $297</Link>
              </Button>
            </div>
          </div>

          <Card className="border-primary/20 bg-card/95 shadow-xl shadow-primary/10">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">What the system helps with</CardTitle>
              <CardDescription>
                A simple sales path from new inquiry to captured lead, owner alert, follow-up,
                and next step.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                ['Lead captured', 'Customer details are collected before they get lost.'],
                ['Fast follow-up', 'The prospect receives a response while they are still interested.'],
                ['Owner alerted', 'You know when a customer needs attention.'],
                ['Lead tracked', 'Information is organized in a sheet or CRM for follow-up.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border bg-background/80 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold">{title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b bg-muted/20">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              The problem
            </p>
            <h2 className="mt-3 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Good leads disappear when follow-up depends on memory and spare time.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {problems.map((problem) => (
              <Card key={problem}>
                <CardContent className="flex h-full items-start gap-4 p-6">
                  <PhoneMissed className="mt-1 h-5 w-5 shrink-0 text-destructive" />
                  <p className="leading-7">{problem}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="solution" className="border-b">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              The solution
            </p>
            <h2 className="mt-3 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              A practical automation system for lead capture and follow-up.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We connect the first steps of your customer flow so fewer inquiries sit unanswered.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution) => (
              <Card key={solution}>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                    <MessageSquareReply className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{solution}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-b bg-secondary/5">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              How it works
            </p>
            <h2 className="mt-3 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Three simple steps from audit to automatic follow-up.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ['Free Automation Audit', 'We review where leads are being lost.'],
              ['System Setup', 'We build the automation around your business.'],
              ['Automatic Follow-Up', 'Your leads get captured, followed up with, logged, and sent to you.'],
            ].map(([title, text], index) => (
              <Card key={title} className="bg-card/90">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <CardDescription className="leading-6">{text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="border-b">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Starter AI Automation System
                </p>
                <CardTitle className="font-headline text-4xl">$297 setup + $49/month</CardTitle>
                <CardDescription className="text-base leading-7">
                  A focused starter system for local businesses that need better intake, faster
                  replies, and cleaner follow-up.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href={auditHref}>Book a Free Automation Audit</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href={pricingHref}>Get Started for $297</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Lead capture form',
                'Email or SMS follow-up',
                'Owner lead alerts',
                'Google Sheet or CRM lead tracking',
                'Basic appointment request workflow',
                'Maintenance support',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border bg-card p-4">
                  <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm leading-6">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-muted/20">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Industries
            </p>
            <h2 className="mt-3 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Built for local service providers that need faster response.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry) => (
              <Card key={industry.title}>
                <CardHeader>
                  <CardTitle className="text-xl">{industry.title}</CardTitle>
                  <CardDescription className="leading-6">{industry.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <Card className="mx-auto max-w-5xl overflow-hidden border-primary/20">
            <CardContent className="grid gap-8 p-8 md:grid-cols-[0.8fr_1.2fr] md:p-10">
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-primary/15 text-primary">
                <BellRing className="h-12 w-12" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Demo
                </p>
                <h2 className="mt-3 font-headline text-3xl font-bold tracking-tight">
                  See the AI Automation Flow
                </h2>
                <p className="mt-4 text-muted-foreground leading-7">
                  Watch how a customer inquiry becomes a captured lead, automatic follow-up,
                  owner alert, and booked appointment.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild>
                    <Link href="/demos/ai-receptionist/">View Demo</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={auditHref}>Book a Free Automation Audit</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b bg-muted/20">
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              FAQ
            </p>
            <h2 className="mt-3 font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Common questions
            </h2>
          </div>
          <div className="mt-10 rounded-3xl border bg-card px-6 py-2 shadow-sm">
            <Accordion collapsible type="single">
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-left text-base hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container mx-auto px-4 py-16 text-center md:py-20">
          <CalendarCheck2 className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mx-auto mt-5 max-w-3xl font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Stop Letting Good Leads Disappear
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg/relaxed">
            If calls, messages, or quote requests are slipping through the cracks, we can build
            a simple automation system to catch them and follow up.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href={auditHref}>Book a Free Automation Audit</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={pricingHref}>Get Started for $297</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
