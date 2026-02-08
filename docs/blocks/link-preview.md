# Link Preview

The Link Preview block creates rich, visual cards for URLs with automatic metadata fetching using Open Graph protocol. Perfect for embedding links to articles, videos, social media posts, and other web content.

## Features

- Automatic metadata fetching from URLs
- Open Graph protocol support
- Displays title, description, and image
- Shows favicon and domain
- Loading state with spinner
- Fallback to simple link if metadata unavailable
- Edit and remove actions
- Opens in new tab (`target="_blank"`)
- Fully styled and responsive

## Usage

### Insert via Slash Command

```
Type "/" → Search "link preview" → Press Enter
```

Or use keywords: `/link`, `/url`, `/preview`, `/embed`, `/opengraph`

### Insert via Toolbar

Not directly available in toolbar. Use slash command or programmatic insertion.

### Programmatic Insertion

```tsx
import { useRef } from 'react';
import { ContentBlocksEditor, EditorRef } from 'authorly-editor';

function MyEditor() {
  const editorRef = useRef<EditorRef>(null);

  const insertLinkPreview = () => {
    editorRef.current?.insertBlock('linkPreview', {
      url: 'https://github.com/facebook/react',
    });
  };

  return (
    <>
      <button onClick={insertLinkPreview}>Add Link Preview</button>
      <ContentBlocksEditor ref={editorRef} />
    </>
  );
}
```

## Data Structure

```tsx
interface LinkPreviewBlockData {
  id: string;
  type: 'linkPreview';
  url: string;              // URL to fetch preview for
  preview?: LinkPreviewData; // Fetched metadata (optional)
  loading?: boolean;         // Loading state
}

interface LinkPreviewData {
  url: string;              // Original URL
  title?: string;           // Page title
  description?: string;     // Page description
  image?: string;           // Preview image URL
  siteName?: string;        // Site name
}
```

## HTML Output

### With Preview (after metadata loads)

```html
<div class="cb-link-preview" data-url="https://example.com">
  <a href="https://example.com" target="_blank" rel="noopener noreferrer" 
     class="cb-link-preview-card">
    
    <!-- Optional image -->
    <div class="cb-link-preview-image">
      <img src="https://example.com/og-image.jpg" alt="Article Title" loading="lazy" />
    </div>
    
    <div class="cb-link-preview-content">
      <!-- Header with favicon and domain -->
      <div class="cb-link-preview-header">
        <img src="https://example.com/favicon.ico" class="cb-link-preview-favicon" />
        <span class="cb-link-preview-domain">example.com</span>
      </div>
      
      <!-- Title -->
      <h3 class="cb-link-preview-title">Article Title</h3>
      
      <!-- Description -->
      <p class="cb-link-preview-description">
        A brief description of the article content...
      </p>
      
      <!-- Footer -->
      <div class="cb-link-preview-footer">
        <svg><!-- External link icon --></svg>
        <span>https://example.com/article</span>
      </div>
    </div>
  </a>
  
  <!-- Action buttons -->
  <div class="cb-link-preview-actions">
    <button data-action="edit"><!-- Edit icon --></button>
    <button data-action="remove"><!-- Remove icon --></button>
  </div>
</div>
```

### Loading State

```html
<div class="cb-link-preview" data-url="https://example.com">
  <div class="cb-link-preview-loading">
    <div class="cb-link-preview-spinner">
      <svg><!-- Spinner icon --></svg>
    </div>
    <span>Loading preview...</span>
  </div>
</div>
```

### Fallback (no metadata)

```html
<div class="cb-link-preview" data-url="https://example.com">
  <div class="cb-link-preview-simple">
    <svg><!-- Link icon --></svg>
    <div class="cb-link-preview-simple-content">
      <a href="https://example.com" target="_blank" rel="noopener noreferrer"
         class="cb-link-preview-simple-url">
        https://example.com
      </a>
      <span class="cb-link-preview-simple-domain">example.com</span>
    </div>
  </div>
</div>
```

## Examples

### GitHub Repository

```tsx
editorRef.current?.insertBlock('linkPreview', {
  url: 'https://github.com/facebook/react',
});

// Fetches:
// - Title: "facebook/react: A declarative, efficient..."
// - Description: "The library for web and native user interfaces..."
// - Image: GitHub social card
// - Domain: github.com
```

### YouTube Video

```tsx
editorRef.current?.insertBlock('linkPreview', {
  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
});

// Fetches:
// - Title: Video title
// - Description: Video description
// - Image: Video thumbnail
// - Domain: youtube.com
```

### Blog Article

```tsx
editorRef.current?.insertBlock('linkPreview', {
  url: 'https://example.com/blog/amazing-article',
});

// Fetches Open Graph metadata:
// - og:title
// - og:description
// - og:image
// - og:site_name
```

### Twitter/X Post

```tsx
editorRef.current?.insertBlock('linkPreview', {
  url: 'https://twitter.com/username/status/123456',
});

// Fetches Twitter card metadata
```

## Metadata Fetching

The Link Preview block uses Open Graph protocol to fetch metadata:

### What Gets Fetched

1. **Title** - `og:title` or `<title>` tag
2. **Description** - `og:description` or `<meta name="description">`
3. **Image** - `og:image` or first `<img>` tag
4. **Site Name** - `og:site_name`
5. **Favicon** - `/favicon.ico` or `<link rel="icon">`

### Fetch Implementation

