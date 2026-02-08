# Paragraph

The paragraph block is the foundation of content creation in Authorly. It's the default block type and supports rich inline formatting, making it perfect for writing body text, descriptions, and general content.

## Overview

Paragraphs are automatically created when you start typing in the editor. They're the most versatile block type, supporting all inline formatting options including bold, italic, underline, links, and inline code.

**Key characteristics:**
- Default block type (created automatically)
- Supports all inline formatting
- Converts to other blocks via toolbar or slash commands
- Outputs clean `<p>` tags with formatted content

## Creating Paragraphs

### Automatic Creation

Simply start typing in the editor. By default, a new paragraph block is created automatically.

### Using Slash Command

Type `/paragraph` or `/p` to explicitly create a paragraph block.

### Converting from Other Blocks

Any block can be converted to a paragraph:

1. Click the block you want to convert
2. Open the block menu (click the drag handle or type `/`)
3. Select "Paragraph" from the options

**Or use the toolbar:**
- Select the block
- Click the block type dropdown in the toolbar
- Choose "Paragraph"

## Inline Formatting

Paragraphs support rich inline formatting to emphasize and structure your text.

### Text Styles

| Format | Shortcut | Toolbar Button | Markdown |
|--------|----------|----------------|----------|
| **Bold** | `Ctrl/Cmd + B` | **B** | `**text**` or `__text__` |
| *Italic* | `Ctrl/Cmd + I` | *I* | `*text*` or `_text_` |
| <u>Underline</u> | `Ctrl/Cmd + U` | U | Not available |
| ~~Strikethrough~~ | `Ctrl/Cmd + Shift + S` | ~~S~~ | `~~text~~` |
| `Inline Code` | `Ctrl/Cmd + Shift + X` | `<>` | `` `text` `` |

### Links

Add hyperlinks to your text:

**Keyboard shortcut:** `Ctrl/Cmd + K`

**Steps:**
1. Select the text you want to link
2. Press `Ctrl/Cmd + K` or click the link button in toolbar
3. Enter the URL
4. Press Enter to confirm

**Markdown syntax:**
```
[link text](https://example.com)
```

**HTML output:**
```html
<a href="https://example.com">link text</a>
```

### Combining Formats

All inline formats can be combined:

