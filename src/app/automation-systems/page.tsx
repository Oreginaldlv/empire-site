import type { Metadata } from 'next';
import { AutomationSystemsContent } from './sales-page-content';

export const metadata: Metadata = {
  title: 'Small Business Automation Systems',
  description:
    'Automation systems for small businesses that capture leads, follow up automatically, and help more customers book.',
};

export default function AutomationSystemsPage() {
  return <AutomationSystemsContent />;
}
