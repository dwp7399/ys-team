---
Initiative: 20260415-193020-delivery-flow-carrier
Phase: spec-talk
Author-Session: ys-team-spec-talk
---

# 原始需求记录

## 需求来源

- 提出时间：2026-04-15
- 来源方式：用户口述

## 原始描述

希望把当前工作流里的核心 5 步显性固定下来，但不要做成大而全流程图。

需要有一个类似“流程交割单”的地方，让每个项目都能把核心交付逻辑固定下来，而不是靠猜；同时该文档只在自己的作用范围内保证一致性，不追求完全覆盖。

## 背景补充

- 当前方法论有状态机、spec 制品和治理规则，但缺少一个项目本地的“核心交付逻辑承载位”
- `TEAM.md` 更偏配置，`policy.md` 更偏规则，二者都不适合承载阶段交接清单
- 当前 `ys-team` / `spec-talk` / `spec-work` 还没有显式读取 `delivery-flow.md` 一类的本地流程文档

## 初步范围判断

- 影响模块：`docs/methodology/`、`examples/baseline/.ys_team/`、`skills/ys-team*/SKILL.md`、本仓 `.ys_team/`、`docs/project/`
- 是否跨模块：是
- 是否涉及 DB 变更：否
- 是否涉及对外 API 行为变化：否
