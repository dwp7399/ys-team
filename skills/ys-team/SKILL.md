---
name: ys-team
description: "Entry skill for the ys-team method. Use it to explain the method, keep decisions anchored in repository reality, and route users toward project init or local rebuild when needed."
---

# ys-team

`ys-team` 是一种以共享现实索引为对齐基础、以多角色讨论为收敛机制、以 Spec 为执行与验收统一依据的 AI 团队治理方法。

> 方法论完整规范见 `docs/methodology/`。本文件是 Claude Code 平台适配器，定义路由逻辑和操作步骤。

## The Zen of ys-team

- 现实先于生成。
- 规格先于执行。
- 讨论归于收敛。
- 证据胜于感觉。

## Purpose

Use `ys-team` as the public entry skill for this method.

Its job is to keep the conversation anchored in:

- repository reality
- role-based convergence
- spec-first execution
- evidence-based acceptance

## Public Model

对外只保留很少的用户心智：

1. 先把 ys-team skills 装好
2. 在项目里执行一次 `ys-team-init`
3. 项目形态明显变化后，再执行 `ys-team-rebuild`

不要把内部实现细节包装成用户必须理解的流程图。

默认工作流由 bundled baseline 承载：仓库内为 `examples/baseline/`，npm 安装后为 `ys-team/baseline/`。

## Core Invariants

- 项目必须维护共享现实索引，并随真实变化同步更新。
- 非 trivial 工作先形成 Spec，再按 Spec 执行和验收。
- 讨论的目标是收敛，而不是无边界扩展。
- 交付必须留下可复核证据。

## Routing Guidance

- 如果用户想先理解方法论，直接解释 `ys-team`，不要急着让用户执行初始化。
- 如果仓库还没有 `.ys_team/`，引导到 `ys-team-init`。
- 如果仓库已有 `.ys_team/`，但团队、模板或约束已经不符合项目现实，引导到 `ys-team-rebuild`。
- 如果用户想先看默认工作流长什么样，引导到 bundled baseline。
- 如果当前只是澄清理念、边界或推广方式，不强行写 spec。

## Trigger Default

当仓库存在 `.ys_team/` 时，默认行为是触发 ys-team 工作流。

任何代码改动请求都先经过路由判断，按三级分流决定走哪条路径：

| 级别 | 名称 | 条件 | 流程 | 制品 |
|------|------|------|------|------|
| L0 | trivial | 单文件、无影响、用户声明 trivial | 直接执行 | 无 |
| L1 | patch | ≤3 文件、单模块内、意图清晰 | 执行 → status.md 留痕 | patch-note |
| L2 | spec | 跨模块、有风险、需讨论收敛 | 完整 spec 流程 | 全套制品 |

### L0 trivial（直接执行）

满足以下**全部**条件：
- 单文件改动
- 无跨模块影响
- 无回滚风险
- 用户明确声明是 trivial（如"修拼写错误"、"改注释"）

### L1 patch（执行 + 留痕）

满足以下**全部**条件：
- 改动范围 ≤ 3 个文件
- 影响范围在单模块内（参考 module-index.md）
- 无数据迁移、无外部 API 变更、无安全敏感操作
- 改动意图清晰，不需要多角色讨论来收敛

L1 流程：
1. 路由判断时说明为什么是 L1 而不是 L2
2. 直接执行改动
3. 在 status.md「最新判断」表中留一行记录
4. commit message 包含 `[patch]` 前缀

### L2 spec（完整流程）

不满足 L0 或 L1 条件的改动，走完整 spec 流程。

**原则**：举证责任在"降级"，而不在"触发"。不确定时，走 L2。

## TEAM.md 加载

当仓库存在 `TEAM.md` 时，ys-team 入口 skill 必须在路由判断前加载它。

`TEAM.md` 是 ys-team 工作流的唯一用户配置面板，包含：
- `mode`：工作模式（manual / semi-auto / full-auto）
- `limits`：重试上限、降级策略
- `memory`：记忆配额
- `roles`：本项目启用的角色及工具权限
- `spec_dir`：spec 目录路径

如果 `TEAM.md` 不存在，使用默认值（mode: manual，其余同 baseline）。

## 编排模式

根据 `TEAM.md` 的 `mode` 配置，ys-team 入口 skill 有三种行为模式：

### manual（默认）

现有行为完全不变。用户手动推进每个阶段，ys-team 只做路由判断。
新增的 spec-review 和 qa 阶段作为可用选项，用户可手动触发。

### semi-auto

用户提出需求后，主 session 进入编排循环，自动推进阶段流转：

