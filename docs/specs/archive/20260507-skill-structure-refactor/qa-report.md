# QA Report — 0.6.0 Spec A: Skill 结构重构

## 结论

**Decision**: PASS

由独立 subagent（扮演 qa 角色）执行 spec.md `## Verification` 全部命令并交叉抽查得出。

## AC 验证表

| AC | 判断 | 摘要 |
|----|------|------|
| AC-01 | OK | 4 个 description 全含 `Use when 用户说` 锚点 + 4 个中文触发短语（≥3）|
| AC-02 | OK | 4 个 SKILL.md 各 1 开 1 闭 `<what-to-do>` |
| AC-03 | OK | 4 个 SKILL.md 各 1 开 1 闭 `<supporting-info>` |
| AC-04 | OK | `git diff main` 真实 `-` 行 = 4，全部为旧 description；无原文删除 |
| AC-05 | OK | reroute 抽查 "rebuild baseline" 用例：description 触发短语命中 + what-to-do 步骤 3 分流 + supporting-info 内 `## Rebuild 模式` 章节保留 |
| AC-06 | OK | baseline / 方法论 / spec template / package.json / VERSION 0 改动 |
| AC-07 | OK | spec.md 显式声明"qa PASS 后停 active 不进 close"，硬约束已写入 AC |

## 额外审视

| # | 项 | 结果 |
|---|----|------|
| 1 | AC-04 真实性 | OK（4 行全部为旧 description）|
| 2 | reroute 抽查链路自洽 | OK |
| 3 | 章节顺序未重排（抽查 ys-team SKILL.md：Public Model → Routing → Config 加载 → 编排模式 → 讨论能力 → 状态查询 → Style → Response Markers）| OK |
| 4 | Wrapper 平衡（开/闭对、前后顺序）| OK |
| 5 | YAML 合法性（中文 `「」` 不破坏 frontmatter）| OK |
| 6 | gap 暴露质量 | OK（边缘可接受）|

## gap 与人工兜底

- **gap-1**：spec.md AC-04 措辞「diff 仅新增 wrapper 与 description 增强」与实际"description 整段替换会产生 4 个 `-` 行"存在歧义。处理方式：reviewer 阶段提前识别为 Note 1，evidence/diff-summary.md 显式标注 `-` 行口径，QA 接受。
- **gap-2**：evidence 未独立列出 spec-work 链路中工程决策为"gap"，而是混在 work.md「关键决策」段。处理方式：审视后认为本 spec 风险极低，决策已被书面记录，本次予以放行；后续高风险 spec（如 Spec B 引入领域语言层）须严格按 gate 角色记忆把 gap 写入 evidence。

## 下一步

按 spec.md AC-07：本 spec qa PASS 后停 `docs/specs/active/`，不进 close、不归档。由 Spec B（0.6.0-context-and-feedback-loop）的 close 阶段统一发 0.6.0 并同时归档双方。
