# Changelog

All notable changes to Authorly will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.9] - 2024-02-09

### Added
- **Cloud Image Upload System** - Built-in support for uploading images to Cloudinary, AWS S3, or custom backends
  - `imageUploadConfig` prop for easy configuration
  - `createCloudinaryConfig()` helper for Cloudinary setup
  - `createS3Config()` helper for S3 setup  
  - `createCustomUploadConfig()` for custom upload handlers
  - Progress tracking with visual progress bar during uploads
  - Alt text editor for accessibility
  - Automatic image optimization (Cloudinary)
  - Responsive image generation with `srcset`
- Upload event callbacks: `onUploadStart`, `onUploadSuccess`, `onUploadError`, `onUploadProgress`
- Enhanced `getHTML()` method with options:
  - `stripEditorUI` - Remove editor controls from HTML
  - `stripDataAttributes` - Remove data attributes
  - `optimizeImages` - Auto-optimize Cloudinary URLs
  - `addResponsiveImages` - Generate srcset for responsive images
- Upload UI states:
  - Loading spinner with progress indicator
  - Error state with retry button
  - Alt text input field
- Helper functions: `optimizeCloudinaryUrl()`, `generateCloudinarySrcset()`, `generateS3Url()`, `generateCloudFrontUrl()`

### Changed
- Image block now supports cloud uploads instead of only base64
- Image dimensions (width, height) stored as data attributes
- Improved image upload UX with visual feedback
- Enhanced error handling for upload failures

### Fixed
- CSS architecture cleaned in test-authorly-next (removed prose utilities interference)
- Editor CSS now fully self-contained
- Preview rendering no longer affected by global CSS

## [0.1.8] - 2024-01-15

### Added
- Excalidraw block for drawing diagrams and sketches
- Link preview block with Open Graph support
- Date picker block with calendar UI
- Accordion block for collapsible content
- Table of Contents component with auto-scrolling
- Enhanced theming support with CSS custom properties
- Dark mode support with `.cb-dark` class

### Changed
- Improved toolbar organization and UX
- Enhanced block menu with better search
- Optimized rendering performance
- Updated TypeScript types for better type safety

### Fixed
- Cursor position issues in tables
- List indentation edge cases
- Image upload progress tracking
- Code block language selector bugs

## [0.1.7] - 2023-12-20

### Added
- Table block with full editing capabilities
- Row and column manipulation
- Cell alignment options
- Table context menu

### Changed
- Improved list handling (bullet, numbered, checklist)
- Enhanced keyboard navigation
- Better mobile responsiveness

### Fixed
- Nested list rendering issues
- Backspace behavior in empty blocks
- Selection toolbar positioning

## [0.1.6] - 2023-12-01

### Added
- Callout block with 5 types (info, warning, error, success, note)
- Image caption support
- Video embed support (YouTube, Vimeo, direct URLs)
- Divider block with style options

### Changed
- Refactored block system for better extensibility
- Improved CSS architecture
- Enhanced accessibility (ARIA labels, keyboard navigation)

### Fixed
- Focus management issues
- Undo/redo edge cases
- Paste behavior with formatted content

## [0.1.5] - 2023-11-15

### Added
- Code block with syntax highlighting support
- Language selector for code blocks
- Quote block with optional citation
- Block duplication (Ctrl+D)

### Changed
- Improved markdown shortcuts
- Enhanced inline formatting
- Better paste handling

### Fixed
- Line break issues in paragraphs
- Bold/italic toggle bugs
- Link editing edge cases

## [0.1.4] - 2023-11-01

### Added
- Slash command menu for quick block insertion
- Heading blocks (H1-H6)
- List blocks (bullet, numbered, checklist)
- Image upload support

### Changed
- Redesigned toolbar with better icons
- Improved block selection UX
- Enhanced mobile experience

### Fixed
- Toolbar button states
- Block deletion edge cases
- Image alignment issues

## [0.1.3] - 2023-10-15

### Added
- ContentBlocksRenderer component for displaying content
- Basic toolbar with text formatting
- Inline formatting (bold, italic, underline, strikethrough, code)
- Link support

### Changed
- Simplified API surface
- Improved documentation
- Better TypeScript support

### Fixed
- Selection toolbar positioning
- Content change detection
- Export/import HTML issues

## [0.1.2] - 2023-10-01

### Added
- Basic block system (paragraph, heading)
- Contenteditable editing
- onChange callback
- Basic styling

### Changed
- Refactored component structure
- Improved performance

### Fixed
- Initial render bugs
- State management issues

## [0.1.1] - 2023-09-20

### Added
- Initial ContentBlocksEditor component
- Basic editing capabilities
- HTML output

### Fixed
- Build configuration issues
- Type exports

## [0.1.0] - 2023-09-15

### Added
- Initial release
- Core editor functionality
- Basic block types
- TypeScript support
- React 17+ compatibility

---

## Release Types

### Added
New features or capabilities added to the project.

### Changed
Changes to existing functionality.

### Deprecated
Features that will be removed in upcoming releases.

### Removed
Features that have been removed.

### Fixed
Bug fixes.

### Security
Security vulnerability fixes.

---

## Versioning

Authorly follows [Semantic Versioning](https://semver.org/):

- **MAJOR version (X.0.0)**: Incompatible API changes
- **MINOR version (0.X.0)**: New functionality, backwards compatible
- **PATCH version (0.0.X)**: Bug fixes, backwards compatible

---

## Upgrade Guides

### Upgrading from 0.1.7 to 0.1.8

**New Features:**
- Excalidraw, link preview, date, and accordion blocks
- Table of Contents component

**Breaking Changes:**
- None

**Migration Steps:**
1. Update package: `npm install authorly-editor@latest`
2. No code changes required

### Upgrading from 0.1.6 to 0.1.7

**New Features:**
- Full table support

**Breaking Changes:**
- None

**Migration Steps:**
1. Update package: `npm install authorly-editor@latest`
2. Import table utilities if needed: `import { tableBlock } from 'authorly-editor'`

### Upgrading from 0.1.5 to 0.1.6

**New Features:**
- Callout, video, and divider blocks
- Image captions

**Breaking Changes:**
- None

**Migration Steps:**
1. Update package: `npm install authorly-editor@latest`
2. Update styles import if using custom themes

---

## Support

- **Documentation**: [https://authorly-docs.vercel.app](https://authorly-docs.vercel.app)
- **Issues**: [GitHub Issues](https://github.com/aadityahasabnis/Authorly/issues)
- **Discussions**: [GitHub Discussions](https://github.com/aadityahasabnis/Authorly/discussions)

---

## Contributing

See [Contributing Guide](./contributing) for information on how to contribute to Authorly.

---

## License

Authorly is [MIT licensed](https://opensource.org/licenses/MIT).
