# Toolbar

The `Toolbar` component provides a rich set of formatting and editing controls for the editor. It includes text formatting, block insertion, alignment, colors, and export functionality.

## Features

- Text formatting (bold, italic, underline, strikethrough, code)
- Link insertion with hover preview
- Text and highlight color pickers
- Alignment controls
- Heading shortcuts (H1-H6)
- Block insertion (lists, quotes, code, media)
- Date and time insertion
- Text case transformation (uppercase, lowercase, capitalize)
- Export to HTML and PDF
- Undo/Redo
- Dark mode support
- Keyboard shortcuts
- Floating popovers for complex inputs

## Import

```tsx
import { Toolbar } from 'authorly-editor';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `editor` | `EditorInstance` | (required) | Editor instance to control |
| `className` | `string` | `''` | Additional CSS class name |
| `position` | `'top' \| 'bottom' \| 'floating'` | `undefined` | Toolbar positioning |
| `darkMode` | `boolean` | `false` | Enable dark mode styling |

## Basic Usage

```tsx
import { useRef } from 'react';
import { AuthorlyEditor, Toolbar, EditorRef } from 'authorly-editor';

function EditorWithToolbar() {
  const editorRef = useRef<EditorRef>(null);

  return (
    <div>
      <Toolbar 
        editor={editorRef.current} 
        darkMode={false}
      />
      
      <AuthorlyEditor 
        ref={editorRef}
        placeholder="Start typing..."
      />
    </div>
  );
}
```

## Dark Mode

```tsx
import { useState } from 'react';

function DarkModeToolbar() {
  const [isDark, setIsDark] = useState(false);
  const editorRef = useRef<EditorRef>(null);

  return (
    <div className={isDark ? 'dark' : ''}>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle Dark Mode
      </button>
      
      <Toolbar 
        editor={editorRef.current} 
        darkMode={isDark}
      />
      
      <AuthorlyEditor 
        ref={editorRef}
        darkMode={isDark}
      />
    </div>
  );
}
```

## Toolbar Groups

The toolbar organizes buttons into logical groups:

### 1. History
- **Undo** (`Ctrl+Z`) - Undo last action
- **Redo** (`Ctrl+Y`) - Redo undone action

### 2. Text Formatting
- **Bold** (`Ctrl+B`) - Make text bold
- **Italic** (`Ctrl+I`) - Make text italic
- **Underline** (`Ctrl+U`) - Underline text
- **Strikethrough** - Strike through text
- **Inline Code** - Format as inline code

### 3. Rich Text
- **Link** - Insert or edit hyperlinks
- **Highlight** - Highlight text with colors
- **Text Color** - Change text color (10 colors)
- **Text Case** - Transform to uppercase, lowercase, or capitalize
- **Date** - Insert current date (Today, Tomorrow, Yesterday)
- **Time** - Insert current time with timezone

### 4. Alignment
- **Align Left** - Left align block
- **Align Center** - Center align block
- **Align Right** - Right align block

### 5. Headings
- **Heading 1** (`Ctrl+1`) - Insert H1
- **Heading 2** (`Ctrl+2`) - Insert H2
- **Heading 3** (`Ctrl+3`) - Insert H3

### 6. Blocks
- **Bullet List** - Insert bullet list
- **Numbered List** - Insert numbered list
- **Checklist** - Insert checklist
- **Quote** - Insert blockquote
- **Code Block** - Insert code block

### 7. Media
- **Image** - Insert image
- **Video** - Insert video embed
- **Excalidraw** - Insert drawing canvas
- **Table** - Insert table
- **Callout** - Insert callout block
- **Accordion** - Insert collapsible accordion
- **Divider** - Insert horizontal divider

### 8. Utilities
- **Clear Formatting** - Remove all text formatting
- **Export HTML** - Download as HTML file
- **Export PDF** - Print/save as PDF

## Link Preview

The toolbar shows an interactive preview when hovering over links:

```tsx
// Links created in the editor show a preview popup on hover
// The preview includes:
// - Link URL
// - "Visit" button (opens in new tab)
// - "Edit" button (opens link editor)
// - "Remove" button (removes link formatting)
```

The link preview appears after 300ms hover and stays visible while hovering over the popup.

## Color Pickers

### Highlight Colors
10 highlight colors available:
- Yellow, Green, Blue, Red, Purple
- Orange, Teal, Pink, Gray, None (removes highlight)

### Text Colors
10 text colors available:
- Black, Gray, Red, Orange, Yellow
- Green, Cyan, Blue, Purple, Pink

```tsx
// Colors are applied to selected text
// Clicking a color in the popover applies it immediately
```

## Date and Time Insertion

### Date Insertion
Insert dates inline with quick options:

```tsx
// Quick options:
// - Today
// - Tomorrow
// - Yesterday

