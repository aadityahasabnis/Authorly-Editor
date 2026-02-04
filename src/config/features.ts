import {
  FileText,
  Zap,
  Moon,
  Keyboard,
  Code2,
  Palette,
  Package,
  Shield,
  type LucideIcon,
} from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const features: Feature[] = [
  {
    title: 'Pure HTML Output',
    description: 'Get clean, semantic HTML ready to publish anywhere. No proprietary formats or complex serialization.',
    icon: FileText,
  },
  {
    title: 'Lightweight & Fast',
    description: 'Only ~30kb gzipped. No heavy frameworks, no bloat. Just React and essential dependencies.',
    icon: Zap,
  },
  {
    title: 'Dark Mode Ready',
    description: 'Beautiful light and dark themes out of the box. Fully customizable via CSS variables.',
    icon: Moon,
  },
  {
    title: 'Keyboard First',
    description: 'Comprehensive keyboard shortcuts for power users. Type "/" for commands, use markdown-style syntax.',
    icon: Keyboard,
  },
  {
    title: '13+ Block Types',
    description: 'Paragraphs, headings, lists, code blocks, tables, images, videos, callouts, and more.',
    icon: Code2,
  },
  {
    title: 'Fully Customizable',
    description: 'Override styles with CSS variables, register custom blocks, and extend functionality.',
    icon: Palette,
  },
  {
    title: 'TypeScript Native',
    description: 'Written in TypeScript with full type definitions. Great IDE support and autocomplete.',
    icon: Package,
  },
  {
    title: 'XSS Protected',
    description: 'Built-in HTML sanitization protects against XSS attacks when rendering user content.',
    icon: Shield,
  },
];

export interface ComparisonItem {
  feature: string;
  authorly: string | boolean;
  others: string | boolean;
}

export const comparison: ComparisonItem[] = [
  { feature: 'Output Format', authorly: 'Pure HTML', others: 'JSON AST / Custom' },
  { feature: 'Bundle Size', authorly: '~30kb', others: '100kb+' },
  { feature: 'Dependencies', authorly: 'React only', others: 'Heavy frameworks' },
  { feature: 'Learning Curve', authorly: 'Minutes', others: 'Hours/Days' },
  { feature: 'Database Storage', authorly: 'Just HTML string', others: 'Complex serialization' },
  { feature: 'SEO Friendly', authorly: true, others: 'Varies' },
  { feature: 'TypeScript', authorly: true, others: 'Some' },
  { feature: 'Dark Mode', authorly: true, others: 'Some' },
];

export interface BlockType {
  name: string;
  description: string;
  htmlOutput: string;
  shortcut?: string;
}

export const blockTypes: BlockType[] = [
  { name: 'Paragraph', description: 'Basic text', htmlOutput: '<p>', shortcut: 'Enter' },
  { name: 'Heading 1-6', description: 'Section headings', htmlOutput: '<h1> - <h6>', shortcut: 'Ctrl+1-6' },
  { name: 'Bullet List', description: 'Unordered list', htmlOutput: '<ul><li>', shortcut: '/bullet' },
  { name: 'Numbered List', description: 'Ordered list', htmlOutput: '<ol><li>', shortcut: '/number' },
  { name: 'Checklist', description: 'Todo items', htmlOutput: '<ul><li><input>', shortcut: '/check' },
  { name: 'Quote', description: 'Blockquote', htmlOutput: '<blockquote>', shortcut: '/quote' },
  { name: 'Code', description: 'Code block', htmlOutput: '<pre><code>', shortcut: '/code' },
  { name: 'Image', description: 'Image with caption', htmlOutput: '<figure><img>', shortcut: '/image' },
  { name: 'Video', description: 'YouTube/Vimeo/MP4', htmlOutput: '<figure><iframe>', shortcut: '/video' },
  { name: 'Table', description: 'Data table', htmlOutput: '<table>', shortcut: '/table' },
  { name: 'Divider', description: 'Horizontal rule', htmlOutput: '<hr>', shortcut: '/divider' },
  { name: 'Callout', description: 'Info/Warning/Error', htmlOutput: '<aside>', shortcut: '/callout' },
  { name: 'Accordion', description: 'Collapsible section', htmlOutput: '<details>', shortcut: '/accordion' },
];
