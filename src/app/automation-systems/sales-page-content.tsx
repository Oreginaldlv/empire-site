'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  AlertCircle,
  ArrowRight,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  ClipboardList,
  Loader2,
  MessageSquareReply,
  PhoneMissed,
  Star,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required.' }),
  businessName: z.string().min(2, { message: 'Business name is required.' }),
  businessType: z.string().min(1, { message: 'Please select a business type.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  website: z.string().optional(),
  cityState: z.string().min(2, { message: 'City and state are required.' }),
  mainProblem: z.string().min(10, { message: 'Please describe your main problem.' }),
  weeklyLeads: z.string().min(1, { message: 'Please select weekly leads.' }),
  leadSource: z.string().min(1, { message: 'Please select a lead source.' }),
  missedLeadProcess: z.string().min(1, { message: 'Please describe your current process.' }),
  currentTools: z.string().min(1, { message: 'Please describe your current tools.' }),
  automationInterest: z.string().min(1, { message: 'Please select your automation interest.' }),
  budget: z.string().min(1, { message: 'Please select a budget.' }),
  timeline: z.string().min(1, { message: 'Please select a timeline.' }),
  notes: z.string().optional(),
});

const successMessage =
  'Your request was received. We will review your business and recommend the best automation setup.';
const errorMessage =
  'Something went wrong. Please try again or contact us directly.';

const painPoints = [
  'Calls go unanswered while you are working',
  'Leads message you but do not get followed up with',
  'Customers forget appointments',
  'Reviews are not being requested after service',
  'Customer info is scattered everywhere',
  'You have no simple lead tracking system',
];

const packageCards = [
  {
    title: 'Missed Call Rescue System',
    description: 'Instant missed-call text back, routing, and lead logging so every call gets a second chance.',
    icon: PhoneMissed,
  },
  {
    title: 'Lead Capture Follow-Up System',
    description: 'Capture new inquiries, send fast replies, and keep follow-up moving without manual chasing.',
    icon: MessageSquareReply,
  },
  {
    title: 'Appointment Booking & Reminder System',
    description: 'Automate confirmations and reminders to reduce no-shows and keep the calendar full.',
    icon: CalendarCheck2,
  },
  {
    title: 'Google Review Request System',
    description: 'Ask happy customers for reviews automatically after the job or appointment is complete.',
    icon: Star,
  },
  {
    title: 'Customer Re-Activation System',
    description: 'Reconnect with old leads and past customers using timed, relevant outreach.',
    icon: Bot,
  },
];

const howItWorks = [
  'Tell us your business problem',
  'We build the automation workflow',
  'Leads, replies, and alerts start flowing automatically',
];

const industries = [
  'Dentists',
  'Doctors',
  'Barbers',
  'Salons',
  'Lawn Care',
  'Contractors',
  'Cleaning Services',
  'Mobile Service Businesses',
];

type FormValues = z.infer<typeof formSchema>;
type SubmissionState = 'idle' | 'success' | 'error';

