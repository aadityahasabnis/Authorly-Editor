# Creating Custom Blocks

Learn how to extend Authorly with custom block types by implementing the BlockDefinition interface and registering new blocks.

## Overview

Authorly's block system is built on the **BlockDefinition** interface, which defines how blocks are created, rendered, and updated in the DOM. Creating custom blocks allows you to:

- Add specialized content types for your use case
- Integrate third-party services (embeds, widgets)
- Build domain-specific editing experiences
- Extend Authorly's capabilities without forking

## BlockDefinition Interface

Every block must implement the `BlockDefinition` interface:

```typescript
export interface BlockDefinition {
  /** Unique name for the block */
  name: BlockType;
  /** HTML tag this block renders to */
  tag: string;
  /** Whether the content is editable */
  editable: boolean;
  /** Allowed child types */
  allowedChildren: ('text' | 'inline' | 'block')[];
  /** Default CSS class */
  className?: string;
  /** Icon name for UI */
  icon?: string;
  /** Display label */
  label: string;
  /** Keyboard shortcut */
  shortcut?: string;
  /** Create the DOM element */
  create: (data?: any) => HTMLElement;
  /** Get block data from element */
  getData: (element: HTMLElement) => any;
  /** Update element with new data */
  update: (element: HTMLElement, data: any) => void;
}
```

## Block Data Interface

Define a TypeScript interface for your block's data:

```typescript
export interface CustomBlockData extends BaseBlockData {
  type: 'customBlock';
  // Add your custom fields
  title?: string;
  content?: string;
  customField?: string;
}
```

## Creating Your First Custom Block

### Example: Alert Block

Let's create a simple alert block with customizable severity levels:

```typescript
// blocks/alert.ts
import type { BlockDefinition } from 'authorly-editor';

export interface AlertData {
  id: string;
  type: 'alert';
  severity: 'info' | 'warning' | 'error';
  title?: string;
  message: string;
}

export const alertBlock: BlockDefinition = {
  name: 'alert',
  tag: 'div',
  editable: true,
  allowedChildren: ['text', 'inline'],
  className: 'custom-alert',
  icon: 'bell',
  label: 'Alert',
  
  create(data?: AlertData): HTMLElement {
    const severity = data?.severity || 'info';
    
    // Create container
    const container = document.createElement('div');
    container.className = `custom-alert custom-alert-${severity}`;
    container.setAttribute('data-block-id', data?.id || generateId());
    container.setAttribute('data-block-type', 'alert');
    container.setAttribute('data-severity', severity);
    
    // Icon
    const icon = document.createElement('div');
    icon.className = 'custom-alert-icon';
    icon.innerHTML = getAlertIcon(severity);
    container.appendChild(icon);
    
    // Content wrapper
    const content = document.createElement('div');
    content.className = 'custom-alert-content';
    
    // Title (optional)
    if (data?.title) {
      const title = document.createElement('div');
      title.className = 'custom-alert-title';
      title.contentEditable = 'true';
      title.textContent = data.title;
      content.appendChild(title);
    }
    
    // Message
    const message = document.createElement('div');
    message.className = 'custom-alert-message';
    message.contentEditable = 'true';
    message.setAttribute('data-placeholder', 'Enter alert message...');
    message.textContent = data?.message || '';
    content.appendChild(message);
    
    container.appendChild(content);
    
    return container;
  },
  
  getData(element: HTMLElement): AlertData {
    const title = element.querySelector('.custom-alert-title');
    const message = element.querySelector('.custom-alert-message');
    
    return {
      id: element.getAttribute('data-block-id') || '',
      type: 'alert',
      severity: element.getAttribute('data-severity') as AlertData['severity'],
      title: title?.textContent || undefined,
      message: message?.textContent || '',
    };
  },
  
  update(element: HTMLElement, data: Partial<AlertData>): void {
    if (data.severity) {
      element.className = `custom-alert custom-alert-${data.severity}`;
      element.setAttribute('data-severity', data.severity);
      
      // Update icon
      const icon = element.querySelector('.custom-alert-icon');
      if (icon) {
        icon.innerHTML = getAlertIcon(data.severity);
      }
    }
    
    if (data.message !== undefined) {
      const message = element.querySelector('.custom-alert-message');
      if (message) {
        message.textContent = data.message;
      }
    }
  },
};

function getAlertIcon(severity: string): string {
  const icons = {
    info: '<svg>...</svg>',
    warning: '<svg>...</svg>',
    error: '<svg>...</svg>',
  };
  return icons[severity] || icons.info;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
```