- **Bold and *italic***
- **Bold with [links](https://example.com)**
- *Italic with `inline code`*
- ~~Strikethrough with **bold**~~

## Keyboard Shortcuts

Master these shortcuts for efficient paragraph editing:

| Shortcut | Action |
|----------|--------|
| `Enter` | Create new paragraph |
| `Shift + Enter` | Line break within paragraph |
| `Backspace` | Delete paragraph (when empty) |
| `Ctrl/Cmd + A` | Select all text in paragraph |
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` | Redo |

### Navigation Shortcuts

| Shortcut | Action |
|----------|--------|
| `↑` | Move to previous block |
| `↓` | Move to next block |
| `Home` | Move cursor to start of line |
| `End` | Move cursor to end of line |
| `Ctrl/Cmd + Home` | Move to start of paragraph |
| `Ctrl/Cmd + End` | Move to end of paragraph |

## Best Practices

### Writing Clear Paragraphs

**Keep paragraphs focused**
- One main idea per paragraph
- 3-5 sentences is ideal for readability
- Use shorter paragraphs for web content

**Use active voice**
```
❌ The button was clicked by the user
✅ The user clicked the button
```

**Break up long text**
```
❌ One massive paragraph with 15 sentences covering multiple topics...

✅ Short paragraph introducing topic.

  Second paragraph diving deeper.
  
  Third paragraph with examples.
```

### Formatting Guidelines

**Use bold sparingly**
- Highlight key terms and concepts
- Don't bold entire sentences
- Reserve for truly important information

**Italics for emphasis**
- Use for subtle emphasis
- Great for introducing new terms
- Works well for quotes within text

**Inline code for technical terms**
- Use for: `function names`, `variable names`, `file paths`
- Helps technical content stand out
- Makes code scannable in prose

**Links should be descriptive**
```
❌ Click [here](link) for more info
✅ Read the [installation guide](link)
```

## Common Use Cases

### Body Content

Standard paragraph usage for articles and documentation:

```
Authorly is a block-based rich text editor designed for modern web applications. 
Unlike traditional WYSIWYG editors, it outputs clean, semantic HTML that's easy 
to store and render.

Each block represents a distinct unit of content. This modular approach makes 
it simple to rearrange, style, and manage your content programmatically.
```

### Feature Descriptions

Using inline formatting to highlight features:

```
The editor includes **syntax highlighting** for over 100 languages, 
*automatic line numbering*, and `copy-to-clipboard` functionality. 
All themes are fully customizable via CSS variables.
```

### Instructions with Links

Combining text with helpful links:

```
To get started, check out the [Quick Start guide](/docs/quick-start) for 
installation instructions. For advanced configuration, see the 
[API Reference](/docs/api/editor-props).
```

### Introducing Technical Concepts

Using inline code for clarity:

```
The `ContentBlocksEditor` component accepts an `initialContent` prop containing 
HTML. When the user makes changes, the `onChange` callback receives updated HTML 
that you can save to your database.
```

## HTML Output

Paragraphs generate semantic, clean HTML:

### Plain Text

**Input:**
```
This is a simple paragraph.
```

**Output:**
```html
<p>This is a simple paragraph.</p>
```

### With Inline Formatting

**Input:**
```
This paragraph has **bold**, *italic*, and `code`.
```

**Output:**
```html
<p>This paragraph has <strong>bold</strong>, <em>italic</em>, and <code>code</code>.</p>
```

### With Links

**Input:**
```
Visit the [official website](https://authorly.dev) for more info.
```

**Output:**
```html
<p>Visit the <a href="https://authorly.dev">official website</a> for more info.</p>
```

### Complex Formatting

**Input:**
```
**Important:** Read the [documentation](https://docs.authorly.dev) and check the `README.md` file before deploying.
```

**Output:**
```html
<p><strong>Important:</strong> Read the <a href="https://docs.authorly.dev">documentation</a> and check the <code>README.md</code> file before deploying.</p>
```

## Styling Paragraphs

### Default Styles

Authorly applies sensible defaults:

```css
.authorly-editor p {
  margin: 0.75rem 0;
  line-height: 1.7;
  color: inherit;
}
```

### Custom Styling

Override with your own CSS:

```css
/* Larger, more readable paragraphs */
.authorly-editor p {
  font-size: 1.125rem;
  line-height: 1.8;
  margin: 1.5rem 0;
  max-width: 65ch; /* Optimal line length */
}

/* First paragraph styling */
.authorly-editor p:first-child {
  font-size: 1.25rem;
  font-weight: 500;
  color: #374151;
}

/* Drop cap for first letter */
.authorly-editor p:first-of-type::first-letter {
  font-size: 3.5rem;
  font-weight: 700;
  float: left;
  line-height: 1;
  margin: 0.1rem 0.1rem 0 0;
}
```

### Dark Mode Support

Paragraph styling automatically adapts to dark mode:

```tsx
<ContentBlocksEditor darkMode={true} />
```

Custom dark mode styles:

```css
[data-theme="dark"] .authorly-editor p {
  color: #f3f4f6;
}

[data-theme="dark"] .authorly-editor p a {
  color: #60a5fa;
}
```

## Accessibility

Paragraphs in Authorly follow accessibility best practices:

- **Semantic HTML** - Uses proper `<p>` tags
- **Readable text** - Default line height of 1.7 for readability
- **Keyboard navigation** - Full keyboard support for editing and navigation
- **Screen reader friendly** - All formatting is announced properly

### ARIA Considerations

Links within paragraphs:
```html
<!-- Descriptive link text (good) -->
<p>Read the <a href="/guide">installation guide</a> to get started.</p>

<!-- Non-descriptive (bad) -->
<p>Read the installation guide <a href="/guide">here</a>.</p>
```

## Advanced Techniques

### Line Breaks vs. New Paragraphs

**New paragraph** (`Enter`):
- Creates visual separation
- Adds margin between blocks
- Use for distinct ideas

**Line break** (`Shift + Enter`):
- Stays within same paragraph
- No extra spacing
- Use for addresses, poetry, formatting

**Example:**
```
John Doe [Shift+Enter]
123 Main Street [Shift+Enter]
New York, NY 10001
```

### Markdown Auto-Conversion

Authorly recognizes markdown as you type:

- Type `**text**` → auto-converts to **bold**
- Type `*text*` → auto-converts to *italic*
- Type `` `text` `` → auto-converts to `code`
- Type `[text](url)` → auto-converts to link

You can disable this in the editor config.

### Paste Behavior

When pasting content:

- **Plain text** - Creates paragraphs with line breaks
- **Rich text** - Preserves basic formatting (bold, italic, links)
- **From Word/Google Docs** - Strips extra formatting, keeps essentials
- **HTML** - Sanitizes and converts to supported formats

## Troubleshooting

### Can't Create New Paragraph

- **Issue:** Pressing Enter doesn't create new paragraph
- **Solution:** Make sure you're not in a code block or other special block type

### Formatting Not Working

- **Issue:** Keyboard shortcuts not applying formatting
- **Solution:** Ensure text is selected first for formatting commands

### Link Won't Save

- **Issue:** Link disappears after entering URL
- **Solution:** Press `Enter` to confirm, don't just click away

### Markdown Not Converting

- **Issue:** Typing `**text**` doesn't bold
- **Solution:** Make sure markdown auto-conversion is enabled in editor settings

## Examples

### Blog Post Introduction

```
**Welcome to Authorly** - a modern rich text editor built for developers who 
value clean code and great user experience.

Unlike traditional editors that output proprietary JSON formats, Authorly 
generates *pure HTML* that you can store anywhere and render with any 
framework. This means you're never locked into a specific platform or library.

Check out the [live demo](/playground) to see it in action, or jump straight 
to the [installation guide](/docs/installation) to start building.
```

### Technical Documentation

```
The `ContentBlocksEditor` component is the main entry point for the editor. 
It accepts **HTML content** as input and outputs **HTML** when the user makes 
changes.

Here's a minimal example:

[...code block would follow...]
```

### Product Description

```
Built with performance in mind, Authorly weighs in at just **30kb gzipped**. 
The editor includes built-in support for 14 block types, from basic paragraphs 
to advanced components like tables and accordions.

Every block outputs *semantic HTML*, making your content SEO-friendly and 
accessible by default. No proprietary formats, no complex JSON structures—just 
clean, readable HTML.
```
