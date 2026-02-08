'use client';

import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
import type { EditorRef } from 'authorly-editor';
import type { UploadConfig, UploadResult, UploadProgress } from '@/types/upload';

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
  // Image upload props (for authorly-editor@0.1.9+)
  imageUploadConfig?: UploadConfig;
  onUploadStart?: (file: File) => void;
  onUploadSuccess?: (result: UploadResult) => void;
  onUploadError?: (error: Error) => void;
  onUploadProgress?: (progress: UploadProgress) => void;
}

const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  // Cast props to any when passing to ContentBlocksEditor because
  // authorly-editor@0.1.8 doesn't have upload props yet
  // This will work seamlessly when authorly-editor@0.1.9 is published
  return (
    <ContentBlocksEditor
      ref={ref}
      {...(props as any)}
    />
  );
});

Editor.displayName = 'Editor';

export default Editor;
export type { EditorRef, EditorProps };
export type { UploadConfig, UploadResult, UploadProgress };
