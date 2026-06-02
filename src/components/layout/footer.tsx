import Link from 'next/link';
import { Logo } from '@/components/logo';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'AI Automations', href: '/ai-workflows' },
  { label: 'Book Audit', href: '/ai-workflows#lead-form' },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <Link href="/" className="flex items-center gap-2" aria-label="Oreginald Inc. home">
            <Logo />
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Oreginald Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
