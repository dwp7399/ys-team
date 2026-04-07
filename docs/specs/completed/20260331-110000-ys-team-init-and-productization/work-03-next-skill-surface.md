---
Spec-Type: work
Initiative: 20260331-110000-ys-team-init-and-productization
Status: completed
Owner-Session: ys-team
Write-Scope:
  - skills/
  - docs/specs/
Depends-On: []
Parallel-With: []
Blocked-By: ""
Verification: "Manual review of next-stage skill expansion plan."
Integration-Gate: ""
---

# Work 03 下一阶段 skill 面与自动理解方向

## Background

当前仓库已有最小骨架，但如果要让 init 后的项目真正进入类似 `ai-gateway` 的默认工作流，还需要补齐支撑 discussion / spec / work / acceptance 的内部能力。

## Goals

- 补齐默认工作流所需的静默内部 skill 面
- 明确 init 对不同语言和仓库形态的自动理解边界

## Deliverables

### 主交付物

- 一组静默内部 skills
- init 自动理解能力的边界建议

## Acceptance Criteria

### 主验收目标

- 默认工作流能力补齐后，用户心智仍保持极少

## Verification

- 人工审阅 skill 面是否仍符合 `The Zen of ys-team`

## Acceptance Evidence

### 文件清单

- `docs/specs/active/20260331-110000-ys-team-init-and-productization/work-03-next-skill-surface.md`

### 本 work 验收要求

- 默认工作流所需内部能力已经在仓库中落下

## Documentation Updates

- `docs/specs/active/20260331-110000-ys-team-init-and-productization/control.md`
- `README.md`
- `docs/project/overview.md`

## Risks

- 如果内部 skill 边界不清，可能重新把内部实现暴露成用户心智

## Rollback Plan

- 若扩展方向变重，回到“公开极简、内部丰富”的分层原则

## Open Questions

- 是否需要把静默内部 skills 单独归到 `skills/internal/` 一类目录
