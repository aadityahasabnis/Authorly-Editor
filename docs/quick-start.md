# Quick Start

Get up and running with Authorly in under 5 minutes.

## Basic Editor

Create a simple editor that stores content in state:

```tsx
'use client'; // For Next.js App Router

import { useState } from 'react';
import { ContentBlocksEditor } from 'authorly-editor';
import 'authorly-editor/styles';

export default function MyEditor() {
  const [content, setContent] = useState('<p>Start writing...</p>');

  return (
    <ContentBlocksEditor
      initialContent={content}
      onChange={setContent}
    />
  );
}
```

That's it! You now have a fully functional rich text editor.

## With Save Functionality

Add auto-save or manual save with Ctrl+S:

```tsx
export default function MyEditor() {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async (html: string) => {
    setSaving(true);
    try {
      await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: html }),
      });
      console.log('Saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <ContentBlocksEditor
        initialContent={content}
        onChange={setContent}
        onSave={handleSave}  // Triggered by Ctrl+S
      />
      {saving && <div>Saving...</div>}
    </div>
  );
}
```

## Dark Mode Support

Enable dark mode with a single prop:

```tsx
export default function MyEditor() {
  const [content, setContent] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
      <ContentBlocksEditor
        initialContent={content}
        onChange={setContent}
        darkMode={darkMode}
      />
    </div>
  );
}
```

## Cloud Image Uploads

Enable cloud uploads to Cloudinary or S3 (optional):

```tsx
import { ContentBlocksEditor, createCloudinaryConfig } from 'authorly-editor';

export default function MyEditor() {
  const [content, setContent] = useState('');

  // Configure Cloudinary upload
  const uploadConfig = createCloudinaryConfig({
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
    folder: 'blog-images',
    maxSizeMB: 5,
  });

  return (
    <ContentBlocksEditor
      initialContent={content}
      onChange={setContent}
      imageUploadConfig={uploadConfig}
      onUploadSuccess={(result) => {
        console.log('Image uploaded:', result.url);
      }}
    />
  );
}
```

