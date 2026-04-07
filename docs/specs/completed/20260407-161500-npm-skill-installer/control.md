---
Spec-Type: control
Initiative: 20260407-161500-npm-skill-installer
Status: completed
Owner-Session: ys-team
Write-Scope: []
Depends-On: []
Parallel-With: []
Blocked-By: ""
Verification: "Manual review of npm CLI behavior, README/docs consistency, and package dry-run output."
Integration-Gate: |
  1. npm 包不再只是分发静态内容，而是能完成最小核心安装动作。
  2. `ys-team` CLI 能把 skills 安装到用户本地 skills 目录。
  3. 安装行为具备明确边界，不误导用户以为已实现完整 init 安装器。
  4. README、项目文档与 CLI 输出保持一致。
---

# npm 技能安装器落地

## Background

当前 npm 包已经能发布 `ys-team` 仓库内容，但 CLI 只会输出说明，无法完成实际安装动作。

这导致“npm 安装 ys-team”仍停留在文档建议层，而不是一个可执行入口。

## Goals

- 给 npm 包补上最小但真实可用的技能安装能力
- 保持边界清晰，不把 npm 包误写成完整 init/rebuild 自动化器
- 让 README 和项目文档同步表达新的 npm 入口

## Non-goals

- 本次不自动改写目标项目的 `AGENTS.md` / `CLAUDE.md`
- 本次不自动执行 `ys-team-init`
- 本次不实现跨平台复杂安装向导

## Deliverables

- 一个可执行的 `ys-team install-skills` CLI
- 与之对应的 README 和项目文档更新
- 一份收口证据

## Acceptance Criteria

- `npx ys-team install-skills` 默认能安装到本地 skills 目录
- CLI 支持显式目标目录和安全覆盖控制
- README 能说明 npm 当前已支持与未支持的能力

## Collaboration Summary

- Participants:
  - method-architect
  - product-evolution-owner
  - delivery-guard
- Participant Titles:
  - 方法论架构师
  - 产品演进负责人
  - 交付守门人
- Discussion Rounds:
  - 1
- Escalations:
  - None
- Reporter:
  - method-architect
- Reporter Title:
  - 方法论架构师
- Estimated Cost:
  - 1
- Submit Recommendation:
  - Yes

## Discussion Digest

- 方法论架构师：
  - npm 面应先补最小核心动作，不要跳到完整安装器。
- 产品演进负责人：
  - 用户最先需要的是“安装 skills 成功”，不是一次性自动改完所有项目文件。
- 交付守门人：
  - CLI、README、package dry-run 和证据必须同次交付闭环。

## Delivery Plan

- `work-01`：实现 `install-skills` CLI 与文件复制逻辑
- `work-02`：同步 README / docs / package 验证说明

## Verification

- 运行 `node scripts/ys-team.mjs install-skills --dest /tmp/ys-team-install-check --force`
- 运行 `node scripts/ys-team.mjs install-skills --dest /tmp/ys-team-install-check-dry --dry-run`
- 运行 `npm pack --dry-run`

## Acceptance Evidence

### 文件清单

- `docs/specs/active/20260407-161500-npm-skill-installer/control.md`

### 验收要求

- CLI 行为与文档表述一致，且安装行为可以被人工复核

## Documentation Updates

- `README.md`
- `docs/project/overview.md`
- `docs/project/structure.md`
- `docs/project/module-index.md`

## Risks

- 如果默认安装目录判断错误，可能把 skills 安装到用户不期望的位置
- 如果覆盖策略过于激进，可能破坏用户本地已有 skills

## Rollback Plan

- 回退到只保留说明型 CLI，同时保留 package 分发能力