1. **spec-talk**：用 Agent tool 启动 subagent，多角色讨论，产出 spec 和 requirement.md
2. **spec-review**：用 Agent tool 启动独立 subagent（prompt 只传文件路径，不传讨论历史）
   - PASS → 继续
   - REJECT → 回 spec-talk，将 review.md 作为输入，重试计数 +1
   - 重试耗尽 → halt，输出当前状态，等用户决策
3. **spec-work**：**暂停，提示用户确认后再启动** subagent 执行
4. **qa**：用 Agent tool 启动独立 subagent，验证落地效果
   - PASS → 继续
   - REJECT → 回 spec-work，将 qa-report.md 作为输入，重试计数 +1
   - 重试耗尽 → halt
5. **close**：**暂停，等用户确认后执行**以下收口清单：
   1. 角色记忆回顾写入（每个参与角色；即使中间环节漏写，close 时必须兜底回顾）
   2. workspace.md 标记 closed
   3. git commit（代码 + evidence + 记忆文件）
   4. status.md 更新（active → done）
   5. spec 目录归档（`docs/specs/active/<id>/` → `docs/specs/completed/<id>/`）

### full-auto

与 semi-auto 相同，但：
- 阶段 3（spec-work）不暂停，直接启动
- 阶段 5（close）不暂停，自动执行收口清单
- 重试耗尽时仍然暂停（自动降级为半自动）

### 编排规则

- 每个阶段的 subagent 启动时，从 TEAM.md 读取该角色的工具权限，在 prompt 中声明
- 每个阶段结束后，更新 status.md 中该 spec 的状态机字段
- 阶段间通信通过 spec 目录下的文件（requirement.md、control.md、review.md、workspace.md、qa-report.md）
- subagent prompt 只传文件路径，不传内容，确保上下文隔离
- 每个 subagent 启动时读取自己的角色记忆（`.ys_team/memory/roles/<role>.md`），结束时回顾并写入新经验

### 记忆集成

所有模式下（包括 manual），角色在工作时都应：
1. 启动时读取 `.ys_team/memory/roles/<role>.md`（如存在）
2. 读取当前 spec 的 `workspace.md`（如存在）
3. 结束时回顾本次工作，有新经验则写入角色记忆
4. 更新 workspace.md 的工作状态

记忆读写遵循 `.ys_team/memory/policy.md` 的规则。

## 排他工作流

ys-team 启用后，工作流具有排他性：

- **禁止自动触发** `.ys_team/toolbox/` 以外的任何 skill
- 已内化的工具清单见 `.ys_team/toolbox/_sources.md`
- 仅内化后的版本在工作流中可用
- 用户显式调用未内化 skill 时（如 `/skill-name`），记录该使用行为到 `.ys_team/toolbox/_candidates.md`，作为下次 rebuild 的内化候选
- 用户在 CLAUDE.md 中显式声明的全局 skill 不受此规则限制

## Toolbox 感知

路由判断时，如果 `.ys_team/toolbox/` 存在且非空：

1. 读取 `_sources.md` 了解团队已内化的工具
2. 在路由决策中考虑已内化工具的能力（如团队有 TDD 能力，执行时建议使用）
3. 角色绑定的工具（`team.md` 中的 tools 字段）在对应环节自动建议使用

## Style

- 少解释内部结构，多解释稳定原则。
- 少输出流程感，多输出边界、结果和下一步。
- 允许项目本地化，不强迫所有仓库长成同一种样子。

## Response Markers

每次经过 ys-team 路由的响应，必须以可见标记结尾，让用户能确认工作流是否运行。

**路由判断类响应**（如决定委托给 spec-talk、回答方法论问题、运行 status）使用紧凑 footer：

```
---
`ys-team` · [判断结果] → [下一步]
```

示例：`` `ys-team` · 已路由至 spec-talk → 请确认是否开始讨论 ``

**spec-talk / 讨论类响应**使用 `[主持人]` 块（由 ys-team-spec-talk 定义）。不在此重复输出。

**其他环节**也必须保留可见标志：

- `spec-review`：`**[审阅]** ys-team · spec-review`
- `spec-work`：`**[执行中]** ys-team · spec-work`
- `qa`：`**[质检]** ys-team · qa`
- `submit`：`**[验收]** ys-team · submit`
- `close`：`**[关闭]** ys-team · close`
- `status`：`**[状态]** ys-team · status`

如果当前响应末尾没有任何 `ys-team` 标记，应视为尚未进入 ys-team 工作流，并立刻回到路由判断。
