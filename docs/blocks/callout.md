# Callout

Callouts draw attention to important information, warnings, tips, or notes within your content. They provide visual emphasis and help readers quickly identify key points.

## Overview

Callouts are perfect for:

- **Highlighting key information** - Make important details stand out
- **Warnings and cautions** - Alert users to potential issues
- **Tips and best practices** - Share helpful advice
- **Notes and side information** - Provide context without interrupting flow
- **Success messages** - Celebrate wins or confirmations

**Key features:**
- Multiple callout types (info, warning, error, success, tip)
- Custom icons per type
- Color-coded for quick recognition
- Supports rich formatting inside
- Clean, accessible HTML output

## Callout Types

### Info Callout

General information or notes:

```
> **Info:** This is important information you should know.
```

**Use for:**
- General notes
- Additional context
- Related information
- Fun facts

### Warning Callout

Cautionary information:

```
> **Warning:** Proceeding will permanently delete your data.
```

**Use for:**
- Potential issues
- Things to watch out for
- Breaking changes
- Deprecation notices

### Error Callout

Critical issues or errors:

```
> **Error:** Invalid configuration detected. Please check your settings.
```

**Use for:**
- Error messages
- Critical problems
- Blocking issues
- Failed validations

### Success Callout

Positive confirmations:

```
> **Success:** Your changes have been saved successfully!
```

**Use for:**
- Confirmations
- Completed tasks
- Positive outcomes
- Achievement messages

### Tip Callout

Helpful suggestions:

```
> **Tip:** Use keyboard shortcuts to work faster.
```

**Use for:**
- Pro tips
- Shortcuts
- Best practices
- Helpful hints

## Creating Callouts

### Using Slash Command

Type `/callout` to insert:

```
/callout
```

Then select the callout type from the menu.

### Using Markdown

Type the callout syntax:

```markdown
> **Note:** This is a callout with important information.
```

The callout is styled based on the keyword (Note, Warning, Tip, etc.).

### Via Toolbar

1. Click where you want the callout
2. Click "Callout" in the toolbar
3. Choose callout type
4. Enter content

## Callout Content

### Basic Content

Simple text callouts:

```
> **Info:** Authorly supports markdown syntax for all block types.
```

### Multi-line Content

Callouts can span multiple lines:

```
> **Warning:** Before upgrading to version 2.0:
> 
> - Back up your data
> - Review breaking changes
> - Test in development first
```

### Rich Formatting

Use formatting inside callouts:

```
> **Tip:** Use `Ctrl/Cmd + K` to insert **links** quickly. 
> See the [keyboard shortcuts](/docs/shortcuts) for more.
```

### With Code

Include code examples:

```
> **Note:** Always validate user input:
> 
> ```typescript
> const sanitized = sanitize(userInput);
> ```
```

### With Links

Add helpful links:

```
> **Info:** For more details, see the 
> [official documentation](https://example.com).
```

## Best Practices

### Use Callouts Sparingly

```
❌ Too many callouts:
[Callout]
Paragraph
[Callout]
Paragraph
[Callout]

✅ Strategic placement:
[Several paragraphs]
[Callout for important point]
[More content]
```

### Choose the Right Type

```
❌ Wrong type:
> **Error:** Here's a helpful tip...

✅ Correct type:
> **Tip:** Here's a helpful tip...
```

### Keep Content Concise

```
❌ Too verbose:
> **Note:** This is a very long callout with multiple 
> paragraphs explaining various concepts in excessive 
> detail that could be better placed in the main content...

✅ Focused:
> **Note:** Remember to save your changes before exiting.
```

### Write Clear Titles

```
❌ Vague:
> **Info:** Something to know

✅ Specific:
> **Info:** API rate limits apply to all endpoints
```

### Don't Overuse Warnings

```
❌ Everything is a warning:
> **Warning:** You need Node.js
> **Warning:** Install dependencies
> **Warning:** Run the dev server

✅ Appropriate warnings:
> **Info:** Prerequisites: Node.js 16+
> **Tip:** Run `npm install` to get started
```

## Common Use Cases

### Documentation Warnings

