# Lists

Lists help organize information in a structured, scannable format. Authorly supports three types of lists, each serving different purposes in your content.

## List Types

### Bullet Lists

Unordered lists for general items, ideas, or features. Perfect for non-sequential information.

**Common uses:**
- Feature lists
- Key points
- Item collections
- Unordered information

### Numbered Lists

Ordered lists for sequential steps, rankings, or hierarchical information.

**Common uses:**
- Step-by-step instructions
- Ranked items
- Ordered procedures
- Numbered sections

### Checklists

Interactive task lists with checkboxes. Great for todo items, requirements, or tracking progress.

**Common uses:**
- Todo lists
- Requirements tracking
- Feature completion
- Project milestones

## Creating Lists

### Markdown Style

Authorly supports standard markdown syntax for creating lists. Simply type the list marker at the start of a line:

| Input | Result |
|-------|--------|
| `-` or `*` | Creates a bullet list item |
| `1.` | Creates a numbered list item |
| `[ ]` | Creates an unchecked checklist item |
| `[x]` | Creates a checked checklist item |

**Example:**

```
- First bullet point
- Second bullet point
- Third bullet point

1. First step
2. Second step
3. Third step

[ ] Unchecked task
[x] Completed task
```

### Using the Slash Command

Type `/` to open the block menu, then:

- `/bullet` or `/ul` - Insert bullet list
- `/numbered` or `/ol` - Insert numbered list
- `/checklist` or `/todo` - Insert checklist

### Converting Existing Text

Select text and use the toolbar to convert it to any list type. The selected lines will automatically become list items.

## Keyboard Shortcuts

Master these shortcuts to work efficiently with lists:

| Shortcut | Action |
|----------|--------|
| `Enter` | Create new list item |
| `Tab` | Indent item (nest deeper) |
| `Shift + Tab` | Outdent item (move up one level) |
| `Backspace` | Exit list (when item is empty) |
| `Shift + Enter` | Create line break within item |

**Pro tip:** Press `Backspace` on an empty list item to convert it back to a paragraph.

## Nested Lists

All list types support unlimited nesting levels. Create complex hierarchical structures by combining different list types.

### Creating Nested Lists

1. Create a list item
2. Press `Tab` to indent and create a nested item
3. Use `Shift + Tab` to move back to the parent level

### Mixing List Types

You can mix different list types within nested structures:

```
- Main bullet point
  1. Nested numbered item
  2. Another numbered item
     - Nested bullet under number
     [ ] Task within the structure
- Back to main level
```

**Renders as:**

- Main bullet point
  1. Nested numbered item
  2. Another numbered item
     - Nested bullet under number
     - Task within the structure
- Back to main level

## Best Practices

### Keep Items Concise

- Use short, scannable phrases
- Break long items into sub-items
- Aim for parallel structure

### Use Appropriate List Types

- **Bullet lists** - When order doesn't matter
- **Numbered lists** - When order matters
- **Checklists** - When tracking completion

### Maintain Consistent Style

- Use consistent capitalization
- Keep similar grammar patterns
- Align punctuation choices

### Don't Overuse Nesting

- Limit nesting to 3-4 levels maximum
- Deep nesting reduces readability
- Consider restructuring if too deep

## Checklist Interactions

Checklists are interactive in both the editor and rendered output (when using AuthorlyRenderer):

### In the Editor

- Click the checkbox to toggle completion
- Checked items get strikethrough styling
- State persists in the HTML output

### In Rendered Content

When you use the `AuthorlyRenderer` component, checkboxes remain interactive:

```tsx
import { AuthorlyRenderer } from 'authorly-editor';

<AuthorlyRenderer 
  html={content}
  enableInteractiveChecklists={true} // Enable checkbox interaction
/>
```

Readers can check off items as they read or work through your content.

## Styling Lists

### Default Styling

Lists automatically inherit beautiful spacing and styling from Authorly's design system:

