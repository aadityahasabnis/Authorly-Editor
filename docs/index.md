# Introduction

Authorly is a lightweight, block-based rich text editor for React that outputs clean, semantic HTML. Built for authors, blogs, and documentation with publish-ready output.

## Why Authorly?

Unlike other rich text editors that output complex JSON structures or proprietary formats, Authorly produces **pure HTML** that you can store directly in your database and render anywhere.

### Key Benefits

- **Pure HTML Output** — No proprietary formats, just clean semantic HTML
- **Lightweight** — Only ~30kb gzipped, no heavy dependencies
- **Block-Based** — Modern editing experience with 16 block types
- **TypeScript** — Full type support out of the box
- **Cloud Uploads** — Built-in Cloudinary & S3 support
- **Customizable** — Easy to style and extend

## Quick Example

```tsx
import { AuthorlyEditor } from 'authorly-editor';
import 'authorly-editor/styles';

function App() {
  const [content, setContent] = useState('<p>Hello World!</p>');

  return (
    <AuthorlyEditor
      initialContent={content}
      onChange={setContent}
    />
  );
}
```

## Main Components

| Component | Purpose |
|-----------|---------|
| `AuthorlyEditor` | Main rich text editor component |
| `AuthorlyRenderer` | Render saved HTML content with enhancements |
| `AuthorlyTOC` | Auto-generate table of contents from headings |

> **Note:** `ContentBlocksEditor`, `ContentBlocksRenderer`, and `TableOfContents` are deprecated aliases that still work for backwards compatibility.

Ready to get started? Head to the [Installation](/docs/installation) guide.
