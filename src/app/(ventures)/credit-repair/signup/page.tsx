
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreditRepairSignupRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth?venture=credit-repair');
  }, [router]);

  return null; // or a loading spinner
}
