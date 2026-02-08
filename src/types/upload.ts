// Upload types for image upload feature
// These will be available in authorly-editor@0.1.9+

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  folder?: string;
  tags?: string[];
}

export interface S3Config {
  bucket: string;
  region: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  endpoint?: string;
}

export interface UploadConfig {
  provider: 'cloudinary' | 's3' | 'custom';
  cloudinary?: CloudinaryConfig;
  s3?: S3Config;
  maxSizeBytes?: number;
  allowedTypes?: string[];
  autoOptimize?: boolean;
  generateResponsive?: boolean;
  customUploader?: (file: File) => Promise<UploadResult>;
}

export interface UploadResult {
  url: string;
  publicId?: string;
  width?: number;
  height?: number;
  format?: string;
  size?: number;
  thumbnailUrl?: string;
  responsive?: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percent: number;
}

export interface UploadError {
  message: string;
  code?: string;
  details?: unknown;
}
