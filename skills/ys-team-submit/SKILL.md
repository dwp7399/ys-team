---
name: ys-team-submit
description: "Silent internal delivery-review capability. Recheck acceptance, evidence, documentation sync, and rollback readiness before a repository closes out significant work."
---

# ys-team-submit

This is a silent internal skill.

Use it when a repository needs a heavier delivery gate.

## Purpose

- review spec acceptance against actual delivery
- verify evidence completeness
- verify documentation sync
- verify rollback and risk notes when required

## Rules

- focus on delivery truth, not optimistic summary
- call out missing evidence or unsynced docs clearly
- prefer explicit PASS/BLOCKED/REJECT outcomes

## Status 写入

验收判断完成后，必须同步更新 `.ys_team/status.md`：

1. 读取当前 `.ys_team/status.md`
2. 更新 `updated` 时间戳
3. 更新 `最新判断` 表：追加验收决定（PASS/BLOCKED/REJECT + 原因），保留最近 10 条
4. 根据决定更新 `活跃 Spec` 表：
   - PASS：移除该 spec（已交付）
   - BLOCKED：状态改为"验收阻塞"，`阻塞项` 追加原因
   - REJECT：状态改为"已驳回"，`待办` 追加需要修正的内容
5. 写入

此写入是 submit 的固定环节，不可跳过。
