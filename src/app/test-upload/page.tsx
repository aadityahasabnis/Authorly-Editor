'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ArrowLeft,
  Code2,
  Eye,
  Settings,
  Info,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Editor from '@/components/Editor';
import type { UploadConfig, UploadResult, UploadProgress } from '@/types/upload';

// Note: Config object created manually to avoid importing from authorly-editor
// until v0.1.9 is published with upload support

export default function ImageUploadTestPage() {
  const [content, setContent] = useState('<p>Test image upload by typing <code>/image</code> or dragging an image here.</p>');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showHTML, setShowHTML] = useState(false);

  // Check if Cloudinary is configured
  const cloudinaryConfigured = Boolean(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && 
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );

  // Configure upload
  const uploadConfig = useMemo<UploadConfig | undefined>(() => {
    if (!cloudinaryConfigured) {
      return undefined;
    }

    // Create config object manually (compatible with authorly-editor v0.1.9+)
    return {
      provider: 'cloudinary',
      cloudinary: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
        folder: 'upload-test',
      },
      maxSizeBytes: 10 * 1024 * 1024, // 10MB
      autoOptimize: true,
      generateResponsive: true,
    };
  }, [cloudinaryConfigured]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/playground"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Playground
            </Link>
            
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold">Image Upload Test</h1>
              {cloudinaryConfigured ? (
                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Cloudinary Enabled
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Base64 Fallback
                </Badge>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHTML(!showHTML)}
              className="gap-2"
            >
              {showHTML ? <Eye className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
              {showHTML ? 'View Editor' : 'View HTML'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Setup Instructions */}
          {!cloudinaryConfigured && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <Settings className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                    Cloudinary Not Configured
                  </h3>
                  <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                    Images will use base64 encoding (not recommended for production). 
                    To enable cloud uploads:
                  </p>
                  <ol className="text-sm text-amber-800 dark:text-amber-200 space-y-1 list-decimal list-inside">
                    <li>Sign up for free at <a href="https://cloudinary.com" target="_blank" rel="noopener" className="underline">cloudinary.com</a></li>
                    <li>Get your Cloud Name and create an unsigned upload preset</li>
                    <li>Add to <code className="bg-amber-900/20 px-1 rounded">.env.local</code>:
                      <pre className="mt-2 bg-amber-900/20 p-2 rounded text-xs overflow-auto">
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name{'\n'}
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-preset
                      </pre>
                    </li>
                    <li>Restart the dev server</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          )}

          {/* Upload Status */}
          {uploadStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-lg p-4 border ${
                uploadStatus === 'uploading' 
                  ? 'bg-blue-500/10 border-blue-500/20' 
                  : uploadStatus === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/20'
                  : 'bg-red-500/10 border-red-500/20'
              }`}
            >
              <div className="flex items-center gap-3">
                {uploadStatus === 'uploading' && (
                  <>
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        Uploading... {uploadProgress}%
                      </p>
                      <div className="mt-2 bg-blue-900/20 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-blue-500 h-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  </>
                )}
                {uploadStatus === 'success' && (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                      {uploadMessage}
                    </p>
                  </>
                )}
                {uploadStatus === 'error' && (
                  <>
                    <XCircle className="w-5 h-5 text-red-500" />
                    <p className="text-sm font-medium text-red-900 dark:text-red-100">
                      {uploadMessage}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-medium mb-2">How to test:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Type <code className="bg-blue-900/20 px-1 rounded">/image</code> and press Enter</li>
                  <li>Or drag and drop an image file into the editor</li>
                  <li>Watch the upload progress in the status bar above</li>
                  <li>After upload, add alt text for accessibility</li>
                  <li>Click "View HTML" to see the clean output</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Editor / HTML View */}
          <div className="bg-card rounded-lg border shadow-lg overflow-hidden">
            <div className="border-b bg-muted/50 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {showHTML ? 'HTML Output' : 'Editor'}
                </span>
              </div>
              {showHTML && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(content);
                  }}
                >
                  Copy HTML
                </Button>
              )}
            </div>
            
            <div className="p-6">
              {showHTML ? (
                <pre className="text-sm bg-zinc-950 text-zinc-300 p-4 rounded-lg overflow-auto">
                  <code>{content}</code>
                </pre>
              ) : (
                <Editor
                  initialContent={content}
                  onChange={setContent}
                  placeholder="Type /image to insert an image..."
                  imageUploadConfig={uploadConfig}
                  onUploadStart={(file) => {
                    setUploadStatus('uploading');
                    setUploadMessage(`Uploading ${file.name}...`);
                    setUploadProgress(0);
                  }}
                  onUploadProgress={(progress: UploadProgress) => {
                    setUploadProgress(Math.round(progress.percent));
                  }}
                  onUploadSuccess={(result: UploadResult) => {
                    setUploadStatus('success');
                    setUploadMessage(`Successfully uploaded! URL: ${result.url.substring(0, 50)}...`);
                    setTimeout(() => setUploadStatus('idle'), 5000);
                  }}
                  onUploadError={(error: Error) => {
                    setUploadStatus('error');
                    setUploadMessage(error.message);
                    setTimeout(() => setUploadStatus('idle'), 5000);
                  }}
                />
              )}
            </div>
          </div>

          {/* Upload Details */}
          {cloudinaryConfigured && (
            <div className="bg-card rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-3">Current Configuration</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Provider:</span>
                  <span className="ml-2 font-medium">Cloudinary</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Cloud Name:</span>
                  <span className="ml-2 font-mono text-xs">{process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Upload Preset:</span>
                  <span className="ml-2 font-mono text-xs">{process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Max Size:</span>
                  <span className="ml-2 font-medium">10 MB</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Folder:</span>
                  <span className="ml-2 font-mono text-xs">upload-test</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Optimization:</span>
                  <span className="ml-2 font-medium">Auto</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
