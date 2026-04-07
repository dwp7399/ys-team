---
name: ys-team
description: "Entry skill for the ys-team method. Use it to explain the method, keep decisions anchored in repository reality, and route users toward project init or local rebuild when needed."
---

# ys-team

`ys-team` 是一种以共享现实索引为对齐基础、以多角色讨论为收敛机制、以 Spec 为执行与验收统一依据的 AI 团队治理方法。

## The Zen of ys-team

- 现实先于生成。
- 规格先于执行。
- 讨论归于收敛。
- 证据胜于感觉。

## Purpose

Use `ys-team` as the public entry skill for this method.

Its job is to keep the conversation anchored in:

- repository reality
- role-based convergence
- spec-first execution
- evidence-based acceptance

## Public Model

对外只保留很少的用户心智：

1. 先把 ys-team skills 装好
2. 在项目里执行一次 `ys-team-init`
3. 项目形态明显变化后，再执行 `ys-team-rebuild`

不要把内部实现细节包装成用户必须理解的流程图。

默认工作流由 `examples/baseline/` 承载。

## Core Invariants

- 项目必须维护共享现实索引，并随真实变化同步更新。
- 非 trivial 工作先形成 Spec，再按 Spec 执行和验收。
- 讨论的目标是收敛，而不是无边界扩展。
- 交付必须留下可复核证据。

## Routing Guidance

- 如果用户想先理解方法论，直接解释 `ys-team`，不要急着让用户执行初始化。
- 如果仓库还没有 `.ys_team/`，引导到 `ys-team-init`。
- 如果仓库已有 `.ys_team/`，但团队、模板或约束已经不符合项目现实，引导到 `ys-team-rebuild`。
- 如果用户想先看默认工作流长什么样，引导到 `examples/baseline/`。
- 如果当前只是澄清理念、边界或推广方式，不强行写 spec。

## Trigger Default

当仓库存在 `.ys_team/` 时，默认行为是触发 ys-team 工作流。

- **默认**：任何代码改动请求都先经过 ys-team 路由判断，确认是否需要 spec
- **豁免**：仅当满足以下**全部**条件时可直接执行：
  - 单文件改动
  - 无跨模块影响
  - 无回滚风险
  - 用户明确声明是 trivial（如"修拼写错误"、"改注释"）
- **原则**：举证责任在"跳过路由"，而不在"触发路由"。不确定时，触发。

## 排他工作流

ys-team 启用后，工作流具有排他性：

- **禁止自动触发** `.ys_team/toolbox/` 以外的任何 skill
- 已内化的工具清单见 `.ys_team/toolbox/_sources.md`
- 仅内化后的版本在工作流中可用
- 用户显式调用未内化 skill 时（如 `/skill-name`），记录该使用行为到 `.ys_team/toolbox/_candidates.md`，作为下次 rebuild 的内化候选
- 用户在 CLAUDE.md 中显式声明的全局 skill 不受此规则限制

## Toolbox 感知

路由判断时，如果 `.ys_team/toolbox/` 存在且非空：

1. 读取 `_sources.md` 了解团队已内化的工具
2. 在路由决策中考虑已内化工具的能力（如团队有 TDD 能力，执行时建议使用）
3. 角色绑定的工具（`team.md` 中的 tools 字段）在对应环节自动建议使用

## Style

- 少解释内部结构，多解释稳定原则。
- 少输出流程感，多输出边界、结果和下一步。
- 允许项目本地化，不强迫所有仓库长成同一种样子。

## Response Markers

每次经过 ys-team 路由的响应，必须以可见标记结尾，让用户能确认工作流是否运行。

**路由判断类响应**（如决定委托给 spec-talk、回答方法论问题、运行 status）使用紧凑 footer：

```
---
`ys-team` · [判断结果] → [下一步]
```

示例：`` `ys-team` · 已路由至 spec-talk → 请确认是否开始讨论 ``

**spec-talk / 讨论类响应**使用 `[主持人]` 块（由 ys-team-spec-talk 定义）。不在此重复输出。

**其他环节**也必须保留可见标志：

- `spec-work`：`**[执行中]** ys-team · spec-work`
- `submit`：`**[验收]** ys-team · submit`
- `status`：`**[状态]** ys-team · status`

如果当前响应末尾没有任何 `ys-team` 标记，应视为尚未进入 ys-team 工作流，并立刻回到路由判断。
