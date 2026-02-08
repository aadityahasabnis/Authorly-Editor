# Table

Tables organize data in rows and columns, making complex information easy to scan and compare. Authorly's table block provides a powerful yet intuitive way to create and edit tables directly in your content.

## Overview

Tables are essential for:

- **Data presentation** - Show structured data clearly
- **Comparisons** - Compare features, pricing, specifications
- **Documentation** - API parameters, configuration options
- **Schedules** - Events, timelines, calendars
- **Results** - Test results, metrics, statistics

**Key features:**
- Visual table editor
- Add/remove rows and columns
- Header row support
- Column alignment (left, center, right)
- Responsive design
- Markdown table syntax support
- Clean HTML output

## Creating Tables

### Using Slash Command

Type `/table` to insert a table:

```
/table
```

This creates a default 3x3 table (3 columns, 3 rows including header).

### Using Markdown Syntax

Type markdown table syntax:

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

The table is created automatically as you type.

### Via Toolbar

1. Click where you want the table
2. Click the "Table" button in toolbar
3. Select initial dimensions
4. Table is inserted

## Table Structure

### Headers

The first row is treated as the header by default:

```
| Name     | Role        | Status   |
|----------|-------------|----------|
| Sarah    | Developer   | Active   |
| Mike     | Designer    | Active   |
```

**Header styling:**
- Bold text
- Background color
- Border emphasis

### Body Rows

All rows after the header are body rows:

- Regular font weight
- Alternating backgrounds (optional)
- Hover states for interactivity

### Cells

