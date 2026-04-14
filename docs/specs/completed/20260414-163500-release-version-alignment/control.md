---
Spec-Type: control
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
  - .ys_team/status.md
  - docs/specs/active/20260414-163500-release-version-alignment/
Depends-On: []
Verification: "git diff --check && npm pack --dry-run --cache /tmp/npm-cache-ys-team && npm publish --userconfig /tmp/ys-team-npmrc --registry https://registry.npmjs.org/ --cache /tmp/npm-cache-ys-team-release && npm view ys-team version time --json && git push origin main && git push origin 0.3.2"
---

# 版本对齐与 0.3.2 发版门禁

## Background

当前仓库存在四条版本线：npm 包版本、方法论版本、baseline 版本、本仓 `.ys_team` 项目版本。方法论版本独立编号是合理的，但发布线没有形成清晰门禁：`0.3.1` 已发到 npm，而 `main` 后续又继续承载了 workflow、baseline 和 methodology 的主体变更，导致“npm 最新版”和“main 主体内容”脱节。

同时，本仓 `.ys_team/VERSION` 仍是 `0.3.0`，说明本仓自用工作流基线没有跟当前 baseline 发布线完成一次同步 rebuild。用户要求将“发布版本”变成显式治理对象，并用真实的 `0.3.2` 发版把新规则走通。

## Goals

1. 明确版本线职责，保留方法论版本独立编号，同时让发布线收敛到一致口径。
2. 将发布流程收敛为可执行规则：在 `release/<version>` 分支完成实现与验证，npm publish 成功后才允许合并回 `main` 并关闭 spec。
3. 用 `0.3.2` 真实走通上述流程，使 npm 版本、发布分支内容、合并回 `main` 的内容一致。
4. 同步本仓 `.ys_team/VERSION` 与 baseline 版本，消除“本仓工作流基线落后发布线”的状态。

## Non-Goals

- 不修改 `docs/methodology/VERSION` 的独立编号策略
- 不引入 CI/CD 平台或远程强制保护规则
- 不重写现有 spec 生命周期状态机，只增强发布门禁和 close 条件

## Deliverables

1. 发布治理文档更新，明确以下规则：
   - 发布线版本 = `package.json` + `examples/baseline/.ys_team/VERSION` + 本仓 `.ys_team/VERSION`
   - 方法论版本继续独立维护在 `docs/methodology/VERSION`
   - 发布使用 `release/<version>` 分支承载，最终创建 git tag `<version>`
   - QA 验收必须包含“npm publish 成功”
   - spec close 必须发生在 npm publish 成功且代码已合并回 `main` 之后
2. `0.3.2` 版本发布所需的版本号与文档同步
3. `release/0.3.2` 分支上的真实验证与 npm 发布证据
4. 发布完成后的 `main` 合并与 tag 落地

## Acceptance Criteria

- [ ] 文档明确写出 `.ys_team/VERSION` 代表本仓自用工作流基线版本；若低于当前 baseline 发布线，说明本仓工作流基线尚未完成同步
- [ ] 文档明确写出方法论版本独立于发布线版本
- [ ] 文档明确写出发布线版本由 `package.json`、`examples/baseline/.ys_team/VERSION`、`.ys_team/VERSION` 共同组成
- [ ] 文档明确写出发布工作必须在 `release/<version>` 分支上完成，合并回 `main` 前必须先成功执行 `npm publish`
- [ ] 文档明确写出 QA Gate 对发版类 spec 的通过条件包含 npm 发布成功
- [ ] 文档明确写出 close 条件包含“已合并回 `main`”
- [ ] `package.json` 版本升级到 `0.3.2`
- [ ] `examples/baseline/.ys_team/VERSION` 升级到 `0.3.2`
- [ ] 本仓 `.ys_team/VERSION` 升级到 `0.3.2`
- [ ] 真实创建并使用 `release/0.3.2` 分支完成实现和发布
- [ ] `npm publish` 成功，registry 中最新版本变为 `0.3.2`
- [ ] 发布成功后将 `release/0.3.2` 合并回 `main`
- [ ] 发布成功后创建 git tag `0.3.2`
- [ ] spec 仅在上述步骤全部完成后才关闭

## Collaboration Summary

- Participants: 方法论架构师、产品演进负责人、交付守门人
- Reporter: 方法论架构师
- Rounds: 1
- Escalations: 无
- Estimated Cost: medium
- Submit Recommendation: Yes

## Discussion Digest

- 方法论架构师：方法论版本可独立，但发布线必须统一；`release/<version>` 分支比“tag 分支”更可执行，最终再打 git tag。
- 产品演进负责人：用户的核心诉求不是再解释版本，而是把“npm 成功发布”变成真正的 QA 门禁和 spec close 门禁，并用一次真实发版固化。
- 交付守门人：此变更必须包含真实 npm 发布与 git 合并证据；未 publish 前不得算 QA PASS，未合并回 `main` 前不得 close。

## Verification

```bash
npm pack --dry-run
git diff --check
npm publish
npm view ys-team version time --json
git log --oneline --decorate --max-count=10
git tag --list
```

## Acceptance Evidence

- `docs/specs/completed/20260414-163500-release-version-alignment/evidence/20260414-closeout.md`

## Documentation Updates

- 发布线规则更新到项目文档、guide、methodology、baseline、本仓 `.ys_team/`
- npm 使用说明更新到 `README.md` / `docs/project/npm-publish.md`

## Risks

- 高：真实 npm publish 和 git push 依赖凭证，任何失败都会阻塞 close
- 中：发布治理规则落地在文档与本地 workflow，不能自动替代远端分支保护
- 中：发布过程中若 `main` 出现并发新提交，需要重新评估 merge 策略

## Rollback Plan

- 文档或版本号变更：`git revert`
- 若 npm 已发布 `0.3.2`，不撤回版本，只通过后续 `0.3.3` 修正
- 若 release 分支未合并，可直接丢弃 release 分支
