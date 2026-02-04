'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Book, Sparkles, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[128px]" />
      
      <div className="relative text-center px-4 max-w-2xl mx-auto">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <span className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary leading-none">
              404
            </span>
            {/* Glitch effect layers */}
            <span className="absolute inset-0 text-[150px] md:text-[200px] font-bold text-primary/20 leading-none animate-pulse" style={{ transform: 'translate(4px, 4px)' }}>
              404
            </span>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Oops! Page not found
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </motion.div>

        {/* Search suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-muted/50 border border-border/50 text-muted-foreground">
            <Search className="w-5 h-5" />
            <span className="text-sm">Try searching in our documentation</span>
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-background border rounded-md">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/20">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant="outline" size="lg" className="gap-2 border-2">
              <Book className="w-4 h-4" />
              Documentation
            </Button>
          </Link>
          <Link href="/playground">
            <Button variant="outline" size="lg" className="gap-2 border-2">
              <Sparkles className="w-4 h-4" />
              Playground
            </Button>
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16"
        >
          <p className="text-sm text-muted-foreground mb-4">Popular pages</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { href: '/docs/getting-started', label: 'Getting Started' },
              { href: '/docs/installation', label: 'Installation' },
              { href: '/examples', label: 'Examples' },
              { href: '/docs/api/editor-props', label: 'API Reference' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg bg-muted/30 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Fun ASCII art */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 text-muted-foreground/20"
        >
          <pre className="text-xs font-mono inline-block text-left">
{`    ┌──────────────────────────┐
    │                          │
    │    ¯\\_(ツ)_/¯            │
    │                          │
    │  This page is on         │
    │  vacation. Check back    │
    │  later or try another.   │
    │                          │
    └──────────────────────────┘`}
          </pre>
        </motion.div>
      </div>
    </div>
  );
}
