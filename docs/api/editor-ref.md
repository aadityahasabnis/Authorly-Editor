# EditorRef API

API reference for methods available on the AuthorlyEditor ref. Use these methods to programmatically control the editor.

## Usage

```tsx
import { useRef } from 'react';
import { AuthorlyEditor, EditorRef } from 'authorly-editor';

function MyEditor() {
  const editorRef = useRef<EditorRef>(null);

  const handleSave = () => {
    const html = editorRef.current?.getHTML();
    console.log('Content:', html);
  };

  return (
    <>
      <button onClick={handleSave}>Save</button>
      <AuthorlyEditor ref={editorRef} />
    </>
  );
}
```

## Methods

### getHTML()

Returns the current HTML content of the editor.

**Signature:**
```tsx
getHTML(): string
```

**Returns:** `string` - Complete HTML content

**Examples:**

```tsx
// Get content
const html = editorRef.current?.getHTML();
console.log(html);
// "<p>Hello world</p><h2>Heading</h2>..."

// Save to API
const saveContent = async () => {
  const html = editorRef.current?.getHTML();
  await fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify({ content: html }),
  });
};

// Copy to clipboard
const copyContent = () => {
  const html = editorRef.current?.getHTML();
  navigator.clipboard.writeText(html);
};
```

### setHTML()

Sets the editor content to the provided HTML.

**Signature:**
```tsx
setHTML(html: string): void
```

**Parameters:**
- `html` - HTML string to set as content

**Examples:**

```tsx
// Load content
editorRef.current?.setHTML('<p>New content</p>');

// Clear editor
editorRef.current?.setHTML('');

// Load from API
const loadContent = async () => {
  const response = await fetch('/api/content');
  const { html } = await response.json();
  editorRef.current?.setHTML(html);
};

// Restore from localStorage
const restored = localStorage.getItem('draft');
if (restored) {
  editorRef.current?.setHTML(restored);
}
```

### getText()

Returns plain text content (HTML stripped).

**Signature:**
```tsx
getText(): string
```

**Returns:** `string` - Plain text without HTML tags

**Examples:**

```tsx
// Get plain text
const text = editorRef.current?.getText();
console.log(text);
// "Hello world\nHeading\n..."

// Word count
const wordCount = editorRef.current?.getText().split(/\s+/).length;

// Character count
const charCount = editorRef.current?.getText().length;

// Search in content
const text = editorRef.current?.getText();
const hasKeyword = text.includes('important');
```

### focus()

Focuses the editor.

**Signature:**
```tsx
focus(): void
```

**Examples:**

```tsx
// Focus on mount
useEffect(() => {
  editorRef.current?.focus();
}, []);

// Focus after save
const handleSave = async () => {
  await saveContent();
  editorRef.current?.focus();
};

// Focus in modal
const openEditor = () => {
  setModalOpen(true);
  setTimeout(() => {
    editorRef.current?.focus();
  }, 100);
};
```

### blur()

Removes focus from the editor.

**Signature:**
```tsx
blur(): void
```

**Examples:**

```tsx
// Blur on save
const handleSave = () => {
  saveContent();
  editorRef.current?.blur();
};

// Blur when closing modal
const closeModal = () => {
  editorRef.current?.blur();
  setModalOpen(false);
};
```

### insertBlock()

Inserts a new block at the current cursor position or at the end.

**Signature:**
```tsx
insertBlock(
  type: BlockType, 
  data?: Partial<BlockData>
): HTMLElement | null
```

**Parameters:**
- `type` - Block type to insert
- `data` - Optional block data (id, content, etc.)

**Returns:** `HTMLElement | null` - The created block element

**Block Types:**

```tsx
type BlockType =
  | 'paragraph'
  | 'heading'
  | 'bulletList'
  | 'numberedList'
  | 'checkList'
  | 'quote'
  | 'code'
  | 'image'
  | 'video'
  | 'divider'
  | 'callout'
  | 'accordion'
  | 'table'
  | 'linkPreview'
  | 'date'
  | 'excalidraw';
```

**Examples:**

```tsx
// Insert paragraph
editorRef.current?.insertBlock('paragraph');

// Insert heading with data
editorRef.current?.insertBlock('heading', {
  level: 1,
  content: 'My Heading',
});

// Insert code block
editorRef.current?.insertBlock('code', {
  language: 'javascript',
  code: 'console.log("Hello");',
});

// Insert quote
editorRef.current?.insertBlock('quote', {
  content: 'To be or not to be',
  attribution: 'Shakespeare',
});

// Insert image
editorRef.current?.insertBlock('image', {
  url: 'https://example.com/image.jpg',
  alt: 'Description',
  width: 800,
});

// Insert table
editorRef.current?.insertBlock('table', {
  rows: 3,
  cols: 3,
});

// Insert callout
editorRef.current?.insertBlock('callout', {
  type: 'info',
  content: 'Important information',
});

// Insert accordion
editorRef.current?.insertBlock('accordion', {
  title: 'Click to expand',
  content: '<p>Hidden content</p>',
  open: false,
});

// Insert link preview
editorRef.current?.insertBlock('linkPreview', {
  url: 'https://github.com/facebook/react',
});

// Insert divider
editorRef.current?.insertBlock('divider');

// Get the inserted element
const element = editorRef.current?.insertBlock('paragraph');
console.log(element?.getAttribute('data-block-id'));
```

### getEditor()

Returns the underlying EditorInstance for advanced operations.

**Signature:**
```tsx
getEditor(): EditorInstance | null
```

**Returns:** `EditorInstance | null` - Internal editor instance

**EditorInstance Methods:**