// Creates a <span class="cb-date-inline"> element
// Hovering over the date shows a calendar for editing
```

### Time Insertion
Insert times with custom picker:

```tsx
// Configure:
// - Hour (1-12)
// - Minute (00-59)
// - Period (AM/PM)
// - Timezone (IST, UTC, etc.)

// Creates a <span class="cb-time-inline"> element
// Hovering shows time picker for editing
```

## Text Case Transformation

Transform selected text case:

```tsx
// Options:
// - Lowercase: "hello world"
// - Uppercase: "HELLO WORLD"
// - Capitalize: "Hello World"

// Clicking the same transformation again reverts to original
```

## Export Functions

### Export HTML

```tsx
// Downloads a complete HTML file with:
// - DOCTYPE and meta tags
// - Embedded styles
// - Full document structure
```

### Export PDF

```tsx
// Opens browser print dialog with:
// - A4 page size
// - Professional typography
// - Optimized for printing
// - Page break handling
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+B` | Bold |
| `Ctrl+I` | Italic |
| `Ctrl+U` | Underline |
| `Ctrl+1` | Heading 1 |
| `Ctrl+2` | Heading 2 |
| `Ctrl+3` | Heading 3 |

## Custom Styling

The toolbar uses scoped CSS classes:

```css
/* Main toolbar container */
.cb-toolbar {
  display: flex;
  gap: 8px;
  padding: 8px;
  border: 1px solid #e5e7eb;
  background: white;
}

/* Dark mode */
.cb-toolbar-dark {
  background: #1e293b;
  border-color: #334155;
}

/* Button group */
.cb-toolbar-group {
  display: flex;
  gap: 2px;
  border-right: 1px solid #e5e7eb;
  padding-right: 8px;
}

/* Individual button */
.cb-toolbar-btn {
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s;
}

.cb-toolbar-btn:hover {
  background: #f3f4f6;
}

/* Active state */
.cb-toolbar-btn-active {
  background: #dbeafe;
  color: #2563eb;
}

/* Popovers */
.cb-popover {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 240px;
}
```

## Common Patterns

### Sticky Toolbar

```tsx
<div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
  <Toolbar editor={editorRef.current} />
</div>
```

### Minimal Toolbar

You can create a custom toolbar with only specific buttons by accessing the editor methods directly:

```tsx
import { toggleBold, toggleItalic } from 'authorly-editor';

function MinimalToolbar({ editor }: { editor: EditorInstance }) {
  return (
    <div className="minimal-toolbar">
      <button onClick={() => toggleBold(editor.container)}>
        <b>B</b>
      </button>
      <button onClick={() => toggleItalic(editor.container)}>
        <i>I</i>
      </button>
    </div>
  );
}
```

### Toolbar Position

```tsx
// Top toolbar
<div className="editor-container">
  <Toolbar editor={editorRef.current} position="top" />
  <AuthorlyEditor ref={editorRef} />
</div>

// Bottom toolbar
<div className="editor-container">
  <AuthorlyEditor ref={editorRef} />
  <Toolbar editor={editorRef.current} position="bottom" />
</div>
```

### With Custom Export

```tsx
function EditorWithCustomExport() {
  const editorRef = useRef<EditorRef>(null);

  const handleCustomExport = () => {
    const html = editorRef.current?.getHTML();
    if (html) {
      // Send to API
      fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify({ content: html }),
      });
    }
  };

  return (
    <>
      <Toolbar editor={editorRef.current} />
      <AuthorlyEditor ref={editorRef} />
      <button onClick={handleCustomExport}>
        Save to Server
      </button>
    </>
  );
}
```

## How It Works

1. **Button Clicks**: Most toolbar buttons execute commands on the editor via the `EditorInstance`
2. **Selection Preservation**: The toolbar saves the current selection before opening popovers to maintain cursor position
3. **Format Detection**: Uses `document.queryCommandState()` to show active formatting states
4. **Popover Positioning**: Calculates position relative to the clicked button
5. **Hover Previews**: Uses event listeners on the editor container to detect link/date hovers

## Notes

- The toolbar requires an editor instance to function
- Pass `null` initially and update when the editor ref is available
- Popovers automatically close when clicking outside
- Link previews use a 300ms delay to prevent accidental triggers
- Date and time elements are `contenteditable="false"` to prevent direct editing
- Export functions use browser APIs (Blob, print dialog)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses `document.execCommand` for some formatting (deprecated but still supported)
- PDF export uses browser print functionality
- Color pickers work in all browsers

## Accessibility

- All buttons have `aria-label` and `title` attributes
- Keyboard shortcuts are indicated in tooltips
- Role attributes (`toolbar`, `group`) for screen readers
- Buttons show `aria-pressed` state when active

## See Also

- [AuthorlyEditor](/docs/components/editor) - Main editor component
- [BlockMenu](/docs/components/block-menu) - Slash command menu
- [Keyboard Shortcuts Guide](/docs/guides/shortcuts) - Full shortcut reference
