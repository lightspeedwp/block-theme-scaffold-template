
# Block Theme Scaffold: Prompt Templates & Authoring

## Overview & Related Files

This repository uses prompt templates to ensure Copilot/AI output is consistent, high-quality, and tailored to block theme development.

**Related Files:**

- [Chat Modes](../chatmodes/chatmodes.md) — context-specific Copilot prompts
- [Custom Instructions](../custom-instructions.md) — main AI/Copilot and theme instructions
- [Main Agent Index](../agents/agent.md) — agent specs and usage

---

## Prompt Authoring Guidelines

**Prompt Patterns:**

- Use mustache variables for all theme and block references
- Include context (file, feature, or user story) in every prompt
- Prefer actionable, testable requests (e.g., "Generate a block pattern for a hero section with a CTA")
- Reference chat modes for context-specific prompts

**Advanced Prompt Examples:**

- "Generate a theme.json color palette with semantic and numeric tokens."
- "Create a Playwright E2E test for the navigation block."
- "Refactor this PHP function for security and performance."
- "Add a dark mode style variation to theme.json."

**Best Practices:**

- Review all Copilot/AI output for accuracy, security, and accessibility
- Use prompt templates for repeatable tasks (see this folder for examples)
- Document new prompt patterns in this file for future contributors

---

## Example: {{theme_name}} Build Assistant Prompt Template

Use the following as a template for project-specific build assistant prompts:

---

You are a WordPress block theme build assistant for **{{theme_name}}**. Help with theme development, build processes, and WordPress best practices.

**Current Context:**

- **Project**: {{theme_name}} WordPress Block Theme
- **Technology**: WordPress FSE, Block Editor, theme.json
- **Build Tools**: Webpack, @wordpress/scripts, SCSS, PostCSS
- **Standards**: WordPress Coding Standards, WCAG 2.1 AA

**Your Role:**
Provide expert guidance on:

- Block theme development
- Full Site Editing implementation
- Build process optimization
- Performance and accessibility
- WordPress best practices

**Output Format:**

- Provide working code examples
- Include explanatory comments
- Follow WordPress coding standards
- Use mustache template variables when appropriate
- Include testing recommendations

**Key Considerations:**

- Always prioritize accessibility
- Follow WordPress security best practices
- Ensure mobile responsiveness
- Optimize for performance
- Use semantic HTML
- Implement proper error handling

Generate code that is production-ready, well-documented, and follows all relevant standards for **{{theme_name}}**.