### Styling Your Custom Block

```css
/* styles/alert.css */
.custom-alert {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid;
  margin: 16px 0;
}

.custom-alert-info {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
  color: #1e40af;
}

.custom-alert-warning {
  background: rgba(245, 158, 11, 0.1);
  border-color: #f59e0b;
  color: #92400e;
}

.custom-alert-error {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
  color: #991b1b;
}

.custom-alert-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.custom-alert-content {
  flex: 1;
}

.custom-alert-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.custom-alert-message {
  font-size: 14px;
}
```

## Registering Custom Blocks

To use your custom block in the editor, pass it via the `customBlocks` prop:

```tsx
import { AuthorlyEditor } from 'authorly-editor';
import { alertBlock } from './blocks/alert';

function App() {
  return (
    <AuthorlyEditor 
      customBlocks={[alertBlock]}
    />
  );
}
```

## Advanced Examples

### Tweet Embed Block

A block that embeds tweets:

```typescript
// blocks/tweet.ts
import type { BlockDefinition } from 'authorly-editor';

export interface TweetData {
  id: string;
  type: 'tweet';
  tweetId: string;
  tweetUrl: string;
}

export const tweetBlock: BlockDefinition = {
  name: 'tweet',
  tag: 'div',
  editable: false,
  allowedChildren: [],
  className: 'embed-tweet',
  icon: 'twitter',
  label: 'Tweet',
  
  create(data?: TweetData): HTMLElement {
    const container = document.createElement('div');
    container.className = 'embed-tweet';
    container.setAttribute('data-block-id', data?.id || generateId());
    container.setAttribute('data-block-type', 'tweet');
    container.contentEditable = 'false';
    
    if (data?.tweetUrl) {
      // Create placeholder while loading
      container.innerHTML = `
        <div class="tweet-loading">
          <p>Loading tweet...</p>
        </div>
      `;
      
      // Load Twitter embed script
      loadTwitterEmbed(container, data.tweetUrl);
    } else {
      // Show input for tweet URL
      container.innerHTML = `
        <div class="tweet-input">
          <input 
            type="url" 
            placeholder="Enter tweet URL..." 
            class="tweet-url-input"
          />
        </div>
      `;
    }
    
    return container;
  },
  
  getData(element: HTMLElement): TweetData {
    return {
      id: element.getAttribute('data-block-id') || '',
      type: 'tweet',
      tweetId: element.getAttribute('data-tweet-id') || '',
      tweetUrl: element.getAttribute('data-tweet-url') || '',
    };
  },
  
  update(element: HTMLElement, data: Partial<TweetData>): void {
    if (data.tweetUrl) {
      element.setAttribute('data-tweet-url', data.tweetUrl);
      loadTwitterEmbed(element, data.tweetUrl);
    }
  },
};

async function loadTwitterEmbed(container: HTMLElement, url: string) {
  // Load Twitter widgets.js if not already loaded
  if (!window.twttr) {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);
    
    await new Promise(resolve => {
      script.onload = resolve;
    });
  }
  
  // Clear container
  container.innerHTML = '';
  
  // Create blockquote for Twitter embed
  const blockquote = document.createElement('blockquote');
  blockquote.className = 'twitter-tweet';
  
  const link = document.createElement('a');
  link.href = url;
  blockquote.appendChild(link);
  
  container.appendChild(blockquote);
  
  // Render tweet
  window.twttr.widgets.load(container);
}
```

### Mermaid Diagram Block

A block for rendering Mermaid diagrams:

