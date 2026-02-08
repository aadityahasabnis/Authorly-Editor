# Code Block

Code blocks in Authorly provide syntax highlighting, line numbers, and copy functionality out of the box. Perfect for technical documentation, tutorials, and any content that includes code snippets.

## Overview

Code blocks display formatted source code with syntax highlighting for over 100 programming languages. They support line numbers, copy-to-clipboard functionality, and beautiful themes that work in both light and dark modes.

**Key features:**
- Syntax highlighting for 100+ languages
- Automatic language detection
- Line numbering (optional)
- One-click copy to clipboard
- Dark and light theme support
- Preserve indentation and formatting

## Creating Code Blocks

### Using Slash Command

Type `/code` to insert a code block:

```
/code
```

The editor will create an empty code block with language selector.

### Using Markdown Syntax

Type three backticks followed by optional language name:

````
```javascript
function hello() {
  console.log('Hello, world!');
}
```
````

### Converting from Paragraph

1. Select a paragraph containing code
2. Press `Ctrl/Cmd + Shift + C` or use toolbar
3. Click "Code Block" from the block type menu

### Keyboard Shortcut

Press `Ctrl/Cmd + Alt + C` to create a new code block.

## Language Selection

### Supported Languages

Authorly supports syntax highlighting for:

**Web Development:**
- JavaScript, TypeScript, JSX, TSX
- HTML, CSS, SCSS, Less
- JSON, YAML, XML

**Backend:**
- Python, Ruby, PHP
- Java, Kotlin, Scala
- C, C++, C#
- Go, Rust
- Swift, Objective-C

**Shell & Config:**
- Bash, Shell, PowerShell
- Dockerfile, YAML
- TOML, INI
- SQL, GraphQL

**And many more...** including R, Perl, Lua, Haskell, Elixir, Clojure, and more.

### Setting the Language

**Method 1: Language dropdown**
- Click the language selector at the top-right of the code block
- Search or scroll to find your language
- Selection applies immediately

**Method 2: Markdown fence**
````
```python
def hello_world():
    print("Hello, World!")
```
````

**Method 3: Auto-detection**
- Authorly attempts to detect the language automatically
- Based on syntax patterns and keywords
- Can be overridden manually

## Features

### Syntax Highlighting

Code is automatically highlighted based on the selected language:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<User> {
  return fetch(`/api/users/${id}`)
    .then(res => res.json());
}
```

**Highlighting includes:**
- Keywords (if, function, class, etc.)
- Strings and comments
- Numbers and operators
- Function and variable names
- Language-specific syntax

### Line Numbers

Enable line numbers for easier reference:

```tsx
// In ContentBlocksEditor
<ContentBlocksEditor
  showLineNumbers={true}  // Enable line numbers
/>

// In ContentBlocksRenderer  
<ContentBlocksRenderer
  html={content}
  showLineNumbers={true}
/>
```

With line numbers:
```javascript
1  function calculateTotal(items) {
2    return items.reduce((sum, item) => {
3      return sum + (item.price * item.quantity);
4    }, 0);
5  }
```

### Copy to Clipboard

Every code block includes a copy button:

- Appears on hover (top-right corner)
- Copies entire code block content
- Shows "Copied!" confirmation
- Works in both editor and renderer

```tsx
// Enable copy functionality in renderer
<ContentBlocksRenderer
  html={content}
  enableCodeCopy={true}  // Default: true
/>
```

### Line Highlighting

Highlight specific lines to draw attention:

````
```javascript {2,4-6}
function process(data) {
  const validated = validate(data);  // Highlighted
  if (!validated) return null;
  
  const result = transform(validated);  // Lines 4-6
  const saved = save(result);           // highlighted
  return saved;                         //
}
```
````

### File Names

Add a file name to provide context:

````
```typescript:src/components/Editor.tsx
import { useState } from 'react';

