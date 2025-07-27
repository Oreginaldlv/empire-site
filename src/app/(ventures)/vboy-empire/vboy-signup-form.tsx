
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
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { signUpUser } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';


const contentTypes = [
  { id: 'music', label: 'Music' },
  { id: 'merch', label: 'Merch' },
  { id: 'video', label: 'Video' },
  { id: 'blog', label: 'Blog/Vlog' },
] as const;

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  favoriteContentTypes: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one favorite content type.',
  }),
  userPhoto: z.any().optional(),
  shippingAddress: z.string().optional(),
});

interface VboySignupFormProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function VboySignupForm({ open, onOpenChange }: VboySignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      favoriteContentTypes: [],
      shippingAddress: '',
    },
  });

  const fileRef = form.register('userPhoto');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    const result = await signUpUser(values.email, values.password, 'vboy-empire', {
        fullName: values.fullName,
        favoriteContentTypes: values.favoriteContentTypes,
        shippingAddress: values.shippingAddress,
    });

    if (result.error) {
       toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: result.error.message || 'Could not create account. Please try again.',
      });
    } else {
        toast({
            title: 'Welcome to the Empire!',
            description: 'Your account has been created.',
        });
        router.push('/dashboard');
    }

    setIsLoading(false);
  }

  return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join the VBoy Empire</DialogTitle>
          <DialogDescription>Sign up for exclusive content, merch drops, and more.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-6">
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
            <FormField
              control={form.control}
              name="favoriteContentTypes"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Favorite Content Types</FormLabel>
                    <FormDescription>
                      Select what you're most interested in.
                    </FormDescription>
                  </div>
                  {contentTypes.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="favoriteContentTypes"
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
             <FormField control={form.control} name="userPhoto" render={({ field }) => (
              <FormItem>
                <FormLabel>User Photo (Optional)</FormLabel>
                <FormControl><Input type="file" accept="image/*" {...fileRef} /></FormControl>
                <FormDescription>Upload a photo for your profile.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="shippingAddress" render={({ field }) => (
                <FormItem>
                    <FormLabel>Shipping Address (for merch)</FormLabel>
                    <FormControl><Textarea placeholder="123 Main St, Anytown, USA" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Join
            </Button>
          </form>
        </Form>
        </ScrollArea>
      </DialogContent>
  );
}
