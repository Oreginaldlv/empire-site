
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VboyEmpireSignupRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth?venture=vboy-empire');
  }, [router]);

  return null; // or a loading spinner
}
