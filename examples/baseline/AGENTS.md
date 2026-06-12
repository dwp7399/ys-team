# AGENTS.md

## ys-team v1 工作流

非 trivial 改动先形成 verifier 卡，再执行。

verifier 卡必须写清：

- 意图与非目标
- Write-Scope / Delete-Scope
- 验收保真度等级
- 人等价验收脚本或降级理由
- Feedback Loop
- 交付清单

## 三道闸

- **入口闸**：没有合格 verifier 卡，不进入复杂实现。
- **出口闸**：verifier 不真绿，不声明完成。
- **可见性闸**：用 todo、status 和结果状态说明进度。

## 验收门槛

- UI/交互类改动低于 L2 默认不通过。
- L0/L1 必须说明为什么不能更高。
- 无法自动化时，写清人工抽检步骤和剩余风险。

## 现实读取

涉及影响范围、风险或方案选择时，先读 `.ys_team/reality.md` 和相关项目文件。

## Scope

- spec-work 只能修改 Write-Scope / Delete-Scope 声明的路径。
- 需要扩大范围时先停止并请求确认。
- 不重构无关代码，不补未要求的功能。

## 结果状态

可用简短状态帮助用户判断，例如：

`spec 卡已签 · loop 3/5 验收项过 · 未全绿`

结果状态不是完成条件；verifier 与 evidence 才是完成条件。
