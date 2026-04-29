---
Spec-Type: control
Initiative: 20260429-release-first-close-workflow
Status: active
Owner-Session: —
Write-Scope:
  - README.md
  - package.json
  - .ys_team/rules.md
  - .ys_team/templates/checklist.md
  - .ys_team/VERSION
  - .ys_team/status.md
  - docs/methodology/overview.md
  - docs/methodology/reference.md
  - docs/project/module-index.md
  - skills/ys-team/SKILL.md
  - skills/ys-team-spec-work/SKILL.md
  - examples/baseline/.ys_team/rules.md
  - examples/baseline/.ys_team/VERSION
  - examples/baseline/.ys_team/templates/checklist.md
  - examples/baseline/.ys_team/templates/spec.md
  - skills/ys-team/baseline/.ys_team/rules.md
  - skills/ys-team/baseline/.ys_team/VERSION
  - skills/ys-team/baseline/.ys_team/templates/checklist.md
  - skills/ys-team/baseline/.ys_team/templates/spec.md
Delete-Scope: []
Depends-On:
  - 20260429-external-skill-pattern-assimilation
Verification: "见 ## Verification"
---

# Release-First Close Workflow

## Collaboration Summary

- 参与角色：产品演进负责人、方法论架构师、交付守门人
- 轮次：1
- 关键分歧：是否继续区分普通 close 与发版 close。结论是不区分；ys-team 本仓是 npm 分发产品，所有会影响用户安装结果的非 trivial 可交付改动，close 必须完成发布链路。
- 决策：PASS，进入 active，spec-review 已通过。

## Background

上一轮 `20260429-external-skill-pattern-assimilation` 已完成 repo commit 和 spec 归档，但没有发布 npm。用户指出这不符合 ys-team 本仓的产品现实：本仓的对外交付载体是 npm 包，任何修改 README、methodology、skills、baseline、CLI 或安装资源的改动，最终都要发布，否则用户通过 `npx ys-team` 拿不到结果。

当前规则只要求“发版类 spec”必须经过 npm publish，导致普通/发版边界依赖人工判断。这个边界会制造两个问题：

- repo 已 close，但用户安装结果未更新。
- agent 可以用“不是发版类”作为跳过 npm publish 的理由。

本 spec 将本仓 close 改为 release-first：spec-review PASS 后先切工作/发布分支，spec-work 和 QA 在分支上完成，close 时必须完成 npm publish、合回 main、tag 和 push，才能归档。

## Goals

- 删除本仓“普通 close / 发版 close”的交付语义差异。
- 明确本仓所有非 trivial 可交付改动都必须通过发布链路 close。
- 将 spec-review PASS 后切分支作为执行前置条件。
- 将 npm publish、main merge、tag、push 写入 close gate 和 checklist。
- 标记 `20260429-external-skill-pattern-assimilation` 为已 repo-close 但待 release 的历史缺口。
- 保持外部项目 baseline 的表达足够通用：默认项目不一定有 npm，但本仓规则必须明确 npm 发布。

## Non-goals

- 不在本 spec 中改 CLI 功能。
- 不重写 npm 发布脚本。
- 不回滚已提交的 `20260429-external-skill-pattern-assimilation`。
- 不假设所有使用 ys-team 的外部项目都用 npm；外部 baseline 应表达“项目发布 gate”，本仓补充规则表达 npm。

## Deliverables

- `.ys_team/rules.md`：改写 Release Gate，要求本仓所有非 trivial 可交付改动 close 必须发布；删除“发版类 spec 才允许 close”的口径。
- `.ys_team/templates/checklist.md`：close 增加 release branch、npm pack/publish、merge main、tag、push、archive。
- README：改写仓库发版约束，说明 spec-review PASS 后切分支，close 必须发布并回 main。
- methodology overview/reference：补充 release-first close 语义和分支前置。
- `skills/ys-team/SKILL.md` / `skills/ys-team-spec-work/SKILL.md`：编排和执行规则同步 release-first。
- baseline rules/checklist/spec 及 `skills/ys-team/baseline/` 同步副本：表达通用项目发布 gate；不写死 npm。
- 发布线版本文件：按 patch 版本推进，允许本轮 close 发布 npm。
- `docs/project/module-index.md`：如发版规则职责描述变化，同步项目现实索引。
- `.ys_team/status.md`：记录上一轮 spec 的待 release 缺口，并记录本轮 spec 流转。

## Acceptance Criteria

- AC-01: 文档不再表达“普通 close 不需要发布、发版类 close 才需要发布”的本仓口径。
- AC-02: 本仓规则明确所有非 trivial 可交付改动必须在 close 完成 npm publish、merge main、tag、push。
- AC-03: spec-review PASS 后必须切到 release/work 分支，未切分支不得进入 spec-work。
- AC-04: checklist close gate 包含发布验证、npm publish、合回 main、tag、push 和归档。
- AC-05: baseline 对外模板使用“项目发布 gate”通用表达，不强迫外部非 npm 项目发布 npm。
- AC-06: `20260429-external-skill-pattern-assimilation` 在 status 中被标为待 release 缺口。
- AC-07: 发布线版本文件保持一致，允许本轮 close 执行 npm publish。
- AC-08: 本轮 Verification 能检查 release-first 关键词、旧口径消失、baseline 同步文件一致。

## Verification

```bash
rg -n "release-first|npm publish|合回 main|tag|push|发布 gate|发布链路|切分支" README.md .ys_team docs/methodology skills examples/baseline
! rg -n "普通 close 不需要|发版类 spec 才|本轮不涉及 npm publish|发布需另起 release spec" README.md .ys_team docs/methodology skills examples/baseline
diff -u examples/baseline/.ys_team/rules.md skills/ys-team/baseline/.ys_team/rules.md
diff -u examples/baseline/.ys_team/VERSION skills/ys-team/baseline/.ys_team/VERSION
diff -u examples/baseline/.ys_team/templates/spec.md skills/ys-team/baseline/.ys_team/templates/spec.md
diff -u examples/baseline/.ys_team/templates/checklist.md skills/ys-team/baseline/.ys_team/templates/checklist.md
node -e 'const p=require("./package.json").version; const fs=require("fs"); for (const f of [".ys_team/VERSION","examples/baseline/.ys_team/VERSION","skills/ys-team/baseline/.ys_team/VERSION"]) { const v=fs.readFileSync(f,"utf8").trim(); if (v!==p) throw new Error(f+"="+v+" package="+p); }'
```

## Risks

- 所有非 trivial 改动都要求发布，会提高 close 成本；但这符合本仓作为 npm 分发产品的真实交付边界。
- baseline 不能写死 npm，否则会误导外部非 npm 项目。
- 本轮规则变更会把刚归档的上一轮 spec 标记为待 release 缺口，需要后续发布链路补齐。

## Rollback Plan

- 如果 release-first 过重，只能通过新 spec 明确引入“仅内部实验不发布”的例外；例外必须有用户确认和 status 留痕，不能由 agent 自行判断。
