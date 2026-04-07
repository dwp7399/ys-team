---
Spec-Type: work
Initiative: 20260407-161500-npm-skill-installer
Status: completed
Owner-Session: ys-team
Write-Scope:
  - scripts/
  - package.json
Depends-On: []
Parallel-With: []
Blocked-By: ""
Verification: "`node scripts/ys-team.mjs install-skills --dest /tmp/ys-team-install-check --force` and `--dry-run`."
Integration-Gate: ""
---

# Work 01 CLI skills 安装能力

## Background

现有 npm CLI 只有说明输出，没有实际安装行为。

## Goals

- 补齐 `install-skills` 命令
- 默认安装到用户本地 skills 目录
- 保持覆盖策略安全且可控

## Deliverables

- `ys-team install-skills`
- 默认目录解析与复制逻辑
- `--dest` / `--force` / `--dry-run`

## Acceptance Criteria

- CLI 能把包内 `skills/` 安装到目标目录
- 未使用 `--force` 时，不覆盖已有 skill
- `--dry-run` 只展示计划动作，不落文件

## Verification

- 运行安装和 dry-run 命令，人工检查目标目录结果

## Acceptance Evidence

- `docs/specs/active/20260407-161500-npm-skill-installer/work-01-cli-install-skills.md`

## Documentation Updates

- `README.md`

## Risks

- 默认路径推断和覆盖策略不当会降低可用性

## Rollback Plan

- 回退到仅支持显式 `--dest` 的安装模式