export function Editor() {
  const [content, setContent] = useState('');
  return <div>{content}</div>;
}
```
````

## Keyboard Shortcuts

Work efficiently with code blocks using these shortcuts:

| Shortcut | Action |
|----------|--------|
| `Tab` | Insert tab character (not indent) |
| `Shift + Tab` | Remove tab |
| `Ctrl/Cmd + A` | Select all code |
| `Ctrl/Cmd + C` | Copy selected code |
| `Ctrl/Cmd + V` | Paste code |
| `Backspace` | Delete code block (when empty) |
| `Esc` | Exit code block (focus next block) |

### Indentation

Code blocks preserve exact indentation:

- `Tab` inserts actual tab character (or spaces, configurable)
- `Shift + Tab` removes one level of indentation
- Selected lines can be indented/outdented together

## Best Practices

### Choose the Right Language

Always specify the language for accurate highlighting:

````
❌ Generic code block
```
function hello() {
  console.log('hi');
}
```

✅ Language-specific
```javascript
function hello() {
  console.log('hi');
}
```
````

### Keep Code Focused

- Show only relevant code
- Remove unnecessary parts
- Use comments to explain complex sections
- Break long examples into smaller blocks

### Use Comments Wisely

```javascript
// ❌ Obvious comments
let x = 5; // Set x to 5

// ✅ Helpful comments
// Calculate compound interest over n years
const interest = principal * Math.pow(1 + rate, years);
```

### Add Context

Help readers understand what they're looking at:

**Add a file name:**
````
```tsx:src/App.tsx
export default function App() {
  return <div>Hello</div>;
}
```
````

**Add a description before the code:**
```
Here's how to configure the editor with custom options:
```

### Format Code Properly

```javascript
// ❌ Poorly formatted
function bad(){let x=5;if(x>3){return true;}return false;}

// ✅ Well formatted
function good() {
  let x = 5;
  if (x > 3) {
    return true;
  }
  return false;
}
```

## Common Use Cases

### Installation Instructions

````
```bash
# Install via npm
npm install authorly-editor

# Or using yarn
yarn add authorly-editor

# Or using pnpm
pnpm add authorly-editor
```
````

### Component Examples

````
```tsx:components/MyEditor.tsx
import { ContentBlocksEditor } from 'authorly-editor';
import 'authorly-editor/styles';

export function MyEditor() {
  const [content, setContent] = useState('<p>Hello!</p>');
  
  return (
    <ContentBlocksEditor
      initialContent={content}
      onChange={setContent}
      darkMode={false}
    />
  );
}
```
````

### Configuration Examples

````
```json:package.json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "authorly-editor": "^0.1.5",
    "react": "^18.2.0"
  }
}
```
````

### API Responses

````
```json
{
  "status": "success",
  "data": {
    "id": 123,
    "title": "My Article",
    "content": "<p>Article content...</p>"
  }
}
```
````

### Terminal Output

````
```bash
$ npm run build

> Building for production...
✓ Compiled successfully in 3.2s

Output: dist/
  - index.html (2.1 KB)
  - main.js (45.3 KB)
  - styles.css (8.7 KB)
```
````

## HTML Output

Code blocks generate clean, semantic HTML:

### Basic Code Block

**Input:**
````
```javascript
console.log('Hello!');
```
````

**Output:**
```html
<pre><code class="language-javascript">console.log('Hello!');</code></pre>
```

### With Language Class

The language is added as a CSS class for highlighting libraries:

```html
<pre>
  <code class="language-typescript">
    interface User {
      name: string;
    }
  </code>
</pre>
```

### With Line Numbers

```html
<pre class="line-numbers">
  <code class="language-python">
    def hello():
        print("Hello!")
  </code>
