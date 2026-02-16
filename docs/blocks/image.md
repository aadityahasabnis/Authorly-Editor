# Image

Images enrich your content with visual elements, screenshots, diagrams, and illustrations. Authorly's image block provides a complete solution for adding, configuring, and displaying images in your content.

## Overview

Images are essential for:

- **Visual communication** - Convey information quickly
- **Breaking up text** - Improve content scannability
- **Screenshots** - Show UI, workflows, and examples
- **Diagrams** - Explain complex concepts
- **Product photos** - Showcase products and features

**Key features:**
- Multiple upload methods (file, URL, drag-and-drop)
- Alt text for accessibility
- Captions for context
- Responsive sizing
- Alignment options (left, center, right)
- Lazy loading support
- Clean HTML output

## Adding Images

### Using Slash Command

Type `/image` or `/img` to insert an image block:

```
/image
```

This creates an empty image block with upload options.

### Drag and Drop

Simply drag an image file from your computer and drop it into the editor. The image block is created automatically at the drop location.

### Paste from Clipboard

Copy an image and paste it directly into the editor:

1. Copy image (from browser, screenshot tool, etc.)
2. Click where you want the image
3. Paste (`Ctrl/Cmd + V`)
4. Image block is created automatically

### Using Markdown Syntax

Type the standard markdown image syntax:

```markdown
![Alt text](https://example.com/image.jpg)
```

The image block is created with the URL and alt text applied.

### Via Toolbar

1. Click where you want the image
2. Click the "Image" button in the toolbar
3. Choose upload method or enter URL

## Image Sources

### Upload from Computer

**Method 1: File picker**
1. Click "Upload Image"
2. Browse and select file
3. Image uploads and displays

**Method 2: Drag and drop**
1. Drag image file from file explorer
2. Drop into editor
3. Image uploads automatically

**Supported formats:**
- JPEG / JPG
- PNG
- GIF (static and animated)
- WebP
- SVG
- AVIF

**Size limits:**
- Maximum file size: 10MB (configurable)
- Recommended: < 2MB for web performance

### Image URL

Use an image hosted elsewhere:

1. Click "Add by URL"
2. Enter the complete image URL
3. Click "Add Image"
4. Image displays from the URL

**URL examples:**
```
https://example.com/photos/image.jpg
https://cdn.example.com/assets/logo.png
https://images.unsplash.com/photo-xxx
```

### Integration with Image Services

#### Cloudinary

```tsx
import { AuthorlyEditor } from 'authorly-editor';

<AuthorlyEditor
  onImageUpload={async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_preset');
    
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/your_cloud/image/upload',
      { method: 'POST', body: formData }
    );
    
    const data = await res.json();
    return data.secure_url;
  }}
/>
```

#### AWS S3

```tsx
<AuthorlyEditor
  onImageUpload={async (file) => {
    // Get pre-signed URL from your backend
    const { uploadUrl, imageUrl } = await getPresignedUrl();
    
    // Upload to S3
    await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type }
    });
    
    return imageUrl;
  }}
/>
```

#### Firebase Storage

```tsx
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

<AuthorlyEditor
  onImageUpload={async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  }}
/>
```

## Image Configuration

### Alt Text

Alternative text describes the image for accessibility and SEO:

**How to add:**
1. Click the image
2. Find the "Alt text" field
3. Enter descriptive text
4. Changes save automatically

**Best practices:**
```
❌ Bad alt text:
- "image"
- "img_1234.jpg"
- "" (empty)

✅ Good alt text:
- "Team collaborating in modern office"
- "Dashboard showing analytics metrics"
- "React component hierarchy diagram"
```

**When to leave alt text empty:**
- Decorative images that don't add information
- Images whose content is described in surrounding text
- Use `alt=""` (empty string) rather than no alt attribute

### Captions

Add context or attribution to images:

**How to add:**
1. Click the image
2. Enable "Show caption"
3. Enter caption text
4. Format caption with bold, italic, links