```markdown
## Installation

> **Warning:** Node.js 18 or higher is required. 
> Version 16 is no longer supported.

Install the package using npm:

\`\`\`bash
npm install authorly-editor
\`\`\`
```

### Breaking Changes

```markdown
## Migration Guide

> **Error:** Breaking change in v2.0: The `onChange` prop 
> now receives HTML instead of JSON. Update your code accordingly.

**Before:**
\`\`\`tsx
onChange={(json) => save(json)}
\`\`\`

**After:**
\`\`\`tsx
onChange={(html) => save(html)}
\`\`\`
```

### Best Practice Tips

```markdown
## Performance Optimization

> **Tip:** Use the `lazyLoadImages` prop to improve initial 
> load time for pages with many images.

\`\`\`tsx
<AuthorlyRenderer
  html={content}
  lazyLoadImages={true}
/>
\`\`\`
```

### Important Notes

```markdown
## API Authentication

> **Info:** All API requests must include an authentication 
> token in the `Authorization` header.

Example request:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_TOKEN" \\
  https://api.example.com/users
\`\`\`
```

### Security Alerts

```markdown
## Security Best Practices

> **Warning:** Never expose your API keys in client-side code. 
> Always use environment variables and server-side validation.

> **Error:** Storing passwords in plain text is a critical 
> security vulnerability. Always use bcrypt or similar hashing.
```

### Feature Announcements

```markdown
## What's New in v2.0

> **Success:** The new block menu is 3x faster and includes 
> fuzzy search!

> **Tip:** Press `/` anywhere in the editor to open the 
> block menu instantly.
```

## HTML Output

Callouts generate semantic HTML:

### Basic Callout

**Input:**
```markdown
> **Note:** This is a note callout.
```

**Output:**
```html
<div class="callout callout-info">
  <div class="callout-icon">ℹ️</div>
  <div class="callout-content">
    <strong>Note:</strong> This is a note callout.
  </div>
</div>
```

### With Multiple Paragraphs

**Input:**
```markdown
> **Warning:** Important information here.
> 
> Additional details in a second paragraph.
```

**Output:**
```html
<div class="callout callout-warning">
  <div class="callout-icon">⚠️</div>
  <div class="callout-content">
    <p><strong>Warning:</strong> Important information here.</p>
    <p>Additional details in a second paragraph.</p>
  </div>
</div>
```

## Styling Callouts

### Default Styles

Authorly provides color-coded callout styles:

```css
.authorly-editor .callout {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid;
}

.callout-info {
  background: #eff6ff;
  border-color: #3b82f6;
  color: #1e40af;
}

.callout-warning {
  background: #fef3c7;
  border-color: #f59e0b;
  color: #92400e;
}

.callout-error {
  background: #fee2e2;
  border-color: #ef4444;
  color: #991b1b;
}

.callout-success {
  background: #d1fae5;
  border-color: #10b981;
  color: #065f46;
}

.callout-tip {
  background: #f3e8ff;
  border-color: #a855f7;
  color: #6b21a8;
}
```

### Custom Styling

Create your own callout styles:

```css
/* Minimal callout */
.authorly-editor .callout {
  background: transparent;
  border: 1px solid #e5e7eb;
  border-left: 3px solid;
}

/* Card-style callout */
.authorly-editor .callout {
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
  border: none;
  border-left: 4px solid;
}

/* Gradient callout */
.authorly-editor .callout-info {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

/* With emoji icons */
.callout-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.callout-info .callout-icon::before {
  content: 'ℹ️';
}

.callout-warning .callout-icon::before {
  content: '⚠️';
}

.callout-error .callout-icon::before {
  content: '❌';
}

.callout-success .callout-icon::before {
  content: '✅';
}

.callout-tip .callout-icon::before {
  content: '💡';
}
```

### Dark Mode

Adapt callouts for dark theme:

```css
[data-theme="dark"] .callout-info {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
  color: #93c5fd;
}

[data-theme="dark"] .callout-warning {
  background: rgba(245, 158, 11, 0.1);
  border-color: #f59e0b;
  color: #fbbf24;
}

[data-theme="dark"] .callout-error {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
  color: #fca5a5;
}

[data-theme="dark"] .callout-success {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  color: #6ee7b7;
}
```

