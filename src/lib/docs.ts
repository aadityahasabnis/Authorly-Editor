import fs from 'fs';
import path from 'path';

// Documentation content - reading from markdown files
export interface DocPage {
  slug: string;
  title: string;
  description: string;
  content: string;
}

// Cache for production builds
const docsCache: Record<string, DocPage> = {};

// Get the docs directory path
const docsDirectory = path.join(process.cwd(), 'docs');

// Extract title from markdown (first H1)
function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : 'Untitled';
}

// Extract description from markdown (first paragraph after H1)
function extractDescription(content: string): string {
  // Remove the first H1
  const withoutTitle = content.replace(/^#\s+.+$/m, '').trim();
  
  // Get the first paragraph (text before first heading or empty line)
  const lines = withoutTitle.split('\n');
  const descriptionLines: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    // Stop at next heading or code block
    if (trimmed.startsWith('#') || trimmed.startsWith('```')) break;
    // Skip empty lines at start
    if (descriptionLines.length === 0 && !trimmed) continue;
    // Stop at first empty line after we have content
    if (descriptionLines.length > 0 && !trimmed) break;
    if (trimmed) descriptionLines.push(trimmed);
  }
  
  return descriptionLines.join(' ').substring(0, 200);
}

// Read a markdown file and parse it
function readMarkdownFile(slug: string): DocPage | null {
  // Check cache first (only in production)
  if (process.env.NODE_ENV === 'production' && docsCache[slug]) {
    return docsCache[slug];
  }
  
  // Determine file path
  let filePath: string;
  
  if (slug === 'index' || slug === '') {
    filePath = path.join(docsDirectory, 'index.md');
  } else {
    filePath = path.join(docsDirectory, `${slug}.md`);
  }
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  // Read file content
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Parse title and description
  const title = extractTitle(content);
  const description = extractDescription(content);
  
  const doc: DocPage = {
    slug,
    title,
    description,
    content,
  };
  
  // Cache in production
  if (process.env.NODE_ENV === 'production') {
    docsCache[slug] = doc;
  }
  
  return doc;
}

