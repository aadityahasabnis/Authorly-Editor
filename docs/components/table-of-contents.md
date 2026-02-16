# AuthorlyTOC

The `AuthorlyTOC` component automatically extracts headings from HTML content and renders them as a hierarchical navigation menu. It's perfect for documentation sites, blog posts, and long-form content.

## Features

- Automatic heading extraction from HTML
- Nested hierarchy support (H1-H6)
- Smooth scroll navigation
- Dark mode support
- Collapsible/expandable view
- Fully styled (no external CSS needed)
- Custom heading level filtering
- TypeScript support

## Import

```tsx
import { AuthorlyTOC } from 'authorly-editor';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `html` | `string` | (required) | HTML content to extract headings from |
| `darkMode` | `boolean` | `false` | Enable dark mode styling |
| `className` | `string` | `''` | Additional CSS class name |
| `style` | `React.CSSProperties` | `undefined` | Inline styles |
| `title` | `string` | `'Table of Contents'` | Title displayed above TOC |
| `minLevel` | `number` | `1` | Minimum heading level to include (1-6) |
| `maxLevel` | `number` | `6` | Maximum heading level to include (1-6) |
| `onNavigate` | `(id: string, item: TocItem) => void` | `undefined` | Custom navigation handler |
| `smoothScroll` | `boolean` | `true` | Enable smooth scroll animation |
| `targetContainer` | `HTMLElement \| string \| null` | `null` | Container to find headings in (element or selector) |
| `collapsible` | `boolean` | `false` | Make TOC collapsible |
| `defaultCollapsed` | `boolean` | `false` | Initial collapsed state |

## Basic Usage

```tsx
import { AuthorlyRenderer, AuthorlyTOC } from 'authorly-editor';

function BlogPost({ htmlContent }: { htmlContent: string }) {
  return (
    <div className="blog-layout">
      <aside className="sidebar">
        <AuthorlyTOC 
          html={htmlContent}
          title="Contents"
        />
      </aside>
      
      <main>
        <AuthorlyRenderer html={htmlContent} />
      </main>
    </div>
  );
}
```

## Custom Heading Levels

Limit which heading levels appear in the TOC:

```tsx
// Only show H2 and H3 headings
<AuthorlyTOC 
  html={content}
  minLevel={2}
  maxLevel={3}
  title="On This Page"
/>
```

This is useful when you have a single H1 title and want the TOC to show only subsections.

## Collapsible TOC

Make the TOC collapsible to save space:

```tsx
<AuthorlyTOC 
  html={content}
  collapsible={true}
  defaultCollapsed={false}
  title="Quick Navigation"
/>
```

## Custom Navigation Handler

Override the default scroll behavior:

```tsx
function DocPage({ content }: { content: string }) {
  const handleNavigate = (id: string, item: TocItem) => {
    // Custom navigation logic
    console.log('Navigating to:', item.text);
    
    // Update URL hash
    window.history.pushState(null, '', `#${id}`);
    
    // Custom scroll with offset for fixed header
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of fixed header
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <AuthorlyTOC 
      html={content}
      onNavigate={handleNavigate}
    />
  );
}
```

## Target Container

Specify a container to search for headings (useful for scoped content):

```tsx
<AuthorlyTOC 
  html={content}
  targetContainer="#article-content"
  // or pass an element directly:
  // targetContainer={containerRef.current}
/>
```

## Dark Mode

```tsx
import { useState } from 'react';

function DarkModeExample({ content }: { content: string }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <div>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle Dark Mode
      </button>
      
      <AuthorlyTOC 
        html={content}
        darkMode={isDark}
      />
    </div>
  );
}
```

## With Editor

Use alongside the editor to show a live TOC:

```tsx
import { useRef, useState } from 'react';
import { AuthorlyEditor, AuthorlyTOC, EditorRef } from 'authorly-editor';

function EditorWithTOC() {
  const editorRef = useRef<EditorRef>(null);
  const [html, setHtml] = useState('');

  const handleUpdate = () => {
    const content = editorRef.current?.getHTML();
    if (content) {
      setHtml(content);
    }
  };

  return (
    <div className="editor-layout">
      <aside className="toc-sidebar">
        <AuthorlyTOC 
          html={html}
          title="Document Outline"
          minLevel={1}
          maxLevel={3}
        />
      </aside>
      
      <main>
        <AuthorlyEditor 
          ref={editorRef}
          onChange={handleUpdate}
          placeholder="Start writing..."
        />
      </main>
    </div>
  );
}
```

## TocItem Interface

```tsx
interface TocItem {
  id: string;        // Heading ID (from HTML or auto-generated)
  text: string;      // Heading text content
  level: number;     // Heading level (1-6)
  children: TocItem[]; // Nested child headings
}
```

## Utility Function

You can also use the `parseHeadings` utility directly:

```tsx
import { parseHeadings } from 'authorly-editor';

const htmlContent = '<h1 id="intro">Introduction</h1><h2 id="features">Features</h2>';
const tocItems = parseHeadings(htmlContent, 1, 6);

console.log(tocItems);
// [
//   {
//     id: 'intro',
//     text: 'Introduction',
//     level: 1,
//     children: [
//       {
//         id: 'features',
//         text: 'Features',
//         level: 2,
//         children: []
//       }
//     ]
//   }
// ]
```

## Styling

The AuthorlyTOC includes all necessary styles by default. However, you can customize with CSS:

```css
/* Override TOC title color */
.cbtoc-title {
  color: #3b82f6;
}

/* Customize link hover state */
.cbtoc-link:hover {
  background: #eff6ff;
  color: #1e40af;
}

/* Adjust spacing */
.cbtoc-list-nested {
  padding-left: 1rem;
}
```

## Common Patterns

### Sticky Sidebar TOC

```tsx
<aside style={{ 
  position: 'sticky', 
  top: 20, 
  maxHeight: 'calc(100vh - 40px)',
  overflowY: 'auto' 
}}>
  <AuthorlyTOC 
    html={content}
    title="On This Page"
  />
</aside>
```

### Responsive TOC

```tsx
function ResponsiveTOC({ content }: { content: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <AuthorlyTOC 
      html={content}
      collapsible={isMobile}
      defaultCollapsed={isMobile}
    />
  );
}
```

### With Active Heading Highlight

```tsx
function TOCWithActiveHeading({ content }: { content: string }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    // Observe all headings
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
      if (heading.id) observer.observe(heading);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AuthorlyTOC 
      html={content}
      className="toc-with-active"
      style={{ '--active-id': activeId } as React.CSSProperties}
    />
  );
}
```

## How It Works

1. **Parsing**: The component uses `DOMParser` to parse the HTML string
2. **Extraction**: It finds all heading elements (H1-H6) within the specified level range
3. **Nesting**: Headings are organized hierarchically based on their levels
4. **IDs**: Uses existing heading IDs or generates them automatically
5. **Navigation**: Clicking a TOC item scrolls to the corresponding heading

## Notes

- Headings must have `id` attributes for navigation to work (the Renderer adds these automatically)
- The component is self-contained with inline styles
- Works in both client and server components (parsing only)
- Nested headings must follow proper hierarchy (H2 under H1, H3 under H2, etc.)

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Uses `DOMParser` API (widely supported)
- Smooth scroll requires `scroll-behavior` support

## See Also

- [AuthorlyRenderer](/docs/components/renderer) - Automatically adds IDs to headings
- [AuthorlyEditor](/docs/components/editor) - Generate content with headings
- [Quick Start Guide](/docs/quick-start) - Complete setup example