## Accessibility

Callouts should be accessible:

### Use Semantic HTML

```html
✅ Accessible:
<div class="callout" role="note" aria-label="Information">
  <p>Content here</p>
</div>

❌ Not semantic:
<div class="pretty-box">
  <p>Content here</p>
</div>
```

### ARIA Roles

Add appropriate ARIA roles:

```html
<!-- Info callout -->
<div class="callout" role="note">

<!-- Warning callout -->
<div class="callout" role="alert">

<!-- Error callout -->
<div class="callout" role="alert" aria-live="assertive">
```

### Color Contrast

Ensure text is readable:

```css
/* Good contrast */
.callout-info {
  background: #eff6ff;
  color: #1e3a8a;  /* WCAG AA compliant */
}

/* Check contrast ratio: minimum 4.5:1 */
```

### Don't Rely on Color Alone

Use icons and text to convey meaning:

```html
✅ Multiple indicators:
<div class="callout-warning">
  <span class="icon">⚠️</span>
  <strong>Warning:</strong> Message
</div>

❌ Color only:
<div class="orange-box">
  Message
</div>
```

## Advanced Techniques

### Collapsible Callouts

Make callouts expandable:

```tsx
function CollapsibleCallout({ title, children, type }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`callout callout-${type}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '▼' : '▶'} {title}
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
}
```

### Custom Callout Types

Add your own callout types:

```tsx
const customCallouts = {
  'deprecated': {
    icon: '🚫',
    color: '#ef4444',
    background: '#fee2e2',
  },
  'beta': {
    icon: '🧪',
    color: '#8b5cf6',
    background: '#f3e8ff',
  },
  'pro': {
    icon: '⭐',
    color: '#f59e0b',
    background: '#fef3c7',
  },
};
```

### Nested Content

Support rich content:

```markdown
> **Note:** Prerequisites for this tutorial:
> 
> 1. Node.js 18 or higher
> 2. Basic React knowledge
> 3. Familiarity with TypeScript
> 
> Not ready yet? Check out our [beginner's guide](/guide).
```

## Troubleshooting

### Callout Not Styling

**Issue:** Callout appears as plain blockquote  
**Solution:** Ensure keyword (Note, Warning, etc.) is in bold

### Wrong Callout Type

**Issue:** Warning appears as Info  
**Solution:** Check keyword spelling and capitalization

### Icon Not Showing

**Issue:** Callout icon is missing  
**Solution:** Verify icon CSS or emoji is properly configured

### Callout Too Wide

**Issue:** Callout spans full width  
**Solution:** Add max-width constraint in CSS

## Examples

### Tutorial Documentation

```markdown
# Getting Started with Authorly

> **Info:** This tutorial takes approximately 15 minutes to complete.

## Installation

> **Warning:** Make sure you have Node.js 18+ installed before proceeding.

Install Authorly using npm:

\`\`\`bash
npm install authorly-editor
\`\`\`

> **Success:** Installation complete! You're ready to start building.

## First Steps

> **Tip:** Use TypeScript for the best developer experience with 
> full autocomplete and type checking.
```

### API Documentation

```markdown
## Authentication

> **Error:** All requests without valid authentication will return a 
> `401 Unauthorized` response.

Include your API key in the Authorization header:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.example.com/v1/users
\`\`\`

> **Tip:** Store API keys in environment variables, never commit them 
> to version control.
```

### Changelog

```markdown
## Version 2.0.0 (2024-01-15)

> **Warning:** This is a major version with breaking changes. 
> Please review the migration guide before upgrading.

### Breaking Changes

> **Error:** The `blocks` prop has been renamed to `initialContent` 
> and now expects HTML instead of JSON.

\`\`\`diff
- <Editor blocks={jsonBlocks} />
+ <Editor initialContent={htmlContent} />
\`\`\`

### New Features

> **Success:** Added support for custom block types!

> **Tip:** Use the new `registerBlock()` API to create custom blocks.
```
