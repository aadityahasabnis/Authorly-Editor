# Headings

Headings create the structure and hierarchy of your content. Authorly supports six heading levels (H1-H6), allowing you to build well-organized, scannable documents that are both readable and SEO-friendly.

## Overview

Headings serve multiple purposes in your content:

- **Structure your document** - Create clear sections and subsections
- **Improve scannability** - Help readers quickly find information
- **Enhance SEO** - Search engines use headings to understand content hierarchy
- **Enable navigation** - Power table of contents and jump links
- **Establish hierarchy** - Show the relationship between topics

**Key features:**
- Six levels (H1 through H6)
- Automatic ID generation for linking
- Markdown syntax support
- Keyboard shortcuts
- SEO-optimized HTML output

## Heading Levels

### H1 - Main Title

The largest and most important heading. Use once per page for the main title.

**Visual size:** Extra large  
**Use for:** Page title, article title, main heading  
**Frequency:** Once per page  
**Example:** "Getting Started with Authorly"

### H2 - Major Sections

Major sections within your content. These are the primary divisions of your document.

**Visual size:** Large  
**Use for:** Main sections, chapter titles  
**Frequency:** Multiple per page  
**Example:** "Installation", "Features", "Usage"

### H3 - Subsections

Subdivisions within H2 sections. Creates clear organization within major topics.

**Visual size:** Medium-large  
**Use for:** Subsections, key points within sections  
**Frequency:** Multiple per section  
**Example:** "Using npm", "Using yarn"

### H4 - Sub-subsections

Further divisions for detailed content structure.

**Visual size:** Medium  
**Use for:** Detailed breakdowns, specific topics  
**Frequency:** As needed  
**Example:** "Configuration options", "Common patterns"

### H5 - Minor Headings

Smaller divisions for fine-grained organization.

**Visual size:** Small  
**Use for:** Details, variations, specific cases  
**Frequency:** Sparingly  
**Example:** "Advanced options", "Edge cases"

### H6 - Smallest Headings

The smallest heading level, used for very specific subsections.

**Visual size:** Extra small  
**Use for:** Very specific details, footnotes  
**Frequency:** Rarely  
**Example:** "Technical notes", "Implementation details"

## Creating Headings

### Using Slash Command

Type `/` followed by heading level:

- `/heading1` or `/h1` - Main title
- `/heading2` or `/h2` - Major section
- `/heading3` or `/h3` - Subsection
- `/heading4` or `/h4` - Sub-subsection
- `/heading5` or `/h5` - Minor heading
- `/heading6` or `/h6` - Smallest heading

### Using Markdown Syntax

Type hash symbols followed by space:

```
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

The heading is created automatically as you type.

### Using Keyboard Shortcuts

| Shortcut | Heading Level |
|----------|---------------|
| `Ctrl/Cmd + Alt + 1` | H1 |
| `Ctrl/Cmd + Alt + 2` | H2 |
| `Ctrl/Cmd + Alt + 3` | H3 |
| `Ctrl/Cmd + Alt + 4` | H4 |
| `Ctrl/Cmd + Alt + 5` | H5 |
| `Ctrl/Cmd + Alt + 6` | H6 |

### Converting from Paragraph

1. Click on the paragraph you want to convert
2. Open the block menu (`/` or toolbar)
3. Select the desired heading level

Or select text and use the toolbar dropdown to choose heading level.

## Best Practices

### Follow Hierarchical Order

Don't skip levels in your heading structure:

```
❌ Bad structure:
# Main Title
#### Subsection (skipped H2 and H3)

✅ Good structure:
# Main Title
## Section
### Subsection
```

### Use One H1 Per Page

Reserve H1 for the main page title only:

```
❌ Multiple H1s on same page:
# Introduction
# Features
# Conclusion

✅ One H1, multiple H2s:
# Complete Guide to Authorly
## Introduction
## Features
## Conclusion
```

### Make Headings Descriptive

Write clear, descriptive headings that tell readers what to expect:

```
❌ Vague:
## Details
## More Information
## Other Stuff

✅ Descriptive:
## Installation Instructions
## Advanced Configuration
## Troubleshooting Common Issues
```

### Keep Headings Concise

Aim for short, scannable headings:

```
❌ Too long:
## A Comprehensive Guide to Understanding All the Different Ways You Can Install This Package

✅ Concise:
## Installation Methods
```

### Don't Use Headings for Styling

Use headings for structure, not just to make text bigger:

```
❌ Using heading for emphasis:
#### This is important!

✅ Use strong/bold for emphasis:
**This is important!**
```

### Make Headings Meaningful

Headings should make sense out of context:

```
❌ Not meaningful:
## Step 1
## Step 2

