# Introduction

Authorly is a lightweight, block-based rich text editor for React that outputs clean, semantic HTML.

## Why Authorly?

Unlike other rich text editors that output complex JSON structures or proprietary formats, Authorly produces **pure HTML** that you can store directly in your database and render anywhere.

### Key Benefits

- **Pure HTML Output** — No proprietary formats, just clean semantic HTML
- **Lightweight** — Only ~30kb gzipped, no heavy dependencies
- **Block-Based** — Modern editing experience with 14 block types
- **TypeScript** — Full type support out of the box
- **Customizable** — Easy to style and extend

## Quick Example

```tsx
import { ContentBlocksEditor } from 'authorly-editor';
import 'authorly-editor/styles';

function App() {
  const [content, setContent] = useState('<p>Hello World!</p>');

  return (
    <ContentBlocksEditor
      initialContent={content}
      onChange={setContent}
    />
  );
}
```

Ready to get started? Head to the [Installation](/docs/installation) guide.
