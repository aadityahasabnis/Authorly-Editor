# Renderer Component

The `ContentBlocksRenderer` component displays HTML content created by the editor with beautiful, consistent styling. It's a **read-only** component designed for displaying published content.

## Overview

The Renderer is not just a wrapper around `dangerouslySetInnerHTML`. It provides:

- **Automatic enhancements** — Code copy buttons, heading IDs, checklist styling
- **Consistent styling** — Matches the editor's appearance
- **Security** — Processes HTML safely
- **Dark mode support** — Automatic theme switching
- **Zero configuration** — Works out of the box

## Import

```tsx
import { ContentBlocksRenderer } from 'authorly-editor';
import 'authorly-editor/styles';
```

## Basic Usage

```tsx
import { ContentBlocksRenderer } from 'authorly-editor';
import 'authorly-editor/styles';

export default function BlogPost({ content }: { content: string }) {
  return (
    <article>
      <ContentBlocksRenderer html={content} />
    </article>
  );
}
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `html` | `string` | **Required** | HTML content to render |
| `darkMode` | `boolean` | `false` | Enable dark theme styling |
| `className` | `string` | `''` | Custom CSS class for container |
| `style` | `React.CSSProperties` | `{}` | Inline styles for container |
| `enableCodeCopy` | `boolean` | `true` | Add copy button to code blocks |
| `enableChecklistStyles` | `boolean` | `true` | Style checklist items with strikethrough |
| `enableHeadingIds` | `boolean` | `true` | Add IDs to headings for anchor links |
| `classPrefix` | `string` | `'cbr'` | CSS class prefix for rendered elements |

## What the Renderer Does

### 1. Code Block Enhancement

Automatically adds a copy button to all code blocks:

```tsx
<ContentBlocksRenderer
  html={`<pre><code>console.log('Hello');</code></pre>`}
  enableCodeCopy={true}
/>
```

**Output:**
- Wrapped code block with toolbar
- "Copy" button that changes to "Copied!" on click
- Language label (if specified)
- Syntax highlighting preserved

### 2. Heading ID Generation

Adds IDs to headings for deep linking:

```tsx
<ContentBlocksRenderer
  html={`<h2>Getting Started</h2>`}
  enableHeadingIds={true}
/>
```

**Output:**
```html
<h2 id="heading-0">Getting Started</h2>
```

This enables:
- Table of Contents links
- Deep linking to sections
- Smooth scroll navigation

### 3. Checklist Styling

Applies strikethrough to checked items:

```tsx
<ContentBlocksRenderer
  html={`
    <ul class="cb-checklist">
      <li class="cb-checked">
        <input type="checkbox" checked disabled />
        <span>Completed task</span>
      </li>
    </ul>
  `}
  enableChecklistStyles={true}
/>
```

## Common Use Cases

### Blog Post Display

```tsx
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <h1>{post.title}</h1>
      <p className="text-gray-600">{post.date}</p>
      
      <ContentBlocksRenderer
        html={post.content}
        enableCodeCopy={true}
        enableHeadingIds={true}
      />
    </article>
  );
}
```

### Documentation Page with TOC

```tsx
import { ContentBlocksRenderer, TableOfContents } from 'authorly-editor';

export default function DocsPage({ content }: { content: string }) {
  return (
    <div className="flex gap-8">
      {/* Sticky Table of Contents */}
      <aside className="w-64 shrink-0">
        <div className="sticky top-4">
          <TableOfContents
            html={content}
            title="On this page"
            maxLevel={3}
          />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 max-w-3xl">
        <ContentBlocksRenderer
          html={content}
          enableHeadingIds={true}  // Required for TOC links to work
        />
      </main>
    </div>
  );
}
```

### Dark Mode Support

```tsx
'use client';

import { useState, useEffect } from 'react';
import { ContentBlocksRenderer } from 'authorly-editor';

export default function Article({ content }: { content: string }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  return (
    <div>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️' : '🌙'}
      </button>
      
      <ContentBlocksRenderer
        html={content}
        darkMode={darkMode}
      />
    </div>
  );
}
```

### Custom Styling

```tsx
export default function StyledContent({ content }: { content: string }) {
  return (
    <ContentBlocksRenderer
      html={content}
      className="prose prose-lg prose-slate max-w-none dark:prose-invert"
      style={{
        fontFamily: 'Georgia, serif',
        fontSize: '18px',
        lineHeight: '1.8',
      }}
    />
  );
}
```

## Styling

The Renderer uses the `cbr-` class prefix (customizable via `classPrefix` prop):

```css
/* Override renderer styles */
.cbr-content {
  /* Container styles */
}

.cbr-content p {
  margin-bottom: 1.5rem;
  line-height: 1.75;
}

.cbr-content h2 {
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 700;
}

.cbr-code-wrapper {
  /* Code block wrapper */
  border-radius: 0.5rem;
  overflow: hidden;
}

.cbr-code-copy {
  /* Copy button */
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Dark Mode Styling

Dark mode adds the `cbr-dark` class to the container:

```css
.cbr-dark .cbr-content {
  background: #1a1a1a;
  color: #e5e5e5;
}

.cbr-dark .cbr-code-wrapper {
  background: #0d1117;
}
```

## Why Use the Renderer?

### ❌ Don't Do This

```tsx
// Unsafe and unstyled
function BlogPost({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
```

**Problems:**
- No safety processing
- No code copy buttons
- No heading IDs for navigation
- Inconsistent styling
- No dark mode support

### ✅ Do This Instead

```tsx
// Safe, enhanced, and styled
function BlogPost({ content }: { content: string }) {
  return <ContentBlocksRenderer html={content} />;
}
```

**Benefits:**
- Processes HTML safely
- Adds interactive features (copy buttons)
- Generates heading IDs automatically
- Applies consistent, professional styling
- Supports dark mode out of the box

## SSR / Server Components

The Renderer works in both client and server components:

```tsx
// app/blog/[slug]/page.tsx
import { ContentBlocksRenderer } from 'authorly-editor';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  return (
    <ContentBlocksRenderer html={post.content} />
  );
}
```

No `'use client'` directive needed for the Renderer!

## Accessibility

The Renderer ensures:

- Proper heading hierarchy (don't skip levels)
- Alt text on images
- Accessible tables with proper headers
- Keyboard-navigable interactive elements
- Screen reader friendly markup

## Performance

The Renderer is optimized for performance:

- Uses `useMemo` to cache processed HTML
- Only re-processes when `html` or options change
- Lightweight DOM processing
- No external dependencies

## TypeScript

```tsx
import type { ContentBlocksRendererProps } from 'authorly-editor';

const MyRenderer: React.FC<ContentBlocksRendererProps> = (props) => {
  return <ContentBlocksRenderer {...props} />;
};
```

## Combining with Tailwind's Typography Plugin

```tsx
<ContentBlocksRenderer
  html={content}
  className="prose prose-lg prose-slate max-w-none
             dark:prose-invert
             prose-headings:font-bold
             prose-a:text-blue-600
             prose-code:bg-gray-100
             prose-pre:bg-gray-900"
/>
```

## Processing Custom HTML

The Renderer can display HTML from any source, not just the Authorly editor:

```tsx
<ContentBlocksRenderer
  html={`
    <h1>Welcome</h1>
    <p>This HTML came from anywhere!</p>
    <pre><code>console.log('Works great!');</code></pre>
  `}
/>
```

## Related

- [Editor Component](/docs/components/editor) - Create and edit content
- [Table of Contents](/docs/components/table-of-contents) - Auto-generate navigation
- [Renderer Props API](/docs/api/renderer-props) - Complete props reference
