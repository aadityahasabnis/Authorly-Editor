# Advanced Styling Guide

Learn advanced techniques for customizing Authorly's appearance with CSS custom properties, component-specific styling, and framework integrations.

## Overview

Authorly's styling system is built on:

- **CSS Custom Properties** - All theme values are exposed as CSS variables
- **No CSS-in-JS** - Pure CSS for better performance
- **Tailwind Compatible** - Works with or without Tailwind CSS
- **Dark Mode Ready** - Built-in dark mode with `.cb-dark` class
- **Minimal Specificity** - Easy to override without `!important`

## CSS Custom Properties Reference

### Color Variables

Override these CSS variables to customize colors:

```css
/* Light mode colors */
:root {
  /* Backgrounds */
  --cb-bg: #ffffff;
  --cb-bg-secondary: #f9fafb;
  --cb-bg-tertiary: #f3f4f6;
  
  /* Text */
  --cb-text: #111827;
  --cb-text-secondary: #6b7280;
  --cb-text-placeholder: #9ca3af;
  
  /* Borders */
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

/* Dark mode colors */
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

### Spacing Variables

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

## Custom Theme Examples

### Professional Dark Theme

```css
/* styles/dark-theme.css */
.cb-dark {
  --cb-bg: #0d1117;
  --cb-bg-secondary: #161b22;
  --cb-bg-tertiary: #21262d;
  --cb-text: #c9d1d9;
  --cb-text-secondary: #8b949e;
  --cb-text-placeholder: #484f58;
  --cb-border: #30363d;
  --cb-border-focus: #58a6ff;
  --cb-primary: #58a6ff;
  --cb-primary-hover: #79c0ff;
}
```

### Warm Sepia Theme

```css
/* styles/sepia-theme.css */
:root {
  --cb-bg: #f4f1e8;
  --cb-bg-secondary: #ebe7dc;
  --cb-bg-tertiary: #e2ddd0;
  --cb-text: #3e3528;
  --cb-text-secondary: #756953;
  --cb-text-placeholder: #a89f8d;
  --cb-border: #d4cbb8;
  --cb-border-focus: #9b7e46;
  --cb-primary: #9b7e46;
  --cb-primary-hover: #7d6537;
}
```

### High Contrast Theme

```css
/* styles/high-contrast.css */
:root {
  --cb-bg: #ffffff;
  --cb-bg-secondary: #f0f0f0;
  --cb-bg-tertiary: #e0e0e0;
  --cb-text: #000000;
  --cb-text-secondary: #1a1a1a;
  --cb-text-placeholder: #666666;
  --cb-border: #000000;
  --cb-border-focus: #0000ff;
  --cb-primary: #0000ff;
  --cb-primary-hover: #0000cc;
  --cb-danger: #cc0000;
}
```

## Component-Specific Styling

### Editor Container

```css
/* Custom editor container styling */
.cb-editor {
  border: 2px solid var(--cb-border);
  border-radius: var(--cb-radius-lg);
  box-shadow: var(--cb-shadow-md);
  min-height: 500px;
}

/* Full-height editor */
.cb-editor.editor-fullscreen {
  height: 100vh;
  border-radius: 0;
}
```

### Content Area

```css
/* Custom content padding and width */
.cb-content {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--cb-spacing-xl);
  font-size: 1.125rem;
  line-height: 1.75;
}

/* Wide content layout */
.cb-content.content-wide {
  max-width: 960px;
}
```

### Toolbar Customization

```css
/* Compact toolbar */
.cb-toolbar {
  padding: var(--cb-spacing-sm);
  gap: var(--cb-spacing-xs);
}

/* Toolbar button styling */
.cb-toolbar-button {
  padding: var(--cb-spacing-sm);
  border-radius: var(--cb-radius-sm);
  transition: all 0.15s ease;
}

.cb-toolbar-button:hover {
  background: var(--cb-bg-tertiary);
  transform: translateY(-1px);
}

