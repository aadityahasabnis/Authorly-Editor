export const siteConfig = {
  name: 'Authorly',
  description: 'A rich text editor for authors, blogs, and documentation. Clean, publish-ready HTML output with zero bloat.',
  tagline: 'Rich Text Editor for Blogs & Publishing',
  url: 'https://authorly.dev',
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com/aadityahasabnis/Authorly',
    npm: 'https://www.npmjs.com/package/authorly-editor',
    twitter: 'https://twitter.com/authorlyeditor',
  },
  creator: 'Aaditya Hasabnis',
  keywords: [
    'rich text editor',
    'react editor',
    'wysiwyg',
    'blog editor',
    'content editor',
    'html editor',
    'publishing',
    'documentation',
  ],
};

export type SiteConfig = typeof siteConfig;
