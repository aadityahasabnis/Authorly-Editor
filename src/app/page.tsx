'use client';

import { SiteHeader, SiteFooter } from '@/components/layout';
import {
  HeroSection,
  EditorDemoSection,
  FeaturesSection,
  ComparisonSection,
  CodeExampleSection,
  CTASection,
} from '@/components/marketing';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
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
