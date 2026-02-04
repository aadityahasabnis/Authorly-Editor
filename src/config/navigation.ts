export interface NavItem {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    title: 'Docs',
    href: '/docs',
  },
  {
    title: 'Playground',
    href: '/playground',
  },
  {
    title: 'Examples',
    href: '/examples',
  },
  {
    title: 'GitHub',
    href: 'https://github.com/aadityahasabnis/Authorly',
    external: true,
  },
];

export const docsNav: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/quick-start' },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Editor', href: '/docs/components/editor' },
      { title: 'Renderer', href: '/docs/components/renderer' },
      { title: 'Table of Contents', href: '/docs/components/toc' },
      { title: 'Toolbar', href: '/docs/components/toolbar' },
    ],
  },
  {
    title: 'Blocks',
    items: [
      { title: 'Overview', href: '/docs/blocks' },
      { title: 'Paragraph', href: '/docs/blocks/paragraph' },
      { title: 'Headings', href: '/docs/blocks/headings' },
      { title: 'Lists', href: '/docs/blocks/lists' },
      { title: 'Code Block', href: '/docs/blocks/code' },
      { title: 'Blockquote', href: '/docs/blocks/quote' },
      { title: 'Image', href: '/docs/blocks/image' },
      { title: 'Table', href: '/docs/blocks/table' },
      { title: 'Callout', href: '/docs/blocks/callout' },
      { title: 'Divider', href: '/docs/blocks/divider' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Editor Props', href: '/docs/api/editor-props' },
      { title: 'Editor Ref', href: '/docs/api/editor-ref' },
      { title: 'Renderer Props', href: '/docs/api/renderer-props' },
      { title: 'Events', href: '/docs/api/events' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'Styling & Theming', href: '/docs/guides/styling' },
      { title: 'Custom Blocks', href: '/docs/guides/custom-blocks' },
      { title: 'Next.js Integration', href: '/docs/guides/nextjs' },
      { title: 'Image Uploads', href: '/docs/guides/image-uploads' },
      { title: 'Keyboard Shortcuts', href: '/docs/guides/shortcuts' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { title: 'Contributing', href: '/docs/contributing' },
      { title: 'Changelog', href: '/docs/changelog' },
      { title: 'Roadmap', href: '/docs/roadmap' },
    ],
  },
];
