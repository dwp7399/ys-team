# ys-team

`ys-team` 是一组用于组织 AI 员工工作的 skills，以及围绕这些 skills 的项目本地化方法论。

当前仓库按三层组织：

- `ys-team`：方法论本体
- `examples/baseline/`：默认工作流骨架
- `ys-team-init` / `ys-team-rebuild`：把默认骨架落到具体项目，或在项目变化后重估本地规则

## The Zen of ys-team

- 现实先于生成。
- 规格先于执行。
- 讨论归于收敛。
- 证据胜于感觉。

## 这是什么

`ys-team` 不是固定流程图，也不是重型治理平台。

它提供的是一组稳定约束：

- 项目必须有能反映真实状态的共享现实索引。
- 非 trivial 工作先收敛为 spec，再依据 spec 执行和验收。
- 多角色讨论用于覆盖风险并形成收敛结论。
- 交付结果必须可验证、可追溯。

## 当前推荐使用方式

当前版本建议只记两步：

1. 获取本仓 `skills/` 下的技能目录，并安装到你的本地 skills 目录。
2. 说 “帮我安装/更新 https://github.com/dwp7399/ys-team 这里的 skills，然后用里面的 init，初始化我的项目。然后更新 agents.md 和 claude.md，使用 ys-team 作为最优先使用工作流”

## 本仓结构

- `skills/`：对外发布的 ys-team skills
- `examples/baseline/`：默认工作流骨架
- `.ys_team/`：本仓自用工作流基线
- `docs/project/`：仓库现状说明
- `docs/specs/`：后续演进 spec

其中 `skills/` 还包含一组静默内部能力，用于支撑默认工作流完整落地，但不要求用户主动理解或显式调用。

## 当前边界

当前仓库先收口四件事：

- `ys-team` 的理念入口
- `examples/baseline/` 的默认工作流表达
- `ys-team-init` 的项目初始化职责
- `ys-team-rebuild` 的本地规则重估职责
