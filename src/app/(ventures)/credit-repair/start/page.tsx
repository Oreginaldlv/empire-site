
import { CreditCard } from 'lucide-react';
import { CreditIntakeForm } from '../intake-form';

export default function CreditRepairStartPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <CreditCard className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Let's Get Started
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Fill out the form below to begin your credit repair journey.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-2xl">
        <CreditIntakeForm />
      </div>
    </div>
  );
}
