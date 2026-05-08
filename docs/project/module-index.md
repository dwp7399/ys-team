# Module Index

**Project Type**: Markdown-first method repository
**Project Scale**: Small
**Index Strategy**: Core module index
**Last Updated**: 2026-04-21

## `docs/methodology/`（方法论规范）
**职责**：承载 ys-team 方法论的完整规范。overview.md 面向理解，reference.md 面向查规则细节。

**关系**：
- 入口：`docs/methodology/overview.md`、`docs/methodology/reference.md`
- 被依赖：所有 `skills/*/SKILL.md`、`examples/baseline/`、`.ys_team/`
- 版本：`docs/methodology/VERSION`

## `docs/guide/`（用户向使用指南）
**职责**：面向个人开发者，解释”为什么需要 ys-team”（含反模式案例）和”怎么用”。

**关系**：
- 入口：`docs/guide/why-ys-team.md`、`docs/guide/getting-started.md`
- 引用：`docs/methodology/`
- 被依赖：`README.md`

## `skills/`（方法入口与执行能力）
**职责**：承载 4 个 skill：ys-team（入口+路由+讨论+状态）、ys-team-init（初始化+重建+现实索引）、ys-team-spec-talk（多角色讨论+spec 产出）、ys-team-spec-work（按 spec 执行+evidence）。

**关系**：
- 入口：`skills/ys-team/SKILL.md`, `skills/ys-team-init/SKILL.md`
- 内部委托：`skills/ys-team-spec-talk/SKILL.md`, `skills/ys-team-spec-work/SKILL.md`
- 依赖：`examples/baseline/`, `.ys_team/`, `docs/project/`
- 被依赖：使用 ys-team 的外部仓库

## `examples/baseline/`（默认工作流骨架）
**职责**：`ys-team-init` 的默认来源。提供最小 `.ys_team/` 结构：config.yaml、role-pool.yaml、rules.md、reality.md、glossary.md、status.md、history/、VERSION、templates/（checklist + spec + monthly-summary）、memory/。

**关系**：
- 入口：`examples/baseline/.ys_team/*`, `examples/baseline/AGENTS.md`
- 被依赖：`ys-team-init`, 外部项目初始化
- 同步副本：`skills/ys-team/baseline/`

## `.ys_team/`（方法仓自用本地基线）
**职责**：本仓自己的 `.ys_team/` 用来”用 ys-team 管理 ys-team”。已迁移到 0.5.0 新结构。

**关系**：
- 入口：`.ys_team/status.md`, `.ys_team/rules.md`, `.ys_team/config.yaml`
- 现实索引：`.ys_team/reality.md`（指向 `docs/project/module-index.md`）
- 记忆：`.ys_team/memory/*.md`
- 模板：`.ys_team/templates/checklist.md`, `.ys_team/templates/spec.md`
- 被依赖：本仓 specs、方法仓自身 rebuild

## `docs/specs/`（Spec 生命周期目录）
**职责**：承载本仓 spec 的生命周期目录。`queued/` 放待审 spec，`active/` 放执行主链中的 spec，`completed/` 作为短暂停留区，`archive/` 放历史完成 spec，`cancelled/` 放终止 spec。

**关系**：
- 入口：`docs/specs/queued/`, `docs/specs/active/`, `docs/specs/archive/`
- 被依赖：`.ys_team/status.md`, `docs/methodology/overview.md`, `docs/methodology/reference.md`
- 当前约束：历史 completed spec 可直接迁入 `archive/`，不为归档补旧格式

## `docs/project/`（方法论现实与结构说明）
**职责**：记录 ys-team 仓库现状和模块职责，是本仓文档权威入口。

**关系**：
- 入口：`docs/project/module-index.md`
- 被依赖：`.ys_team/`, `skills/*/SKILL.md`, `README.md`

## `README.md` / `AGENTS.md`（对外接入口径）
**职责**：`README.md` 面向用户解释接入方式，`AGENTS.md` 约束仓库内 agent 协作规则。

**关系**：
- 依赖：`skills/`, `examples/baseline/`, `docs/`
- 被依赖：使用者、贡献者

## `package.json` / `scripts/`（npm 分发与 CLI）
**职责**：提供 npm 分发能力。CLI 三个命令：`install-skills`、`init-project`、`check-update`。`install-skills --force` 会清理旧 skill。本仓非 trivial 可交付改动采用 release-first close，发布线版本由 `package.json` 与 baseline `.ys_team/VERSION` 对齐。

**关系**：
- 入口：`package.json`, `scripts/ys-team.mjs`
- 依赖：`skills/`, `examples/baseline/`
- 被依赖：npm 包使用者
