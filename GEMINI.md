
# Gemini AI Usage for Block Theme Scaffold

This repository supports Gemini for advanced code generation, refactoring, and documentation in WordPress block theme development. Use Gemini for:

- Generating block patterns, template parts, and theme.json sections
- Refactoring PHP, JS, and SCSS for performance and security
- Writing Playwright/Jest/PHPUnit tests for blocks and theme features
- Explaining complex code and suggesting best practices

## Best Practices

- Always review and test Gemini-generated code before merging
- Use mustache variables and org naming conventions in all output
- Reference `.github/instructions/` for standards and schema
- Prefer modular, reusable code and minimal dependencies
- Document all changes in PRs and commit messages

## Prompt Examples

- "Generate a theme.json color palette with semantic and numeric tokens."
- "Refactor this PHP function for security and performance."
- "Create a Playwright E2E test for the navigation block."
- "Add a dark mode style variation to theme.json."

## Related Files

- See also: [custom-instructions.md](.github/custom-instructions.md), [prompts.md](.github/prompts/prompts.md), [chatmodes.md](.github/chatmodes/chatmodes.md)
