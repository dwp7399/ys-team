---
name: ys-team-init
description: "Initialize a repository-local ys-team baseline once. Generate the smallest useful .ys_team setup from project reality without forcing a heavy process."
---

# ys-team-init

Use this skill when a repository wants to start using `ys-team` and does not yet have a project-local `.ys_team/`.

## Purpose

Create the first project-local ys-team baseline with the lightest useful footprint.

`ys-team-init` is not a project modeling ceremony.
It is a one-time repository specialization step.

Its default workflow source is `examples/baseline/`.

## Core Rules

- Read repository reality before generating anything.
- Start from `examples/baseline/` as the default workflow source.
- Prefer the smallest useful local baseline.
- Do not require the user to understand internal ys-team structure first.
- Do not block init only because some docs are missing; generate a minimal skeleton when needed.
- Keep the result repository-local.

## Minimum Outputs

Generate or adapt:

- `.ys_team/README.md`
- `.ys_team/team.md`
- `.ys_team/methods.md`
- `.ys_team/policy.md`
- `.ys_team/templates/`
- `docs/specs/`
- `docs/roadmap/`

When the repository lacks a current-state project doc, create a minimal `docs/project/overview.md` skeleton.

## Language Sensitivity

The method is language-agnostic, but local wording should match project reality.

Examples:

- Python services should reflect their actual package manager, test command, and runtime boundaries.
- Java services should reflect their build tool, multi-module structure, compatibility concerns, release order, migration surface, and async contracts.

## Success Criteria

The repository can start using ys-team immediately after init, without first rewriting the whole project.

That means:

- discussion can converge into spec
- spec can guide execution
- execution can be accepted with evidence

## After Init

- Use the generated local `.ys_team/` as the project's baseline.
- Treat `examples/baseline/` as the default workflow source, not as a rigid project copy.
- Do not rerun init for normal project work.
- Use `ys-team-rebuild` only when project reality has materially changed.
