# AGENTS.md

## 最高优先级工作流

本仓库使用 `ys-team` 排他工作流。

**任何请求必须先经过 `ys-team` 路由。**

**如果当前回复末尾没有出现 `ys-team` 可见标志，视为不在 ys-team 工作流中，必须立即切回路由。**

改动分流（路由判断时决定级别）：

**L0 trivial**（直接执行，无需记录）：
- 单文件修改
- 无跨模块影响
- 无回滚风险
- 用户明确说明是 trivial（如"修拼写错误"、"改注释"）

**L1 patch**（执行 + status.md 留痕）：
- 改动 ≤ 3 个文件
- 影响在单模块内（参考 module-index.md）
- 无数据迁移、无外部 API 变更、无安全敏感操作
- 意图清晰，不需要多角色讨论

**L2 spec**（完整 spec 流程）：
- 不满足 L0 或 L1 条件的改动

**如果不确定级别，走 L2。**

## Skill 排他规则

**禁止自动触发 `.ys_team/toolbox/` 以外的任何 skill。**

已内化的工具清单见 `.ys_team/toolbox/_sources.md`。
仅这些工具的能力（以内化后的版本为准）在工作流中可用。

用户如需临时使用未内化的 skill，必须显式指定（如 `/skill-name`）。
此时 ys-team 记录该使用行为，作为下次 rebuild 的内化候选。

## 例外

用户在 CLAUDE.md 中显式声明的全局 skill 不受此规则限制。

## 可见标志规则

只要正在执行 `ys-team` 工作流，回复末尾必须出现以下其一：

- 路由判断：`` `ys-team` · [判断结果] → [下一步] ``
- discussion / spec-talk：`**[主持人]** ys-team · spec-talk`
- spec-work：`**[执行中]** ys-team · spec-work`
- qa：`**[质检]** ys-team · qa`
- close：`**[关闭]** ys-team · close`
- status：`**[状态]** ys-team · status`

如果缺少这些标志，直接要求：

`请先进入 ys-team 工作流，并给出当前阶段标志。`

## 现实索引

项目现实索引位于 `docs/project/module-index.md`。

在讨论影响范围、编写 spec 或评估改动风险时，先读取该索引，而不是直接探索代码库。

## 架构约束

<!-- 项目在此声明架构层面的硬约束，例如：
- 模块依赖方向（如"业务层不得直接依赖数据库层"）
- 接口稳定性要求（如"对外 API 必须保持向后兼容"）
- 技术栈限制（如"前端只使用 React + TypeScript"）
-->

## 环境约束

<!-- 项目在此声明环境相关的约束，例如：
- 部署环境（如"仅支持 Node.js 18+"）
- 外部依赖（如"依赖 Redis 5.0+ 和 PostgreSQL 14+"）
- 运行时要求（如"需要 OPENAI_API_KEY 环境变量"）
-->
