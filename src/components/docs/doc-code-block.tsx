'use client';

import { Highlight, themes } from 'prism-react-renderer';

interface DocCodeBlockProps {
  code: string;
  language: string;
}

export function DocCodeBlock({ code, language }: DocCodeBlockProps) {
  return (
    <Highlight
      theme={themes.nightOwl}
      code={code.trim()}
      language={language || 'text'}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre className="rounded-lg overflow-x-auto p-4 text-sm my-4" style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
