'use client';

import dynamic from 'next/dynamic';

// Dynamically import the renderer to avoid SSR issues
const AuthorlyRenderer = dynamic(
  () => import('authorly-editor').then((mod) => mod.AuthorlyRenderer),
  { 
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-secondary rounded-lg h-32 flex items-center justify-center">
        <span className="text-muted-foreground">Loading content...</span>
      </div>
    )
  }
);

interface RendererProps {
  html: string;
  darkMode?: boolean;
  enableCodeCopy?: boolean;
  enableHeadingIds?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Renderer(props: RendererProps) {
  return <AuthorlyRenderer {...props} />;
}
