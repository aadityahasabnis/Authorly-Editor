// Documentation content - static content for SSG
export interface DocPage {
  slug: string;
  title: string;
  description: string;
  content: string;
}

export const docsContent: Record<string, DocPage> = {
  // ============================================
  // GETTING STARTED
  // ============================================
  'index': {
    slug: '',
    title: 'Introduction',
    description: 'Learn about Authorly, the rich text editor for blogs and publishing.',
    content: `# Introduction

Authorly is a lightweight, block-based rich text editor for React that outputs clean, semantic HTML.

## Why Authorly?

Unlike other rich text editors that output complex JSON structures or proprietary formats, Authorly produces **pure HTML** that you can store directly in your database and render anywhere.

### Key Benefits

- **Pure HTML Output** — No proprietary formats, just clean semantic HTML
- **Lightweight** — Only ~30kb gzipped, no heavy dependencies
- **Block-Based** — Modern editing experience with 13+ block types
- **TypeScript** — Full type support out of the box
- **Customizable** — Easy to style and extend

## Quick Example

\`\`\`tsx
import { ContentBlocksEditor } from 'authorly-editor';
import 'authorly-editor/styles';

function App() {
  const [content, setContent] = useState('<p>Hello World!</p>');

  return (
    <ContentBlocksEditor
      initialContent={content}
      onChange={setContent}
    />
  );
}
\`\`\`

Ready to get started? Head to the [Installation](/docs/installation) guide.`,
  },

  'installation': {
    slug: 'installation',
    title: 'Installation',
    description: 'How to install Authorly in your React project.',
    content: `# Installation

Install Authorly using your preferred package manager.

## npm

\`\`\`bash
npm install authorly-editor
\`\`\`

## yarn

\`\`\`bash
yarn add authorly-editor
\`\`\`

## pnpm

\`\`\`bash
pnpm add authorly-editor
\`\`\`

## Requirements

- React 17.0.0 or higher
- React DOM 17.0.0 or higher

## Importing Styles

Don't forget to import the CSS styles in your application:

\`\`\`tsx
// In your app's entry point or layout
import 'authorly-editor/styles';
\`\`\`

## Next.js Setup

For Next.js applications, you'll need to use dynamic imports to avoid SSR issues:

\`\`\`tsx
import dynamic from 'next/dynamic';

const ContentBlocksEditor = dynamic(
  () => import('authorly-editor').then((mod) => mod.ContentBlocksEditor),
  { ssr: false }
);
\`\`\`

See the [Next.js Integration](/docs/guides/nextjs) guide for more details.`,
  },

  'quick-start': {
    slug: 'quick-start',
    title: 'Quick Start',
    description: 'Get up and running with Authorly in minutes.',
    content: `# Quick Start

This guide will help you set up a basic editor in just a few minutes.

## Basic Setup

\`\`\`tsx
import { useState } from 'react';
import { ContentBlocksEditor } from 'authorly-editor';
import 'authorly-editor/styles';

function MyEditor() {
  const [content, setContent] = useState('<p>Start writing...</p>');

  return (
    <ContentBlocksEditor
      initialContent={content}
      onChange={setContent}
    />
  );
}
\`\`\`

## With Save Handler

\`\`\`tsx
function MyEditor() {
  const [content, setContent] = useState('');

  const handleSave = async (html: string) => {
    await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify({ content: html }),
    });
  };

  return (
    <ContentBlocksEditor
      initialContent={content}
      onChange={setContent}
      onSave={handleSave}  // Triggered by Ctrl+S
    />
  );
}
\`\`\`

## Dark Mode

\`\`\`tsx
<ContentBlocksEditor
  darkMode={true}
  initialContent={content}
  onChange={setContent}
/>
\`\`\`

## Displaying Content

Use the Renderer component to display saved content:

\`\`\`tsx
import { ContentBlocksRenderer } from 'authorly-editor';

function BlogPost({ content }) {
  return (
    <ContentBlocksRenderer
      html={content}
      enableCodeCopy={true}
      enableHeadingIds={true}
    />
  );
}
\`\`\`

Next, learn about all the available [Components](/docs/components/editor).`,
  },

  // ============================================
  // COMPONENTS
  // ============================================
  'components/editor': {
    slug: 'components/editor',
    title: 'Editor Component',
    description: 'The main ContentBlocksEditor component API reference.',
    content: `# ContentBlocksEditor

The main editor component for creating and editing content.

## Import

\`\`\`tsx
import { ContentBlocksEditor } from 'authorly-editor';
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| initialContent | string | '' | Initial HTML content |
| onChange | (html: string) => void | - | Called on content change |
| onSave | (html: string) => void | - | Called on Ctrl+S |
| darkMode | boolean | false | Enable dark theme |
| showToolbar | boolean | true | Show formatting toolbar |
| toolbarPosition | 'top' or 'bottom' | 'top' | Toolbar position |
| placeholder | string | 'Type "/" for commands...' | Placeholder text |
| readOnly | boolean | false | Disable editing |
| autoFocus | boolean | false | Focus on mount |
| className | string | '' | Custom class name |

## Basic Usage

\`\`\`tsx
<ContentBlocksEditor
  initialContent="<p>Hello World</p>"
  onChange={(html) => console.log(html)}
  darkMode={false}
  showToolbar={true}
/>
\`\`\`

See [Editor Ref](/docs/api/editor-ref) for available methods.`,
  },

  'components/renderer': {
    slug: 'components/renderer',
    title: 'Renderer Component',
    description: 'The ContentBlocksRenderer component for displaying content.',
    content: `# ContentBlocksRenderer

Display saved HTML content with beautiful styling and optional enhancements.

## Import

\`\`\`tsx
import { ContentBlocksRenderer } from 'authorly-editor';
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| html | string | '' | HTML content to render |
| darkMode | boolean | false | Enable dark theme |
| enableCodeCopy | boolean | true | Add copy button to code blocks |
| enableHeadingIds | boolean | true | Add IDs to headings for linking |
| className | string | '' | Custom class name |

## Basic Usage

\`\`\`tsx
import { ContentBlocksRenderer } from 'authorly-editor';

function BlogPost({ content }) {
  return (
    <ContentBlocksRenderer html={content} />
  );
}
\`\`\`

## Why Use the Renderer?

The Renderer component:

1. **Sanitizes HTML** — Protects against XSS attacks
2. **Adds enhancements** — Code copy buttons, heading IDs
3. **Applies consistent styling** — Matches the editor's appearance
4. **Handles dark mode** — Automatic theme support`,
  },

  'components/toc': {
    slug: 'components/toc',
    title: 'Table of Contents',
    description: 'Auto-generate navigation from your content headings.',
    content: `# TableOfContents

Automatically generate a table of contents from your HTML headings.

## Import

\`\`\`tsx
import { TableOfContents } from 'authorly-editor';
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| html | string | '' | HTML to extract headings from |
| darkMode | boolean | false | Enable dark theme |
| title | string | 'Table of Contents' | Title text |
| maxLevel | number | 6 | Maximum heading level (1-6) |

## Basic Usage

\`\`\`tsx
<TableOfContents html={content} />
\`\`\`

## Documentation Layout

\`\`\`tsx
import { ContentBlocksRenderer, TableOfContents } from 'authorly-editor';

function DocsPage({ content }) {
  return (
    <div className="flex gap-8">
      <aside className="w-64 sticky top-4">
        <TableOfContents 
          html={content} 
          title="On this page"
          maxLevel={3}
        />
      </aside>
      <main className="flex-1">
        <ContentBlocksRenderer 
          html={content}
          enableHeadingIds={true}
        />
      </main>
    </div>
  );
}
\`\`\`

**Important:** Make sure to enable enableHeadingIds on the Renderer for links to work.`,
  },

  'components/toolbar': {
    slug: 'components/toolbar',
    title: 'Toolbar Component',
    description: 'The formatting toolbar for text styling and block formatting.',
    content: `# Toolbar Component

The toolbar provides quick access to text formatting and block conversion options.

## Built-in Toolbar

The toolbar is automatically included with the editor.

\`\`\`tsx
<ContentBlocksEditor
  showToolbar={true}          // Show toolbar (default: true)
  toolbarPosition="top"       // Position: 'top' or 'bottom'
/>
\`\`\`

## Toolbar Features

### Text Formatting
- **Bold** - Ctrl/Cmd + B
- **Italic** - Ctrl/Cmd + I
- **Underline** - Ctrl/Cmd + U
- **Strikethrough** - Ctrl/Cmd + Shift + S
- **Inline Code** - Ctrl/Cmd + Shift + X
- **Link** - Ctrl/Cmd + K

### Block Types
- Paragraph
- Headings (H1-H6)
- Lists (bullet, numbered, checklist)
- Blockquote
- Code block
- Callout
- Divider

## Customizing Toolbar

### Hide Toolbar

\`\`\`tsx
<ContentBlocksEditor showToolbar={false} />
\`\`\`

### Toolbar Position

\`\`\`tsx
// Toolbar at bottom
<ContentBlocksEditor toolbarPosition="bottom" />

// Toolbar at top (default)
<ContentBlocksEditor toolbarPosition="top" />
\`\`\``,
  },

  // ============================================
  // BLOCKS
  // ============================================
  'blocks': {
    slug: 'blocks',
    title: 'Blocks Overview',
    description: 'Overview of all available block types in Authorly.',
    content: `# Blocks Overview

Authorly supports 13+ block types for rich content creation.

## Text Blocks

### [Paragraph](/docs/blocks/paragraph)
The default text block for writing content. Supports inline formatting.

### [Headings](/docs/blocks/headings)
Six heading levels (H1-H6) for document structure.

## List Blocks

### [Lists](/docs/blocks/lists)
Three list types: bullet lists, numbered lists, and interactive checklists.

## Content Blocks

### [Code Block](/docs/blocks/code-block)
Syntax-highlighted code with language detection and copy functionality.

### [Blockquote](/docs/blocks/blockquote)
Beautiful quotes with optional attribution and styling.

### [Image](/docs/blocks/image)
Responsive images with captions, alt text, and size controls.

### [Table](/docs/blocks/table)
Interactive tables with add/remove rows and columns.

### [Callout](/docs/blocks/callout)
Highlighted content blocks with icons and custom colors.

### [Divider](/docs/blocks/divider)
Visual separators between content sections.

## Block Features

### Universal Actions
- **Drag & Drop** — Reorder any block
- **Block Menu** — Type / to insert blocks
- **Convert** — Change block types easily
- **Delete** — Select block and press Delete

### Markdown Support

| Input | Result |
|-------|--------|
| # | Heading 1 |
| ## | Heading 2 |
| - | Bullet list |
| 1. | Numbered list |
| > | Blockquote |
| --- | Divider |`,
  },

  'blocks/paragraph': {
    slug: 'blocks/paragraph',
    title: 'Paragraph Block',
    description: 'The fundamental text block for writing content.',
    content: `# Paragraph Block

The paragraph block is the foundation of content in Authorly.

## Features

### Inline Formatting
- **Bold** (Ctrl/Cmd + B)
- *Italic* (Ctrl/Cmd + I)
- Underline (Ctrl/Cmd + U)
- Strikethrough (Ctrl/Cmd + Shift + S)
- Inline code (Ctrl/Cmd + Shift + X)
- Links (Ctrl/Cmd + K)

### Line Breaks
- **Hard break** — Shift + Enter
- **New paragraph** — Enter

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Enter | New paragraph |
| Shift + Enter | Line break |
| Ctrl/Cmd + A | Select all text |
| Backspace | Delete empty paragraph |

## HTML Output

\`\`\`html
<p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
\`\`\``,
  },

  'blocks/headings': {
    slug: 'blocks/headings',
    title: 'Heading Blocks',
    description: 'Structure your content with six heading levels.',
    content: `# Heading Blocks

Headings provide structure and hierarchy to your content.

## Features

### Six Levels
- **H1** — Main title (Ctrl/Cmd + 1)
- **H2** — Major sections (Ctrl/Cmd + 2)
- **H3** — Subsections (Ctrl/Cmd + 3)
- **H4-H6** — Minor headings

### Auto-Generated IDs
When using the Renderer with enableHeadingIds={true}, headings automatically get IDs for linking.

## Creating Headings

### Markdown Style
| Input | Result |
|-------|--------|
| # | H1 |
| ## | H2 |
| ### | H3 |
| #### | H4 |

### Block Menu
1. Type / to open block menu
2. Type "heading" or "h1", "h2", etc.
3. Select desired level

## Best Practices

- Use **H1** for main page title (once per page)
- Use **H2** for major sections
- Use **H3** for subsections
- Avoid skipping levels`,
  },

  'blocks/lists': {
    slug: 'blocks/lists',
    title: 'List Blocks',
    description: 'Create bullet lists, numbered lists, and interactive checklists.',
    content: `# List Blocks

Authorly supports three types of lists.

## List Types

### Bullet Lists
Unordered lists for general items.

### Numbered Lists
Ordered lists for sequences.

### Checklists
Interactive task lists with checkboxes.

## Creating Lists

### Markdown Style
| Input | Result |
|-------|--------|
| - or * | Bullet list |
| 1. | Numbered list |
| [ ] | Checklist (unchecked) |
| [x] | Checklist (checked) |

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| Enter | New list item |
| Tab | Indent item |
| Shift + Tab | Outdent item |
| Backspace | Exit list (if empty) |

## Nested Lists

All list types support nesting. Use Tab and Shift + Tab to control nesting levels.`,
  },

  'blocks/code-block': {
    slug: 'blocks/code-block',
    title: 'Code Block',
    description: 'Display syntax-highlighted code with language support.',
    content: `# Code Block

Display formatted code with syntax highlighting and language detection.

## Features

### Syntax Highlighting
- 100+ programming languages supported
- Automatic language detection
- Custom themes (light/dark mode)

### Copy Functionality
- One-click copy button
- Preserves formatting and indentation
- Works in both editor and renderer

## Creating Code Blocks

### Markdown Style
Type three backticks at the start of a line.

### Block Menu
1. Type /code or / then select "Code Block"
2. Choose language (optional)
3. Paste or type your code

## Supported Languages

- JavaScript/TypeScript
- Python
- Java, C/C++, C#
- Go, Rust, PHP, Ruby
- HTML, CSS, JSON, SQL
- YAML, Bash/Shell`,
  },

  'blocks/blockquote': {
    slug: 'blocks/blockquote',
    title: 'Blockquote Block',
    description: 'Beautiful quotes with optional attribution and styling.',
    content: `# Blockquote Block

Create beautiful quotes and citations.

## Features

### Rich Formatting
- Supports inline formatting (bold, italic, links)
- Multi-paragraph quotes
- Attribution support
- Elegant styling

### Easy Creation
- Markdown-style shortcut (>)
- Block menu selection
- Convert from paragraphs

## Creating Blockquotes

### Markdown Style
Type > at the beginning of a line.

### Block Menu
1. Type / to open menu
2. Select "Blockquote" or type "quote"
3. Start typing your quote

## Best Practices

- Use for actual quotes, citations, or highlighted text
- Keep quotes concise and impactful
- Always provide attribution when possible`,
  },

  'blocks/image': {
    slug: 'blocks/image',
    title: 'Image Block',
    description: 'Responsive images with captions, alt text, and size controls.',
    content: `# Image Block

Add responsive images with captions, alt text, and flexible sizing options.

## Features

### Image Management
- Drag & drop upload
- URL input support
- Automatic optimization
- Responsive sizing

### Accessibility
- Alt text support
- Caption functionality
- Screen reader compatibility

### Customization
- Size controls (small, medium, large, full)
- Alignment options (left, center, right)
- Caption styling
- Link support

## Adding Images

### Upload Methods
1. **Drag & Drop** — Drag image files directly into editor
2. **File Selection** — Click to browse and select files
3. **URL Input** — Paste image URLs directly
4. **Copy & Paste** — Paste images from clipboard

## Best Practices

- Always include meaningful alt text
- Use captions for additional context
- Compress images before upload
- Choose correct format (JPEG for photos, PNG for graphics)`,
  },

  'blocks/table': {
    slug: 'blocks/table',
    title: 'Table Block',
    description: 'Interactive tables with add/remove rows and columns.',
    content: `# Table Block

Create and edit interactive tables.

## Features

### Interactive Editing
- Add/remove rows and columns
- Resize columns by dragging
- Cell-by-cell editing
- Header row support

### Navigation
- Tab to move between cells
- Arrow keys for navigation
- Enter to create new rows

## Creating Tables

### Block Menu
1. Type /table or / then select "Table"
2. Choose initial table size
3. Start editing cells

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| Tab | Next cell |
| Shift + Tab | Previous cell |
| Arrow keys | Navigate cells |

## Best Practices

- Keep table data concise and scannable
- Use headers to describe column content
- Always include header rows for accessibility`,
  },

  'blocks/callout': {
    slug: 'blocks/callout',
    title: 'Callout Block',
    description: 'Highlighted content blocks with icons and custom colors.',
    content: `# Callout Block

Create highlighted content blocks for important information.

## Features

### Visual Styling
- Multiple color themes (info, warning, success, error)
- Custom icons for each type
- Elegant borders and backgrounds
- Dark mode support

### Content Types
- **Info** — General information and tips
- **Warning** — Important warnings and cautions
- **Success** — Positive messages and confirmations
- **Error** — Error messages and critical alerts

## Creating Callouts

### Block Menu
1. Type /callout or / then select "Callout"
2. Choose callout type (info, warning, success, error)
3. Start typing your content

## Best Practices

- Highlight important information
- Use appropriate callout types for context
- Don't overuse callouts (max 2-3 per page)
- Make the content actionable when possible`,
  },

  'blocks/divider': {
    slug: 'blocks/divider',
    title: 'Divider Block',
    description: 'Visual separators between content sections.',
    content: `# Divider Block

Add visual separation between content sections.

## Features

### Visual Separation
- Clean horizontal lines
- Multiple style options
- Responsive design
- Theme integration

### Easy Creation
- Markdown shortcut (---)
- Block menu selection
- Automatic spacing

## Creating Dividers

### Markdown Style
Type three dashes at the beginning of a line: ---

### Block Menu
1. Type /divider or / then select "Divider"
2. Divider is inserted immediately

## Best Practices

### When to Use Dividers
- Between major content sections
- To separate different topics
- When transitioning between ideas

### When Not to Use
- Between every paragraph
- In place of proper headings
- In short content pieces`,
  },

  // ============================================
  // API REFERENCE
  // ============================================
  'api/editor-props': {
    slug: 'api/editor-props',
    title: 'Editor Props',
    description: 'Complete reference for ContentBlocksEditor props.',
    content: `# Editor Props

Complete reference for all ContentBlocksEditor props.

## Content Props

### initialContent
\`\`\`tsx
initialContent?: string
\`\`\`
The initial HTML content to load into the editor.

### onChange
\`\`\`tsx
onChange?: (html: string) => void
\`\`\`
Callback fired whenever the content changes.

### onSave
\`\`\`tsx
onSave?: (html: string) => void
\`\`\`
Callback fired when the user presses Ctrl+S.

## Appearance Props

### darkMode
\`\`\`tsx
darkMode?: boolean // default: false
\`\`\`
Enable dark theme styling.

### showToolbar
\`\`\`tsx
showToolbar?: boolean // default: true
\`\`\`
Show or hide the formatting toolbar.

### toolbarPosition
\`\`\`tsx
toolbarPosition?: 'top' | 'bottom' // default: 'top'
\`\`\`
Position the toolbar above or below the editor.

### placeholder
\`\`\`tsx
placeholder?: string // default: 'Type "/" for commands...'
\`\`\`
Placeholder text shown when the editor is empty.

## Behavior Props

### readOnly
\`\`\`tsx
readOnly?: boolean // default: false
\`\`\`
Disable all editing.

### autoFocus
\`\`\`tsx
autoFocus?: boolean // default: false
\`\`\`
Automatically focus the editor when mounted.

## Style Props

### className
\`\`\`tsx
className?: string
\`\`\`
Additional CSS class names.

### style
\`\`\`tsx
style?: React.CSSProperties
\`\`\`
Inline styles for the editor container.`,
  },

  'api/editor-ref': {
    slug: 'api/editor-ref',
    title: 'Editor Ref',
    description: 'Methods available through the editor ref.',
    content: `# Editor Ref

Access editor methods programmatically using a ref.

## Setup

\`\`\`tsx
import { useRef } from 'react';
import { ContentBlocksEditor, EditorRef } from 'authorly-editor';

function MyEditor() {
  const editorRef = useRef<EditorRef>(null);

  return <ContentBlocksEditor ref={editorRef} />;
}
\`\`\`

## Methods

### getHTML()
\`\`\`tsx
getHTML(): string
\`\`\`
Returns the current HTML content.

### setHTML(html)
\`\`\`tsx
setHTML(html: string): void
\`\`\`
Sets the editor content.

### getText()
\`\`\`tsx
getText(): string
\`\`\`
Returns plain text content (no HTML tags).

### focus()
\`\`\`tsx
focus(): void
\`\`\`
Focuses the editor.

### blur()
\`\`\`tsx
blur(): void
\`\`\`
Removes focus from the editor.

### insertBlock(type, data?)
\`\`\`tsx
insertBlock(type: string, data?: object): void
\`\`\`
Inserts a new block at the current position.

## Example: Save Button

\`\`\`tsx
function MyEditor() {
  const editorRef = useRef<EditorRef>(null);

  const handleSave = async () => {
    const html = editorRef.current?.getHTML();
    if (html) {
      await saveToDatabase(html);
    }
  };

  return (
    <>
      <ContentBlocksEditor ref={editorRef} />
      <button onClick={handleSave}>Save</button>
    </>
  );
}
\`\`\``,
  },

  'api/renderer-props': {
    slug: 'api/renderer-props',
    title: 'Renderer Props',
    description: 'Complete reference for ContentBlocksRenderer props.',
    content: `# Renderer Props

Complete reference for all ContentBlocksRenderer props.

## Required Props

### html
\`\`\`tsx
html: string
\`\`\`
The HTML content to render.

## Display Props

### darkMode
\`\`\`tsx
darkMode?: boolean // default: false
\`\`\`
Enable dark theme styling.

## Enhancement Props

### enableCodeCopy
\`\`\`tsx
enableCodeCopy?: boolean // default: true
\`\`\`
Add copy buttons to code blocks.

### enableHeadingIds
\`\`\`tsx
enableHeadingIds?: boolean // default: true
\`\`\`
Automatically generate IDs for headings.

### enableChecklistStyles
\`\`\`tsx
enableChecklistStyles?: boolean // default: true
\`\`\`
Apply interactive styling to checklist items.

## Style Props

### className
\`\`\`tsx
className?: string
\`\`\`
Additional CSS classes to apply.

### style
\`\`\`tsx
style?: React.CSSProperties
\`\`\`
Inline styles for the renderer container.

## Complete Example

\`\`\`tsx
function BlogPost({ content, isDark }) {
  return (
    <article className="max-w-4xl mx-auto px-4">
      <ContentBlocksRenderer
        html={content}
        darkMode={isDark}
        enableCodeCopy={true}
        enableHeadingIds={true}
        className="prose prose-lg"
      />
    </article>
  );
}
\`\`\``,
  },

  'api/events': {
    slug: 'api/events',
    title: 'Editor Events',
    description: 'Event handling and callback reference for the editor.',
    content: `# Editor Events

Complete reference for all editor events and callbacks.

## Content Events

### onChange
\`\`\`tsx
onChange?: (html: string) => void
\`\`\`
Fired whenever the content changes.

### onSave
\`\`\`tsx
onSave?: (html: string) => void
\`\`\`
Fired when user presses Ctrl/Cmd + S.

## Focus Events

### onFocus
\`\`\`tsx
onFocus?: () => void
\`\`\`
Fired when the editor gains focus.

### onBlur
\`\`\`tsx
onBlur?: () => void
\`\`\`
Fired when the editor loses focus.

## Lifecycle Events

### onReady
\`\`\`tsx
onReady?: (editor: EditorInstance) => void
\`\`\`
Fired when the editor is fully initialized.

## Image Events

### onImageUpload
\`\`\`tsx
onImageUpload?: (file: File) => Promise<string>
\`\`\`
Handle image uploads and return the final URL.

\`\`\`tsx
<ContentBlocksEditor
  onImageUpload={async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const { url } = await response.json();
    return url;
  }}
/>
\`\`\``,
  },

  // ============================================
  // GUIDES
  // ============================================
  'guides/styling': {
    slug: 'guides/styling',
    title: 'Styling & Theming',
    description: 'Customize the editor appearance with CSS variables.',
    content: `# Styling & Theming

Customize Authorly's appearance using CSS variables.

## CSS Variables

Override these variables to customize the editor:

\`\`\`css
.cb-editor {
  /* Colors */
  --cb-primary: #3b82f6;
  --cb-primary-hover: #2563eb;
  --cb-bg: #ffffff;
  --cb-bg-secondary: #f9fafb;
  --cb-text: #111827;
  --cb-text-secondary: #6b7280;
  --cb-border: #e5e7eb;

  /* Spacing */
  --cb-spacing-sm: 0.5rem;
  --cb-spacing-md: 1rem;
  --cb-spacing-lg: 1.5rem;

  /* Border radius */
  --cb-radius-sm: 0.25rem;
  --cb-radius-md: 0.375rem;
  --cb-radius-lg: 0.5rem;

  /* Typography */
  --cb-font-family: system-ui, -apple-system, sans-serif;
  --cb-font-mono: 'SF Mono', Monaco, Consolas, monospace;
}
\`\`\`

## Dark Mode

When darkMode={true}, the editor automatically adjusts colors:

\`\`\`css
.cb-editor.cb-dark {
  --cb-bg: #1f2937;
  --cb-bg-secondary: #374151;
  --cb-text: #f9fafb;
  --cb-text-secondary: #9ca3af;
  --cb-border: #4b5563;
}
\`\`\`

## Custom Theme Example

\`\`\`css
/* Purple theme */
.cb-editor.purple-theme {
  --cb-primary: #8b5cf6;
  --cb-primary-hover: #7c3aed;
  --cb-border-focus: #8b5cf6;
}
\`\`\`

\`\`\`tsx
<ContentBlocksEditor className="purple-theme" />
\`\`\``,
  },

  'guides/nextjs': {
    slug: 'guides/nextjs',
    title: 'Next.js Integration',
    description: 'How to use Authorly with Next.js App Router.',
    content: `# Next.js Integration

Authorly works great with Next.js, but requires special handling for SSR.

## The Problem

Authorly uses browser APIs and won't work during server-side rendering.

## Solution: Dynamic Import

Use Next.js dynamic imports with ssr: false:

\`\`\`tsx
// components/Editor.tsx
'use client';

import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
import type { EditorRef } from 'authorly-editor';

const ContentBlocksEditor = dynamic(
  () => import('authorly-editor').then((mod) => mod.ContentBlocksEditor),
  { 
    ssr: false,
    loading: () => <div>Loading editor...</div>
  }
);

interface EditorProps {
  initialContent?: string;
  onChange?: (html: string) => void;
  darkMode?: boolean;
}

const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  return <ContentBlocksEditor ref={ref} {...props} />;
});

Editor.displayName = 'Editor';
export default Editor;
\`\`\`

## Import Styles

In your layout or global CSS:

\`\`\`tsx
// app/layout.tsx
import 'authorly-editor/styles';
\`\`\`

## Usage in Pages

\`\`\`tsx
// app/editor/page.tsx
'use client';

import { useState } from 'react';
import Editor from '@/components/Editor';

export default function EditorPage() {
  const [content, setContent] = useState('<p>Hello</p>');

  return (
    <Editor
      initialContent={content}
      onChange={setContent}
    />
  );
}
\`\`\``,
  },

  'guides/custom-blocks': {
    slug: 'guides/custom-blocks',
    title: 'Custom Blocks',
    description: 'Create and register custom block types in Authorly.',
    content: `# Custom Blocks

Learn how to create and register custom block types.

## Overview

Custom blocks allow you to add specialized content types beyond the built-in blocks.

## Block Structure

Every block consists of:
1. **Block Definition** — Configuration and metadata
2. **Editor Component** — How it appears in edit mode
3. **Renderer Component** — How it appears when rendered
4. **Conversion Logic** — HTML input/output handling

## Creating a Custom Block

### Step 1: Define Block Schema

\`\`\`tsx
interface CustomBlockData {
  id: string;
  type: 'custom-embed';
  attributes: {
    url: string;
    title?: string;
  };
}
\`\`\`

### Step 2: Create Editor Component

\`\`\`tsx
import { BlockComponent } from 'authorly-editor';

export const CustomEmbedEditor: BlockComponent<CustomBlockData> = ({
  block,
  updateBlock,
  selected
}) => {
  const [url, setUrl] = useState(block.attributes.url || '');
  
  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    updateBlock({
      ...block,
      attributes: { ...block.attributes, url: newUrl }
    });
  };
  
  return (
    <div className="custom-embed-editor">
      <input
        type="url"
        value={url}
        onChange={(e) => handleUrlChange(e.target.value)}
        placeholder="Enter embed URL..."
      />
    </div>
  );
};
\`\`\`

### Step 3: Register the Block

\`\`\`tsx
import { registerBlock } from 'authorly-editor';

registerBlock({
  type: 'custom-embed',
  name: 'Custom Embed',
  description: 'Embed external content',
  category: 'media',
  editor: CustomEmbedEditor,
  renderer: CustomEmbedRenderer,
});
\`\`\``,
  },

  'guides/image-uploads': {
    slug: 'guides/image-uploads',
    title: 'Image Uploads',
    description: 'Handle image uploads with different storage providers.',
    content: `# Image Uploads

Learn how to implement image upload functionality.

## Basic Upload Handler

\`\`\`tsx
<ContentBlocksEditor
  onImageUpload={async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    const { url } = await response.json();
    return url;
  }}
/>
\`\`\`

## Cloudinary Integration

\`\`\`tsx
const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_upload_preset');
  
  const response = await fetch(
    'https://api.cloudinary.com/v1_1/YOUR_CLOUD/image/upload',
    { method: 'POST', body: formData }
  );
  
  const data = await response.json();
  return data.secure_url;
};

<ContentBlocksEditor onImageUpload={uploadToCloudinary} />
\`\`\`

## Image Validation

\`\`\`tsx
const validateImage = (file: File): void => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('File too large');
  }
};

<ContentBlocksEditor
  onImageUpload={async (file) => {
    validateImage(file);
    return await uploadImage(file);
  }}
/>
\`\`\``,
  },

  'guides/shortcuts': {
    slug: 'guides/shortcuts',
    title: 'Keyboard Shortcuts',
    description: 'All keyboard shortcuts available in the editor.',
    content: `# Keyboard Shortcuts

Authorly supports comprehensive keyboard shortcuts.

## Formatting

| Shortcut | Action |
|----------|--------|
| Ctrl/Cmd + B | Bold |
| Ctrl/Cmd + I | Italic |
| Ctrl/Cmd + U | Underline |
| Ctrl/Cmd + Shift + S | Strikethrough |
| Ctrl/Cmd + K | Insert link |
| Ctrl/Cmd + Shift + X | Inline code |

## Headings

| Shortcut | Action |
|----------|--------|
| Ctrl/Cmd + 1 | Heading 1 |
| Ctrl/Cmd + 2 | Heading 2 |
| Ctrl/Cmd + 3 | Heading 3 |
| Ctrl/Cmd + 0 | Paragraph |

## Actions

| Shortcut | Action |
|----------|--------|
| Ctrl/Cmd + S | Save |
| Ctrl/Cmd + Z | Undo |
| Ctrl/Cmd + Y | Redo |

## Navigation

| Shortcut | Action |
|----------|--------|
| Up/Down | Navigate between blocks |
| Tab | Indent list / Navigate table |
| Shift + Tab | Outdent list |
| Enter | New block / New list item |
| Shift + Enter | Line break within block |

## Block Menu

| Shortcut | Action |
|----------|--------|
| / | Open block menu |
| Escape | Close block menu |
| Up/Down | Navigate menu items |
| Enter | Select menu item |

## Markdown-Style Shortcuts

Type these at the start of a line:

| Input | Result |
|-------|--------|
| # | Heading 1 |
| ## | Heading 2 |
| ### | Heading 3 |
| - or * | Bullet list |
| 1. | Numbered list |
| [ ] | Checklist |
| > | Blockquote |
| --- | Divider |`,
  },

  // ============================================
  // RESOURCES
  // ============================================
  'contributing': {
    slug: 'contributing',
    title: 'Contributing',
    description: 'How to contribute to Authorly.',
    content: `# Contributing

We love contributions! Here's how you can help make Authorly better.

## Getting Started

1. Fork the repository
2. Clone your fork:

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/Authorly.git
cd Authorly
\`\`\`

3. Install dependencies:

\`\`\`bash
npm install
\`\`\`

4. Start the dev server:

\`\`\`bash
npm run dev
\`\`\`

## Development

### Project Structure

\`\`\`
authorly/
├── src/
│   ├── components/    # React components
│   ├── blocks/        # Block type definitions
│   ├── core/          # Core functionality
│   ├── styles/        # CSS styles
│   └── index.ts       # Main exports
├── test/              # Test files
└── dist/              # Built output
\`\`\`

### Running Tests

\`\`\`bash
npm test
\`\`\`

### Building

\`\`\`bash
npm run build
\`\`\`

## Pull Requests

1. Create a feature branch
2. Make your changes
3. Write tests if applicable
4. Commit with a clear message
5. Push and create a PR

## Commit Convention

We use Conventional Commits:

- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance`,
  },

  'changelog': {
    slug: 'changelog',
    title: 'Changelog',
    description: 'Release notes and version history.',
    content: `# Changelog

All notable changes to Authorly.

## [0.1.0] - 2024-01-15

### Added
- Initial release
- 13 block types: paragraph, headings, lists, code, quote, image, video, table, divider, callout, accordion
- ContentBlocksEditor component
- ContentBlocksRenderer component
- TableOfContents component
- Dark mode support
- Keyboard shortcuts
- Drag and drop reordering
- TypeScript support
- CSS customization via variables

### Features
- Pure HTML output
- XSS protection via sanitization
- Next.js compatible with dynamic imports
- Full ref API for programmatic control

---

## Upcoming

### Planned for 0.2.0
- Collaborative editing support
- More block types (embed, math)
- Plugin system
- Mobile optimizations
- Accessibility improvements

### Planned for 0.3.0
- AI-powered features
- Version history
- Comments and annotations`,
  },

  'roadmap': {
    slug: 'roadmap',
    title: 'Roadmap',
    description: 'Future plans for Authorly.',
    content: `# Roadmap

Our plans for Authorly's future development.

## Near Term (Q1 2024)

### v0.2.0 - Enhanced Blocks
- **Embed block** — Support for Twitter, YouTube, CodePen, etc.
- **Math block** — LaTeX math equation support
- **Toggle/Accordion improvements** — Nested toggles
- **Better mobile support** — Touch-optimized interactions

### v0.3.0 - Plugin System
- **Plugin API** — Create and share custom blocks
- **Theme packages** — Installable themes
- **Toolbar customization** — Configure which tools appear

## Medium Term (Q2-Q3 2024)

### v0.4.0 - Collaboration
- **Real-time collaboration** — Multiple users editing
- **Comments** — Inline commenting system
- **Suggestions mode** — Track changes

### v0.5.0 - AI Features
- **AI writing assistant** — Grammar and style suggestions
- **Auto-complete** — Smart text completion
- **Image generation** — AI-generated images

## Long Term

### v1.0.0 - Production Ready
- Stable API
- Comprehensive documentation
- Performance optimizations
- Accessibility audit (WCAG 2.1 AA)
- 100% test coverage

## Community Requests

Have a feature request? Open an issue on GitHub!

### Most Requested
1. Markdown import/export
2. Word document import
3. Templates
4. Auto-save to localStorage
5. Image cropping`,
  },
};

// Helper to get all doc slugs for SSG
export function getAllDocSlugs(): string[] {
  return Object.keys(docsContent);
}

// Helper to get doc by slug
export function getDocBySlug(slug: string): DocPage | null {
  return docsContent[slug] || null;
}
