# ContentBlocksEditor Props

Complete API reference for all props accepted by the `ContentBlocksEditor` component.

## Import

```tsx
import { ContentBlocksEditor } from 'authorly-editor';
import type { ContentBlocksEditorProps } from 'authorly-editor';
```

## Props Overview

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialContent` | `string` | `''` | Initial HTML content to load |
| `blocks` | `BlockType[]` | All blocks | Enabled block types |
| `inlineFormats` | `InlineFormat[]` | All formats | Enabled inline formats |
| `placeholder` | `string` | `'Start writing...'` | Placeholder text when empty |
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
<ContentBlocksEditor 
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
<ContentBlocksEditor initialContent={content} />

// From API
const { data } = await fetch('/api/content');
<ContentBlocksEditor initialContent={data.html} />

// Complex content
<ContentBlocksEditor 
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
<ContentBlocksEditor 
  blocks={['paragraph', 'heading', 'bulletList', 'numberedList']}
/>
```

Array of enabled block types. Restricts which blocks users can insert.

**Type:** `BlockType[]`  
**Default:** All 21 block types

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
<ContentBlocksEditor 
  blocks={['paragraph', 'heading']}
/>

// Minimal editor (no media)
<ContentBlocksEditor 
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
<ContentBlocksEditor 
  blocks={undefined} // or omit - allows all blocks
/>
```

### inlineFormats

```tsx
<ContentBlocksEditor 
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
<ContentBlocksEditor 
  inlineFormats={['bold', 'italic', 'underline']}
/>

// No formatting
<ContentBlocksEditor 
  inlineFormats={[]}
/>

// Text decoration + links
<ContentBlocksEditor 
  inlineFormats={['bold', 'italic', 'link', 'highlight']}
/>
```

### placeholder

```tsx
<ContentBlocksEditor 
  placeholder="Share your thoughts..."
/>
```

Placeholder text shown when editor is empty.

**Type:** `string`  
**Default:** `'Start writing...'`

**Examples:**

```tsx
// Custom placeholder
<ContentBlocksEditor placeholder="What's on your mind?" />

// Descriptive placeholder
<ContentBlocksEditor 
  placeholder="Type / to insert a block, or start typing..."
/>

// Empty (no placeholder)
<ContentBlocksEditor placeholder="" />
```

## Display Props

### readOnly

```tsx
<ContentBlocksEditor readOnly={true} />
```

Enables read-only mode. Content is visible but not editable.

**Type:** `boolean`  
**Default:** `false`

**Examples:**

```tsx
// Conditionally read-only
const [isEditing, setIsEditing] = useState(false);
<ContentBlocksEditor readOnly={!isEditing} />

// Always read-only (use ContentBlocksRenderer instead)
<ContentBlocksEditor readOnly={true} initialContent={html} />

// Better: Use renderer for read-only
<ContentBlocksRenderer html={html} />
```

### className

```tsx
<ContentBlocksEditor className="my-editor custom-styles" />
```

Additional CSS class names for the editor container.

**Type:** `string`  
**Default:** `''`

**Examples:**

```tsx
// Tailwind classes
<ContentBlocksEditor className="border-2 border-blue-500 rounded-xl" />

// Custom class
<ContentBlocksEditor className="my-custom-editor" />

// Multiple classes
<ContentBlocksEditor className="editor-lg theme-ocean shadow-xl" />
```

### style

```tsx
<ContentBlocksEditor 
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
<ContentBlocksEditor 
  style={{ width: '100%', height: '600px' }}
/>

// Custom colors
<ContentBlocksEditor 
  style={{ 
    backgroundColor: '#f9fafb',
    border: '2px solid #e5e7eb'
  }}
/>

// Responsive height
<ContentBlocksEditor 
  style={{ 
    minHeight: '300px',
    maxHeight: '80vh'
  }}
/>
```

### classPrefix

```tsx
<ContentBlocksEditor classPrefix="my-editor" />
```

Prefix for all CSS classes. Useful for avoiding class name conflicts.

**Type:** `string`  
**Default:** `'cb'` (ContentBlocks)

**Examples:**

```tsx
// Custom prefix
<ContentBlocksEditor classPrefix="ae" />
// Generates: .ae-editor, .ae-content, .ae-block, etc.

// No prefix
<ContentBlocksEditor classPrefix="" />
// Generates: .editor, .content, .block, etc.

