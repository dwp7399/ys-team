# Module Index

**Project Type**: Markdown-first method repository
**Project Scale**: Small
**Index Strategy**: Core module index
**Last Updated**: 2026-04-13

## `docs/methodology/`（平台无关方法论规范）
**职责**：`docs/methodology/` 承载 ys-team 方法论的完整规范，独立于任何 AI 平台实现。它定义状态机、角色协议、讨论协议、制品 schema、治理规则和初始化/演进协议。

**关系**：
- 入口：`docs/methodology/00-overview.md`、`docs/methodology/01-state-machine.md`
- 被依赖：所有 `skills/*/SKILL.md`（作为平台适配器引用方法论规范）、`examples/baseline/`、`.ys_team/`
- 版本：`docs/methodology/VERSION`

## `docs/guide/`（用户向使用指南）
**职责**：`docs/guide/` 面向个人开发者，用通俗语言解释"为什么需要 ys-team"和"怎么用"。它不重复 methodology 的形式化定义，而是建立心智和使用感。

**关系**：
- 入口：`docs/guide/why-ys-team.md`、`docs/guide/getting-started.md`
- 引用：`docs/methodology/`（深入阅读链接）
- 被依赖：`README.md`（文档地图链接到 guide）

## `skills/`（方法入口与执行能力）
**职责**：`skills/` 承载对外公开的 `ys-team` 方法入口，以及 init、rebuild、doc-build、spec-talk、spec-work、status、submit 等执行能力。它决定用户如何理解 ys-team，以及仓库如何把 baseline 和本地 reality 连接起来。  

**关系**：
- 入口：`skills/ys-team/SKILL.md`, `skills/ys-team-init/SKILL.md`, `skills/ys-team-rebuild/SKILL.md`, `skills/ys-team-doc-build/SKILL.md`
- 依赖：`examples/baseline/`, `.ys_team/`, `docs/project/`, `README.md`
- 被依赖：使用 ys-team 的外部仓库、方法仓自测与演进

## `examples/baseline/`（默认工作流骨架）
**职责**：`examples/baseline/` 是 `ys-team-init` 和 `ys-team-rebuild` 的默认来源，提供最小公开心智下的 `.ys_team/` 结构和项目目录骨架。它不是具体项目实现，而是可被项目本地化的起点。  

**关系**：
- 入口：`examples/baseline/.ys_team/*`, `examples/baseline/AGENTS.md`, `examples/baseline/README.md`
- 依赖：方法论定义来自 `skills/ys-team/*` 与仓库文档
- 被依赖：`ys-team-init`, `ys-team-rebuild`, 外部项目初始化流程

## `.ys_team/` + `TEAM.md`（方法仓自用本地基线）
**职责**：本仓自己的 `.ys_team/` 用来”用 ys-team 管理 ys-team”，把方法仓的 spec、文档同步和交付约束落到仓库内部。v0.3.0 起新增 `memory/` 角色记忆系统，以及 `TEAM.md` 编排模式配置入口。它在 baseline 之上保留方法仓特有角色：方法论架构师、产品演进负责人、交付守门人。

**关系**：
- 入口：`TEAM.md`, `.ys_team/team.md`, `.ys_team/methods.md`, `.ys_team/policy.md`, `.ys_team/templates/*`
- 记忆：`.ys_team/memory/roles/*.md`（按角色独立，跨任务经验积累）
- 依赖：`examples/baseline/.ys_team/` 提供稳定骨架版本，`docs/project/*` 提供仓库现实
- 被依赖：本仓 specs、方法仓自身 rebuild 判断

## `docs/project/`（方法论现实与结构说明）
**职责**：`docs/project/` 记录 ys-team 仓库现状、结构和模块职责，是本仓文档权威入口。它负责解释方法论仓库当前承载了哪些能力、哪些目录是对外骨架、哪些是仓库自用配置。  

**关系**：
- 入口：`docs/project/overview.md`, `docs/project/structure.md`, `docs/project/module-index.md`
- 被依赖：`.ys_team/policy.md`, `skills/*/SKILL.md`, `README.md`

## `README.md` / `AGENTS.md`（对外接入与协作口径）
**职责**：`README.md` 面向用户解释 ys-team 的接入方式和公开心智，`AGENTS.md` 则约束仓库内 agent 协作规则。它们是方法仓从“定义”走向“使用”的外部表面。  

**关系**：
- 入口：`README.md`, `AGENTS.md`
- 依赖：`skills/`, `examples/baseline/`, `docs/project/`
- 被依赖：使用者、贡献者、仓库内协作流程

## `CLAUDE.md` / `examples/baseline/AGENTS.md` / `examples/baseline/CLAUDE.md`（工作流可见标志下发面）
**职责**：这一组文件把 `ys-team` 排他工作流和可见标志规则下发到仓库自身与 baseline 默认骨架中，让使用者能通过响应末尾标志判断当前是否真的处于 ys-team 工作流。  

**关系**：
- 入口：`CLAUDE.md`, `AGENTS.md`, `examples/baseline/AGENTS.md`, `examples/baseline/CLAUDE.md`
- 依赖：`skills/ys-team/SKILL.md`, `skills/ys-team-spec-talk/SKILL.md`, `skills/ys-team-spec-work/SKILL.md`, `skills/ys-team-submit/SKILL.md`, `skills/ys-team-status/SKILL.md`
- 被依赖：本仓协作、下游仓库初始化后的默认工作流

## `package.json` / `scripts/`（npm 分发与 CLI 面）
**职责**：`package.json` 和 `scripts/` 提供 ys-team 的 npm 分发能力（已发布 v0.3.0）。CLI 提供三个命令：`install-skills`（全局安装 skills）、`init-project`（项目级初始化）、`check-update`（对比本地与 npm 最新版）。安装目标由 `--dest` 控制，支持 `--force`、`--dry-run`。

**关系**：
- 入口：`package.json`, `scripts/ys-team.mjs`
- 依赖：`README.md`, `skills/`, `examples/baseline/`, `registry/`
- 被依赖：npm 包使用者（`npx ys-team`）、分发验证
