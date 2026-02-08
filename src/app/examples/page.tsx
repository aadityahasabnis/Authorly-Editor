'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Highlight, themes } from 'prism-react-renderer';
import {
  ExternalLink,
  FileText,
  Layout,
  Smartphone,
  Database,
  Palette,
  Code2,
  Copy,
  Check,
  X,
  Sparkles,
  ArrowRight,
  Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SiteHeader, SiteFooter } from '@/components/layout';

const examples = [
  {
    title: 'Cloud Image Upload',
    description: 'Upload images to Cloudinary or S3 with progress tracking and optimization.',
    icon: Upload,
    tags: ['Cloudinary', 'S3', 'New'],
    gradient: 'from-emerald-500 to-cyan-500',
    href: '/test-upload',
    code: `import { ContentBlocksEditor, createCloudinaryConfig } from 'authorly-editor';

const uploadConfig = createCloudinaryConfig({
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  folder: 'blog-images',
  maxSizeMB: 5,
});

function Editor() {
  return (
    <ContentBlocksEditor
      imageUploadConfig={uploadConfig}
      onUploadSuccess={(result) => {
        console.log('Uploaded:', result.url);
      }}
      onUploadError={(error) => {
        console.error('Error:', error);
      }}
    />
  );
}`,
  },
  {
    title: 'Blog Editor',
    description: 'A complete blog post editor with title, content, and metadata fields.',
    icon: FileText,
    tags: ['React', 'Full Example'],
    gradient: 'from-blue-500 to-cyan-500',
    href: '/playground',
    code: `import { ContentBlocksEditor } from 'authorly-editor';

function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    await saveBlogPost({ title, content });
  };

  return (
    <div>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title..."
      />
      <ContentBlocksEditor
        initialContent={content}
        onChange={setContent}
        onSave={handleSave}
      />
    </div>
  );
}`,
  },
  {
    title: 'Documentation Site',
    description: 'Documentation layout with sidebar navigation and table of contents.',
    icon: Layout,
    tags: ['Next.js', 'SSG'],
    gradient: 'from-purple-500 to-pink-500',
    href: '/playground',
    code: `import { ContentBlocksRenderer, TableOfContents } from 'authorly-editor';

function DocsPage({ content }) {
  return (
    <div className="flex">
      <aside className="w-64">
        <TableOfContents html={content} />
      </aside>
      <main>
        <ContentBlocksRenderer 
          html={content}
          enableHeadingIds
        />
      </main>
    </div>
  );
}`,
  },
  {
    title: 'Mobile-First Editor',
    description: 'Responsive editor optimized for mobile devices.',
    icon: Smartphone,
    tags: ['Mobile', 'Responsive'],
    gradient: 'from-emerald-500 to-teal-500',
    href: '/playground',
    code: `<ContentBlocksEditor
  showToolbar={true}
  toolbarPosition="bottom"
  style={{ 
    minHeight: '100vh',
    fontSize: '16px' // Prevents zoom on iOS
  }}
/>`,
  },
  {
    title: 'Database Integration',
    description: 'Save and load content from a database with auto-save.',
    icon: Database,
    tags: ['Backend', 'Auto-save'],
    gradient: 'from-orange-500 to-red-500',
    href: '/playground',
    code: `function Editor({ postId }) {
  const [content, setContent] = useState('');
  const debouncedContent = useDebounce(content, 1000);

  // Load content
  useEffect(() => {
    fetch(\`/api/posts/\${postId}\`)
      .then(res => res.json())
      .then(data => setContent(data.content));
  }, [postId]);

  // Auto-save
  useEffect(() => {
    if (debouncedContent) {
      fetch(\`/api/posts/\${postId}\`, {
        method: 'PUT',
        body: JSON.stringify({ content: debouncedContent })
      });
    }
  }, [debouncedContent]);

  return <ContentBlocksEditor ... />;
}`,
  },
  {
    title: 'Custom Theme',
    description: 'Editor with custom colors and styling using CSS variables.',
    icon: Palette,
    tags: ['Styling', 'Theming'],
    gradient: 'from-violet-500 to-purple-500',
    href: '/playground',
    code: `// styles.css
.custom-editor {
  --cb-primary: #8b5cf6;
  --cb-primary-hover: #7c3aed;
  --cb-bg: #faf5ff;
  --cb-text: #4c1d95;
}

// Component
<ContentBlocksEditor 
  className="custom-editor"
  darkMode={false}
/>`,
  },
  {
    title: 'Programmatic Control',
    description: 'Control the editor programmatically using refs.',
    icon: Code2,
    tags: ['API', 'Refs'],
    gradient: 'from-pink-500 to-rose-500',
    href: '/playground',
    code: `function ControlledEditor() {
  const editorRef = useRef(null);

  const insertImage = (url) => {
    editorRef.current?.insertBlock('image', { src: url });
  };

  const getWordCount = () => {
    const text = editorRef.current?.getText();
    return text.split(/\\s+/).length;
  };

  return (
    <>
      <ContentBlocksEditor ref={editorRef} />
      <button onClick={() => insertImage('...')}>
        Insert Image
      </button>
      <span>Words: {getWordCount()}</span>
    </>
  );
}`,
  },
];

function SyntaxHighlight({ code, language = 'tsx' }: { code: string; language?: string }) {
  return (
    <Highlight
      theme={themes.nightOwl}
      code={code.trim()}
      language={language}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre className="p-4 text-sm overflow-x-auto" style={{ ...style, background: 'transparent', margin: 0 }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="table-row">
              <span className="table-cell pr-4 text-zinc-600 text-right select-none w-8">
                {i + 1}
              </span>
              <span className="table-cell">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export default function ExamplesPage() {
  const [selectedExample, setSelectedExample] = useState<typeof examples[0] | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (selectedExample) {
      navigator.clipboard.writeText(selectedExample.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Real-world examples
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Example{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
              Implementations
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            See how Authorly can be used in different scenarios. Click any card to view the code.
          </motion.p>
        </div>

        {/* Examples Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.3 }}
            >
              <div
                className="group relative h-full cursor-pointer rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
                onClick={() => setSelectedExample(example)}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${example.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <div className="p-6">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${example.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <example.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {example.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {example.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {example.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs bg-muted/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* View code link */}
                  <div className="flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View code</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">Want to try these examples interactively?</p>
          <Link href="/playground">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-purple-600">
              <Sparkles className="w-4 h-4" />
              Open Playground
            </Button>
          </Link>
        </motion.div>
      </main>

      {/* Code Modal */}
      <AnimatePresence>
        {selectedExample && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedExample(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card border border-border/50 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-border/50 bg-muted/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedExample.gradient} flex items-center justify-center shadow-lg`}>
                      <selectedExample.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedExample.title}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedExample.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={selectedExample.href}>
                      <Button size="sm" className="gap-1.5 bg-gradient-to-r from-primary to-purple-600">
                        Try it
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedExample(null)}
                      className="text-muted-foreground"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Code Block */}
              <div className="relative">
                {/* Mac-style header */}
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-sm text-zinc-500 font-mono">example.tsx</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm text-zinc-400 hover:text-zinc-300"
                    aria-label="Copy code"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="overflow-auto max-h-[50vh] bg-[#011627]">
                  <SyntaxHighlight code={selectedExample.code} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}
