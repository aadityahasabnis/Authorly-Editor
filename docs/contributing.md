# Contributing to Authorly

Thank you for your interest in contributing to Authorly! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We expect all participants to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project maintainers. All complaints will be reviewed and investigated promptly and fairly.

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x or later
- **npm**, **pnpm**, or **yarn**
- **Git** installed
- A **GitHub account**
- Basic knowledge of **React** and **TypeScript**

### Finding Issues to Work On

Good places to start:

1. **Good First Issues** - Look for issues labeled `good first issue`
2. **Help Wanted** - Issues labeled `help wanted` need community support
3. **Documentation** - Improve or add documentation
4. **Bug Reports** - Fix reported bugs

### Before You Start

1. **Check Existing Issues** - Search for existing issues or PRs related to your idea
2. **Discuss Major Changes** - Open an issue to discuss significant changes before starting work
3. **Read the Docs** - Familiarize yourself with Authorly's architecture and features

## Development Setup

### 1. Fork and Clone

Fork the repository on GitHub, then clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/Authorly.git
cd Authorly
```

### 2. Add Upstream Remote

```bash
git remote add upstream https://github.com/aadityahasabnis/Authorly.git
```

### 3. Install Dependencies

```bash
cd authorly
npm install
# or
pnpm install
# or
yarn install
```

### 4. Start Development Server

```bash
npm run dev
```

This starts Vite in development mode at `http://localhost:5173`.

### 5. Run Tests

```bash
npm test
```

### 6. Build the Project

```bash
npm run build
```

This creates production builds in the `dist/` directory.

## Project Structure

```
authorly/
├── src/
│   ├── components/       # React components
│   │   ├── Editor.tsx    # Main editor component
│   │   ├── Renderer.tsx  # Content renderer
│   │   ├── Toolbar.tsx   # Toolbar component
│   │   └── ...
│   ├── blocks/           # Block type definitions
│   │   ├── paragraph.ts
│   │   ├── heading.ts
│   │   ├── list.ts
│   │   └── ...
│   ├── core/             # Core types and utilities
│   │   ├── types.ts      # TypeScript types
│   │   └── constants.ts
│   ├── utils/            # Helper functions
│   │   └── helpers.ts
│   ├── styles/           # CSS stylesheets
│   │   └── editor.css
│   ├── hooks/            # Custom React hooks
│   └── index.ts          # Main entry point
├── dist/                 # Build output (generated)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or changes
- `chore/` - Build process or tooling changes

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits focused and atomic

### 3. Test Your Changes

```bash
# Run tests
npm test

# Run linter
npm run lint

# Build project
npm run build
```

Ensure all tests pass and there are no lint errors.

### 4. Commit Your Changes

Follow conventional commit format:

```bash
git add .
git commit -m "type: brief description

Detailed explanation of what changed and why.

Closes #123"
```

Commit types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build or tooling changes

Examples:

```bash
git commit -m "feat: add support for custom block types"
git commit -m "fix: resolve cursor position bug in tables"
git commit -m "docs: update installation instructions"
```

### 5. Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/main
```

Resolve any conflicts that arise.

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

## Coding Standards

### TypeScript

- Use **TypeScript** for all new code
- Define types for all props and function parameters
- Avoid `any` - use proper types or `unknown`
- Export types that other developers might need

### React Components

```tsx
// Good: Properly typed functional component
interface EditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function Editor({ value, onChange, placeholder }: EditorProps) {
  // Component implementation
}

// Bad: No types
export function Editor(props) {
  // Component implementation
}
```

### Naming Conventions