```typescript
// blocks/mermaid.ts
import type { BlockDefinition } from 'authorly-editor';
import mermaid from 'mermaid';

export interface MermaidData {
  id: string;
  type: 'mermaid';
  code: string;
}

export const mermaidBlock: BlockDefinition = {
  name: 'mermaid',
  tag: 'div',
  editable: true,
  allowedChildren: ['text'],
  className: 'block-mermaid',
  icon: 'diagram',
  label: 'Diagram',
  
  create(data?: MermaidData): HTMLElement {
    const container = document.createElement('div');
    container.className = 'block-mermaid';
    container.setAttribute('data-block-id', data?.id || generateId());
    container.setAttribute('data-block-type', 'mermaid');
    
    // Code editor
    const editor = document.createElement('textarea');
    editor.className = 'mermaid-code';
    editor.placeholder = 'Enter Mermaid diagram code...';
    editor.value = data?.code || 'graph TD\n  A[Start] --> B[End]';
    editor.spellcheck = false;
    container.appendChild(editor);
    
    // Preview
    const preview = document.createElement('div');
    preview.className = 'mermaid-preview';
    container.appendChild(preview);
    
    // Render diagram
    renderMermaid(editor.value, preview);
    
    // Update on change
    editor.addEventListener('input', () => {
      renderMermaid(editor.value, preview);
    });
    
    return container;
  },
  
  getData(element: HTMLElement): MermaidData {
    const editor = element.querySelector('.mermaid-code') as HTMLTextAreaElement;
    
    return {
      id: element.getAttribute('data-block-id') || '',
      type: 'mermaid',
      code: editor?.value || '',
    };
  },
  
  update(element: HTMLElement, data: Partial<MermaidData>): void {
    if (data.code !== undefined) {
      const editor = element.querySelector('.mermaid-code') as HTMLTextAreaElement;
      const preview = element.querySelector('.mermaid-preview');
      
      if (editor) {
        editor.value = data.code;
      }
      
      if (preview) {
        renderMermaid(data.code, preview);
      }
    }
  },
};

async function renderMermaid(code: string, container: HTMLElement) {
  try {
    const { svg } = await mermaid.render(`mermaid-${Date.now()}`, code);
    container.innerHTML = svg;
    container.classList.remove('error');
  } catch (error) {
    container.innerHTML = `<div class="error">Invalid diagram syntax</div>`;
    container.classList.add('error');
  }
}

// Initialize Mermaid
mermaid.initialize({ 
  startOnLoad: false,
  theme: 'default',
});
```

### Math Equation Block (KaTeX)

A block for rendering mathematical equations:

```typescript
// blocks/math.ts
import type { BlockDefinition } from 'authorly-editor';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export interface MathData {
  id: string;
  type: 'math';
  equation: string;
  displayMode: boolean;
}

export const mathBlock: BlockDefinition = {
  name: 'math',
  tag: 'div',
  editable: true,
  allowedChildren: ['text'],
  className: 'block-math',
  icon: 'function',
  label: 'Math Equation',
  
  create(data?: MathData): HTMLElement {
    const container = document.createElement('div');
    container.className = 'block-math';
    container.setAttribute('data-block-id', data?.id || generateId());
    container.setAttribute('data-block-type', 'math');
    
    // Input
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'math-input';
    input.placeholder = 'Enter LaTeX equation...';
    input.value = data?.equation || '';
    container.appendChild(input);
    
    // Preview
    const preview = document.createElement('div');
    preview.className = 'math-preview';
    container.appendChild(preview);
    
    // Render equation
    if (input.value) {
      renderMath(input.value, preview, data?.displayMode || false);
    }
    
    // Update on change
    input.addEventListener('input', () => {
      renderMath(input.value, preview, data?.displayMode || false);
    });
    
    return container;
  },
  
  getData(element: HTMLElement): MathData {
    const input = element.querySelector('.math-input') as HTMLInputElement;
    
    return {
      id: element.getAttribute('data-block-id') || '',
      type: 'math',
      equation: input?.value || '',
      displayMode: element.classList.contains('display-mode'),
    };
  },
  
  update(element: HTMLElement, data: Partial<MathData>): void {
    const input = element.querySelector('.math-input') as HTMLInputElement;
    const preview = element.querySelector('.math-preview');
    
    if (data.equation !== undefined && input) {
      input.value = data.equation;
      if (preview) {
        renderMath(data.equation, preview, data.displayMode || false);
      }
    }
  },
};

function renderMath(latex: string, container: HTMLElement, displayMode: boolean) {
  try {
    katex.render(latex, container, {
      displayMode,
      throwOnError: false,
    });
    container.classList.remove('error');
  } catch (error) {
    container.innerHTML = `<span class="error">Invalid LaTeX</span>`;
    container.classList.add('error');
  }
}
```

