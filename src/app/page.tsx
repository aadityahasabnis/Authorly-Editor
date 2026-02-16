'use client';

import { SiteHeader, SiteFooter } from '@/components/layout';
import {
  HeroSection,
  EditorDemoSection,
  FeaturesSection,
  CodeExampleSection,
  ComparisonSection,
  CTASection,
} from '@/components/marketing';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        <HeroSection />
        <EditorDemoSection />
        <FeaturesSection />
        <CodeExampleSection />
        <ComparisonSection />
        <CTASection />
      </main>

      <SiteFooter />
    </div>
  );
}
