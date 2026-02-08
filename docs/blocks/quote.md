# Blockquote

Blockquotes highlight important quotes, testimonials, or excerpts from other sources. They draw attention to key statements and provide visual emphasis in your content.

## Overview

Blockquotes are essential for:

- **Citing sources** - Attribute quotes to their authors
- **Highlighting key points** - Emphasize important statements
- **Breaking up text** - Add visual variety to long content
- **Testimonials** - Showcase customer feedback
- **Pull quotes** - Feature notable excerpts from your content

**Key features:**
- Clean, semantic HTML output
- Optional attribution/citation
- Markdown syntax support
- Customizable styling
- Nested blockquotes support

## Creating Blockquotes

### Using Slash Command

Type `/quote` or `/blockquote`:

```
/quote
```

This creates an empty blockquote block ready for your content.

### Using Markdown Syntax

Type `>` followed by a space at the start of a line:

```
> This is a blockquote.
```

The blockquote is created automatically as you type.

### Using Keyboard Shortcut

Press `Ctrl/Cmd + Shift + B` to convert the current block to a blockquote.

### Converting from Paragraph

1. Click on the paragraph to convert
2. Open the block menu (`/` or toolbar)
3. Select "Blockquote"

Or use the toolbar dropdown to change block type.

## Basic Usage

### Simple Quote

The most basic blockquote:

```
> The best way to predict the future is to invent it.
```

**Renders as:**

> The best way to predict the future is to invent it.

### Multi-line Quote

Blockquotes can span multiple lines:

```
> The only way to do great work is to love what you do. 
> If you haven't found it yet, keep looking. 
> Don't settle.
```

**Renders as:**

> The only way to do great work is to love what you do. 
> If you haven't found it yet, keep looking. 
> Don't settle.

### Quote with Attribution

Add attribution on a new line:

```
> Design is not just what it looks like and feels like. 
> Design is how it works.
>
> — Steve Jobs
```

**Renders as:**

> Design is not just what it looks like and feels like. 
> Design is how it works.
>
> — Steve Jobs

## Advanced Features

### Nested Blockquotes

Create nested quotes by using multiple `>` symbols:

```
> This is the main quote.
>
>> This is a nested quote within the main quote.
>
> Back to the main quote.
```

**Renders as:**

> This is the main quote.
>
>> This is a nested quote within the main quote.
>
> Back to the main quote.

### Blockquotes with Formatting

Use inline formatting within blockquotes:

```
> **Important:** This quote contains *emphasized* text and `inline code`.
```

**Renders as:**

> **Important:** This quote contains *emphasized* text and `inline code`.

### Blockquotes with Links

Include links in your quotes:

```
> Read more in the [official documentation](https://example.com).
```

**Renders as:**

