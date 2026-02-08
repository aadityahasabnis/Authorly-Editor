# Events API

Guide to all event callbacks available in Authorly editor. Events allow you to respond to user actions and editor state changes.

## Event Callbacks

All event callbacks are passed as props to `ContentBlocksEditor`.

```tsx
<ContentBlocksEditor 
  onChange={(html) => console.log('Changed')}
  onSave={(html) => console.log('Saved')}
  onFocus={() => console.log('Focused')}
  onBlur={() => console.log('Blurred')}
  onReady={(editor) => console.log('Ready')}
/>
```

## Content Events

### onChange

Fired whenever the editor content changes.

**Signature:**
```tsx
onChange?: (html: string) => void
```

**Parameters:**
- `html` - Current HTML content of the editor

**When it fires:**
- User types or deletes text
- Block is inserted or removed
- Formatting is applied
- Content is pasted
- Undo/redo is performed

**Examples:**

```tsx
// Auto-save draft
<ContentBlocksEditor 
  onChange={(html) => {
    localStorage.setItem('draft', html);
  }}
/>

// Track changes
const [changeCount, setChangeCount] = useState(0);

<ContentBlocksEditor 
  onChange={(html) => {
    setChangeCount(c => c + 1);
    console.log(`Changes: ${changeCount}`);
  }}
/>

// Debounced save
import { useDebounce } from './hooks';

const [content, setContent] = useState('');
const debouncedSave = useDebounce(() => {
  saveToAPI(content);
}, 1000);

<ContentBlocksEditor 
  onChange={(html) => {
    setContent(html);
    debouncedSave();
  }}
/>

// Validate content
<ContentBlocksEditor 
  onChange={(html) => {
    const text = html.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    
    if (wordCount > 5000) {
      toast.warning('Content exceeds 5000 words');
    }
  }}
/>
```

### onSave

Fired when user presses `Ctrl+S` (or `Cmd+S` on Mac).

**Signature:**
```tsx
onSave?: (html: string) => void
```

**Parameters:**
- `html` - Current HTML content of the editor

**When it fires:**
- User presses `Ctrl+S` / `Cmd+S`
- Only fires once per keypress
- Does not fire on other save triggers

**Examples:**

```tsx
// Save to API
<ContentBlocksEditor 
  onSave={async (html) => {
    try {
      await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: html }),
      });
      toast.success('Saved successfully!');
    } catch (error) {
      toast.error('Failed to save');
    }
  }}
/>

// Save to localStorage
<ContentBlocksEditor 
  onSave={(html) => {
    localStorage.setItem('document', html);
    console.log('Saved to localStorage');
  }}
/>

// Multi-step save
<ContentBlocksEditor 
  onSave={async (html) => {
    // Show loading
    setIsSaving(true);
    
    // Validate
    if (!validateContent(html)) {
      toast.error('Content validation failed');
      return;
    }
    
    // Save
    const result = await saveDocument(html);
    
    // Update UI
    setLastSaved(new Date());
    setIsSaving(false);
    toast.success('Saved!');
  }}
/>
```

## Focus Events

### onFocus

Fired when the editor gains focus.

**Signature:**
```tsx
onFocus?: () => void
```

**When it fires:**
- User clicks in editor
- Editor is programmatically focused
- User tabs into editor

**Examples:**

```tsx
// Track editing state
const [isEditing, setIsEditing] = useState(false);

<ContentBlocksEditor 
  onFocus={() => setIsEditing(true)}
  onBlur={() => setIsEditing(false)}
/>

{isEditing && <div>Currently editing...</div>}

// Show toolbar on focus
const [showToolbar, setShowToolbar] = useState(false);

<ContentBlocksEditor 
  showToolbar={showToolbar}
  onFocus={() => setShowToolbar(true)}
/>

// Log analytics
<ContentBlocksEditor 
  onFocus={() => {
    analytics.track('Editor Focused', {
      timestamp: new Date().toISOString(),
    });
  }}
/>
```

### onBlur

Fired when the editor loses focus.

