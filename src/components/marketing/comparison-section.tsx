'use client';

import { motion } from 'framer-motion';
import { Check, X, Minus, Zap, Trophy, Sparkles } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  category: 'output' | 'size' | 'dx' | 'features';
  authorly: string | boolean;
  quill: string | boolean;
  tiptap: string | boolean;
  draftjs: string | boolean;
}

const comparisonData: ComparisonRow[] = [
  // Output & Storage
  { feature: 'Output Format', category: 'output', authorly: 'Pure HTML', quill: 'Delta JSON', tiptap: 'JSON AST', draftjs: 'ContentState' },
  { feature: 'Database Storage', category: 'output', authorly: 'Simple string', quill: 'JSON blob', tiptap: 'JSON blob', draftjs: 'Serialized object' },
  { feature: 'SEO Friendly', category: 'output', authorly: true, quill: false, tiptap: false, draftjs: false },
  { feature: 'SSR Compatible', category: 'output', authorly: true, quill: 'Partial', tiptap: true, draftjs: false },
  
  // Bundle Size
  { feature: 'Bundle Size (gzip)', category: 'size', authorly: '~30kb', quill: '~43kb', tiptap: '~100kb+', draftjs: '~200kb+' },
  { feature: 'Dependencies', category: 'size', authorly: 'React only', quill: 'Parchment', tiptap: 'ProseMirror', draftjs: 'Immutable.js' },
  { feature: 'Tree Shakeable', category: 'size', authorly: true, quill: false, tiptap: true, draftjs: false },
  
  // Developer Experience
  { feature: 'Setup Time', category: 'dx', authorly: '< 5 min', quill: '10-30 min', tiptap: '30-60 min', draftjs: '1-2 hours' },
  { feature: 'Learning Curve', category: 'dx', authorly: 'Easy', quill: 'Moderate', tiptap: 'Steep', draftjs: 'Steep' },
  { feature: 'TypeScript Support', category: 'dx', authorly: true, quill: 'Community', tiptap: true, draftjs: true },
  { feature: 'Documentation', category: 'dx', authorly: 'Excellent', quill: 'Good', tiptap: 'Good', draftjs: 'Outdated' },
  
  // Features
  { feature: 'Block-based Editing', category: 'features', authorly: true, quill: false, tiptap: true, draftjs: true },
  { feature: 'Slash Commands', category: 'features', authorly: true, quill: false, tiptap: 'Plugin', draftjs: false },
  { feature: 'Dark Mode Built-in', category: 'features', authorly: true, quill: false, tiptap: false, draftjs: false },
  { feature: 'Tables Support', category: 'features', authorly: true, quill: 'Community', tiptap: 'Paid', draftjs: false },
  { feature: 'Image/Video Embeds', category: 'features', authorly: true, quill: 'Plugin', tiptap: 'Plugin', draftjs: false },
];

const categoryLabels = {
  output: 'Output & Storage',
  size: 'Bundle Size',
  dx: 'Developer Experience',
  features: 'Features',
};

function ValueCell({ value, isAuthorly = false }: { value: string | boolean; isAuthorly?: boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <div className={`flex items-center justify-center ${isAuthorly ? 'text-emerald-500' : 'text-emerald-500/70'}`}>
        <Check className="w-5 h-5" strokeWidth={3} />
      </div>
    ) : (
      <div className="flex items-center justify-center text-red-500/70">
        <X className="w-5 h-5" strokeWidth={2} />
      </div>
    );
  }
  
  // Handle partial/varies values
  if (value === 'Partial' || value === 'Community' || value === 'Plugin' || value === 'Some') {
    return (
      <div className="flex items-center justify-center text-yellow-500/80">
        <Minus className="w-4 h-4 mr-1" />
        <span className="text-xs font-medium">{value}</span>
      </div>
    );
  }
  
  if (value === 'Paid') {
    return (
      <span className="text-xs font-medium text-yellow-500/80 bg-yellow-500/10 px-2 py-0.5 rounded">
        {value}
      </span>
    );
  }
  
  return (
    <span className={`text-xs sm:text-sm font-medium ${isAuthorly ? 'text-emerald-500 dark:text-emerald-400' : 'text-muted-foreground'}`}>
      {value}
    </span>
  );
}

export function ComparisonSection() {
  const categories = ['output', 'size', 'dx', 'features'] as const;
  
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Trophy className="w-4 h-4" />
            See the difference
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Why developers choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
              Authorly
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            A detailed comparison with popular rich text editors. 
            See how Authorly simplifies your content editing workflow.
          </motion.p>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-2 sm:gap-4 p-3 sm:p-4 bg-muted/50 border-b border-border/50">
              <div className="text-sm font-semibold text-muted-foreground">Feature</div>
              <div className="text-center">
                <div className="inline-flex flex-col items-center">
                  <div className="flex items-center gap-1 text-sm font-bold text-primary">
                    <Sparkles className="w-4 h-4" />
                    <span>Authorly</span>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-medium">Recommended</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-sm font-semibold text-muted-foreground">Quill</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-semibold text-muted-foreground">TipTap</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-semibold text-muted-foreground">Draft.js</span>
              </div>
            </div>

            {/* Table Body */}
            {categories.map((category) => (
              <div key={category}>
                {/* Category Header */}
                <div className="px-4 py-2 bg-muted/30 border-b border-border/30">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {categoryLabels[category]}
                  </span>
                </div>
                
                {/* Category Rows */}
                {comparisonData
                  .filter((row) => row.category === category)
                  .map((row, idx, arr) => (
                    <div
                      key={row.feature}
                      className={`grid grid-cols-5 gap-2 sm:gap-4 p-3 sm:p-4 items-center hover:bg-muted/20 transition-colors ${
                        idx !== arr.length - 1 ? 'border-b border-border/20' : ''
                      }`}
                    >
                      <div className="text-xs sm:text-sm text-foreground font-medium">{row.feature}</div>
                      <div className="text-center bg-primary/5 rounded-lg py-2 -my-1">
                        <ValueCell value={row.authorly} isAuthorly />
                      </div>
                      <div className="text-center">
                        <ValueCell value={row.quill} />
                      </div>
                      <div className="text-center">
                        <ValueCell value={row.tiptap} />
                      </div>
                      <div className="text-center">
                        <ValueCell value={row.draftjs} />
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-emerald-500" />
              <span className="text-2xl font-bold text-emerald-500">3x</span>
            </div>
            <p className="text-sm text-muted-foreground">Smaller bundle than Draft.js</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Check className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold text-primary">100%</span>
            </div>
            <p className="text-sm text-muted-foreground">SEO-friendly HTML output</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold text-purple-500">#1</span>
            </div>
            <p className="text-sm text-muted-foreground">Easiest setup and learning curve</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
