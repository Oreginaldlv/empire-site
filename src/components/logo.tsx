import { Pyramid } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Pyramid className="h-6 w-6 text-primary" />
      <span className="font-headline text-xl font-bold">
        Oreginald Inc. LLC
      </span>
    </div>
  );
}
