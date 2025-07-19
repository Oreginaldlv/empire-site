
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  generateVideoScript,
  GenerateVideoScriptInput,
} from '@/ai/flows/generate-video-script';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  videoIdea: z.string().min(10, {
    message: 'Please describe your video idea in at least 10 characters.',
  }),
});

interface VideoGeneratorSignupFormProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function VideoGeneratorSignupForm({ open, onOpenChange }: VideoGeneratorSignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [script, setScript] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoIdea: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setScript('');
    try {
      const input: GenerateVideoScriptInput = {
        videoIdea: values.videoIdea,
      };
      const result = await generateVideoScript(input);
      setScript(result.script);
    } catch (error) {
      console.error('Error generating video script:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an issue generating your script. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Generate Your Video Script</DialogTitle>
           <DialogDescription>
            Enter an idea, and we'll handle the script. Voiceover and visuals coming soon.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh]">
          <ScrollArea>
             <div className="pr-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="videoIdea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Video Idea</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., A short documentary about the history of the internet."
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Script...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Create My Script
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </ScrollArea>
           <ScrollArea>
            <div className="pr-4">
              {script ? (
                <Card className="shadow-lg animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">
                      Your AI-Generated Script
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 font-body text-sm text-muted-foreground">
                      {script}
                    </pre>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Your script will appear here.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
  );
}
