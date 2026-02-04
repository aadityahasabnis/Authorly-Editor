'use client';

import { useState, useEffect } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check } from 'lucide-react';

interface DocContentProps {
  content: string;
}

export function DocContent({ content }: DocContentProps) {
  const [parsedContent, setParsedContent] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const elements = parseMarkdownWithHighlighting(content);
    setParsedContent(elements);
  }, [content]);

  return <>{parsedContent}</>;
}

function parseMarkdownWithHighlighting(content: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let key = 0;

  // Split content by code blocks first
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      const textBefore = content.slice(lastIndex, match.index);
      elements.push(
        <div
          key={key++}
          className="prose-section"
          dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(textBefore) }}
        />
      );
    }

    // Add syntax highlighted code block
    const language = match[1] || 'text';
    const code = match[2];
    elements.push(
      <HighlightedCode key={key++} code={code.trim()} language={language} />
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex);
    elements.push(
      <div
        key={key++}
        className="prose-section"
        dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(remainingText) }}
      />
    );
  }

  return elements;
}

function HighlightedCode({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-zinc-800 bg-[#011627] shadow-lg group">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/50 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="text-xs text-zinc-400 font-medium ml-2">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-all opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code */}
      <Highlight
        theme={themes.nightOwl}
        code={code}
        language={language}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="p-4 text-sm overflow-x-auto m-0 leading-relaxed" style={{ ...style, background: 'transparent' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                <span className="table-cell pr-4 text-zinc-600 select-none text-right w-8">{i + 1}</span>
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
    </div>
  );
}

function parseInlineMarkdown(content: string): string {
  // Generate ID from text
  const generateId = (text: string) => 
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return content
    // Headers with IDs for anchor links
    .replace(/^### (.*$)/gm, (_, title) => {
      const id = generateId(title);
      return `<h3 id="${id}" class="scroll-mt-20">${title}</h3>`;
    })
    .replace(/^## (.*$)/gm, (_, title) => {
      const id = generateId(title);
      return `<h2 id="${id}" class="scroll-mt-20">${title}</h2>`;
    })
    .replace(/^# (.*$)/gm, (_, title) => {
      const id = generateId(title);
      return `<h1 id="${id}" class="scroll-mt-20">${title}</h1>`;
    })
    // Inline code - styled better
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="doc-link">$1</a>')
    // Tables
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => c.trim().match(/^-+$/))) {
        return ''; // Skip separator row
      }
      const tag = match.includes('---') ? 'th' : 'td';
      return `<tr>${cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('')}</tr>`;
    })
    // Unordered lists
    .replace(/^- (.*)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul class="doc-list">$&</ul>')
    // Ordered lists
    .replace(/^\d+\. (.*)$/gm, '<li>$1</li>')
    // Paragraphs
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<ol') || block.startsWith('<table')) {
        return block;
      }
      return `<p class="doc-paragraph">${block}</p>`;
    })
    .join('\n')
    // Clean up empty paragraphs
    .replace(/<p class="doc-paragraph"><\/p>/g, '')
    .replace(/<p class="doc-paragraph">\s*<\/p>/g, '');
}
