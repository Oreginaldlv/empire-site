
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { signUpUser } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  creditReport: z.any().optional(), // Made optional for now
  serviceType: z.enum(['DIY', 'DFY'], { required_error: 'You need to select a service type.' }),
  additionalNotes: z.string().optional(),
});

interface CreditRepairSignupFormProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreditRepairSignupForm({ open, onOpenChange }: CreditRepairSignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      phone: '',
      additionalNotes: '',
    },
  });

  const fileRef = form.register('creditReport');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    const result = await signUpUser(values.email, values.password, 'credit-repair', {
      fullName: values.fullName,
      phone: values.phone,
      serviceType: values.serviceType,
      additionalNotes: values.additionalNotes,
    });

    if (result.error) {
       toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: result.error.message || 'Could not create account. Please try again.',
      });
    } else {
        toast({
            title: 'Success!',
            description: 'Your account has been created.',
        });
        router.push('/credit-repair/start');
    }

    setIsLoading(false);
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Sign Up for Oreginald Credit</DialogTitle>
        <DialogDescription>Start your journey to better credit today.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="fullName" render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl><Input type="tel" placeholder="(555) 555-5555" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="creditReport" render={({ field }) => (
            <FormItem>
              <FormLabel>Credit Report (Optional)</FormLabel>
              <FormControl><Input type="file" accept="application/pdf,image/*" {...fileRef} /></FormControl>
              <FormDescription>You can upload your credit report later.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="serviceType" render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Service Type</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="DIY" /></FormControl>
                    <FormLabel className="font-normal">DIY (Do It Yourself)</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="DFY" /></FormControl>
                    <FormLabel className="font-normal">DFY (Done For You)</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="additionalNotes" render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl><Textarea placeholder="Anything else we should know?" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
