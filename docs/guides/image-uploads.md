# Image Upload Integration

Complete guide for integrating image uploads with Authorly, including Cloudinary, AWS S3, and custom upload handlers.

## Overview

Authorly supports flexible image upload integration through the `imageUploadConfig` prop. You can:

- **Cloudinary** - Direct client-side uploads with automatic optimization
- **AWS S3** - Upload to your S3 bucket with presigned URLs
- **Custom Handler** - Integrate with any backend or service

## Quick Start

### Basic Custom Upload

```tsx
import { ContentBlocksEditor } from 'authorly-editor';
import 'authorly-editor/dist/style.css';

function Editor() {
  const uploadHandler = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    return {
      url: data.url,
      width: data.width,
      height: data.height,
      format: data.format,
      size: file.size,
    };
  };

  return (
    <ContentBlocksEditor
      imageUploadConfig={{
        provider: 'custom',
        customUpload: uploadHandler,
        maxSizeBytes: 10 * 1024 * 1024, // 10MB
      }}
    />
  );
}
```

## Cloudinary Integration

### Setup

1. **Create Cloudinary Account**: https://cloudinary.com
2. **Get Credentials**: Go to Dashboard → Settings → Upload
3. **Create Upload Preset**: Settings → Upload → Add upload preset (unsigned)

### Basic Configuration

```tsx
import { ContentBlocksEditor } from 'authorly-editor';
import { createCloudinaryConfig } from 'authorly-editor';

function Editor() {
  const uploadConfig = createCloudinaryConfig({
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  });

  return <ContentBlocksEditor imageUploadConfig={uploadConfig} />;
}
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-preset
```

### Advanced Configuration

```tsx
import { createCloudinaryConfig } from 'authorly-editor';

const uploadConfig = createCloudinaryConfig({
  cloudName: 'your-cloud-name',
  uploadPreset: 'your-preset',
  folder: 'blog-images',          // Organize uploads
  tags: ['blog', 'content'],      // Tag images
  maxSizeMB: 5,                   // 5MB limit
  autoOptimize: true,             // Auto-optimize images
});
```

### Features

- ✅ **Automatic Optimization** - Images optimized on upload
- ✅ **Responsive Images** - Generate multiple sizes
- ✅ **CDN Delivery** - Fast global delivery
- ✅ **Transformations** - Resize, crop, effects
- ✅ **Format Conversion** - Auto WebP/AVIF

### Manual Configuration

```tsx
<ContentBlocksEditor
  imageUploadConfig={{
    provider: 'cloudinary',
    cloudinary: {
      cloudName: 'your-cloud-name',
      uploadPreset: 'your-preset',
      folder: 'uploads',
      tags: ['editor'],
    },
    maxSizeBytes: 10 * 1024 * 1024,
    autoOptimize: true,
    generateResponsive: true,
  }}
/>
```

## AWS S3 Integration

### Setup

1. **Create S3 Bucket**: AWS Console → S3 → Create bucket
2. **Configure CORS**: Enable cross-origin requests
3. **Create IAM User**: With S3 upload permissions
4. **Get Credentials**: Access key ID and secret access key

### CORS Configuration

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
    "ExposeHeaders": ["ETag"]
  }
]
```

### Basic Configuration

```tsx
import { createS3Config } from 'authorly-editor';

const uploadConfig = createS3Config({
  region: process.env.AWS_REGION!,
  bucket: process.env.AWS_BUCKET!,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});
```

### Environment Variables

```bash
# .env.local
AWS_REGION=us-east-1
AWS_BUCKET=my-images-bucket
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
```

### Advanced Configuration

```tsx
const uploadConfig = createS3Config({
  region: 'us-east-1',
  bucket: 'my-bucket',
  accessKeyId: 'AKIA...',
  secretAccessKey: '...',
  prefix: 'blog/images/',        // Folder prefix
  acl: 'public-read',            // Make public
  maxSizeMB: 10,
});
```

### Security Warning

⚠️ **Never expose AWS credentials in client-side code!**

Use a backend API to generate presigned URLs:

```tsx
// Recommended: Use presigned URLs
const uploadConfig = {
  provider: 'custom',
  customUpload: async (file) => {
    // 1. Get presigned URL from your API
    const { url, fields } = await fetch('/api/s3/presigned-url', {
      method: 'POST',
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    }).then(r => r.json());
    
    // 2. Upload directly to S3
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append('file', file);
    
    await fetch(url, {
      method: 'POST',
      body: formData,
    });
    
    // 3. Return public URL
    return {
      url: `${url}/${fields.key}`,
      width: 0, // Get from image metadata
      height: 0,
      format: file.type.split('/')[1],
      size: file.size,
    };
  },
};
```

## Custom Upload Handler

### Basic Handler

```tsx
import { createCustomUploadConfig } from 'authorly-editor';