## Block Utilities

### Helper Functions

Create reusable utilities for common block operations:

```typescript
// utils/block-helpers.ts

/**
 * Generate unique block ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Set block attribute safely
 */
export function setBlockAttribute(
  element: HTMLElement, 
  key: string, 
  value: string
): void {
  element.setAttribute(`data-${key}`, value);
}

/**
 * Get block attribute
 */
export function getBlockAttribute(
  element: HTMLElement, 
  key: string
): string | null {
  return element.getAttribute(`data-${key}`);
}

/**
 * Create editable content area
 */
export function createEditableContent(
  className: string,
  placeholder?: string,
  content?: string
): HTMLDivElement {
  const div = document.createElement('div');
  div.className = className;
  div.contentEditable = 'true';
  
  if (placeholder) {
    div.setAttribute('data-placeholder', placeholder);
  }
  
  if (content) {
    div.innerHTML = content;
  }
  
  return div;
}
```

## Testing Custom Blocks

### Unit Tests

```typescript
// blocks/__tests__/alert.test.ts
import { describe, it, expect } from 'vitest';
import { alertBlock } from '../alert';

describe('alertBlock', () => {
  it('creates alert element with default data', () => {
    const element = alertBlock.create();
    
    expect(element.tagName).toBe('DIV');
    expect(element.className).toContain('custom-alert');
    expect(element.getAttribute('data-block-type')).toBe('alert');
  });
  
  it('creates alert with custom severity', () => {
    const element = alertBlock.create({
      id: 'test-1',
      type: 'alert',
      severity: 'error',
      message: 'Error message',
    });
    
    expect(element.getAttribute('data-severity')).toBe('error');
    expect(element.className).toContain('custom-alert-error');
  });
  
  it('extracts data correctly', () => {
    const element = alertBlock.create({
      id: 'test-2',
      type: 'alert',
      severity: 'warning',
      title: 'Warning',
      message: 'This is a warning',
    });
    
    const data = alertBlock.getData(element);
    
    expect(data.severity).toBe('warning');
    expect(data.title).toBe('Warning');
    expect(data.message).toBe('This is a warning');
  });
});
```

## Best Practices

### 1. Always Use data-* Attributes

Store block metadata in data attributes for reliable data extraction:

```typescript
container.setAttribute('data-block-id', id);
container.setAttribute('data-block-type', 'custom');
container.setAttribute('data-custom-field', value);
```

### 2. Handle Contenteditable Correctly

Mark editable and non-editable regions explicitly:

```typescript
// Editable content
messageDiv.contentEditable = 'true';

// Non-editable controls
controls.contentEditable = 'false';
```

### 3. Provide Placeholders

Use placeholders for empty editable content:

```typescript
div.setAttribute('data-placeholder', 'Type something...');
```

Then style with CSS:

```css
[data-placeholder]:empty:before {
  content: attr(data-placeholder);
  color: #9ca3af;
  pointer-events: none;
}
```

### 4. Clean Up Resources

Remove event listeners and external resources in the update method:

```typescript
update(element: HTMLElement, data: any): void {
  // Remove old listeners
  const oldButton = element.querySelector('.action-button');
  oldButton?.removeEventListener('click', handler);
  
  // Update content
  // ...
  
  // Add new listeners
  const newButton = element.querySelector('.action-button');
  newButton?.addEventListener('click', newHandler);
}
```

### 5. Validate Input

Always validate and sanitize user input:

```typescript
create(data?: CustomData): HTMLElement {
  // Validate URL
  const url = isValidUrl(data?.url) ? data.url : '';
  
  // Sanitize HTML
  const content = sanitizeHtml(data?.content || '');
  
  // ... create element
}
```

## Related Documentation

- [Editor Props](../api/editor-props) - customBlocks prop reference
- [Advanced Styling](./styling) - Styling custom blocks
- [Block Types](../blocks/paragraph) - Built-in block examples
- [TypeScript Types](../api/editor-props) - BlockDefinition interface
