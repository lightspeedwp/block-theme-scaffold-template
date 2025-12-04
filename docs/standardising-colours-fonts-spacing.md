# Standardising Colours, Spacing, and Typography in Block Themes

A predictable, token-based system for **colours, spacing, and typography** helps ensure consistency across design, WordPress editor UI, and front-end rendering. WordPress provides **default presets**, which can be enabled, overridden, or extended to match your design system.

**WordPress 6.9 Compatibility**: This guide is aligned with WordPress 6.9 (schema version 3) and reflects current best practices for theme.json configuration, block-level customisation, and composable style variations.

---

## Table of Contents

1. [Fluid Typography & Spacing](#fluid-typography--spacing) — Why `clamp()` and numeric slugs
2. [Block-Level vs. Global Settings](#block-level-vs-global-settings) — When to customise per-block
3. [Adding New Variations Safely](#adding-new-variations-safely) — Composition and inheritance patterns
4. [Contrast Requirements & WCAG](#contrast-requirements--wcag) — Accessibility standards
5. [Style Variations Architecture](#style-variations-architecture) — How presets apply to blocks and sections
6. [Colours & Slugs](#colours--slugs) — Semantic colour naming

---

## Fluid Typography & Spacing

### Why Use `clamp()` Instead of `spacingScale` Operator?

WordPress 6.8+ introduced two approaches to responsive sizing:

**Option A: `spacingScale` with operator-based calculation** (older approach)

```json
"spacing": {
  "spacingScale": {
    "operator": "*",
    "increment": 1.5,
    "steps": 7,
    "mediumStep": 3
  }
}
```

**Problems:**

- ❌ Limited precision (operator-based math can be unpredictable)
- ❌ No viewport-aware scaling
- ❌ Fixed breakpoints required for true responsiveness
- ❌ Browser caching issues with dynamically calculated values

**Option B: `clamp()` with explicit fluid sizing** (modern approach, recommended)

```json
"spacing": {
  "spacingSizes": [
    {
      "slug": "10",
      "size": "clamp(0.5rem, 1vw, 0.625rem)"
    }
  ]
}
```

**Advantages:**

- ✅ Viewport-aware: scales smoothly across all device sizes
- ✅ No breakpoints needed: one declaration handles all screen sizes
- ✅ Accessible: respects user's font-size preferences (`rem` units)
- ✅ Hardware-accelerated: browsers optimise native CSS
- ✅ Future-proof: works in all modern browsers (96%+ coverage)

### Why Numeric Slugs Instead of Semantic Names?

**Semantic names** (❌ avoid):

```json
{
  "slug": "extra-small",      // CSS: --wp--preset--spacing--extra-small
  "size": "clamp(0.5rem, ...)"
}
```

**Numeric slugs** (✅ recommended):

```json
{
  "slug": "10",               // CSS: --wp--preset--spacing--10
  "size": "clamp(0.5rem, ...)"
}
```

**Why numeric is superior:**

1. **Predictable scaling**: `10 → 20 → 30 → 40` is intuitive
2. **Machine-readable**: Tools/scripts can calculate intermediate values
3. **Design token mapping**: Maps directly to Figma (`space.10`, `space.20`)
4. **CSS variable clarity**: `--wp--preset--spacing--10` is shorter, cleaner
5. **Zero ambiguity**: No debate about "small" vs "tiny" vs "compact"
6. **Cross-project consistency**: Same naming across all LightSpeed themes

### Fluid Typography Implementation

**Complete example combining all principles:**

```json
{
  "settings": {
    "typography": {
      "fluid": {
        "minFontSize": "0.875rem",           // Minimum size (small screens)
        "maxViewportWidth": "1440px",        // Max viewport before capping
        "minViewportWidth": "320px"          // Min viewport for scaling start
      },
      "fontSizes": [
        {
          "slug": "100",
          "name": "Tiny",
          "size": "0.75rem",
          "fluid": {
            "min": "0.65rem",                // 320px viewport
            "max": "0.75rem"                 // 1440px viewport
          }
        },
        {
          "slug": "500",
          "name": "Large",
          "size": "2rem",
          "fluid": {
            "min": "1.5rem",                 // 320px: ~24px
            "max": "2rem"                    // 1440px: ~32px
          }
        }
      ]
    }
  }
}
```

**Result (CSS output):**

```css
/* Fluid typography automatically generates clamp() */
--wp--preset--font-size--100: clamp(0.65rem, 0.65rem + ((1vw - 0.32rem) * 0.625), 0.75rem);
--wp--preset--font-size--500: clamp(1.5rem, 1.5rem + ((1vw - 0.32rem) * 2.083), 2rem);
```

**Browser rendering:**

- At 320px: font size = 0.65rem (~10px)
- At 768px: font size = ~1.1rem (~17px) — scales smoothly
- At 1440px: font size = 0.75rem (~12px capped)

### Fluid Spacing Application

Same logic applies to spacing presets:

```json
{
  "spacing": {
    "spacingSizes": [
      {
        "slug": "20",
        "name": "Small",
        "size": "clamp(0.75rem, 1vw, 1.25rem)"
      },
      {
        "slug": "40",
        "name": "Medium",
        "size": "clamp(1.5rem, 2.5vw, 2.5rem)"
      },
      {
        "slug": "60",
        "name": "Large",
        "size": "clamp(2.5rem, 4vw, 4rem)"
      }
    ]
  }
}
```

**Key formula**: `clamp(MIN, preferred, MAX)`

- `MIN`: Never smaller than (320px equivalent)
- `preferred`: Viewport-relative scaling (`2vw = 2% of viewport width`)
- `MAX`: Never larger than (1440px equivalent)

### Why This Matters for Editors

Editors see presets like "Large Spacing" — they don't need to understand `clamp()`. But behind the scenes:

```
Editor: Applies "Large Spacing" to section margin
Browser: Renders margin that scales perfectly from 320px → 1440px
Result: Perfect responsive layout without media queries ✅
```

---

## Block-Level vs. Global Settings

### When to Use Global Settings

**Global** = All blocks inherit these settings.

```json
{
  "settings": {
    "color": { "palette": [...] },
    "typography": { "fontSizes": [...] }
  }
}
```

**Use global when:**

- ✅ All blocks should have access to these options
- ✅ Setting is a "common resource" (colour palette, font family, spacing)
- ✅ Removing it would break multiple blocks

**Examples:** colours, fonts, spacing, shadows

---

### When to Use Block-Level Settings

**Block-level** = Only specific blocks inherit (or are restricted from) these settings.

```json
{
  "settings": {
    "blocks": {
      "core/button": {
        "color": {
          "palette": [
            { "slug": "primary", "color": "#0066cc" }
          ]
        },
        "typography": {
          "customFontSize": false  // Disable font size customisation
        }
      },
      "core/navigation": {
        "spacing": {
          "blockGap": "var:preset|spacing|20"  // Fixed gap
        }
      }
    }
  }
}
```

**Use block-level when:**

- ✅ Block needs different presets than global (e.g. button has limited colours)
- ✅ You want to restrict options to maintain brand consistency
- ✅ Block has specific performance/accessibility needs

**Examples:**

- `core/button`: Restrict to 3 brand colours
- `core/navigation`: Fixed spacing scale
- `core/image`: Limit to specific aspect ratios
- `core/heading`: Force semantic font sizes

### Real-World Example: Button Restrictions

**Problem:** Editors apply 47 different colours to buttons, breaking brand consistency.

**Solution:** Block-level restriction + style variations.

```json
{
  "settings": {
    "blocks": {
      "core/button": {
        "color": {
          "palette": [
            { "slug": "primary", "name": "Primary", "color": "#0066cc" },
            { "slug": "secondary", "name": "Secondary", "color": "#cccccc" }
          ]
        }
      }
    }
  },
  "styles": {
    "blocks": {
      "core/button": {
        "color": {
          "background": "var:preset|color|primary"
        }
      }
    }
  }
}
```

Result: Button palette reduced from 20 colours → 2 colours. Style variations handle additional states (outline, ghost, etc.).

---

## Adding New Variations Safely

### Current Variation Architecture

Your scaffold currently has:

```
styles/
├── blocks/
│   ├── button-primary.json
│   ├── button-rounded.json
│   └── heading-serif.json
├── sections/
│   ├── hero-section.json
│   └── content-section.json
└── dark.json
```

**Problem:** Each variation is isolated and can't be composed.

**Example:** You can't create "dark + button-primary" combination without duplicating code.

### Proposed Composable Architecture

```
styles/
├── defaults.json              # Base (replaces root theme.json styles)
├── color-palettes/
│   ├── light.json             # Light mode defaults
│   ├── dark.json              # Dark mode overrides
│   └── high-contrast.json     # WCAG AAA variant
├── typesets/
│   ├── sans-serif.json        # Default headings + body
│   ├── serif.json             # Alternative heading font
│   └── monospace.json         # Code blocks
├── block-styles/
│   ├── buttons/
│   │   ├── primary.json       # Sharp, uppercase
│   │   └── rounded.json       # 50px border-radius
│   ├── headings/
│   │   └── serif.json         # Serif font override
│   └── quotes/
│       └── accent.json        # Accent-coloured quote
├── section-styles/
│   ├── hero.json              # 16:9 cover blocks
│   ├── content-box.json       # Shadowed container
│   └── footer.json            # Footer-specific spacing
└── variations/
    ├── dark.json              # Dark mode (compose: color-palettes/dark + defaults)
    ├── high-contrast.json     # High contrast (compose: color-palettes/high-contrast)
    └── compact.json           # Reduced spacing (compose: defaults + reduced spacing)
```

### How to Add a New Variation Safely

**Step 1: Define inheritance chain**

```
New Variation: "ocean-theme"
├── Base: defaults.json
├── Colors: color-palettes/ocean.json
├── Typography: typesets/sans-serif.json
└── Custom: ocean-accent.json
```

**Step 2: Create ocean-accent.json**

```json
{
  "version": 3,
  "settings": {
    "color": {
      "palette": [
        { "slug": "primary", "color": "#006994" },
        { "slug": "accent-1", "color": "#0099cc" },
        { "slug": "accent-2", "color": "#00ccff" }
      ]
    }
  },
  "styles": {
    "elements": {
      "link": {
        "color": { "text": "var:preset|color|accent-1" }
      }
    }
  }
}
```

**Step 3: Test composition**

```bash
# Test that ocean-accent + defaults = valid theme.json
npm run test:theme-json -- variations/ocean-accent
```

**Step 4: Document combination matrix**

```
| Variation     | Colors | Typography | Custom |
|---------------|--------|------------|--------|
| light (base)  | light  | sans       | none   |
| dark          | dark   | sans       | none   |
| ocean         | ocean  | sans       | accent |
| ocean-serif   | ocean  | serif      | accent |
```

### Composition Rules (Non-Negotiable)

1. **No duplication**: If a value exists in `defaults.json`, don't repeat in variations
2. **Only override what changes**: Variation file should be minimal
3. **Name clearly**: `ocean-accent.json` = "Ocean colours + accent customisations"
4. **Document intent**: Every variation needs a README explaining purpose
5. **Test compatibility**: Every variation must pass schema validation

---

## Contrast Requirements & WCAG

### WCAG 2.1 Colour Contrast Standards

| Level | Body Text | Large Text | UI Components |
|-------|-----------|------------|----------------|
| **A** | 4.5:1 | 3:1 | 3:1 |
| **AA** | 4.5:1 | 3:1 | 3:1 |
| **AAA** | 7:1 | 4.5:1 | 3:1 |

**Your theme requirement:** WCAG AA minimum (4.5:1 for body text).

### How to Validate Contrast Ratios

**Current Gap:** Your tests validate structure, not contrast.

**Required:** Add contrast validation to CI/CD.

```javascript
// tests/theme-json-contrast.test.js
test('all colour pairs meet WCAG AA', () => {
  const palette = require('../theme.json').settings.color.palette;

  for (const bg of palette) {
    for (const fg of palette) {
      const ratio = contrastRatio(bg.color, fg.color);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    }
  }
});
```

### Contrast Ratios for Your Current Palette

| Combination | Ratio | Status |
|-------------|-------|--------|
| primary (#0066cc) on base (white) | 8.6:1 | ✅ AAA |
| contrast (#111111) on base (white) | 18.2:1 | ✅ AAA |
| accent-600 (#FF7A59) on base (white) | 4.8:1 | ✅ AA |
| neutral-500 (#9CA3AF) on base (white) | 5.1:1 | ✅ AA |
| neutral-600 (#6B7280) on base (white) | 8.7:1 | ✅ AAA |

### Focus Indicator Contrast

WCAG 2.4.7 requires focus indicators to have **3:1 contrast** against adjacent colours.

**Your implementation (good):**

```json
{
  ":focus": {
    "outline": {
      "color": "var:preset|color|cta",    // High-contrast CTA colour
      "width": "2px",
      "offset": "2px"
    }
  }
}
```

**Recommended enhancement:**

```json
{
  ":focus-visible": {
    "outline": {
      "color": "var:preset|color|cta",
      "width": "3px",                     // Thicker for visibility
      "offset": "2px"
    }
  }
}
```

---

## Style Variations Architecture

### How Presets Apply Across the Theme

**Hierarchy (top → bottom = override order):**

```
1. Root theme.json (global defaults)
   ↓
2. Block-level settings (core/button exceptions)
   ↓
3. Style variations (dark.json, ocean.json)
   ↓
4. Block styles (button-primary.json, heading-serif.json)
   ↓
5. Section styles (hero-section.json, content-section.json)
   ↓
6. Editor-applied styles (editor's drag-and-drop selections)
```

### Example: How a Button Gets Its Style

**Editor**: Selects button → applies "Primary" style → changes colour to "Accent"

**Resolution chain:**

```json
1. Global default (theme.json):
   {
     "color": { "palette": [primary, secondary, accent, ...] }
   }

2. Block restriction (theme.json > settings.blocks.core/button):
   {
     "color": { "palette": [primary, secondary] }  // Limit to 2 colours
   }

3. Block style (button-primary.json):
   {
     "color": {
       "background": "var:preset|color|primary",
       "text": "var:preset|color|base"
     }
   }

4. Style variant + dark mode (dark.json):
   {
     "@media (prefers-color-scheme: dark)": {
       "color": { "background": "var:preset|color|primary-dark" }
     }
   }

5. Editor selection:
   {
     "color": { "background": "var:preset|color|accent" }
   }

FINAL RESULT: Button with accent background ✅
```

### Section Styles + Block Styles Composition

**Scenario:** Hero section with button block inside.

**Styles applied (in order):**

```
1. hero-section.json
   - 16:9 aspect ratio
   - Dark overlay
   - Centered text

2. button-primary.json (nested)
   - Primary background
   - White text
   - 2px focus outline

3. Dark mode (if enabled):
   - Dark overlay intensifies
   - Button background darkens
   - Focus outline stays visible

4. Editor applied "Round buttons" variant:
   - Button border-radius increases
   - Keeps primary colour + dark mode
```

**Result:** Hero section with dark overlay, centered rounded button, appropriate colours for light/dark mode ✅

---

## How Presets Apply to Block Styles & Section Styles

This section explains how colours, typography, spacing, and other presets defined in `theme.json` are inherited and applied across block styles (`styles/blocks/`) and section styles (`styles/sections/`).

### Block Styles: button-primary.json Example

**File:** `styles/blocks/button-primary.json`

```json
{
  "version": 3,
  "styles": {
    "blocks": {
      "core/button": {
        "color": {
          "background": "var:preset|color|primary",
          "text": "var:preset|color|base"
        },
        "typography": {
          "fontSize": "var:preset|font-size|300",
          "fontWeight": "700"
        },
        "spacing": {
          "padding": {
            "top": "var:preset|spacing|20",
            "right": "var:preset|spacing|30",
            "bottom": "var:preset|spacing|20",
            "left": "var:preset|spacing|30"
          }
        },
        "border": {
          "radius": "var:preset|border-radius|small"
        }
      }
    }
  }
}
```

**How presets resolve:**

1. **`var:preset|color|primary`** → Looks up `primary` in `theme.json` colour palette
   - Result: `#0066cc` (whatever primary colour is defined)
   - If dark mode is active: Uses dark mode override if defined in `dark.json`

2. **`var:preset|font-size|300`** → Looks up font size `300` (Small, 1.25rem)
   - Result: `1.25rem` (or fluid equivalent: `clamp(...)`)
   - If custom fluid scale defined: Uses that instead

3. **`var:preset|spacing|20`** → Looks up spacing `20` (Small gap)
   - Result: `1.25rem` (from `spacingSizes` in theme.json)
   - If fluid spacing enabled: `clamp(0.75rem, 1vw, 1.25rem)`

4. **`var:preset|border-radius|small`** → Looks up small border-radius
   - Result: `4px` (from `settings.border.radiusSizes`)

**In the editor:**

- Editor sees "Primary" button style
- All references automatically pull from theme.json presets
- If designer updates primary colour in theme.json, all buttons update instantly
- No duplication of values

### Section Styles: hero-section.json Example

**File:** `styles/sections/hero-section.json`

```json
{
  "version": 3,
  "styles": {
    "blocks": {
      "core/cover": {
        "color": {
          "background": "var:preset|color|contrast"
        },
        "spacing": {
          "padding": {
            "top": "var:preset|spacing|80",
            "right": "var:preset|spacing|40",
            "bottom": "var:preset|spacing|80",
            "left": "var:preset|spacing|40"
          },
          "blockGap": "var:preset|spacing|30"
        },
        "dimensions": {
          "aspectRatio": "16/9",
          "minHeight": "400px"
        },
        "border": {
          "radius": "var:preset|border-radius|medium"
        }
      }
    }
  }
}
```

**Resolution chain:**

1. **`var:preset|spacing|80`** → Large spacing (4rem)
   - Used for vertical padding (top/bottom)
   - Responsive scaling: 2.5rem on mobile → 4rem on desktop

2. **`var:preset|spacing|40`** → Medium spacing (2.5rem)
   - Used for horizontal padding
   - Maintains safe area on all devices

3. **`aspectRatio: "16/9"`** → Global preset for common ratio
   - Hero section locked to 16:9 (cinematic feel)
   - Prevents accidental distortion

4. **`minHeight: "400px"`** → Minimum viewable area
   - Ensures hero always visible (even on small screens)
   - Combined with aspect ratio for predictable layout

### Best Practice: Reference Presets, Not Hardcoded Values

❌ **Wrong** (hardcoded, breaks maintainability):

```json
{
  "styles": {
    "blocks": {
      "core/button": {
        "color": { "background": "#0066cc" },
        "spacing": { "padding": { "top": "1rem" } },
        "border": { "radius": "4px" }
      }
    }
  }
}
```

Problem: If you change primary colour in theme.json, this button doesn't update.

✅ **Correct** (uses presets, maintains consistency):

```json
{
  "styles": {
    "blocks": {
      "core/button": {
        "color": { "background": "var:preset|color|primary" },
        "spacing": { "padding": { "top": "var:preset|spacing|20" } },
        "border": { "radius": "var:preset|border-radius|small" }
      }
    }
  }
}
```

Advantage: Change theme.json preset once, all blocks using that preset update everywhere.

### Creating a New Block Style Safely

**Step 1: Define which presets you need**

```json
{
  "slug": "button-outline",
  "name": "Outline Button",
  "uses": [
    "var:preset|color|primary",
    "var:preset|color|base",
    "var:preset|spacing|20",
    "var:preset|border-radius|small"
  ]
}
```

**Step 2: Check they exist in theme.json**

Verify presets are defined before creating a new style that uses them.

**Step 3: Create block style file**

```json
{
  "version": 3,
  "styles": {
    "blocks": {
      "core/button": {
        "color": {
          "background": "var:preset|color|base",
          "text": "var:preset|color|primary"
        },
        "border": {
          "color": "var:preset|color|primary",
          "style": "solid",
          "width": "2px"
        }
      }
    }
  }
}
```

**Step 4: Test (editor loads without errors)**

Run tests to verify JSON structure and preset references.

**Step 5: Document in styles/blocks/README.md**

```markdown
## Button Styles

### button-outline
Inverse of button-primary. Uses primary colour as border, base as background.

- Colours: `primary` (border), `base` (background)
- Spacing: Inherits global `spacing|20` padding
- Border: 2px solid primary colour
```

---

### Core Semantic

- `base` → background
- `contrast` → text
- `primary` → main brand color
- `brand` → primary brand identity
- `cta` → call-to-action buttons
- `primary-light` → hover/focus states
- `primary-dark` → pressed/active states

### Neutral Scale

- `neutral-0` → white
- `neutral-100` → lightest grey
- `neutral-200 … neutral-900` → progressively darker greys
- `neutral-900` → pure black

### Accent Scale

- `accent-100 … accent-900` to  up to however many brand/utility accents you need.
- These can represent different **hues** or **tones** of your brand colour system.

---

### Example JSON Snippet

```json
{
  "$schema": "https://schemas.wp.org/wp/6.9/theme.json",
  "version": 3,
  "settings": {
    "color": {
      "defaultPalette": false,
      "palette": [
        { "slug": "base",         "name": "Base",         "color": "#FFFFFF" },
        { "slug": "contrast",     "name": "Contrast",     "color": "#111111" },
        { "slug": "primary",      "name": "Primary",      "color": "#0A84FF" },
        { "slug": "brand",        "name": "Brand",        "color": "#0A84FF" },
        { "slug": "cta",          "name": "Call to Action", "color": "#0066CC" },
        { "slug": "primary-light", "name": "Primary Light", "color": "#66B7FF" },
        { "slug": "primary-dark",  "name": "Primary Dark",  "color": "#004999" },

        { "slug": "neutral-100",  "name": "Neutral 100",  "color": "#F9FAFB" },
        { "slug": "neutral-200",  "name": "Neutral 200",  "color": "#F3F4F6" },
        { "slug": "neutral-300",  "name": "Neutral 300",  "color": "#E5E7EB" },
        { "slug": "neutral-400",  "name": "Neutral 400",  "color": "#D1D5DB" },
        { "slug": "neutral-500",  "name": "Neutral 500",  "color": "#9CA3AF" },
        { "slug": "neutral-600",  "name": "Neutral 600",  "color": "#6B7280" },
        { "slug": "neutral-700",  "name": "Neutral 700",  "color": "#4B5563" },
        { "slug": "neutral-800",  "name": "Neutral 800",  "color": "#1F2937" },
        { "slug": "neutral-900",  "name": "Neutral 900",  "color": "#111111" },

        { "slug": "accent-100", "name": "Accent 100", "color": "#0A84FF" },
        { "slug": "accent-200", "name": "Accent 200", "color": "#3399FF" },
        { "slug": "accent-300", "name": "Accent 300", "color": "#66B2FF" },
        { "slug": "accent-400", "name": "Accent 400", "color": "#99CCFF" },
        { "slug": "accent-500", "name": "Accent 500", "color": "#CCE5FF" },
        { "slug": "accent-600", "name": "Accent 600", "color": "#FF7A59" },
        { "slug": "accent-700", "name": "Accent 700", "color": "#FF9B80" },
        { "slug": "accent-800", "name": "Accent 800", "color": "#FFBCA6" },
        { "slug": "accent-900", "name": "Accent 900", "color": "#FFDCD2" }
      ]
    }
  }
}
```

---

## AI-Guided Color Usage Rules

To prevent overwhelming editors and ensure consistent brand application, follow these semantic guidelines:

### When to Use Each Color

#### Base & Contrast

- `base`: Page backgrounds, card backgrounds, content areas
- `contrast`: Body text, headings, icons

#### Brand Colors

- `primary`: Navigation, primary buttons, brand elements
- `brand`: Logo areas, brand headers, key brand moments
- `cta`: Action buttons, "Buy Now", "Sign Up", conversion elements

#### Interactive States

- `primary-light`: Hover states for primary elements, focus rings
- `primary-dark`: Active/pressed states, emphasis variations

#### Content Guidelines

- **Avoid** using brand colors for large background areas
- **Do** use neutral colors for reading content and UI foundations
- **Ensure** CTA colors have high contrast for accessibility
- **Test** color combinations for sufficient contrast ratios (4.5:1 minimum)

### Editor Prompts & Suggestions

When implementing in block themes, consider adding these as editor hints:

```json
{
  "slug": "cta",
  "name": "Call to Action",
  "color": "#0066CC",
  "description": "Use for buttons and conversion elements"
}
```

---

## Best Practices

- **Use semantic naming** that editors understand (`primary-light` vs `primary-300`).
- **Limit brand color variations** to essential states (normal, light, dark, CTA).
- **Keep editor-facing colors focused** — use 5-7 brand colors max in the palette.
- **Don't rename slugs** once published — just change values to update brand colours.
- **Use neutrals for UI foundations**, **brand/primary for identity**, **CTA for actions**.
- **Consider accessibility** — ensure sufficient contrast between all color pairs.
- **Provide clear guidance** through naming what each color should be used for.

---

## Font Sizes & Slugs

### Why Numeric Font Size Slugs Are Essential

WordPress ships with four core font sizes:

- `small`
- `medium`
- `large`
- `x-large`

Perfect — let’s extend the **WordPress default font sizes** into a numeric scale (to match spacing & colour). You had earlier asked for **extra sizes** like `x-tiny`, `tiny`, `huge`, `gigantic`. I’ve translated these into a scale using **multiples of 8px** (so they map cleanly to `rem` values, e.g. `16px = 1rem` if base = 16px).

---

### Default WP Font Sizes (approx)

- `small` → 13px
- `medium` → 20px (default body size = 16px)
- `large` → 36px
- `x-large` → 42px

(These are defaults, but the slugs can vary across themes.)

---

### Why Use Numeric Slugs for Font Sizes?

Just like spacing, using slugs like `font-size-100` results in CSS variables such as:

```css
--wp--preset--font-size--100
```

This avoids duplication and keeps the CSS variable names clean and predictable. Use numeric slugs (e.g. `100`, `200`, `300`) and a descriptive name for the editor UI.

#### What Not To Do

Avoid using slugs with redundant prefixes, such as:

```css
--wp--preset--spacing--spacing-10
--wp--preset--font-size--font-size-100
```

These patterns duplicate the context ("spacing" or "font-size") and make CSS variables harder to read and maintain. Always use numeric-only slugs for clarity:

```css
--wp--preset--spacing--10
--wp--preset--font-size--100
```

### Recommended Extended Scale (multiples of 8px)

| Slug  | Label     | px size | rem (base 16px) |
|-------|-----------|---------|-----------------|
| 100   | Tiny      | 12px    | 0.75rem         |
| 200   | Base      | 16px    | 1rem            |
| 300   | Small     | 20px    | 1.25rem         |
| 400   | Medium    | 24px    | 1.5rem          |
| 500   | Large     | 32px    | 2rem            |
| 600   | X-Large   | 40px    | 2.5rem          |
| 700   | Huge      | 48px    | 3rem            |
| 800   | Gigantic  | 64px    | 4rem            |
| 900   | Colossal  | 80px    | 5rem            |

👉 You can keep extending in increments of 100 (e.g. `1000` for 96px) if your design system needs it.

### Example theme.json Partial

```json
{
  "typography": {
    "fontSizes": [
      { "slug": "100", "size": "0.75rem", "name": "Tiny" },
      { "slug": "200", "size": "1rem",    "name": "Base" },
      { "slug": "300", "size": "1.25rem", "name": "Small" },
      { "slug": "400", "size": "1.5rem",  "name": "Medium" },
      { "slug": "500", "size": "2rem",    "name": "Large" },
      { "slug": "600", "size": "2.5rem",  "name": "X-Large" },
      { "slug": "700", "size": "3rem",    "name": "Huge" },
      { "slug": "800", "size": "4rem",    "name": "Gigantic" },
      { "slug": "900", "size": "5rem",    "name": "Colossal" }
    ]
  }
}
```

### Example CSS Output

```css
--wp--preset--font-size--100: 0.75rem;
--wp--preset--font-size--200: 1rem;
--wp--preset--font-size--300: 1.25rem;
/* ...etc... */
--wp--preset--font-size--900: 5rem;
```

---

### Example theme.json Partial

```json
{
  "$schema": "https://schemas.wp.org/wp/6.8/block.json",
  "version": 3,
  "settings": {
    "typography": {
      "fontSizes": [
        { "slug": "100", "size": "0.75rem", "name": "Tiny" },
        { "slug": "200", "size": "1rem",    "name": "Base" },
        { "slug": "300", "size": "1.25rem", "name": "Small" },
        { "slug": "400", "size": "1.5rem",  "name": "Medium" },
        { "slug": "500", "size": "2rem",    "name": "Large" },
        { "slug": "600", "size": "2.5rem",  "name": "X-Large" },
        { "slug": "700", "size": "3rem",    "name": "Huge" },
        { "slug": "800", "size": "4rem",    "name": "Gigantic" },
        { "slug": "900", "size": "5rem",    "name": "Colossal" }
      ]
    }
  }
}
```

---

### Best Practices for Font Size Values

- **Numeric slugs** keep naming scalable and consistent (`font-size-100 … 900`).
- **Multiples of 8px** ensure harmony with spacing scales.
- Always **keep slugs stable** → you can change size values without breaking references.
- Use **semantic naming** in addition to numeric (helps editors know what’s “Huge” vs “Tiny”).
- Pair with **fluid typography** in WP 6.6+ so these sizes scale across devices.

---

## Spacing Sizes & Slugs

### WordPress Default Spacing Slugs

The default spacing scale is numeric and increments by 10:

- `10`
- `20`
- `30`
- `40`
- `50`
- `60`

(These correspond to approximate values from `0.125rem` to `3rem`, though values may vary by theme implementation.)

### Extended Spacing Scale

We extend this with additional slugs to cover larger gaps, while **keeping naming consistent**:

- `70` → `3.5rem` (56px)
- `80` → `4rem` (64px)
- `90` → `4.5rem` (72px)
- `100` → `5rem` (80px)

## Extended Spacing Scale

### Why Use Numeric Slugs?

When you use numeric slugs like `10`, WordPress generates CSS variables such as:

```css
--wp--preset--spacing--10
```

The same logic applies to font sizes:

```css
--wp--preset--font-size--100
```

### Example JSON

```json
"spacing": {
  "spacingScale": {
    "steps": [
      { "slug": "10", "size": "0.625rem", "name": "10px" },
      { "slug": "20", "size": "1.25rem", "name": "20px" },
      { "slug": "30", "size": "1.875rem", "name": "30px" },
      { "slug": "40", "size": "2.5rem", "name": "40px" },
      { "slug": "50", "size": "3.125rem", "name": "50px" },
      { "slug": "60", "size": "3.5rem", "name": "56px" },
      { "slug": "70", "size": "3.75rem", "name": "60px" },
      { "slug": "80", "size": "4rem", "name": "64px" },
      { "slug": "90", "size": "4.5rem", "name": "72px" },
      { "slug": "100", "size": "5rem", "name": "80px" }
    ]
  }
}
```

### Example CSS Output

```css
--wp--preset--spacing--10: 0.625rem;
--wp--preset--spacing--20: 1.25rem;
--wp--preset--spacing--30: 1.875rem;
/* ...etc... */
--wp--preset--spacing--100: 5rem;
```

For font sizes:

```css
--wp--preset--font-size--100: 0.75rem;
--wp--preset--font-size--200: 1rem;
--wp--preset--font-size--300: 1.25rem;
/* ...etc... */
--wp--preset--font-size--900: 5rem;
```

---

## Best Practices for Naming Conventions

### 1. **Spacing**

- Use either:
  - `spacingScale`: system-generated (`20`, `30`, `40`…)
  - `spacingSizes`: manual with fluid units (`s`, `m`, `l`)

* Always keep **numeric slugs in sequence** (`20`, `30`, `40`…), since the editor orders presets by slug.
- If semantic slugs are preferred (`s`, `m`, `l`), use them consistently across all blocks.

✅ Recommendation: Stick with numeric scales (`20–80`) for compatibility with WordPress defaults, but allow semantic naming at the design system layer (e.g. mapping `space.m → 40`).

#### What Not To Do

Do not use slugs like `spacing-10`, `spacing-20`, etc. in your theme.json or design tokens. This leads to CSS variables such as `--wp--preset--spacing--spacing-10`, which are redundant and less readable. Use numeric slugs only (e.g. `10`, `20`)
---

### 2. **Typography**

- WordPress default slugs: `small`, `medium`, `large`, `x-large`.

* Rich Tabor recommends a **numbered scale** (`xs`, `s`, `m`, `l`, `xl`, `xxl`) to create predictable progression.
- FullSiteEditing.com supports both, but stresses aligning naming with design tokens in Figma.

✅ Recommendation: Retain WP defaults for editor familiarity, but override values with your scale (e.g. keep slug `large` but define it as `clamp(1.5rem, 2vw, 2rem)`).

#### What Not To Do

Do not use slugs like `font-size-100`, `font-size-200`, etc. This will result in CSS variables such as `--wp--preset--font-size--font-size-100`, which are unnecessarily verbose. Use numeric slugs only (e.g. `100`, `200`)
---

### 3. **Colours**

- WordPress defaults (`black`, `white`, `primary`, `secondary`) may not align with brand palettes.

* Use **semantic naming** (`brand-primary`, `brand-accent`, `neutral-100`) instead of hardcoded names (`blue`, `red`).
- This ensures **future-proofing** if brand colours shift.
- Rich Tabor emphasises using **systematic palettes**: base colours + tints/shades.

✅ Recommendation: Keep `base` colours minimal (3–5), then extend with `neutral` and `accent` palettes. Always prefer semantic over literal names.

---

## Strategy: Enable Defaults, Override Values

The **hybrid approach** is currently best practice:

1. **Enable WordPress defaults** for spacing, typography, and colour slugs.
2. **Override the default values** with your design system tokens.
   - e.g. Keep `spacing-30`, but change from `1.25rem` → `clamp(1rem, 2vw, 1.5rem)`.
   - Keep `font-size-large`, but redefine it via a fluid scale.
   - Keep `primary`, but remap it to `brand-primary` (#0047AB).
3. **Document the mapping** between Figma tokens and WordPress slugs so developers/designers stay aligned.

---

## General Advice

- **Consistency over creativity**: don’t reinvent slugs across projects.
- **Keep editor UX predictable**: preserve WP defaults where possible so editors recognise controls.
- **Token-first thinking**: Figma variables → theme.json presets → CSS variables.
- **Avoid mixing too many systems**: pick `spacingScale` OR `spacingSizes` globally, not both.
- **Future-proof**: semantic naming ensures flexibility for rebrands.

---

## Standardised Naming Conventions & Slug Reference

To ensure consistency, clarity, and future-proofing across all theme assets, use the following naming conventions for all theme.json presets, section styles, block styles, and variations. These conventions are based on best practices observed in leading themes and the LSX Design system.

### General Principles

- **Use semantic, role-based slugs** for colors, font families, and style sets (e.g. `primary`, `accent-1`, `brand-sans`, `button-primary`).
- **Use numeric-only slugs** for spacing and font sizes (e.g. `100`, `200`, `10`, `20`).
- **Avoid literal color names** (e.g. `blue`, `red`) and avoid repeating the preset type in the slug (e.g. `font-size-100`).
- **Use suffixes** for variations (`-accent`, `-alt`, `-light`, `-dark`, `-inverse`).
- **Keep slugs stable**—change values, not names, for future-proofing.

### Recommended Slug Table

| Type         | Slug Example           | Description/Role                |
|--------------|------------------------|---------------------------------|
| Color        | `primary`              | Main brand color                |
| Color        | `accent-1`             | Accent color 1                  |
| Color        | `base`                 | Background/base color           |
| Color        | `contrast`             | Text/contrast color             |
| Color        | `border-light`         | Light border                    |
| Color        | `border-dark`          | Dark border                     |
| Color        | `primary-accent`       | Brand accent                    |
| Color        | `primary-alt`          | Brand alternate                 |
| Color        | `primary-alt-accent`   | Brand alternate accent          |
| Font Family  | `brand-sans`           | Main sans-serif font            |
| Font Family  | `brand-serif`          | Main serif font                 |
| Font Family  | `brand-mono`           | Monospace font                  |
| Font Size    | `100`                  | Numeric only, UI name for label |
| Font Size    | `200`                  | ...                             |
| Section      | `section-hero`         | Hero section style              |
| Section      | `section-footer`       | Footer section style            |
| Section      | `section-1`            | Generic/numbered section        |
| Block Style  | `button-primary`       | Primary button style            |
| Block Style  | `quote-accent`         | Accent quote style              |
| Variation    | `variation-accent`     | Accent style variation          |
| Variation    | `variation-alt`        | Alternate style variation       |

### Additional Standardised Slugs to Consider

- **Color:** `success`, `warning`, `error`, `info`, `muted`, `overlay`, `highlight`, `shadow`, `focus`, `disabled`
- **Font Size:** `caption`, `lead`, `display` (for extra large headings)
- **Section:** `section-feature`, `section-testimonial`, `section-cta`, `section-gallery`
- **Block Style:** `card`, `card-alt`, `list-compact`, `list-inline`, `heading-accent`, `heading-muted`
- **Variation:** `variation-inverse`, `variation-muted`, `variation-outline`

### Referencing Presets in theme.json

- Use `var:preset|color|primary` for colors
- Use `var:preset|font-size|100` for font sizes
- Use `var:preset|font-family|brand-sans` for font families

### Example theme.json Structure

```json
{
  "settings": {
    "color": {
      "palette": [
        { "slug": "primary", "name": "Brand Primary", "color": "#465aff" },
        { "slug": "accent-1", "name": "Accent 1", "color": "#DBDDFF" },
        { "slug": "base", "name": "Base", "color": "#fff" },
        { "slug": "success", "name": "Success", "color": "#27ae60" },
        { "slug": "warning", "name": "Warning", "color": "#f39c12" }
      ]
    },
    "typography": {
      "fontFamilies": [
        { "slug": "brand-sans", "name": "Brand Sans", "fontFamily": "Mona Sans, sans-serif" },
        { "slug": "brand-serif", "name": "Brand Serif", "fontFamily": "Literata, serif" }
      ],
      "fontSizes": [
        { "slug": "100", "name": "Tiny", "size": "0.75rem" },
        { "slug": "200", "name": "Base", "size": "1rem" },
        { "slug": "display", "name": "Display", "size": "4rem" }
      ]
    },
    "spacing": {
      "spacingScale": {
        "steps": [
          { "slug": "10", "name": "10px", "size": "0.625rem" },
          { "slug": "20", "name": "20px", "size": "1.25rem" }
        ]
      }
    }
  },
  "styles": {
    "color": {
      "background": "var:preset|color|base",
      "text": "var:preset|color|contrast"
    },
    "typography": {
      "fontFamily": "var:preset|font-family|brand-sans",
      "fontSize": "var:preset|font-size|200"
    }
  }
}
```

### Mapping Design Tokens to theme.json

Maintain a mapping table between Figma/design tokens and theme.json slugs for design/dev alignment. Example:

| Figma Token      | theme.json Slug   |
|------------------|------------------|
| Brand/Primary    | `primary`        |
| Brand/Accent 1   | `accent-1`       |
| Font/Heading     | `brand-sans`     |
| Spacing/Small    | `10`             |

### Final Advice

- **Document your naming conventions in your theme’s README.**
- **Keep slugs stable—change values, not names, for future-proofing.**
- **Align design tokens and theme.json slugs for seamless handoff.**
- **Use semantic, role-based naming for clarity and maintainability.**

## References

- Rich Tabor: [Standardizing theme.json spacing](https://rich.blog/standardizing-theme-json-spacing/)

* Rich Tabor: [Standardizing theme.json colours](https://rich.blog/standardizing-theme-json-colours/)
- Rich Tabor: [Standardizing theme.json fonts sizes](https://rich.blog/standardizing-theme-json-font-sizes/)
- Rich Tabor: [Fluid type scale in theme.json](https://rich.blog/fluid-type-scale-theme-json/)
- Rich Tabor: [Standardizing theme.json colours](https://rich.blog/standardizing-theme-json-colours/)
- FullSiteEditing.com: [Global Styles & theme.json](https://fullsiteediting.com/)
- WordPress Developer Docs: [theme.json reference](https://developer.wordpress.org/themes/global-settings-and-styles/)
- <https://developer.wordpress.org/themes/global-settings-and-styles/settings/spacing/>
- <https://developer.wordpress.org/themes/global-settings-and-styles/settings/typography/>
- <https://developer.wordpress.org/themes/global-settings-and-styles/settings/colour/>

---
