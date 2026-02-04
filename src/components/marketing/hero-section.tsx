'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check, Copy, Sparkles, Zap, Shield, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install authorly-editor');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlights = [
    { icon: Zap, text: 'Lightweight ~30kb' },
    { icon: Shield, text: 'TypeScript Ready' },
    { icon: Palette, text: 'Dark Mode Built-in' },
    { icon: Sparkles, text: '13+ Block Types' },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="py-24 md:py-32 lg:py-40">
          {/* Main Content */}
          <div className="text-center max-w-5xl mx-auto">
            {/* Version Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-gradient mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium">v0.1.0 — Now available on npm</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
            >
              The Rich Text Editor{' '}
              <br className="hidden sm:block" />
              <span className="gradient-text">Built for Publishing</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              A lightweight, block-based editor for React that outputs clean, semantic HTML.
              Perfect for blogs, documentation, and content management systems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            >
              <Link href="/docs">
                <Button size="lg" className="h-12 px-8 text-base gap-2 group shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/playground">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2 border-2">
                  <Sparkles className="w-4 h-4" />
                  Try Playground
                </Button>
              </Link>
            </motion.div>

            {/* Install Command - Custom Styled Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center mb-16"
            >
              <button
                onClick={handleCopy}
                className="group relative flex items-center gap-4 px-6 py-4 rounded-2xl bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 dark:border-zinc-800 shadow-2xl shadow-black/20 hover:border-zinc-700 dark:hover:border-zinc-700 transition-all duration-300"
              >
                {/* Terminal dots */}
                <div className="flex items-center gap-1.5 absolute left-4 top-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>
                
                <div className="flex items-center gap-3 pt-4">
                  <span className="text-emerald-400 font-mono text-sm font-medium">$</span>
                  <span className="font-mono text-sm sm:text-base text-zinc-100 tracking-wide">
                    npm install <span className="text-cyan-400">authorly-editor</span>
                  </span>
                </div>
                
                <div className="pt-4 pl-2 border-l border-zinc-700/50">
                  {copied ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                  )}
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </button>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
