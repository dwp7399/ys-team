---
name: ys-team
description: "Entry skill for the ys-team method: routing, status, lightweight discussion, all anchored in repository reality. Use when 用户说「用 ys-team 路由」「ys-team 状态」「这件事算 L0/L1/L2」「讨论一下要不要做 X」等。"
---

# ys-team

<what-to-do>

按以下顺序判断当前调用意图并立即处理：

1. **路由请求**（用户描述要做的改动）→ 加载 `.ys_team/config.yaml` → 按下方「Routing」做 L0/L1/L2 三级判断 → 响应末尾输出 `` `ys-team` · [判断结果] → [下一步] ``。
2. **状态查询**（"ys-team 状态"等）→ 按下方「状态查询」流程读 `.ys_team/status.md` 并格式化输出 → 末尾 `**[状态]** ys-team · status`。
3. **讨论澄清**（边界、理念、要不要做 X）→ 按下方「讨论能力」做意图三段判断和轻量讨论；如需正式 spec 委托 `ys-team-spec-talk` → 末尾 `**[主持人]** ys-team · spec-talk`。
4. **方法论解释**（"ys-team 是什么"等）→ 直接解释「The Zen of ys-team」与「Public Model」，不强行进流程。
5. **输出模式**（`.ys_team/config.yaml` 中 `output_mode: technical | friendly`）→ 按下方「输出模式」决定是否在原始技术输出后追加友好总结。

任何响应末尾必须出现下方「Response Markers」之一；缺失即视为未进入工作流，立刻回到路由判断。

</what-to-do>

<supporting-info>

ys-team 是一组让 AI agent 在帮你写代码时不乱来的纪律约束。用户正常对话，ys-team 在仓库本地自动判断复杂度并选择内部流程。

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

用户不需要选择内部工作流。规格、测试、审阅、诊断和收口都由 ys-team 路由决定；外部先进模式只能吸收到内部 routing、baseline 和文档口径中。

## 输出模式

`output_mode` 写在 `.ys_team/config.yaml` 中：

- `technical`：默认技术模式。只输出原始技术内容和 ys-team 必需的可见标志。
- `friendly`：友好模式。原始技术输出仍然保留，然后追加一段面向非程序背景用户的友好总结。

友好模式是输出的二次解释层。它不是新工作流，不改变 L0/L1/L2，不降低治理要求，也不替代 evidence、scope、verification 或可见标志。

用户本轮明确要求 `用人话总结`、`说得简单一点`、`给没有编程经验的人看` 时，可以临时按友好模式输出；稳定行为以 config 的 `output_mode` 为准。

输出要求：

- 不强制结构；可以是一句话、一个短段落，或少量要点。
- 少用内部阶段名、英文缩写和专业术语；必须出现时，用括号解释。
- 把技术动作翻译成项目影响，说明用户是否需要处理。
- 有阻塞、验证失败、范围扩大时，用直白语言说明严重性，不能淡化。
- 原始输出已经足够短且没有专业术语时，可以只补一句或省略友好总结。

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

L2 内部生命周期：Define（澄清）→ Plan（spec）→ Build（执行）→ Verify（证据）→ Review（审阅/质检）→ Ship（收口）。这些是内部阶段，不要求用户主动选择。

### L1 流程

1. 路由判断时说明为什么是 L1 而不是 L2
2. 直接执行改动
3. 在 status.md「最新判断」表中留一行记录
4. commit message 包含 `[patch]` 前缀

## Config 加载

路由判断前加载 `.ys_team/config.yaml`（如存在）：
- `mode`：工作模式（manual / semi-auto / full-auto）
- `output_mode`：输出模式（technical / friendly，默认 technical）
- `roles`：当前已绑定并启用的角色列表
- `governance_slots`：固定治理槽位
- `slot_bindings`：槽位到角色的绑定结果
- `max_retries`：重试上限

不存在时使用默认值（mode: manual, output_mode: technical, max_retries: 2）。

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
- full-auto 模式下，spec-review PASS 后继续 spec-work，spec-work 完成后继续 qa，qa PASS 后继续 close；只有 REJECT 重试耗尽或 scope 外变更才暂停。
- 对本仓，spec-review PASS 后必须先切到 release/work 分支，再进入 spec-work；close 必须完成 npm 发布链路、合回 main、tag 和 push。

## 讨论能力（合并自 ys-team-talk）

当路由判断为 L2 或用户发起讨论时，ys-team 直接承载轻量讨论：

### 意图三段判断

1. 当前对象 — idea / spec / requirement / 已有制品
2. 当前目标 — 澄清 / 起草 / 审阅 / 执行准备
3. 当前阻塞 — 边界不清 / 缺少验证 / 依赖未完成 / 无阻塞

不清楚时先向用户确认。

### 讨论流程

1. 从 `governance_slots` / `slot_bindings` 选择参与角色
2. 各角色基于现实索引、项目文档、已有 spec/ADR 给出初始判断
3. 识别分歧和风险
4. 收敛讨论，形成结论
5. 如需临时角色，暂停请求用户审批
6. 输出结果卡

若轻量讨论发现待确认问题超过 5 个或问题横跨多个维度，升级到 `ys-team-spec-talk` 的文件化 Grill，由 `questions.md` 承载结构化问卷澄清；用户填写后再继续收敛为 spec。

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
3. 格式化输出：当前模式、活跃 Spec、最新判断（最近 10 条）、阻塞项、待办
4. 如 `output_mode: friendly` 或本轮临时要求友好总结，在技术状态后追加一段友好总结，用非程序背景用户也能理解的语言说明当前项目是否正常推进、是否有阻塞、是否需要用户决策
5. 检查 `.ys_team/VERSION` 与 baseline 版本对齐

如果版本落后，追加：`ys-team baseline 有更新（当前 X → 最新 Y）。运行 ys-team-init --rebuild 同步。`

## Style

- 少解释内部结构，多解释稳定原则
- 少输出流程感，多输出边界、结果和下一步
- `output_mode: friendly` 下追加人话版总结，不强制结构，不替代技术细节
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

</supporting-info>