// Namespace
<ContentBlocksEditor classPrefix="app-editor" />
// Generates: .app-editor-editor, .app-editor-content, etc.
```

## Toolbar Props

### showToolbar

```tsx
<ContentBlocksEditor showToolbar={false} />
```

Show or hide the toolbar.

**Type:** `boolean`  
**Default:** `true`

**Examples:**

```tsx
// No toolbar
<ContentBlocksEditor showToolbar={false} />

// Conditional toolbar
const [showToolbar, setShowToolbar] = useState(true);
<ContentBlocksEditor showToolbar={showToolbar} />
```

### toolbarPosition

```tsx
<ContentBlocksEditor toolbarPosition="bottom" />
```

Position of the toolbar relative to content.

**Type:** `'top' | 'bottom' | 'floating'`  
**Default:** `'top'`

**Examples:**

```tsx
// Bottom toolbar
<ContentBlocksEditor toolbarPosition="bottom" />

// Top toolbar (default)
<ContentBlocksEditor toolbarPosition="top" />

// Floating toolbar (future feature)
<ContentBlocksEditor toolbarPosition="floating" />
```

## Theme Props

### darkMode

```tsx
<ContentBlocksEditor darkMode={true} />
```

Enable dark mode styling.

**Type:** `boolean`  
**Default:** `false`

**Examples:**

```tsx
// Toggle dark mode
const [isDark, setIsDark] = useState(false);

<div className={isDark ? 'cb-dark' : ''}>
  <ContentBlocksEditor darkMode={isDark} />
</div>

// System preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
<ContentBlocksEditor darkMode={prefersDark} />
```

## Behavior Props

### autoFocus

```tsx
<ContentBlocksEditor autoFocus={true} />
```

Automatically focus the editor when it mounts.

**Type:** `boolean`  
**Default:** `false`

**Examples:**

```tsx
// Auto-focus in modal
<Modal isOpen={isOpen}>
  <ContentBlocksEditor autoFocus={true} />
</Modal>

// Focus on mount
<ContentBlocksEditor autoFocus={true} />
```

### spellCheck

```tsx
<ContentBlocksEditor spellCheck={false} />
```

Enable or disable browser spell checking.

**Type:** `boolean`  
**Default:** `true`

**Examples:**

```tsx
// Disable spell check (for code)
<ContentBlocksEditor spellCheck={false} />

// Enable spell check
<ContentBlocksEditor spellCheck={true} />
```

## Event Callbacks

### onChange

```tsx
<ContentBlocksEditor 
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

<ContentBlocksEditor 
  onChange={(html) => {
    setContent(html);
    debouncedSave(html);
  }}
/>

// Track changes
const [changeCount, setChangeCount] = useState(0);

<ContentBlocksEditor 
  onChange={(html) => {
    setChangeCount(c => c + 1);
  }}
/>

// Sync with state
<ContentBlocksEditor 
  onChange={setContent}
/>
```

### onSave

```tsx
<ContentBlocksEditor 
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
<ContentBlocksEditor 
  onSave={async (html) => {
    const response = await saveContent(html);
    toast.success('Saved!');
  }}
/>

// Save to localStorage
<ContentBlocksEditor 
  onSave={(html) => {
    localStorage.setItem('draft', html);
  }}
/>
```

### onFocus / onBlur

```tsx
<ContentBlocksEditor 
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

<ContentBlocksEditor 
  onFocus={() => setIsEditing(true)}
  onBlur={() => setIsEditing(false)}
/>

// Show save prompt on blur
<ContentBlocksEditor 
  onBlur={() => {
    if (hasUnsavedChanges) {
      showSavePrompt();
    }
  }}
/>
```

### onReady

```tsx
<ContentBlocksEditor 
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

<ContentBlocksEditor 
  onReady={setEditor}
/>

// Execute commands on ready
<ContentBlocksEditor 
  onReady={(editor) => {
    editor.focus();
    editor.insertBlock('heading', { level: 1 });
  }}
/>
```

## Upload Callbacks

### onUploadStart

```tsx
<ContentBlocksEditor 
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
<ContentBlocksEditor 
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
<ContentBlocksEditor 
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
<ContentBlocksEditor 
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
- [ContentBlocksEditor](/docs/components/editor) - Component documentation
- [Quick Start](/docs/quick-start) - Getting started guide
