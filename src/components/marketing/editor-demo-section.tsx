'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { Eye, Code2, Sparkles, Play, Pause } from 'lucide-react';

// Dynamically import Editor with no SSR
const Editor = dynamic(
  () => import('@/components/Editor').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-muted rounded-lg h-64 flex items-center justify-center">
        <span className="text-muted-foreground">Loading editor...</span>
      </div>
    )
  }
);

const AuthorlyRenderer = dynamic(
  () => import('authorly-editor').then((mod) => mod.AuthorlyRenderer),
  { 
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-muted rounded-lg h-64 flex items-center justify-center">
        <span className="text-muted-foreground">Loading preview...</span>
      </div>
    )
  }
);

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

  const tabs = [
    { id: 'edit' as const, label: 'Editor', icon: Sparkles },
    { id: 'preview' as const, label: 'Preview', icon: Eye },
    { id: 'html' as const, label: 'HTML Output', icon: Code2 },
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30" />
      <div className="absolute inset-0 hero-grid opacity-50" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-gradient text-sm font-medium mb-6">
            <Play className="w-3 h-3" />
            Live Demo
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            See It <span className="gradient-text">In Action</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the editor right here. Edit content, see the preview, 
            and inspect the clean HTML output in real-time.
          </p>
        </div>

        {/* Editor Demo */}
        <div className="max-w-5xl mx-auto">
          <div className="editor-demo-wrapper">
            {/* Window Header - macOS style */}
            <div className="editor-demo-header">
              <div className="flex items-center gap-2">
                <div className="editor-demo-dot bg-red-500"></div>
                <div className="editor-demo-dot bg-yellow-500"></div>
                <div className="editor-demo-dot bg-green-500"></div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span className="text-xs text-muted-foreground font-medium tracking-wide">
                  authorly-editor-demo.tsx
                </span>
              </div>
              <div className="w-14"></div>
            </div>

            {/* Tabs */}
            <div className="flex border-b bg-muted/30">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-all border-b-2 -mb-px ${
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
            <div className="min-h-[450px] max-h-[550px] overflow-auto bg-background">
              {activeTab === 'edit' && (
                <div className="p-6">
                  <Editor
                    initialContent={content}
                    onChange={setContent}
                    darkMode={isDark}
                    placeholder="Start writing something amazing..."
                  />
                </div>
              )}
              {activeTab === 'preview' && (
                <div className="p-6">
                  <AuthorlyRenderer html={content} darkMode={isDark} />
                </div>
              )}
              {activeTab === 'html' && (
                <div className="p-4">
                  <pre className="text-sm overflow-auto bg-[#1e1e2e] text-[#cdd6f4] p-6 rounded-xl border border-[#313244] font-mono">
                    <code>{formatHtml(content)}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
          
          {/* Hint text */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Type <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">/</kbd> to see available block types
          </p>
        </div>

        {/* Stats below editor */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
          {[
            { value: '~30kb', label: 'Gzipped Size', sublabel: 'Lightning fast' },
            { value: '13+', label: 'Block Types', sublabel: 'Everything you need' },
            { value: '0', label: 'Dependencies*', sublabel: 'React only' },
            { value: '100%', label: 'TypeScript', sublabel: 'Fully typed' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-2xl bg-card/50 border backdrop-blur-sm card-hover"
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.sublabel}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">
          *Only React as a peer dependency
        </p>
      </div>
    </section>
  );
}

function formatHtml(html: string): string {
  let formatted = html;
  let indent = 0;
  const lines: string[] = [];
  
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
