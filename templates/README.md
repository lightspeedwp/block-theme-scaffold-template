# Templates

This directory contains HTML template files that define the structure of different page types.

## Overview

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#1e4d78', 'primaryTextColor': '#ffffff', 'primaryBorderColor': '#15354f', 'lineColor': '#333333', 'secondaryColor': '#f0f0f0', 'tertiaryColor': '#e8e8e8', 'background': '#ffffff', 'mainBkg': '#1e4d78', 'textColor': '#333333', 'nodeBorder': '#15354f', 'clusterBkg': '#f8f9fa', 'clusterBorder': '#dee2e6', 'titleColor': '#333333'}}}%%
flowchart TB
    subgraph Core["Core Templates"]
        Index["index.html<br/>Fallback"]
        Single["single.html<br/>Posts"]
        Page["page.html<br/>Pages"]
        Archive["archive.html<br/>Archives"]
    end

    subgraph Specific["Specific Templates"]
        Home["home.html<br/>Blog Home"]
        Author["author.html<br/>Author Pages"]
        Category["category.html<br/>Categories"]
        Tag["tag.html<br/>Tags"]
        Search["search.html<br/>Search Results"]
        E404["404.html<br/>Not Found"]
    end

    subgraph Special["Special"]
        Singular["singular.html<br/>Posts & Pages"]
    end
```

## Template Hierarchy

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#1e4d78', 'primaryTextColor': '#ffffff', 'primaryBorderColor': '#15354f', 'lineColor': '#333333', 'secondaryColor': '#f0f0f0', 'tertiaryColor': '#e8e8e8', 'background': '#ffffff', 'mainBkg': '#1e4d78', 'textColor': '#333333', 'nodeBorder': '#15354f', 'clusterBkg': '#f8f9fa', 'clusterBorder': '#dee2e6', 'titleColor': '#333333'}}}%%
flowchart TD
    Request["Page Request"] --> Type{"Content Type?"}

    Type -->|"Single Post"| Single["single.html"]
    Type -->|"Page"| Page["page.html"]
    Type -->|"Category"| Category["category.html"]
    Type -->|"Tag"| Tag["tag.html"]
    Type -->|"Author"| Author["author.html"]
    Type -->|"Search"| Search["search.html"]
    Type -->|"404"| E404["404.html"]
    Type -->|"Blog Home"| Home["home.html"]
    Type -->|"Archive"| Archive["archive.html"]

    Single --> Singular["singular.html"]
    Page --> Singular
    Category --> Archive
    Tag --> Archive
    Author --> Archive

    Singular --> Index["index.html"]
    Archive --> Index
    Search --> Index
    Home --> Index
    E404 --> Index
```

## Templates

### Core Templates

| Template | Purpose | Fallback |
|----------|---------|----------|
| `index.html` | Default fallback for all pages | — |
| `single.html` | Individual blog posts | `singular.html` |
| `page.html` | Static pages | `singular.html` |
| `archive.html` | Archive listings | `index.html` |

### Archive Templates

| Template | Purpose | Fallback |
|----------|---------|----------|
| `home.html` | Blog posts page | `index.html` |
| `author.html` | Author archive | `archive.html` |
| `category.html` | Category archive | `archive.html` |
| `tag.html` | Tag archive | `archive.html` |
| `search.html` | Search results | `index.html` |

### Special Templates

| Template | Purpose | Fallback |
|----------|---------|----------|
| `singular.html` | Posts and pages | `index.html` |
| `404.html` | Not found page | `index.html` |

## Template Structure

Each template typically includes:

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main"} -->
<main class="wp-block-group">
    <!-- Main content blocks -->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

## Common Blocks Used

### Query Loop (Archives)

```html
<!-- wp:query {"queryId":1,"query":{"perPage":10,"pages":0,"offset":0,"postType":"post"}} -->
<div class="wp-block-query">
    <!-- wp:post-template -->
        <!-- wp:post-title {"isLink":true} /-->
        <!-- wp:post-excerpt /-->
        <!-- wp:post-date /-->
    <!-- /wp:post-template -->

    <!-- wp:query-pagination -->
        <!-- wp:query-pagination-previous /-->
        <!-- wp:query-pagination-numbers /-->
        <!-- wp:query-pagination-next /-->
    <!-- /wp:query-pagination -->
</div>
<!-- /wp:query -->
```

### Post Content (Single)

```html
<!-- wp:post-title {"level":1} /-->
<!-- wp:post-featured-image /-->
<!-- wp:post-content /-->
<!-- wp:post-terms {"term":"category"} /-->
<!-- wp:post-terms {"term":"post_tag"} /-->
```

## Creating Custom Templates

1. Create an HTML file in this directory
2. Add block markup using WordPress block syntax
3. Register in `theme.json` if needed

**Example: Landing Page Template**

```html
<!-- wp:template-part {"slug":"header"} /-->

<!-- wp:cover {"dimRatio":50,"minHeight":80,"minHeightUnit":"vh"} -->
<div class="wp-block-cover" style="min-height:80vh">
    <!-- Hero content -->
</div>
<!-- /wp:cover -->

<!-- wp:group {"align":"wide"} -->
<div class="wp-block-group alignwide">
    <!-- Page sections -->
</div>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer"} /-->
```

## Template Registration

Custom templates can be registered in `theme.json`:

```json
{
    "customTemplates": [
        {
            "name": "landing",
            "title": "Landing Page",
            "postTypes": ["page"]
        }
    ]
}
```

## Related Documentation

- [Template Parts](../parts/README.md)
- [Block Patterns](../patterns/README.md)
- [WordPress Template Hierarchy](https://developer.wordpress.org/themes/templates/template-hierarchy/)
- [Block Theme Templates](https://developer.wordpress.org/themes/templates/)
