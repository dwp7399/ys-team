# AGENTS.md

<!-- ys-team:managed:start version=1.0.1 -->
## ys-team v1 工作流

ys-team v1 强制的是“先路由、再选择合适验收”，不是所有请求都进入完整 spec 流程。

按“不可逆性 × 不确定性”分三档处理：

- `direct`：简单、可逆、低风险、验收显然的改动可以直接做，并说明最小验证。
- `patch`：范围清楚、影响有限的改动可以直接执行，但必须用快速 verifier 验收并留下必要证据。
- `spec`：不可逆、高不确定性、跨边界、验收不清的改动，必须先形成 verifier 卡，再进入实现。

复杂改动的 verifier 卡必须写清：

- 意图与非目标
- Write-Scope / Delete-Scope
- 验收保真度等级
- 人等价验收脚本或降级理由
- Feedback Loop
- 交付清单

## 三道闸

- **入口闸**：非 trivial 改动先形成 verifier 卡。
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
<!-- ys-team:managed:end -->

## Project Local Instructions

在这里保留项目自己的约束，例如运行命令、发布方式、目录约定、性能或安全边界。`ys-team-init --rebuild` 和 `ys-team init-project` 只更新上方 managed block，不覆盖本地内容。
