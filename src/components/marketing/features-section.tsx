'use client';

import { motion } from 'framer-motion';
import { 
  Blocks, 
  FileCode, 
  Moon, 
  Keyboard, 
  Palette, 
  Zap,
  Layers,
  Code2,
  ImageIcon,
  Table,
  Quote,
  ListOrdered,
  Video,
  Minus,
  ChevronDown,
  AlertCircle
} from 'lucide-react';

const features = [
  {
    icon: Blocks,
    title: 'Block-Based Editing',
    description: 'Modular content blocks that snap together perfectly. Each block type is purpose-built for its content.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FileCode,
    title: 'Pure Semantic HTML',
    description: 'Outputs clean, standards-compliant HTML. No proprietary formats, no vendor lock-in, just pure markup.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Moon,
    title: 'Dark Mode Ready',
    description: 'Beautiful dark theme built-in. Automatically adapts to system preferences or manual toggle.',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Shortcuts',
    description: 'Full keyboard navigation and markdown-style shortcuts for power users who never want to leave the keyboard.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Zap,
    title: 'Lightweight & Fast',
    description: 'Only ~30kb gzipped with React as the only peer dependency. No bloated bundles.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Palette,
    title: 'Fully Customizable',
    description: 'CSS variables for theming, configurable toolbars, and extensible block system.',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

const blockTypes = [
  { icon: FileCode, name: 'Paragraph' },
  { icon: Layers, name: 'Headings' },
  { icon: ListOrdered, name: 'Lists' },
  { icon: Code2, name: 'Code' },
  { icon: Quote, name: 'Quote' },
  { icon: ImageIcon, name: 'Image' },
  { icon: Video, name: 'Video' },
  { icon: Table, name: 'Table' },
  { icon: Minus, name: 'Divider' },
  { icon: AlertCircle, name: 'Callout' },
  { icon: ChevronDown, name: 'Accordion' },
  { icon: Blocks, name: 'More...' },
];

export function FeaturesSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full badge-gradient text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to{' '}
            <span className="gradient-text">Ship Great Content</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Authorly comes packed with features that make building content-rich applications a breeze.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="feature-card h-full group">
                <div className="feature-icon">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Block Types Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            13+ Block Types Included
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From simple paragraphs to complex tables, we&apos;ve got everything covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3">
          {blockTypes.map((block, index) => (
            <motion.div
              key={block.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="p-3 rounded-xl bg-card border text-center card-hover cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <block.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium">{block.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