Individual table cells can contain:
- Plain text
- **Bold text**
- *Italic text*
- `Inline code`
- [Links](#)
- Numbers and symbols

## Editing Tables

### Adding Rows

**Add row below:**
1. Click in any cell
2. Click "Add row below" button
3. Or press `Ctrl/Cmd + Enter`

**Add row above:**
1. Click in any cell
2. Right-click → "Insert row above"

### Adding Columns

**Add column right:**
1. Click in any cell
2. Click "Add column right" button

**Add column left:**
1. Click in any cell
2. Right-click → "Insert column left"

### Deleting Rows

1. Click in the row to delete
2. Click "Delete row" button
3. Or press `Ctrl/Cmd + Shift + Backspace`

### Deleting Columns

1. Click in the column to delete
2. Click "Delete column" button

### Deleting Entire Table

1. Click anywhere in the table
2. Press `Backspace` on empty table
3. Or use block menu → "Delete block"

## Column Alignment

Align text in columns for better readability:

### Left Aligned (Default)

```
| Name  | Description        |
|-------|--------------------|
| Item  | Details here       |
```

### Center Aligned

```
| Name  |   Status   |  Count  |
|-------|:----------:|:-------:|
| Item  |   Active   |   42    |
```

Use `:---:` in the separator row for center alignment.

### Right Aligned

```
| Item     | Price     |
|----------|----------:|
| Product  |   $99.99  |
```

Use `---:` in the separator row for right alignment.

## Best Practices

### Keep Tables Simple

```
❌ Too complex:
15 columns × 50 rows

✅ Focused:
4-6 columns × 10-20 rows
```

### Use Descriptive Headers

```
❌ Vague:
| A | B | C |

✅ Clear:
| Feature | Basic | Pro |
```

### Align Appropriately

- **Left**: Text, names, descriptions
- **Center**: Status, short labels, icons
- **Right**: Numbers, prices, quantities

### Don't Overuse Tables

```
❌ Use table for:
- Single row of data (use list)
- Two columns (use description list)
- Unstructured content

✅ Use table for:
- Multiple rows of structured data
- Data comparisons
- Specifications and parameters
```

### Make Tables Responsive

For wide tables, consider:
- Scrollable container on mobile
- Stacking columns vertically
- Hiding less important columns
- Using abbreviations

### Highlight Important Data

```markdown
| Metric    | Value           |
|-----------|-----------------|
| Users     | 10,000          |
| Revenue   | **$50,000**     |
| Growth    | *+25%*          |
```

## Common Use Cases

### Feature Comparison

```markdown
| Feature           | Free    | Pro      | Enterprise |
|-------------------|---------|----------|------------|
| Users             | 1       | 5        | Unlimited  |
| Storage           | 1 GB    | 100 GB   | 1 TB       |
| Support           | Email   | Priority | Dedicated  |
| API Access        | ❌      | ✅       | ✅         |
| Custom Domain     | ❌      | ✅       | ✅         |
```

### API Documentation

```markdown
| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| `id`      | string | Yes      | User unique identifier   |
| `name`    | string | Yes      | User full name           |
| `email`   | string | Yes      | User email address       |
| `role`    | string | No       | User role (default: user)|
```

### Specifications

```markdown
| Specification  | Value                    |
|----------------|--------------------------|
| Processor      | Apple M3 Pro             |
| Memory         | 18GB Unified Memory      |
| Storage        | 512GB SSD                |
| Display        | 14-inch Liquid Retina XDR|
| Battery        | Up to 18 hours           |
| Weight         | 3.5 lbs (1.6 kg)         |
```

### Pricing Table

```markdown
| Plan       | Monthly  | Annual   | Savings  |
|------------|----------|----------|----------|
| Starter    | $9       | $90      | 17%      |
| Business   | $29      | $290     | 17%      |
| Enterprise | $99      | $990     | 17%      |
```

### Schedule/Timeline

```markdown
| Time      | Activity                | Location      |
|-----------|-------------------------|---------------|
| 9:00 AM   | Registration            | Lobby         |
| 10:00 AM  | Keynote Speech          | Main Hall     |
| 11:30 AM  | Workshop Session 1      | Room A        |
| 1:00 PM   | Lunch Break             | Cafeteria     |
| 2:00 PM   | Workshop Session 2      | Room B        |
```

### Test Results

```markdown
| Test Case              | Status | Duration | Coverage |
|------------------------|--------|----------|----------|
| User Authentication    | ✅ Pass | 0.23s    | 95%      |
| Data Validation        | ✅ Pass | 0.15s    | 100%     |
| API Integration        | ❌ Fail | 1.45s    | 78%      |
| Performance Benchmark  | ✅ Pass | 2.31s    | 88%      |
```

## HTML Output

Tables generate clean, semantic HTML:

### Basic Table

**Input:**
```markdown
| Name  | Age |
|-------|-----|
| Alice | 28  |
| Bob   | 35  |
```

**Output:**
```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>28</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>35</td>
    </tr>
  </tbody>
</table>
```

### With Alignment

**Input:**
```markdown
| Item     |  Quantity  |    Price |
|----------|:----------:|---------:|
| Widget   |     10     |  $99.99  |
```

**Output:**
```html
<table>
  <thead>
    <tr>
      <th align="left">Item</th>
      <th align="center">Quantity</th>
      <th align="right">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="left">Widget</td>
      <td align="center">10</td>
      <td align="right">$99.99</td>
    </tr>
  </tbody>
</table>
```

## Styling Tables

### Default Styles

Authorly applies clean table styles:

```css
.authorly-editor table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.9375rem;
}

.authorly-editor th {
  background: #f9fafb;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #e5e7eb;
}

.authorly-editor td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.authorly-editor tbody tr:hover {
  background: #f9fafb;
}
```

### Custom Styling

Create your own table styles:

```css
/* Bordered table */
.authorly-editor table {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.authorly-editor th,
.authorly-editor td {
  border-right: 1px solid #e5e7eb;
}

/* Striped rows */
.authorly-editor tbody tr:nth-child(even) {
  background: #f9fafb;
}

/* Compact table */
.authorly-editor table.compact th,
.authorly-editor table.compact td {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

/* Colored header */
.authorly-editor th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* Hoverable rows */
.authorly-editor tbody tr {
  transition: all 0.2s ease;
  cursor: pointer;
}

.authorly-editor tbody tr:hover {
  background: #e0e7ff;
  transform: scale(1.01);
}
```

### Responsive Tables

Make tables mobile-friendly:

```css
/* Scrollable on mobile */
.table-wrapper {
  overflow-x: auto;
  margin: 1.5rem 0;
}

/* Stack on small screens */
@media (max-width: 640px) {
  .authorly-editor table,
  .authorly-editor thead,
  .authorly-editor tbody,
  .authorly-editor th,
  .authorly-editor td,
  .authorly-editor tr {
    display: block;
  }
  
  .authorly-editor thead tr {
    display: none;
  }
  
  .authorly-editor td {
    position: relative;
    padding-left: 50%;
  }
  
  .authorly-editor td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    font-weight: 600;
  }
}
```

## Accessibility

Tables must be accessible:

### Use Proper Headers

```html
✅ Accessible:
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>...</tbody>
</table>

❌ Not accessible:
<table>
  <tr>
    <td><strong>Name</strong></td>
    <td><strong>Role</strong></td>
  </tr>
</table>
```

### Add Table Caption

```html
<table>
  <caption>User Account Information</caption>
  <thead>...</thead>
  <tbody>...</tbody>
</table>
```

### Scope Attribute

For complex tables:

```html
<th scope="col">Month</th>
<th scope="row">Revenue</th>
```

### Don't Use Tables for Layout

```
❌ Layout tables:
<table>
  <tr>
    <td>Sidebar</td>
    <td>Content</td>
  </tr>
</table>

✅ Use CSS Grid/Flexbox for layout
```

## Performance

### Large Tables

For tables with many rows:

**Virtual scrolling:**
```tsx
<VirtualTable
  data={largeDataset}
  rowHeight={40}
  visibleRows={20}
/>
```

**Pagination:**
```tsx
<Table
  data={data}
  itemsPerPage={25}
  showPagination={true}
/>
```

**Lazy loading:**
```tsx
<Table
  data={data}
  lazyLoad={true}
  loadMoreRows={loadNextPage}
/>
```

### Optimize Rendering

```tsx
// Memoize table rows
const TableRow = memo(({ data }) => (
  <tr>
    <td>{data.name}</td>
    <td>{data.value}</td>
  </tr>
));
```

## Advanced Features

### Sortable Columns

Add click-to-sort functionality:

```tsx
function SortableTable({ data }) {
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder]);
  
  return <table>...</table>;
}
```

### Filterable Tables

Add search/filter:

```tsx
function FilterableTable({ data }) {
  const [filter, setFilter] = useState('');
  
  const filteredData = data.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    )
  );
  
  return (
    <>
      <input 
        type="text"
        placeholder="Filter..."
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>...</table>
    </>
  );
}
```

### Editable Tables

Make cells editable:

```tsx
function EditableCell({ value, onChange }) {
  const [editing, setEditing] = useState(false);
  
  if (editing) {
    return (
      <input
        value={value}
        onChange={onChange}
        onBlur={() => setEditing(false)}
        autoFocus
      />
    );
  }
  
  return (
    <div onClick={() => setEditing(true)}>
      {value}
    </div>
  );
}
```

### Export Tables

Export to CSV:

```tsx
function exportToCSV(tableData, filename) {
  const csv = tableData.map(row => 
    Object.values(row).join(',')
  ).join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
}
```

## Troubleshooting

### Table Not Creating

**Issue:** Markdown syntax doesn't create table  
**Solution:** Ensure pipes align and separator row exists

### Columns Not Aligned

**Issue:** Content doesn't align properly  
**Solution:** Use alignment syntax in separator row

### Table Too Wide

**Issue:** Table overflows container  
**Solution:** Use responsive wrapper or reduce columns

### Cells Merging

**Issue:** Content appears in wrong cells  
**Solution:** Check pipe placement in markdown

## Examples

### Product Comparison

```markdown
# Choose Your Plan

| Feature                  | Starter | Professional | Enterprise |
|--------------------------|---------|--------------|------------|
| **Users**                | 1       | 10           | Unlimited  |
| **Projects**             | 3       | 50           | Unlimited  |
| **Storage**              | 5 GB    | 100 GB       | 1 TB       |
| **API Calls**            | 1,000   | 100,000      | Unlimited  |
| **Support**              | Email   | Email + Chat | 24/7 Phone |
| **Custom Domain**        | ❌      | ✅           | ✅         |
| **Advanced Analytics**   | ❌      | ✅           | ✅         |
| **White Label**          | ❌      | ❌           | ✅         |
| **SLA**                  | -       | 99.5%        | 99.99%     |
| **Price**                | $9/mo   | $49/mo       | Custom     |

[Get Started →](#)
```

### Technical Specifications

```markdown
## System Requirements

### Minimum Requirements

| Component  | Requirement                    |
|------------|--------------------------------|
| OS         | Windows 10, macOS 11, Linux    |
| Processor  | Dual-core 2.0 GHz              |
| RAM        | 4 GB                           |
| Storage    | 500 MB available space         |
| Network    | Broadband internet connection  |

### Recommended Requirements

| Component  | Requirement                    |
|------------|--------------------------------|
| OS         | Windows 11, macOS 13, Linux    |
| Processor  | Quad-core 3.0 GHz              |
| RAM        | 16 GB                          |
| Storage    | 2 GB SSD                       |
| Network    | High-speed internet (100+ Mbps)|
```

### Event Schedule

```markdown
## Conference Agenda - Day 1

| Time        | Track 1: Development    | Track 2: Design        | Track 3: Business     |
|-------------|-------------------------|------------------------|-----------------------|
| 9:00 AM     | **Keynote: The Future of Web** (Main Hall)                              |||
| 10:30 AM    | React Best Practices    | Figma Advanced Tips    | Product Strategy      |
| 12:00 PM    | **Lunch Break** (Cafeteria)                                              |||
| 1:30 PM     | TypeScript Deep Dive    | Design Systems 101     | Growth Hacking        |
| 3:00 PM     | GraphQL Workshop        | Animation Techniques   | Analytics & Metrics   |
| 4:30 PM     | **Closing Remarks** (Main Hall)                                          |||
```
