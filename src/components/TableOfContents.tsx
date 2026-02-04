'use client';

import dynamic from 'next/dynamic';

// Dynamically import TOC to avoid SSR issues
const TableOfContentsComponent = dynamic(
  () => import('authorly-editor').then((mod) => mod.TableOfContents),
  { 
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-secondary rounded-lg h-32">
        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-muted rounded w-2/3"></div>
      </div>
    )
  }
);

interface TableOfContentsProps {
  html: string;
  darkMode?: boolean;
  title?: string;
  minLevel?: number;
  maxLevel?: number;
  className?: string;
}

export default function TableOfContents(props: TableOfContentsProps) {
  return <TableOfContentsComponent {...props} />;
}