✅ Meaningful:
## Install Dependencies
## Configure Environment
```

## Heading IDs and Links

### Automatic ID Generation

Authorly automatically generates IDs for all headings:

**Heading text:** "Installation Instructions"  
**Generated ID:** `installation-instructions`

The ID is created by:
1. Converting to lowercase
2. Replacing spaces with hyphens
3. Removing special characters
4. Removing leading/trailing hyphens

### Enable Heading IDs

Make sure heading IDs are enabled in the renderer:

```tsx
<AuthorlyRenderer
  html={content}
  enableHeadingIds={true}  // Default: true
/>
```

### Link to Headings

Use the generated IDs to create jump links:

```markdown
See the [Installation](#installation) section for details.

Jump to [Configuration Options](#configuration-options).
```

**HTML output:**
```html
<a href="#installation">Installation</a>
```

### Custom IDs

Override auto-generated IDs with custom ones:

```markdown
## Installation {#install}
```

Now you can link using:
```markdown
[See installation](#install)
```

## Document Structure

### Typical Blog Post Structure

```
# Article Title (H1)

Introduction paragraph...

## Problem Statement (H2)

Description of the problem...

## Solution Overview (H2)

Overview of the solution...

### Key Features (H3)

Feature details...

### How It Works (H3)

Implementation details...

## Getting Started (H2)

### Installation (H3)

Installation steps...

### Basic Usage (H3)

Usage examples...

## Advanced Topics (H2)

### Configuration (H3)

Configuration details...

### Customization (H3)

Customization options...

## Conclusion (H2)

Closing thoughts...
```

### Technical Documentation Structure

```
# Component Name (H1)

Component overview...

## Props (H2)

### Required Props (H3)

Required prop details...

### Optional Props (H3)

Optional prop details...

## Usage (H2)

### Basic Example (H3)

Basic usage code...

### Advanced Example (H3)

Advanced usage code...

## API Reference (H2)

### Methods (H3)

#### componentMethod1 (H4)

Method details...

#### componentMethod2 (H4)

Method details...

## Troubleshooting (H2)

Common issues and solutions...
```

### Tutorial Structure

```
# Tutorial: Building a Todo App (H1)

Tutorial introduction...

## Prerequisites (H2)

What you need before starting...

## Step 1: Project Setup (H2)

### Create Project (H3)

Project creation steps...

### Install Dependencies (H3)

Dependency installation...

## Step 2: Build Components (H2)

### TodoList Component (H3)

Component code and explanation...

### TodoItem Component (H3)

Component code and explanation...

## Step 3: Add Functionality (H2)

### Create Todos (H3)

Implementation details...

### Complete Todos (H3)

Implementation details...

## Conclusion (H2)

Summary and next steps...
```

## HTML Output

Headings generate clean, semantic HTML:

### Basic Headings

**Input:**
```
# Main Heading
## Section Heading
### Subsection
```

**Output:**
```html
<h1>Main Heading</h1>
<h2>Section Heading</h2>
<h3>Subsection</h3>
```

### With Auto-Generated IDs

**Input:**
```
## Getting Started
```

**Output:**
```html
<h2 id="getting-started">Getting Started</h2>
```

### With Custom IDs

**Input:**
```
## Installation {#install}
```

**Output:**
```html
<h2 id="install">Installation</h2>
```

## Styling Headings

### Default Styles

Authorly applies semantic, readable styles:

```css
.authorly-editor h1 {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 2rem 0 1rem;
}

.authorly-editor h2 {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 1.75rem 0 0.875rem;
}

.authorly-editor h3 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 1.5rem 0 0.75rem;
}
```

### Custom Heading Styles

Override with your own CSS:

```css
/* Gradient headings */
.authorly-editor h1 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Underlined headings */
.authorly-editor h2 {
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

/* Numbered headings */
.authorly-editor {
  counter-reset: h2;
}

.authorly-editor h2::before {
  counter-increment: h2;
  content: counter(h2) ". ";
  color: #6366f1;
}
```

### Heading Anchors

Add visible anchor links:

```css
.authorly-editor h2,
.authorly-editor h3 {
  position: relative;
}

.authorly-editor h2:hover .anchor,
.authorly-editor h3:hover .anchor {
  opacity: 1;
}

.anchor {
  position: absolute;
  left: -1.5rem;
  opacity: 0;
  transition: opacity 0.2s;
  color: #6366f1;
  text-decoration: none;
}
```

## Accessibility

Headings are critical for accessibility:

### Screen Reader Navigation

Users with screen readers navigate by headings:
- Press `H` to jump to next heading
- Press `1-6` to jump to specific heading level
- Headings create a document outline

### Proper Heading Structure

```
❌ Poor accessibility:
<div style="font-size: 2rem; font-weight: bold;">
  Section Title
</div>

✅ Good accessibility:
<h2>Section Title</h2>
```

### ARIA Best Practices

Don't use ARIA roles on headings - semantic HTML is sufficient:

```
❌ Unnecessary ARIA:
<h2 role="heading" aria-level="2">Title</h2>

✅ Semantic HTML:
<h2>Title</h2>
```

### Descriptive Headings

Make headings understandable without surrounding context:

```
❌ Not descriptive:
## Here
## There
## Introduction

✅ Descriptive:
## Installation Process
## Configuration Settings
## Introduction to Components
```

## Table of Contents

Headings power automatic table of contents:

### Using AuthorlyTOC Component

```tsx
import { AuthorlyTOC } from 'authorly-editor';

<AuthorlyTOC 
  html={content}
  maxLevel={3}  // Show H2 and H3 only
  title="On this page"
/>
```

### Custom TOC

Build your own from headings:

```tsx
function CustomTOC({ content }) {
  const headings = extractHeadings(content);
  
  return (
    <nav>
      <h4>Contents</h4>
      <ul>
        {headings.map(h => (
          <li key={h.id}>
            <a href={`#${h.id}`}>{h.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

## SEO Best Practices

### One H1 Per Page

Search engines use H1 to understand the main topic:

```html
<!-- Good SEO -->
<h1>Complete Guide to React Hooks</h1>
<h2>useState Hook</h2>
<h2>useEffect Hook</h2>

<!-- Confusing to search engines -->
<h1>React Hooks</h1>
<h1>Advanced Patterns</h1>
```

### Use Keywords Naturally

Include relevant keywords in headings:

```
❌ Keyword stuffing:
## Best React Hooks Tutorial React Hooks Guide

✅ Natural keywords:
## React Hooks Tutorial for Beginners
```

### Maintain Hierarchy

Search engines understand document structure from heading hierarchy:

```
✅ Clear hierarchy:
<h1>Programming Languages</h1>
  <h2>JavaScript</h2>
    <h3>ES6 Features</h3>
  <h2>Python</h2>
    <h3>Python 3.x</h3>
```

### Make Headings Descriptive

Descriptive headings improve SEO:

```
❌ Vague:
## Overview
## Details
## More

✅ Descriptive:
## React Component Overview
## Implementation Details
## Advanced Patterns
```

## Common Use Cases

### Documentation Page

```markdown
# API Reference

## Authentication

All API requests require authentication using a bearer token.

### Obtaining a Token

To get an authentication token:

1. Register an account
2. Navigate to API settings
3. Generate new token

### Using the Token

Include the token in your request headers:

## Endpoints

### GET /users

Retrieve a list of users.

#### Parameters

- `page` (optional) - Page number
- `limit` (optional) - Items per page

#### Response

Returns an array of user objects.

### POST /users

Create a new user.

#### Request Body

- `name` (required) - User's full name
- `email` (required) - User's email address
```

### Blog Post

```markdown
# 10 Tips for Better Code Reviews

Code reviews are essential for maintaining code quality. Here are ten tips to make your reviews more effective.

## 1. Review Small Changes

Large pull requests are overwhelming and easy to miss issues.

### Why Small PRs Work

- Easier to review thoroughly
- Faster feedback cycle
- Less context switching

## 2. Be Constructive

Focus on the code, not the person.

### Good Feedback Examples

Instead of "This is wrong," say "Consider using X because..."

## 3. Use Automation

Let tools handle the basics.

### Recommended Tools

- ESLint for linting
- Prettier for formatting
- TypeScript for type checking
```

## Troubleshooting

### Heading Not Converting

**Issue:** Typing `## text` doesn't create heading  
**Solution:** Make sure there's a space after the hash symbols

### Can't Change Heading Level

**Issue:** Unable to convert H2 to H3  
**Solution:** Use block menu (`/`) or toolbar dropdown

### Heading IDs Not Working

**Issue:** Links to headings don't scroll  
**Solution:** Enable `enableHeadingIds` in renderer

### TOC Not Showing Headings

**Issue:** Table of contents is empty  
**Solution:** Ensure headings have IDs and TOC maxLevel includes heading levels

## Examples

### Software Documentation

```markdown
# Authentication Service

## Overview

The authentication service handles user login and session management.

## Installation

### npm

\`\`\`bash
npm install @company/auth
\`\`\`

### yarn

\`\`\`bash
yarn add @company/auth
\`\`\`

## Configuration

### Environment Variables

Set these environment variables:

- `AUTH_SECRET` - Secret key for tokens
- `SESSION_TIMEOUT` - Session duration

### Configuration File

Create `auth.config.js`:

## Usage

### Basic Authentication

Here's a minimal example:

### Advanced Usage

#### Custom Token Expiry

#### Refresh Tokens

## API Reference

### Methods

#### login(credentials)

#### logout()

#### refreshToken()
```
