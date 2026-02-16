# Editor Component

The `AuthorlyEditor` is the main component for creating and editing rich text content. It provides a complete block-based editing experience with 16 block types.

> **Note:** `ContentBlocksEditor` is a deprecated alias that still works for backwards compatibility.

## Overview

Authorly's editor outputs pure, semantic HTML—not JSON or proprietary formats. The content you create can be stored directly in your database and rendered anywhere.

### Key Features

- **16 Block Types** — Paragraphs, headings, lists, code, images, tables, and more
- **Pure HTML Output** — No JSON, just clean semantic HTML
- **Inline Formatting** — Bold, italic, underline, strikethrough, code, links, colors, highlights
- **Drag & Drop** — Reorder blocks by dragging
- **Keyboard Shortcuts** — Full keyboard navigation and shortcuts
- **Dark Mode** — Built-in dark theme support
- **Cloud Uploads** — Built-in Cloudinary & S3 support
- **Type-Safe** — Full TypeScript support with exported types

## Import

```tsx
import { AuthorlyEditor, type EditorRef } from 'authorly-editor';
import 'authorly-editor/styles';
```

## Basic Usage

```tsx
'use client'; // For Next.js App Router

import { useState } from 'react';
import { AuthorlyEditor } from 'authorly-editor';
import 'authorly-editor/styles';

export default function MyEditor() {
  const [content, setContent] = useState('<p>Start writing...</p>');

  return (
    <AuthorlyEditor
      initialContent={content}
      onChange={setContent}
    />
  );
}
```

## Props API

### Content Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialContent` | `string` | `''` | Initial HTML content to load into the editor |
| `onChange` | `(html: string) => void` | - | Callback fired when content changes |
| `onSave` | `(html: string) => void` | - | Callback fired when user presses Ctrl/Cmd+S |
| `onFocus` | `() => void` | - | Callback fired when editor gains focus |
| `onBlur` | `() => void` | - | Callback fired when editor loses focus |
| `onReady` | `(editor: EditorInstance) => void` | - | Callback fired when editor is fully initialized |

### Appearance Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `darkMode` | `boolean` | `false` | Enable dark theme styling |
| `showToolbar` | `boolean` | `true` | Show or hide the formatting toolbar |
| `toolbarPosition` | `'top' \| 'bottom' \| 'floating'` | `'top'` | Position of the toolbar |
| `placeholder` | `string` | `'Type "/" for commands...'` | Placeholder text shown when editor is empty |
| `className` | `string` | `''` | Custom CSS class for the container |
| `style` | `React.CSSProperties` | `{}` | Inline styles for the container |
| `classPrefix` | `string` | `'cb'` | CSS class prefix for all editor elements |

### Behavior Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `readOnly` | `boolean` | `false` | Disable all editing capabilities |
| `autoFocus` | `boolean` | `false` | Automatically focus editor on mount |
| `spellCheck` | `boolean` | `true` | Enable browser spell checking |
| `blocks` | `BlockType[]` | All blocks | Array of enabled block types |
| `inlineFormats` | `InlineFormat[]` | All formats | Array of enabled inline formats |

### Upload Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageUploadConfig` | `UploadConfig` | - | Image upload configuration (Cloudinary, S3, or custom) |
| `onUploadStart` | `(filename: string) => void` | - | Called when image upload starts |
| `onUploadSuccess` | `(result: UploadResult) => void` | - | Called when image upload succeeds |
| `onUploadError` | `(error: Error) => void` | - | Called when image upload fails |
| `onUploadProgress` | `(progress: UploadProgress) => void` | - | Called to track upload progress |

## Using the Editor Ref

Access editor methods programmatically using a ref:

```tsx
import { useRef } from 'react';
import { AuthorlyEditor, type EditorRef } from 'authorly-editor';

export default function MyEditor() {
  const editorRef = useRef<EditorRef>(null);

  const handleExportHTML = () => {
    const html = editorRef.current?.getHTML();
    console.log('Current HTML:', html);
  };

  const handleExportText = () => {
    const text = editorRef.current?.getText();
    console.log('Plain text:', text);
  };

  const handleClear = () => {
    editorRef.current?.setHTML('<p></p>');
  };

  const handleFocus = () => {
    editorRef.current?.focus();
  };

  return (
    <div>
      <div className="controls">
        <button onClick={handleExportHTML}>Export HTML</button>
        <button onClick={handleExportText}>Export Text</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleFocus}>Focus Editor</button>
      </div>
      <AuthorlyEditor ref={editorRef} />
    </div>
  );
}
```

### Ref Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `getHTML()` | `(options?: GetHTMLOptions) => string` | Get current HTML content |
| `setHTML(html)` | `(html: string) => void` | Set editor content (replaces all) |
| `getText()` | `() => string` | Get plain text content (no HTML tags) |
| `focus()` | `() => void` | Focus the editor |
| `blur()` | `() => void` | Remove focus from editor |
| `insertBlock(type, data)` | `(type: BlockType, data?: Partial<BlockData>) => HTMLElement \| null` | Programmatically insert a block |
| `getEditor()` | `() => EditorInstance \| null` | Get the underlying editor instance |

