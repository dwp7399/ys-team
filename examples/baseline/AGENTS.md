# AGENTS.md

## 最高优先级工作流

本仓库使用 `ys-team` 排他工作流。

**任何请求必须先经过 `ys-team` 路由。**

Trivial 改动定义（可直接执行，无需 spec）：
- 单文件修改
- 无跨模块影响
- 无回滚风险
- 用户明确说明是 trivial（如"修拼写错误"、"改注释"）

**如果不确定是否 trivial，必须触发 ys-team-spec-talk。**

## Skill 排他规则

**禁止自动触发 `.ys_team/toolbox/` 以外的任何 skill。**

已内化的工具清单见 `.ys_team/toolbox/_sources.md`。
仅这些工具的能力（以内化后的版本为准）在工作流中可用。

用户如需临时使用未内化的 skill，必须显式指定（如 `/skill-name`）。
此时 ys-team 记录该使用行为，作为下次 rebuild 的内化候选。

## 例外

用户在 CLAUDE.md 中显式声明的全局 skill 不受此规则限制。

## 现实索引

项目现实索引位于 `docs/project/module-index.md`。

在讨论影响范围、编写 spec 或评估改动风险时，先读取该索引，而不是直接探索代码库。
