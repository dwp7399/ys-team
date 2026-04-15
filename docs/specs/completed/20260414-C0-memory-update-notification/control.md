---
Spec-Type: control
Initiative: 20260414-C0-memory-update-notification
Status: queued
Owner-Session: ys-team
Write-Scope:
  - skills/ys-team-spec-talk/SKILL.md
  - skills/ys-team-spec-work/SKILL.md
  - skills/ys-team-submit/SKILL.md
Depends-On: []
Verification: "手动跑一次 spec-talk 并触发记忆写入，确认响应中出现记忆更新通知块"
---

# C0：角色记忆更新可见通知

## Background

角色记忆写入是静默操作，用户无法感知哪个角色在什么时候积累了什么经验。这削弱了记忆系统的存在感，也让用户难以验证记忆是否真正被触发。

## Goals

每当角色记忆发生实际写入时，在当轮响应中输出一条可见通知，让用户能看到"谁的记忆更新了、更新了什么"。

## Deliverables

在 spec-talk、spec-work、submit 三个 skill 的「角色记忆回顾」段，新增写入通知规则：

```
> **[记忆更新]** <角色名>：<一句话描述新增的经验>
```

- 仅在实际写入时输出，无新经验则不输出此行
- 位置：Host Summary 之前
- 可多行（多个角色各一行）

## Acceptance Criteria

- [ ] spec-talk/spec-work/submit 的 SKILL.md 均有记忆写入通知规则
- [ ] 格式统一：`> **[记忆更新]** <角色名>：<经验摘要>`
- [ ] 无新经验时不输出该行（无噪音）
- [ ] 通知内容是一句话摘要，不是完整记忆内容

## Collaboration Summary

- Participants: 方法论架构师
- Reporter: 方法论架构师
- Estimated Cost: 极低

## Risks

- 无

## Rollback Plan

从三个 SKILL.md 中移除新增的通知规则段落。
