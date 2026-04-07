---
Spec-Type: work
Initiative: 20260331-110000-ys-team-init-and-productization
Status: completed
Owner-Session: ys-team
Write-Scope:
  - skills/
  - README.md
  - docs/project/
Depends-On: []
Parallel-With: []
Blocked-By: ""
Verification: "Manual review of method wording and public skill boundaries."
Integration-Gate: ""
---

# Work 01 方法论与 skill 对外面收口

## Background

仓库需要先给出极简、稳定、可传播的方法论表达，并把公开 skill 面收敛到用户容易理解的层级。

## Goals

- 固化 `The Zen of ys-team`
- 明确 `ys-team`、`ys-team-init`、`ys-team-rebuild` 的对外职责

## Deliverables

### 主交付物

- 调整后的 skill 文案
- 与之对应的 README 和项目文档

## Acceptance Criteria

### 主验收目标

- 使用者能在不理解内部实现细节的情况下理解当前公开入口

## Verification

- 人工检查 `skills/*/SKILL.md` 与 `README.md`

## Acceptance Evidence

### 文件清单

- `docs/specs/active/20260331-110000-ys-team-init-and-productization/work-01-method-and-skill-surface.md`

### 本 work 验收要求

- 当前公开 skill 面不再过度暴露内部结构

## Documentation Updates

- `README.md`
- `docs/project/overview.md`

## Risks

- 如果后续 skill 面增加过快，可能重新把用户心智复杂化

## Rollback Plan

- 若文案导致职责边界混乱，回退到更少的公开概念

## Open Questions

- `ys-team` 对外是否长期只保留三类 skill