- Consistent indentation (1.5rem per level)
- Proper vertical spacing (0.5rem between items)
- Readable line height (1.6)
- Numbered lists use decimal numbering

### Custom Styling

Override list styles with CSS:

```css
/* Custom bullet lists */
.authorly-editor ul {
  list-style-type: square;
}

/* Custom numbered lists */
.authorly-editor ol {
  list-style-type: upper-roman;
}

/* Custom checklist appearance */
.authorly-editor input[type="checkbox"] {
  accent-color: #3b82f6;
  width: 1.2rem;
  height: 1.2rem;
}
```

## HTML Output

Lists generate clean, semantic HTML that's easy to style and parse:

### Bullet List Output

```html
<ul>
  <li>First item</li>
  <li>Second item
    <ul>
      <li>Nested item</li>
    </ul>
  </li>
</ul>
```

### Numbered List Output

```html
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

### Checklist Output

```html
<ul class="checklist">
  <li>
    <input type="checkbox" /> Unchecked task
  </li>
  <li>
    <input type="checkbox" checked /> Completed task
  </li>
</ul>
```

## Common Use Cases

### Documentation

```
## Installation Steps

1. Install the package
   ```bash
   npm install authorly-editor
   ```

2. Import the editor
   ```tsx
   import { AuthorlyEditor } from 'authorly-editor';
   ```

3. Add it to your component
   - Wrap in your layout
   - Configure props as needed
   - Handle the onChange event
```

### Feature Lists

```
## Key Features

- **Lightweight** - Only 30kb gzipped
- **Type-safe** - Full TypeScript support
- **Flexible** - 14 block types included
- **Clean Output** - Pure HTML, no JSON
```

### Project Planning

```
## Sprint Tasks

[x] Design system setup
[x] Core editor implementation
[ ] Block menu implementation
[ ] Toolbar customization
  [ ] Icon selection
  [ ] Layout options
[ ] Documentation site
  [x] Homepage
  [ ] API docs
  [ ] Examples
```

## Accessibility

Lists in Authorly follow accessibility best practices:

- Semantic HTML (`<ul>`, `<ol>`, `<li>`)
- Proper ARIA roles for custom elements
- Keyboard navigation support
- Screen reader friendly

### Screen Reader Behavior

- List type is announced (e.g., "list, 3 items")
- Nested levels are announced
- Checkboxes announce checked/unchecked state

## Troubleshooting

### List Won't Indent

- Make sure cursor is at the start of the line
- Try using `Tab` instead of clicking toolbar
- Check if you've hit the maximum nesting level

### Can't Exit List

- Press `Backspace` on an empty list item
- Use `Shift + Tab` to outdent to paragraph level
- Click outside the list and press `Enter`

### Checklist Not Interactive

- Ensure you're using `AuthorlyRenderer`
- Enable `enableInteractiveChecklists` prop
- Check that JavaScript is enabled

## Examples

### Meeting Notes

```
# Team Meeting - Jan 15, 2024

## Attendees
- Sarah (Design)
- Mike (Engineering)
- Lisa (Product)

## Agenda
1. Q4 Review
2. Q1 Planning
3. Budget Discussion

## Action Items
[x] Sarah: Finalize design system
[ ] Mike: Review PR #234
[ ] Lisa: Update roadmap
```

### Tutorial Steps

```
# Getting Started with React

1. **Create a new project**
   ```bash
   npx create-react-app my-app
   ```

2. **Install dependencies**
   - Navigate to project
   - Run install command
   - Wait for completion

3. **Start development server**
   ```bash
   npm start
   ```

   Your app should now be running at `http://localhost:3000`
```

### Requirements Checklist

```
## Launch Requirements

### Technical
[x] All tests passing
[x] Code review completed
[ ] Performance audit
[ ] Security scan

### Content
[x] Documentation updated
[ ] Tutorial videos
[ ] Blog post draft

### Operations
[ ] Deploy to staging
[ ] QA sign-off
[ ] Production deploy
```
