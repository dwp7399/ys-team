# ys-team Repository Instructions

本仓用于沉淀 `ys-team` 方法论、skills、模板和示例文档，目标是为不同技术栈项目提供低侵入接入方式。

## 最高优先级工作流

本仓库使用 `ys-team` 排他工作流。

**任何请求必须先经过 `ys-team` 路由。**

## Primary Rule

- 本仓自身使用 `ys-team`。
- 所有非 trivial 改动先讨论，再以 `docs/specs/` 中的 spec 为准执行和验收。
- 文档必须反映仓库当前真实状态；实现变化时，同次交付内同步更新。

## Skill 排他规则

**禁止自动触发 `.ys_team/toolbox/` 以外的任何 skill。**

已内化的工具清单见 `.ys_team/toolbox/_sources.md`。
仅这些工具的能力（以内化后的版本为准）在工作流中可用。

用户如需临时使用未内化的 skill，必须显式指定（如 `/skill-name`）。
此时 ys-team 记录该使用行为，作为下次 rebuild 的内化候选。

## 例外

用户在 CLAUDE.md 中显式声明的全局 skill 不受此规则限制。

## Repository Scope

- `skills/`：对外发布的 skill 包。
- `.ys_team/`：本仓自用的 ys-team 本地工作流配置。
- `docs/project/`：仓库现状、结构和方法论说明。
- `docs/specs/`：本仓关于 ys-team 后续演进的 spec。

## 现实索引

项目现实索引位于 `docs/project/module-index.md`。

在讨论影响范围、编写 spec 或评估改动风险时，先读取该索引，而不是直接探索代码库。

## Delivery Rules

- 默认优先保持方法论简洁，不堆叠过度解释。
- skill 文案优先写"原则"和"边界"，避免把方法论写成硬流程。
- README 面向使用者，文档要说明 Python / Java 项目如何低成本开始使用。
