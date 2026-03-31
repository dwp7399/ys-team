# ys-team Repository Instructions

本仓用于沉淀 `ys-team` 方法论、skills、模板和示例文档，目标是为不同技术栈项目提供低侵入接入方式。

## Primary Rule

- 本仓自身使用 `ys-team`。
- 所有非 trivial 改动先讨论，再以 `docs/specs/` 中的 spec 为准执行和验收。
- 文档必须反映仓库当前真实状态；实现变化时，同次交付内同步更新。

## Repository Scope

- `skills/`：对外发布的 skill 包。
- `.ys_team/`：本仓自用的 ys-team 本地工作流配置。
- `docs/project/`：仓库现状、结构和方法论说明。
- `docs/specs/`：本仓关于 ys-team 后续演进的 spec。

## Delivery Rules

- 默认优先保持方法论简洁，不堆叠过度解释。
- skill 文案优先写“原则”和“边界”，避免把方法论写成硬流程。
- README 面向使用者，文档要说明 Python / Java 项目如何低成本开始使用。
