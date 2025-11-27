# GitHub Actions Workflows

This directory contains GitHub Actions workflow definitions for CI/CD automation.

## Workflows

- **agent-workflow.yml** - AI agent automation workflow
- **block-theme-build-and-e2e.yml** - Build and end-to-end testing workflow
- Additional workflows for testing, linting, and deployment

## Purpose

These workflows automate:

- Building theme assets on push/PR
- Running automated tests (unit, integration, E2E)
- Code quality checks (linting, formatting)
- Version management and releases

## Triggers

Workflows typically run on:

- Push to main/develop branches
- Pull request creation/updates
- Manual workflow dispatch
- Scheduled intervals (for maintenance tasks)

## Usage

GitHub Actions automatically executes these workflows based on configured triggers. Check individual workflow files for specific configuration details.
