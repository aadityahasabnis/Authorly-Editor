# AuthorlyEditor Props

Complete API reference for all props accepted by the `AuthorlyEditor` component.

## Import

```tsx
import { AuthorlyEditor } from 'authorly-editor';
import type { AuthorlyEditorProps } from 'authorly-editor';
```

> **Note:** `ContentBlocksEditor` and `ContentBlocksEditorProps` are deprecated aliases that still work for backwards compatibility.

## Props Overview

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialContent` | `string` | `''` | Initial HTML content to load |
| `blocks` | `BlockType[]` | All blocks | Enabled block types |
| `inlineFormats` | `InlineFormat[]` | All formats | Enabled inline formats |
| `placeholder` | `string` | `'Type "/" for commands...'` | Placeholder text when empty |
| `readOnly` | `boolean` | `false` | Read-only mode (view only) |
| `classPrefix` | `string` | `'cb'` | CSS class prefix |
| `className` | `string` | `''` | Additional CSS class for container |
| `style` | `React.CSSProperties` | `{}` | Inline styles for container |
| `showToolbar` | `boolean` | `true` | Show/hide toolbar |
| `toolbarPosition` | `'top' \| 'bottom' \| 'floating'` | `'top'` | Toolbar position |
| `darkMode` | `boolean` | `false` | Enable dark mode |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |
| `spellCheck` | `boolean` | `true` | Enable spell checking |
| `onChange` | `(html: string) => void` | `undefined` | Called when content changes |
| `onSave` | `(html: string) => void` | `undefined` | Called when Ctrl+S is pressed |
| `onFocus` | `() => void` | `undefined` | Called when editor gains focus |
| `onBlur` | `() => void` | `undefined` | Called when editor loses focus |
| `onReady` | `(editor: EditorInstance) => void` | `undefined` | Called when editor is ready |
| `imageUploadConfig` | `UploadConfig` | `undefined` | Image upload configuration |
| `onUploadStart` | `(filename: string) => void` | `undefined` | Called when upload starts |
| `onUploadSuccess` | `(result: UploadResult) => void` | `undefined` | Called when upload succeeds |
| `onUploadError` | `(error: Error) => void` | `undefined` | Called when upload fails |
| `onUploadProgress` | `(progress: UploadProgress) => void` | `undefined` | Called during upload progress |

## Content Props

### initialContent

```tsx
<AuthorlyEditor 
  initialContent="<p>Welcome to Authorly!</p><h2>Getting Started</h2>"
/>
```

Initial HTML content to populate the editor. Accepts any valid HTML.

**Type:** `string`  
**Default:** `''`

**Examples:**

```tsx
// From state
const [content, setContent] = useState('<p>Saved content</p>');
<AuthorlyEditor initialContent={content} />

// From API
const { data } = await fetch('/api/content');
<AuthorlyEditor initialContent={data.html} />

// Complex content
<AuthorlyEditor 
  initialContent={`
    <h1>My Document</h1>
    <p>Introduction paragraph</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  `}
/>
```

### blocks

```tsx
<AuthorlyEditor 
  blocks={['paragraph', 'heading', 'bulletList', 'numberedList']}
/>
```

Array of enabled block types. Restricts which blocks users can insert.

**Type:** `BlockType[]`  
**Default:** All 16 block types

**Available Block Types:**

```tsx
type BlockType =
  | 'paragraph'
  | 'heading'
  | 'bulletList'
  | 'numberedList'
  | 'checkList'
  | 'quote'
  | 'code'
  | 'image'
  | 'video'
  | 'divider'
  | 'callout'
  | 'accordion'
  | 'table'
  | 'linkPreview'
  | 'date'
  | 'excalidraw';
```

**Examples:**

```tsx
// Text-only editor
<AuthorlyEditor 
  blocks={['paragraph', 'heading']}
/>

// Minimal editor (no media)
<AuthorlyEditor 
  blocks={[
    'paragraph',
    'heading',
    'bulletList',
    'numberedList',
    'quote',
    'code'
  ]}
/>

// Full-featured
<AuthorlyEditor 
  blocks={undefined} // or omit - allows all blocks
/>
```

### inlineFormats

```tsx
<AuthorlyEditor 
  inlineFormats={['bold', 'italic', 'link']}
/>
```

Array of enabled inline formatting options.

**Type:** `InlineFormat[]`  
**Default:** All inline formats

**Available Inline Formats:**

```tsx
type InlineFormat =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'code'
  | 'link'
  | 'textColor'
  | 'highlight';
```

**Examples:**

```tsx
// Basic formatting only
<AuthorlyEditor 
  inlineFormats={['bold', 'italic', 'underline']}
/>

// No formatting
<AuthorlyEditor 
  inlineFormats={[]}
/>

