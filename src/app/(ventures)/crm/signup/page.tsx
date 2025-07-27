
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CrmSignupRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth?venture=crm');
  }, [router]);

  return null; // or a loading spinner
}
