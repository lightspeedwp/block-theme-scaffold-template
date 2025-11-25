## Overview & Related Files

This file documents the primary automation agent(s) for this repository, their purpose, usage, and integration with workflows. Reference this file for agent specs, triggers, and environment variables.

**Related Files:**
- [Custom Instructions](../custom-instructions.md) — main AI/Copilot and theme instructions
- [Chat Modes](../chatmodes/chatmodes.md) — context-specific Copilot prompts
- [Prompts](../prompts/prompts.md) — prompt templates for consistent output

---

## Primary Agent: block-theme-build.agent.js

- **Agent Script:** `.github/agents/block-theme-build.agent.js`
- **Spec:** `.github/agents/block-theme-build.agent.md`
- **Workflow:** `.github/workflows/block-theme-build-and-e2e.yml`
- **Purpose:** Automate build, lint, test, and validation for this block theme using WordPress and org standards.

### Usage
- **GitHub Actions:** See the workflow file for triggers and environment variables
- **Local:** `node .github/agents/block-theme-build.agent.js`

### Environment Variables
- `DRY_RUN` (default: `false`)
- `VERBOSE` (default: `false`)
- Additional secrets per workflow (e.g., `GITHUB_TOKEN` for label operations)

### Maintenance
- Keep the agent aligned with repo tooling (linters, build, tests)
- Update documentation and scripts as workflows evolve
- See [Block Theme Build Agent Spec](./block-theme-build.agent.md) for detailed build process and requirements

---

## Example: Agent Spec Template (for new agents)


> **Note:** The following is a template for documenting new agents. The files `agent-script.js` and `agent-workflow.yml` are placeholders and do not exist in this repository. Replace them with your actual agent script and workflow filenames when adding new agents.

Use the following as a template for documenting new agents:

---

- **Agent:** `agent-script.js`
- **Workflow:** `.github/workflows/agent-workflow.yml`
- **Purpose:** Automate a common, repeatable quality task for this repository type.
- **Usage:**
	- GitHub Actions: see the workflow file for triggers and environment variables
	- Local: `node .github/agents/agent-script.js`
- **Environment variables:**
	- `DRY_RUN` (default: `false`), `VERBOSE` (default: `false`)
	- Additional secrets per workflow (e.g., `GITHUB_TOKEN` for label ops)
- **Maintenance:** Keep the agent aligned with repo tooling (linters, build, tests)

---

For more information on agent usage, see [Custom Instructions](../custom-instructions.md) and [Workflows](../../workflows/).