```tsx
interface EditorInstance {
  container: HTMLDivElement;
  getHTML: () => string;
  setHTML: (html: string) => void;
  insertBlock: (type: BlockType, data?: any) => HTMLElement | null;
  transformBlock: (block: HTMLElement, newType: BlockType, data?: any) => void;
  removeBlock: (blockId: string) => void;
  focus: () => void;
  undo: () => void;
  redo: () => void;
  // ... more internal methods
}
```

**Examples:**

```tsx
// Access container element
const editor = editorRef.current?.getEditor();
const container = editor?.container;

// Execute undo
const undo = () => {
  editorRef.current?.getEditor()?.undo();
};

// Execute redo
const redo = () => {
  editorRef.current?.getEditor()?.redo();
};

// Transform block
const editor = editorRef.current?.getEditor();
const block = document.querySelector('[data-block-id="abc"]');
if (block && editor) {
  editor.transformBlock(block as HTMLElement, 'heading', { level: 2 });
}

// Remove block
editorRef.current?.getEditor()?.removeBlock('block-id-123');
```

## Complete Example

```tsx
import { useRef, useState } from 'react';
import { AuthorlyEditor, EditorRef } from 'authorly-editor';

function FullFeaturedEditor() {
  const editorRef = useRef<EditorRef>(null);
  const [wordCount, setWordCount] = useState(0);

  // Get content
  const getContent = () => {
    const html = editorRef.current?.getHTML();
    console.log('HTML:', html);
  };

  // Set content
  const loadContent = (html: string) => {
    editorRef.current?.setHTML(html);
  };

  // Get stats
  const updateStats = () => {
    const text = editorRef.current?.getText() || '';
    const words = text.split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  };

  // Insert blocks
  const insertHeading = () => {
    editorRef.current?.insertBlock('heading', {
      level: 2,
      content: 'New Section',
    });
  };

  const insertQuote = () => {
    editorRef.current?.insertBlock('quote', {
      content: 'Inspirational quote here',
    });
  };

  const insertCode = () => {
    editorRef.current?.insertBlock('code', {
      language: 'typescript',
      code: '// Your code here',
    });
  };

  // Focus management
  const focusEditor = () => {
    editorRef.current?.focus();
  };

  // Undo/Redo
  const undo = () => {
    editorRef.current?.getEditor()?.undo();
  };

  const redo = () => {
    editorRef.current?.getEditor()?.redo();
  };

  // Save
  const save = async () => {
    const html = editorRef.current?.getHTML();
    await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify({ content: html }),
    });
  };

  return (
    <div>
      <div className="toolbar">
        <button onClick={insertHeading}>Add Heading</button>
        <button onClick={insertQuote}>Add Quote</button>
        <button onClick={insertCode}>Add Code</button>
        <button onClick={focusEditor}>Focus</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={save}>Save</button>
        <button onClick={getContent}>Get Content</button>
        <button onClick={() => loadContent('<p>Reset</p>')}>Reset</button>
        <span>Words: {wordCount}</span>
      </div>

      <AuthorlyEditor 
        ref={editorRef}
        onChange={updateStats}
        autoFocus
      />
    </div>
  );
}
```

## TypeScript Types

```tsx
import type { EditorRef, BlockType, BlockData } from 'authorly-editor';

// Ref type
const editorRef = useRef<EditorRef>(null);

// Block data types
interface HeadingData extends BlockData {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
}

interface CodeData extends BlockData {
  type: 'code';
  language: string;
  code: string;
}

interface ImageData extends BlockData {
  type: 'image';
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}
```

## Common Patterns

### Auto-save

```tsx
const [content, setContent] = useState('');

// Debounced save
const debouncedSave = useDebounce(() => {
  localStorage.setItem('draft', content);
}, 1000);

<AuthorlyEditor 
  ref={editorRef}
  onChange={(html) => {
    setContent(html);
    debouncedSave();
  }}
/>
```

### Content Validation

```tsx
const validateContent = () => {
  const text = editorRef.current?.getText() || '';
  
  if (text.length < 100) {
    alert('Content must be at least 100 characters');
    return false;
  }
  
  return true;
};

const handlePublish = () => {
  if (validateContent()) {
    publish();
  }
};
```

### Template Insertion

```tsx
const insertTemplate = (templateName: string) => {
  const templates = {
    blog: () => {
      editorRef.current?.insertBlock('heading', { level: 1, content: 'Blog Title' });
      editorRef.current?.insertBlock('paragraph', { content: 'Introduction...' });
      editorRef.current?.insertBlock('heading', { level: 2, content: 'Section 1' });
      editorRef.current?.insertBlock('paragraph');
    },
    article: () => {
      editorRef.current?.insertBlock('heading', { level: 1, content: 'Article Title' });
      editorRef.current?.insertBlock('quote', { content: 'Key takeaway' });
      editorRef.current?.insertBlock('paragraph');
    },
  };

  templates[templateName]?.();
};
```

### Export Content

```tsx
const exportAsMarkdown = () => {
  const text = editorRef.current?.getText();
  const blob = new Blob([text], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'document.md';
  a.click();
};

const exportAsJSON = () => {
  const html = editorRef.current?.getHTML();
  const json = JSON.stringify({ content: html }, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'document.json';
  a.click();
};
```

## Best Practices

1. **Check for null**: Always use optional chaining (`?.`) since ref may be null
2. **Wait for mount**: Don't call methods before component mounts
3. **Use refs**: Store editor instance in ref, not state
4. **Debounce onChange**: Avoid expensive operations on every change
5. **Handle async**: Make save handlers async for API calls

## See Also

- [Editor Props](/docs/api/editor-props) - Component props reference
- [Events API](/docs/api/events) - Event handling
- [AuthorlyEditor](/docs/components/editor) - Component documentation
- [Quick Start](/docs/quick-start) - Getting started guide
