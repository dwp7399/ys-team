---
Spec-Type: work
Initiative: 20260331-110000-ys-team-init-and-productization
Status: completed
Owner-Session: ys-team
Write-Scope:
  - AGENTS.md
  - CLAUDE.md
  - examples/baseline/
  - skills/
  - README.md
  - docs/project/
  - package.json
  - scripts/
Depends-On: []
Parallel-With: []
Blocked-By: ""
Verification: "Manual review of workflow markers and `node scripts/ys-team.mjs --help` plus `npm pack --dry-run`."
Integration-Gate: ""
---

# Work 04 工作流可见标志与分发面收口

## Background

当前仓库已经有 `ys-team` 排他工作流和响应标记规则，但标记分散在 skill 文档里，对使用者和下游仓库还不够显眼。

同时仓库已有 `package.json`，但 npm 分发面仍停留在“可打包仓库内容”，还没有一个明确、可执行的入口说明当前 npm 能做什么、不能做什么。

## Goals

- 让 `ys-team` 工作流在仓库内和 baseline 下游仓库中都有明确可见标志
- 让 `AGENTS.md` 和 `CLAUDE.md` 都能把用户引回 `ys-team` 路由
- 把当前 npm 能力收敛成一个最小但可执行的入口

## Deliverables

### 主交付物

- 明确的 ys-team 可见标志规范
- 仓库级与 baseline 级 `AGENTS.md` / `CLAUDE.md`
- README 和项目文档中的 npm 现状说明
- 一个最小 npm CLI 入口

## Acceptance Criteria

### 主验收目标

- 用户能通过响应中的明显标志判断当前是否在 `ys-team` 工作流内
- 若没有标志，仓库级和 baseline 级协作文档都能要求助手回到 `ys-team` 路由
- npm 安装后的入口能清楚说明当前能力边界

## Verification

- 人工检查 `AGENTS.md`、`CLAUDE.md`、`skills/*/SKILL.md` 的标志规则一致
- 人工检查 baseline 是否继承同样的可见标志约束
- 运行 `node scripts/ys-team.mjs --help`
- 运行 `npm pack --dry-run`

## Acceptance Evidence

### 文件清单

- `docs/specs/active/20260331-110000-ys-team-init-and-productization/work-04-workflow-visibility-and-distribution.md`

### 本 work 验收要求

- 工作流标志和 npm 分发面都能被人工审阅并理解

## Documentation Updates

- `README.md`
- `docs/project/overview.md`
- `docs/project/structure.md`
- `docs/project/module-index.md`

## Risks

- 如果标志规则分散在多个文件但没有统一表述，下游仓库仍可能执行出“看起来像普通回答”的假工作流
- 如果 npm 面过度承诺自动化能力，会让用户误以为当前已具备一键初始化器

## Rollback Plan

- 如果新增 npm 入口造成错误认知，回退到文档说明模式，保留工作流标志规则

## Open Questions

- 后续是否要把 npm CLI 继续扩成真正的 init/rebuild 安装器
