'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  Trash2,
  Moon,
  Sun,
  Code2,
  Eye,
  Split,
  Download,
  ChevronLeft,
  Sparkles,
  FileCode,
  Type,
  Keyboard,
  Info,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Editor from '@/components/Editor';
import Renderer from '@/components/Renderer';
import TableOfContents from '@/components/TableOfContents';
import type { EditorRef } from '@/components/Editor';

const sampleContent = `
<h1>Welcome to the Authorly Playground</h1>
<p>This is an interactive demo of the <strong>Authorly Editor</strong>. Try it out!</p>

<h2>Getting Started</h2>
<p>You can start editing right away. Here are some things to try:</p>

<ul>
  <li>Type <code>/</code> to open the block menu</li>
  <li>Use <strong>Ctrl+B</strong> for bold, <strong>Ctrl+I</strong> for italic</li>
  <li>Press <strong>Enter</strong> to create new blocks</li>
  <li>Drag blocks to reorder them</li>
</ul>

<h2>Code Block Example</h2>
<pre><code>function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));</code></pre>

<h2>Blockquote</h2>
<blockquote><p>The best way to predict the future is to create it. — Abraham Lincoln</p></blockquote>

<h2>Try More Features</h2>
<p>Explore tables, images, callouts, and more using the <code>/</code> menu!</p>
`;

type ViewMode = 'editor' | 'preview' | 'split';

const shortcuts = [
  { keys: ['/', 'Slash'], desc: 'Block menu' },
  { keys: ['Ctrl', 'B'], desc: 'Bold' },
  { keys: ['Ctrl', 'I'], desc: 'Italic' },
  { keys: ['Ctrl', 'U'], desc: 'Underline' },
  { keys: ['Ctrl', 'K'], desc: 'Link' },
  { keys: ['Ctrl', 'Z'], desc: 'Undo' },
];

export default function PlaygroundPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [content, setContent] = useState(sampleContent);
  const [copied, setCopied] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const editorRef = useRef<EditorRef>(null);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    setWordCount(text ? text.split(' ').length : 0);
  }, [content]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [content]);

  const handleClear = useCallback(() => {
    if (confirm('Clear all content?')) {
      editorRef.current?.setHTML('<p></p>');
      setContent('<p></p>');
    }
  }, []);

  const handleDownload = useCallback(() => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'authorly-content.html';
    a.click();
    URL.revokeObjectURL(url);
  }, [content]);

  return (
    <div className="min-h-screen transition-theme bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back link */}
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to home</span>
            </Link>

            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-lg font-bold">Playground</h1>
              </div>
              <Badge className="bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary border-primary/30">
                Interactive Demo
              </Badge>
            </div>

            {/* View toggles */}
            <div className="flex items-center gap-1 bg-muted/50 rounded-xl p-1 border border-border/50">
              {[
                { mode: 'editor' as const, icon: Code2, label: 'Edit' },
                { mode: 'split' as const, icon: Split, label: 'Split' },
                { mode: 'preview' as const, icon: Eye, label: 'Preview' },
              ].map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === mode
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="border-b border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Left: Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Type className="w-4 h-4" />
                <span>{wordCount} words</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileCode className="w-4 h-4" />
                <span>{content.length} chars</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowShortcuts(!showShortcuts)}
                className="gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <Keyboard className="w-4 h-4" />
                <span className="hidden sm:inline">Shortcuts</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="gap-1.5"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy HTML'}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="gap-1.5 text-red-500 hover:text-red-500 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
              <div className="w-px h-5 bg-border mx-1" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="text-muted-foreground hover:text-foreground"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard shortcuts panel */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-border/40 bg-muted/30 overflow-hidden"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Keyboard Shortcuts</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setShowShortcuts(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                {shortcuts.map((shortcut, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, j) => (
                        <span key={j}>
                          {j > 0 && <span className="text-muted-foreground mx-0.5">+</span>}
                          <kbd className="px-2 py-1 text-xs font-mono bg-background border rounded-md shadow-sm">
                            {key}
                          </kbd>
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{shortcut.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`grid gap-6 ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}
        >
          {/* Editor Panel */}
          {(viewMode === 'editor' || viewMode === 'split') && (
            <div className="bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden">
              {/* Mac-style header */}
              <div className="border-b border-border/50 px-4 py-3 flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Editor</span>
                </div>
                <Badge variant="outline" className="text-xs bg-background">
                  Type / for commands
                </Badge>
              </div>
              <div className="p-4 md:p-6">
                <Editor
                  ref={editorRef}
                  initialContent={content}
                  onChange={setContent}
                  darkMode={darkMode}
                  placeholder="Start writing..."
                  style={{ minHeight: '500px' }}
                />
              </div>
            </div>
          )}

          {/* Preview Panel */}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <div className="bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden">
              {/* Mac-style header */}
              <div className="border-b border-border/50 px-4 py-3 flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Preview</span>
                </div>
                <Badge variant="outline" className="text-xs bg-background">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Live
                  </span>
                </Badge>
              </div>
              <div className="p-4 md:p-6">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <Renderer
                    html={content}
                    darkMode={darkMode}
                    enableCodeCopy={true}
                    enableHeadingIds={true}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Table of Contents (Preview mode only) */}
        {viewMode === 'preview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-6 bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden"
          >
            <div className="border-b border-border/50 px-4 py-3 bg-muted/30">
              <span className="text-sm font-medium">Table of Contents</span>
            </div>
            <div className="p-4">
              <TableOfContents
                html={content}
                darkMode={darkMode}
                title=""
                maxLevel={3}
              />
            </div>
          </motion.div>
        )}

        {/* HTML Output */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-6 bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden"
        >
          {/* Mac-style header */}
          <div className="border-b border-border/50 px-4 py-3 flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">HTML Output</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 text-xs gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="p-4 bg-zinc-950 max-h-64 overflow-auto">
            <pre className="text-xs font-mono text-zinc-400 whitespace-pre-wrap break-all">
              {content}
            </pre>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
