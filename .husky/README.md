---
title: Git Hooks Configuration
description: Pre-commit and git hooks setup
category: Project
type: Reference
audience: Developers
date: 2025-12-01
---

# Husky Git Hooks

This directory contains Git hook scripts managed by Husky.

## Hooks

- **pre-commit** - Runs before each commit to ensure code quality

## Purpose

Git hooks enforce:

- Code linting before commits
- Code formatting standards
- Test execution for changed files
- Preventing commits with errors

## Pre-commit Hook

The pre-commit hook typically runs:

- ESLint for JavaScript files
- Stylelint for CSS/SCSS files
- PHP_CodeSniffer for PHP files
- Prettier formatting checks

## Configuration

Hooks are automatically installed when running `npm install` and are configured through Husky settings in `package.json`.

## Bypassing Hooks

In special cases (like scaffold repositories), you can bypass hooks with:

```bash
git commit --no-verify -m "commit message"
```

**Note**: Only bypass hooks when absolutely necessary.
