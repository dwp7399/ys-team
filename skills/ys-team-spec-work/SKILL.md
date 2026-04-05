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
