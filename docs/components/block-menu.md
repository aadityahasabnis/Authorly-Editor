# BlockMenu

The `BlockMenu` component is a powerful slash command menu that appears when you type `/` in the editor. It provides quick access to all 16 block types with fuzzy search and keyboard navigation.

## Features

- Triggered by typing `/` in the editor
- Fuzzy search across block names, descriptions, and keywords
- Keyboard navigation (↑↓ arrows)
- Mouse hover selection
- Auto-scrolling to keep selected item visible
- 16 block types available (paragraph, headings, lists, media, etc.)
- Automatic positioning to stay in viewport
- Click-outside to close

## Import

```tsx
import { BlockMenu } from 'authorly-editor';
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `editor` | `EditorInstance` | (required) Editor instance |
| `position` | `Point` | (required) Position object with `x` and `y` coordinates |
| `onSelect` | `(type: BlockType, data?: Record<string, any>, inline?: boolean) => void` | (required) Callback when block is selected |
| `onClose` | `() => void` | (required) Callback to close the menu |

## Usage

The BlockMenu is typically managed internally by the AuthorlyEditor. You don't need to use it directly unless building a custom editor implementation.

### Internal Usage (Automatic)

```tsx
import { AuthorlyEditor } from 'authorly-editor';

// The editor handles the BlockMenu automatically
// Just type '/' in the editor to trigger it
function MyEditor() {
  return <AuthorlyEditor placeholder="Type / for commands" />;
}
```

### Custom Implementation

If you're building a custom editor, you can use BlockMenu directly:

```tsx
import { useState } from 'react';
import { BlockMenu, EditorInstance } from 'authorly-editor';

