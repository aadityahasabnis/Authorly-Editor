# Roadmap

This roadmap outlines the planned features and improvements for Authorly. The timeline and priorities may change based on community feedback and contributions.

## Current Version: 0.1.8

**Status**: Stable, production-ready for most use cases

**Focus**: Core editing experience, block types, and extensibility

---

## Short Term (Next 3 Months)

### Performance Improvements

- [ ] **Virtual Scrolling** for large documents (1000+ blocks)
- [ ] **Lazy Loading** for heavy blocks (Excalidraw, tables)
- [ ] **Debounced Rendering** for real-time collaboration
- [ ] **Memory Optimization** for undo/redo history
- [ ] **Bundle Size Reduction** (tree-shaking improvements)

### Mobile Experience

- [ ] **Touch Gestures** for block manipulation
- [ ] **Mobile Toolbar** optimized for small screens
- [ ] **Swipe Actions** for quick formatting
- [ ] **Better Virtual Keyboard** handling
- [ ] **Pinch to Zoom** for images and tables

### Accessibility

- [ ] **Screen Reader** improvements
- [ ] **Keyboard Navigation** enhancements
- [ ] **High Contrast Mode** support
- [ ] **Focus Indicators** refinement
- [ ] **ARIA Labels** completion

---

## Medium Term (3-6 Months)

### Collaborative Editing

- [ ] **Real-time Collaboration** (WebSocket or WebRTC)
- [ ] **Cursor Presence** indicators
- [ ] **Conflict Resolution** algorithms
- [ ] **User Annotations** and comments
- [ ] **Change Tracking** and history

### Advanced Block Types

- [ ] **Math Equations** (KaTeX/MathJax integration)
- [ ] **Mermaid Diagrams** (flowcharts, sequence diagrams)
- [ ] **Code Playground** (embedded CodeSandbox/StackBlitz)
- [ ] **Audio Player** block
- [ ] **File Attachment** block
- [ ] **Chart/Graph** block
- [ ] **Social Media Embeds** (Twitter, Instagram, etc.)
- [ ] **Map Integration** (Google Maps, OpenStreetMap)

### Content Management

- [ ] **Templates** system
- [ ] **Snippets** library
- [ ] **Content Blocks Library** (reusable components)
- [ ] **Version History** UI
- [ ] **Auto-save** with conflict detection
- [ ] **Export Formats** (Markdown, PDF, Word)

### Developer Experience

- [ ] **Plugin System** for custom blocks and extensions
- [ ] **Event Hooks** (beforeChange, afterChange, etc.)
- [ ] **Custom Toolbar** API
- [ ] **Block Validation** system
- [ ] **Developer Tools** (debug mode, performance monitor)

---

## Long Term (6-12 Months)

### AI Integration

- [ ] **AI Writing Assistant** (grammar, style suggestions)
- [ ] **Content Generation** (autocomplete, templates)
- [ ] **Smart Formatting** suggestions
- [ ] **Image Generation** (DALL-E, Stable Diffusion)
- [ ] **Translation** support

### Advanced Features

- [ ] **Multi-column Layouts**
- [ ] **Drag-and-Drop Builder** mode
- [ ] **Page Breaks** for print
- [ ] **Footnotes and Endnotes**
- [ ] **Bibliography Management**
- [ ] **Cross-references**
- [ ] **Conditional Content** (show/hide based on rules)

### Integrations

- [ ] **CMS Adapters** (WordPress, Contentful, Sanity)
- [ ] **Storage Providers** (AWS S3, Cloudinary, Supabase)
- [ ] **Analytics Integration** (track engagement)
- [ ] **Search Integration** (Algolia, Elasticsearch)
- [ ] **SEO Tools** (meta tags, structured data)

### Extensibility

- [ ] **Marketplace** for community blocks and plugins
- [ ] **Theme Gallery** for visual customization
- [ ] **Block SDK** for easier block development
- [ ] **Migration Tools** (from other editors)

---

## Community Requested Features

Based on GitHub issues and discussions:

### High Priority

