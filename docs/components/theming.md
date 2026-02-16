# Theming and Styling

Authorly uses CSS custom properties (CSS variables) for theming, making it easy to customize colors, spacing, and other visual aspects. The editor works with or without Tailwind CSS.

## Quick Start

### Import Styles

```tsx
import 'authorly-editor/styles';
```

This imports all necessary styles including:
- Editor container and content area
- Toolbar and block menu
- All 16 block types
- Dark mode support
- Custom scrollbars

### Dark Mode

```tsx
import { useState } from 'react';
import { AuthorlyEditor } from 'authorly-editor';

function ThemedEditor() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? 'cb-dark' : ''}>
      <AuthorlyEditor darkMode={isDark} />
    </div>
  );
}
```

## CSS Custom Properties

Authorly uses CSS variables for all theme values. Override these in your own CSS to customize the appearance:

### Colors

```css
:root {
  /* Background colors */
  --cb-bg: #ffffff;
  --cb-bg-secondary: #f9fafb;
  --cb-bg-tertiary: #f3f4f6;
  
  /* Text colors */
  --cb-text: #111827;
  --cb-text-secondary: #6b7280;
  --cb-text-placeholder: #9ca3af;
  
  /* Border colors */
  --cb-border: #e5e7eb;
  --cb-border-focus: #3b82f6;
  
  /* Brand colors */
  --cb-primary: #3b82f6;
  --cb-primary-hover: #2563eb;
  --cb-danger: #ef4444;
  --cb-success: #10b981;
  --cb-warning: #f59e0b;
  --cb-info: #3b82f6;
}
```

### Dark Mode Colors

```css
.cb-dark {
  --cb-bg: #1f2937;
  --cb-bg-secondary: #111827;
  --cb-bg-tertiary: #374151;
  --cb-text: #f9fafb;
  --cb-text-secondary: #d1d5db;
  --cb-text-placeholder: #6b7280;
  --cb-border: #374151;
  --cb-border-focus: #60a5fa;
}
```

### Spacing

```css
:root {
  --cb-spacing-xs: 0.25rem;   /* 4px */
  --cb-spacing-sm: 0.5rem;    /* 8px */
  --cb-spacing-md: 1rem;      /* 16px */
  --cb-spacing-lg: 1.5rem;    /* 24px */
  --cb-spacing-xl: 2rem;      /* 32px */
}
```

### Border Radius

```css
:root {
  --cb-radius-sm: 0.25rem;    /* 4px */
  --cb-radius-md: 0.375rem;   /* 6px */
  --cb-radius-lg: 0.5rem;     /* 8px */
}
```

### Shadows

```css
:root {
  --cb-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --cb-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                  0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --cb-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
                  0 4px 6px -4px rgba(0, 0, 0, 0.1);
}
```

### Typography

```css
:root {
  --cb-font-family: system-ui, -apple-system, BlinkMacSystemFont, 
                    'Segoe UI', Roboto, sans-serif;
  --cb-font-mono: 'SF Mono', Monaco, 'Cascadia Code', 
                  'Roboto Mono', Consolas, monospace;
}
```

## Customization Examples

### Custom Color Scheme

```css
/* Blue Theme */
:root {
  --cb-primary: #0ea5e9;
  --cb-primary-hover: #0284c7;
  --cb-border-focus: #0ea5e9;
}

/* Green Theme */
:root {
  --cb-primary: #10b981;
  --cb-primary-hover: #059669;
  --cb-border-focus: #10b981;
}

/* Purple Theme */
:root {
  --cb-primary: #8b5cf6;
  --cb-primary-hover: #7c3aed;
  --cb-border-focus: #8b5cf6;
}
```

### Custom Dark Mode

```css
/* Custom dark theme */
.cb-dark {
  --cb-bg: #0f172a;           /* Darker slate */
  --cb-bg-secondary: #1e293b;
  --cb-bg-tertiary: #334155;
  --cb-text: #f1f5f9;
  --cb-text-secondary: #cbd5e1;
  --cb-border: #475569;
}
```

### Custom Fonts

```css
:root {
  --cb-font-family: 'Inter', sans-serif;
  --cb-font-mono: 'JetBrains Mono', monospace;
}
```

