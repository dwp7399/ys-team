---
name: ys-team-spec-talk
description: Discuss a non-trivial change using the repository's local .ys_team setup, load only the selected local role files, escalate to additional roles when needed, and output specs or roadmaps only when the current objective actually requires them.
---

# ys-team-spec-talk

Use this skill to discuss a non-trivial change using project-local team guidance.

## Read Order

1. `TEAM.md`（如存在，获取 mode、limits、memory 配置）
2. `.ys_team/README.md`
3. `.ys_team/team.md`
4. `.ys_team/methods.md` if present
5. `.ys_team/policy.md`
6. 参与角色的记忆文件（`.ys_team/memory/roles/<role>.md`）
7. 当前 spec 的 `workspace.md`（如存在，用于接续之前的讨论上下文）
8. repository project/docs context
9. relevant active or queued specs or roadmaps if the task extends existing work

## Loading Discipline

- Start by reading only the short header block of candidate role files.
- Load full role files only for roles that actually participate.
- Do not retain or write full discussion transcripts.

## Intent First

Do not assume every discussion should immediately draft a spec.

Before selecting the exact path, infer from the conversation:

- what object is being discussed now
- what the current objective is
- whether the current blocker is clarity, execution readiness, missing evidence, missing expertise, or something else

If that is materially unclear, ask a concise clarification before continuing.

## Output Routing

- initiative-level executable acceptance work -> `docs/specs/`
- stage or directional planning -> `docs/roadmap/`
- discussion-only clarification -> no required repo artifact unless the user asked for one

## Standard Flow

1. Select the default discussion team from `.ys_team/team.md` unless the local method says otherwise.
2. Run one internal discussion round using the selected roles.
3. Identify risks, disagreements, capability gaps, and whether the current objective requires a spec, a roadmap, a revision to an existing artifact, or no file output.
4. After each round, check whether the discussion is still converging (see `.ys_team/methods.md` Discussion Cost Awareness). If warning signs appear, prefer to stop and emit a result card rather than silently entering another round.
5. If a gap exists and an external role may be needed, stop and produce an external support request instead of introducing that role immediately.
6. Ask the user before introducing an external role.
7. Only after approval, load the external role and continue the next round.
8. Assign one participating role with `discussion.report` responsibility to write the final summary.
9. If the current objective requires repository output, write it using `.ys_team/templates/control.md` and `.ys_team/templates/work.md` for specs, or `.ys_team/templates/roadmap-version.md` for roadmaps.

## Required Discussion Result

Every substantial discussion round must end with a result card for the user. Light discussion should still return a compact result card and role brief.

Required fields:

- `Current Mode`
- `Decision`: `PASS`, `BLOCKED`, or `REJECT`
- `Current State`
- `Why`
- `Needed Changes`
- `Next Step`

Optional fields when needed:

- `Need Your Input`
- `External Support Request`

Also include a short `Role Brief` section that summarizes each participating role's current conclusion in one or two lines. User-facing role names should prefer repository-local Chinese titles when available; otherwise use a readable fallback such as `中文标题（role-id）` or `role-id`.

Do not end with a vague recap.

## Required Additions For Written Specs Or Roadmaps

Every generated or updated spec should include:

- `Collaboration Summary`
- `Discussion Digest`

Every generated or updated roadmap should include role participation and final conclusion summary consistent with the roadmap template.

These sections should summarize:

- which roles participated
- the user-facing role titles when available
- how many rounds were used
- what escalations happened
- estimated discussion cost
- whether `ys-team-submit` is recommended for delivery review
- each role's final contribution, not a transcript

## 进化感知（角色缺口）

讨论过程中，主动检测是否存在角色缺口：

**触发条件**（满足任一即触发）：
- 讨论涉及某专业领域（安全、数据库迁移、无障碍等），但 `team.md` 中没有对应角色
- result card 中出现 `External Support Request`，且原因是缺少专业角色
- 讨论收敛为 BLOCKED，且阻塞原因涉及"缺少 XX 领域的评审/判断"

