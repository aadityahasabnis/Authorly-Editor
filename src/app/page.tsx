'use client';

import { useState, useEffect } from 'react';
import {
  Header,
  Footer,
  HeroSection,
  EditorDemoSection,
  FeaturesSection,
  ComparisonSection,
  CodeExampleSection,
  CTASection,
} from '@/components/marketing';

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-theme">
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
      <main>
        <HeroSection />
        <EditorDemoSection />
        <FeaturesSection />
        <CodeExampleSection />
        <ComparisonSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
