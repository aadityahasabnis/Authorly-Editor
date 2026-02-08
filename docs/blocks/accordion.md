# Accordion

The Accordion block creates collapsible sections of content, perfect for FAQs, documentation, or organizing large amounts of information. Uses the native HTML `<details>` element for accessibility and progressive enhancement.

## Features

- Native HTML `<details>` and `<summary>` elements
- Accessible by default (keyboard navigation, screen readers)
- Smooth animation when expanding/collapsing
- Editable title and content
- Toggle open/closed state programmatically
- No JavaScript required for basic functionality
- Customizable styling

## Usage

### Insert via Slash Command

```
Type "/" → Search "accordion" → Press Enter
```

Or use the keyword: `/accordion`, `/collapse`, `/toggle`, `/details`

### Insert via Toolbar

Click the Accordion button (chevron icon) in the toolbar.

### Programmatic Insertion

```tsx
import { useRef } from 'react';
import { ContentBlocksEditor, EditorRef } from 'authorly-editor';

function MyEditor() {
  const editorRef = useRef<EditorRef>(null);

  const insertAccordion = () => {
    editorRef.current?.insertBlock('accordion', {
      title: 'Frequently Asked Questions',
      content: '<p>What is Authorly?</p><p>Authorly is a lightweight rich text editor.</p>',
      open: false,
    });
  };

  return (
    <>
      <button onClick={insertAccordion}>Add FAQ Section</button>
      <ContentBlocksEditor ref={editorRef} />
    </>
  );
}
```

## Data Structure

```tsx
interface AccordionData {
  id: string;
  type: 'accordion';
  title: string;       // Title text (shown in summary)
  content: string;     // Content HTML (shown when expanded)
  open: boolean;       // Whether accordion is expanded
}
```

## HTML Output

```html
<details class="cb-accordion" data-block-id="abc123" data-block-type="accordion" open>
  <summary class="cb-accordion-title">
    <span class="cb-accordion-title-text" contenteditable="true">
      Frequently Asked Questions
    </span>
    <span class="cb-accordion-chevron">
      <svg><!-- Chevron icon --></svg>
    </span>
  </summary>
  
  <div class="cb-accordion-content" contenteditable="true">
    <p>What is Authorly?</p>
    <p>Authorly is a lightweight rich text editor for React.</p>
  </div>
</details>
```

## Examples

### Basic FAQ

```tsx
editorRef.current?.insertBlock('accordion', {
  title: 'What is Authorly?',
  content: '<p>Authorly is a modern rich text editor built with React and TypeScript.</p>',
  open: false,
});
```

### Expanded by Default

```tsx
editorRef.current?.insertBlock('accordion', {
  title: 'Getting Started',
  content: '<p>Install Authorly with npm install authorly-editor</p>',
  open: true,  // Open by default
});
```

### Nested Content

```tsx
editorRef.current?.insertBlock('accordion', {
  title: 'Advanced Features',
  content: `
    <h3>Block Types</h3>
    <ul>
      <li>Headings (H1-H6)</li>
      <li>Lists (bullet, numbered, checklist)</li>
      <li>Code blocks</li>
      <li>Tables</li>
    </ul>
    <h3>Media Support</h3>
    <p>Images, videos, and Excalidraw drawings.</p>
  `,
  open: false,
});
```

### Multiple Accordions

```tsx
const faqs = [
  {
    title: 'How do I install Authorly?',
    content: '<pre><code>npm install authorly-editor</code></pre>',
  },
  {
    title: 'Is TypeScript supported?',
    content: '<p>Yes! Authorly is written in TypeScript with full type definitions.</p>',
  },
  {
    title: 'Can I use it with Next.js?',
    content: '<p>Absolutely. Import dynamically with <code>ssr: false</code>.</p>',
  },
];

faqs.forEach(faq => {
  editorRef.current?.insertBlock('accordion', {
    ...faq,
    open: false,
  });
});
```

## Programmatic Control

### Toggle Accordion

```tsx
import { toggleAccordion } from 'authorly-editor';

// Get accordion element
const accordionElement = document.querySelector('[data-block-type="accordion"]');

if (accordionElement) {
  const isNowOpen = toggleAccordion(accordionElement);
  console.log('Accordion is now:', isNowOpen ? 'open' : 'closed');
}
```

### Set Open State

```tsx
import { setAccordionOpen } from 'authorly-editor';

const accordionElement = document.querySelector('[data-block-type="accordion"]');

// Open the accordion
setAccordionOpen(accordionElement, true);

// Close the accordion
setAccordionOpen(accordionElement, false);
```

### Get Accordion Data

```tsx
import { accordionBlock } from 'authorly-editor';

const accordionElement = document.querySelector('[data-block-type="accordion"]');
const data = accordionBlock.getData(accordionElement);

console.log(data);
// {
//   id: 'abc123',
//   type: 'accordion',
//   title: 'FAQ Title',
//   content: '<p>Content HTML</p>',
//   open: true
// }
```

## Styling

### Default Styles

The accordion comes with built-in styles using CSS custom properties:

