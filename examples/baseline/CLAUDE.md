# CLAUDE.md

<!-- ys-team:managed:start version=1.0.1 -->
本项目使用 ys-team v1。

## 工作方式

- 先判断请求属于 `direct`、`patch` 还是 `spec`。
- `direct`：简单、可逆、验收显然的改动可以直接做，并说明最小验证。
- `patch`：范围清楚、影响有限的改动可以直接做，但要用快速 verifier 验收。
- `spec`：不可逆、高不确定性、跨边界或验收方式不清楚的改动，先形成 verifier 卡，再执行。
- 验收不真绿，不声明完成。

## Verifier 卡

复杂改动必须写清：

- 意图与非目标
- Write-Scope / Delete-Scope
- 保真度等级 L3/L2/L1/L0
- 人等价验收脚本或降级理由
- Feedback Loop
- 交付清单

## 验收门槛

- UI/交互类改动低于 L2 默认不通过。
- L0/L1 必须说明为什么不能更高。
- scope 扩大时先停止并请求确认。

## 现实读取

讨论影响范围、风险或方案选择时，先读 `.ys_team/reality.md` 和相关项目文件。

## 可见性

用 todo、status 和简短结果状态说明进度，例如：

`spec 卡已签 · loop 3/5 验收项过 · 未全绿`
<!-- ys-team:managed:end -->

## Project Local Instructions

在这里保留项目自己的 Claude 侧约束。升级时只更新上方 managed block，不覆盖本地内容。