export function AutomationSystemsContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      businessName: '',
      businessType: '',
      phone: '',
      email: '',
      website: '',
      cityState: '',
      mainProblem: '',
      weeklyLeads: '',
      leadSource: '',
      missedLeadProcess: '',
      currentTools: '',
      automationInterest: '',
      budget: '',
      timeline: '',
      notes: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setSubmissionState('idle');

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_AUTOMATION_INTAKE_WEBHOOK;

      if (!webhookUrl) {
        throw new Error('Missing automation intake webhook');
      }

      const payload = {
        source: 'website',
        offer: 'Small Business Automation Systems',
        submittedAt: new Date().toISOString(),
        ...values,
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      setSubmissionState('success');
      form.reset();
      toast({
        title: 'Request received',
        description: successMessage,
      });
    } catch (error) {
      console.error('Automation intake submission failed:', error);
      setSubmissionState('error');
      toast({
        variant: 'destructive',
        title: 'Submission failed',
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background">
      <section className="border-b bg-gradient-to-br from-primary/15 via-background to-secondary/10">
        <div className="container mx-auto grid gap-10 px-4 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl space-y-6">
            <Badge variant="outline" className="px-4 py-1 text-xs uppercase tracking-[0.24em]">
              Small Business Automation Systems
            </Badge>
            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                Stop Losing Customers When You Miss Calls, Messages, or Follow-Ups
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground md:text-xl/relaxed">
                We build automation systems for small businesses that stop missed leads, speed up
                follow-up, reduce manual work, and help turn inquiries into booked customers.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="group"
                onClick={() =>
                  document
                    .getElementById('automation-intake-form')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              >
                Get My Automation Setup
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <Card className="border-primary/20 bg-card/95 shadow-xl shadow-primary/10">
            <CardHeader className="space-y-3">
              <CardTitle className="font-headline text-2xl">What this fixes fast</CardTitle>
              <CardDescription>
                A focused system setup for local businesses that need faster responses, cleaner lead
                tracking, and fewer missed opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                'Capture inbound leads from calls, forms, and messages',
                'Respond in seconds with the right first message',
                'Follow up automatically until a prospect replies or books',
                'Alert your team when a customer is ready for the next step',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-md border bg-background/70 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-accent" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b bg-muted/20">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              You are probably losing money if:
            </h2>
            <p className="mt-4 text-muted-foreground">
              When response time, follow-up, and customer data live in too many places, revenue
              slips through quietly.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {painPoints.map((point) => (
              <Card key={point} className="border-destructive/20 bg-card/80">
                <CardContent className="flex h-full items-start gap-4 p-6">
                  <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-destructive" />
                  <p className="text-base leading-7">{point}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Automation systems we can build for you
            </h2>
            <p className="mt-4 text-muted-foreground">
              Pick the problem you want solved first, or let us map the right sequence for your
              business.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {packageCards.map((card) => {
              const Icon = card.icon;

              return (
                <Card key={card.title} className="group border-border/80 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/15 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                    <CardDescription className="text-sm leading-6">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b bg-secondary/5">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              How It Works
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {howItWorks.map((step, index) => (
              <Card key={step} className="bg-card/90">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl">{step}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              Built for service businesses with real lead volume
            </h2>
          </div>
          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <Badge key={industry} variant="secondary" className="px-4 py-2 text-sm md:text-base">
                {industry}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section id="automation-intake-form" className="bg-muted/20">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <Card className="h-fit border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader className="space-y-4">
                <Badge variant="outline" className="w-fit px-3 py-1 uppercase tracking-[0.2em]">
                  Intake Form
                </Badge>
                <CardTitle className="font-headline text-3xl">
                  Tell us where the breakdown is happening
                </CardTitle>
                <CardDescription className="text-base leading-7">
                  Tell us what is broken in your customer flow. We will recommend the fastest
                  automation to fix it.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3 rounded-md border bg-background/80 p-4">
                  <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p>We review your bottlenecks, lead sources, and current tools.</p>
                </div>
                <div className="flex items-start gap-3 rounded-md border bg-background/80 p-4">
                  <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p>We map a system around your workflow instead of forcing generic software.</p>
                </div>
                <div className="flex items-start gap-3 rounded-md border bg-background/80 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p>You get a clear recommendation based on what will move the needle first.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Get My Automation Setup</CardTitle>
                <CardDescription>
                  Complete the form below and we will review your business needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submissionState === 'success' ? (
                  <Alert className="mb-6 border-accent/30 bg-accent/10">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <AlertTitle>Request received</AlertTitle>
                    <AlertDescription>{successMessage}</AlertDescription>
                  </Alert>
                ) : null}

                {submissionState === 'error' ? (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Submission failed</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                ) : null}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Empire Dental Studio" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="businessType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select business type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="dentist">Dentist</SelectItem>
                                <SelectItem value="doctor">Doctor</SelectItem>
                                <SelectItem value="barber">Barber</SelectItem>
                                <SelectItem value="salon">Salon</SelectItem>
                                <SelectItem value="lawn-care">Lawn Care</SelectItem>
                                <SelectItem value="contractor">Contractor</SelectItem>
                                <SelectItem value="cleaning-services">Cleaning Services</SelectItem>
                                <SelectItem value="mobile-service-business">Mobile Service Business</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="owner@business.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input placeholder="https://yourbusiness.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="cityState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City, State</FormLabel>
                          <FormControl>
                            <Input placeholder="Las Vegas, NV" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mainProblem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Main Problem</FormLabel>
                          <FormControl>
                            <Textarea
                              className="min-h-28"
                              placeholder="What is costing you leads, appointments, or follow-up right now?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="weeklyLeads"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weekly Leads</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select weekly leads" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="0-5">0-5</SelectItem>
                                <SelectItem value="6-15">6-15</SelectItem>
                                <SelectItem value="16-30">16-30</SelectItem>
                                <SelectItem value="31-50">31-50</SelectItem>
                                <SelectItem value="51+">51+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="leadSource"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lead Source</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select lead source" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="google">Google</SelectItem>
                                <SelectItem value="facebook-instagram">Facebook / Instagram</SelectItem>
                                <SelectItem value="referrals">Referrals</SelectItem>
                                <SelectItem value="website">Website</SelectItem>
                                <SelectItem value="repeat-customers">Repeat Customers</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="missedLeadProcess"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Missed Lead Process</FormLabel>
                          <FormControl>
                            <Textarea
                              className="min-h-24"
                              placeholder="What currently happens when a lead calls, messages, or fills out a form and nobody responds right away?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currentTools"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Tools</FormLabel>
                          <FormControl>
                            <Textarea
                              className="min-h-24"
                              placeholder="List the tools you use today: phone system, CRM, calendar, email, spreadsheets, or anything else."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-6 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="automationInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Automation Interest</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select interest" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ready-now">Ready now</SelectItem>
                                <SelectItem value="planning">Planning soon</SelectItem>
                                <SelectItem value="exploring">Still exploring</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select budget" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="under-500">Under $500</SelectItem>
                                <SelectItem value="500-1000">$500-$1,000</SelectItem>
                                <SelectItem value="1000-2500">$1,000-$2,500</SelectItem>
                                <SelectItem value="2500-plus">$2,500+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Timeline</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="asap">ASAP</SelectItem>
                                <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                                <SelectItem value="1-3-months">1-3 months</SelectItem>
                                <SelectItem value="just-researching">Just researching</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Textarea
                              className="min-h-24"
                              placeholder="Anything else we should know about your workflow, staff, or goals?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="animate-spin" /> : null}
                      Get My Automation Setup
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
