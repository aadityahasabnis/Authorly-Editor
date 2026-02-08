'use client';

import Link from 'next/link';
import { Github, Twitter, Mail, Heart, ArrowUpRight, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';

const footerLinks = {
  product: [
    { title: 'Features', href: '/#features' },
    { title: 'Playground', href: '/playground' },
    { title: 'Examples', href: '/examples' },
    { title: 'Pricing', href: '/#pricing' },
  ],
  docs: [
    { title: 'Getting Started', href: '/docs' },
    { title: 'Installation', href: '/docs/installation' },
    { title: 'Components', href: '/docs/components/editor' },
    { title: 'API Reference', href: '/docs/api/editor-props' },
  ],
  resources: [
    { title: 'Changelog', href: '/docs/changelog' },
    { title: 'Roadmap', href: '/docs/roadmap' },
    { title: 'Contributing', href: '/docs/contributing' },
    { title: 'License', href: 'https://github.com/aadityahasabnis/Authorly/blob/main/LICENSE', external: true },
  ],
  community: [
    { title: 'GitHub', href: siteConfig.links.github, external: true },
    { title: 'Twitter', href: siteConfig.links.twitter, external: true },
    { title: 'npm', href: siteConfig.links.npm, external: true },
  ],
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

function FooterLink({ href, children, external }: FooterLinkProps) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
      {external && (
        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      )}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-b from-background to-muted/30">
      {/* Decorative top gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </Link>
            
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              {siteConfig.tagline}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:hello@authorly.dev"
                className="p-2.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.title}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Docs</h3>
            <ul className="space-y-3">
              {footerLinks.docs.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.title}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} external={link.external}>{link.title}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Community</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} external={link.external}>{link.title}</FooterLink>
                </li>
              ))}
            </ul>
            
            {/* Newsletter signup teaser */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Stay updated</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Star us on GitHub to follow updates
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/docs/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link 
              href="/docs/terms" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              Made with{' '}
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              {' '}by{' '}
              <Link
                href="https://github.com/aadityahasabnis"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                {siteConfig.creator}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
