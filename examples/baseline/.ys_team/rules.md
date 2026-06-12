# 行为规则

## 三道闸

| 闸 | 规则 | 自检 |
|----|------|------|
| 入口闸 | 非 trivial 改动先形成 verifier 卡 | 是否写清 Write-Scope、保真度等级、验收脚本或降级理由？ |
| 出口闸 | verifier 不真绿，不声明完成 | 是否运行 Feedback Loop 和最终 Verification？ |
| 可见性闸 | 用 todo、status、结果状态说明进展 | 用户能否看出是否全绿、还差什么？ |

## 验收门槛

- UI/交互类改动低于 L2 默认不通过。
- L0/L1 必须写明为什么不能更高，以及剩余人工风险。
- 没有合格 verifier 的复杂改动不能进入实现。
- 无法验证时必须明确说明限制和人工抽检步骤。

## Scope

- spec-work 只能修改 Write-Scope / Delete-Scope 声明的文件。
- 发现必须改 scope 外文件时，停止并回到讨论或请求确认。
- 不顺手重构无关代码。

## 现实

- 讨论影响范围、风险或方案选择时，先读 `.ys_team/reality.md` 和相关项目文件。
- `reality.md` 只记录 agent 难以重建的约束与风险，不复述目录树。

## 项目本地 SOP

- 高频、领域强、漏项成本高的工作可以沉淀为项目本地 SOP。
- SOP 只补充交付清单和验收 gate，不改变用户入口。
- 项目业务知识留在本地 rules、references、文档或 skill 中，不写回通用 baseline。

## 结果状态

可以用简短状态帮助用户判断，例如：

`spec 卡已签 · loop 3/5 验收项过 · 未全绿`

结果状态不是完成条件；verifier 与 evidence 才是完成条件。
