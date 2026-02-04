'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Menu, X, Moon, Sun, Github, Search, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { docsNav } from '@/config/navigation';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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

  // Close sidebar on navigation
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 lg:px-6">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mr-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/25">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{siteConfig.name}</span>
              <span className="hidden md:inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                Docs
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-2 h-9 w-64 px-3 text-sm text-muted-foreground bg-muted/50 border rounded-lg hover:bg-muted hover:border-primary/30 transition-all"
          >
            <Search className="w-4 h-4" />
            <span className="flex-1 text-left">Search docs...</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-background border rounded">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">
            <Link href="/playground" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="gap-2">
                Playground
              </Button>
            </Link>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar - Sticky */}
        <aside
          className={cn(
            'fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 xl:w-72 shrink-0 border-r bg-background transition-transform duration-300 lg:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="h-full overflow-y-auto py-6 px-3">
            {/* Mobile Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex md:hidden items-center gap-2 w-full h-9 px-3 mb-6 text-sm text-muted-foreground bg-muted/50 border rounded-lg"
            >
              <Search className="w-4 h-4" />
              <span>Search...</span>
            </button>

            {/* Navigation */}
            <nav className="space-y-6">
              {docsNav.map((section) => (
                <div key={section.title}>
                  <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {section.title}
                  </h4>
                  <ul className="space-y-0.5">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-200',
                              isActive
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            )}
                          >
                            {isActive && (
                              <div className="w-1 h-4 rounded-full bg-primary" />
                            )}
                            {item.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="mt-8 pt-6 border-t">
              <div className="px-3 py-3 rounded-lg bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10">
                <p className="text-xs font-medium text-foreground mb-1">
                  Star us on GitHub
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  If you like Authorly, give us a star!
                </p>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Github className="w-3 h-3" />
                  View on GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content area - this will contain the doc content + right TOC */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>

      {/* Search Modal */}
      {searchOpen && (
        <SearchModal onClose={() => setSearchOpen(false)} />
      )}
    </div>
  );
}

function getCurrentPageTitle(pathname: string): string {
  for (const section of docsNav) {
    for (const item of section.items) {
      if (item.href === pathname) {
        return item.title;
      }
    }
  }
  return '';
}

// Search Modal Component
function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  
  // Search index
  const searchItems = docsNav.flatMap(section => 
    section.items.map(item => ({
      ...item,
      section: section.title
    }))
  );

  const filteredItems = query
    ? searchItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.section.toLowerCase().includes(query.toLowerCase())
      )
    : searchItems;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex items-start justify-center pt-[15vh]">
        <div className="w-full max-w-lg mx-4 bg-card border rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 border-b">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="flex-1 py-4 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            <kbd className="px-2 py-1 text-xs bg-muted rounded border">ESC</kbd>
          </div>
          
          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <p className="p-4 text-center text-muted-foreground">No results found</p>
            ) : (
              filteredItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.section}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
