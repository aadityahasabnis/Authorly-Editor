# Installation

Install Authorly in your React project using your preferred package manager.

## Package Manager Installation

### npm

```bash
npm install authorly-editor
```

### yarn

```bash
yarn add authorly-editor
```

### pnpm

```bash
pnpm add authorly-editor
```

## Requirements

Authorly requires the following peer dependencies:

- **React** 17.0.0 or higher (including React 19)
- **React DOM** 17.0.0 or higher
- **Lucide React** ^0.460.0 (for icons)

These are installed automatically if you don't already have them.

## Importing Styles

Authorly ships with default styles that must be imported in your application:

```tsx
// In your app's entry point (e.g., _app.tsx, main.tsx, or layout.tsx)
import 'authorly-editor/styles';
```

For Next.js App Router:

```tsx
// app/layout.tsx
import 'authorly-editor/styles';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## Next.js Setup

Authorly uses browser-only APIs and must be loaded dynamically in Next.js to avoid SSR issues:

```tsx
// components/Editor.tsx
'use client';

import dynamic from 'next/dynamic';

const ContentBlocksEditor = dynamic(
  () => import('authorly-editor').then((mod) => mod.ContentBlocksEditor),
  { 
    ssr: false,
    loading: () => <div>Loading editor...</div>
  }
);

export default ContentBlocksEditor;
```

See the [Next.js Integration](/docs/guides/nextjs) guide for complete setup instructions.

## Verification

After installation, verify everything works:

```tsx
import { ContentBlocksEditor } from 'authorly-editor';
import 'authorly-editor/styles';

function App() {
  return <ContentBlocksEditor initialContent="<p>Hello World!</p>" />;
}
```

If you see the editor with "Hello World!", you're ready to go!

## Troubleshooting

### TypeScript Errors

If you encounter TypeScript errors, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### Module Not Found

If you see "Module not found" errors:

1. Clear your build cache: `rm -rf .next node_modules/.cache`
2. Reinstall dependencies: `npm install`
3. Restart your dev server

### Styles Not Loading

If the editor appears unstyled:

1. Verify you imported `'authorly-editor/styles'`
2. Check your bundler configuration supports CSS imports
3. For Next.js, ensure styles are imported in your layout file

## Next Steps

- Follow the [Quick Start](/docs/quick-start) guide
- Explore the [Playground](/playground) to see Authorly in action
- Read the [Editor Component](/docs/components/editor) API reference
