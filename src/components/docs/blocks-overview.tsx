'use client';

import Link from 'next/link';
import { 
  Type, 
  Heading, 
  List, 
  Code, 
  Quote, 
  Image, 
  Table, 
  AlertCircle, 
  Minus, 
  Video,
  ChevronDown,
  Link as LinkIcon,
  ArrowRight
} from 'lucide-react';

interface BlockCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
}

function BlockCard({ title, description, href, icon, gradient }: BlockCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col p-6 rounded-2xl border-2 border-border/50 bg-card hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
      
      {/* Icon */}
      <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
        <div className="text-white">
          {icon}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
          {title}
          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}

export function BlocksOverview() {
  const blocks = [
    {
      title: 'Paragraph',
      description: 'The foundation of all content. Supports rich text formatting, links, and inline code.',
      href: '/docs/blocks/paragraph',
      icon: <Type className="w-7 h-7" />,
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Headings',
      description: 'Structure your content with 6 levels of headings (H1-H6) for better organization.',
      href: '/docs/blocks/headings',
      icon: <Heading className="w-7 h-7" />,
      gradient: 'from-green-500 to-teal-500'
    },
    {
      title: 'Lists',
      description: 'Organize information with bullet lists, numbered lists, and interactive checklists.',
      href: '/docs/blocks/lists',
      icon: <List className="w-7 h-7" />,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Code Block',
      description: 'Display code with syntax highlighting for 24+ languages and built-in copy functionality.',
      href: '/docs/blocks/code',
      icon: <Code className="w-7 h-7" />,
      gradient: 'from-slate-500 to-gray-600'
    },
    {
      title: 'Blockquote',
      description: 'Highlight quotes, testimonials, or important information with styled quote blocks.',
      href: '/docs/blocks/quote',
      icon: <Quote className="w-7 h-7" />,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Image',
      description: 'Add images with captions, alignment options, alt text, and responsive sizing.',
      href: '/docs/blocks/image',
      icon: <Image className="w-7 h-7" />,
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Table',
      description: 'Create structured data tables with headers, sorting capabilities, and clean styling.',
      href: '/docs/blocks/table',
      icon: <Table className="w-7 h-7" />,
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      title: 'Callout',
      description: 'Highlight important information with color-coded callout boxes (info, warning, error).',
      href: '/docs/blocks/callout',
      icon: <AlertCircle className="w-7 h-7" />,
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Divider',
      description: 'Separate content sections visually with horizontal rules and dividers.',
      href: '/docs/blocks/divider',
      icon: <Minus className="w-7 h-7" />,
      gradient: 'from-gray-500 to-slate-500'
    },
    {
      title: 'Video',
      description: 'Embed videos from YouTube, Vimeo, or direct URLs with responsive players.',
      href: '/docs/blocks/video',
      icon: <Video className="w-7 h-7" />,
      gradient: 'from-red-500 to-pink-500'
    },
    {
      title: 'Accordion',
      description: 'Create collapsible sections perfect for FAQs and organized, space-saving content.',
      href: '/docs/blocks/accordion',
      icon: <ChevronDown className="w-7 h-7" />,
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'Link Preview',
      description: 'Generate rich preview cards for URLs with automatic Open Graph metadata fetching.',
      href: '/docs/blocks/link-preview',
      icon: <LinkIcon className="w-7 h-7" />,
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-black tracking-tight mb-4 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
          Block Types
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Authorly provides 14 powerful block types to create rich, engaging content. Each block is designed for specific content needs.
        </p>
      </div>

      {/* Grid of blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blocks.map((block) => (
          <BlockCard key={block.href} {...block} />
        ))}
      </div>

      {/* Footer info */}
      <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 border-2 border-primary/10">
        <h3 className="text-2xl font-bold mb-3">Need a custom block?</h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Authorly is extensible and allows you to create custom block types. Check out the <Link href="/docs/guides/custom-blocks" className="text-primary hover:underline font-semibold">Custom Blocks Guide</Link> to learn how.
        </p>
      </div>
    </div>
  );
}
