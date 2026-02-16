'use client';

import { 
  Blocks, 
  FileCode, 
  Moon, 
  Keyboard, 
  Palette, 
  Zap,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    icon: Blocks,
    title: 'Block-Based Editing',
    description: 'Modular content blocks that snap together perfectly. Each block type is purpose-built for its content.',
    gradient: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    icon: FileCode,
    title: 'Pure Semantic HTML',
    description: 'Outputs clean, standards-compliant HTML. No proprietary formats, no vendor lock-in, just pure markup.',
    gradient: 'from-violet-500 to-purple-500',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
  },
  {
    icon: Moon,
    title: 'Dark Mode Ready',
    description: 'Beautiful dark theme built-in. Automatically adapts to system preferences or manual toggle.',
    gradient: 'from-indigo-500 to-blue-500',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-500',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Shortcuts',
    description: 'Full keyboard navigation and markdown-style shortcuts for power users who never want to leave the keyboard.',
    gradient: 'from-pink-500 to-rose-500',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-500',
  },
  {
    icon: Zap,
    title: 'Lightweight & Fast',
    description: 'Only ~30kb gzipped with React as the only peer dependency. No bloated bundles.',
    gradient: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
  },
  {
    icon: Palette,
    title: 'Fully Customizable',
    description: 'CSS variables for theming, configurable toolbars, and extensible block system.',
    gradient: 'from-emerald-500 to-teal-500',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 hero-grid opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-gradient text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Features
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Everything You Need to{' '}
            <br className="hidden sm:block" />
            <span className="gradient-text">Ship Great Content</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Authorly comes packed with features that make building 
            content-rich applications a breeze.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-card border border-border/50 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} 
                />
                
                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                
                {/* Content */}
                <h3 className="relative text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="relative text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Learn more link */}
                <div className="relative mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
                
                {/* Corner accent */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
