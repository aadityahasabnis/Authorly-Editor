import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Pencil, MessageSquare, ChevronRight } from 'lucide-react';
import { getDocBySlug, getAllDocSlugs } from '@/lib/docs';
import { docsNav } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { DocContent } from '@/components/docs/doc-content';

// Generate static params for all doc pages
export function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({
    slug: slug === 'index' ? [] : slug.split('/'),
  }));
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

export default async function DocPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const slugPath = slug?.join('/') || 'index';
  const doc = getDocBySlug(slugPath);

  if (!doc) {
    notFound();
  }

  // Get prev/next links
  const { prev, next } = getPrevNextLinks(slugPath);
  
  // Extract headings for TOC
  const headings = extractHeadings(doc.content);
  
  // GitHub edit URL
  const githubEditUrl = `${siteConfig.links.github}/edit/main/docs/${slugPath === 'index' ? 'index' : slugPath}.md`;

  return (
    <div className="flex">
      {/* Main Content */}
      <main className="flex-1 min-w-0 px-6 lg:px-8 py-8 lg:py-12">
        <article className="max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
            <Link href="/docs" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{doc.title}</span>
          </nav>

          {/* Page header */}
          <header className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
              {doc.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {doc.description}
            </p>
          </header>

          {/* Content with syntax highlighting */}
          <div className="docs-content">
            <DocContent content={doc.content} />
          </div>

          {/* Edit on GitHub */}
          <div className="mt-12 pt-6 border-t">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={githubEditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Edit this page on GitHub
              </a>
              <a
                href={`${siteConfig.links.github}/issues/new`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Report an issue
              </a>
            </div>
          </div>

          {/* Prev/Next navigation */}
          <div className="mt-8 pt-6 border-t grid grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={prev.href}
                className="group flex flex-col p-4 rounded-xl border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                  Previous
                </span>
                <span className="font-medium text-foreground">{prev.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={next.href}
                className="group flex flex-col items-end p-4 rounded-xl border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  Next
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="font-medium text-foreground">{next.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </article>
      </main>

      {/* Right Sidebar - Table of Contents */}
      <aside className="hidden xl:block w-64 shrink-0">
        <div className="sticky top-20 py-8 pr-4">
          {headings.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-4 text-foreground">
                On this page
              </h4>
              <nav className="space-y-1">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 ${
                      heading.level === 3 ? 'pl-4' : ''
                    }`}
                  >
                    {heading.title}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t">
            <h4 className="text-sm font-semibold mb-3 text-foreground">
              Quick Links
            </h4>
            <div className="space-y-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href={siteConfig.links.npm}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                npm Package
              </a>
              <Link
                href="/playground"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Playground
              </Link>
            </div>
          </div>
        </div>
      </aside>
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
