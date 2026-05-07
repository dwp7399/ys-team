---
name: ys-team-spec-talk
description: "Multi-role discussion of a non-trivial change against repo reality; converge to spec output. Use when 用户说「起一个 spec」「为这件事开 spec-talk」「多角色讨论一下」「把刚才讨论的写成 spec」等。"
---

# ys-team-spec-talk

<what-to-do>

被调用时按以下流程立即执行：

1. 按下方「Read Order」加载 `.ys_team/config.yaml` / `rules.md` / `reality.md` / 项目文档 / 相关角色记忆。
2. 按下方「Intent First」做三段判断（当前对象 / 当前目标 / 当前阻塞）；不清楚时先向用户确认。
3. 按下方「Standard Flow」组织多角色讨论并按「收敛规则」每轮判断是否仍在收敛。
4. 收敛后按「Spec 产出要求」使用 `.ys_team/templates/spec.md` 写入 `docs/specs/<phase>/<initiative-id>/spec.md`。
5. 按「角色记忆回顾」检查是否需要写入新经验（写入即输出 `> **[记忆更新]**` 通知）。
6. 按「Status 写入」更新 `.ys_team/status.md`。
7. 按「Host Summary」格式输出响应末尾。

</what-to-do>

<supporting-info>

内部委托 skill。由 ys-team 主入口在 L2 讨论需要产出正式 spec 时委托调用。

## Read Order

1. `.ys_team/config.yaml`（角色、模式）
2. `.ys_team/rules.md`（行为规则）
3. `.ys_team/reality.md`（现实索引）
4. 项目文档、领域上下文、已有 spec/ADR（如存在且相关）
5. 参与角色的记忆文件（`.ys_team/memory/<role>.md`）
6. 当前 spec 的 `work.md`（如存在，接续上下文）
7. 相关 active specs（如任务扩展已有工作）
8. `.ys_team/glossary.md`（如存在且非空；空文件跳过术语对齐环节）

## Loading Discipline

- 只加载实际参与角色的记忆
- 不保留完整讨论记录
- 讨论追问必须基于已读取的现实索引、项目文档或代码事实
- 没有依据的问题只作为假设标注，不当作结论

## Intent First

不假设每次讨论都要产出 spec。先判断：

- 当前对象是什么
- 当前目标是什么
- 当前阻塞是什么

不清楚时先确认。

## Output Routing

- initiative 级别 → `docs/specs/`
- 讨论澄清 → 无文件输出

## Standard Flow

1. 从 config.yaml 选择参与角色
1.5 **grill 检查** — 若用户显式声明（"先 grill 我"/"访谈我"/"我也没想清楚，问我"）或主持人意图三段判断为「对象=idea, 阻塞=边界不清」，进入下方「## Grill 子模式」，收口后再继续步骤 2
2. 各角色基于现实索引、项目文档、已有 spec/ADR 给出初始判断
3. 识别分歧、风险、能力缺口
4. 每轮检查是否仍在收敛（重复论点或扩大范围 → 停轮）
5. 如需临时角色，暂停请求用户审批
6. 收敛后输出结果卡 + 角色简报
7. 如需 spec，使用 `.ys_team/templates/spec.md` 模板写入

## Result Card

| 字段 | 必需 |
|------|------|
| Decision | 是（PASS / BLOCKED / REJECT） |
| Current State | 是 |
| Why | 是 |
| Next Step | 是 |

附 Role Brief：每个角色 1-2 句结论，使用本地化角色名。

## Spec 产出要求

产出的 spec 必须包含：
- Collaboration Summary（参与角色、轮次、关键分歧）
- 完整的 Write-Scope 和 Verification
- 已引用的现实依据（现实索引、项目文档、已有 spec/ADR）
- 如涉及难逆转决策，说明是否需要 ADR；不满足标准时不强行产出 ADR

spec 写入前先检查 glossary：spec.md 中出现的项目特定术语，若 `.ys_team/glossary.md` 存在但未登记该术语，提示用户是否登记到 glossary。

## 角色记忆回顾

讨论收敛后：
1. 每个参与角色读取自己的记忆文件
2. 判断是否有跨任务经验值得记录
3. 如有，写入（超限则压缩后写回）
4. 如有写入，输出通知：`> **[记忆更新]** <角色名>：<一句话>`

## Status 写入

讨论收敛后必须更新 `.ys_team/status.md`：
- `updated` 时间戳
- `活跃 Spec` 表
- `最新判断` 表（保留最近 10 条）
- `阻塞项` / `待办`

## Host Summary

响应末尾必须有：

```
---
**[主持人]** ys-team · spec-talk

[1-2 句决策描述]

- 参与角色：[角色名列表]
- 决策：PASS / BLOCKED / REJECT
- 产出：[文件路径或"无文件输出"]
- 下一步：[一个明确动作]
---
```

## Grill 子模式

适用于用户原始需求模糊、多角色横向讨论会过早分叉的场景。

### 触发

- 用户显式：`先 grill 我` / `访谈我` / `我也没想清楚，问我`
- 主持人自动：意图三段判断 `对象=idea, 阻塞=边界不清` 时

### 流程

1. 主持人识别 3-5 个核心待澄清问题，构成问题树
2. 选第一个分支问 1 个问题，等用户回答
3. 根据回答深入追问或切下一分支
4. **最多 5-7 轮强制收口**
5. 收口产物：1 段「已澄清的命题」清单
6. 收口后 fan-out 到多角色 Standard Flow（步骤 2 起）

### 退出

- 用户说 `够了` / `够清楚了` → 立即收口
- 5-7 轮上限到 → 强制收口
- 主持人判断"已能形成可讨论命题" → 主动收口

### 边界

- 一次只问一个问题
- 不在 grill 阶段做多角色讨论
- grill 收口后必须进入 fan-out，不直接产出 spec

</supporting-info>
