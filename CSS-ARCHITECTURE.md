# CSS Architecture Guide

## ✅ Correct CSS Usage with Authorly Editor

### The Golden Rule

**The editor comes with complete, self-contained CSS.** Your application should:
1. **Import the editor CSS** as-is
2. **Override ONLY color variables** to match your theme
3. **Never add prose/utility classes** to editor-rendered content

---

## What We Fixed

### ❌ Before (WRONG)

**globals.css had 1164 lines** with:
- Custom `code`, `pre`, `ul`, `li`, `table` styles
- Prose utility overrides
- Inline code styling
- List styling
- Table styling  
- Blockquote styling

**Result:** Editor HTML was rendered incorrectly because global CSS overrode editor CSS.

**Component had prose classes:**
```tsx
<div className="prose prose-slate dark:prose-invert">
  <ContentBlocksRenderer html={content} />
</div>
```

### ✅ After (CORRECT)

**globals.css has 118 lines** with ONLY:
- Color design tokens
- Editor color variable overrides
- Minimal global resets

**Component is clean:**
```tsx
<div>
  <ContentBlocksRenderer html={content} />
</div>
```

---

## How to Use Authorly CSS

### 1. Import Editor CSS

```tsx
// In your app layout or component
import 'authorly-editor/dist/style.css';
```

This gives you the **complete editor styling system**.

### 2. Override Theme Colors (Optional)

If you want the editor to match your app's theme, override **ONLY the color variables**:

```css
/* globals.css or app.css */

:root {
  /* Your app colors */
  --primary: #6366f1;
  --background: #ffffff;
  --foreground: #0f172a;
  --muted: #f1f5f9;
  --border: #e2e8f0;
  
  /* Override editor colors */
  --cb-primary: var(--primary);
  --cb-primary-hover: #4f46e5;
  --cb-bg: var(--background);
  --cb-bg-secondary: var(--muted);
  --cb-text: var(--foreground);
  --cb-text-secondary: #64748b;
  --cb-border: var(--border);
  --cb-border-focus: var(--primary);
}

.dark {
  --primary: #818cf8;
  --background: #09090b;
  --foreground: #fafafa;
  --muted: #27272a;
  --border: #27272a;
  
  --cb-primary: var(--primary);
  --cb-primary-hover: #6366f1;
  --cb-bg: var(--background);
  --cb-bg-secondary: var(--muted);
  --cb-text: var(--foreground);
  --cb-text-secondary: #a1a1aa;
  --cb-border: var(--border);
  --cb-border-focus: var(--primary);
}
```

### 3. Render Editor Content (NO wrapper classes)

```tsx
// ❌ WRONG - prose classes pollute editor CSS
<div className="prose dark:prose-invert">
  <ContentBlocksRenderer html={content} />
</div>

// ✅ CORRECT - let editor CSS handle everything
<div>
  <ContentBlocksRenderer html={content} />
</div>

// ✅ Also correct - add padding if needed
<div className="p-6">
  <ContentBlocksRenderer html={content} />
</div>
```

---

## Available Editor CSS Variables

You can override these color variables to match your theme:

```css
/* Primary colors */
--cb-primary: #3b82f6;
--cb-primary-hover: #2563eb;

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

/* Semantic */
--cb-danger: #ef4444;
--cb-success: #10b981;
--cb-warning: #f59e0b;
--cb-info: #3b82f6;
```

**DO NOT override:**
- Layout CSS (padding, margins, flex, grid)
- Typography CSS (font-size, line-height, font-weight)
- Component structure (buttons, toolbars, blocks)

---

## Why This Matters

### The editor's CSS is carefully designed for:
- **Semantic HTML output** - clean `<h1>`, `<p>`, `<ul>`, `<code>`, etc.
- **Consistent rendering** - looks the same everywhere
- **Accessibility** - proper focus states, ARIA attributes
- **Performance** - minimal CSS, no unused styles

### When you add prose utilities or global CSS:
- ❌ Editor blocks render incorrectly
- ❌ Spacing/typography breaks
- ❌ Code blocks lose syntax highlighting styles
- ❌ Lists and tables look different than intended
- ❌ User's exported HTML won't match what they see

---

## Complete Example

```tsx
// app/layout.tsx
import 'authorly-editor/dist/style.css';
import './globals.css'; // Your minimal theme overrides

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

```css
/* globals.css - MINIMAL */
@import "tailwindcss";

:root {
  --primary: #6366f1;
  --background: #ffffff;
  --foreground: #0f172a;
  
  /* Editor color overrides */
  --cb-primary: var(--primary);
  --cb-bg: var(--background);
  --cb-text: var(--foreground);
}
```

```tsx
// components/editor-demo.tsx
import { ContentBlocksEditor, ContentBlocksRenderer } from 'authorly-editor';

export function EditorDemo() {
  const [content, setContent] = useState('');
  
  return (
    <>
      {/* Editor */}
      <ContentBlocksEditor 
        initialContent={content}
        onChange={setContent}
      />
      
      {/* Preview - NO prose classes */}
      <div className="mt-8">
        <ContentBlocksRenderer html={content} />
      </div>
    </>
  );
}
```

---

## Migration Guide

If you already have global CSS polluting the editor:

### Step 1: Backup current globals.css
```bash
mv globals.css globals.css.backup
```

### Step 2: Create minimal globals.css
See example above - ONLY colors and design tokens.

### Step 3: Remove prose classes
```diff
- <div className="prose dark:prose-invert">
+ <div>
    <ContentBlocksRenderer html={content} />
  </div>
```

### Step 4: Move landing page styles to Tailwind
Convert custom CSS to Tailwind utility classes or create scoped components.

---

## Summary

✅ **DO:**
- Import editor CSS
- Override color variables only
- Render content without wrapper classes
- Use Tailwind for your landing page

❌ **DON'T:**
- Add global CSS for `code`, `pre`, `ul`, `li`, etc.
- Use prose utility classes on editor content
- Override editor's structural CSS
- Mix editor CSS with landing page CSS
