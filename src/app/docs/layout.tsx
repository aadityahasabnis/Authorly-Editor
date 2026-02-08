'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Menu, X, Search, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/layout';
import { siteConfig } from '@/config/site';
import { docsNav } from '@/config/navigation';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
      {/* Use unified SiteHeader with mobile sidebar toggle */}
      <SiteHeader />
      
      {/* Mobile sidebar toggle button - positioned below header */}
      <div className="sticky top-16 z-40 flex lg:hidden h-12 items-center border-b bg-background/95 backdrop-blur px-4">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <span className="text-sm font-medium">Documentation</span>
        
        <button
          onClick={() => setSearchOpen(true)}
          className="ml-auto flex items-center gap-2 h-8 px-3 text-xs text-muted-foreground bg-muted/50 border rounded-lg"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
        </button>
      </div>

      <div className="flex">
        {/* Left Sidebar - Sticky */}
        <aside
          className={cn(
            'fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-72 xl:w-80 shrink-0 border-r border-border/50 bg-background/95 backdrop-blur-sm transition-transform duration-300 lg:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="h-full overflow-y-auto py-8 px-4">
            {/* Mobile Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex md:hidden items-center gap-2 w-full h-10 px-4 mb-6 text-sm text-muted-foreground bg-muted/50 border border-border/50 rounded-xl"
            >
              <Search className="w-4 h-4" />
              <span>Search...</span>
            </button>

            {/* Navigation */}
            <nav className="space-y-8">
              {docsNav.map((section) => (
                <div key={section.title}>
                  {section.href ? (
                    <Link href={section.href}>
                      <h4 className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/70 hover:text-primary transition-colors cursor-pointer">
                        {section.title}
                      </h4>
                    </Link>
                  ) : (
                    <h4 className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                      {section.title}
                    </h4>
                  )}
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <motion.li 
                          key={item.href} 
                          className="relative"
                          initial={false}
                        >
                          <Link
                            href={item.href}
                            className={cn(
                              'flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all duration-200 relative group',
                              isActive
                                ? 'bg-primary/10 text-primary font-medium shadow-sm'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            )}
                          >
                            {/* Animated dot - always visible on active, appears on hover */}
                            <motion.div
                              initial={false}
                              animate={{
                                opacity: isActive ? 1 : 0,
                                scale: isActive ? 1 : 0.8,
                              }}
                              whileHover={{ opacity: 1, scale: 1 }}
                              transition={{ 
                                duration: 0.15,
                                ease: [0.23, 1, 0.32, 1]
                              }}
                              className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                            />
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-primary/20 text-primary">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="mt-10 pt-8 border-t border-border/50">
              <div className="px-4 py-4 rounded-xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 border border-primary/10">
                <p className="text-sm font-semibold text-foreground mb-1.5">
                  Love Authorly?
                </p>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  Star us on GitHub to show your support!
                </p>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline"
                >
                  <Github className="w-4 h-4" />
                  Star on GitHub
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
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
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
