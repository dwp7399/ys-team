---
name: ys-team
description: "Entry skill for ys-team v1: route by irreversibility x uncertainty, explain status, and steer non-trivial changes toward verifier cards. Use when 用户说「用 ys-team 路由」「ys-team 状态」「这件事要不要开 spec」「讨论一下要不要做 X」等。"
---

# ys-team

<what-to-do>

按当前意图处理：

1. **路由请求**：读取 `.ys_team/config.yaml`、`.ys_team/rules.md`、`.ys_team/reality.md`；按“不可逆性 × 不确定性”判断是直接执行、patch 还是 spec。
2. **状态查询**：读取 `.ys_team/status.md`，输出活跃工作、阻塞项、最近判断和需要用户决策的点。
3. **讨论澄清**：先做意图三段判断；需求模糊时 grill 用户；需要正式 spec 时委托 `ys-team-spec-talk`。
4. **方法论解释**：解释 v1 的 5 个概念：规则、约束地图、术语表、错题本、verifier 卡。
5. **输出模式**：如 `.ys_team/config.yaml` 中 `output_mode: friendly`，在技术内容后补一段面向非程序背景用户的说明。

可用简短结果状态收尾，例如 `spec 卡已签 · loop 3/5 验收项过 · 未全绿`。结果状态用于可见性，不是完成条件。

</what-to-do>

<supporting-info>

ys-team v1 是 verifier-first 的 AI coding workflow。agent 原生会循环执行；ys-team 负责提供高保真的退出条件和项目本地记忆。

## The Zen of ys-team

- 现实先于生成：先读当前仓库事实和不可推断的项目约束。
- 规格先于执行：非 trivial 改动先形成 verifier 卡。
- 讨论归于收敛：先 grill 对齐意图，必要时独立审阅。
- 证据胜于感觉：verifier 未真绿，不算完成。

## Public Model

用户只需理解 5 个概念：

1. 规则
2. 约束地图
3. 术语表
4. 错题本
5. verifier 卡

操作仍是安装一次、项目形态明显变化后 rebuild。

## Routing

按“不可逆性 × 不确定性”判断：

| 类型 | 特征 | 处理 |
|------|------|------|
| direct | 可逆、低风险、意图明确、验收显然 | 直接执行，说明最小验证 |
| patch | 范围清楚、影响有限、快速 verifier 足够 | 执行、验证、留痕 |
| spec | 不可逆、高不确定性、跨边界、验收不清 | grill → verifier 卡 → 审阅 → loop 执行 |

降级必须说明为什么风险可逆、scope 清楚、verifier 足够。不确定时走 spec。

### 入口判断

- 仓库没有 `.ys_team/`：引导到 `ys-team-init`。
- `.ys_team/` 与项目现实明显不符：引导 `ys-team-init --rebuild`。
- 命中项目本地 SOP：先路由，再加载本地 SOP 的交付清单和 verifier 要求。
- UI/交互、权限、支付、数据迁移、发布链路等高风险场景：默认要求更高保真 verifier。

## Verifier Levels

- L3：真实输入/点击/上游调用 + 断言。
- L2：真实业务路径的行为测试。
- L1：单测、编译、类型检查、静态检查。
- L0：人工抽检，必须写明剩余人工项。

UI/交互类改动低于 L2 默认不通过。

## 三道闸

- **入口闸**：非 trivial 改动必须有 verifier 卡。
- **出口闸**：验收脚本不真绿，不能声明完成。
- **可见性闸**：用 todo、status 和结果状态说明进度。

## Config

读取 `.ys_team/config.yaml`：

- `mode`：manual / semi-auto / full-auto
- `output_mode`：technical / friendly
- `verification.default_min_level`
- `verification.ui_min_level`
- `verification.require_feedback_loop`
- `review.cross_model_adversarial`
- `max_retries`

缺失字段使用 baseline 默认值。

## Status Query

状态查询时输出：

- 当前 mode / output_mode
- 活跃 spec
- 最近判断
- 阻塞项
- 待办
- 需要用户决策的点

`friendly` 模式下补充普通语言总结，不弱化阻塞、验证失败或 scope 扩大。

## Style

- 少讲内部阶段，多讲当前闸口、验收状态和下一步。
- 不把内部工具菜单丢给用户选择。
- 对无法自动化的验收诚实标注 L0。

</supporting-info>
