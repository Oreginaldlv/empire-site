
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

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
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';


const ventures = [
    { id: 'credit-repair', label: 'Oreginald Credit' },
    { id: 'vboy-empire', label: 'VBoy Empire' },
    { id: 'crm', label: 'LeadLoop CRM' },
    { id: 'video-generator', label: 'NMotion AI' },
    { id: 'business-builder', label: 'Business Builder' },
] as const;


const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  ventures: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one venture.',
  }),
});

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ventureQueryParam = searchParams.get('venture');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      ventures: ventureQueryParam ? [ventureQueryParam] : [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch('https://n8n.oreginald.info/webhook-test/sms-incoming', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, type: 'signup' }),
      });

      if (!response.ok) {
        throw new Error('Sign up failed. Please try again.');
      }
      
      toast({
        title: 'Welcome to the Empire!',
        description: 'Your account has been created.',
      });

      // Redirect to a generic dashboard or a venture-specific page
      const redirectPath = values.ventures.length === 1 ? `/${values.ventures[0]}/start` : '/dashboard';
      router.push(redirectPath);

    } catch (error: any) {
      console.error('Error signing up:', error);
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: error.message || 'Could not create your account.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardContent className="space-y-4 pt-0">
            <FormField
                control={form.control}
                name="name"
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
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
              control={form.control}
              name="ventures"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Ventures of Interest</FormLabel>
                    <FormDescription>
                      Select the services you're interested in.
                    </FormDescription>
                  </div>
                  {ventures.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="ventures"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(
                                        (field.value || []).filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
        </CardContent>
        <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
            </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
