# Baseline Changelog

记录 `examples/baseline/` 及其直接配套接入面的结构化变化，供用户迁移、rebuild 判断和后续 `check-update` 摘要提取使用。

## [0.4.0] - Unreleased

### What Changed

- 新增 baseline 级 `CHANGELOG.md`，开始按版本沉淀 `What Changed / Why / Key Files / Migration Hint`
- 后续 v0.4 的 baseline 变化将在此条目下持续追加，直到正式发版

### Why

- 用户在 `check-update` 看到落后版本时，需要知道“改了什么”和“该怎么迁移”
- v0.4 进入兑现阶段，需要一份能被人读也能被工具提取的变更源

### Key Files

- `examples/baseline/CHANGELOG.md`
- `examples/baseline/AGENTS.md`
- `docs/methodology/06-bootstrap-and-evolution.md`

### Migration Hint

- 从这一版开始，baseline 发生重大变更时同步阅读本文件；如果项目本地 baseline 长期滞后，优先结合 `rebuild` 和 changelog 判断是否需要补齐模板、策略或说明文件

## [0.3.2] - 2026-04-14

### What Changed

- 将 ai-gateway 实战验证过的治理规则回流到 baseline，包括 `Infer First`、讨论成本意识、`Spec-Review Gate`、`QA Gate`、记忆隐私约束等
- 对齐发布线治理：明确 `release/<version> -> publish -> merge main -> tag` 的发布顺序，并统一 baseline 与本仓版本线

### Why

- baseline 需要反映真实项目里被验证过的治理规则，而不是停留在最初简版
- 发布线和主干内容一度脱节，需要把“版本号一致”升级为显式治理规则

### Key Files

- `examples/baseline/.ys_team/methods.md`
- `examples/baseline/.ys_team/policy.md`
- `examples/baseline/.ys_team/memory/policy.md`
- `examples/baseline/AGENTS.md`
- `examples/baseline/.ys_team/VERSION`

### Migration Hint

- 若项目初始化于 `0.3.1` 或更早，优先对比并补齐 `methods.md`、`policy.md`、`memory/policy.md` 和 `AGENTS.md`
- 若项目自带发布流程，确认本地发布 gate 与 baseline 的发布顺序规则一致

## [0.3.1] - 2026-04-10

### What Changed

- 补齐 semi-auto / full-auto 所需的四个阶段通信模板：`requirement.md`、`workspace.md`、`review.md`、`qa-report.md`
- 修正 baseline bundling 与 rebuild/install 路径问题，避免项目拿到不完整的 baseline 资产

### Why

- 在 `0.3.0` 引入自动编排后，baseline 模板仍不完整，实际项目无法稳定跑通完整链路
- 安装或 rebuild 如果没有把 baseline 资产放对位置，用户即使升级也无法获得完整模板

### Key Files

- `examples/baseline/.ys_team/templates/requirement.md`
- `examples/baseline/.ys_team/templates/workspace.md`
- `examples/baseline/.ys_team/templates/review.md`
- `examples/baseline/.ys_team/templates/qa-report.md`
- `skills/ys-team/`

### Migration Hint

- 若项目缺少上述四个模板，优先执行一次 `rebuild`
- 若本地安装的 skills 中 baseline 目录不完整，重新安装或重新初始化项目，再核对模板文件是否齐全

## [0.3.0] - 2026-04-10

### What Changed

- 正式建立 v0.3 基线：引入 `manual / semi-auto / full-auto` 编排模式、`TEAM.md` 配置入口和角色记忆结构
- CLI 新增 `check-update`，开始支持本地版本与 npm 最新版的对比

### Why

- ys-team 需要从“静态文档集合”升级为可执行的默认工作流骨架
- 项目升级后需要一个最小的版本感知入口，避免用户完全靠人工猜测是否落后

### Key Files

- `examples/baseline/TEAM.md`
- `examples/baseline/.ys_team/memory/`
- `examples/baseline/.ys_team/team.md`
- `scripts/ys-team.mjs`

### Migration Hint

- 从更早版本升级到 `0.3.0` 时，先确认项目本地已存在 `TEAM.md` 和 `.ys_team/memory/`
- 如果本地仍是旧骨架，优先执行初始化或 rebuild，再开始使用 semi-auto / full-auto
