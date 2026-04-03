---
name: ys-team-rebuild
description: "Reassess an existing project-local ys-team baseline and minimally update it when the project, stack, or collaboration shape has materially changed."
---

# ys-team-rebuild

Use this skill when a repository already has `.ys_team/`, but the current local method no longer matches repository reality.

## Purpose

Refresh the local ys-team baseline without reintroducing heavy process or unnecessary churn.

## Rebuild Triggers

- stack changed
- project gained or lost major modules
- existing local roles no longer fit delivery reality
- current templates no longer match acceptance or rollback needs
- documentation authority is no longer aligned with the codebase

## Rules

- Change the smallest surface that fixes the mismatch.
- Preserve stable local wording and role boundaries when they still fit.
- Keep the local method weak-guidance, strong-result.
- Update local templates only when repository reality really changed.

## Version Check

Before rebuilding, check version alignment:

1. Read project `.ys_team/VERSION` (if exists)
2. Compare with `examples/baseline/.ys_team/VERSION` from the installed ys-team skill
3. If versions differ, inform user: "ys-team baseline 有更新（当前 X.Y.Z → 最新 A.B.C）。是否同步？"
4. On user confirmation: merge baseline updates into project `.ys_team/`, preserving project-local customizations
5. Update project `.ys_team/VERSION` to match baseline

## Doc-Build Integration

After baseline update is complete, automatically invoke `ys-team-doc-build` to rebuild the reality index. This ensures `docs/project/module-index.md` reflects current project structure after any rebuild.

## Output

Summarize:

- what changed
- why it changed
- whether existing specs need follow-up
