import { Link } from 'react-router-dom';
import { Zap, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const LINKS = {
  company: ['About us', 'Services', 'Use Cases', 'Pricing', 'Blog'],
  legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

const SOCIALS = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-positivus-dark-card border-t border-border">
      <div className="section-container px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-foreground">Positivus</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Navigating the digital landscape for success.
            </p>
            <div className="flex gap-3 mt-5">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
              Company
            </p>
            <ul className="space-y-2.5">
              {LINKS.company.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
              Legal
            </p>
            <ul className="space-y-2.5">
              {LINKS.legal.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
              Newsletter
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground flex-5 text-sm"
              />
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
              >
                Subscribe to news
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-border mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-">
          <p>© {new Date().getFullYear()} Positivus. All rights reserved.</p>
          <div className="flex gap-6">
            {LINKS.legal.map((link) => (
              <a key={link} href="#" className="hover:text-foreground transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
