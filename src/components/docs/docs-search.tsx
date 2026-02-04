'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText, X, Command } from 'lucide-react';

interface SearchResult {
  title: string;
  description: string;
  href: string;
  section: string;
}

// Search index - this would ideally be generated at build time
const searchIndex: SearchResult[] = [
  { title: 'Introduction', description: 'Learn what Authorly is and why you should use it', href: '/docs', section: 'Getting Started' },
  { title: 'Installation', description: 'Install Authorly via npm, yarn, or pnpm', href: '/docs/installation', section: 'Getting Started' },
  { title: 'Quick Start', description: 'Get up and running with Authorly in minutes', href: '/docs/quick-start', section: 'Getting Started' },
  { title: 'Editor Component', description: 'The main ContentBlocksEditor component', href: '/docs/editor', section: 'Components' },
  { title: 'Renderer Component', description: 'Render your content as HTML', href: '/docs/renderer', section: 'Components' },
  { title: 'Table of Contents', description: 'Generate navigation from your content', href: '/docs/table-of-contents', section: 'Components' },
  { title: 'Editor Props', description: 'All available props for the editor', href: '/docs/editor-props', section: 'API Reference' },
  { title: 'Editor Ref', description: 'Imperative methods and ref API', href: '/docs/editor-ref', section: 'API Reference' },
  { title: 'Styling Guide', description: 'Customize the look of your editor', href: '/docs/styling', section: 'Guides' },
  { title: 'Next.js Integration', description: 'Use Authorly with Next.js', href: '/docs/nextjs', section: 'Guides' },
  { title: 'Keyboard Shortcuts', description: 'All available keyboard shortcuts', href: '/docs/keyboard-shortcuts', section: 'Guides' },
  { title: 'Contributing', description: 'How to contribute to Authorly', href: '/docs/contributing', section: 'Resources' },
  { title: 'Changelog', description: 'Version history and updates', href: '/docs/changelog', section: 'Resources' },
  { title: 'Roadmap', description: 'Upcoming features and plans', href: '/docs/roadmap', section: 'Resources' },
];

export function DocsSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Search function
  const search = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = q.toLowerCase();
    const filtered = searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.section.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
    setSelectedIndex(0);
  }, []);

  // Handle keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle navigation within results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      router.push(results[selectedIndex].href);
      setIsOpen(false);
      setQuery('');
    }
  };

  const handleSelect = (href: string) => {
    router.push(href);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground bg-muted/50 border rounded-lg hover:bg-muted transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="flex-1 text-left">Search docs...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-background border rounded">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>

      {/* Search modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog */}
          <div className="relative flex items-start justify-center pt-[15vh]">
            <div className="w-full max-w-lg mx-4 bg-card border rounded-xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 border-b">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search documentation..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    search(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 py-4 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      setResults([]);
                    }}
                    className="p-1 hover:bg-muted rounded"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* Results */}
              {results.length > 0 ? (
                <div className="max-h-80 overflow-y-auto p-2">
                  {results.map((result, index) => (
                    <button
                      key={result.href}
                      onClick={() => handleSelect(result.href)}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                        index === selectedIndex
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <FileText className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{result.title}</div>
                        <div
                          className={`text-sm ${
                            index === selectedIndex
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {result.description}
                        </div>
                        <div
                          className={`text-xs mt-1 ${
                            index === selectedIndex
                              ? 'text-primary-foreground/50'
                              : 'text-muted-foreground/70'
                          }`}
                        >
                          {result.section}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : query ? (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No results found for &ldquo;{query}&rdquo;</p>
                </div>
              ) : (
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-3">Quick links</p>
                  <div className="space-y-1">
                    {searchIndex.slice(0, 5).map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleSelect(item.href)}
                        className="w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-muted transition-colors"
                      >
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30 text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background border rounded">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-background border rounded">↓</kbd>
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background border rounded">↵</kbd>
                    to select
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-background border rounded">esc</kbd>
                  to close
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
