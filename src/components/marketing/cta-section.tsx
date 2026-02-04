'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Github, Star, Sparkles, Terminal, Copy, Check } from 'lucide-react';
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
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main CTA Card */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-3xl opacity-50" />
            <div className="absolute inset-[1px] bg-background/95 dark:bg-zinc-950/95 rounded-3xl" />
            
            {/* Content */}
            <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-sm font-medium mb-8"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-foreground">Open Source & Free Forever</span>
              </motion.div>
              
              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              >
                Start building with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                  Authorly
                </span>{' '}
                today
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
              >
                Join hundreds of developers building beautiful content editors. 
                Get started in under 5 minutes with our simple API.
              </motion.p>

              {/* Install Command */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mb-10"
              >
                <div 
                  onClick={copyCommand}
                  className="group inline-flex items-center gap-3 px-6 py-4 bg-zinc-900 dark:bg-zinc-950 rounded-xl border border-zinc-800 cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
                >
                  <Terminal className="w-5 h-5 text-zinc-500" />
                  <code className="text-sm md:text-base font-mono">
                    <span className="text-emerald-400">npm</span>{' '}
                    <span className="text-zinc-400">install</span>{' '}
                    <span className="text-cyan-400">authorly-editor</span>
                  </code>
                  <div className="ml-2 p-1.5 rounded-md bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-zinc-400 group-hover:text-zinc-300" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {copied ? 'Copied to clipboard!' : 'Click to copy'}
                </p>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              >
                <Link href="/docs">
                  <Button size="xl" className="gap-2 group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/25">
                    Get Started
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                  <Button size="xl" variant="outline" className="gap-2 border-2">
                    <Github className="w-5 h-5" />
                    View on GitHub
                  </Button>
                </Link>
              </motion.div>

              {/* GitHub Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center gap-8"
              >
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Star className="w-4 h-4 group-hover:text-yellow-500 group-hover:fill-yellow-500 transition-colors" />
                  <span>Star on GitHub</span>
                </Link>
                <div className="w-px h-4 bg-border" />
                <Link
                  href="/docs/contributing"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>Contribute</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <div className="w-px h-4 bg-border" />
                <Link
                  href={siteConfig.links.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>npm package</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