// Text decoration + links
<AuthorlyEditor 
  inlineFormats={['bold', 'italic', 'link', 'highlight']}
/>
```

### placeholder

```tsx
<AuthorlyEditor 
  placeholder="Share your thoughts..."
/>
```

Placeholder text shown when editor is empty.

**Type:** `string`  
**Default:** `'Type "/" for commands...'`

**Examples:**

```tsx
// Custom placeholder
<AuthorlyEditor placeholder="What's on your mind?" />

// Descriptive placeholder
<AuthorlyEditor 
  placeholder="Type / to insert a block, or start typing..."
/>

// Empty (no placeholder)
<AuthorlyEditor placeholder="" />
```

## Display Props

### readOnly

```tsx
<AuthorlyEditor readOnly={true} />
```

Enables read-only mode. Content is visible but not editable.

**Type:** `boolean`  
**Default:** `false`

**Examples:**

```tsx
// Conditionally read-only
const [isEditing, setIsEditing] = useState(false);
<AuthorlyEditor readOnly={!isEditing} />

// Always read-only (use AuthorlyRenderer instead)
<AuthorlyEditor readOnly={true} initialContent={html} />

// Better: Use renderer for read-only
<AuthorlyRenderer html={html} />
```

### className

```tsx
<AuthorlyEditor className="my-editor custom-styles" />
```

Additional CSS class names for the editor container.

**Type:** `string`  
**Default:** `''`

**Examples:**

```tsx
// Tailwind classes
<AuthorlyEditor className="border-2 border-blue-500 rounded-xl" />

// Custom class
<AuthorlyEditor className="my-custom-editor" />

// Multiple classes
<AuthorlyEditor className="editor-lg theme-ocean shadow-xl" />
```

### style

```tsx
<AuthorlyEditor 
  style={{ 
    maxWidth: '800px', 
    margin: '0 auto',
    minHeight: '400px'
  }}
/>
```

Inline CSS styles for the editor container.

**Type:** `React.CSSProperties`  
**Default:** `{}`

**Examples:**

```tsx
// Fixed dimensions
<AuthorlyEditor 
  style={{ width: '100%', height: '600px' }}
/>

// Custom colors
<AuthorlyEditor 
  style={{ 
    backgroundColor: '#f9fafb',
    border: '2px solid #e5e7eb'
  }}
/>

// Responsive height
<AuthorlyEditor 
  style={{ 
    minHeight: '300px',
    maxHeight: '80vh'
  }}
/>
```

### classPrefix

```tsx
<AuthorlyEditor classPrefix="my-editor" />
```

Prefix for all CSS classes. Useful for avoiding class name conflicts.

**Type:** `string`  
**Default:** `'cb'` (ContentBlocks)

**Examples:**

```tsx
// Custom prefix
<AuthorlyEditor classPrefix="ae" />
// Generates: .ae-editor, .ae-content, .ae-block, etc.

// No prefix
<AuthorlyEditor classPrefix="" />
// Generates: .editor, .content, .block, etc.

// Namespace
<AuthorlyEditor classPrefix="app-editor" />
// Generates: .app-editor-editor, .app-editor-content, etc.
```

## Toolbar Props

### showToolbar

```tsx
<AuthorlyEditor showToolbar={false} />
```

Show or hide the toolbar.

**Type:** `boolean`  
**Default:** `true`

**Examples:**

```tsx
// No toolbar
<AuthorlyEditor showToolbar={false} />

// Conditional toolbar
const [showToolbar, setShowToolbar] = useState(true);
<AuthorlyEditor showToolbar={showToolbar} />
```

### toolbarPosition

```tsx
<AuthorlyEditor toolbarPosition="bottom" />
```

Position of the toolbar relative to content.

**Type:** `'top' | 'bottom' | 'floating'`  
**Default:** `'top'`

**Examples:**

```tsx
// Bottom toolbar
<AuthorlyEditor toolbarPosition="bottom" />

// Top toolbar (default)
<AuthorlyEditor toolbarPosition="top" />

// Floating toolbar
<AuthorlyEditor toolbarPosition="floating" />
```

## Theme Props

### darkMode

```tsx
<AuthorlyEditor darkMode={true} />
```

Enable dark mode styling.

**Type:** `boolean`  
**Default:** `false`

**Examples:**

```tsx
// Toggle dark mode
const [isDark, setIsDark] = useState(false);

<div className={isDark ? 'cb-dark' : ''}>
  <AuthorlyEditor darkMode={isDark} />
</div>

// System preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
<AuthorlyEditor darkMode={prefersDark} />
```

## Behavior Props

### autoFocus

```tsx
<AuthorlyEditor autoFocus={true} />
```

Automatically focus the editor when it mounts.

**Type:** `boolean`  
**Default:** `false`

**Examples:**

```tsx
// Auto-focus in modal
<Modal isOpen={isOpen}>
  <AuthorlyEditor autoFocus={true} />
