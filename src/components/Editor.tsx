'use client';

import { forwardRef } from 'react';
import dynamic from 'next/dynamic';
import type { EditorRef, UploadConfig, UploadResult, UploadProgress } from 'authorly-editor';

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
  imageUploadConfig?: UploadConfig;
  onUploadStart?: (filename: string) => void;
  onUploadProgress?: (progress: UploadProgress) => void;
  onUploadSuccess?: (result: UploadResult) => void;
  onUploadError?: (error: Error) => void;
}

const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  return <AuthorlyEditor ref={ref} {...props} />;
});

Editor.displayName = 'Editor';

export default Editor;
