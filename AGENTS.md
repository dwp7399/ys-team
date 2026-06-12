# ys-team Repository Instructions

本仓用于沉淀 `ys-team` 方法论、skills、模板和示例文档，目标是为不同技术栈项目提供低侵入接入方式。

## 工作流

本仓自身使用 ys-team v1。

非 trivial 改动必须先形成 verifier 卡，再进入实现。verifier 卡重心是：

- 意图和非目标
- Write-Scope / Delete-Scope
- 验收保真度等级
- 人等价验收脚本或降级理由
- Feedback Loop
- 项目发布 gate

实现期间以 verifier 为退出条件：验收不真绿，不算完成。

## Primary Rule

- 所有非 trivial 改动先讨论，再以 `docs/specs/` 中的 spec 为准执行和验收。
- 文档必须反映仓库当前真实状态；实现变化时，同次交付内同步更新。
- 本仓 release-first：close 必须完成版本一致性、`npm pack`、`npm publish`、合回 `main`、tag 和 push。

## 入口闸

以下情况必须先补 verifier 卡：

- 不可逆或高不确定性改动
- 跨方法论、skills、baseline、CLI 或发布入口的改动
- 验收方式不清楚
- 需要用户确认迁移、发布或兼容性策略

简单、可逆、验收显然的改动可以直接做，但仍要说明最小验证。

## 出口闸

- UI/交互类改动的验收低于 L2 默认不通过。
- L0/L1 验收必须说明为什么不能更高。
- 没有跑 verifier 或没有记录无法验证原因，不得声明完成。
- baseline 改动必须保持 `examples/baseline/` 与 `skills/ys-team/baseline/` 全量一致。

## 可见性

优先使用原生 todo、status 和简短结果状态说明进度，例如：

`spec 卡已签 · loop 3/5 验收项过 · 未全绿`

结果状态用于帮助用户判断，不是合规开关。

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