</pre>
```

## Styling Code Blocks

### Default Theme

Authorly includes a beautiful default theme:

```css
.authorly-editor pre {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.7;
}
```

### Custom Themes

Override with your own theme:

```css
/* Light theme */
.authorly-editor pre {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.authorly-editor code {
  color: #1e293b;
}

/* Dark theme */
[data-theme="dark"] .authorly-editor pre {
  background: #0f172a;
  border: 1px solid #1e293b;
}
```

### Popular Theme Integrations

Use popular syntax highlighting themes:

**Prism.js:**
```tsx
import 'prismjs/themes/prism-tomorrow.css';
```

**Highlight.js:**
```tsx
import 'highlight.js/styles/github-dark.css';
```

**Shiki:**
```typescript
import { getHighlighter } from 'shiki';

const highlighter = await getHighlighter({
  theme: 'nord'
});
```

### Custom Syntax Colors

Fine-tune colors for specific syntax elements:

```css
/* Keywords */
.authorly-editor .token.keyword {
  color: #c678dd;
}

/* Strings */
.authorly-editor .token.string {
  color: #98c379;
}

/* Functions */
.authorly-editor .token.function {
  color: #61afef;
}

/* Comments */
.authorly-editor .token.comment {
  color: #5c6370;
  font-style: italic;
}
```

## Accessibility

Code blocks follow accessibility best practices:

- **Semantic HTML** - Uses `<pre>` and `<code>` tags
- **Keyboard navigation** - Tab preserves focus
- **Screen reader support** - Code is announced as "code block"
- **High contrast** - Default theme meets WCAG AA standards

### ARIA Labels

Add context for screen readers:

```html
<pre aria-label="JavaScript function example">
  <code class="language-javascript">
    function hello() { }
  </code>
</pre>
```

## Advanced Features

### Diff Mode

Show code changes with diff syntax:

````
```diff
  function calculate(a, b) {
-   return a + b;
+   return a * b;
  }
```
````

### Multiple Tabs

Show different language implementations:

````
<Tabs>
  <Tab label="JavaScript">
    ```javascript
    const sum = (a, b) => a + b;
    ```
  </Tab>
  <Tab label="Python">
    ```python
    def sum(a, b):
        return a + b
    ```
  </Tab>
</Tabs>
````

### REPL Integration

Make code blocks executable:

```tsx
<CodeBlock 
  language="javascript"
  executable={true}
  onRun={(code) => eval(code)}
>
  console.log('Run me!');
</CodeBlock>
```

## Troubleshooting

### Syntax Highlighting Not Working

**Issue:** Code appears unstyled
**Solutions:**
- Verify language is set correctly
- Check if syntax highlighting CSS is loaded
- Try updating to latest version

### Copy Button Not Appearing

**Issue:** Copy button is missing
**Solutions:**
- Enable `enableCodeCopy` prop in renderer
- Check if JavaScript is enabled
- Verify button styles aren't hidden

### Indentation Issues

**Issue:** Tabs don't work as expected
**Solutions:**
- Use Tab key, not toolbar indent
- Check `preserveTabs` setting
- Configure tab size in editor options

### Language Not Detected

**Issue:** Auto-detection picks wrong language
**Solutions:**
- Manually select the correct language
- Add language hint to markdown fence
- Update language detector library

## Performance Tips

### Large Code Blocks

For very large code blocks (>1000 lines):

- Consider splitting into smaller blocks
- Use virtual scrolling for line numbers
- Lazy-load syntax highlighting
- Disable line numbers if not needed

```tsx
<ContentBlocksEditor
  maxCodeBlockLines={500}  // Warn on large blocks
  lazyHighlight={true}     // Highlight on scroll
/>
```

### Optimize Rendering

```tsx
// Only highlight visible code blocks
<ContentBlocksRenderer
  html={content}
  lazyHighlight={true}
  highlightDelay={100}
/>
```

## Examples

### Full-Stack Example

````
Here's a complete example showing both frontend and backend:

**Frontend (React):**
```tsx:src/components/UserList.tsx
export function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Backend (Node.js):**
```typescript:src/api/users.ts
app.get('/api/users', async (req, res) => {
  const users = await db.users.findMany();
  res.json(users);
});
```
````

### Tutorial Format

````
Follow these steps to add authentication:

**Step 1:** Install dependencies
```bash
npm install jsonwebtoken bcrypt
```

**Step 2:** Create auth utility
```typescript:src/lib/auth.ts
import jwt from 'jsonwebtoken';

export function generateToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
}
```

**Step 3:** Protect your routes
```typescript:src/middleware/auth.ts
export function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send();
  // Verify token...
  next();
}
```
````
