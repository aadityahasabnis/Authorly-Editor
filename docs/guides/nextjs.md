# Next.js Integration Guide

Complete guide for integrating Authorly with Next.js App Router and Pages Router, including SSR considerations, dynamic imports, and deployment tips.

## Overview

Authorly is a client-side React component that requires browser APIs (DOM, contentEditable). When integrating with Next.js, you need to handle:

- **Server-Side Rendering (SSR)** - Disable SSR for the editor
- **Dynamic Imports** - Load the editor only on the client
- **Hydration** - Avoid hydration mismatches
- **API Routes** - Save content to your backend

## Quick Start (App Router)

### Installation

```bash
npm install authorly-editor
# or
pnpm add authorly-editor
# or
yarn add authorly-editor
```

### Basic Setup

Create a client component wrapper:

```tsx
// components/editor-wrapper.tsx
'use client';

import { AuthorlyEditor } from 'authorly-editor';
import 'authorly-editor/styles';
import { useState } from 'react';

export default function EditorWrapper() {
  const [content, setContent] = useState('');

  return (
    <AuthorlyEditor
      initialContent={content}
      onChange={setContent}
      placeholder="Start writing..."
    />
  );
}
```

Use it in a page:

```tsx
// app/editor/page.tsx
import dynamic from 'next/dynamic';

const EditorWrapper = dynamic(
  () => import('@/components/editor-wrapper'),
  { ssr: false }
);

export default function EditorPage() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Content Editor</h1>
      <EditorWrapper />
    </main>
  );
}
```

## App Router (Next.js 13+)

### Client Components

The editor must run as a Client Component. Mark it with `'use client'`:

```tsx
'use client';

import { AuthorlyEditor } from 'authorly-editor';
import 'authorly-editor/styles';

export default function Editor() {
  const [content, setContent] = useState('');
  
  return <AuthorlyEditor initialContent={content} onChange={setContent} />;
}
```

### Server Components with Dynamic Import

For pages using Server Components, dynamically import the editor:

```tsx
// app/write/page.tsx
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('@/components/editor'),
  { 
    ssr: false,
    loading: () => <div>Loading editor...</div>
  }
);

export default function WritePage() {
  return (
    <main>
      <Editor />
    </main>
  );
}
```

### Full Example with Persistence

```tsx
// components/persistent-editor.tsx
'use client';

import { AuthorlyEditor } from 'authorly-editor';
import 'authorly-editor/styles';
import { useState, useEffect } from 'react';

export default function PersistentEditor({ postId }: { postId?: string }) {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load existing content
  useEffect(() => {
    if (postId) {
      fetch(`/api/posts/${postId}`)
        .then(res => res.json())
        .then(data => setContent(data.content));
    }
  }, [postId]);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content) {
        saveContent(content);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [content]);

  async function saveContent(html: string) {
    setIsSaving(true);
    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: html }),
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      {isSaving && <div className="text-sm text-gray-500">Saving...</div>}
      <AuthorlyEditor
        initialContent={content}
        onChange={setContent}
        placeholder="Start writing..."
      />
    </div>
  );
}
```

Usage:

```tsx
// app/posts/[id]/edit/page.tsx
import dynamic from 'next/dynamic';

const PersistentEditor = dynamic(
  () => import('@/components/persistent-editor'),
  { ssr: false }
);

export default function EditPost({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto p-6">
      <PersistentEditor postId={params.id} />
    </main>
  );
}
```

### API Route for Saving Content

```typescript
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { content } = await request.json();
  
  // Save to database
  // Example: await db.posts.create({ content });
  
  return NextResponse.json({ success: true });
}

// app/api/posts/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Fetch from database
  // const post = await db.posts.findById(params.id);
  
  return NextResponse.json({ 
    content: '<p>Loaded content</p>' 
  });
}
```

## Pages Router (Next.js 12 and earlier)

### Using getServerSideProps

```tsx
// pages/editor.tsx
import dynamic from 'next/dynamic';
import type { GetServerSideProps } from 'next';

const Editor = dynamic(
  () => import('@/components/editor'),
  { ssr: false }
);

interface Props {
  initialContent?: string;
}

export default function EditorPage({ initialContent }: Props) {
  return (
    <div className="container mx-auto p-6">
      <Editor initialContent={initialContent} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.query;
  
  // Fetch content from database
  // const content = await fetchPost(id);
  
  return {
    props: {
      initialContent: '<p>Initial content</p>',
    },
  };
};
```

### Using getStaticProps

```tsx
// pages/posts/[slug].tsx
import dynamic from 'next/dynamic';
import type { GetStaticProps, GetStaticPaths } from 'next';

const Editor = dynamic(
  () => import('@/components/editor'),
  { ssr: false }
);

interface Props {
  post: {
    title: string;
    content: string;
  };
}

export default function PostPage({ post }: Props) {
  return (
    <div>
      <h1>{post.title}</h1>
      <Editor initialContent={post.content} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all post slugs
  return {
    paths: [{ params: { slug: 'example' } }],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  // Fetch post
  return {
    props: {
      post: {
        title: 'Example Post',
        content: '<p>Content</p>',
      },
    },
    revalidate: 60, // ISR
  };
};
```

### API Routes

```typescript
// pages/api/posts/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { content } = req.body;
    
    // Save to database
    // await db.posts.create({ content });
    
    return res.status(200).json({ success: true });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}

// pages/api/posts/[id].ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    // Fetch from database
    // const post = await db.posts.findById(id);
    
    return res.status(200).json({ 
      content: '<p>Loaded content</p>' 
    });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
```