function CustomEditor() {
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const editorRef = useRef<EditorInstance>(null);

  const handleSelect = (type: BlockType, data?: Record<string, any>, inline?: boolean) => {
    if (editorRef.current) {
      if (inline) {
        // Insert inline (e.g., date)
        editorRef.current.insertInline(type, data);
      } else {
        // Insert as block
        editorRef.current.insertBlock(type, data);
      }
    }
    setMenuPosition(null);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  return (
    <div>
      {/* Your editor implementation */}
      
      {menuPosition && editorRef.current && (
        <BlockMenu
          editor={editorRef.current}
          position={menuPosition}
          onSelect={handleSelect}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
```

## Available Blocks

The BlockMenu provides access to the following block types:

### Text Blocks
1. **Paragraph** - Plain text paragraph
   - Keywords: `text`, `paragraph`, `p`
2. **Heading 1** - Large section heading
   - Keywords: `h1`, `heading`, `title`, `header`
3. **Heading 2** - Medium section heading
   - Keywords: `h2`, `heading`, `subtitle`
4. **Heading 3** - Small section heading
   - Keywords: `h3`, `heading`

### Lists
5. **Bullet List** - Create a bulleted list
   - Keywords: `bullet`, `list`, `ul`, `unordered`
6. **Numbered List** - Create a numbered list
   - Keywords: `number`, `list`, `ol`, `ordered`
7. **Checklist** - Track tasks with checkboxes
   - Keywords: `check`, `todo`, `task`, `checkbox`

### Content Blocks
8. **Quote** - Capture a quote
   - Keywords: `quote`, `blockquote`, `citation`
9. **Code Block** - Display code with syntax highlighting
   - Keywords: `code`, `pre`, `syntax`, `programming`
10. **Callout** - Highlight important information
    - Keywords: `callout`, `alert`, `info`, `warning`, `note`
11. **Accordion** - Collapsible content section
    - Keywords: `accordion`, `collapse`, `toggle`, `details`

### Media
12. **Image** - Upload or embed an image
    - Keywords: `image`, `picture`, `photo`, `img`
13. **Video** - Embed a video from YouTube, Vimeo, etc.
    - Keywords: `video`, `youtube`, `vimeo`, `embed`
14. **Table** - Add a table
    - Keywords: `table`, `grid`, `rows`, `columns`

### Special Blocks
15. **Divider** - Visual separator between sections
    - Keywords: `divider`, `hr`, `line`, `separator`
16. **Link Preview** - Rich preview card for URLs
    - Keywords: `link`, `url`, `preview`, `embed`, `opengraph`
17. **Date** - Insert formatted date (inline)
    - Keywords: `date`, `time`, `calendar`, `today`

## Search Examples

```tsx
// Type "/" followed by your search term in the editor

// Search by name:
/heading      → Shows "Heading 1", "Heading 2", "Heading 3"
/code         → Shows "Code Block"

// Search by keyword:
/todo         → Shows "Checklist"
/h1           → Shows "Heading 1"
/ul           → Shows "Bullet List"

// Search by description:
/collapse     → Shows "Accordion"
/syntax       → Shows "Code Block"
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `↓` | Move selection down |
| `↑` | Move selection up |
| `Enter` | Insert selected block |
| `Esc` | Close menu |
| Type to search | Filter blocks by keyword |

## Menu Behavior

### Positioning
- The menu automatically positions itself near the cursor
- If too close to viewport edge, it shifts to stay visible
- Maximum width: 320px
- Maximum height: 400px (scrollable)

### Auto-scroll
- Selected items automatically scroll into view
- Smooth scrolling behavior
- Keeps selection visible during keyboard navigation

### Click-outside
- Clicking outside the menu closes it
- Clicking inside keeps it open
- Selecting a block closes the menu

## BlockMenuItem Structure

```tsx
interface BlockMenuItem {
  type: BlockType;           // Block type identifier
  label: string;             // Display name
  description: string;       // Short description
  icon: LucideIcon;         // Icon component
  keywords: string[];        // Search keywords
  data?: Record<string, any>; // Additional data (e.g., { level: 1 } for headings)
  inline?: boolean;          // If true, inserts inline instead of as block
}
```

## Custom Styling

The BlockMenu uses scoped CSS classes:

```css
/* Menu container */
.cb-block-menu {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 320px;
  max-height: 400px;
  overflow: hidden;
}

/* Search input */
.cb-block-menu-search {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.cb-block-menu-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
}

/* Menu list */
.cb-block-menu-list {
  max-height: 300px;
  overflow-y: auto;
}

/* Menu item */
.cb-block-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  cursor: pointer;
  background: white;
  border: none;
  width: 100%;
  text-align: left;
  transition: background 0.15s;
}

.cb-block-menu-item:hover,
.cb-block-menu-item-selected {
  background: #f3f4f6;
}

/* Item icon */
.cb-block-menu-item-icon {
  flex-shrink: 0;
  color: #6b7280;
}

/* Item content */
.cb-block-menu-item-content {
  flex: 1;
  min-width: 0;
}

.cb-block-menu-item-label {
  display: block;
  font-weight: 500;
  font-size: 14px;
  color: #111827;
}

.cb-block-menu-item-description {
  display: block;
  font-size: 12px;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Footer */
.cb-block-menu-footer {
  display: flex;
  gap: 16px;
  padding: 8px 12px;
  border-top: 1px solid #e5e7eb;
  font-size: 11px;
  color: #6b7280;
}

/* Empty state */
.cb-block-menu-empty {
  padding: 20px;
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
}
```

## Common Patterns

### Trigger Position Calculation

```tsx
function calculateMenuPosition(event: KeyboardEvent): { x: number; y: number } {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return { x: 0, y: 0 };

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  return {
    x: rect.left + window.scrollX,
    y: rect.bottom + window.scrollY + 4,
  };
}
```

### Custom Block List

If you want to customize which blocks appear:

```tsx
// Filter out certain blocks
const customItems = BLOCK_MENU_ITEMS.filter(
  item => !['divider', 'accordion'].includes(item.type)
);

// Or add custom blocks
const customItems = [
  ...BLOCK_MENU_ITEMS,
  {
    type: 'myCustomBlock',
    label: 'Custom Block',
    description: 'My custom block type',
    icon: CustomIcon,
    keywords: ['custom', 'special'],
  },
];
```

### Dark Mode Support

```tsx
// The menu inherits colors from parent, but you can customize:
.dark .cb-block-menu {
  background: #1e293b;
  border-color: #334155;
}

.dark .cb-block-menu-item:hover {
  background: #334155;
}

.dark .cb-block-menu-item-label {
  color: #f1f5f9;
}
```

## How It Works

1. **User types `/`**: Editor detects slash character
2. **Menu appears**: Positioned at cursor location
3. **User types search**: Menu filters blocks in real-time
4. **User navigates**: Arrow keys or mouse hover
5. **User selects**: Enter key or click
6. **Block inserted**: `onSelect` callback fires with block type and data
7. **Menu closes**: Automatically after selection

## Integration with Editor

The AuthorlyEditor automatically manages the BlockMenu:

```tsx
// Inside Editor.tsx (simplified)
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === '/') {
    const position = getCursorPosition();
    setMenuPosition(position);
  }
};

const handleMenuSelect = (type: BlockType, data?: any, inline?: boolean) => {
  if (inline) {
    // Insert date, time, etc.
    insertInlineElement(type, data);
  } else {
    // Transform current block or insert new one
    insertBlock(type, data);
  }
  setMenuPosition(null);
};
```

## Inline vs Block Insertion

Some menu items insert inline (like Date) instead of as blocks:

```tsx
// Block insertion (default)
{ type: 'heading', label: 'Heading 1', inline: false }
// Creates a new <div data-block-type="heading">

// Inline insertion
{ type: 'date', label: 'Date', inline: true }
// Inserts <span class="cb-date-inline"> in current block
```

## Accessibility

- `role="listbox"` for screen readers
- `aria-label` on search input
- `role="option"` on menu items
- `aria-selected` shows current selection
- Full keyboard navigation support

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Uses DOM APIs (getBoundingClientRect, scrollIntoView)
- Smooth scrolling where supported

## Performance

- Efficient filtering with lowercase comparison
- Uses `useCallback` for event handlers
- Ref map for item elements
- Debounced scroll events

## See Also

- [AuthorlyEditor](/docs/components/editor) - Main editor component
- [Toolbar](/docs/components/toolbar) - Alternative way to insert blocks
- [Block Types](/docs/blocks/paragraph) - Documentation for all block types
- [Keyboard Shortcuts](/docs/guides/shortcuts) - Full shortcut reference