**触发后动作**：
1. 写入 `.ys_team/evolution/requests.md` 的"待处理"区：
   ```
   ### [EVO-YYYY-MM-DD-N] [日期] [类型: 角色]
   
   - 来源环节：spec-talk
   - 关联 Spec：[当前讨论的 spec]
   - 缺口描述：[具体缺什么角色/能力]
   - 发现角色：[哪个角色发现的]
   - 建议方案：[建议引入什么角色]
   - 讨论状态：待讨论
   ```
2. 在当前响应中提示用户：
   ```
   发现团队能力缺口：[描述]。已记录进化申请（EVO-YYYY-MM-DD-N）。
   建议发起一轮进化评估讨论，由团队评估是否引入新角色。
   ```
3. 如果用户同意，立即发起进化评估讨论（由现有角色参与，讨论是否引入新角色）
4. 讨论收敛后：PASS → 创建角色卡并加入 team.md / REJECT → 记录原因关闭申请

## Requirement 记录

当讨论产出 spec 时，必须同时将原始需求写入 `docs/specs/<id>/requirement.md`：

- 提取用户最初的需求描述（原文或精简版）
- 记录需求来源（用户口述、Issue 链接等）
- 此文件是 spec-review 阶段的核心输入之一

## Workspace 写入

讨论收敛后，将关键上下文写入 `docs/specs/<id>/workspace.md`：

- 讨论中的关键决策和取舍
- 各角色的核心观点摘要
- 遗留问题或待确认事项
- 长度不超过 TEAM.md 的 `memory.workspace_limit` 配置

此文件是后续阶段（spec-review、spec-work）的共享工作记忆。

## 角色记忆回顾

讨论收敛后、写入 status.md 之前，每个参与角色回顾本次讨论：

1. 读取自己的记忆文件（`.ys_team/memory/roles/<role>.md`）
2. 判断本次讨论是否有值得记录的跨任务经验
3. 如有，检查记忆是否超限：
   - 未超限：直接追加新经验
   - 已超限：结合新经验一起压缩后写回
4. 如无新经验，不写入

记忆读写遵循 `.ys_team/memory/policy.md` 的规则。

## Status 写入

讨论收敛后（产出 result card 时），必须同步更新 `.ys_team/status.md`：

1. 读取当前 `.ys_team/status.md`
2. 更新以下内容：
   - `updated` 时间戳
   - `活跃 Spec` 表：新增或更新当前讨论的 spec 条目（阶段 = spec-talk，状态 = 讨论中/已收敛）
   - `最新判断` 表：追加本轮 result card 的决定（PASS/BLOCKED/REJECT），保留最近 10 条
   - `阻塞项`：如果决定为 BLOCKED，追加阻塞原因；如果之前阻塞已解除，移除
   - `待办`：根据 Next Step 更新
3. 写入完成后再输出 Host Summary

此写入是 spec-talk 的固定环节，不可跳过。

## Host Summary

After writing or updating the target document (or concluding a discussion-only round), close the response with a **[主持人]** summary block. This block is mandatory — it is the visible signal that ys-team workflow ran.

Format:

```
---
**[主持人]** ys-team · spec-talk

[1–2 sentences describing what was decided or produced.]

- 参与角色：[localized role titles, comma-separated]
- 决策：PASS / BLOCKED / REJECT
- 产出：[artifact path, e.g. docs/specs/active/xxx/control.md, or "无文件输出"]
- 下一步：[one concrete next action]
---
```

Rules:
- Use repository-local localized role titles when available; otherwise use readable fallback.
- Keep the block to 5–7 lines. Do not expand into a full recap.
- If the discussion was BLOCKED or REJECT, the 下一步 line must state what is needed to unblock.
- Do not omit this block even for discussion-only rounds with no file output.
