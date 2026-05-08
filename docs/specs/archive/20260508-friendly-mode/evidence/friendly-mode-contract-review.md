# Friendly Mode Contract Review

Date: 2026-05-08
Reviewer: spec-work self-check
Decision: PASS

## AC Review

- AC-01: PASS. `skills/ys-team/SKILL.md` defines friendly mode triggers and states it is not a new workflow and does not replace evidence, scope, verification, or visible markers.
- AC-02: PASS. `skills/ys-team/SKILL.md` status query flow now appends a plain-language summary when friendly mode is enabled.
- AC-03: PASS. `skills/ys-team-spec-talk/SKILL.md` Host Summary supports a friendly summary while preserving role, decision, output, and next step fields.
- AC-04: PASS. `skills/ys-team-spec-work/SKILL.md` Visible Marker supports a friendly summary while preserving status, evidence, verification, and scope requirements.
- AC-05: PASS. README and Getting Started explain friendly mode in non-technical language and do not introduce a new command burden.
- AC-06: PASS. Methodology overview/reference define friendly mode as an output presentation layer; it does not change L0/L1/L2 or evidence gates.
- AC-07: PASS. `.ys_team/glossary.md` registers `友好模式` and warns against treating it as simplification, low-governance mode, or a fixed summary template.
- AC-08: PASS. Keyword checks confirm the contract language appears in the expected files.
- AC-09: PASS. `package.json`, `.ys_team/VERSION`, `examples/baseline/.ys_team/VERSION`, and `skills/ys-team/baseline/.ys_team/VERSION` all read `0.6.2`.

## Scope Review

All files changed for this spec are in Write-Scope. The worktree also contains pre-existing changes to `.ys_team/rules.md`, `.ys_team/templates/spec.md`, and several untracked `.ys_team` baseline files that were present before this spec-work; they were not modified as part of friendly mode implementation.

## Human-Readable Behavior Check

Friendly mode is implemented as:

> Configure `output_mode: friendly` to keep the technical output and add a plain-language summary for people without programming experience.

It is not implemented as:

- a fixed "conclusion / risk / next step" card,
- a new workflow,
- a low-governance mode,
- a replacement for technical evidence.

## Configuration Check

After revision, the stable switch is `.ys_team/config.yaml`:

```yaml
output_mode: technical
```

Allowed values are `technical` and `friendly`. Baseline config files default to `technical`. Per-turn phrases like “用人话总结” are documented only as temporary overrides.
