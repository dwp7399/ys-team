---
Spec-Type: work
Initiative: 20260407-170500-npm-distribution-modes
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

# Work 02 文档与发布就绪面同步

## Background

双模式安装落地后，README 与项目文档必须同步，否则用户会误解 npm 的实际边界。

## Goals

- 明确全局/项目级两种使用方式
- 明确 npm registry 发布的前置条件
- 保持 package 形态可发布

## Deliverables

- 更新后的 README 与项目文档
- 发布说明

## Acceptance Criteria

- README 能区分两种安装方式
- 文档明确“真实发布仍需 npm 凭证”

## Verification

- README/docs 人工检查
- `npm pack --dry-run`

## Acceptance Evidence

- `docs/specs/active/20260407-170500-npm-distribution-modes/work-02-doc-and-publish-readiness.md`

## Documentation Updates

- `README.md`
- `docs/project/overview.md`
- `docs/project/structure.md`
- `docs/project/module-index.md`

## Risks

- 若发布说明不足，交付会停留在“代码可发布但流程不可执行”

## Rollback Plan

- 回退到只保留 CLI 使用说明