**Signature:**
```tsx
onBlur?: () => void
```

**When it fires:**
- User clicks outside editor
- User tabs out of editor
- Editor is programmatically blurred

**Examples:**

```tsx
// Auto-save on blur
<ContentBlocksEditor 
  onBlur={() => {
    const html = editorRef.current?.getHTML();
    if (html) {
      saveToAPI(html);
    }
  }}
/>

// Prompt to save changes
const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

<ContentBlocksEditor 
  onChange={() => setHasUnsavedChanges(true)}
  onBlur={() => {
    if (hasUnsavedChanges) {
      const confirmLeave = confirm('Save changes?');
      if (confirmLeave) {
        saveContent();
      }
    }
  }}
/>

// Hide UI on blur
<ContentBlocksEditor 
  onBlur={() => {
    setShowFormatting(false);
    setShowToolbar(false);
  }}
/>
```

## Lifecycle Events

### onReady

Fired when the editor is fully initialized and ready to use.

**Signature:**
```tsx
onReady?: (editor: EditorInstance) => void
```

**Parameters:**
- `editor` - The editor instance with all methods

**When it fires:**
- Once, after editor mounts
- After initial content is loaded
- When editor is ready for interaction

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
    // Focus editor
    editor.focus();
    
    // Insert welcome content
    editor.insertBlock('heading', { 
      level: 1, 
      content: 'Welcome!' 
    });
  }}
/>

// Initialize custom features
<ContentBlocksEditor 
  onReady={(editor) => {
    // Setup custom event listeners
    editor.container.addEventListener('paste', handlePaste);
    
    // Track editor ready
    analytics.track('Editor Ready', {
      timestamp: new Date().toISOString(),
    });
  }}
/>
```

## Upload Events

### onUploadStart

Fired when an image upload begins.

**Signature:**
```tsx
onUploadStart?: (filename: string) => void
```

**Parameters:**
- `filename` - Name of the file being uploaded

**Examples:**

```tsx
<ContentBlocksEditor 
  onUploadStart={(filename) => {
    console.log(`Uploading ${filename}...`);
    setIsUploading(true);
    setUploadProgress(0);
  }}
/>
```

### onUploadSuccess

Fired when an image upload completes successfully.

**Signature:**
```tsx
onUploadSuccess?: (result: UploadResult) => void
```

**Parameters:**
- `result` - Upload result object

```tsx
interface UploadResult {
  url: string;
  filename: string;
  size: number;
  width?: number;
  height?: number;
}
```

**Examples:**

```tsx
<ContentBlocksEditor 
  onUploadSuccess={(result) => {
    console.log('Upload complete:', result.url);
    toast.success('Image uploaded!');
    setIsUploading(false);
    
    // Track in analytics
    analytics.track('Image Uploaded', {
      url: result.url,
      size: result.size,
    });
  }}
/>
```

### onUploadError

Fired when an image upload fails.

**Signature:**
```tsx
onUploadError?: (error: Error) => void
```

**Parameters:**
- `error` - Error object with details

**Examples:**

```tsx
<ContentBlocksEditor 
  onUploadError={(error) => {
    console.error('Upload failed:', error);
    toast.error(error.message);
    setIsUploading(false);
    
    // Log error
    logError('Image Upload Failed', {
      message: error.message,
      stack: error.stack,
    });
  }}
/>
```

### onUploadProgress

Fired during image upload with progress updates.

**Signature:**
```tsx
onUploadProgress?: (progress: UploadProgress) => void
```

**Parameters:**
- `progress` - Progress object

```tsx
interface UploadProgress {
  percent: number;      // 0-100
  loaded: number;       // Bytes loaded
  total: number;        // Total bytes
  filename: string;     // File being uploaded
}
```

**Examples:**

```tsx
const [uploadProgress, setUploadProgress] = useState(0);

<ContentBlocksEditor 
  onUploadProgress={(progress) => {
    setUploadProgress(progress.percent);
    console.log(`${progress.percent}% uploaded`);
  }}