## Rendering Content (AuthorlyRenderer)

The renderer works with both SSR and SSG:

```tsx
// components/article.tsx
import { AuthorlyRenderer } from 'authorly-editor';
import 'authorly-editor/styles';

interface Props {
  content: string;
}

export default function Article({ content }: Props) {
  return (
    <article>
      <AuthorlyRenderer html={content} />
    </article>
  );
}
```

Server-side rendering (App Router):

```tsx
// app/posts/[slug]/page.tsx
import { AuthorlyRenderer } from 'authorly-editor';
import 'authorly-editor/styles';

async function getPost(slug: string) {
  // Fetch from database
  return {
    title: 'Post Title',
    content: '<p>Post content</p>',
  };
}

export default async function PostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <AuthorlyRenderer html={post.content} />
    </article>
  );
}
```

## Dark Mode with next-themes

```tsx
// components/themed-editor.tsx
'use client';

import { AuthorlyEditor } from 'authorly-editor';
import 'authorly-editor/styles';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemedEditor() {
  const [content, setContent] = useState('');
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className={theme === 'dark' ? 'cb-dark' : ''}>
      <AuthorlyEditor
        initialContent={content}
        onChange={setContent}
        darkMode={theme === 'dark'}
      />
    </div>
  );
}
```

Provider setup:

```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Image Uploads with Next.js API

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  if (!file) {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save to public directory
  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(process.cwd(), 'public/uploads', filename);
  
  await writeFile(filepath, buffer);
  
  return NextResponse.json({ 
    url: `/uploads/${filename}` 
  });
}
```

Configure the editor:

```tsx
'use client';

import { AuthorlyEditor, createCustomUploadConfig } from 'authorly-editor';

export default function Editor() {
  const [content, setContent] = useState('');

  const uploadConfig = createCustomUploadConfig(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const data = await res.json();
    return {
      url: data.url,
      width: data.width || 0,
      height: data.height || 0,
      format: file.type.split('/')[1],
      size: file.size,
    };
  });

  return (
    <AuthorlyEditor
      initialContent={content}
      onChange={setContent}
      imageUploadConfig={uploadConfig}
    />
  );
}
```

## TypeScript Configuration

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=postgresql://...
```

Usage:

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Deployment

### Vercel

1. Push to GitHub
2. Import to Vercel
3. Configure environment variables
4. Deploy

```bash
vercel --prod
```

### Self-Hosted

Build the project:

```bash
npm run build
npm start
```

Or use Docker:

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## Common Issues

### Hydration Mismatch

**Problem:** "Hydration failed" error

**Solution:** Use `'use client'` and dynamic import with `ssr: false`

```tsx
const Editor = dynamic(() => import('./editor'), { ssr: false });
```

### Document is not defined

**Problem:** "document is not defined" error

**Solution:** Ensure the editor is only rendered on the client

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;

return <AuthorlyEditor />;
```

### Styles Not Loading

**Problem:** Editor appears unstyled

**Solution:** Import CSS in the component or `_app.tsx`

```tsx
import 'authorly-editor/styles';
```

### Slow Initial Load

**Problem:** Large bundle size

**Solution:** Use code splitting

```tsx
const Editor = dynamic(
  () => import('authorly-editor').then(mod => mod.AuthorlyEditor),
  { ssr: false }
);
```

## Performance Optimization

### Code Splitting

```tsx
// Lazy load the editor
const Editor = lazy(() => import('./editor'));

function EditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Editor />
    </Suspense>
  );
}
```

### Memoization

```tsx
'use client';

import { memo, useCallback } from 'react';
import { AuthorlyEditor } from 'authorly-editor';

const MemoizedEditor = memo(function Editor({ 
  initialContent, 
  onChange 
}: { 
  initialContent: string; 
  onChange: (html: string) => void; 
}) {
  return (
    <AuthorlyEditor
      initialContent={initialContent}
      onChange={onChange}
    />
  );
});

export default function EditorPage() {
  const [content, setContent] = useState('');
  
  const handleChange = useCallback((html: string) => {
    setContent(html);
  }, []);

  return <MemoizedEditor initialContent={content} onChange={handleChange} />;
}
```

### Debounced Save

```tsx
import { useDebouncedCallback } from 'use-debounce';

function Editor() {
  const [content, setContent] = useState('');

  const debouncedSave = useDebouncedCallback(
    async (html: string) => {
      await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify({ content: html }),
      });
    },
    1000
  );

  function handleChange(html: string) {
    setContent(html);
    debouncedSave(html);
  }

  return <AuthorlyEditor initialContent={content} onChange={handleChange} />;
}
```

## Example Projects

### Blog with App Router

```
my-blog/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── admin/
│   │   └── editor/
│   │       └── page.tsx
│   └── api/
│       ├── posts/
│       │   └── route.ts
│       └── upload/
│           └── route.ts
├── components/
│   ├── editor.tsx
│   └── article.tsx
└── lib/
    └── db.ts
```

### Documentation Site with Pages Router

```
docs-site/
├── pages/
│   ├── _app.tsx
│   ├── index.tsx
│   ├── docs/
│   │   └── [slug].tsx
│   └── api/
│       └── docs/
│           └── [id].ts
├── components/
│   ├── editor.tsx
│   └── renderer.tsx
└── lib/
    └── content.ts
```

## Related Documentation

- [Editor Component](../components/editor) - Editor props and configuration
- [Renderer Component](../components/renderer) - Rendering content
- [Image Upload Guide](./image-uploads) - Advanced upload handling
- [Quick Start](../quick-start) - Getting started guide
