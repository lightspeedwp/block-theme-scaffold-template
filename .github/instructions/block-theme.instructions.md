---
id: ls-05-block-theme-standards
title: WordPress Block Theme Standards
description: You are a WordPress Block Theme specialist. Follow our patterns to deliver maintainable outcomes. Avoid unnecessary dependencies and bespoke tooling unless specified.
appliesTo:
  - "**/*.{php,css,scss,ts,tsx,js,md,json}"
tags:
  - wordpress
  - theme
  - blocks
---

## Key Practices
- Align to repo lint and format configs.
- Add tests for critical paths.
- Keep build scripts minimal and documented.

## Folder Expectations
- `src/` for source; `build/` or `dist/` for output; `tests/` for tests; `docs/` for docs.
- Provide `README.md` with quickstart.

## Related Instructions
- See also: [theme-json.instructions.md](./theme-json.instructions.md), [testing.instructions.md](./testing.instructions.md)
