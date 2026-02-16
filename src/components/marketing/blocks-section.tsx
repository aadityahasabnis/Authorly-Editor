'use client';

import { 
  Type, 
  Heading1, 
  List, 
  ListOrdered, 
  CheckSquare, 
  Quote, 
  Code2, 
  Image, 
  Video, 
  Table, 
  Minus, 
  AlertCircle, 
  ChevronDown,
  Layers,
  Command
} from 'lucide-react';

const blockTypes = [
  { 
    icon: Type, 
    name: 'Paragraph', 
    shortcut: 'Enter',
    description: 'Basic text content',
    html: '<p>',
    color: 'text-slate-500',
    bg: 'bg-slate-500/10'
  },
  { 
    icon: Heading1, 
    name: 'Headings', 
    shortcut: 'Ctrl+1-6',
    description: 'Section titles',
    html: '<h1>-<h6>',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  { 
    icon: List, 
    name: 'Bullet List', 
    shortcut: '/bullet',
    description: 'Unordered items',
    html: '<ul><li>',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  { 
    icon: ListOrdered, 
    name: 'Numbered List', 
    shortcut: '/number',
    description: 'Ordered items',
    html: '<ol><li>',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  { 
    icon: CheckSquare, 
    name: 'Checklist', 
    shortcut: '/check',
    description: 'Todo items',
    html: '<input>',
    color: 'text-green-500',
    bg: 'bg-green-500/10'
  },
  { 
    icon: Quote, 
    name: 'Quote', 
    shortcut: '/quote',
    description: 'Blockquotes',
    html: '<blockquote>',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  { 
    icon: Code2, 
    name: 'Code Block', 
    shortcut: '/code',
    description: 'Syntax highlighted',
    html: '<pre><code>',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10'
  },
  { 
    icon: Image, 
    name: 'Image', 
    shortcut: '/image',
    description: 'With captions',
    html: '<figure><img>',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10'
  },
  { 
    icon: Video, 
    name: 'Video', 
    shortcut: '/video',
    description: 'Embed videos',
    html: '<iframe>',
    color: 'text-red-500',
    bg: 'bg-red-500/10'
  },
  { 
    icon: Table, 
    name: 'Table', 
    shortcut: '/table',
    description: 'Data tables',
    html: '<table>',
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10'
  },
  { 
    icon: Minus, 
    name: 'Divider', 
    shortcut: '/divider',
    description: 'Section break',
    html: '<hr>',
    color: 'text-gray-500',
    bg: 'bg-gray-500/10'
  },
  { 
    icon: AlertCircle, 
    name: 'Callout', 
    shortcut: '/callout',
    description: 'Info & warnings',
    html: '<aside>',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  },
  { 
    icon: ChevronDown, 
    name: 'Accordion', 
    shortcut: '/accordion',
    description: 'Collapsible',
    html: '<details>',
    color: 'text-violet-500',
    bg: 'bg-violet-500/10'
  },
];

export function BlocksSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />
      <div className="absolute inset-0 hero-grid opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-gradient text-sm font-medium mb-6">
            <Layers className="w-4 h-4" />
            Block Types
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="gradient-text">13+ Block Types</span> Included
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From simple paragraphs to complex tables and code blocks, 
            everything you need for rich content.
          </p>
        </div>

        {/* Blocks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {blockTypes.map((block, index) => (
            <div
              key={block.name}
              className="group relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="h-full p-5 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                {/* Icon & Name Row */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${block.bg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                    <block.icon className={`w-5 h-5 ${block.color}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
                      {block.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {block.description}
                    </p>
                  </div>
                </div>
                
                {/* Bottom Row - Shortcut & HTML */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/50">
                  <div className="flex items-center gap-1.5">
                    <Command className="w-3 h-3 text-muted-foreground" />
                    <code className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {block.shortcut}
                    </code>
                  </div>
                  <code className={`text-[10px] font-mono ${block.color} ${block.bg} px-1.5 py-0.5 rounded`}>
                    {block.html}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Type <kbd className="px-2 py-1 bg-muted border rounded text-xs font-mono mx-1">/</kbd> 
            in the editor to quickly insert any block type
          </p>
        </div>
      </div>
    </section>
  );
}
