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

### 2. Include the TOC

Add the TOC include statement where you want the table of contents to appear (typically near the beginning of the document):

**For Japanese pages:**
```liquid
{% include toc.md %}
```

**For English pages:**
```liquid
{% include toc.md lang='en' %}
```

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

{% include toc.md %}

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

{% include toc.md lang='en' %}

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

## Files Modified

- `pages/_config.yml` - Added Kramdown TOC configuration
- `pages/_layouts/default.html` - Added automatic TOC container
- `pages/_includes/toc.md` - Created TOC include template
- `pages/assets/css/style.css` - Added TOC styling
- Documentation files (`builtin.md`, `cli.md`, `syntax.md`) - Configured to use automatic TOC

## Benefits

1. **Consistency** - All TOCs follow the same format and styling
2. **Maintainability** - TOCs automatically update when headings change
3. **No Manual Work** - No need to manually create and update link lists
4. **Multilingual Support** - Automatic language detection for TOC headers
5. **Customizable** - Easy to adjust TOC depth, styling, and placement
