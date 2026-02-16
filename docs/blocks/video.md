# Video

Embed videos from popular platforms or host your own. Video blocks make it easy to add rich media content to enhance your documentation, tutorials, and articles.

## Overview

Video blocks support:

- **YouTube** - Embed YouTube videos
- **Vimeo** - Embed Vimeo videos  
- **Self-hosted** - MP4, WebM video files
- **Responsive** - Auto-sizing for all devices
- **Controls** - Play, pause, volume, fullscreen
- **Thumbnails** - Custom preview images

## Creating Video Blocks

### Using Slash Command

Type `/video`:

```
/video
```

Then paste the video URL or upload a file.

### Paste URL

Simply paste a video URL and it converts automatically:

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://vimeo.com/123456789
```

### Via Toolbar

1. Click "Video" in toolbar
2. Paste URL or upload file
3. Video embeds automatically

## Supported Platforms

### YouTube

Paste any YouTube URL format:

```
https://www.youtube.com/watch?v=VIDEO_ID
https://youtu.be/VIDEO_ID
https://www.youtube.com/embed/VIDEO_ID
```

**Features:**
- HD playback
- Subtitles/captions
- Playback speed control
- YouTube player controls

### Vimeo

Paste Vimeo URLs:

```
https://vimeo.com/VIDEO_ID
https://player.vimeo.com/video/VIDEO_ID
```

**Features:**
- High-quality streaming
- Privacy controls
- Custom colors
- Vimeo player controls

### Self-Hosted

Upload video files directly:

**Supported formats:**
- MP4 (H.264)
- WebM
- OGG

**Best practices:**
- Compress videos before upload
- Use MP4 for compatibility
- Provide WebM as fallback
- Maximum 100MB file size

## Video Options

### Autoplay

Start playing automatically (muted):

```tsx
<video autoplay muted>
  <source src="video.mp4" />
</video>
```

### Loop

Repeat video continuously:

```tsx
<video loop>
  <source src="video.mp4" />
</video>
```

### Controls

Show/hide player controls:

```tsx
<video controls>
  <source src="video.mp4" />
</video>
```

### Custom Thumbnail

Set preview image:

```tsx
<video poster="thumbnail.jpg">
  <source src="video.mp4" />
</video>
```

## HTML Output

### YouTube Embed

**Input:**
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

**Output:**
```html
<div class="video-wrapper">
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
```

### Self-Hosted Video

**Output:**
```html
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  Your browser doesn't support video playback.
</video>
```

## Styling Videos

### Responsive Container

```css
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  margin: 2rem 0;
  border-radius: 0.75rem;
}

.video-wrapper iframe,
.video-wrapper video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

### Custom Player Styles

```css
video {
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

video::-webkit-media-controls {
  /* Custom controls styling */
}
```

## Best Practices

### Optimize File Size

```
❌ Large files:
- 4K resolution (unnecessary for web)
- Uncompressed video
- High bitrate

✅ Optimized:
- 1080p max for web
- H.264 codec
- Appropriate bitrate (2-5 Mbps)
```

### Provide Captions

```html
<video controls>
  <source src="video.mp4" />
  <track kind="subtitles" src="captions-en.vtt" srclang="en" label="English" />
  <track kind="subtitles" src="captions-es.vtt" srclang="es" label="Español" />
</video>
```

### Use Appropriate Hosting

```
✅ Small clips (<10MB): Self-host
✅ Tutorials/demos: YouTube (free, unlimited)
✅ Professional content: Vimeo (high quality)
✅ Large library: CDN + video hosting service
```

## Common Use Cases

### Product Demo

```markdown
## See It In Action

Watch this 2-minute demo to see how easy it is to get started:

[YouTube video embed]

**Key features shown:**
- Intuitive block menu
- Drag and drop interface
- Real-time collaboration
```

### Tutorial Video

```markdown
## Video Tutorial

Follow along with this step-by-step tutorial:

[YouTube video embed]

**What you'll learn:**
1. Project setup (0:00)
2. Creating components (2:15)
3. Styling (5:30)
4. Deployment (8:45)
```

### Background Video

```markdown
# Welcome

[Auto-playing background video loop]

A modern text editor for the web.
```

## Accessibility

### Provide Captions

Always include captions:

```html
<video controls>
  <track kind="captions" src="captions.vtt" srclang="en" default />
</video>
```

### Keyboard Controls

Ensure keyboard accessibility:
- Space: Play/pause
- Arrow keys: Seek
- M: Mute/unmute
- F: Fullscreen

### Transcript

Provide text alternative:

```markdown
## Tutorial Video

[Video embed]

**Transcript:**
Hello! In this tutorial, we'll learn...
```

## Performance

### Lazy Loading

```tsx
<AuthorlyRenderer
  html={content}
  lazyLoadVideos={true}
/>
```

### Poster Images

Reduce initial load:

```html
<video poster="preview.jpg" preload="none">
  <source src="video.mp4" />
</video>
```
