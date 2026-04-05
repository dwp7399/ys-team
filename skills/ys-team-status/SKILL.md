---
name: ys-team-status
description: "Silent internal status capability. Read the pre-built status snapshot and display it — zero token cost for status queries."
---

# ys-team-status

This is a silent internal skill.

Use it to display the live ys-team state of a repository.

## Purpose

读取 `.ys_team/status.md` 并格式化展示团队当前状态。

**不调用大模型分析**——状态数据由各工作流环节在关键节点写入，status 只负责读取和展示。

## Behavior

1. 读取 `.ys_team/status.md`
2. 如果文件不存在或 `updated` 为空（`—`），提示："团队状态尚未初始化。首次执行 spec-talk 或 spec-work 后，状态会自动更新。"
3. 如果文件存在且有数据，格式化输出：
   - 活跃 Spec 列表
   - 最新判断（最近 5 条）
   - 阻塞项（高亮显示）
   - 待办事项
4. 检查 `.ys_team/VERSION` 与 baseline 版本对齐

## Version Notice

如果 `.ys_team/VERSION` 存在且低于 baseline 版本，追加：

```
ys-team baseline 有更新（当前 X.Y.Z，最新 A.B.C）。运行 /ys-team-rebuild 同步。
```

## Status 数据写入方

status.md 由以下环节在关键节点写入（不是 status skill 的职责）：

- `spec-talk`：讨论收敛时（PASS / BLOCKED / REJECT）
- `spec-work`：执行开始、执行完成时
- `submit`：验收判断时
- `rebuild`：团队配置变更后

## Completed Spec Policy

默认不读取 completed / cancelled spec 内容。

输出格式：`Completed: N specs | Cancelled: N specs`

Exception: 用户明确要求查看历史时（如"上个月做了什么"），读取 completed specs。

## status.md 格式

```markdown
# 团队状态

updated: [ISO 8601 时间戳]

## 活跃 Spec

| Spec | 阶段 | 负责角色 | 状态 |
|------|------|---------|------|

## 最新判断

| 时间 | Spec | 角色 | 决定 | 原因 |
|------|------|------|------|------|

## 阻塞项

## 待办
```
