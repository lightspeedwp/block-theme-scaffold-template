---
title: Testing Instructions
description: Comprehensive testing standards and practices
category: Project
type: Guide
audience: Developers
date: 2025-12-01
---

# Testing Instructions

## Layers
- **Unit** (PHPUnit/Jest): pure functions, selectors, utils.
- **Integration**: block rendering, REST endpoints, server hooks.
- **E2E** (Playwright): user journeys, editor insert/configure, front-end render.

## Accessibility
- Add axe checks to Playwright suites; zero serious issues.

## Coverage Targets
- Unit: ≥80% lines; Critical branches: ≥90%.
- E2E: critical paths for each pattern/block.

## CI
- Run lint + unit + e2e on PR.
- Upload artefacts (videos, traces) for failing runs.

## Related Instructions
- See also: [playwright-tests.instructions.md](./playwright-tests.instructions.md), [theme-json.instructions.md](./theme-json.instructions.md)
