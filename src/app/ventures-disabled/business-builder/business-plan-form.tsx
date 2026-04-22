'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  generateBusinessPlan,
  GenerateBusinessPlanInput,
} from '@/ai/flows/generate-business-plan';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  businessIdea: z.string().min(10, 'Please describe your idea in more detail.'),
  targetAudience: z
    .string()
    .min(10, 'Please describe your target audience.'),
  keyFeatures: z.string().min(10, 'Please list a few key features.'),
});

export function BusinessPlanForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [businessPlan, setBusinessPlan] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessIdea: '',
      targetAudience: '',
      keyFeatures: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setBusinessPlan('');
    try {
      const input: GenerateBusinessPlanInput = {
        businessIdea: values.businessIdea,
        targetAudience: values.targetAudience,
        keyFeatures: values.keyFeatures,
      };
      const result = await generateBusinessPlan(input);
      setBusinessPlan(result.businessPlan);
    } catch (error) {
      console.error('Error generating business plan:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          'There was an issue generating your business plan. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DialogContent className="sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle className="font-headline text-2xl">
          Generate Your Business Plan
        </DialogTitle>
        <DialogDescription>
          Fill out the details below to generate your initial business plan.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh]">
        <ScrollArea className="h-full">
          <div className="pr-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="businessIdea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Business Idea</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., A subscription box for sustainable, eco-friendly home goods."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Briefly describe your business concept.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Target Audience</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Millennials aged 25-40 who are environmentally conscious and live in urban areas."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Who are your primary customers?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="keyFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Key Features</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 1. Curated monthly deliveries. 2. Products from local artisans. 3. Educational content on sustainable living."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        What are the main features or products you will offer?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} size="lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Create My Business Plan
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
        <ScrollArea className="h-full">
          <div className="pr-4">
            {businessPlan ? (
              <Card className="shadow-lg animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">
                    Your AI-Generated Business Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 font-body text-sm text-muted-foreground">
                    {businessPlan}
                  </pre>
                </CardContent>
              </Card>
            ) : (
               <div className="flex items-center justify-center h-full text-muted-foreground">
                 Your business plan will appear here.
               </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </DialogContent>
  );
}
