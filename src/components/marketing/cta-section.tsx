'use client';

import Link from 'next/link';
import { ArrowRight, Github, Terminal, Copy, Check, Sparkles, Zap, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { useState } from 'react';

export function CTASection() {
  const [copied, setCopied] = useState(false);
  
  const copyCommand = () => {
    navigator.clipboard.writeText('npm install authorly-editor');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Open Source • MIT Licensed • Free Forever</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Start building with{' '}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Authorly
            </span>{' '}
            today
          </h2>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Production-ready editor trusted by developers. Get started in minutes with clean APIs and comprehensive documentation.
          </p>

          {/* Install Command - Premium Terminal */}
          <div className="mb-12">
            <button
              onClick={copyCommand}
              className="group relative inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all shadow-2xl hover:shadow-primary/10"
            >
              {/* Terminal Window Dots */}
              <div className="absolute left-6 top-5 flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>

              {/* Command */}
              <div className="flex items-center gap-3 pt-6">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <code className="font-mono text-base md:text-lg">
                  <span className="text-emerald-400">$</span>{' '}
                  <span className="text-zinc-400">npm install</span>{' '}
                  <span className="text-cyan-400 font-semibold">authorly-editor</span>
                </code>
              </div>

              {/* Copy Button */}
              <div className="pt-6 pl-4 border-l border-zinc-700/50">
                {copied ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Copy className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                )}
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
            </button>
            <p className="text-sm text-muted-foreground mt-4">
              {copied ? '✓ Copied to clipboard!' : 'Click to copy'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/docs">
              <Button 
                size="lg" 
                className="h-14 px-8 text-base gap-2 group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
              >
                <Zap className="w-5 h-5" />
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/playground">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-base gap-2 border-2 hover:bg-accent"
              >
                <Code2 className="w-5 h-5" />
                Try Playground
              </Button>
            </Link>
            <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-base gap-2 border-2 hover:bg-accent"
              >
                <Github className="w-5 h-5" />
                GitHub
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Production Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>TypeScript Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>~30kb Gzipped</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span>Zero Config</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