.cb-toolbar-button.active {
  background: var(--cb-primary);
  color: white;
}
```

### Block Menu Styling

```css
/* Custom block menu */
.cb-block-menu {
  border-radius: var(--cb-radius-md);
  box-shadow: var(--cb-shadow-lg);
  max-height: 400px;
  overflow-y: auto;
}

.cb-block-menu-item {
  padding: var(--cb-spacing-sm) var(--cb-spacing-md);
  cursor: pointer;
}

.cb-block-menu-item:hover {
  background: var(--cb-bg-secondary);
}

.cb-block-menu-item.selected {
  background: var(--cb-primary);
  color: white;
}
```

### Block Styling

```css
/* Heading styles */
.cb-block-h1 { font-size: 2.5rem; }
.cb-block-h2 { font-size: 2rem; }
.cb-block-h3 { font-size: 1.5rem; }

/* Code block styling */
.cb-block-code {
  background: var(--cb-bg-secondary);
  border-radius: var(--cb-radius-md);
  padding: var(--cb-spacing-md);
  font-family: var(--cb-font-mono);
  font-size: 0.875rem;
}

/* Quote styling */
.cb-block-quote {
  border-left: 4px solid var(--cb-primary);
  padding-left: var(--cb-spacing-lg);
  font-style: italic;
  color: var(--cb-text-secondary);
}

/* Callout styling */
.cb-callout {
  border-radius: var(--cb-radius-md);
  padding: var(--cb-spacing-md);
  margin: var(--cb-spacing-lg) 0;
}

.cb-callout.info {
  background: rgba(59, 130, 246, 0.1);
  border-left: 4px solid var(--cb-info);
}

.cb-callout.warning {
  background: rgba(245, 158, 11, 0.1);
  border-left: 4px solid var(--cb-warning);
}
```

## Tailwind CSS Integration

Authorly works seamlessly with Tailwind CSS. You can use Tailwind utility classes alongside Authorly's CSS variables.

### Using Tailwind Utilities

```tsx
import { ContentBlocksEditor } from 'authorly-editor';
import 'authorly-editor/dist/style.css';

function App() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="rounded-lg shadow-xl border border-gray-200">
        <ContentBlocksEditor 
          className="min-h-[600px]"
        />
      </div>
    </div>
  );
}
```

### Custom Tailwind Theme with Authorly

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'editor-bg': 'var(--cb-bg)',
        'editor-text': 'var(--cb-text)',
        'editor-primary': 'var(--cb-primary)',
      },
      fontFamily: {
        'editor': 'var(--cb-font-family)',
        'editor-mono': 'var(--cb-font-mono)',
      },
    },
  },
};
```

## Responsive Design

### Mobile Optimization

```css
/* Mobile-friendly toolbar */
@media (max-width: 768px) {
  .cb-toolbar {
    flex-wrap: wrap;
    gap: var(--cb-spacing-xs);
  }
  
  .cb-toolbar-button {
    min-width: 44px;
    min-height: 44px;
  }
  
  .cb-content {
    padding: var(--cb-spacing-md);
    font-size: 1rem;
  }
}
```

### Tablet Adjustments

```css
@media (min-width: 768px) and (max-width: 1024px) {
  .cb-content {
    max-width: 600px;
  }
}
```

## Dark Mode Implementation

### Manual Toggle

```tsx
import { useState } from 'react';
import { ContentBlocksEditor } from 'authorly-editor';

function ThemedEditor() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? 'cb-dark' : ''}>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle {isDark ? 'Light' : 'Dark'} Mode
      </button>
      <ContentBlocksEditor darkMode={isDark} />
    </div>
  );
}
```

### System Preference Detection

```tsx
import { useEffect, useState } from 'react';
import { ContentBlocksEditor } from 'authorly-editor';

function SystemThemedEditor() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className={isDark ? 'cb-dark' : ''}>
      <ContentBlocksEditor darkMode={isDark} />
    </div>
  );
}
```

