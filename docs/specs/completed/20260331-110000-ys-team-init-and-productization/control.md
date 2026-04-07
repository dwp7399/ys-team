---
Spec-Type: control
Initiative: 20260331-110000-ys-team-init-and-productization
Status: completed
Owner-Session: ys-team
Write-Scope: []
Depends-On: []
Parallel-With: []
Blocked-By: ""
Verification: "Manual review of README, skills, and local ys-team baseline consistency."
Integration-Gate: |
  1. `ys-team` 的对外心智收敛为 ys-team + baseline + init/rebuild。
  2. Python / Java 项目接入方式可被 README 清晰说明。
  3. 本仓已具备自己的 ys-team 工作流基线和 `examples/baseline/` 默认工作流。
  4. `init` 后的项目可直接进入类似 `ai-gateway` 的 discussion / spec / work / acceptance 链路。
  5. 后续演进方向已被 spec 化。
---

# ys-team 初始化与产品化收口

## Background

当前 `ys-team` 需要同时解决三件事：

- 作为 GitHub 仓库发布可安装的 skills
- 把对外心智收敛成极少的使用动作
- 给默认工作流一个稳定、可阅读、可复用的承载位置
- 让 Python / Java 项目都能低成本开始使用

本次仓库初始化已经完成第一版骨架，但后续产品化方向仍需用 spec 收口。

## Goals

- 固化 `ys-team` 的极简方法论表达
- 明确 `baseline`、`ys-team-init` 和 `ys-team-rebuild` 的职责边界
- 为后续 skill 面扩展和 Java 低侵入接入提供执行基线

## Non-goals

- 本次不追求完整自动安装器实现
- 本次不追求完整 skill 矩阵一次性补齐

## Deliverables

- 一套可发布的第一版仓库骨架
- 一套 `examples/baseline/` 默认工作流骨架
- 一组支撑默认工作流的静默内部 skills
- 一份定义后续演进方向的 queued spec

## Acceptance Criteria

- 仓库中已有 README、skills、`.ys_team/`、`docs/specs/`
- 仓库中已有 `examples/baseline/`
- `README.md` 已说明 Python / Java 项目如何开始使用
- `skills/` 中已具备支撑默认链路的静默内部 skills
- 后续改造项被拆成可执行 work

## Collaboration Summary

- Participants:
  - method-architect
  - init-onboarding-steward
  - delivery-guard
- Participant Titles:
  - 方法论架构师
  - 初始化与接入负责人
  - 交付与验收守门人
- Discussion Rounds:
  - 1
- Escalations:
  - None
- Reporter:
  - method-architect
- Reporter Title:
  - 方法论架构师
- Estimated Cost:
  - 1
- Submit Recommendation:
  - No

## Discussion Digest

- 方法论架构师（method-architect）:
  - 对外方法论应收敛成极少原则和极少动作，避免把内部 skill 结构暴露为用户心智。
- 初始化与接入负责人（init-onboarding-steward）:
  - 用户侧应只理解“装 skills、init 项目、必要时 rebuild”，并确保默认工作流由 baseline 承载，Java 项目能低侵入起步。
- 交付与验收守门人（delivery-guard）:
  - 仓库本身必须具备自己的 ys-team 工作流与 spec，后续改造项需要有可跟踪依据。

## Role Brief

- 方法论架构师:
  - 先固定原则，再扩展 skill 面。
  - 避免把 ys-team 做成重流程产品。
- 初始化与接入负责人:
  - 接入动作必须足够少，文案必须足够短。
  - Java 项目要能在不改业务代码的前提下起步。
- 交付与验收守门人:
  - 当前仓库骨架已落地，但后续产品化仍需 spec 管理。
  - README、skills 与项目文档要持续保持一致。

## Delivery Plan

- `work-01`：收口公共方法论与 skill 文案
- `work-02`：完善 baseline 与 Python / Java 项目接入方式
- `work-03`：补齐静默内部 skill 面与自动理解方向

## Verification

- 人工检查 `README.md`、`skills/*/SKILL.md`、`.ys_team/`、`docs/project/` 是否一致
- 人工检查 `examples/baseline/` 是否与 README 和 init 职责一致

## Acceptance Evidence

### 文件清单

- `docs/specs/active/20260331-110000-ys-team-init-and-productization/control.md`

### 验收要求

- 当前仓库骨架可被人工审阅并理解

## Documentation Updates

- `README.md`
- `docs/project/overview.md`
- `docs/project/structure.md`

## Risks

- 如果静默内部 skills 与 baseline 演化脱节，init 后体验仍可能低于预期

## Rollback Plan

- 若方法论表述出现明显偏差，回到当前 control spec 重新拆分后续 work

## Open Questions

- 静默内部 skills 长期是否全部留在 `skills/` 根目录，还是需要单独分组