/>

{uploadProgress > 0 && uploadProgress < 100 && (
  <div className="progress-bar">
    <div style={{ width: `${uploadProgress}%` }} />
  </div>
)}
```

## Complete Example

```tsx
import { useState, useRef } from 'react';
import { ContentBlocksEditor, EditorRef } from 'authorly-editor';

function FullEditor() {
  const editorRef = useRef<EditorRef>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  return (
    <div>
      {/* Status bar */}
      <div className="status-bar">
        <span>{isEditing ? 'Editing...' : 'Idle'}</span>
        <span>{hasUnsavedChanges ? 'Unsaved changes' : 'All changes saved'}</span>
        {lastSaved && <span>Last saved: {lastSaved.toLocaleTimeString()}</span>}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <span>Uploading: {uploadProgress}%</span>
        )}
      </div>

      {/* Editor */}
      <ContentBlocksEditor 
        ref={editorRef}
        
        // Content events
        onChange={(html) => {
          setHasUnsavedChanges(true);
          // Debounced auto-save could go here
        }}
        
        onSave={async (html) => {
          try {
            await fetch('/api/save', {
              method: 'POST',
              body: JSON.stringify({ content: html }),
            });
            setHasUnsavedChanges(false);
            setLastSaved(new Date());
            toast.success('Saved!');
          } catch (error) {
            toast.error('Save failed');
          }
        }}
        
        // Focus events
        onFocus={() => {
          setIsEditing(true);
          analytics.track('Editor Focused');
        }}
        
        onBlur={() => {
          setIsEditing(false);
          if (hasUnsavedChanges) {
            // Optionally auto-save on blur
            const html = editorRef.current?.getHTML();
            if (html) saveContent(html);
          }
        }}
        
        // Lifecycle events
        onReady={(editor) => {
          console.log('Editor ready!');
          // Initialize features
          setupCustomFeatures(editor);
        }}
        
        // Upload events
        onUploadStart={(filename) => {
          console.log('Uploading:', filename);
          setUploadProgress(0);
        }}
        
        onUploadProgress={(progress) => {
          setUploadProgress(progress.percent);
        }}
        
        onUploadSuccess={(result) => {
          console.log('Uploaded:', result.url);
          setUploadProgress(0);
          toast.success('Image uploaded!');
        }}
        
        onUploadError={(error) => {
          console.error('Upload error:', error);
          setUploadProgress(0);
          toast.error(error.message);
        }}
      />
    </div>
  );
}
```

## Event Timing

Understanding when events fire in relation to each other:

```
1. Component Mount
   ↓
2. onReady (once)
   ↓
3. User Interaction
   ↓
4. onFocus (if not focused)
   ↓
5. onChange (on content change)
   ↓
6. onSave (on Ctrl+S)
   ↓
7. onBlur (when focus lost)
```

## Best Practices

1. **Debounce onChange**: Avoid expensive operations on every keystroke
2. **Handle async errors**: Always catch errors in async handlers
3. **Use refs for state**: Avoid stale closures in event handlers
4. **Clean up**: Remove event listeners in cleanup functions
5. **Provide feedback**: Show loading states and success/error messages
6. **Track analytics**: Log important events for insights
7. **Validate input**: Check content before saving
8. **Handle edge cases**: Test with empty content, large content, etc.

## Debugging Events

```tsx
<ContentBlocksEditor 
  onChange={(html) => {
    console.log('onChange:', html.substring(0, 100));
  }}
  onSave={(html) => {
    console.log('onSave:', html.length, 'characters');
  }}
  onFocus={() => console.log('onFocus')}
  onBlur={() => console.log('onBlur')}
  onReady={(editor) => {
    console.log('onReady:', editor);
  }}
/>
```

## See Also

- [Editor Props](/docs/api/editor-props) - All props reference
- [EditorRef API](/docs/api/editor-ref) - Methods reference
- [ContentBlocksEditor](/docs/components/editor) - Component documentation
- [Quick Start](/docs/quick-start) - Getting started guide