### Next.js Dark Mode with next-themes

```tsx
'use client';

import { useTheme } from 'next-themes';
import { ContentBlocksEditor } from 'authorly-editor';

export default function Editor() {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'cb-dark' : ''}>
      <ContentBlocksEditor darkMode={theme === 'dark'} />
    </div>
  );
}
```

## Custom Scrollbar Styling

Authorly includes custom scrollbar styling. Override it if needed:

```css
/* Custom scrollbar */
.cb-editor ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.cb-editor ::-webkit-scrollbar-track {
  background: var(--cb-bg-secondary);
}

.cb-editor ::-webkit-scrollbar-thumb {
  background: var(--cb-border);
  border-radius: 4px;
}

.cb-editor ::-webkit-scrollbar-thumb:hover {
  background: var(--cb-text-secondary);
}

/* Firefox scrollbar */
.cb-editor {
  scrollbar-width: thin;
  scrollbar-color: var(--cb-border) var(--cb-bg-secondary);
}
```

## Print Styles

```css
@media print {
  .cb-toolbar,
  .cb-block-menu,
  .cb-sidebar {
    display: none !important;
  }
  
  .cb-content {
    max-width: 100%;
    padding: 0;
    font-size: 12pt;
  }
  
  .cb-block {
    page-break-inside: avoid;
  }
  
  .cb-block-code {
    border: 1px solid #ccc;
    page-break-inside: avoid;
  }
}
```

## Animation Customization

```css
/* Disable animations for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .cb-editor *,
  .cb-toolbar-button,
  .cb-block-menu-item {
    animation: none !important;
    transition: none !important;
  }
}

/* Custom transitions */
.cb-block {
  transition: background-color 0.2s ease,
              border-color 0.2s ease,
              transform 0.15s ease;
}

.cb-block:hover {
  background: var(--cb-bg-secondary);
}
```

## Best Practices

### 1. Use CSS Variables for Consistency

```css
/* Good: Uses CSS variables */
.custom-component {
  background: var(--cb-bg);
  color: var(--cb-text);
  border: 1px solid var(--cb-border);
}

/* Avoid: Hardcoded values */
.custom-component {
  background: #ffffff;
  color: #111827;
  border: 1px solid #e5e7eb;
}
```

### 2. Scope Custom Styles

```css
/* Scope to avoid conflicts */
.my-app .cb-editor {
  /* Custom styles */
}
```

### 3. Layer Overrides Properly

```css
/* Use CSS layers for better control */
@layer base, authorly, custom;

@layer custom {
  .cb-editor {
    /* Your overrides */
  }
}
```

### 4. Test Both Light and Dark Modes

Always test custom styles in both light and dark modes to ensure proper contrast and readability.

### 5. Maintain Accessibility

```css
/* Ensure focus indicators are visible */
.cb-toolbar-button:focus-visible {
  outline: 2px solid var(--cb-border-focus);
  outline-offset: 2px;
}

/* Maintain color contrast */
.cb-text {
  color: var(--cb-text); /* WCAG AA compliant */
}
```

## Common Patterns

### Floating Toolbar

```css
.cb-editor {
  position: relative;
}

.cb-toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--cb-bg);
  border-bottom: 1px solid var(--cb-border);
}
```

### Side-by-Side Preview

```tsx
<div className="grid grid-cols-2 gap-4">
  <ContentBlocksEditor 
    value={content}
    onChange={setContent}
  />
  <ContentBlocksRenderer content={content} />
</div>
```

### Full-Screen Editor

```css
.editor-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: var(--cb-bg);
}
```

## Related Documentation

- [Theming and Styling](../components/theming) - Basic theming guide
- [Editor Component](../components/editor) - Editor configuration
- [Custom Blocks Guide](./custom-blocks) - Creating custom block styles
- [Renderer Component](../components/renderer) - Renderer styling options