> Read more in the [official documentation](https://example.com).

## Best Practices

### Use for Actual Quotes

Reserve blockquotes for real quotations:

```
❌ Don't use for emphasis:
> This is really important!

✅ Use for quotes:
> "Software is a great combination between artistry and engineering."
> — Bill Gates
```

### Always Attribute Sources

Give credit where it's due:

```
❌ Anonymous quote:
> Innovation distinguishes between a leader and a follower.

✅ With attribution:
> Innovation distinguishes between a leader and a follower.
> — Steve Jobs
```

### Keep Quotes Relevant

Only quote what's necessary:

```
❌ Too long:
> Lorem ipsum dolor sit amet, consectetur adipiscing elit...
> [20 more paragraphs]

✅ Concise excerpt:
> The most important thing is to keep the most important thing 
> the most important thing.
> — Donald P. Coduto
```

### Use Proper Punctuation

Follow standard quotation formatting:

```
✅ Correct punctuation:
> "The future belongs to those who believe in the beauty 
> of their dreams."
> — Eleanor Roosevelt

✅ Em dash for attribution:
> Quote text here.
> — Author Name

✅ Citation format:
> Quote text here.
> — Author, *Book Title*
```

### Don't Overuse

Use blockquotes sparingly for maximum impact:

```
❌ Too many quotes:
> Quote 1
> Quote 2
> Quote 3
[Every other paragraph]

✅ Strategic placement:
[Introduction paragraph]
[Context paragraph]
> Relevant quote
[Analysis paragraph]
```

## Common Use Cases

### Customer Testimonials

```markdown
## What Our Customers Say

> Authorly has transformed how we create content. The clean HTML 
> output means we're never locked into a proprietary format.
> — Sarah Chen, CTO at TechCorp

> The block-based approach makes it easy for non-technical team 
> members to create beautiful, structured content.
> — Mike Rodriguez, Content Manager
```

### Academic Citations

```markdown
## Research Findings

As noted in the literature:

> Recent studies have shown that well-structured content improves 
> user comprehension by up to 47% compared to unstructured text.
> — Johnson et al., *Journal of User Experience*, 2023

This finding supports our approach to block-based editing.
```

### Pull Quotes

Highlight key points from your own content:

```markdown
The editor was designed with performance in mind. We optimized 
every aspect of the rendering pipeline to ensure smooth editing 
even with large documents.

> Our benchmarks show that Authorly is 3x faster than comparable 
> editors while using 60% less memory.

This performance advantage comes from our innovative approach 
to virtual DOM updates.
```

### Code Documentation

```markdown
## Security Considerations

When implementing authentication, always follow best practices:

> Never store passwords in plain text. Always use bcrypt or 
> another secure hashing algorithm with appropriate salt rounds.
> — OWASP Security Guidelines

Here's how to implement this correctly:
```

### Press Quotes

```markdown
## Press Coverage

> "Authorly represents a significant advancement in content editing 
> technology. Its clean architecture and developer-friendly approach 
> set it apart from traditional WYSIWYG editors."
> — TechCrunch

> "Finally, a rich text editor that respects developers' time and 
> produces clean, maintainable HTML."
> — The Verge
```

## HTML Output

Blockquotes generate semantic, accessible HTML:

### Basic Blockquote

**Input:**
```
> This is a quote.
```

**Output:**
```html
<blockquote>
  <p>This is a quote.</p>
</blockquote>
```

### Multi-paragraph Quote

**Input:**
```
> First paragraph.
>
> Second paragraph.
```

**Output:**
```html
<blockquote>
  <p>First paragraph.</p>
  <p>Second paragraph.</p>
</blockquote>
```

### With Attribution

**Input:**
```
> Quote text here.
> — Author Name
```

**Output:**
```html
<blockquote>
  <p>Quote text here.</p>
  <footer>— Author Name</footer>
</blockquote>
```

### Nested Blockquotes

**Input:**
```
> Outer quote.
>> Nested quote.
```

**Output:**
```html
<blockquote>
  <p>Outer quote.</p>
  <blockquote>
    <p>Nested quote.</p>
  </blockquote>
</blockquote>
```

## Styling Blockquotes

### Default Styles

Authorly applies elegant default styles:

```css
.authorly-editor blockquote {
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  border-left: 4px solid #6366f1;
  background: #f9fafb;
  font-style: italic;
  color: #4b5563;
}

.authorly-editor blockquote p {
  margin: 0.5rem 0;
}

.authorly-editor blockquote footer {
  margin-top: 0.75rem;
  font-style: normal;
  font-weight: 500;
  color: #6b7280;
}
```

### Custom Styling

Create your own blockquote styles:

```css
/* Minimal style */
.authorly-editor blockquote {
  border-left: 3px solid #e5e7eb;
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: normal;
  color: #6b7280;
}

/* Highlighted style */
.authorly-editor blockquote {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  border: none;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
}

/* Card style */
.authorly-editor blockquote {
  border: 2px solid #e5e7eb;
  border-left: 4px solid #6366f1;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Large quote style */
.authorly-editor blockquote {
  font-size: 1.5rem;
  line-height: 1.6;
  font-weight: 300;
  border: none;
  padding: 2rem 0;
  position: relative;
}

.authorly-editor blockquote::before {
  content: '"';
  font-size: 4rem;
  color: #6366f1;
  opacity: 0.3;
  position: absolute;
  left: -1rem;
  top: -1rem;
}
```

### Attribution Styling

Style the attribution separately:

```css
.authorly-editor blockquote footer {
  font-style: normal;
  font-weight: 600;
  color: #4b5563;
  margin-top: 1rem;
}

.authorly-editor blockquote footer::before {
  content: '— ';
  color: #6366f1;
}

/* Citation with separator */
.authorly-editor blockquote footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}
```

### Dark Mode Support

Adapt blockquotes for dark mode:

```css
[data-theme="dark"] .authorly-editor blockquote {
  background: #1f2937;
  border-color: #4f46e5;
  color: #d1d5db;
}

[data-theme="dark"] .authorly-editor blockquote footer {
  color: #9ca3af;
}
```

## Accessibility

Blockquotes follow accessibility best practices:

### Semantic HTML

Always use `<blockquote>` for quotes:

```
❌ Non-semantic:
<div class="quote">Quote text</div>

✅ Semantic:
<blockquote>
  <p>Quote text</p>
</blockquote>
```

### Cite Attribute

Add the `cite` attribute for source URLs:

```html
<blockquote cite="https://example.com/source">
  <p>Quote text</p>
  <footer>— Author Name</footer>
</blockquote>
```

### Screen Reader Announcements

Screen readers announce blockquotes as "block quote start" and "block quote end", helping users understand the context.

### Visual Indicators

Ensure blockquotes are visually distinct:

```css
/* Good contrast */
.authorly-editor blockquote {
  background: #f9fafb;  /* Light background */
  border-left: 4px solid #6366f1;  /* Strong visual indicator */
}
```

## Typography

### Quote Marks

Add decorative quote marks with CSS:

```css
.authorly-editor blockquote {
  position: relative;
  padding-left: 3rem;
}

.authorly-editor blockquote::before {
  content: '"';
  position: absolute;
  left: 0;
  top: 0;
  font-size: 4rem;
  line-height: 1;
  color: #6366f1;
  opacity: 0.2;
  font-family: Georgia, serif;
}
```

### Font Pairing

Use complementary fonts:

```css
/* Serif for quotes, sans-serif for attribution */
.authorly-editor blockquote p {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.125rem;
  line-height: 1.7;
}

.authorly-editor blockquote footer {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.875rem;
}
```

## Common Patterns

### Interview Format

```markdown
## Interview with Jane Doe

**Q: What inspired you to create this?**

> I saw a gap in the market for a tool that was both powerful 
> and easy to use. Existing solutions were either too simple or 
> too complex.

**Q: What makes your approach different?**

> We focused on clean output from day one. Every decision was 
> made with the end HTML in mind.
```

### Before/After Comparisons

```markdown
## Old Approach

> We used to spend hours cleaning up exported HTML, removing 
> proprietary classes and inline styles. It was a nightmare.
> — Development Team

## New Approach

> With Authorly, the HTML is clean right out of the box. We can 
> use it directly without any post-processing.
> — Development Team
```

### Multiple Sources

```markdown
## Expert Opinions

> The architecture is sound and follows modern best practices.
> — Alex Johnson, Senior Architect

> I'm impressed by the attention to detail in the API design.
> — Maria Garcia, API Developer

> The documentation makes it easy to get started quickly.
> — Tom Wilson, Technical Writer
```

## Troubleshooting

### Blockquote Not Creating

**Issue:** Typing `> text` doesn't create blockquote  
**Solution:** Make sure there's a space after the `>` symbol

### Can't Exit Blockquote

**Issue:** Pressing Enter keeps adding quote lines  
**Solution:** Press `Backspace` on empty line or use block menu to convert to paragraph

### Attribution Not Formatting

**Issue:** Attribution appears as regular text  
**Solution:** Use em dash (`—`) at start of attribution line

### Nested Quotes Not Working

**Issue:** `>>` not creating nested quote  
**Solution:** Ensure nested quote support is enabled in editor configuration

## Advanced Techniques

### Responsive Blockquotes

Adapt sizing for different screens:

```css
.authorly-editor blockquote {
  font-size: 1rem;
  padding: 1rem;
}

@media (min-width: 768px) {
  .authorly-editor blockquote {
    font-size: 1.25rem;
    padding: 2rem;
  }
}
```

### Animated Blockquotes

Add subtle animations:

```css
.authorly-editor blockquote {
  opacity: 0;
  transform: translateX(-20px);
  animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Quote Icons

Add decorative icons:

```css
.authorly-editor blockquote {
  position: relative;
  padding-left: 4rem;
}

.authorly-editor blockquote::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 1rem;
  width: 2rem;
  height: 2rem;
  background: url('quote-icon.svg') no-repeat center;
  opacity: 0.2;
}
```

## Examples

### Product Testimonial Page

```markdown
# Customer Success Stories

## Fortune 500 Companies Trust Us

> Switching to Authorly reduced our content production time by 40%. 
> The clean HTML output integrates perfectly with our existing CMS.
> — Sarah Martinez, VP of Content at TechGiant Inc.

> We evaluated five different editors. Authorly won on performance, 
> code quality, and developer experience.
> — David Kim, CTO at StartupXYZ

> The best part? Our non-technical team members love it. Zero 
> training required.
> — Lisa Chen, Content Director at MediaCorp
```

### Documentation with Warnings

```markdown
## Security Best Practices

> **Warning:** Never expose your API keys in client-side code. 
> Always use environment variables and server-side validation.
> — Security Team

> **Important:** Enable CORS only for trusted domains. Wildcards 
> should never be used in production.
> — DevOps Team
```

### Historical Quotes

```markdown
# The Evolution of Computing

## Early Visions

> I think there is a world market for maybe five computers.
> — Thomas Watson, IBM Chairman, 1943

> There is no reason anyone would want a computer in their home.
> — Ken Olsen, DEC Founder, 1977

These quotes remind us that predicting the future of technology 
is notoriously difficult.
```