### Compact Spacing

```css
:root {
  --cb-spacing-xs: 0.125rem;  /* 2px */
  --cb-spacing-sm: 0.25rem;   /* 4px */
  --cb-spacing-md: 0.5rem;    /* 8px */
  --cb-spacing-lg: 1rem;      /* 16px */
  --cb-spacing-xl: 1.5rem;    /* 24px */
}
```

### Rounded Corners

```css
:root {
  --cb-radius-sm: 0.5rem;     /* 8px */
  --cb-radius-md: 0.75rem;    /* 12px */
  --cb-radius-lg: 1rem;       /* 16px */
}
```

## Component-Specific Styling

### Editor Container

```css
.cb-editor {
  border: 2px solid var(--cb-border);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Remove border */
.cb-editor {
  border: none;
}

/* Fixed height */
.cb-editor {
  height: 600px;
}
```

### Toolbar

```css
/* Toolbar background */
.cb-toolbar {
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
}

/* Toolbar buttons */
.cb-toolbar-btn:hover {
  background: #dbeafe;
  color: #2563eb;
}

/* Active button */
.cb-toolbar-btn-active {
  background: #2563eb;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3);
}
```

### Content Area

```css
/* Content padding */
.cb-content {
  padding: 2rem 3rem;
  max-width: 800px;
  margin: 0 auto;
}

/* Custom placeholder */
.cb-content:empty::before {
  color: #9ca3af;
  font-style: italic;
}
```

### Block Styling

```css
/* Paragraph spacing */
.cb-block[data-block-type="paragraph"] {
  margin-bottom: 1.5rem;
}

/* Heading colors */
.cb-block[data-block-type="heading"] h1 {
  color: #1e40af;
}

/* Code block */
.cb-code-block {
  background: #1e293b;
  border-radius: 8px;
}

/* Quote styling */
.cb-quote {
  border-left: 4px solid #3b82f6;
  background: #f0f9ff;
  padding: 1rem 1.5rem;
}
```

### Block Menu

```css
/* Menu container */
.cb-block-menu {
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

/* Menu items */
.cb-block-menu-item:hover {
  background: linear-gradient(to right, #eff6ff, #dbeafe);
}

/* Selected item */
.cb-block-menu-item-selected {
  background: #dbeafe;
  border-left: 3px solid #2563eb;
}
```

## Scrollbar Customization

### Custom Scrollbar Colors

```css
/* Light mode */
.cb-editor ::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
}

.cb-editor ::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}

/* Dark mode */
.cb-dark .cb-editor ::-webkit-scrollbar-thumb {
  background: rgba(96, 165, 250, 0.3);
}
```

### Wider Scrollbar

```css
.cb-editor ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
```

## Advanced Customization

### Per-Block Theming

```css
/* Different colors for different block types */
.cb-block[data-block-type="heading"] {
  --block-color: #3b82f6;
}

.cb-block[data-block-type="quote"] {
  --block-color: #10b981;
}

.cb-block[data-block-type="code"] {
  --block-color: #8b5cf6;
}
```

### Callout Types

```css
/* Callout colors by type */
.cb-callout[data-callout-type="info"] {
  background: #dbeafe;
  border-color: #3b82f6;
}

.cb-callout[data-callout-type="warning"] {
  background: #fef3c7;
  border-color: #f59e0b;
}

.cb-callout[data-callout-type="error"] {
  background: #fee2e2;
  border-color: #ef4444;
}

.cb-callout[data-callout-type="success"] {
  background: #d1fae5;
  border-color: #10b981;
}
```

### Table Styling

```css
.cb-table table {
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
}

.cb-table th {
  background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.cb-table tr:hover {
  background: #f9fafb;
}
```

## Responsive Design

### Mobile Styles

```css
@media (max-width: 768px) {
  .cb-editor {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
  
  .cb-content {
    padding: var(--cb-spacing-md);
  }
  
  .cb-toolbar {
    padding: 6px 8px;
  }
  
  .cb-toolbar-btn {
    width: 28px;
    height: 28px;
  }
}
```

### Tablet Styles

```css
@media (min-width: 769px) and (max-width: 1024px) {
  .cb-content {
    max-width: 680px;
  }
}
```

