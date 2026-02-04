'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { blockTypes } from '@/config/features';

export function BlocksSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            13+ Block Types
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            From simple paragraphs to complex tables and code blocks,
            Authorly has everything you need.
          </motion.p>
        </div>

        {/* Blocks Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {blockTypes.map((block, index) => (
            <motion.div
              key={block.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-medium">{block.name}</h3>
                {block.shortcut && (
                  <Badge variant="secondary" className="text-xs font-mono">
                    {block.shortcut}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{block.description}</p>
              <code className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                {block.htmlOutput}
              </code>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