const uploadConfig = createCustomUploadConfig(
  async (file, onProgress) => {
    // Your custom upload logic
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    const data = await response.json();
    
    return {
      url: data.url,
      width: data.width,
      height: data.height,
      format: data.format,
      size: file.size,
    };
  },
  {
    maxSizeMB: 10,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  }
);
```

### With Progress Tracking

```tsx
const uploadConfig = createCustomUploadConfig(
  async (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      // Track progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          onProgress({
            percent: (e.loaded / e.total) * 100,
            loaded: e.loaded,
            total: e.total,
            speed: 0, // Calculate if needed
          });
        }
      });
      
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve({
            url: data.url,
            width: data.width,
            height: data.height,
            format: data.format,
            size: file.size,
          });
        } else {
          reject(new Error('Upload failed'));
        }
      });
      
      xhr.addEventListener('error', () => {
        reject(new Error('Network error'));
      });
      
      const formData = new FormData();
      formData.append('file', file);
      
      xhr.open('POST', '/api/upload');
      xhr.send(formData);
    });
  }
);
```

### With Image Optimization

```tsx
const uploadConfig = createCustomUploadConfig(async (file) => {
  // 1. Optimize image client-side (optional)
  const optimized = await optimizeImage(file);
  
  // 2. Upload optimized image
  const formData = new FormData();
  formData.append('file', optimized);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  
  const data = await response.json();
  
  return {
    url: data.url,
    width: data.width,
    height: data.height,
    format: data.format,
    size: optimized.size,
  };
});

// Helper: Client-side image optimization
async function optimizeImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        
        // Resize if too large
        const maxWidth = 1920;
        const maxHeight = 1080;
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            resolve(new File([blob!], file.name, { type: 'image/jpeg' }));
          },
          'image/jpeg',
          0.85 // Quality
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
```

## Backend Examples

### Next.js API Route

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }
    
    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 });
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Get image metadata
    const metadata = await sharp(buffer).metadata();
    
    // Optimize image
    const optimized = await sharp(buffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();
    
    // Save to public directory
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    const filepath = path.join(process.cwd(), 'public/uploads', filename);
    
    await writeFile(filepath, optimized);
    
    return NextResponse.json({
      url: `/uploads/${filename}`,
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: metadata.format || 'jpeg',
      size: optimized.length,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
```

### Express.js API

```typescript
// server.js
import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';

const app = express();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }
    
    const metadata = await sharp(req.file.buffer).metadata();
    
    const optimized = await sharp(req.file.buffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();
    
    const filename = `${Date.now()}-${req.file.originalname}`;
    const filepath = path.join(__dirname, 'public/uploads', filename);
    
    await fs.promises.writeFile(filepath, optimized);
    
    res.json({
      url: `/uploads/${filename}`,
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: metadata.format || 'jpeg',
      size: optimized.length,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.listen(3000);
```

## Upload Configuration Reference

### UploadConfig Interface

```typescript
interface UploadConfig {
  provider: 'cloudinary' | 's3' | 'custom';
  cloudinary?: CloudinaryConfig;
  s3?: S3Config;
  customUpload?: CustomUploadFunction;
  maxSizeBytes?: number;
  allowedTypes?: string[];
  autoOptimize?: boolean;
  generateResponsive?: boolean;
}
```

### UploadResult Interface

```typescript
interface UploadResult {
  url: string;              // Required: Public URL
  width: number;            // Required: Image width
  height: number;           // Required: Image height
  format: string;           // Required: Image format
  size: number;             // Required: File size in bytes
  publicId?: string;        // Optional: Provider ID
  thumbnailUrl?: string;    // Optional: Thumbnail URL
}
```

### UploadProgress Interface

```typescript
interface UploadProgress {
  percent: number;          // 0-100
  loaded: number;           // Bytes uploaded
  total: number;            // Total bytes
  speed?: number;           // Bytes/second
}
```

## Error Handling

### Upload Errors

```tsx
const uploadConfig = createCustomUploadConfig(
  async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Upload error:', error);
      throw error; // Authorly will display error to user
    }
  }
);
```

### Client-Side Validation

```tsx
const uploadConfig = {
  provider: 'custom',
  customUpload: async (file) => {
    // Validate file size
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error('File size exceeds 10MB');
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Use JPEG, PNG, or WebP');
    }
    
    // Proceed with upload
    // ...
  },
  maxSizeBytes: 10 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
};
```

## Best Practices

### 1. Use CDN for Production

```tsx
// Good: Use CDN
const uploadConfig = createCloudinaryConfig({
  cloudName: 'your-cloud',
  uploadPreset: 'preset',
});

// Avoid: Self-hosting without CDN
```

### 2. Optimize Images

```typescript
// Good: Optimize before upload
const optimized = await sharp(buffer)
  .resize(1920, 1080, { fit: 'inside' })
  .jpeg({ quality: 85 })
  .toBuffer();

// Avoid: Storing original large files
```

### 3. Secure Upload Endpoints

```typescript
// Good: Validate and sanitize
export async function POST(request: NextRequest) {
  // Check authentication
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Validate file type and size
  // ...
}
```

### 4. Handle Upload Progress

```tsx
const [progress, setProgress] = useState(0);

const uploadConfig = createCustomUploadConfig(
  async (file, onProgress) => {
    // Track progress
    // ...
  }
);
```

### 5. Provide User Feedback

The editor automatically shows upload progress and errors, but you can customize:

```tsx
<ContentBlocksEditor
  imageUploadConfig={uploadConfig}
  onError={(error) => {
    // Custom error handling
    console.error('Upload error:', error);
    alert(`Upload failed: ${error.message}`);
  }}
/>
```

## Testing

### Mock Upload Handler

```tsx
// For testing/development
const mockUploadConfig = createCustomUploadConfig(
  async (file) => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock URL
    return {
      url: URL.createObjectURL(file),
      width: 1920,
      height: 1080,
      format: 'jpeg',
      size: file.size,
    };
  }
);
```

## Related Documentation

- [Editor Props](../api/editor-props) - imageUploadConfig prop reference
- [Image Block](../blocks/image) - Image block documentation
- [Next.js Integration](./nextjs) - Next.js-specific examples
- [Quick Start](../quick-start) - Getting started guide
