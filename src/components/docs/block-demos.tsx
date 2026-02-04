'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Eye, Code2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';
import type { EditorRef } from '@/components/Editor';

// Dynamic import to avoid SSR issues
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });
const Renderer = dynamic(() => import('@/components/Renderer'), { ssr: false });

interface BlockDemoProps {
  title: string;
  description: string;
  blockType: string;
  initialContent: string;
  features?: string[];
  icon?: React.ReactNode;
  gradient?: string;
  tips?: string[];
  shortcuts?: string[];
}

export function BlockDemo({
  title,
  description,
  blockType,
  initialContent,
  features = [],
  icon,
  gradient = 'from-primary to-purple-500',
  tips = [],
  shortcuts = [],
}: BlockDemoProps) {
  const [content, setContent] = useState(initialContent);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'editor' | 'preview' | 'code'>('editor');
  const editorRef = useRef<EditorRef>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetDemo = () => {
    setContent(initialContent);
    editorRef.current?.setHTML(initialContent);
  };

  return (
    <div className="my-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {icon && (
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-2xl font-bold mb-1">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {features.map((feature, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Demo Interface */}
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-xl">
        {/* Controls */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/30">
          <div className="flex items-center gap-1">
            {[
              { mode: 'editor' as const, icon: Code2, label: 'Editor' },
              { mode: 'preview' as const, icon: Eye, label: 'Preview' },
              { mode: 'code' as const, icon: Copy, label: 'HTML' },
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetDemo}
              className="text-muted-foreground hover:text-foreground"
            >
              Reset
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Demo Content */}
        <div className="min-h-[300px]">
          {viewMode === 'editor' && (
            <div className="p-6">
              <Editor
                ref={editorRef}
                initialContent={content}
                onChange={setContent}
                placeholder={`Try editing this ${blockType} block...`}
                style={{ minHeight: '200px' }}
              />
            </div>
          )}

          {viewMode === 'preview' && (
            <div className="p-6">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <Renderer
                  html={content}
                  enableCodeCopy={true}
                  enableHeadingIds={true}
                />
              </div>
            </div>
          )}

          {viewMode === 'code' && (
            <div className="relative">
              {/* Mac-style header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-[#011627] border-b border-zinc-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-sm text-zinc-500 font-mono">output.html</span>
              </div>
              <div className="p-4 bg-[#011627] max-h-64 overflow-auto">
                <pre className="text-sm font-mono text-zinc-300 whitespace-pre-wrap break-all">
                  {content}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips & Shortcuts */}
      {(tips.length > 0 || shortcuts.length > 0) && (
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {tips.length > 0 && (
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <h4 className="flex items-center gap-2 font-semibold mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                Tips
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {shortcuts.length > 0 && (
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <h4 className="flex items-center gap-2 font-semibold mb-3">
                <kbd className="px-2 py-1 text-xs bg-background border rounded">⌘</kbd>
                Shortcuts
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {shortcuts.map((shortcut, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span>{shortcut.split(' - ')[1]}</span>
                    <kbd className="px-2 py-1 text-xs bg-background border rounded font-mono">
                      {shortcut.split(' - ')[0]}
                    </kbd>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Pre-configured demos for specific blocks
export function ParagraphDemo() {
  return (
    <BlockDemo
      title="Paragraph Block"
      description="The foundation of all content. Supports rich text formatting."
      blockType="paragraph"
      initialContent="<p>This is a <strong>paragraph</strong> with <em>rich text</em> formatting. You can make text <strong>bold</strong>, <em>italic</em>, <u>underlined</u>, or even <code>inline code</code>. Try <a href='#'>adding links</a> too!</p>"
      features={['Rich Text', 'Links', 'Inline Code', 'Multiple Lines']}
      icon={<span className="text-white font-bold">¶</span>}
      gradient="from-blue-500 to-indigo-500"
      tips={[
        'Use Enter to create a new paragraph',
        'Shift+Enter creates a line break within the same paragraph',
        'Select text and use toolbar buttons or keyboard shortcuts'
      ]}
      shortcuts={[
        'Ctrl+B - Bold text',
        'Ctrl+I - Italic text', 
        'Ctrl+U - Underline text',
        'Ctrl+K - Add link'
      ]}
    />
  );
}

export function HeadingDemo() {
  return (
    <BlockDemo
      title="Heading Block"
      description="Structure your content with 6 levels of headings."
      blockType="heading"
      initialContent="<h1>Heading 1 - Main Title</h1><h2>Heading 2 - Section</h2><h3>Heading 3 - Subsection</h3><h4>Heading 4 - Minor Section</h4><h5>Heading 5 - Small Heading</h5><h6>Heading 6 - Smallest</h6>"
      features={['6 Levels', 'Auto IDs', 'SEO Friendly', 'Navigation']}
      icon={<span className="text-white font-bold text-lg">H</span>}
      gradient="from-green-500 to-teal-500"
      tips={[
        'Use headings to create document structure',
        'H1 should be used once per page for the main title',
        'Skip heading levels (H1→H3) breaks accessibility'
      ]}
      shortcuts={[
        'Ctrl+1 - Heading 1',
        'Ctrl+2 - Heading 2',
        'Ctrl+3 - Heading 3',
        '## - Markdown H2'
      ]}
    />
  );
}

export function ListDemo() {
  return (
    <BlockDemo
      title="List Blocks"
      description="Organize information with bullet lists, numbered lists, and checklists."
      blockType="list"
      initialContent={`<ul>
  <li>Bullet list item 1</li>
  <li>Bullet list item 2</li>
</ul>
<ol>
  <li>Numbered list item 1</li>
  <li>Numbered list item 2</li>
</ol>
<ul>
  <li><input type="checkbox" checked> Completed task</li>
  <li><input type="checkbox"> Pending task</li>
</ul>`}
      features={['Bullet Lists', 'Numbered Lists', 'Checklists', 'Nesting']}
      icon={<span className="text-white">•</span>}
      gradient="from-purple-500 to-pink-500"
      tips={[
        'Press Tab to indent list items',
        'Press Shift+Tab to outdent list items',
        'Click checkboxes in checklists to toggle completion'
      ]}
      shortcuts={[
        '- - Bullet list',
        '1. - Numbered list',
        '[] - Checklist',
        'Tab - Indent item'
      ]}
    />
  );
}

export function CodeDemo() {
  return (
    <BlockDemo
      title="Code Block"
      description="Display code with syntax highlighting and copy functionality."
      blockType="code"
      initialContent={`<pre data-language="javascript"><code>function greetUser(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome to Authorly!\`;
}

// Call the function
greetUser('Developer');</code></pre>`}
      features={['Syntax Highlighting', 'Copy Button', '24 Languages', 'Line Numbers']}
      icon={<Code2 className="w-6 h-6 text-white" />}
      gradient="from-slate-500 to-gray-600"
      tips={[
        'Supports 24+ programming languages',
        'Copy button automatically appears on hover',
        'Language is detected automatically or can be set manually'
      ]}
      shortcuts={[
        '``` - Code block',
        'Ctrl+Shift+C - Inline code',
        'Tab - Proper indentation',
        'Esc - Exit code block'
      ]}
    />
  );
}

export function QuoteDemo() {
  return (
    <BlockDemo
      title="Blockquote"
      description="Highlight quotes, testimonials, or important information."
      blockType="quote"
      initialContent="<blockquote><p>The best way to predict the future is to create it.</p><cite>— Abraham Lincoln</cite></blockquote>"
      features={['Styled Quotes', 'Citations', 'Emphasis', 'Clean Design']}
      icon={<span className="text-white text-xl">"</span>}
      gradient="from-orange-500 to-red-500"
      tips={[
        'Great for testimonials and important quotes',
        'Add citation with — author name',
        'Use for pull quotes in articles'
      ]}
      shortcuts={[
        '> - Blockquote',
        'Enter - New quote line',
        'Backspace - Exit quote'
      ]}
    />
  );
}

export function ImageDemo() {
  return (
    <BlockDemo
      title="Image Block"
      description="Add images with captions, alignment, and sizing options."
      blockType="image"
      initialContent={`<figure data-align="center">
  <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop" alt="Beautiful mountain landscape" style="width: 600px;">
  <figcaption>A stunning mountain landscape captured at sunrise</figcaption>
</figure>`}
      features={['Captions', 'Alignment', 'Resizing', 'Alt Text', 'Responsive']}
      icon={<span className="text-white">🖼️</span>}
      gradient="from-cyan-500 to-blue-500"
      tips={[
        'Always add alt text for accessibility',
        'Captions provide context for your images',
        'Images are automatically responsive'
      ]}
      shortcuts={[
        '/image - Insert image',
        'Click image - Resize handles',
        'Delete - Remove image'
      ]}
    />
  );
}

export function TableDemo() {
  return (
    <BlockDemo
      title="Table Block"
      description="Create data tables with headers and styling."
      blockType="table"
      initialContent={`<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Authorly</th>
      <th>Others</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML Output</td>
      <td>✅ Pure HTML</td>
      <td>❌ JSON/AST</td>
    </tr>
    <tr>
      <td>Bundle Size</td>
      <td>✅ 30kb</td>
      <td>❌ 100kb+</td>
    </tr>
    <tr>
      <td>Learning Curve</td>
      <td>✅ Easy</td>
      <td>❌ Complex</td>
    </tr>
  </tbody>
</table>`}
      features={['Headers', 'Sorting', 'Responsive', 'Clean Design']}
      icon={<span className="text-white">⊞</span>}
      gradient="from-violet-500 to-purple-500"
      tips={[
        'Use Tab to navigate between cells',
        'Tables automatically responsive on mobile',
        'First row can be designated as header'
      ]}
      shortcuts={[
        '/table - Insert table',
        'Tab - Next cell',
        'Shift+Tab - Previous cell',
        'Enter - New row'
      ]}
    />
  );
}

export function CalloutDemo() {
  return (
    <BlockDemo
      title="Callout Block"
      description="Highlight important information with styled callout boxes."
      blockType="callout"
      initialContent={`<aside data-callout-type="info">
  <div class="cb-callout-content">
    <div class="cb-callout-body">💡 This is an info callout. Great for tips and additional information!</div>
  </div>
</aside>
<aside data-callout-type="warning">
  <div class="cb-callout-content">
    <div class="cb-callout-body">⚠️ This is a warning callout. Use for important notices.</div>
  </div>
</aside>
<aside data-callout-type="error">
  <div class="cb-callout-content">
    <div class="cb-callout-body">❌ This is an error callout. Perfect for highlighting mistakes to avoid.</div>
  </div>
</aside>`}
      features={['4 Types', 'Icons', 'Color Coded', 'Emphasis']}
      icon={<span className="text-white">ⓘ</span>}
      gradient="from-amber-500 to-orange-500"
      tips={[
        'Use info for tips and additional context',
        'Warning for important notices',
        'Error for critical information',
        'Success for positive outcomes'
      ]}
      shortcuts={[
        '/callout - Insert callout',
        '/info - Info callout',
        '/warning - Warning callout',
        '/error - Error callout'
      ]}
    />
  );
}

export function DividerDemo() {
  return (
    <BlockDemo
      title="Divider Block"
      description="Separate content sections with horizontal rules."
      blockType="divider"
      initialContent="<p>Content above the divider...</p><hr><p>Content below the divider...</p>"
      features={['Section Breaks', 'Clean Styling', 'Responsive']}
      icon={<span className="text-white">—</span>}
      gradient="from-gray-500 to-slate-500"
      tips={[
        'Use dividers to separate distinct sections',
        'Great for breaking up long content',
        'Automatically styled to match your theme'
      ]}
      shortcuts={[
        '--- - Horizontal rule',
        '/divider - Insert divider',
        '/hr - Insert divider'
      ]}
    />
  );
}