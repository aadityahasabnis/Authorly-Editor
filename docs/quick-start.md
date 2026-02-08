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
