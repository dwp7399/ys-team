---
Initiative: 20260414-163500-release-version-alignment
Phase: spec-talk
Author-Session: ys-team-spec-talk
---

# 原始需求记录

## 需求来源

- 提出时间：2026-04-14
- 来源方式：用户口述

## 原始描述

1. `.ys_team` 里的版本相当于本仓自己使用工作流的版本，怀疑说明本仓使用的工作流已经落后代码很多。
2. 希望 npm 发包版本和项目主体版本保持一致，即 GitHub `main` 上的发布版本和 npm 发包版本一致。工作流改成：每次开发必须拉新的 tag 分支，开发完再合并回 `main`，合并前必须 npm 推送成功；整个 QA 验收以此为准；npm 推送成功后，代码合并回 `main`，才能 close spec。
3. 建立 `0.3.2`，按上述流程实际走通并发布。用户提供可 bypass 2FA 的 npm token 用于真实发布。

## 背景补充

- 当前 `package.json` 为 `0.3.1`
- 当前 `examples/baseline/.ys_team/VERSION` 为 `0.3.0`
- 当前本仓 `.ys_team/VERSION` 为 `0.3.0`
- `0.3.1` 已发布到 npm，但当前 `main` 已继续前进，发布内容与当前主体内容不完全一致

## 初步范围判断

- 影响模块：`package.json`、`scripts/`、`docs/project/`、`docs/guide/`、`docs/methodology/`、`examples/baseline/`、本仓 `.ys_team/`
- 是否跨模块：是
- 是否涉及外部发布：是（npm publish、git push、tag）
- 是否涉及真实凭证：是（npm token）
