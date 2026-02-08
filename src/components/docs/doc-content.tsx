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

  let html = content;
  
  // Parse tables first (before other processing)
  const tableRegex = /(\|.+\|\n)+/gm;
  html = html.replace(tableRegex, (match) => {
    const lines = match.trim().split('\n');
    if (lines.length < 2) return match;
    
    const hasHeaderSeparator = lines[1].split('|').filter(c => c.trim()).every(c => c.trim().match(/^:?-+:?$/));
    if (!hasHeaderSeparator) return match;
    
    const headers = lines[0].split('|').filter(c => c.trim()).map(c => c.trim());
    const rows = lines.slice(2).map(line => 
      line.split('|').filter(c => c.trim()).map(c => c.trim())
    );
    
    const tableHTML = `
      <div class="doc-table-wrapper">
        <table class="doc-table">
          <thead>
            <tr>
              ${headers.map(h => `<th>${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => `
              <tr>
                ${row.map(cell => `<td>${cell}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    return tableHTML;
  });

  // Headers with IDs for anchor links
  html = html.replace(/^#### (.*$)/gm, (_, title) => {
    const id = generateId(title);
    return `<h4 id="${id}" class="doc-h4">${title}</h4>`;
  });
  html = html.replace(/^### (.*$)/gm, (_, title) => {
    const id = generateId(title);
    return `<h3 id="${id}" class="doc-h3">${title}</h3>`;
  });
  html = html.replace(/^## (.*$)/gm, (_, title) => {
    const id = generateId(title);
    return `<h2 id="${id}" class="doc-h2">${title}</h2>`;
  });
  html = html.replace(/^# (.*$)/gm, (_, title) => {
    const id = generateId(title);
    return `<h1 id="${id}" class="doc-h1">${title}</h1>`;
  });

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="doc-blockquote">$1</blockquote>');

  // Process inline formatting (order matters)
  html = html
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="doc-strong">$1</strong>')
    // Italic
    .replace(/\*([^*\n]+)\*/g, '<em class="doc-em">$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="doc-inline-code">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="doc-link">$1</a>');

  // Lists
  html = html.replace(/^- (.*)$/gm, '<li class="doc-li">$1</li>');
  html = html.replace(/(<li class="doc-li">.*<\/li>\n?)+/g, '<ul class="doc-ul">$&</ul>');
  html = html.replace(/^\d+\. (.*)$/gm, '<li class="doc-li">$1</li>');
  html = html.replace(/^(\d+\. .*\n?)+/gm, (match) => {
    const items = match.trim().split('\n').map(line => 
      line.replace(/^\d+\. (.*)$/, '<li class="doc-li">$1</li>')
    ).join('\n');
    return `<ol class="doc-ol">${items}</ol>`;
  });

  // Paragraphs
  html = html
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';
      // Don't wrap these elements
      if (block.startsWith('<h') || 
          block.startsWith('<ul') || 
          block.startsWith('<ol') || 
          block.startsWith('<div class="doc-table') ||
          block.startsWith('<blockquote') ||
          block.startsWith('<pre')) {
        return block;
      }
      return `<p class="doc-p">${block}</p>`;
    })
    .join('\n\n');

  return html;
}
