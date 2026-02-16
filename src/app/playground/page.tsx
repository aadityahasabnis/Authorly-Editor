'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Copy,
  Check,
  Download,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import Editor from '@/components/Editor';
import Renderer from '@/components/Renderer';
import TableOfContents from '@/components/TableOfContents';
import type { EditorRef, UploadConfig, UploadResult } from 'authorly-editor';

// Professional sample content showcasing all features
const sampleContent = `<h1>Building Better Products</h1>
<p>A comprehensive guide to modern product development with practical examples and best practices.</p>

<h2>Introduction</h2>
<p>Great products don't happen by accident. They're the result of <strong>careful planning</strong>, <em>iterative design</em>, and continuous improvement. This guide explores the fundamental principles that separate successful products from the rest.</p>

<h2>Core Principles</h2>
<ul>
<li>Start with user needs, not solutions</li>
<li>Iterate quickly and learn from feedback</li>
<li>Focus on solving real problems</li>
<li>Build for scalability from day one</li>
</ul>

<h3>The Development Process</h3>
<ol>
<li>Research and validate your assumptions</li>
<li>Design with the end user in mind</li>
<li>Build an MVP to test core hypotheses</li>
<li>Gather data and iterate based on insights</li>
</ol>

<blockquote><p>The best way to predict the future is to invent it. — Alan Kay</p></blockquote>

<h2>Technical Implementation</h2>
<p>Here's a simple example of how to structure your component architecture:</p>

<pre><code>// Component architecture example
import { useState, useEffect } from 'react';

export function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load product data
    fetchProductDetails(product.id)
      .then(data => setIsLoading(false));
  }, [product.id]);
  
  return (
    &lt;div className="card"&gt;
      {isLoading ? 'Loading...' : product.name}
    &lt;/div&gt;
  );
}</code></pre>

<h2>Key Metrics</h2>
<p>Track these essential metrics to measure product success:</p>

<table>
<thead>
<tr>
<th>Metric</th>
<th>Target</th>
<th>Priority</th>
</tr>
</thead>
<tbody>
<tr>
<td>User Engagement</td>
<td>70%+</td>
<td>High</td>
</tr>
<tr>
<td>Retention Rate</td>
<td>60%+</td>
<td>High</td>
</tr>
<tr>
<td>Time to Value</td>
<td>&lt; 5 min</td>
<td>Medium</td>
</tr>
</tbody>
</table>

<h2>Next Steps</h2>
<p>Ready to build? Start by defining your <code>core value proposition</code> and working backwards from there. Remember: <strong>focus on impact, not features</strong>.</p>`;

type LeftPanelMode = 'editor' | 'toc';

export default function PlaygroundPage() {
  const { theme, setTheme } = useTheme();
  const [content, setContent] = useState(sampleContent);
  const [copied, setCopied] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [leftPanel, setLeftPanel] = useState<LeftPanelMode>('editor');
  const editorRef = useRef<EditorRef>(null);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Configure image upload
  const uploadConfig = useMemo<UploadConfig | undefined>(() => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) return undefined;

    return {
      provider: 'cloudinary',
      cloudinary: { cloudName, uploadPreset, folder: 'playground' },
      maxSizeBytes: 10 * 1024 * 1024,
      autoOptimize: true,
      generateResponsive: true,
    };
  }, []);

  // Calculate word count
  useEffect(() => {
    const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    setWordCount(text ? text.split(' ').length : 0);
  }, [content]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [content]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'authorly-content.html';
    a.click();
    URL.revokeObjectURL(url);
  }, [content]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const isDark = mounted && theme === 'dark';

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Slim Professional Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between h-14 px-6">
          {/* Left: Logo + Back */}
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-semibold text-sm">Authorly</span>
            </Link>
            
            <div className="h-4 w-px bg-border" />
            
            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{wordCount} words</span>
              <span>·</span>
              <span>{Math.ceil(wordCount / 200)} min read</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 h-8 px-3 text-xs font-medium rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy HTML</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 h-8 px-3 text-xs font-medium rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            <div className="h-4 w-px bg-border mx-1" />

            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowHelp(!showHelp)}
              className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Help"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Help Panel */}
        {showHelp && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border/40 bg-muted/30"
          >
            <div className="px-6 py-4">
              <div className="text-xs text-muted-foreground space-y-2">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 text-xs font-mono bg-background border rounded">
                      /
                    </kbd>
                    <span>Block menu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 text-xs font-mono bg-background border rounded">
                      Ctrl+B
                    </kbd>
                    <span>Bold</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 text-xs font-mono bg-background border rounded">
                      Ctrl+I
                    </kbd>
                    <span>Italic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 text-xs font-mono bg-background border rounded">
                      Ctrl+K
                    </kbd>
                    <span>Link</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 text-xs font-mono bg-background border rounded">
                      Drag
                    </kbd>
                    <span>Reorder blocks</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content: Side-by-Side Editor + Preview */}
      <main className="flex-1 min-h-0">
        <div className="h-full grid grid-cols-2 divide-x divide-border/40">
          {/* Left Panel: Editor or TOC */}
          <div className="flex flex-col h-full min-h-0">
            <div className="flex-shrink-0 h-12 px-6 border-b border-border/40 bg-muted/20 flex items-center justify-between">
              {/* Toggle Tabs */}
              <div className="flex items-center gap-1 bg-background/50 rounded-md p-0.5">
                <button
                  onClick={() => setLeftPanel('editor')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                    leftPanel === 'editor'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Editor
                </button>
                <button
                  onClick={() => setLeftPanel('toc')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                    leftPanel === 'toc'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  TOC
                </button>
              </div>
              
              {leftPanel === 'editor' && (
                <span className="text-xs text-muted-foreground/60">Type / for blocks</span>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 min-h-0">
              {leftPanel === 'editor' ? (
                <Editor
                  ref={editorRef}
                  initialContent={content}
                  onChange={setContent}
                  darkMode={isDark}
                  placeholder="Start writing..."
                  imageUploadConfig={uploadConfig}
                  onUploadSuccess={(result: UploadResult) => {
                    console.log('Image uploaded:', result.url);
                  }}
                  onUploadError={(error: Error) => {
                    console.error('Upload error:', error.message);
                  }}
                />
              ) : (
                <TableOfContents
                  html={content}
                  darkMode={isDark}
                  title="Document Structure"
                  maxLevel={4}
                />
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="flex flex-col h-full min-h-0">
            <div className="flex-shrink-0 h-12 px-6 border-b border-border/40 bg-muted/20 flex items-center justify-between">
              <h2 className="text-xs font-medium text-muted-foreground">Live Preview</h2>
              <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>Live</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 min-h-0">
              <div className="max-w-3xl mx-auto">
                <Renderer
                  html={content}
                  darkMode={isDark}
                  enableCodeCopy={true}
                  enableHeadingIds={true}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
