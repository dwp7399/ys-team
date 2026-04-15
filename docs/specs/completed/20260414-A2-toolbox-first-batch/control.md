---
Spec-Type: control
Initiative: 20260414-A2-toolbox-first-batch
Status: completed
Owner-Session: ys-team
Write-Scope:
  - .ys_team/toolbox/
  - .ys_team/team.md
Depends-On:
  - 20260414-A1-fullato-e2e-validation
Verification: "ls .ys_team/toolbox/ 有 ≥2 个非占位符工具文件；team.md tools 字段引用可验证"
---

# A2：Toolbox 第一批内化

## Background

`.ys_team/toolbox/` 目录存在但内容为空，角色的 tools 绑定停留在架构层面。需要在 A1 实战验证工具使用模式后，将实际用到的工具内化为可复用文件。

## Goals

为「方法论架构师」和「产品演进负责人」写真实可用的工具内化文件，让 team.md 的 tools 字段从占位符变为可验证引用。

## Deliverables

- `.ys_team/toolbox/` 下 ≥2 个有实质内容的工具文件
- `.ys_team/team.md` tools 字段更新为引用 toolbox 中的真实文件

## Discussion Digest

- Rounds: 1
- Conclusion: PASS
- Closeout Note: 立项时的“toolbox 为空”背景已失效；本项已由仓库现状满足，不再单独扩写为新一轮工作

## Verification

- 检查 `.ys_team/toolbox/`，确认存在 `一致性检查.md`、`完成前验证.md`
- 检查 `.ys_team/team.md`，确认 `方法论架构师` 和 `交付守门人` 的 `tools` 字段已引用实际文件

## Acceptance Evidence

- `.ys_team/toolbox/一致性检查.md`
- `.ys_team/toolbox/完成前验证.md`
- `.ys_team/team.md`

## Acceptance Criteria

- [x] toolbox 下至少有「一致性检查」工具的内化文件
- [x] team.md tools 字段与 toolbox 实际文件对应
- [x] 工具文件有明确的使用场景和操作步骤描述

## Collaboration Summary

- Participants: 方法论架构师
- Reporter: 方法论架构师
- Estimated Cost: 低

## Risks

- 工具内化的"颗粒度"不好把握，过细变成 SOP，过粗等于没写

## Rollback Plan

删除新增的 toolbox 文件，team.md 恢复原有占位符。