**Caption examples:**
```markdown
Figure 1: User dashboard showing key metrics

Screenshot from the admin panel (click to enlarge)

Photo by John Doe on Unsplash
```

### Image Sizing

Control image dimensions:

**Size options:**
- **Auto** - Original size (up to container width)
- **Small** - 400px width
- **Medium** - 600px width  
- **Large** - 800px width
- **Full width** - 100% of container
- **Custom** - Specify exact dimensions

**How to resize:**
1. Click the image
2. Select size from dropdown
3. Or drag corner handles to resize
4. Or enter custom width/height

### Alignment

Position images within your content:

**Alignment options:**
- **Left** - Float image to the left, text wraps right
- **Center** - Center image, no text wrapping
- **Right** - Float image to the right, text wraps left
- **Full width** - Span entire content area

**Keyboard shortcuts:**
- `Ctrl/Cmd + Shift + L` - Align left
- `Ctrl/Cmd + Shift + E` - Align center
- `Ctrl/Cmd + Shift + R` - Align right

## Best Practices

### Optimize Images Before Upload

```
❌ Don't upload:
- 5000x3000px screenshot (10MB)
- Uncompressed PNG when JPEG works
- Original camera photos

✅ Do upload:
- 1920x1080px or smaller
- Compressed images (use tools like TinyPNG)
- Appropriate format (JPEG for photos, PNG for graphics)
```

### Use Descriptive Alt Text

Alt text helps with:
- **Accessibility** - Screen readers describe images
- **SEO** - Search engines understand content
- **Broken images** - Alt text shows if image fails to load

```
❌ Generic:
alt="Screenshot"

✅ Descriptive:
alt="Application dashboard showing user activity metrics for the past 30 days"
```

### Choose Appropriate Format

| Format | Best For | Notes |
|--------|----------|-------|
| JPEG | Photos, complex images | Lossy, small file size |
| PNG | Graphics, transparency | Lossless, larger files |
| WebP | Modern web images | Better compression, not universal |
| SVG | Icons, logos, diagrams | Vector, infinitely scalable |
| GIF | Simple animations | Limited colors, large files |

### Consider Loading Performance

**Lazy loading:**
```tsx
<AuthorlyRenderer
  html={content}
  lazyLoadImages={true}  // Load images as they enter viewport
/>
```

**Responsive images:**
```html
<img 
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 400px, 800px"
  alt="Descriptive alt text"
/>
```

### Use Captions Wisely

```
✅ Good caption uses:
- Attribute photo sources
- Add context not in main text
- Explain complex diagrams
- Link to higher resolution

❌ Avoid:
- Repeating alt text in caption
- Stating the obvious ("This is an image")
- Long paragraphs
```

## HTML Output

Images generate clean, semantic HTML:

### Basic Image

**Input:**
```markdown
![Team photo](https://example.com/team.jpg)
```

**Output:**
```html
<img src="https://example.com/team.jpg" alt="Team photo" />
```

### With Caption

**Input:**
```markdown
![Dashboard screenshot](https://example.com/dashboard.jpg)
_Figure 1: User dashboard interface_
```

**Output:**
```html
<figure>
  <img src="https://example.com/dashboard.jpg" alt="Dashboard screenshot" />
  <figcaption>Figure 1: User dashboard interface</figcaption>
</figure>
```

### With Alignment

**Input:**
```markdown
![Logo](logo.png) {align=center width=200}
```

**Output:**
```html
<figure style="text-align: center;">
  <img src="logo.png" alt="Logo" width="200" />
</figure>
```

### Responsive Image

**Output:**
```html
<img 
  src="image.jpg" 
  alt="Description"
  loading="lazy"
  decoding="async"
  style="max-width: 100%; height: auto;"
/>
```

## Styling Images

### Default Styles

Authorly provides sensible image defaults:

```css
.authorly-editor img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1.5rem auto;
  border-radius: 0.5rem;
}

.authorly-editor figure {
  margin: 2rem 0;
}

.authorly-editor figcaption {
  margin-top: 0.75rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  font-style: italic;
}
```

