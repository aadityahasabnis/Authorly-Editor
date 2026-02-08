import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Pencil, MessageSquare, ChevronRight, BookOpen, Clock, Github, ExternalLink, Star, Heart } from 'lucide-react';
import { getDocBySlug, getAllDocSlugs } from '@/lib/docs';
import { docsNav } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { DocContent } from '@/components/docs/doc-content';
import { BlockDemoWrapper } from '@/components/docs/block-demo-wrapper';
import { BlocksOverview } from '@/components/docs/blocks-overview';
import { ComponentsOverview } from '@/components/docs/components-overview';

// Generate static params for all doc pages
export function generateStaticParams() {
  const slugs = getAllDocSlugs();
  // Add overview pages
  const overviewPages = [
    { slug: ['blocks'] },
    { slug: ['components'] }
  ];
  
  return [
    ...slugs.map((slug) => ({
      slug: slug === 'index' ? [] : slug.split('/'),
    })),
    ...overviewPages
  ];
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const slugPath = slug?.join('/') || 'index';
  const doc = getDocBySlug(slugPath);
  
  if (!doc) {
    return { title: 'Not Found' };
  }

  return {
    title: `${doc.title} | Authorly Docs`,
    description: doc.description,
  };
}

// Extract headings from content for TOC
function extractHeadings(content: string): { id: string; title: string; level: number }[] {
  const headings: { id: string; title: string; level: number }[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2];
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    headings.push({ id, title, level });
  }
  
  return headings;
}

// Estimate reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Get section info with href
function getSectionInfo(slugPath: string): { title: string; href: string } | null {
  // Check if it's blocks or components section
  if (slugPath.startsWith('blocks/')) {
    return { title: 'Blocks', href: '/docs/blocks' };
  }
  if (slugPath.startsWith('components/')) {
    return { title: 'Components', href: '/docs/components' };
  }
  if (slugPath.startsWith('guides/')) {
    return { title: 'Guides', href: '#' };
  }
  
  for (const section of docsNav) {
    const found = section.items.find(item => {
      const itemSlug = item.href === '/docs' ? 'index' : item.href.replace('/docs/', '');
      return itemSlug === slugPath;
    });
    if (found && section.title !== 'Getting Started') {
      return { title: section.title, href: '#' };
    }
  }
  return null;
}

