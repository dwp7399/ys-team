---
name: ys-team-spec-work
description: "Silent internal execution capability for approved ys-team specs. Execute repository work against the local spec baseline and keep docs and evidence aligned."
---

# ys-team-spec-work

This is a silent internal skill.

Use it to execute approved work against an existing repository spec.

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