- **Components**: PascalCase (`ContentBlocksEditor`, `Toolbar`)
- **Functions**: camelCase (`handleClick`, `formatText`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ITEMS`, `DEFAULT_CONFIG`)
- **Types/Interfaces**: PascalCase (`EditorProps`, `BlockType`)
- **Files**: kebab-case for utilities, PascalCase for components

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings
- **Semicolons**: Use them
- **Line Length**: Max 100 characters (not strict)
- **Comments**: Write clear comments for complex logic

### CSS

- Use CSS custom properties for theming
- Prefix all classes with `cb-` (content blocks)
- Keep specificity low
- Group related properties

```css
/* Good */
.cb-editor {
  background: var(--cb-bg);
  color: var(--cb-text);
  border: 1px solid var(--cb-border);
}

/* Bad */
.editor div.content p {
  background: #ffffff;
}
```

### Accessibility

- Provide proper ARIA labels
- Ensure keyboard navigation works
- Maintain proper focus management
- Test with screen readers when possible

## Testing

### Writing Tests

Place tests in `__tests__` directories or name them `*.test.ts(x)`.

```typescript
// blocks/__tests__/paragraph.test.ts
import { describe, it, expect } from 'vitest';
import { paragraphBlock } from '../paragraph';

describe('paragraphBlock', () => {
  it('creates a paragraph element', () => {
    const element = paragraphBlock.create();
    expect(element.tagName).toBe('DIV');
    expect(element.getAttribute('data-block-type')).toBe('paragraph');
  });

  it('extracts paragraph data correctly', () => {
    const element = paragraphBlock.create({
      id: 'test-1',
      type: 'paragraph',
      content: 'Test content',
    });
    
    const data = paragraphBlock.getData(element);
    expect(data.content).toBe('Test content');
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- paragraph.test.ts

# Run with coverage
npm test -- --coverage
```

### Test Coverage

Aim for:
- **80%+** line coverage for new features
- **100%** coverage for utility functions
- Edge cases and error conditions tested

## Submitting Changes

### 1. Create a Pull Request

1. Push your branch to your fork
2. Go to the [Authorly repository](https://github.com/aadityahasabnis/Authorly)
3. Click "New Pull Request"
4. Select your fork and branch
5. Fill out the PR template

### 2. PR Title Format

```
type: Brief description

Examples:
feat: Add table block support
fix: Resolve cursor position bug in lists
docs: Update Quick Start guide
```

### 3. PR Description

Include:

- **What**: What does this PR do?
- **Why**: Why is this change needed?
- **How**: How does it work?
- **Testing**: How was it tested?
- **Screenshots**: If UI changes, include before/after screenshots
- **Related Issues**: Link to related issues with `Closes #123`

### 4. PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No lint errors
- [ ] Build succeeds
- [ ] Changeset added (if applicable)

### 5. Code Review Process

- Maintainers will review your PR
- Address feedback by pushing new commits
- Once approved, your PR will be merged
- Your contribution will be included in the next release

## Release Process

Releases are managed by project maintainers:

1. Version bump (following [Semantic Versioning](https://semver.org/))
2. Update CHANGELOG.md
3. Create GitHub release
4. Publish to npm

### Versioning

- **Major (1.0.0)**: Breaking changes
- **Minor (0.1.0)**: New features, backwards compatible
- **Patch (0.0.1)**: Bug fixes, backwards compatible

## Additional Guidelines

### Reporting Bugs

When reporting bugs, include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Exact steps to reproduce
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, Authorly version
6. **Screenshots**: If applicable
7. **Code Sample**: Minimal reproduction code

### Suggesting Features

When suggesting features, include:

1. **Problem**: What problem does this solve?
2. **Solution**: How should it work?
3. **Alternatives**: What alternatives did you consider?
4. **Use Cases**: Real-world examples
5. **Mockups**: If UI changes, include mockups

### Documentation Contributions

Documentation improvements are always welcome:

- Fix typos or errors
- Clarify confusing sections
- Add examples
- Improve organization
- Translate to other languages (future)

### Community

- **GitHub Discussions**: Ask questions, share ideas
- **Issues**: Report bugs, request features
- **Pull Requests**: Contribute code

## License

By contributing to Authorly, you agree that your contributions will be licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Questions?

If you have questions:

1. Check existing [documentation](https://github.com/aadityahasabnis/Authorly/blob/main/README.md)
2. Search [existing issues](https://github.com/aadityahasabnis/Authorly/issues)
3. Ask in [GitHub Discussions](https://github.com/aadityahasabnis/Authorly/discussions)
4. Open a new issue

## Thank You!

Your contributions make Authorly better for everyone. Thank you for taking the time to contribute!

---

**Happy coding! 🚀**
