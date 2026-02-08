'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Eye, Code2, Sparkles } from 'lucide-react';
import type { UploadConfig, UploadResult } from '@/types/upload';

// Use wrapper component that supports upload props
import Editor from '@/components/Editor';

const ContentBlocksRenderer = dynamic(
  () => import('authorly-editor').then((mod) => mod.ContentBlocksRenderer),
  { ssr: false }
);

// Note: Config object created manually to avoid importing from authorly-editor
// until v0.1.9 is published with upload support

const defaultContent = `<h2>Welcome to Authorly Editor</h2>
<p>A <strong>beautiful</strong>, block-based rich text editor that outputs clean, semantic HTML. Try editing this content!</p>
<h3>Key Features</h3>
<ul>
<li>13+ block types including paragraphs, headings, lists, code blocks, and more</li>
<li>Clean HTML output — no messy markup or proprietary formats</li>
<li>Dark mode support built-in</li>
<li>Keyboard shortcuts for power users</li>
</ul>
<blockquote>
<p>The best editor is one that gets out of your way and lets you focus on writing.</p>
</blockquote>
<p>Start typing to see the magic happen. Use <code>/</code> to insert different block types!</p>`;

export function EditorDemoSection() {
  const { theme } = useTheme();
  const [content, setContent] = useState(defaultContent);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'html'>('edit');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  // Configure image upload (optional - uses base64 fallback if not configured)
  const uploadConfig = useMemo<UploadConfig | undefined>(() => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      console.log('Cloudinary not configured - using base64 fallback for images');
      return undefined;
    }

    // Create config object manually (compatible with authorly-editor v0.1.9+)
    return {
      provider: 'cloudinary',
      cloudinary: {
        cloudName,
        uploadPreset,
        folder: 'authorly-demo',
      },
      maxSizeBytes: 5 * 1024 * 1024, // 5MB
      autoOptimize: true,
      generateResponsive: true,
    };
  }, []);

  const tabs = [
    { id: 'edit' as const, label: 'Editor', icon: Sparkles },
    { id: 'preview' as const, label: 'Preview', icon: Eye },
    { id: 'html' as const, label: 'HTML', icon: Code2 },
  ];

  return (
    <section className="py-16 md:py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See It In Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the editor right here. Edit content, see the preview, and inspect the clean HTML output.
          </p>
        </motion.div>

        {/* Editor Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          <div className="editor-demo-wrapper">
            {/* Window Header */}
            <div className="editor-demo-header">
              <div className="flex items-center gap-2">
                <div className="editor-demo-dot bg-red-500"></div>
                <div className="editor-demo-dot bg-yellow-500"></div>
                <div className="editor-demo-dot bg-green-500"></div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span className="text-xs text-muted-foreground font-medium">authorly-editor-demo.tsx</span>
              </div>
              <div className="w-14"></div>
            </div>

            {/* Tabs */}
            <div className="flex border-b bg-muted/50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? 'border-primary text-primary bg-background'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="min-h-[500px] max-h-[600px] overflow-auto">
              {activeTab === 'edit' && (
                <div className="p-4">
                  <Editor
                    initialContent={content}
                    onChange={setContent}
                    darkMode={isDark}
                    placeholder="Start writing something amazing..."
                    imageUploadConfig={uploadConfig}
                    onUploadSuccess={(result: UploadResult) => {
                      console.log('Image uploaded successfully:', result.url);
                    }}
                    onUploadError={(error: Error) => {
                      console.error('Upload error:', error.message);
                    }}
                  />
                </div>
              )}
              {activeTab === 'preview' && (
                <div className="p-6">
                  {/* DO NOT use prose classes - editor has its own complete CSS */}
                  <ContentBlocksRenderer html={content} darkMode={isDark} />
                </div>
              )}
              {activeTab === 'html' && (
                <div className="p-4">
                  <pre className="text-sm overflow-auto bg-[#1e1e2e] text-[#cdd6f4] p-4 rounded-lg border border-[#313244]">
                    <code>{formatHtml(content)}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats below editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '~30kb', label: 'Gzipped Size' },
            { value: '13+', label: 'Block Types' },
            { value: '0', label: 'Dependencies*' },
            { value: '100%', label: 'TypeScript' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className="text-center p-4 rounded-xl bg-card border"
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        <p className="text-center text-xs text-muted-foreground mt-4">
          *Only React as a peer dependency
        </p>
      </div>
    </section>
  );
}

function formatHtml(html: string): string {
  // Simple HTML formatter for display
  let formatted = html;
  let indent = 0;
  const lines: string[] = [];
  
  // Split by tags
  const tokens = formatted.split(/(<[^>]+>)/g).filter(Boolean);
  
  for (const token of tokens) {
    if (token.startsWith('</')) {
      indent = Math.max(0, indent - 1);
      lines.push('  '.repeat(indent) + token);
    } else if (token.startsWith('<') && !token.endsWith('/>') && !token.includes('</')) {
      lines.push('  '.repeat(indent) + token);
      if (!token.startsWith('<br') && !token.startsWith('<hr') && !token.startsWith('<img')) {
        indent++;
      }
    } else if (token.trim()) {
      lines.push('  '.repeat(indent) + token.trim());
    }
  }
  
  return lines.join('\n');
}
