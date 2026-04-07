---
Spec-Type: work
Initiative: 20260407-161500-npm-skill-installer
Status: completed
Owner-Session: ys-team
Write-Scope:
  - README.md
  - docs/project/
  - package.json
Depends-On: []
Parallel-With: []
Blocked-By: ""
Verification: "Manual review plus `npm pack --dry-run`."
Integration-Gate: ""
---

# Work 02 npm 文档与分发表面同步

## Background

CLI 能力变化后，README 和项目文档必须同步，不然用户会继续把 npm 面理解成只读说明。

## Goals

- 同步 npm 已支持与未支持的边界
- 让 README 给出可执行示例
- 保持 package dry-run 可验证

## Deliverables

- 更新后的 README 和项目文档
- package 分发验证

## Acceptance Criteria

- README 已包含 npm 安装示例
- 项目文档反映 npm CLI 是最小安装器，而非完整 init 安装器

## Verification

- 人工检查 README/docs 和 CLI 输出一致
- `npm pack --dry-run`

## Acceptance Evidence

- `docs/specs/active/20260407-161500-npm-skill-installer/work-02-doc-and-package-surface.md`

## Documentation Updates

- `README.md`
- `docs/project/overview.md`
- `docs/project/structure.md`
- `docs/project/module-index.md`

## Risks

- 文案若写得过满，会抬高用户对自动化程度的预期

## Rollback Plan

- 回退到只保留 CLI 帮助输出和 package 分发说明