### Custom Image Styles

Create your own image styles:

```css
/* Bordered images */
.authorly-editor img {
  border: 2px solid #e5e7eb;
  padding: 0.5rem;
  background: white;
}

/* Shadow effect */
.authorly-editor img {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
}

/* Hover zoom */
.authorly-editor img {
  transition: transform 0.3s ease;
  cursor: pointer;
}

.authorly-editor img:hover {
  transform: scale(1.02);
}

/* Polaroid style */
.authorly-editor figure {
  background: white;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: rotate(-2deg);
}

.authorly-editor figure img {
  margin: 0;
}

/* Full-bleed images */
.authorly-editor img[data-size="full"] {
  width: 100vw;
  max-width: none;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  border-radius: 0;
}
```

### Alignment Styles

```css
/* Left aligned with text wrap */
.authorly-editor img[data-align="left"] {
  float: left;
  margin-right: 1.5rem;
  margin-bottom: 1rem;
  max-width: 50%;
}

/* Right aligned with text wrap */
.authorly-editor img[data-align="right"] {
  float: right;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  max-width: 50%;
}

/* Center aligned */
.authorly-editor img[data-align="center"] {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
```

## Accessibility

Images must be accessible to all users:

### Required: Alt Text

Every image needs alt text:

```html
✅ Accessible:
<img src="chart.png" alt="Bar chart showing 40% increase in sales Q4 2023" />

❌ Not accessible:
<img src="chart.png" />
<img src="chart.png" alt="image" />
```

### Decorative Images

Use empty alt for purely decorative images:

```html
<img src="decorative-line.svg" alt="" role="presentation" />
```

### Complex Images

For complex diagrams, provide detailed description:

```html
<figure>
  <img src="architecture.png" alt="System architecture diagram" />
  <figcaption>
    Application architecture showing: client applications connect to 
    API gateway, which routes to microservices (Auth, Users, Data), 
    each with dedicated database instances.
  </figcaption>
</figure>
```

### Link Images

Images inside links need descriptive alt text:

```html
✅ Descriptive:
<a href="/products">
  <img src="product.jpg" alt="View all laptop products" />
</a>

❌ Generic:
<a href="/products">
  <img src="product.jpg" alt="Click here" />
</a>
```

## Performance Optimization

### Lazy Loading

Load images only when needed:

```tsx
<AuthorlyRenderer
  html={content}
  lazyLoadImages={true}
  lazyLoadOffset={200}  // Load 200px before entering viewport
/>
```

**Manual lazy loading:**
```html
<img 
  src="image.jpg" 
  loading="lazy"
  decoding="async"
/>
```

### Image Compression

Compress images before upload:

**Tools:**
- **TinyPNG** - Online PNG/JPEG compression
- **ImageOptim** - Mac app for compression
- **Squoosh** - Google's web-based tool
- **Sharp** - Node.js image processing

**Target file sizes:**
- Hero images: < 200KB
- Content images: < 100KB
- Thumbnails: < 30KB

### Responsive Images

Serve appropriate sizes:

```html
<img 
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w,
    image-1600.jpg 1600w
  "
  sizes="
    (max-width: 640px) 400px,
    (max-width: 1024px) 800px,
    (max-width: 1536px) 1200px,
    1600px
  "
  alt="Responsive image example"
/>
```

### Modern Formats

Use WebP or AVIF with fallbacks:

```html
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" />
</picture>
```

## Common Use Cases

### Product Showcase

```markdown
# Our Products

![Premium Laptop](laptop.jpg)
_MacBook Pro 16" - Starting at $2,499_

High-performance laptop for professionals.

![Wireless Mouse](mouse.jpg)
_Ergonomic Mouse - $79_

Designed for all-day comfort.
```

### Tutorial Screenshots

