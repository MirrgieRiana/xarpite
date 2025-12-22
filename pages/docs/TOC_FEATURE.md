# Xarpite Documentation - Table of Contents (TOC) Feature

## Overview

The Xarpite documentation site now supports automatic generation of Table of Contents (TOC) for documentation pages using Jekyll and Kramdown's built-in TOC functionality.

## How to Enable TOC for a Documentation Page

To add an automatically generated table of contents to any documentation page:

### 1. Add Front Matter Configuration

In the YAML front matter of your markdown file, add `toc: true`:

```yaml
---
title: "Your Page Title"
toc: true
---
```

For English pages, also add `lang: en`:

```yaml
---
title: "Your Page Title"
lang: en
toc: true
---
```

### 2. That's It!

The TOC will be automatically inserted at the beginning of your document. **No manual include statement needed!**

The layout automatically detects the `toc: true` flag and inserts the appropriate TOC template based on the page language.

### 3. Structure Your Headings

Make sure your document uses proper heading hierarchy:
- Use `#` for top-level sections
- Use `##` for subsections
- Use `###` for sub-subsections

The TOC will automatically be generated from these headings (levels 1-3 by default).

## Example

**Japanese documentation page:**
```markdown
---
title: "組み込み関数"
toc: true
---

# 数学系関数

## ABS

Absolute value function...

## SQRT

Square root function...

# ストリーム系関数

## MAP

Map function...
```

**English documentation page:**
```markdown
---
title: "Built-in Functions"
lang: en
toc: true
---

# Mathematical Functions

## ABS

Absolute value function...

## SQRT

Square root function...

# Stream Functions

## MAP

Map function...
```

## Configuration

The TOC feature is configured in `_config.yml`:

```yaml
kramdown:
  auto_ids: true
  toc_levels: 1..3
```

- `auto_ids: true` - Automatically generates IDs for headings
- `toc_levels: 1..3` - Includes headings from level 1 to level 3 in the TOC

## Styling

TOC styling is defined in `/assets/css/style.css` under the `.table-of-contents` and `#markdown-toc` selectors. The TOC features:

- Light background with red accent border
- Hierarchical indentation
- Hover effects on links
- Red arrow indicators for each item

## How It Works

The TOC system consists of:

1. **Layout Integration** (`pages/_layouts/default.html`) - Automatically detects `toc: true` in front matter and injects the TOC include
2. **TOC Template** (`pages/_includes/toc.md`) - Generates the TOC with appropriate language heading
3. **Kramdown Processing** - The `{:toc}` marker tells Kramdown to generate TOC from headings
4. **CSS Styling** (`pages/assets/css/style.css`) - Provides visual styling

## Files Modified

- `pages/_config.yml` - Added Kramdown TOC configuration
- `pages/_layouts/default.html` - Added automatic TOC injection based on front matter
- `pages/_includes/toc.md` - Created TOC include template
- `pages/assets/css/style.css` - Added TOC styling
- Documentation files (`builtin.md`, `cli.md`, `syntax.md`) - Configured with `toc: true` in front matter only

## Benefits

1. **Fully Automatic** - Just set `toc: true` in front matter, no manual includes needed
2. **Consistency** - All TOCs follow the same format and styling
3. **Maintainability** - TOCs automatically update when headings change
4. **No Manual Work** - No need to manually create, update, or include TOC statements
5. **Multilingual Support** - Automatic language detection for TOC headers
6. **Customizable** - Easy to adjust TOC depth, styling, and placement