</Modal>

// Focus on mount
<AuthorlyEditor autoFocus={true} />
```

### spellCheck

```tsx
<AuthorlyEditor spellCheck={false} />
```

Enable or disable browser spell checking.

**Type:** `boolean`  
**Default:** `true`

**Examples:**

```tsx
// Disable spell check (for code)
<AuthorlyEditor spellCheck={false} />

// Enable spell check
<AuthorlyEditor spellCheck={true} />
```

## Event Callbacks

### onChange

```tsx
<AuthorlyEditor 
  onChange={(html) => {
    console.log('Content changed:', html);
    saveToLocalStorage(html);
  }}
/>
```

Called whenever editor content changes.

**Type:** `(html: string) => void`  
**Default:** `undefined`

**Examples:**

```tsx
// Auto-save
const [content, setContent] = useState('');

<AuthorlyEditor 
  onChange={(html) => {
    setContent(html);
    debouncedSave(html);
  }}
/>

// Track changes
const [changeCount, setChangeCount] = useState(0);

<AuthorlyEditor 
  onChange={(html) => {
    setChangeCount(c => c + 1);
  }}
/>

// Sync with state
<AuthorlyEditor 
  onChange={setContent}
/>
```

### onSave

```tsx
<AuthorlyEditor 
  onSave={async (html) => {
    await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify({ content: html })
    });
  }}
/>
```

Called when user presses `Ctrl+S` (or `Cmd+S` on Mac).

**Type:** `(html: string) => void`  
**Default:** `undefined`

**Examples:**

```tsx
// Save to API
<AuthorlyEditor 
  onSave={async (html) => {
    const response = await saveContent(html);
    toast.success('Saved!');
  }}
/>

// Save to localStorage
<AuthorlyEditor 
  onSave={(html) => {
    localStorage.setItem('draft', html);
  }}
/>
```

### onFocus / onBlur

```tsx
<AuthorlyEditor 
  onFocus={() => console.log('Editor focused')}
  onBlur={() => console.log('Editor blurred')}
/>
```

Called when editor gains or loses focus.

**Type:** `() => void`  
**Default:** `undefined`

**Examples:**

```tsx
// Track editing state
const [isEditing, setIsEditing] = useState(false);

<AuthorlyEditor 
  onFocus={() => setIsEditing(true)}
  onBlur={() => setIsEditing(false)}
/>

// Show save prompt on blur
<AuthorlyEditor 
  onBlur={() => {
    if (hasUnsavedChanges) {
      showSavePrompt();
    }
  }}
/>
```

### onReady

```tsx
<AuthorlyEditor 
  onReady={(editor) => {
    console.log('Editor ready!', editor);
    editor.focus();
  }}
/>
```

Called when editor is fully initialized and ready to use.

**Type:** `(editor: EditorInstance) => void`  
**Default:** `undefined`

**Examples:**

```tsx
// Store editor instance
const [editor, setEditor] = useState<EditorInstance | null>(null);

<AuthorlyEditor 
  onReady={setEditor}
/>

// Execute commands on ready
<AuthorlyEditor 
  onReady={(editor) => {
    editor.focus();
    editor.insertBlock('heading', { level: 1 });
  }}
/>
```

## Upload Callbacks

### onUploadStart

```tsx
<AuthorlyEditor 
  onUploadStart={(filename) => {
    console.log(`Uploading ${filename}...`);
    setUploading(true);
  }}
/>
```

Called when an image upload begins.

**Type:** `(filename: string) => void`  
**Default:** `undefined`

### onUploadSuccess

```tsx
<AuthorlyEditor 
  onUploadSuccess={(result) => {
    console.log('Upload complete:', result.url);
    toast.success('Image uploaded!');
  }}
/>
```

Called when an upload completes successfully.

**Type:** `(result: UploadResult) => void`  
**Default:** `undefined`

### onUploadError

```tsx
<AuthorlyEditor 
  onUploadError={(error) => {
    console.error('Upload failed:', error);
    toast.error(error.message);
  }}
/>
```

Called when an upload fails.

**Type:** `(error: Error) => void`  
**Default:** `undefined`

### onUploadProgress

```tsx
<AuthorlyEditor 
  onUploadProgress={(progress) => {
    console.log(`${progress.percent}% uploaded`);
    setUploadProgress(progress.percent);
  }}
/>
```

Called with upload progress updates.

**Type:** `(progress: UploadProgress) => void`  
**Default:** `undefined`

## See Also

- [EditorRef API](/docs/api/editor-ref) - Methods available on editor ref
- [Events API](/docs/api/events) - Event handling details
- [AuthorlyEditor](/docs/components/editor) - Component documentation
- [Quick Start](/docs/quick-start) - Getting started guide
