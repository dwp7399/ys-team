---
Spec-Type: work
Initiative: 20260331-110000-ys-team-init-and-productization
Status: completed
Owner-Session: ys-team
Write-Scope:
  - README.md
  - skills/ys-team-init/
  - .ys_team/
Depends-On: []
Parallel-With: []
Blocked-By: ""
Verification: "Manual review of Python and Java onboarding guidance."
Integration-Gate: ""
---

# Work 02 Python / Java 接入路径收口

## Background

`ys-team` 想被使用，必须让 Python 和 Java 项目都能低成本起步。

## Goals

- 给默认工作流一个稳定承载位置
- 让 Python 项目看到如何快速开始
- 让 Java 项目看到如何在低侵入前提下开始使用

## Deliverables

### 主交付物

- README 中的 Python / Java 使用说明
- `examples/baseline/` 默认工作流骨架
- `ys-team-init` 中针对语言差异的最小规则

## Acceptance Criteria

### 主验收目标

- Python / Java 团队都能从 README 理解“怎么开始”，并知道默认工作流从哪里来

## Verification

- 人工检查 README 是否只保留极少动作
- 人工检查 baseline 是否足够简洁且可阅读

## Acceptance Evidence

### 文件清单

- `docs/specs/active/20260331-110000-ys-team-init-and-productization/work-02-python-java-onboarding.md`

### 本 work 验收要求

- 接入说明足够简洁，且语言差异被正确表达

## Documentation Updates

- `README.md`
- `docs/project/structure.md`

## Risks

- 如果 Java 场景说明过泛，后续实际接入时还需补模板细节
- 如果 baseline 带入过多项目特定内容，会降低公共可移植性

## Rollback Plan

- 若说明过长或过细，回退到只保留起步动作和原则

## Open Questions

- 未来是否需要在 baseline 之外增加更多 workflow preset
