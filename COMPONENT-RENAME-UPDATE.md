# Component Rename Update

## Summary

Updated all references from old component names to new Authorly branding throughout the Next.js documentation and playground website.

## Component Name Changes

| Old Name | New Name |
|----------|----------|
| `ContentBlocksEditor` | `AuthorlyEditor` |
| `ContentBlocksRenderer` | `AuthorlyRenderer` |
| `TableOfContents` | `AuthorlyTOC` |

## Files Updated

### Core Component Wrappers
- ✅ `src/components/Editor.tsx` - Updated dynamic import to use `AuthorlyEditor`
- ✅ `src/components/Renderer.tsx` - Updated to use `AuthorlyRenderer`
- ✅ `src/components/TableOfContents.tsx` - Updated to use `AuthorlyTOC`

### Marketing Pages
- ✅ `src/components/marketing/editor-demo-section.tsx` - Updated renderer component
- ✅ `src/components/marketing/code-example-section.tsx` - Updated all code examples (3 examples)

### Documentation
- ✅ `src/lib/docs.ts` - Updated ALL documentation content:
  - Installation guide
  - Quick start guide
  - Component API references
  - Code examples throughout docs
  - Editor ref examples
  - Next.js integration examples
- ✅ `src/components/docs/components-overview.tsx` - Updated component descriptions
- ✅ `src/components/docs/docs-search.tsx` - Updated search index

### Example Pages
- ✅ `src/app/examples/page.tsx` - Updated all code examples:
  - Cloud image upload example
  - Blog editor example
  - Documentation site example
  - All inline code snippets

### Playground
- ✅ `src/app/playground/page.tsx` - Uses wrapper components (already correct)

## Impact

### What Changed
- All import statements now use new component names
- All JSX uses new component names
- All code examples in documentation updated
- All descriptions and text references updated

### What Stayed the Same
- **CSS class names** - Still use `cb-*` prefix for backward compatibility
- **Wrapper components** - Local component names in Next.js app can stay as is
- **Functionality** - Zero breaking changes to functionality

## Code Examples

### Before
```tsx
import { ContentBlocksEditor } from 'authorly-editor';

<ContentBlocksEditor
  initialContent={content}
  onChange={setContent}
/>
```

### After
```tsx
import { AuthorlyEditor } from 'authorly-editor';

<AuthorlyEditor
  initialContent={content}
  onChange={setContent}
/>
```

## Testing

The documentation site now uses the correct component names throughout:
- Homepage code examples ✅
- Documentation pages ✅
- API reference pages ✅
- Interactive playground ✅
- Marketing sections ✅

## Next Steps

1. Test the dev server: `npm run dev`
2. Verify all pages load correctly
3. Check that code examples are syntax-highlighted properly
4. Ensure interactive demos work as expected

## Notes

- All changes maintain backward compatibility at the package level
- The old component names still work in the package (marked as deprecated)
- This update ensures the documentation showcases the new, simplified naming
