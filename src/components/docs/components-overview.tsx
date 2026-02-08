'use client';

import Link from 'next/link';
import { 
  Edit3, 
  Eye, 
  FileText,
  Layers,
  Settings,
  Palette,
  Zap,
  ArrowRight
} from 'lucide-react';

interface ComponentCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
}

function ComponentCard({ title, description, href, icon, gradient }: ComponentCardProps) {
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

export function ComponentsOverview() {
  const components = [
    {
      title: 'Editor',
      description: 'The main ContentBlocksEditor component for creating and editing rich content.',
      href: '/docs/components/editor',
      icon: <Edit3 className="w-7 h-7" />,
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Renderer',
      description: 'ContentBlocksRenderer component for displaying saved HTML content beautifully.',
      href: '/docs/components/renderer',
      icon: <Eye className="w-7 h-7" />,
      gradient: 'from-green-500 to-teal-500'
    },
    {
      title: 'Table of Contents',
      description: 'Auto-generated navigation from headings for easy content browsing.',
      href: '/docs/components/table-of-contents',
      icon: <FileText className="w-7 h-7" />,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Toolbar',
      description: 'Customizable formatting toolbar with common text editing actions.',
      href: '/docs/components/toolbar',
      icon: <Layers className="w-7 h-7" />,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Block Menu',
      description: 'Slash command menu for quickly inserting blocks while typing.',
      href: '/docs/components/block-menu',
      icon: <Zap className="w-7 h-7" />,
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Theming',
      description: 'Customize colors, typography, and styles to match your brand.',
      href: '/docs/components/theming',
      icon: <Palette className="w-7 h-7" />,
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-black tracking-tight mb-4 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
          Components
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Powerful React components to build amazing content creation and display experiences.
        </p>
      </div>

      {/* Grid of components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => (
          <ComponentCard key={component.href} {...component} />
        ))}
      </div>

      {/* Footer info */}
      <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 border-2 border-primary/10">
        <h3 className="text-2xl font-bold mb-3">API Reference</h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Looking for detailed prop types and API documentation? Check out the individual component pages for comprehensive references.
        </p>
      </div>
    </div>
  );
}
