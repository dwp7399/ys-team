---
Spec-Type: work
Initiative: 20260414-163500-release-version-alignment
Status: done
Owner-Session: ys-team
Write-Scope:
  - package.json
  - scripts/ys-team.mjs
  - README.md
  - docs/guide/getting-started.md
  - docs/project/overview.md
  - docs/project/module-index.md
  - docs/project/npm-publish.md
  - docs/methodology/06-bootstrap-and-evolution.md
  - examples/baseline/.ys_team/VERSION
  - examples/baseline/.ys_team/methods.md
  - examples/baseline/.ys_team/policy.md
  - .ys_team/VERSION
  - .ys_team/methods.md
  - .ys_team/policy.md
Verification: "git diff --check && npm pack --dry-run --cache /tmp/npm-cache-ys-team && npm publish --userconfig /tmp/ys-team-npmrc --registry https://registry.npmjs.org/ --cache /tmp/npm-cache-ys-team-release && npm view ys-team version time --json && git push origin main && git push origin 0.3.2"
---

# 发布治理收口并真实发布 0.3.2

## Background

当前发布线与仓库主体内容未形成一致节奏，需要同时修正规则和完成一次真实发版来收口。

## Goals

- 把发布线版本定义、QA 门禁、close 条件固化到仓库文档和 baseline
- 将仓库版本升级到 `0.3.2`
- 在 `release/0.3.2` 分支完成真实 npm 发布，再合并回 `main` 并创建 tag

## Deliverables

- 发布治理文档更新
- `0.3.2` 版本号同步
- `release/0.3.2` 发布证据
- main 合并和 tag 证据

## Acceptance Criteria

- [ ] 发布治理文档已更新
- [ ] 三个发布线版本文件都为 `0.3.2`
- [ ] `npm publish` 成功
- [ ] `main` 已包含发布提交
- [ ] git tag `0.3.2` 已存在

## Verification

```bash
npm pack --dry-run
git diff --check
npm view ys-team version time --json
git branch --show-current
git tag --list
```

## Acceptance Evidence

- 发布 dry-run 结果
- npm registry 查询结果
- merge / tag 结果

## Documentation Updates

- README、guide、project、methodology、baseline、本仓 `.ys_team/`

## Risks

- 真实 npm 发布失败会阻塞整单交付

## Rollback Plan

- 未 publish 前可回退提交
- 已 publish 后用后续版本修正
