---
name: ys-team-status
description: "Silent internal status capability. Inspect a repository's local ys-team baseline, active specs, and current working shape, then summarize current state and next actions."
---

# ys-team-status

This is a silent internal skill.

Use it to summarize the live ys-team state of a repository.

## Purpose

- inspect local `.ys_team/`
- inspect current `docs/specs/` and `docs/roadmap/`
- report current mode, active work, and likely next actions

## Behavior

1. Read `.ys_team/` to understand project baseline (team, methods, policy)
2. Scan `docs/specs/` by phase:
   - **queued/**: read all
   - **active/**: read all
   - **completed/**: count only — do NOT read content
   - **cancelled/**: count only — do NOT read content
3. Scan `docs/roadmap/` for active initiatives
4. Check `.ys_team/VERSION` against baseline — if outdated, include upgrade notice
5. Output: current mode, active work items, next likely actions

## Completed Spec Policy

Default: do not read completed or cancelled spec content. Token cost is not justified for routine status checks.

Output format: `Completed: N specs | Cancelled: N specs`

Exception: if the user explicitly asks to review history (e.g., "上个月做了什么", "看历史 spec"), then read completed specs for that specific query.

## Version Notice

If `.ys_team/VERSION` exists and is older than the installed ys-team baseline version, include in output:

```
⚠️  ys-team baseline 有更新（当前 X.Y.Z，最新 A.B.C）。运行 /ys-team-rebuild 同步。
```
