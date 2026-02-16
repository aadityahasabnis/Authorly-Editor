'use client';

import dynamic from 'next/dynamic';

// Dynamically import the editor to avoid SSR issues
const AuthorlyEditor = dynamic(
  () => import('authorly-editor').then((mod) => mod.AuthorlyEditor),
  { 
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-secondary rounded-lg h-64 flex items-center justify-center">
        <span className="text-muted-foreground">Loading editor...</span>
      </div>
    )
  }
);

interface EditorProps {
  initialContent?: string;
  onChange?: (html: string) => void;
  onSave?: (html: string) => void;
  darkMode?: boolean;
  placeholder?: string;
  showToolbar?: boolean;
  readOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Editor(props: EditorProps) {
  return <AuthorlyEditor {...props} />;
}
