---
Spec-Type: control
Initiative: 20260407-170500-npm-distribution-modes
Status: active
Owner-Session: ys-team
Write-Scope: []
Depends-On: []
Parallel-With: []
Blocked-By: ""
Verification: "Manual review of CLI modes, README/docs consistency, and npm dry-run output."
Integration-Gate: |
  1. 全局安装默认目录切换到 `~/.agents/skills`。
  2. npm CLI 同时支持全局安装和项目级安装两种模式。
  3. 项目级安装不依赖全局 skills，能在项目中直接获得本地 `AGENTS.md` / `CLAUDE.md` 与 `.agents/skills`。
  4. 发布文档明确区分“已具备可发布形态”和“实际发布到 npm registry 仍需账号凭证”。
---

# npm 分发模式收口

## Background

当前 npm CLI 已具备最小 skills 安装能力，但默认目录还是 `~/.codex/skills`，且只覆盖全局型安装。

用户现在需要两种分发模式：

- 全局安装：安装到用户级 skills 目录，后续在项目里运行 init
- 项目级安装：不依赖全局 skills，直接把本地 skills 和协作入口装到项目里

## Goals

- 把全局安装默认目录改为 `~/.agents/skills`
- 增加项目级安装命令
- 明确 npm registry 发布边界与所需条件

## Non-goals

- 本次不直接执行真实 `npm publish`
- 本次不实现远程凭证管理
- 本次不自动执行项目内的 `ys-team-init`

## Deliverables

- 更新后的 npm CLI
- README / 项目文档中的双模式安装说明
- 发布说明或脚本入口

## Acceptance Criteria

- `install-skills` 默认指向 `~/.agents/skills`
- 存在项目级安装命令，能落地 `.agents/skills` 与项目协作入口文件
- 文档清楚说明“当前代码已可发布，但真正发布仍需要 npm 账号/token/2FA”

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
  - 双模式安装应保持边界清晰，不让项目级安装和 init 混成同一件事。
- 产品演进负责人：
  - 项目级安装必须能让用户在仓库内立即看到 ys-team 入口，不依赖全局环境。
- 交付守门人：
  - 发布能力要区分“代码形态已就绪”和“真实 registry 发布已完成”。

## Delivery Plan

- `work-01`：切换默认全局目录并新增项目级安装命令
- `work-02`：同步 README / docs / publish 说明

## Verification

- `node scripts/ys-team.mjs --help`
- `node scripts/ys-team.mjs install-skills --dry-run`
- `node scripts/ys-team.mjs init-project --dir /tmp/ys-team-project-check --force`
- `npm pack --dry-run`

## Acceptance Evidence

### 文件清单

- `docs/specs/active/20260407-170500-npm-distribution-modes/control.md`

### 验收要求

- 双模式安装和发布边界都能被人工复核

## Documentation Updates

- `README.md`
- `docs/project/overview.md`
- `docs/project/structure.md`
- `docs/project/module-index.md`

## Risks

- 如果项目级安装写入策略过重，可能覆盖用户已有项目入口文件
- 如果发布文案不够明确，用户会误以为已经完成 registry 发布

## Rollback Plan

- 回退到只保留全局安装模式，并恢复文档为“可发布但未发布”
