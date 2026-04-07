---
Spec-Type: work
Initiative: 20260407-170500-npm-distribution-modes
Status: completed
Owner-Session: ys-team
Write-Scope:
  - scripts/
  - package.json
Depends-On: []
Parallel-With: []
Blocked-By: ""
Verification: "`node scripts/ys-team.mjs install-skills --dry-run` and `node scripts/ys-team.mjs init-project --dir /tmp/ys-team-project-check --force`."
Integration-Gate: ""
---

# Work 01 全局与项目级安装模式

## Background

当前 CLI 只有一种技能安装模式，且默认目录不符合新的要求。

## Goals

- 默认全局目录切到 `~/.agents/skills`
- 新增项目级安装命令
- 项目级安装落地本地 `AGENTS.md` / `CLAUDE.md`

## Deliverables

- 更新后的 CLI 命令集
- 项目级安装文件复制逻辑

## Acceptance Criteria

- 全局默认目录为 `~/.agents/skills`
- `init-project` 能安装本地 `.agents/skills`
- `init-project` 不带 `--force` 时不覆盖已有项目入口文件

## Verification

- 运行 help、global dry-run、project install

## Acceptance Evidence

- `docs/specs/active/20260407-170500-npm-distribution-modes/work-01-global-and-project-install.md`

## Documentation Updates

- `README.md`

## Risks

- 项目级安装与真实 init 的边界可能被误解

## Rollback Plan

- 回退到仅支持项目级 skills 复制，不写入入口文件
