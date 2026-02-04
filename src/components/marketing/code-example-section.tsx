'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Terminal, Sparkles, Zap, FileCode } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';

const codeExamples = {
  basic: `import { ContentBlocksEditor } from 'authorly-editor';
import 'authorly-editor/styles';

function App() {
  const [content, setContent] = useState('');

  return (
    <ContentBlocksEditor
      initialContent={content}
      onChange={setContent}
      placeholder="Start writing..."
    />
  );
}`,
  preview: `import { 
  ContentBlocksEditor,
  ContentBlocksRenderer 
} from 'authorly-editor';

function BlogEditor() {
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);

  return (
    <div>
      <button onClick={() => setPreview(!preview)}>
        {preview ? 'Edit' : 'Preview'}
      </button>
      
      {preview ? (
        <ContentBlocksRenderer html={content} />
      ) : (
        <ContentBlocksEditor
          initialContent={content}
          onChange={setContent}
        />
      )}
    </div>
  );
}`,
  toc: `import { 
  ContentBlocksRenderer,
  TableOfContents 
} from 'authorly-editor';

function DocsPage({ content }) {
  return (
    <div className="flex gap-8">
      <aside className="w-64 sticky top-0">
        <TableOfContents 
          html={content} 
          title="On this page"
          maxLevel={3}
        />
      </aside>
      <main className="flex-1">
        <ContentBlocksRenderer 
          html={content}
          enableHeadingIds
          enableCodeCopy
        />
      </main>
    </div>
  );
}`,
};

type TabKey = keyof typeof codeExamples;

const tabs: { key: TabKey; label: string; icon: typeof Zap; description: string }[] = [
  { key: 'basic', label: 'Basic Usage', icon: Zap, description: 'Get started in seconds' },
  { key: 'preview', label: 'With Preview', icon: FileCode, description: 'Edit & preview mode' },
  { key: 'toc', label: 'Documentation', icon: Sparkles, description: 'Full docs layout' },
];

export function CodeExampleSection() {
  const [activeTab, setActiveTab] = useState<TabKey>('basic');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Terminal className="w-4 h-4" />
              Simple API
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Simple to use,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                powerful results
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Get started in minutes with our intuitive API. No complex configuration required.
            </motion.p>
          </div>

          {/* Code Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl">
              {/* Tabs */}
              <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 p-1.5">
                <div className="flex gap-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`relative px-4 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                        activeTab === tab.key
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {activeTab === tab.key && (
                        <motion.div
                          layoutId="activeCodeTab"
                          className="absolute inset-0 bg-background rounded-lg shadow-sm"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <tab.icon className={`w-4 h-4 relative z-10 ${activeTab === tab.key ? 'text-primary' : ''}`} />
                      <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500 hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mac-style code header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-[#011627] border-b border-zinc-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-sm text-zinc-500 font-mono">
                  {activeTab === 'basic' ? 'App.tsx' : activeTab === 'preview' ? 'BlogEditor.tsx' : 'DocsPage.tsx'}
                </span>
              </div>

              {/* Syntax Highlighted Code */}
              <div className="overflow-x-auto bg-[#011627]">
                <Highlight
                  theme={themes.nightOwl}
                  code={codeExamples[activeTab]}
                  language="tsx"
                >
                  {({ style, tokens, getLineProps, getTokenProps }) => (
                    <pre className="p-4 text-sm font-mono m-0" style={{ ...style, background: 'transparent' }}>
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })} className="table-row">
                          <span className="table-cell pr-4 text-zinc-600 text-right select-none w-8">
                            {i + 1}
                          </span>
                          <span className="table-cell">
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </span>
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            </div>
          </motion.div>

          {/* Tab descriptions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`p-4 rounded-xl text-left transition-all border ${
                  activeTab === tab.key
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-muted/30 border-border/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeTab === tab.key ? 'bg-primary/20' : 'bg-muted/50'
                  }`}>
                    <tab.icon className={`w-4 h-4 ${activeTab === tab.key ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <span className={`font-medium ${activeTab === tab.key ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {tab.label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{tab.description}</p>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
