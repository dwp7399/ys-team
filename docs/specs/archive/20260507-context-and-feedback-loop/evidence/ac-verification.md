# Evidence — AC 验证输出（spec-work 阶段 AC-01 ~ AC-09）

## 执行命令

`spec.md` `## Verification` 段 AC-01 ~ AC-09 部分整合为单一 bash 脚本，本仓根目录执行。

## 输出（2026-05-07 spec-work 自检）

```
=== AC-01: spec.md 模板含 Feedback Loop ===
OK: examples/baseline/.ys_team/templates/spec.md
OK: skills/ys-team/baseline/.ys_team/templates/spec.md
OK: .ys_team/templates/spec.md

=== AC-02: glossary.md 存在且非空 ===
OK: examples/baseline/.ys_team/templates/glossary.md
OK: skills/ys-team/baseline/.ys_team/templates/glossary.md
OK: .ys_team/glossary.md

=== AC-03: reality.md 含「领域语言」段 ===
OK: examples/baseline/.ys_team/reality.md
OK: skills/ys-team/baseline/.ys_team/reality.md
OK: .ys_team/reality.md

=== AC-04: spec-talk SKILL.md 含新增内容 ===
AC-04 OK

=== AC-05: spec-work SKILL.md 含 Feedback Loop 校验 ===
AC-05 OK

=== AC-06: wrapper 与触发短语未被破坏 ===
OK: skills/ys-team-spec-talk/SKILL.md
OK: skills/ys-team-spec-work/SKILL.md

=== AC-07: overview.md 含两段 ===
AC-07 OK

=== AC-08: reference.md 含 Feedback Loop + glossary ===
AC-08 OK

=== AC-09: methodology VERSION bump ===
current: 1.1.0
main: 1.0.0
AC-09 OK
```

## 实测复现成本

- 阶段：spec-work（不含 npm 网络调用）
- 实测：~5 秒
- 声明上限：60 秒（含 close 阶段 npm 调用）
- 偏离：远低于上限，属正常

## gap 与人工兜底

- **gap-1**：本仓 `.ys_team/templates/spec.md` 结构与 baseline 模板有历史差异（缺 Integration Gate / Documentation Updates / Acceptance Evidence 段）。本 spec 不修复（Style Ban #6），只追加 Feedback Loop 子段。
  - 兜底：work.md 关键决策 #1 已记录；后续应单独 L1 patch 同步结构。
- **gap-2**：reviewer Note 1 提及 `20260421-baseline-status-and-role-pool-sourcing` 与 `20260421-baseline-visible-marker-hardening` 两个旧 spec 不并入本轮。
  - 兜底：close 阶段不动这两个旧 spec 目录，仅归档 0.6.0 双 spec；status.md 阻塞项保留。
