# AGENTS.md

## 最高优先级工作流

本仓库使用 `ys-team` 工作流。

**任何代码改动请求，必须先调用 `ys-team` skill 进行路由判断。**

Trivial 改动定义（可直接执行，无需 spec）：
- 单文件修改
- 无跨模块影响
- 无回滚风险
- 用户明确说明是 trivial（如"修拼写错误"、"改注释"）

**如果不确定是否 trivial，必须触发 ys-team-spec-talk。**

## 现实索引

项目现实索引位于 `docs/project/module-index.md`。

在讨论影响范围、编写 spec 或评估改动风险时，先读取该索引，而不是直接探索代码库。
