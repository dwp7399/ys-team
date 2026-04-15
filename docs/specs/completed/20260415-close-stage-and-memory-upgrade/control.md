---
Spec-Type: control
Initiative: 20260415-close-stage-and-memory-upgrade
Status: completed
Owner-Session: ys-team
Write-Scope:
  - skills/ys-team/SKILL.md
  - .ys_team/memory/policy.md
  - .ys_team/memory/roles/
  - examples/baseline/.ys_team/memory/policy.md
Depends-On: []
Verification: "检查 ys-team SKILL.md close 阶段有 5 步清单；policy.md 格式段有三段式要求；现有角色记忆文件符合新格式"
---

# close 阶段收口完整化 + 记忆格式升级

## Background

来源：ai-gateway 实战中发现四个问题：
1. close 阶段只有 git commit + status.md，缺少记忆写入、workspace 标记和目录归档
2. 角色记忆文件内容是事实记录而非判断规则，复用价值低
3. subagent 被告知 read-only 时记忆写入权限被覆盖，close 清单没有兜底回顾
4. memory.role_memory_limit 在 policy.md 中引用但 TEAM.md 字段命名不一致

## Goals

1. close 阶段有完整收口清单，memory 写入由 close 兜底，不依赖中间环节
2. policy.md 记忆格式升级为三段式（错误模式 / 正确做法 / 适用场景），禁止纯事件描述
3. 现有角色记忆文件按新格式重写
4. baseline 同步

## Deliverables

**D1：close 清单完整化**（`skills/ys-team/SKILL.md`）

close 阶段 5 步收口清单：
```
1. 角色记忆回顾写入（每个参与角色，有新经验则写入）
2. workspace.md 标记 closed
3. git commit（代码 + evidence + 记忆文件）
4. status.md 更新（active → done）
5. spec 目录归档（active/ → completed/）
```

**D2：记忆格式升级**（`policy.md`）

格式要求改为三段式，禁止纯事实记录：
```
## <场景主题>

**错误模式**：<在什么情况下容易犯什么错>
**正确做法**：<应该怎么做，越具体越好>
**适用场景**：<什么时候这条规则生效>
```

**D3：现有记忆文件重写**（`.ys_team/memory/roles/*.md`）

对 ys-team 仓库内所有现有角色记忆文件，按新格式重写，将事实记录转化为判断规则。

**D4：baseline 同步**（`examples/baseline/.ys_team/memory/policy.md`）

将 D2 的格式规范同步到 baseline。

## Acceptance Criteria

- [x] `skills/ys-team/SKILL.md` close 阶段有明确的 5 步收口清单
- [x] close 清单第 1 步明确：即使中间环节漏写记忆，close 时必须兜底回顾
- [x] `.ys_team/memory/policy.md` 格式段描述三段式，明确"禁止纯事实记录"
- [x] `.ys_team/memory/roles/*.md` 所有非空文件符合新格式（无纯事件描述条目）
- [x] `examples/baseline/.ys_team/memory/policy.md` 与本仓 policy.md 格式段一致
- [x] `spec 目录归档` 步骤说明从哪个目录移到哪个目录

## Discussion Digest

- Rounds: 1
- Conclusion: PASS
- Closeout Note: 本项已在 2026-04-15 完成交付守门人验收，当前 control 仅补收口状态

## Verification

- 检查 `skills/ys-team/SKILL.md` close 阶段是否为 5 步清单，且第 1 步明确记忆兜底
- 检查 `.ys_team/memory/policy.md` 与 `examples/baseline/.ys_team/memory/policy.md` 是否都要求三段式记忆格式
- 检查 `.ys_team/memory/roles/*.md` 的现有非空文件是否已改为判断规则表达

## Collaboration Summary

- Participants: 方法论架构师、产品演进负责人
- Reporter: 方法论架构师
- Estimated Cost: 低（来源于实战诊断，方向已明确）

## Risks

- 现有记忆文件重写（D3）依赖执行者理解新格式，可能重写质量不稳定
- 如果 ai-gateway 仓库的 policy.md 与本仓不同步，需另行处理（不在本 spec 范围内）

## Rollback Plan

恢复 SKILL.md close 阶段原文；恢复 policy.md 格式段；不需要恢复角色记忆文件（重写后的版本质量更高）。
