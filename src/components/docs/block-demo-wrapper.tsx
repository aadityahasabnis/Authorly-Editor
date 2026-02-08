'use client';

import dynamic from 'next/dynamic';

// Dynamically import BlockDemos to avoid SSR issues
const ParagraphDemo = dynamic(
  () => import('./block-demos').then((mod) => mod.ParagraphDemo),
  { ssr: false, loading: () => <DemoSkeleton /> }
);
const HeadingDemo = dynamic(
  () => import('./block-demos').then((mod) => mod.HeadingDemo),
  { ssr: false, loading: () => <DemoSkeleton /> }
);
const ListDemo = dynamic(
  () => import('./block-demos').then((mod) => mod.ListDemo),
  { ssr: false, loading: () => <DemoSkeleton /> }
);
const CodeDemo = dynamic(
  () => import('./block-demos').then((mod) => mod.CodeDemo),
  { ssr: false, loading: () => <DemoSkeleton /> }
);
const QuoteDemo = dynamic(
  () => import('./block-demos').then((mod) => mod.QuoteDemo),
  { ssr: false, loading: () => <DemoSkeleton /> }
);
const ImageDemo = dynamic(
  () => import('./block-demos').then((mod) => mod.ImageDemo),
  { ssr: false, loading: () => <DemoSkeleton /> }
);
const TableDemo = dynamic(
  () => import('./block-demos').then((mod) => mod.TableDemo),
  { ssr: false, loading: () => <DemoSkeleton /> }
);
const CalloutDemo = dynamic(
  () => import('./block-demos').then((mod) => mod.CalloutDemo),
  { ssr: false, loading: () => <DemoSkeleton /> }
);
const DividerDemo = dynamic(
  () => import('./block-demos').then((mod) => mod.DividerDemo),
  { ssr: false, loading: () => <DemoSkeleton /> }
);
const VideoDemo = dynamic(
  () => import('./block-demos').then((mod) => mod.VideoDemo),
  { ssr: false, loading: () => <DemoSkeleton /> }
);
const AccordionDemo = dynamic(
  () => import('./block-demos').then((mod) => mod.AccordionDemo),
  { ssr: false, loading: () => <DemoSkeleton /> }
);
const LinkPreviewDemo = dynamic(
  () => import('./block-demos').then((mod) => mod.LinkPreviewDemo),
  { ssr: false, loading: () => <DemoSkeleton /> }
);

// Map block slugs to their demo components
const blockDemoMap: Record<string, React.ComponentType> = {
  'blocks/paragraph': ParagraphDemo,
  'blocks/headings': HeadingDemo,
  'blocks/lists': ListDemo,
  'blocks/code': CodeDemo,
  'blocks/quote': QuoteDemo,
  'blocks/image': ImageDemo,
  'blocks/table': TableDemo,
  'blocks/callout': CalloutDemo,
  'blocks/divider': DividerDemo,
  'blocks/video': VideoDemo,
  'blocks/accordion': AccordionDemo,
  'blocks/link-preview': LinkPreviewDemo,
};

function DemoSkeleton() {
  return (
    <div className="my-12 animate-pulse">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-muted"></div>
        <div className="space-y-2">
          <div className="h-6 w-48 bg-muted rounded"></div>
          <div className="h-4 w-64 bg-muted rounded"></div>
        </div>
      </div>
      <div className="rounded-2xl border border-border/50 bg-card/50 h-[400px]"></div>
    </div>
  );
}

interface BlockDemoWrapperProps {
  slug: string;
}

export function BlockDemoWrapper({ slug }: BlockDemoWrapperProps) {
  const DemoComponent = blockDemoMap[slug];
  
  if (!DemoComponent) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-border/50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Interactive Demo</h2>
        <p className="text-muted-foreground">
          Try the editor below to see this block type in action. Switch between Editor, Preview, and HTML views.
        </p>
      </div>
      <DemoComponent />
    </div>
  );
}
