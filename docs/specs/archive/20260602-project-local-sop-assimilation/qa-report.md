# QA Report: 20260602-project-local-sop-assimilation

日期：2026-06-02

结论：PASS

## 范围

本 QA 验证项目本地 SOP 机制是否按 spec 落到方法论文档、用户文档、baseline 双副本、本仓本地 `.ys_team`、skills 和版本线。本 spec 不修改运行时代码。

## Verification

已重新执行 spec Verification：

- 项目本地 SOP 正向关键词检查：PASS。
- rules/checklist 条件式 gate 检查：PASS。
- spec-review hardening 关键词检查：PASS。
- 业务细节反向检查：PASS，未在实现面出现项目业务词。
- 发布线版本检查：PASS，`package.json`、`.ys_team/VERSION`、`examples/baseline/.ys_team/VERSION`、`skills/ys-team/baseline/.ys_team/VERSION` 均为 `0.6.5`。
- 方法论版本检查：PASS，`docs/methodology/VERSION` 为 `1.3.0`。
- `npm pack --dry-run`：PASS，输出 `ys-team@0.6.5`，total files 198。

QA 复跑结果与 `evidence/work-01-verification.md` 一致。

## AC Matrix

| AC | 结果 | 说明 |
| --- | --- | --- |
| AC-01 | PASS | 方法论文档定义项目本地 SOP，边界是项目高频领域工作 |
| AC-02 | PASS | reference 明确区分角色记忆和项目本地 SOP |
| AC-03 | PASS | README / getting-started 说明项目实践可本地沉淀且不增加用户命令负担 |
| AC-04 | PASS | baseline rules 双副本包含本地 SOP 且声明不改变 L0/L1/L2 |
| AC-05 | PASS | baseline checklist 双副本 close 阶段包含条件式 gate |
| AC-06 | PASS | baseline spec template 双副本包含 Project Local SOP Gate |
| AC-07 | PASS | 本仓 `.ys_team` rules/checklist/spec template 已同步 |
| AC-08 | PASS | reference 的 spec-review 检查项覆盖依赖/吸收冲突、Data Contract、单写入/聚合、evidence、rollback 和可停止边界 |
| AC-09 | PASS | 4 个 skill 包含本地 SOP 识别、沉淀、执行 gate 和 rebuild 保留口径；未复制项目业务细节 |
| AC-10 | PASS | `ys-team-init` 明确 rebuild 保留项目本地 SOP 定制 |
| AC-11 | PASS | 发布线版本为 0.6.5，方法论版本为 1.3.0 |
| AC-12 | PASS | evidence 覆盖关键词、反向检查、版本和打包干跑 |

## Scope Check

`git diff --name-only` 显示的 tracked 变更均在 Write-Scope 内。当前 spec 目录受 `.gitignore` 的 `docs/specs/` 规则影响，最终 commit 需要 `git add -f docs/specs/active/20260602-project-local-sop-assimilation`。

## Residual Risk

- `npm pack --dry-run` 已通过，但真实 `npm publish` 仍需 close 阶段执行并保存证据。
- 工作区存在本轮无关未跟踪 `share/` 目录，QA 未纳入本 spec，也不应提交。

## Decision

QA PASS。可进入 close。
