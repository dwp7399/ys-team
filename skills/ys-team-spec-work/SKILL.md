---
name: ys-team-spec-work
description: "Silent internal execution capability for approved ys-team specs. Execute repository work against the local spec baseline and keep docs and evidence aligned."
---

# ys-team-spec-work

This is a silent internal skill.

Use it to execute approved work against an existing repository spec.

> 制品定义见 `docs/methodology/04-artifact-schema.md`，治理规则见 `05-governance.md`。

## Purpose

- implement against the approved spec
- keep write-scope explicit
- update authoritative docs in the same delivery
- collect evidence for acceptance

## Rules

- do not execute against vague discussion alone
- use the local spec as the working contract
- keep implementation, docs, and evidence in sync
- surface blockers instead of silently changing scope

## Read Order

1. `TEAM.md`（如存在，获取 mode、limits、memory 配置）
2. 当前 spec 的 `control.md`（执行合约）
3. 当前 spec 的 `workspace.md`（工作记忆，了解前序阶段的上下文）
4. 当前 spec 的 `qa-report.md`（如存在，说明是 QA 打回后的重试，需针对性修复）
5. 执行角色的记忆文件（`.ys_team/memory/roles/<role>.md`）
6. `.ys_team/policy.md`

## Workspace 更新

执行过程中持续更新 `docs/specs/<id>/workspace.md`：

- 执行开始时：记录执行计划和预期步骤
- 遇到关键决策时：记录决策和原因
- 遇到阻塞时：记录阻塞原因和尝试的解决方案
- 执行完成时：记录完成状态和实际变更摘要

长度不超过 TEAM.md 的 `memory.workspace_limit` 配置。

## 角色记忆回顾

执行完成后，角色回顾本次工作：

1. 读取自己的记忆文件
2. 判断是否有值得记录的跨任务经验（技术陷阱、模块特殊知识等）
3. 如有，检查记忆是否超限，超限则压缩后写回
4. 如无新经验，不写入

## 进化感知（工具缺口）

执行过程中，主动检测是否存在工具缺口：

**触发条件**（满足任一即触发）：
- 执行需要某种工作方法（如 TDD、前端设计规范、性能基准测试）但 `.ys_team/toolbox/` 中没有对应工具
- 执行到某个步骤发现"如果有 XX 工具会更高效/更安全"
- 角色的 tools 字段为空，但执行内容明显需要工具辅助

**触发后动作**：
1. 写入 `.ys_team/evolution/requests.md` 的"待处理"区：
   ```
   ### [EVO-YYYY-MM-DD-N] [日期] [类型: 工具]
   
   - 来源环节：spec-work
   - 关联 Spec：[当前执行的 spec]
   - 缺口描述：[具体缺什么工具/能力]
   - 发现角色：[哪个角色在执行中发现的]
   - 建议方案：[建议内化什么工具]
   - 讨论状态：待讨论
   ```
2. 在当前响应中提示用户：
   ```
   发现工具缺口：[描述]。已记录进化申请（EVO-YYYY-MM-DD-N）。
   建议在当前 spec-work 完成后发起进化评估，由团队评估是否内化新工具。
   ```
3. **不中断当前执行**——工具缺口不阻塞 spec-work，先记录，完成后再评估

## Status 写入

在以下关键节点必须同步更新 `.ys_team/status.md`：

**执行开始时**：
1. 读取当前 `.ys_team/status.md`
2. 更新 `updated` 时间戳
3. 更新 `活跃 Spec` 表：当前 spec 阶段改为 spec-work，状态改为"执行中"
4. 写入

**执行完成时**：
1. 读取当前 `.ys_team/status.md`
2. 更新 `updated` 时间戳
3. 更新 `活跃 Spec` 表：当前 spec 状态改为"待验收"
4. `待办` 追加：建议运行 submit 验收
5. 写入

**遇到阻塞时**：
1. 更新 `活跃 Spec` 表状态为"已阻塞"
2. `阻塞项` 追加阻塞原因
3. 写入

此写入是 spec-work 的固定环节，不可跳过。

## Visible Marker

每次 `spec-work` 对用户输出后，必须以以下块结尾，作为工作流正在执行的可见标志：

```markdown
---
**[执行中]** ys-team · spec-work

[1–2 句说明当前执行内容或本轮完成内容。]

- 关联 Spec：[spec id 或 work 文件]
- 状态：[执行中 / 待验收 / 已阻塞]
- 下一步：[一个明确动作]
---
```
