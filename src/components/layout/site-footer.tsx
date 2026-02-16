'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Heart, ArrowUpRight, ArrowRight, Zap, Package, FileCode, Star } from 'lucide-react';
import { siteConfig } from '@/config/site';

const footerLinks = {
  product: [
    { title: 'Features', href: '/#features' },
    { title: 'Playground', href: '/playground' },
    { title: 'Examples', href: '/examples' },
    { title: 'Changelog', href: '/docs/changelog' },
  ],
  developers: [
    { title: 'Documentation', href: '/docs' },
    { title: 'API Reference', href: '/docs/api/editor-props' },
    { title: 'Components', href: '/docs/components/editor' },
    { title: 'Installation', href: '/docs/installation' },
  ],
  resources: [
    { title: 'GitHub', href: siteConfig.links.github, external: true },
    { title: 'npm Package', href: siteConfig.links.npm, external: true },
    { title: 'Contributing', href: '/docs/contributing' },
    { title: 'License (MIT)', href: 'https://github.com/aadityahasabnis/Authorly/blob/main/LICENSE', external: true },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/docs/privacy' },
    { title: 'Terms of Service', href: '/docs/terms' },
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
      className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-200"
    >
      <span className="group-hover:translate-x-0.5 transition-transform duration-200">{children}</span>
      {external && (
        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      )}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/80 via-muted/40 to-transparent" />
      <div className="absolute inset-0 hero-grid opacity-20" />
      
      {/* Top decorative border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        
        {/* Top section with CTA */}
        <div className="py-16 border-b border-border/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left: Brand + tagline */}
            <div className="text-center lg:text-left">
              <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/25">
                    <svg
                      className="w-6 h-6 text-white"
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
                <div>
                  <span className="text-2xl font-bold block">{siteConfig.name}</span>
                  <span className="text-sm text-muted-foreground">Rich Text Editor for React</span>
                </div>
              </Link>
            </div>
            
            {/* Right: Quick actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105"
              >
                <Zap className="w-4 h-4" />
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border/50 font-medium text-sm hover:bg-muted hover:border-border transition-all duration-200"
              >
                <Star className="w-4 h-4" />
                Star on GitHub
              </Link>
              <Link
                href={siteConfig.links.npm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border/50 font-medium text-sm hover:bg-muted hover:border-border transition-all duration-200"
              >
                <Package className="w-4 h-4" />
                npm
              </Link>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.title}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Developers
            </h3>
            <ul className="space-y-3">
              {footerLinks.developers.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.title}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} external={link.external}>{link.title}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Connect
            </h3>
            <div className="space-y-3 mb-6">
              {footerLinks.legal.map((link) => (
                <div key={link.href}>
                  <FooterLink href={link.href}>{link.title}</FooterLink>
                </div>
              ))}
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border hover:scale-110 transition-all duration-200"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border hover:scale-110 transition-all duration-200"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:hello@authorly.dev"
                className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border hover:scale-110 transition-all duration-200"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>&copy; {new Date().getFullYear()} {siteConfig.name}</span>
              <span className="hidden md:inline text-border">|</span>
              <span className="flex items-center gap-1.5">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by{' '}
                <Link
                  href="https://github.com/aadityahasabnis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:text-primary transition-colors"
                >
                  {siteConfig.creator}
                </Link>
              </span>
            </div>
            
            {/* Tech badges */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border/50 text-xs font-medium text-muted-foreground">
                <FileCode className="w-3.5 h-3.5" />
                TypeScript
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border/50 text-xs font-medium text-muted-foreground">
                <Zap className="w-3.5 h-3.5" />
                ~30kb
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                MIT License
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