// Hardcoded content for pages that don't have markdown files yet
const fallbackContent: Record<string, DocPage> = {
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
- **Block-Based** — Modern editing experience with 14 block types
- **TypeScript** — Full type support out of the box
- **Customizable** — Easy to style and extend

## Quick Example

\`\`\`tsx
import { AuthorlyEditor } from 'authorly-editor';
import 'authorly-editor/styles';

function App() {
  const [content, setContent] = useState('<p>Hello World!</p>');

  return (
    <AuthorlyEditor
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

const AuthorlyEditor = dynamic(
  () => import('authorly-editor').then((mod) => mod.AuthorlyEditor),
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
import { AuthorlyEditor } from 'authorly-editor';
import 'authorly-editor/styles';

function MyEditor() {
  const [content, setContent] = useState('<p>Start writing...</p>');

  return (
    <AuthorlyEditor
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
    <AuthorlyEditor
      initialContent={content}
      onChange={setContent}
      onSave={handleSave}  // Triggered by Ctrl+S
    />
  );
}
\`\`\`

## Dark Mode

\`\`\`tsx
<AuthorlyEditor
  darkMode={true}
  initialContent={content}
  onChange={setContent}
/>
\`\`\`

## Displaying Content

Use the Renderer component to display saved content:

\`\`\`tsx
import { AuthorlyRenderer } from 'authorly-editor';

function BlogPost({ content }) {
  return (
    <AuthorlyRenderer
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
    description: 'The main AuthorlyEditor component API reference.',
    content: `# AuthorlyEditor

The main editor component for creating and editing content.

## Import

\`\`\`tsx
import { AuthorlyEditor } from 'authorly-editor';
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
<AuthorlyEditor
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
    description: 'The AuthorlyRenderer component for displaying content.',
    content: `# AuthorlyRenderer

Display saved HTML content with beautiful styling and optional enhancements.

## Import

\`\`\`tsx
import { AuthorlyRenderer } from 'authorly-editor';
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
import { AuthorlyRenderer } from 'authorly-editor';

function BlogPost({ content }) {
  return (
    <AuthorlyRenderer html={content} />
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
    content: `# AuthorlyTOC

Automatically generate a table of contents from your HTML headings.

## Import

\`\`\`tsx
import { AuthorlyTOC } from 'authorly-editor';
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
<AuthorlyTOC html={content} />
\`\`\`

## Documentation Layout

\`\`\`tsx
import { AuthorlyRenderer, AuthorlyTOC } from 'authorly-editor';

function DocsPage({ content }) {
  return (
    <div className="flex gap-8">
      <aside className="w-64 sticky top-4">
        <AuthorlyTOC 
          html={content} 
          title="On this page"
          maxLevel={3}
        />
      </aside>
      <main className="flex-1">
        <AuthorlyRenderer 
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

  'components/table-of-contents': {
    slug: 'components/table-of-contents',
    title: 'Table of Contents',
    description: 'Auto-generate navigation from your content headings.',
    content: `# AuthorlyTOC

Automatically generate a table of contents from your HTML headings.

## Import

\`\`\`tsx
import { AuthorlyTOC } from 'authorly-editor';
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
<AuthorlyTOC html={content} />
\`\`\`

## Documentation Layout

\`\`\`tsx
import { AuthorlyRenderer, AuthorlyTOC } from 'authorly-editor';

function DocsPage({ content }) {
  return (
    <div className="flex gap-8">
      <aside className="w-64 sticky top-4">
        <AuthorlyTOC 
          html={content} 
          title="On this page"
          maxLevel={3}
        />
      </aside>
      <main className="flex-1">
        <AuthorlyRenderer 
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
<AuthorlyEditor
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
<AuthorlyEditor showToolbar={false} />
\`\`\`

### Toolbar Position

\`\`\`tsx
// Toolbar at bottom
<AuthorlyEditor toolbarPosition="bottom" />

// Toolbar at top (default)
<AuthorlyEditor toolbarPosition="top" />
\`\`\``,
  },

  'components/block-menu': {
    slug: 'components/block-menu',
    title: 'Block Menu',
    description: 'The slash command menu for inserting blocks.',
    content: `# Block Menu

The Block Menu is triggered by typing "/" in the editor and provides quick access to all block types.

## Triggering the Menu

Type \`/\` anywhere in the editor to open the block menu:

\`\`\`
/ (opens menu)
/head (filters to headings)
/code (filters to code block)
\`\`\`

## Available Commands

### Text Blocks
- \`/paragraph\` or \`/p\` - Default paragraph block
- \`/heading1\` or \`/h1\` - Large heading
- \`/heading2\` or \`/h2\` - Medium heading
- \`/heading3\` or \`/h3\` - Small heading
- \`/heading4\` or \`/h4\` - Extra small heading
- \`/heading5\` or \`/h5\` - Tiny heading
- \`/heading6\` or \`/h6\` - Smallest heading

### Lists
- \`/bullet\` or \`/ul\` - Bullet list
- \`/numbered\` or \`/ol\` - Numbered list
- \`/checklist\` or \`/todo\` - Task checklist

### Content Blocks
- \`/code\` - Code block with syntax highlighting
- \`/quote\` - Blockquote
- \`/callout\` - Highlighted callout box
- \`/divider\` or \`/hr\` - Horizontal divider

### Media Blocks
- \`/image\` or \`/img\` - Image block
- \`/video\` - Video embed
- \`/table\` - Table block
- \`/accordion\` - Expandable accordion
- \`/link\` - Link preview card

## Keyboard Navigation

- **↑/↓** - Navigate menu items
- **Enter** - Insert selected block
- **Esc** - Close menu
- **Type** - Filter menu items

## Customizing the Placeholder

Change the placeholder text that hints at the slash command:

\`\`\`tsx
<AuthorlyEditor
  placeholder="Type '/' for commands or start writing..."
/>
\`\`\`

## Menu Behavior

The block menu:
- Opens automatically when you type \`/\`
- Filters as you continue typing
- Closes when you press Escape or click outside
- Inserts the block and focuses it when you select an item`,
  },

  'components/theming': {
    slug: 'components/theming',
    title: 'Theming & Customization',
    description: 'Customize the appearance of the editor and renderer.',
    content: `# Theming & Customization

Authorly provides multiple ways to customize the appearance of the editor and renderer.

## Dark Mode

Both the Editor and Renderer support dark mode out of the box:

\`\`\`tsx
<AuthorlyEditor darkMode={true} />
<AuthorlyRenderer darkMode={true} />
\`\`\`

## CSS Variables

Authorly uses CSS custom properties for theming. Override these in your global CSS:

\`\`\`css
:root {
  /* Primary colors */
  --authorly-primary: #3b82f6;
  --authorly-primary-hover: #2563eb;
  
  /* Background colors */
  --authorly-bg: #ffffff;
  --authorly-bg-secondary: #f9fafb;
  
  /* Text colors */
  --authorly-text: #1f2937;
  --authorly-text-secondary: #6b7280;
  
  /* Border colors */
  --authorly-border: #e5e7eb;
  
  /* Code block colors */
  --authorly-code-bg: #1e293b;
  --authorly-code-text: #e2e8f0;
}

/* Dark mode overrides */
[data-theme="dark"] {
  --authorly-bg: #111827;
  --authorly-bg-secondary: #1f2937;
  --authorly-text: #f9fafb;
  --authorly-text-secondary: #d1d5db;
  --authorly-border: #374151;
}
\`\`\`

## Custom Classes

Add custom classes to the editor wrapper:

\`\`\`tsx
<AuthorlyEditor
  className="my-custom-editor border-2 border-purple-500"
/>
\`\`\`

## Styling Specific Blocks

Target specific block types with CSS:

\`\`\`css
/* Style all paragraphs */
.authorly-editor p {
  font-size: 1.125rem;
  line-height: 1.8;
}

/* Style headings */
.authorly-editor h1 {
  color: #1e40af;
  font-weight: 800;
}

/* Style code blocks */
.authorly-editor pre {
  border-radius: 0.75rem;
  padding: 1.5rem;
}

/* Style callouts */
.authorly-editor .callout {
  border-left-width: 4px;
  border-color: #3b82f6;
}
\`\`\`

## Font Customization

Override the default fonts:

\`\`\`css
.authorly-editor,
.authorly-renderer {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.authorly-editor code,
.authorly-renderer code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
\`\`\`

## Theme Presets

Create reusable theme configurations:

\`\`\`tsx
// themes.ts
export const themes = {
  minimal: {
    darkMode: false,
    className: 'font-serif text-lg leading-relaxed',
  },
  technical: {
    darkMode: true,
    className: 'font-mono text-sm',
  },
  blog: {
    darkMode: false,
    className: 'max-w-2xl mx-auto text-gray-800',
  },
};

// Usage
<AuthorlyEditor {...themes.blog} />
\`\`\`

## Tailwind Integration

Authorly works seamlessly with Tailwind CSS:

\`\`\`tsx
<AuthorlyEditor
  className="prose prose-lg max-w-none dark:prose-invert"
/>
\`\`\`

## Advanced: Custom Block Styling

For completely custom block appearances, you can wrap the editor and use CSS to target specific data attributes:

\`\`\`css
/* Custom callout colors */
.authorly-editor [data-callout-type="info"] {
  background: #dbeafe;
  border-color: #3b82f6;
}

.authorly-editor [data-callout-type="warning"] {
  background: #fef3c7;
  border-color: #f59e0b;
}

.authorly-editor [data-callout-type="error"] {
  background: #fee2e2;
  border-color: #ef4444;
}
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

Authorly supports 14 block types for rich content creation.

## Text Blocks

### [Paragraph](/docs/blocks/paragraph)
The default text block for writing content. Supports inline formatting.

### [Headings](/docs/blocks/headings)
Six heading levels (H1-H6) for document structure.

## List Blocks

### [Lists](/docs/blocks/lists)
Three list types: bullet lists, numbered lists, and interactive checklists.

## Content Blocks

### [Code Block](/docs/blocks/code)
Syntax-highlighted code with language detection and copy functionality.

### [Blockquote](/docs/blocks/quote)
Beautiful quotes with optional attribution and styling.

### [Image](/docs/blocks/image)
Responsive images with captions, alt text, and size controls.

### [Video](/docs/blocks/video)
Embed videos from YouTube, Vimeo, or direct URLs.

### [Table](/docs/blocks/table)
Interactive tables with add/remove rows and columns.

### [Callout](/docs/blocks/callout)
Highlighted content blocks with icons and custom colors.

### [Accordion](/docs/blocks/accordion)
Collapsible sections using native HTML details/summary elements.

### [Link Preview](/docs/blocks/link-preview)
Rich URL previews with Open Graph metadata.

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
| \`\`\` | Code block |
| --- | Divider |`,
  },

  'blocks/accordion': {
    slug: 'blocks/accordion',
    title: 'Accordion Block',
    description: 'Create collapsible sections for FAQ or long content.',
    content: `# Accordion Block

Create collapsible content sections using HTML details/summary elements.

## Features

### Native Behavior
- Uses HTML \`<details>\` and \`<summary>\` elements
- Works without JavaScript
- Accessible by default
- Keyboard navigable

### Rich Content
- Full formatting in content area
- Nested blocks supported
- Multiple accordions in sequence

## Creating Accordions

### Block Menu
1. Type /accordion or / then select "Accordion"
2. Enter the summary/title text
3. Add content inside the accordion

## Use Cases

### FAQs
Perfect for frequently asked questions sections.

\`\`\`html
<details>
  <summary>What is Authorly?</summary>
  <p>Authorly is a lightweight, block-based rich text editor for React that outputs clean HTML.</p>
</details>
\`\`\`

### Long Content
Hide lengthy explanations that not everyone needs to read.

### Step-by-step Instructions
Show step titles with expandable details.

## Best Practices

- Keep summary text concise and descriptive
- Use for genuinely optional content
- Don't hide critical information in accordions
- Consider SEO implications`,
  },

  'blocks/link-preview': {
    slug: 'blocks/link-preview',
    title: 'Link Preview Block',
    description: 'Rich URL previews with Open Graph metadata.',
    content: `# Link Preview Block

Create rich link previews that display Open Graph metadata from URLs.

## Features

### Automatic Metadata
- Fetches page title
- Gets description
- Loads preview image
- Shows site favicon

### Clean Presentation
- Card-style display
- Clickable link
- Responsive design

## Creating Link Previews

### Paste URL
Paste any URL and the editor will offer to create a link preview.

### Block Menu
1. Type /link or / then select "Link Preview"
2. Enter the URL
3. Preview card is generated

## Metadata Sources

The block fetches Open Graph metadata:
- \`og:title\` — Page title
- \`og:description\` — Page description  
- \`og:image\` — Preview image
- \`og:site_name\` — Site name

## Best Practices

- Use for sharing external resources
- Preview important links in articles
- Good for documentation and tutorials
- Consider fallback text if metadata isn't available`,
  },

  // ============================================
  // API REFERENCE
  // ============================================
  'api/editor-props': {
    slug: 'api/editor-props',
    title: 'Editor Props',
    description: 'Complete reference for AuthorlyEditor props.',
  content: `
# Props Reference

Complete reference for all AuthorlyEditor props.

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
import { AuthorlyEditor, EditorRef } from 'authorly-editor';

function MyEditor() {
  const editorRef = useRef<EditorRef>(null);

  return <AuthorlyEditor ref={editorRef} />;
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
      <AuthorlyEditor ref={editorRef} />
      <button onClick={handleSave}>Save</button>
    </>
  );
}
\`\`\``,
  },

  'api/renderer-props': {
    slug: 'api/renderer-props',
    title: 'Renderer Props',
    description: 'Complete reference for AuthorlyRenderer props.',
  content: `
# Props Reference

Complete reference for all AuthorlyRenderer props.

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
      <AuthorlyRenderer
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
<AuthorlyEditor
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
<AuthorlyEditor className="purple-theme" />
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

const AuthorlyEditor = dynamic(
  () => import('authorly-editor').then((mod) => mod.AuthorlyEditor),
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
  return <AuthorlyEditor ref={ref} {...props} />;
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
<AuthorlyEditor
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

<AuthorlyEditor onImageUpload={uploadToCloudinary} />
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

<AuthorlyEditor
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
- AuthorlyEditor component
- AuthorlyRenderer component
- AuthorlyTOC component
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

// Helper to get all markdown files from docs directory
function getAllMarkdownSlugs(): string[] {
  const slugs: string[] = [];
  
  function scanDirectory(dir: string, baseSlug: string = '') {
    if (!fs.existsSync(dir)) return;
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        scanDirectory(
          path.join(dir, entry.name),
          baseSlug ? `${baseSlug}/${entry.name}` : entry.name
        );
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // Add markdown file slug
        const filename = entry.name.replace(/\.md$/, '');
        if (filename === 'index') {
          slugs.push(baseSlug || 'index');
        } else {
          slugs.push(baseSlug ? `${baseSlug}/${filename}` : filename);
        }
      }
    }
  }
  
  scanDirectory(docsDirectory);
  return slugs;
}

// Helper to get all doc slugs for SSG
export function getAllDocSlugs(): string[] {
  // Get markdown file slugs
  const markdownSlugs = getAllMarkdownSlugs();
  
  // Get fallback content slugs
  const fallbackSlugs = Object.keys(fallbackContent);
  
  // Combine and deduplicate
  const allSlugs = [...new Set([...markdownSlugs, ...fallbackSlugs])];
  
  return allSlugs;
}

// Helper to get doc by slug
export function getDocBySlug(slug: string): DocPage | null {
  // Try to read from markdown file first
  const markdownDoc = readMarkdownFile(slug);
  if (markdownDoc) {
    return markdownDoc;
  }
  
  // Fallback to hardcoded content
  return fallbackContent[slug] || null;
}
