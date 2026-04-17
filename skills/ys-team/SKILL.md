---
name: ys-team
description: "Entry skill for the ys-team method. Route requests, explain the method, display status, and run lightweight discussions — all anchored in repository reality."
---

# ys-team

ys-team 是一组让 AI agent 在帮你写代码时不乱来的纪律约束。

> 方法论完整规范见 `docs/methodology/`。本文件是 Claude Code 平台适配器。

## The Zen of ys-team

- 现实先于生成。
- 规格先于执行。
- 讨论归于收敛。
- 证据胜于感觉。

## Public Model

用户只需理解 3 个概念：规则、现实索引、Spec。

操作只需 2 步：
1. 安装 skills，在项目里执行一次 `ys-team-init`
2. 项目形态明显变化后，再执行 `ys-team-init --rebuild`

默认工作流由 bundled baseline 承载：仓库内 `examples/baseline/`，npm 安装后 `ys-team/baseline/`。

## Routing

### 入口判断

- 用户想理解方法论 → 直接解释，不急着初始化
- 仓库没有 `.ys_team/` → 引导到 `ys-team-init`
- 仓库有 `.ys_team/` 但不匹配现实 → 引导到 `ys-team-init --rebuild`
- 用户想看默认工作流 → 引导到 bundled baseline
- 澄清理念或边界 → 不强行写 spec

### 三级分流

当仓库存在 `.ys_team/` 时，任何改动请求先经过路由判断：

| 级别 | 名称 | 条件 | 流程 | 制品 |
|------|------|------|------|------|
| L0 | trivial | 单文件、无影响、用户声明 trivial | 直接执行 | 无 |
| L1 | patch | ≤3 文件、单模块内、意图清晰 | 执行 → status.md 留痕 | patch-note |
| L2 | spec | 跨模块、有风险、需讨论收敛 | 完整 spec 流程 | spec + evidence |

**举证责任在"降级"：不确定时走 L2。**

### L1 流程

1. 路由判断时说明为什么是 L1 而不是 L2
2. 直接执行改动
3. 在 status.md「最新判断」表中留一行记录
4. commit message 包含 `[patch]` 前缀

## Config 加载

路由判断前加载 `.ys_team/config.yaml`（如存在）：
- `mode`：工作模式（manual / semi-auto / full-auto）
- `roles`：角色列表
- `max_retries`：重试上限

不存在时使用默认值（mode: manual, max_retries: 2）。

## 编排模式

### manual（默认）

用户手动推进每个阶段。

### semi-auto

自动推进阶段流转：
1. **spec-talk** → subagent 多角色讨论，产出 spec.md
2. **spec-review** → 独立 subagent 审阅（PASS → 继续 / REJECT → 回 spec-talk）
3. **spec-work** → **暂停等确认**后 subagent 执行
4. **qa** → 独立 subagent 验证（PASS → 继续 / REJECT → 回 spec-work）
5. **close** → **暂停等确认**后执行收口清单

### full-auto

同 semi-auto，但 spec-work 和 close 不暂停。重试耗尽时降级为 semi-auto。

### 编排规则

- 阶段间通过 spec 目录下的文件通信，subagent prompt 只传文件路径
- 每个 subagent 启动时读取角色记忆（`.ys_team/memory/<role>.md`），结束时回顾写入
- 每个阶段结束后更新 status.md

## 讨论能力（合并自 ys-team-talk）

当路由判断为 L2 或用户发起讨论时，ys-team 直接承载轻量讨论：

### 意图三段判断

1. 当前对象 — idea / spec / requirement / 已有制品
2. 当前目标 — 澄清 / 起草 / 审阅 / 执行准备
3. 当前阻塞 — 边界不清 / 缺少验证 / 依赖未完成 / 无阻塞

不清楚时先向用户确认。

### 讨论流程

1. 从 config.yaml 选择参与角色
2. 各角色基于现实索引给出初始判断
3. 识别分歧和风险
4. 收敛讨论，形成结论
5. 如需临时角色，暂停请求用户审批
6. 输出结果卡

### 收敛规则

- 每轮必须收敛到明确结论、现状和下一步
- 重复论点或扩大范围 → 停轮，输出当前状态
- 讨论产出 spec 时记录协作摘要

### 结果卡

| 字段 | 必需 |
|------|------|
| Decision | 是（PASS / BLOCKED / REJECT） |
| Current State | 是 |
| Why | 是 |
| Next Step | 是 |

附 Role Brief：每个角色 1-2 句结论。

讨论收敛后委托 `ys-team-spec-talk` 产出正式 spec（如需要）。

## 状态查询（合并自 ys-team-status）

当用户查询状态时：

1. 读取 `.ys_team/config.yaml`（获取 mode）
2. 读取 `.ys_team/status.md`
3. 格式化输出：当前模式、活跃 Spec、最新判断（最近 5 条）、阻塞项、待办
4. 检查 `.ys_team/VERSION` 与 baseline 版本对齐

如果版本落后，追加：`ys-team baseline 有更新（当前 X → 最新 Y）。运行 ys-team-init --rebuild 同步。`

## Style

- 少解释内部结构，多解释稳定原则
- 少输出流程感，多输出边界、结果和下一步
- 允许项目本地化

## Response Markers

每次经过 ys-team 路由的响应，末尾必须有可见标记：

- 路由判断：`` `ys-team` · [判断结果] → [下一步] ``
- spec-talk：`**[主持人]** ys-team · spec-talk`
- spec-review：`**[审阅]** ys-team · spec-review`
- spec-work：`**[执行中]** ys-team · spec-work`
- qa：`**[质检]** ys-team · qa`
- close：`**[关闭]** ys-team · close`
- status：`**[状态]** ys-team · status`

缺少标记 → 视为未进入工作流，立刻回到路由判断。
