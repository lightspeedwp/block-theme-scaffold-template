
# JSON, Theme.json & Block.json Configuration & Validation Guidelines

This document merges all JSON formatting, configuration, and validation best practices for block themes, including `theme.json`, `block.json`, and general JSON usage.

---

## General JSON Formatting & Schema Rules
- Use 2-space indent; no trailing commas.
- Validate all JSON files with JSON Schema tools.
- Follow the schemas for `theme.json` and `block.json`.
- Use semantic and numeric tokens for theme/block references.
- Prefer tokens/presets over hardcoded values.

---

## 1. Structure & Organization
- Use `$schema` and `version` at the top level.
- Organize settings: typography, color, spacing, custom properties.
- Use semantic tokens and consistent naming for slugs.
- Document color usage and design decisions.
- Validate theme.json syntax regularly.

## 2. Typography System
- Use numeric slugs for font sizes (100–900).
- Enable fluid typography and provide min/max values.

## 3. Color System
- Use semantic color names (base, contrast, primary, secondary, etc.).
- Provide neutral and accent scales with correct naming.

## 4. Spacing System
- Use numeric slugs for spacing sizes (10–100).
- Use clamp() for fluid spacing.

## 5. Style Variations
- Define styles array with expected variations (default, dark, etc.).
- Use numeric token references in styles.

## 6. Validation Process

**Role**: Theme JSON Validation Agent (WordPress, trunk schema)
**Scope**: Validate the root `theme.json` and all JSON files under `/styles/**`.

### Process
1. **Load schema**: Fetch and cache `https://schemas.wp.org/trunk/theme.json`; confirm JSON Schema dialect (draft-07). If offline, use a local cached copy.
2. **Discover files**: Include `./theme.json` and all matches of `./styles/**/*.json` (recursive).
3. **Syntax check**: Parse each file; capture file path and the exact offset/line when parsing fails.
4. **Schema validation**: Validate each JSON against the trunk schema; collect all errors (don’t stop at first). Prefer stable ajv error paths.
5. **Semantic rules** (non-schema; actionable only):
	- Duplicate preset slugs across common preset groups (e.g., `settings.color.palette[].slug`, `settings.typography.fontFamilies[].slug`, etc.). Report location(s) and propose unique slugs.
	- Invalid `var:preset|…` references inside style values: verify the referenced slug exists in the corresponding preset list.
	- Unused presets: presets defined but not referenced anywhere in `styles`, `blocks`, or `elements` trees (advisory).
	- Scale consistency checks (optional rule-gates): flag outliers in spacing/typography scales if a project ratio is supplied.
	- Inconsistent font family slugs: slug/name pairs inconsistent across root and variations.
6. **Editor UX guidance**: If missing, suggest adding at the top-level:
	`"$schema": "https://schemas.wp.org/trunk/theme.json", "version": 3`
7. **Output**:
	- Human summary (bullets): counts by error type + most important fixes.
	- Machine-readable errors: `[{ file, jsonPath, message, suggestion }]`.
	- Minimal patches: JSON snippets or JSON Patch (per error) that resolve issues without broad refactors.
8. **Verify**: Apply suggested patches to samples (dry-run), re-validate, ensure “clean” status.
9. **Exit policy**: Return non-zero when schema errors exist; optionally non-zero on enabled semantic rules.

### Guardrails
- UK English; concise. Prefer presets over raw CSS; no broad style rewrites. Clearly mark any breaking changes. Keep diffs minimal and scoped.
- Prefer Node + well-adopted tools; avoid fragile dependencies.
- Always emit a report even if validations fail.

---

## 7. Best Practices
- Ensure minimum contrast ratios for accessibility.
- Use CSS custom properties for runtime theme switching.
- Minimize font families/weights.
- Test with multiple WP versions and devices.

---

## Related Instructions
- See also: [block-theme.instructions.md](./block-theme.instructions.md), [block-json.instructions.md](./block-json.instructions.md), [testing.instructions.md](./testing.instructions.md)