### GetHTMLOptions

```tsx
interface GetHTMLOptions {
  /** Remove editor UI elements like controls (default: true) */
  stripEditorUI?: boolean;
  /** Remove data-block-id attributes (default: true) */
  stripDataAttributes?: boolean;
  /** Add Cloudinary optimization params (default: true) */
  optimizeImages?: boolean;
  /** Generate responsive srcset for Cloudinary images (default: true) */
  addResponsiveImages?: boolean;
}
```

## Common Patterns

### With Save Functionality

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
      console.log('Saved!');
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AuthorlyEditor
        initialContent={content}
        onChange={setContent}
        onSave={handleSave}  // Ctrl/Cmd+S
      />
      {saving && <div>Saving...</div>}
    </div>
  );
}
```

### With Dark Mode Toggle

```tsx
export default function MyEditor() {
  const [content, setContent] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Sync with system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  return (
    <div>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      <AuthorlyEditor
        initialContent={content}
        onChange={setContent}
        darkMode={darkMode}
      />
    </div>
  );
}
```

### Read-Only Viewer

```tsx
export default function DocumentViewer({ content }: { content: string }) {
  return (
    <AuthorlyEditor
      initialContent={content}
      readOnly={true}
      showToolbar={false}
    />
  );
}
```

### Custom Toolbar Position

```tsx
<AuthorlyEditor
  initialContent={content}
  onChange={setContent}
  toolbarPosition="bottom"  // Toolbar at bottom instead of top
/>
```

### Limiting Block Types

```tsx
<AuthorlyEditor
  initialContent={content}
  onChange={setContent}
  blocks={['paragraph', 'heading', 'bulletList', 'numberedList', 'code']}
/>
```

## Available Block Types

The `blocks` prop accepts an array of these block type strings:

- `'paragraph'` — Default text block
- `'heading'` — Headings (H1-H6)
- `'bulletList'` — Unordered list
- `'numberedList'` — Ordered list
- `'checkList'` — Todo checklist
- `'quote'` — Blockquote
- `'code'` — Code block with syntax highlighting
- `'image'` — Image with caption
- `'video'` — Video embed
- `'table'` — Interactive table
- `'divider'` — Horizontal rule
- `'callout'` — Highlighted callout box (info, warning, error, success, note)
- `'accordion'` — Collapsible details/summary
- `'linkPreview'` — Rich URL preview card
- `'date'` — Date picker
- `'excalidraw'` — Embedded drawings

## Inline Formats

The `inlineFormats` prop accepts an array of these format strings:

- `'bold'` — Bold text (Ctrl/Cmd+B)
- `'italic'` — Italic text (Ctrl/Cmd+I)
- `'underline'` — Underlined text (Ctrl/Cmd+U)
- `'strikethrough'` — Strikethrough text
- `'code'` — Inline code (Ctrl/Cmd+Shift+X)
- `'link'` — Hyperlinks (Ctrl/Cmd+K)
- `'textColor'` — Text color
- `'highlight'` — Background highlight

## Styling

The editor uses a class-based styling system with the prefix `cb-` by default:

```css
/* Override editor styles */
.cb-editor {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
}

.cb-block {
  margin-bottom: 1rem;
}

.cb-paragraph {
  line-height: 1.75;
}
```

### Custom Class Prefix

```tsx
<AuthorlyEditor
  classPrefix="my-editor"  // Changes cb- to my-editor-
  initialContent={content}
  onChange={setContent}
/>
```

## TypeScript Types

```tsx
import type {
  AuthorlyEditorProps,
  EditorRef,
  EditorInstance,
  BlockType,
  BlockData,
  InlineFormat,
  UploadConfig,
  UploadResult,
  UploadProgress,
} from 'authorly-editor';
```

## Next.js Integration

For Next.js, use dynamic imports to avoid SSR issues:

```tsx
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('authorly-editor').then(mod => mod.AuthorlyEditor),
  { ssr: false }
);

export default function Page() {
  return <Editor initialContent="<p>Hello</p>" />;
}
```

See the [Next.js Integration Guide](/docs/guides/nextjs) for details.

## Accessibility

The editor follows WCAG 2.1 AA guidelines:

- All interactive elements are keyboard accessible
- Proper ARIA labels and roles
- Screen reader announcements for block changes
- High contrast mode support

## Performance

- Virtualized long documents (1000+ blocks)
- Debounced onChange callbacks (configurable)
- Lazy-loaded block types
- Optimized re-renders with React.memo

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related

- [Renderer Component](/docs/components/renderer) - Display saved content
- [Toolbar Component](/docs/components/toolbar) - Formatting toolbar
- [Editor Props API](/docs/api/editor-props) - Complete props reference
- [Editor Ref API](/docs/api/editor-ref) - Complete methods reference
