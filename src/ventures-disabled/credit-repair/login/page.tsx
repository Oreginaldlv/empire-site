
import { CreditCard } from 'lucide-react';
import { LoginForm } from './login-form';

export default function CreditRepairLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <div className="mx-auto w-full max-w-md px-4">
        <div className="text-center mb-8">
            <CreditCard className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Client Login
            </h1>
            <p className="mt-2 text-muted-foreground">
            Access your Oreginald Credit dashboard.
            </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