## Integration with Tailwind CSS

Authorly works seamlessly with Tailwind:

```tsx
<AuthorlyEditor 
  className="border-2 border-blue-500 rounded-xl shadow-xl"
/>
```

### Custom Tailwind Theme

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'editor-bg': '#ffffff',
        'editor-text': '#111827',
        'editor-border': '#e5e7eb',
        'editor-primary': '#3b82f6',
      },
    },
  },
}
```

Then use in your CSS:

```css
:root {
  --cb-bg: theme('colors.editor-bg');
  --cb-text: theme('colors.editor-text');
  --cb-border: theme('colors.editor-border');
  --cb-primary: theme('colors.editor-primary');
}
```

## Class Name Reference

### Main Classes

| Class | Description |
|-------|-------------|
| `.cb-editor` | Editor container |
| `.cb-content` | Content area |
| `.cb-toolbar` | Toolbar container |
| `.cb-toolbar-group` | Button group in toolbar |
| `.cb-toolbar-btn` | Individual toolbar button |
| `.cb-block` | Individual content block |
| `.cb-block-menu` | Slash command menu |
| `.cb-popover` | Floating popup (link, color picker) |

### Block Type Classes

| Class | Block Type |
|-------|------------|
| `.cb-block[data-block-type="paragraph"]` | Paragraph |
| `.cb-block[data-block-type="heading"]` | Heading (H1-H6) |
| `.cb-block[data-block-type="bulletList"]` | Bullet list |
| `.cb-block[data-block-type="numberedList"]` | Numbered list |
| `.cb-block[data-block-type="checkList"]` | Checklist |
| `.cb-block[data-block-type="quote"]` | Quote |
| `.cb-block[data-block-type="code"]` | Code block |
| `.cb-block[data-block-type="image"]` | Image |
| `.cb-block[data-block-type="video"]` | Video |
| `.cb-block[data-block-type="table"]` | Table |
| `.cb-block[data-block-type="divider"]` | Divider |
| `.cb-block[data-block-type="callout"]` | Callout |
| `.cb-block[data-block-type="accordion"]` | Accordion |

### Inline Format Classes

| Class | Description |
|-------|-------------|
| `.cb-link` | Hyperlink |
| `.cb-inline-code` | Inline code |
| `.cb-hashtag` | Hashtag |
| `.cb-date-inline` | Date element |
| `.cb-time-inline` | Time element |

## Theme Presets

### Minimal Theme

```css
:root {
  --cb-bg: #ffffff;
  --cb-border: #e5e7eb;
  --cb-text: #1f2937;
  --cb-radius-sm: 2px;
  --cb-radius-md: 4px;
  --cb-radius-lg: 6px;
}

.cb-editor {
  border: 1px solid var(--cb-border);
  box-shadow: none;
}
```

### Vibrant Theme

```css
:root {
  --cb-primary: #ec4899;
  --cb-primary-hover: #db2777;
  --cb-success: #10b981;
  --cb-warning: #f59e0b;
  --cb-danger: #ef4444;
  --cb-radius-lg: 16px;
}

.cb-editor {
  border: 2px solid var(--cb-primary);
}
```

### Professional Theme

```css
:root {
  --cb-bg: #fafafa;
  --cb-text: #171717;
  --cb-border: #d4d4d4;
  --cb-primary: #0ea5e9;
  --cb-font-family: 'Inter', system-ui, sans-serif;
}

.cb-editor {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}
```

## Best Practices

1. **Use CSS Variables**: Override `--cb-*` variables instead of targeting classes directly
2. **Respect Dark Mode**: Define both light and dark mode values
3. **Test Responsiveness**: Check mobile, tablet, and desktop views
4. **Maintain Contrast**: Ensure text is readable against backgrounds
5. **Keep Consistent**: Use the same spacing and border radius throughout
6. **Don't Override Core Layout**: Avoid changing flex/grid properties unless necessary

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS custom properties (IE11 not supported)
- Custom scrollbars work in WebKit browsers and Firefox

## See Also

- [AuthorlyEditor](/docs/components/editor) - Editor component
- [Styling Guide](/docs/guides/styling) - Advanced styling techniques
- [Quick Start](/docs/quick-start) - Getting started guide