**Setup:**
1. Sign up for free at [cloudinary.com](https://cloudinary.com)
2. Get your Cloud Name and create an unsigned upload preset
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-preset
   ```

See the [Image Upload Guide](./guides/image-uploads) for S3 and custom upload handlers.

## Rendering Saved Content

Use the Renderer component to display your saved HTML:

```tsx
import { ContentBlocksRenderer } from 'authorly-editor';
import 'authorly-editor/styles';

export default function BlogPost({ content }: { content: string }) {
  return (
    <article>
      <ContentBlocksRenderer
        html={content}
        enableCodeCopy={true}
        enableHeadingIds={true}
      />
    </article>
  );
}
```

## Styling Guide

### Understanding Authorly's CSS

**IMPORTANT:** Authorly comes with complete, production-ready CSS. You should **NOT** override or duplicate its styles.

```tsx
// ✅ CORRECT: Import Authorly's styles
import 'authorly-editor/styles';

// ❌ WRONG: Don't write custom CSS for editor content
// The editor.css handles all layout, structure, and default styling
```

### What Authorly's CSS Includes

The `authorly-editor/styles` import provides:

- ✅ Complete editor layout and structure
- ✅ All 13+ block type styles (headings, lists, code, tables, etc.)
- ✅ Toolbar and menu styling
- ✅ Dark mode support
- ✅ Scrollbars, focus states, selections
- ✅ Responsive design
- ✅ Print styles

**You don't need to write any CSS for content rendering!**

### Customizing Colors Only

If you want the editor to match your app's theme, override **ONLY** the CSS color variables:

```css
/* globals.css or your main CSS file */

/* Override Authorly color variables */
:root {
  --cb-primary: #6366f1;        /* Your brand color */
  --cb-primary-hover: #4f46e5;  /* Hover state */
  --cb-bg: #ffffff;             /* Background */
  --cb-text: #0f172a;           /* Text color */
  --cb-border: #e2e8f0;         /* Border color */
}

.dark {
  --cb-primary: #818cf8;
  --cb-bg: #09090b;
  --cb-text: #fafafa;
  --cb-border: #27272a;
}
```

**Never override structural styles like:**
- ❌ `.cb-content` padding/margin
- ❌ `.cb-block-*` layout/positioning
- ❌ `.cb-toolbar` structure
- ❌ Font sizes, line heights, spacing

### Rendering HTML Correctly

When using `ContentBlocksRenderer`, the HTML is rendered **as-is** with Authorly's styles:

```tsx
import { ContentBlocksRenderer } from 'authorly-editor';
import 'authorly-editor/styles'; // Required!

export default function Article({ content }: { content: string }) {
  return (
    <article>
      {/* ✅ CORRECT: No wrapper classes needed */}
      <ContentBlocksRenderer html={content} />
      
      {/* ❌ WRONG: Don't add prose/typography classes */}
      {/* <div className="prose">
        <ContentBlocksRenderer html={content} />
      </div> */}
    </article>
  );
}
```

**Why this matters:**
- Authorly outputs semantic, clean HTML
- The editor.css has carefully crafted typography
- Adding wrapper classes (like Tailwind's `prose`) will conflict
- Your content will look identical in editor and preview

### Wrapper Styling (Optional)

You can style the **container** around the editor, but don't touch editor internals:

```tsx
// ✅ CORRECT: Style the wrapper
<div className="max-w-4xl mx-auto p-6 border rounded-lg">
  <ContentBlocksEditor />
</div>

// ❌ WRONG: Override editor internals
<div className="custom-editor">
  <ContentBlocksEditor />
</div>
<style>{`.custom-editor .cb-content { padding: 0; }`}</style>
```

### Available CSS Variables

For color theming, these variables are available:

**Colors:**
- `--cb-bg` - Background
- `--cb-bg-secondary` - Secondary background
- `--cb-bg-tertiary` - Tertiary background
- `--cb-text` - Text color
- `--cb-text-secondary` - Secondary text
- `--cb-text-placeholder` - Placeholder text
- `--cb-border` - Border color
- `--cb-border-focus` - Focus border
- `--cb-primary` - Primary/accent color
- `--cb-primary-hover` - Primary hover state
- `--cb-danger` - Error/delete color
- `--cb-success` - Success color
- `--cb-warning` - Warning color

**Typography:**
- `--cb-font-family` - Main font
- `--cb-font-mono` - Code font

**Spacing (Don't override unless necessary):**
- `--cb-spacing-xs` to `--cb-spacing-xl`
- `--cb-radius-sm` to `--cb-radius-lg`
- `--cb-shadow-sm` to `--cb-shadow-lg`

For more details, see the [Advanced Styling Guide](/docs/guides/styling).

## Adding Table of Contents

Generate an automatic table of contents from headings:

```tsx
import { ContentBlocksRenderer, TableOfContents } from 'authorly-editor';

export default function DocumentPage({ content }: { content: string }) {
  return (
    <div className="flex gap-8">
      {/* Sidebar TOC */}
      <aside className="w-64 sticky top-4">
        <TableOfContents
          html={content}
          title="On this page"
          maxLevel={3}
        />
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <ContentBlocksRenderer
          html={content}
          enableHeadingIds={true}  // Required for TOC links
        />
      </main>
    </div>
  );
}
```

## Customizing the Editor

### Custom Placeholder

```tsx
<ContentBlocksEditor
  placeholder="Type '/' for commands or start writing..."
  initialContent={content}
  onChange={setContent}
/>
```

### Hiding the Toolbar

```tsx
<ContentBlocksEditor
  showToolbar={false}
  initialContent={content}
  onChange={setContent}
/>
```

### Toolbar Position

```tsx
<ContentBlocksEditor
  toolbarPosition="bottom"  // Options: 'top' | 'bottom'
  initialContent={content}
  onChange={setContent}
/>
```

### Read-Only Mode

```tsx
<ContentBlocksEditor
  readOnly={true}
  initialContent={content}
/>
```

## Using the Editor Ref

Access editor methods programmatically:

```tsx
import { useRef } from 'react';
import { ContentBlocksEditor, type EditorRef } from 'authorly-editor';

export default function MyEditor() {
  const editorRef = useRef<EditorRef>(null);

  const handleExport = () => {
    const html = editorRef.current?.getHTML();
    console.log('Content:', html);
  };

  const handleClear = () => {
    editorRef.current?.setHTML('<p></p>');
  };

  return (
    <div>
      <div className="controls">
        <button onClick={handleExport}>Export HTML</button>
        <button onClick={handleClear}>Clear All</button>
      </div>
      <ContentBlocksEditor ref={editorRef} />
    </div>
  );
}
```

## Complete Example

Here's a full-featured editor with all common features:

```tsx
'use client';

import { useState, useRef } from 'react';
import { ContentBlocksEditor, type EditorRef } from 'authorly-editor';
import 'authorly-editor/styles';

export default function FullEditor() {
  const [content, setContent] = useState('<p>Start writing...</p>');
  const [darkMode, setDarkMode] = useState(false);
  const editorRef = useRef<EditorRef>(null);

  const handleSave = async (html: string) => {
    await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify({ content: html }),
    });
  };

  return (
    <div>
      {/* Controls */}
      <div className="controls">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button onClick={() => editorRef.current?.focus()}>
          Focus Editor
        </button>
      </div>

      {/* Editor */}
      <ContentBlocksEditor
        ref={editorRef}
        initialContent={content}
        onChange={setContent}
        onSave={handleSave}
        darkMode={darkMode}
        placeholder="Start writing something amazing..."
        autoFocus={true}
        showToolbar={true}
        toolbarPosition="top"
      />
    </div>
  );
}
```

## Next Steps

Now that you have a working editor:

- Explore all [Components](/docs/components/editor) and their props
- Learn about the 12+ [Block Types](/docs/blocks)
- Check out the [API Reference](/docs/api/editor-props)
- See [Keyboard Shortcuts](/docs/guides/shortcuts) for power users
- Try the [Playground](/playground) for interactive examples
