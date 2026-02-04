'use client';

import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
import type { EditorRef } from 'authorly-editor';

// Dynamically import the editor to avoid SSR issues
const ContentBlocksEditor = dynamic(
  () => import('authorly-editor').then((mod) => mod.ContentBlocksEditor),
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

const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  return (
    <ContentBlocksEditor
      ref={ref}
      {...props}
    />
  );
});

Editor.displayName = 'Editor';

export default Editor;
export type { EditorRef };
