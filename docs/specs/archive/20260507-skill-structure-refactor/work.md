# Work Log — 0.6.0 Spec A: Skill 结构重构

## 执行轨迹

| 时间 | 阶段 | 角色 | 内容 |
|------|------|------|------|
| 2026-05-07 | spec-talk | arch / pm / gate | 三角色收敛 spec.md |
| 2026-05-07 | spec-review | reviewer | 8 项检查全 OK，PASS（含 2 个 Note） |
| 2026-05-07 | spec-work | arch | 切 release/0.6.0 分支后执行 |

## 实施步骤

### 1. 4 个 SKILL.md 的 description 替换

按 spec 模板：每个 description 含一句话定位 + `Use when 用户说「...」「...」「...」「...」等`，4 个中文触发短语。Chinese corner brackets `「」` 用于嵌套引号，避免 YAML 字符串解析冲突。

替换前/后对照保存于 `evidence/diff-summary.md`。

### 2. 4 个 SKILL.md 的 wrapper 注入

每个文件按以下骨架重组：

```
---
frontmatter
---

# <title>

<what-to-do>
<新增：被调用时立即执行的指令清单>
</what-to-do>

<supporting-info>

<原有正文，逐字保留，章节顺序不变>

</supporting-info>
```

`<what-to-do>` 内容是从原有正文中提炼出的执行步骤摘要，但不删除原有正文 — 原有 Routing / Read Order / Standard Flow / Execution / Status 写入等章节全部保留在 `<supporting-info>` 内，由 `<what-to-do>` 通过「按下方 ××」指针引用。

### 3. 关键决策

- **Chinese corner brackets**：使用 `「」` 而非 ASCII `"` 嵌套，YAML 字符串无需转义，且与 ASCII 引号视觉区分。
- **what-to-do 长度**：每个 4-7 步，每步一句，便于 agent 解析与人类阅读。
- **supporting-info 边界**：从 `# title` 之后的第一段开始包裹，到原文最后一行结束；title 留在 wrapper 外作为文档头。
- **保留 ASCII em-dash**：原 ys-team description 中的 ` — ` 在重写时改为 `, `，因为 `—` 作为分隔已无必要（新 description 用句号分段）。

## 阻塞 / 例外

无。

## reviewer Note 处理

| Note | 处理 |
|------|------|
| AC-04 diff `-` 行解释 | 已在 `evidence/diff-summary.md` 中显式标注「4 个 `-` 行均为 frontmatter description 替换，符合 AC-04 期望」 |
| AC-05 reroute case 复核记录 | 已写入 `evidence/reroute-cases.md`，4 个用例 + 实际匹配证据 |

## Verification 结果（自检）

- AC-01：4 个 description 均含 `Use when` + 4 个中文触发短语 ✓
- AC-02：4 个 SKILL.md 各含 1 个 `<what-to-do>` 块 ✓
- AC-03：4 个 SKILL.md 各含 1 个 `<supporting-info>` 块 ✓
- AC-04：diff `-` 行 = 4，全部为旧 description；diff 其余均为 `+` 行 ✓
- AC-05：4 个 reroute case 全部命中预期 skill（见 evidence）✓
- AC-06：baseline / 方法论 / spec template / package.json / VERSION 无 diff ✓
- AC-07：本 spec 不进 close，由 Spec B 统一发版（status.md 阻塞项已记录）✓

## 下一步

- qa 阶段独立验证（按 Verification 命令复跑）
- qa PASS 后 Spec A 停 active，启动 Spec B（0.6.0-context-and-feedback-loop）的 spec-talk
