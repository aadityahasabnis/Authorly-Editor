# Divider

Dividers create visual separation between sections of content. Also known as horizontal rules, they help organize information and improve document structure.

## Overview

Dividers are useful for:

- **Section breaks** - Separate distinct topics
- **Visual rhythm** - Break up long content
- **Thematic transitions** - Signal topic changes
- **Content organization** - Create clear boundaries

## Creating Dividers

### Using Slash Command

Type `/divider` or `/hr`:

```
/divider
```

A horizontal line is inserted immediately.

### Using Markdown

Type three dashes, asterisks, or underscores:

```
---
***
___
```

All three create the same divider.

### Keyboard Shortcut

Press `Ctrl/Cmd + Shift + H` to insert a divider.

## When to Use Dividers

### Good Use Cases

```markdown
✅ Between major sections:

# Article Title

Introduction paragraph...

---

## First Section

Content here...

---

## Second Section

More content...
```

### Avoid Overuse

```markdown
❌ Too many dividers:

Paragraph 1
---
Paragraph 2
---
Paragraph 3
---

✅ Strategic placement:

Section 1 content (multiple paragraphs)

---

Section 2 content (multiple paragraphs)
```

## HTML Output

**Input:**
```markdown
---
```

**Output:**
```html
<hr />
```

Simple, semantic HTML element.

## Styling Dividers

### Default Style

```css
.authorly-editor hr {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 3rem 0;
}
```

### Custom Styles

```css
/* Thick divider */
hr {
  border-top: 3px solid #3b82f6;
}

/* Dotted divider */
hr {
  border-top: 2px dotted #9ca3af;
}

/* Gradient divider */
hr {
  border: none;
  height: 2px;
  background: linear-gradient(to right, transparent, #3b82f6, transparent);
}

/* Centered short divider */
hr {
  width: 50%;
  margin: 3rem auto;
  border-top: 2px solid #3b82f6;
}

/* With icon */
hr {
  position: relative;
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 3rem 0;
}

hr::after {
  content: '***';
  position: absolute;
  left: 50%;
  top: -0.5rem;
  transform: translateX(-50%);
  background: white;
  padding: 0 1rem;
  color: #9ca3af;
}
```

## Best Practices

### Use Sparingly

```
❌ Divider between every paragraph
✅ Divider between major sections only
```

### Consider Headings First

```
❌ Using divider instead of heading:
Content about topic A
---
Content about topic B

✅ Use appropriate heading:
Content about topic A

## Topic B
Content about topic B
```

### Maintain Hierarchy

```
✅ Logical structure:
# Main Title
Content...

---

## Section 1
Content...

## Section 2
Content...

---

## Section 3
Content...
```

## Accessibility

Dividers are purely visual:

```html
<!-- Semantic, but no meaning -->
<hr role="separator" />
```

Screen readers announce: "separator" or "horizontal rule"

## Examples

### Blog Post Sections

```markdown
# How to Build a Modern Web App

Introduction and overview...

---

## Planning Phase

Planning content...

---

## Development Phase

Development content...

---

## Deployment

Deployment content...
```

### Author Bio Separator

```markdown
...end of article content.

---

**About the Author**

John Doe is a software engineer...
```

### Before/After Comparison

```markdown
## Before

Old approach details...

---

## After

New approach details...
```