export default async function DocPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const slugPath = slug?.join('/') || 'index';
  
  // Check if this is an overview page
  const isBlocksOverview = slugPath === 'blocks';
  const isComponentsOverview = slugPath === 'components';
  
  // If it's an overview page, render the special component
  if (isBlocksOverview) {
    return (
      <div className="flex w-full">
        <main className="flex-1 min-w-0">
          <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-12 lg:py-16">
            <BlocksOverview />
          </div>
        </main>
      </div>
    );
  }
  
  if (isComponentsOverview) {
    return (
      <div className="flex w-full">
        <main className="flex-1 min-w-0">
          <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-12 lg:py-16">
            <ComponentsOverview />
          </div>
        </main>
      </div>
    );
  }
  
  // Regular doc page
  const doc = getDocBySlug(slugPath);

  if (!doc) {
    notFound();
  }

  // Get prev/next links
  const { prev, next } = getPrevNextLinks(slugPath);
  
  // Extract headings for TOC
  const headings = extractHeadings(doc.content);
  
  // Get reading time
  const readingTime = getReadingTime(doc.content);
  
  // Get current section
  const currentSection = getSectionInfo(slugPath);
  
  // GitHub edit URL
  const githubEditUrl = `${siteConfig.links.github}/edit/main/docs/${slugPath === 'index' ? 'index' : slugPath}.md`;

  return (
    <div className="flex w-full">
      {/* Main Content - Maximum Professional Width */}
      <main className="flex-1 min-w-0">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-12 lg:py-16">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-12 xl:gap-20">
            {/* Article Content - Much Wider */}
            <article className="max-w-[900px] w-full">
              {/* Breadcrumb Navigation */}
              <nav className="flex items-center gap-2 text-sm mb-10" aria-label="Breadcrumb">
                <Link 
                  href="/docs" 
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Documentation
                </Link>
                {currentSection && (
                  <>
                    <ChevronRight className="w-4 h-4 text-border" />
                    {currentSection.href !== '#' ? (
                      <Link
                        href={currentSection.href}
                        className="text-muted-foreground hover:text-primary transition-colors font-medium"
                      >
                        {currentSection.title}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">{currentSection.title}</span>
                    )}
                  </>
                )}
                <ChevronRight className="w-4 h-4 text-border" />
                <span className="text-foreground font-semibold">{doc.title}</span>
              </nav>

              {/* Page Header - Hero Style */}
              <header className="mb-16">
                {/* Category Badge */}
                {currentSection && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
                    <BookOpen className="w-4 h-4" />
                    {currentSection.title}
                  </div>
                )}
                
                {/* Title - Extra Large and Bold */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent leading-[1.1]">
                  {doc.title}
                </h1>
                
                {/* Description - Large and Prominent */}
                <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-light max-w-4xl">
                  {doc.description}
                </p>
                
                {/* Gradient Divider */}
                <div className="h-px bg-gradient-to-r from-primary/50 via-purple-500/50 to-transparent mt-10 mb-8" />
                
                {/* Meta Information Bar */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-semibold">{readingTime} min read</span>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <a
                    href={githubEditUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-semibold group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Pencil className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    </div>
                    <span>Edit page</span>
                  </a>
                  <div className="h-8 w-px bg-border" />
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-semibold"
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
                      <Star className="w-4 h-4" />
                    </div>
                    <span>Star us</span>
                  </a>
                </div>
              </header>

              {/* Main Content - Professional Typography */}
              <div className="docs-content-professional">
                <DocContent content={doc.content} />
              </div>

              {/* Interactive Block Demo */}
              <BlockDemoWrapper slug={slugPath} />

              {/* Feedback Section - Premium Design */}
              <div className="mt-24">
                <div className="relative overflow-hidden rounded-3xl border-2 border-border/50 bg-gradient-to-br from-card via-muted/30 to-card p-10">
                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-full -z-10 opacity-60" />
                  
                  <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                    <div>
                      <h3 className="text-3xl font-bold text-foreground mb-3 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                          <Heart className="w-6 h-6 text-primary" />
                        </div>
                        Was this helpful?
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        Your feedback helps us create better documentation
                      </p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <a
                        href={githubEditUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl border-2 border-border bg-background hover:bg-muted hover:border-primary/50 transition-all shadow-sm hover:shadow-md"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit page
                      </a>
                      <a
                        href={`${siteConfig.links.github}/issues/new?title=Docs: ${doc.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Report issue
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination - Ultra Premium Cards */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {prev ? (
                  <Link
                    href={prev.href}
                    className="group relative flex flex-col p-8 rounded-3xl border-2 border-border/50 bg-gradient-to-br from-card to-muted/20 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                      <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
                      Previous
                    </span>
                    <span className="relative text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link
                    href={next.href}
                    className="group relative flex flex-col items-end text-right p-8 rounded-3xl border-2 border-border/50 bg-gradient-to-br from-card to-muted/20 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-purple-500/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                      Next
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </span>
                    <span className="relative text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                      {next.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </article>

            {/* Right Sidebar - Minimal TOC */}
            <aside className="hidden xl:block">
              <div className="sticky top-24 space-y-8">
                {/* On This Page */}
                {headings.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground/60 mb-4 px-2">
                      On this page
                    </h4>
                    <nav className="space-y-0.5 border-l border-border/40">
                      {headings.map((heading) => (
                        <a
                          key={heading.id}
                          href={`#${heading.id}`}
                          className={`
                            block text-sm py-2 px-3 -ml-px border-l-2 transition-all duration-150
                            ${heading.level === 3 
                              ? 'pl-6 text-muted-foreground/70 border-transparent hover:text-foreground hover:border-muted-foreground/30' 
                              : 'text-muted-foreground/80 border-transparent hover:text-foreground hover:border-primary/60'
                            }
                          `}
                        >
                          {heading.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Divider */}
                <div className="h-px bg-border/30" />

                {/* Resources */}
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground/60 mb-4 px-2">
                    Resources
                  </h4>
                  <div className="space-y-2">
                    <a
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-all py-3 px-4 rounded-xl hover:bg-muted/50 group font-medium"
                    >
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Github className="w-4 h-4" />
                      </div>
                      <span className="flex-1">GitHub</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a
                      href={siteConfig.links.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-all py-3 px-4 rounded-xl hover:bg-muted/50 group font-medium"
                    >
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/>
                        </svg>
                      </div>
                      <span className="flex-1">npm</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <Link
                      href="/playground"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-all py-3 px-4 rounded-xl hover:bg-muted/50 font-medium"
                    >
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="flex-1">Playground</span>
                    </Link>
                  </div>
                </div>

                {/* Contribute Card - Premium */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border-2 border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                      <Github className="w-5 h-5 text-white" />
                    </div>
                    <h5 className="font-black text-base text-foreground">Contribute</h5>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Help us improve Authorly. All contributions are welcome!
                  </p>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    View on GitHub
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

// Get prev/next page links
function getPrevNextLinks(currentSlug: string) {
  const allItems = docsNav.flatMap((section) => section.items);
  const currentHref = currentSlug === 'index' ? '/docs' : `/docs/${currentSlug}`;
  const currentIndex = allItems.findIndex((item) => item.href === currentHref);

  return {
    prev: currentIndex > 0 ? allItems[currentIndex - 1] : null,
    next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null,
  };
}