```tsx
import { fetchLinkPreview } from 'authorly-editor';

const preview = await fetchLinkPreview('https://example.com');

console.log(preview);
// {
//   url: 'https://example.com',
//   title: 'Example Domain',
//   description: 'Example description',
//   image: 'https://example.com/og-image.jpg',
//   siteName: 'Example'
// }
```

### Custom Fetch Handler

If you need to use a backend proxy for CORS:

```tsx
// Create custom fetch function
async function customFetchPreview(url: string) {
  const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
  return response.json();
}

// Then manually update the link preview element
const element = document.querySelector('[data-url="https://example.com"]');
const preview = await customFetchPreview('https://example.com');
// Update element with preview data
```

## Styling

### Default Styles

```css
.cb-link-preview {
  border: 1px solid var(--cb-border);
  border-radius: var(--cb-radius-lg);
  overflow: hidden;
  margin: var(--cb-spacing-md) 0;
  transition: box-shadow 0.2s ease;
}

.cb-link-preview:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cb-link-preview-card {
  display: flex;
  text-decoration: none;
  color: inherit;
}

.cb-link-preview-image {
  width: 200px;
  flex-shrink: 0;
}

.cb-link-preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cb-link-preview-content {
  flex: 1;
  padding: var(--cb-spacing-md);
}

.cb-link-preview-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--cb-text);
}

.cb-link-preview-description {
  font-size: 0.875rem;
  color: var(--cb-text-secondary);
  margin: 0 0 0.75rem;
  line-height: 1.5;
}
```

### Custom Styling

```css
/* Compact layout */
.cb-link-preview-card {
  flex-direction: column;
}

.cb-link-preview-image {
  width: 100%;
  height: 200px;
}

/* Card hover effect */
.cb-link-preview-card:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}

/* Colored border */
.cb-link-preview {
  border-left: 4px solid #3b82f6;
}

/* Dark mode */
.cb-dark .cb-link-preview {
  background: var(--cb-bg-secondary);
  border-color: var(--cb-border);
}
```

## Common Patterns

### Article Embed List

```tsx
const articles = [
  'https://example.com/article-1',
  'https://example.com/article-2',
  'https://example.com/article-3',
];

articles.forEach(url => {
  editorRef.current?.insertBlock('linkPreview', { url });
});
```

### Resource List

```tsx
function ResourcesEditor() {
  const resources = [
    { url: 'https://react.dev', category: 'Documentation' },
    { url: 'https://github.com/facebook/react', category: 'Source Code' },
  ];

  return (
    <div>
      <h2>Resources</h2>
      <ContentBlocksEditor
        initialContent={resources.map(r => ({
          type: 'linkPreview',
          url: r.url,
        }))}
      />
    </div>
  );
}
```

### Social Media Feed

```tsx
const posts = [
  'https://twitter.com/user/status/123',
  'https://linkedin.com/posts/post-id',
  'https://youtube.com/watch?v=abc',
];

posts.forEach(url => {
  editorRef.current?.insertBlock('linkPreview', { url });
});
```

## CORS Considerations

Link preview fetching may encounter CORS issues when fetching from external domains.

### Solutions

1. **Backend Proxy** (Recommended)
   ```tsx
   // api/link-preview.ts (Next.js API route)
   export default async function handler(req, res) {
     const { url } = req.query;
     const response = await fetch(url);
     const html = await response.text();
     // Parse HTML and extract Open Graph tags
     const preview = parseOpenGraphTags(html);
     res.json(preview);
   }
   ```

2. **Use CORS Proxy** (Development only)
   ```tsx
   const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
   await fetchLinkPreview(proxyUrl + 'https://example.com');
   ```

3. **Server-Side Rendering**
   ```tsx
   // Fetch previews on server, pass as props
   export async function getStaticProps() {
     const preview = await fetchLinkPreview('https://example.com');
     return { props: { preview } };
   }
   ```

## Accessibility

- Semantic HTML with proper link elements
- `rel="noopener noreferrer"` for security
- `target="_blank"` for external links
- Alt text on images
- Proper heading hierarchy
- Keyboard navigable

## Performance

- Lazy loading images (`loading="lazy"`)
- Async metadata fetching (non-blocking)
- Cached previews (browser cache)
- Graceful fallback if fetch fails
- Minimal re-renders

## Browser Support

- All modern browsers
- Fetch API required
- Lazy loading supported in Chrome, Firefox, Safari

## Utilities

### Extract Domain

```tsx
import { extractDomain } from 'authorly-editor';

extractDomain('https://github.com/user/repo');
// Returns: 'github.com'
```

### Get Favicon URL

```tsx
import { getFaviconUrl } from 'authorly-editor';

getFaviconUrl('https://github.com');
// Returns: 'https://github.com/favicon.ico'
```

## Limitations

1. **CORS**: Many sites block cross-origin requests. Use a backend proxy.
2. **Rate Limiting**: Repeated requests may be rate-limited
3. **No JavaScript**: Can't fetch content from JavaScript-rendered pages
4. **Paywalls**: Content behind paywalls won't have metadata
5. **Private URLs**: Can't fetch from authenticated/private URLs

## Tips

1. **Use HTTPS**: Ensures metadata can be fetched
2. **Check Open Graph**: Verify target site has Open Graph tags
3. **Backend Proxy**: Recommended for production
4. **Cache Results**: Store fetched previews to avoid repeated requests
5. **Loading State**: Always show loading indicator during fetch

## See Also

- [Link Formatting](/docs/blocks/paragraph) - Inline links within text
- [Video Block](/docs/blocks/video) - Embed videos
- [Image Block](/docs/blocks/image) - Embed images
- [ContentBlocksEditor](/docs/components/editor) - Editor component
