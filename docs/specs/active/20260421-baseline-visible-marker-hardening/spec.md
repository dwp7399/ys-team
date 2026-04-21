---
Spec-Type: control
Initiative: 20260421-baseline-visible-marker-hardening
Status: in-progress
Owner-Session: ys-team-spec-work
Write-Scope:
  - examples/baseline/AGENTS.md
  - examples/baseline/CLAUDE.md
  - examples/baseline/CHANGELOG.md
  - examples/baseline/.ys_team/VERSION
  - skills/ys-team/baseline/AGENTS.md
  - skills/ys-team/baseline/CLAUDE.md
  - skills/ys-team/baseline/CHANGELOG.md
  - skills/ys-team/baseline/.ys_team/VERSION
  - ../apostle/AGENTS.md
  - ../apostle/CLAUDE.md
  - ../apostle/.ys_team/VERSION
  - ../apostle/.ys_team/status.md
  - .ys_team/status.md
  - docs/specs/active/20260421-baseline-visible-marker-hardening/**
Delete-Scope: []
Depends-On: []
Verification: "见 ## Verification"
---

# baseline 可见标志 hardening 与 apostle 入口回灌

## Background

当前 ys-team baseline 的 `AGENTS.md` / `CLAUDE.md` 只要求“回复末尾必须出现 `ys-team` 标志”，但没有固定列出各阶段的精确格式，也没有声明“缺少可见标志就视为未进入 ys-team 工作流”。这会让不同 agent 对规则的执行强度不一致，尤其在 Codex 侧更容易漏掉底部阶段标志。

本仓自用 `AGENTS.md` 已经采用更强的约束，而外部项目通过 `init` / `rebuild` 拿到的仍是 baseline 入口文件，因此 baseline 与项目入口需要同步补强。

## Goals

1. baseline 的 `AGENTS.md` / `CLAUDE.md` 明确列出 ys-team 各阶段的固定可见标志格式。
2. baseline 入口显式声明：若当前回复末尾没有可见标志，视为未进入 ys-team 工作流，必须切回路由。
3. `skills/ys-team/baseline/` 同步副本与 `examples/baseline/` 保持一致。
4. apostle 入口文件同步采用同一口径，并把本地 baseline VERSION 对齐到本轮更新。

## Non-goals

- 不在本轮修改 `ys-team-init` / `rebuild` 逻辑。
- 不在本轮重写完整 baseline 结构，只 harden 可见标志入口。

## Deliverables

- baseline `AGENTS.md` / `CLAUDE.md` 增加精确可见标志格式与缺标志回退规则
- baseline 同步副本、CHANGELOG、VERSION 同步更新
- apostle 的 `AGENTS.md` / `CLAUDE.md` / `.ys_team/VERSION` / `status.md` 回灌

## Acceptance Criteria

- AC-01：`examples/baseline/AGENTS.md` 明确列出 route/spec-talk/spec-review/spec-work/qa/close/status 的固定标志格式。
- AC-02：`examples/baseline/AGENTS.md` 明确声明“缺少可见标志 = 未进入 ys-team 工作流，必须切回路由”。
- AC-03：`examples/baseline/CLAUDE.md` 使用与 baseline `AGENTS.md` 一致的可见标志口径。
- AC-04：`skills/ys-team/baseline/AGENTS.md`、`skills/ys-team/baseline/CLAUDE.md`、对应 CHANGELOG 与 VERSION 与 `examples/baseline/` 同步。
- AC-05：apostle 的 `AGENTS.md` 至少同步到新的可见标志口径，且本地 `.ys_team/VERSION` 升级。

## Verification

```bash
diff -u examples/baseline/AGENTS.md skills/ys-team/baseline/AGENTS.md
diff -u examples/baseline/CLAUDE.md skills/ys-team/baseline/CLAUDE.md
diff -u examples/baseline/CHANGELOG.md skills/ys-team/baseline/CHANGELOG.md
diff -u examples/baseline/.ys_team/VERSION skills/ys-team/baseline/.ys_team/VERSION
rg -n "可见标志|spec-talk|spec-review|spec-work|qa|close|status|缺少可见标志|请先进入 ys-team 工作流" examples/baseline/AGENTS.md examples/baseline/CLAUDE.md ../apostle/AGENTS.md ../apostle/CLAUDE.md
sed -n '1,120p' ../apostle/.ys_team/VERSION
sed -n '1,80p' ../apostle/.ys_team/status.md
```

## Risks

- 如果 baseline 入口和同步副本再次分叉，`init-project` 与 npm 安装面会继续表现不一致。
- 如果只补 `AGENTS.md` 不补 `CLAUDE.md`，Claude / Codex 两侧的入口强度仍会漂移。

## Rollback Plan

- 若项目侧反馈入口约束过强，可回滚到“保留固定标志格式但不把缺标志视为失效”的较弱版本。
