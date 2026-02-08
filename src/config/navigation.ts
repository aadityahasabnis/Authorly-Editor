export interface NavItem {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
  badge?: string;
}

export interface NavSection {
  title: string;
  href?: string; // Make sections clickable
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
    href: '/docs/components', // Clickable section
    items: [
      { title: 'Editor', href: '/docs/components/editor' },
      { title: 'Renderer', href: '/docs/components/renderer' },
      { title: 'Table of Contents', href: '/docs/components/table-of-contents' },
      { title: 'Toolbar', href: '/docs/components/toolbar' },
      { title: 'Block Menu', href: '/docs/components/block-menu' },
      { title: 'Theming', href: '/docs/components/theming' },
    ],
  },
  {
    title: 'Blocks',
    href: '/docs/blocks', // Clickable section
    items: [
      { title: 'Paragraph', href: '/docs/blocks/paragraph' },
      { title: 'Headings', href: '/docs/blocks/headings' },
      { title: 'Lists', href: '/docs/blocks/lists' },
      { title: 'Code Block', href: '/docs/blocks/code' },
      { title: 'Blockquote', href: '/docs/blocks/quote' },
      { title: 'Image', href: '/docs/blocks/image' },
      { title: 'Video', href: '/docs/blocks/video', badge: 'New' },
      { title: 'Table', href: '/docs/blocks/table' },
      { title: 'Callout', href: '/docs/blocks/callout' },
      { title: 'Accordion', href: '/docs/blocks/accordion', badge: 'New' },
      { title: 'Link Preview', href: '/docs/blocks/link-preview', badge: 'New' },
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