```css
.cb-accordion {
  border: 1px solid var(--cb-border);
  border-radius: var(--cb-radius-md);
  background: var(--cb-bg);
  margin: var(--cb-spacing-md) 0;
}

.cb-accordion-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--cb-spacing-md);
  cursor: pointer;
  font-weight: 600;
  user-select: none;
}

.cb-accordion-chevron {
  transition: transform 0.2s ease;
}

/* Rotate chevron when open */
.cb-accordion[open] .cb-accordion-chevron {
  transform: rotate(180deg);
}

.cb-accordion-content {
  padding: 0 var(--cb-spacing-md) var(--cb-spacing-md);
  line-height: 1.6;
}
```

### Custom Styling

```css
/* Colored accordion */
.cb-accordion {
  background: linear-gradient(to right, #eff6ff, #dbeafe);
  border-left: 4px solid #3b82f6;
}

/* Hover effect */
.cb-accordion-title:hover {
  background: rgba(59, 130, 246, 0.1);
}

/* Smooth content reveal */
.cb-accordion-content {
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Dark Mode

```css
.cb-dark .cb-accordion {
  background: var(--cb-bg-secondary);
  border-color: var(--cb-border);
}

.cb-dark .cb-accordion-title {
  color: var(--cb-text);
}
```

## Common Patterns

### FAQ Section

```tsx
function FAQEditor() {
  const editorRef = useRef<EditorRef>(null);

  const addFAQ = () => {
    editorRef.current?.insertBlock('accordion', {
      title: 'New Question',
      content: '<p>Answer goes here...</p>',
      open: false,
    });
  };

  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      <button onClick={addFAQ}>Add Question</button>
      <ContentBlocksEditor ref={editorRef} />
    </div>
  );
}
```

### Documentation Sections

```tsx
// Collapsible API documentation
editorRef.current?.insertBlock('accordion', {
  title: 'API Reference: ContentBlocksEditor',
  content: `
    <h4>Props</h4>
    <table>
      <tr><th>Prop</th><th>Type</th><th>Description</th></tr>
      <tr><td>placeholder</td><td>string</td><td>Placeholder text</td></tr>
    </table>
  `,
  open: false,
});
```

### Progressive Disclosure

```tsx
// Start with first accordion open, rest closed
const sections = [
  { title: 'Step 1: Installation', content: '...', open: true },
  { title: 'Step 2: Configuration', content: '...', open: false },
  { title: 'Step 3: Usage', content: '...', open: false },
];

sections.forEach(section => {
  editorRef.current?.insertBlock('accordion', section);
});
```

### Expand All / Collapse All

```tsx
function AccordionControls() {
  const expandAll = () => {
    document.querySelectorAll('[data-block-type="accordion"]').forEach(el => {
      setAccordionOpen(el as HTMLElement, true);
    });
  };

  const collapseAll = () => {
    document.querySelectorAll('[data-block-type="accordion"]').forEach(el => {
      setAccordionOpen(el as HTMLElement, false);
    });
  };

  return (
    <div>
      <button onClick={expandAll}>Expand All</button>
      <button onClick={collapseAll}>Collapse All</button>
    </div>
  );
}
```

## Rendering

Use the ContentBlocksRenderer to display accordion content:

```tsx
import { ContentBlocksRenderer } from 'authorly-editor';

function DisplayAccordions({ html }: { html: string }) {
  return <ContentBlocksRenderer html={html} />;
}
```

The rendered accordion will:
- Be fully functional (expand/collapse)
- Work without JavaScript (progressive enhancement)
- Be keyboard accessible (Space/Enter to toggle)
- Be screen reader friendly

## Accessibility

The accordion block is accessible by default:

- Uses semantic `<details>` and `<summary>` HTML elements
- Keyboard navigable (Tab to focus, Space/Enter to toggle)
- Screen reader support (announces expanded/collapsed state)
- Focus indicators on summary element
- Proper ARIA states handled automatically by browser

### Keyboard Controls

| Key | Action |
|-----|--------|
| `Tab` | Focus accordion summary |
| `Space` or `Enter` | Toggle expand/collapse |
| `Shift+Tab` | Focus previous element |

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Uses native `<details>` element (supported in all browsers since 2020)
- Older browsers fall back to always-open state (graceful degradation)

## Performance

- Lightweight (uses native browser functionality)
- No JavaScript required for basic expand/collapse
- Smooth CSS transitions
- Content not rendered until expanded (browser optimization)

## Tips

1. **Keep titles concise**: Use short, descriptive titles for better scannability
2. **Don't nest accordions**: Nested accordions can be confusing for users
3. **Start closed**: Generally better UX to start accordions closed unless showing important info
4. **Limit number**: Too many accordions can be overwhelming; consider grouping
5. **Add icons**: Use the chevron to indicate expandable content

## See Also

- [Callout Block](/docs/blocks/callout) - Highlight important information
- [Table Block](/docs/blocks/table) - Organize data
- [ContentBlocksEditor](/docs/components/editor) - Editor component
- [BlockMenu](/docs/components/block-menu) - Insert blocks via slash commands