- [ ] **Markdown Import/Export** (#45) - 👍 23
- [ ] **Table of Contents Auto-generation** (#52) - ✅ COMPLETED in v0.1.8
- [ ] **Code Block Line Numbers** (#38) - 👍 18
- [ ] **Image Optimization** (auto-resize, format conversion) - 👍 15
- [ ] **Spell Check Integration** (#61) - 👍 12

### Medium Priority

- [ ] **Custom Keyboard Shortcuts** (#29) - 👍 8
- [ ] **Read-only Mode** (#34) - 👍 7
- [ ] **Print Optimization** (#41) - 👍 6
- [ ] **RTL Support** (Right-to-Left languages) - 👍 5
- [ ] **Multi-language UI** (#55) - 👍 4

### Under Consideration

- [ ] **Notion-style Databases** - Under evaluation
- [ ] **Whiteboard Mode** - Researching feasibility
- [ ] **Voice Input** - Exploring options
- [ ] **Offline Support** (PWA) - Planning phase

---

## Research & Experiments

Features being researched or prototyped:

### Active Research

- **Block Relationships** - Linking blocks together
- **Smart Lists** - Auto-formatting and organization
- **Content Recommendations** - Suggest related blocks
- **Performance Benchmarks** - Automated testing suite

### Experimental Features

- **Canvas Mode** - Free-form block positioning
- **Timeline View** - Chronological content organization
- **Mind Map Mode** - Visual thought organization
- **Focus Mode** - Distraction-free writing

---

## Breaking Changes (Future Majors)

### Version 1.0.0 (Target: Q3 2024)

**Goals**: Production-ready, stable API

**Potential Breaking Changes**:
- Finalize public API surface
- Standardize event callback signatures
- Refine TypeScript types
- Simplify configuration options

**Migration Guide**: Will be provided

### Version 2.0.0 (Target: Q1 2025)

**Goals**: Advanced features, plugin ecosystem

**Potential Breaking Changes**:
- Plugin system architecture
- Block definition format changes
- Theme system overhaul

---

## How to Influence the Roadmap

We welcome community input! Here's how you can help shape Authorly's future:

### Vote on Features

- 👍 React to issues with thumbs up
- Comment with your use case
- Share implementation ideas

### Contribute

- Submit pull requests
- Create plugins and share them
- Write documentation
- Report bugs

### Sponsor

- Support development financially
- Commission specific features
- Sponsor maintenance work

### Discuss

- Join GitHub Discussions
- Share your use cases
- Suggest new features
- Provide feedback

---

## Release Schedule

### Patch Releases (0.1.x)

**Frequency**: Every 2-4 weeks

**Contents**:
- Bug fixes
- Minor improvements
- Documentation updates

### Minor Releases (0.x.0)

**Frequency**: Every 2-3 months

**Contents**:
- New features
- New block types
- Non-breaking changes
- Performance improvements

### Major Releases (x.0.0)

**Frequency**: As needed (planned for Q3 2024)

**Contents**:
- Breaking changes
- Major architectural changes
- API redesigns

---

## Progress Tracking

Track progress in real-time:

- **GitHub Projects**: [Authorly Roadmap Board](https://github.com/aadityahasabnis/Authorly/projects)
- **GitHub Milestones**: [Version Milestones](https://github.com/aadityahasabnis/Authorly/milestones)
- **GitHub Issues**: [Feature Requests](https://github.com/aadityahasabnis/Authorly/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

---

## Versioning Philosophy

We follow [Semantic Versioning](https://semver.org/):

- **Backwards Compatibility**: Maintained within major versions
- **Deprecation Warnings**: Added one minor version before removal
- **Migration Guides**: Provided for all breaking changes
- **LTS Support**: Coming with v1.0.0

---

## Contributing to the Roadmap

Want to help implement these features?

1. **Check** the [Contributing Guide](./contributing)
2. **Pick** an item from the roadmap
3. **Discuss** in a GitHub issue first
4. **Submit** a pull request
5. **Celebrate** when it ships!

---

## Stay Updated

- **GitHub Releases**: [Release Notes](https://github.com/aadityahasabnis/Authorly/releases)
- **Changelog**: [Version History](./changelog)
- **Twitter**: Follow [@aadityahasabnis](https://twitter.com/aadityahasabnis) (if available)

---

**Last Updated**: January 2024

**Note**: This roadmap is subject to change based on priorities, community feedback, and available resources. Features may be added, removed, or rescheduled.