```markdown
## Installation Steps

**Step 1:** Download the installer

![Download button on homepage](step1.png)
_Click the "Download" button in the top-right corner_

**Step 2:** Run the installer

![Installation wizard welcome screen](step2.png)
_Follow the installation wizard steps_
```

### Before/After Comparisons

```markdown
## UI Redesign

**Before:**

![Old dashboard interface](old-ui.png)
_Previous dashboard design from 2020_

**After:**

![New dashboard interface](new-ui.png)
_Redesigned dashboard with improved UX_
```

### Image Galleries

```markdown
## Project Gallery

![Project screenshot 1](gallery1.jpg)
![Project screenshot 2](gallery2.jpg)
![Project screenshot 3](gallery3.jpg)

_Click any image to view full size_
```

### Diagrams and Charts

```markdown
## System Architecture

![System architecture diagram](architecture.svg)

_Figure 1: High-level system architecture showing microservices, 
databases, and communication patterns_

The architecture consists of three main layers...
```

## Troubleshooting

### Image Not Displaying

**Issue:** Image shows broken icon  
**Solutions:**
- Verify URL is correct and accessible
- Check if image file exists
- Confirm image format is supported
- Check browser console for CORS errors

### Image Too Large

**Issue:** Image file size is too big  
**Solutions:**
- Compress image before upload
- Use appropriate format (JPEG for photos)
- Resize image to appropriate dimensions
- Configure smaller max file size limit

### Upload Failing

**Issue:** Image upload returns error  
**Solutions:**
- Check file size limits
- Verify upload handler is configured
- Ensure server accepts file type
- Check network connection

### Image Quality Poor

**Issue:** Image appears blurry or pixelated  
**Solutions:**
- Upload higher resolution image
- Use lossless compression
- Check if image is being downscaled
- Ensure retina displays get 2x images

## Advanced Techniques

### Lightbox/Modal

Add click-to-enlarge functionality:

```tsx
function ImageWithLightbox({ src, alt }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <img 
        src={src} 
        alt={alt}
        onClick={() => setIsOpen(true)}
        style={{ cursor: 'pointer' }}
      />
      {isOpen && (
        <Lightbox
          image={src}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
```

### Image Comparison Slider

Compare before/after images:

```tsx
<ImageCompare
  before="/images/before.jpg"
  after="/images/after.jpg"
  alt="Design comparison"
/>
```

### Image with Annotations

Add interactive annotations:

```tsx
<AnnotatedImage
  src="/diagram.png"
  annotations={[
    { x: 100, y: 50, label: 'API Gateway' },
    { x: 300, y: 150, label: 'Database' },
  ]}
/>
```

### Progressive Image Loading

Show blur-up effect while loading:

```tsx
<ProgressiveImage
  placeholder="/image-tiny.jpg"
  src="/image-full.jpg"
  alt="Description"
/>
```

## Examples

### Documentation Page

```markdown
# Getting Started

Welcome to Authorly! Let's get you up and running.

![Authorly editor interface](editor-screenshot.png)
_The Authorly editor with block menu open_

## Installation

First, install the package:

\`\`\`bash
npm install authorly-editor
\`\`\`

![npm install command in terminal](npm-install.png)
```

### Blog Post

```markdown
# Building a Modern Web App

Recently, I built a new web application using React and TypeScript. 
Here's what I learned.

![Application homepage](homepage.png)
_The finished application homepage_

The project started with a simple idea...

![Initial wireframe sketch](wireframe.jpg)
_Early wireframe sketches on paper_
```

### Case Study

```markdown
# Redesigning the Dashboard

## Challenge

Our old dashboard was cluttered and hard to navigate.

![Old dashboard design](old-dashboard.png)
_Figure 1: Original dashboard (2021)_

## Solution

We redesigned with a focus on clarity and data visualization.

![New dashboard design](new-dashboard.png)
_Figure 2: Redesigned dashboard (2024)_

## Results

User satisfaction increased by 47%.

![User satisfaction chart](satisfaction-chart.png)
_Survey results showing improvement_
```
