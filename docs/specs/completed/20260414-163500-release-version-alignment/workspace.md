---
Initiative: 20260414-163500-release-version-alignment
Current-Phase: close
Last-Updated: 2026-04-14 18:20
---

# 工作记忆

## 当前状态

真实发版已完成：`ys-team@0.3.2` 已发布，`main` 已快进到发布提交，git tag `0.3.2` 已推到 origin，正在做 spec closeout。

## 关键决策记录

- `.ys_team/VERSION` 的确代表本仓自用工作流基线版本；当前落后于主体发布线，说明本仓尚未完成一次与当前 baseline 对齐的同步
- “tag 分支”在 git 里不精确，落地为 `release/<version>` 分支执行发布，成功后再创建 git tag `<version>`
- QA Gate 对发版类 spec 的核心通过条件改为：`npm publish` 必须成功
- close 条件追加：发布成功后代码必须已回到 `main`
- `docs/methodology/VERSION` 继续独立于发布线，不纳入 `0.3.2` 对齐

## 执行摘要

本次交付不是单纯 bump version，而是一次发布治理收口：
1. 统一发布线定义
2. 更新 baseline / 本仓规则
3. 建立并使用 `release/0.3.2`
4. 真实发布 npm
5. 合并回 `main` 并打 tag

## 已完成

- 已创建 `release/0.3.2`
- 已将 `package.json`、baseline VERSION、本仓 `.ys_team/VERSION` 同步到 `0.3.2`
- 已更新 README、guide、project、methodology、baseline、本仓 policy/methods
- 已通过 `git diff --check`
- 已通过 `npm pack --dry-run --cache /tmp/npm-cache-ys-team`
- 已确认 npm registry 尚无 `0.3.2`
- 已成功执行 `npm publish`，npm 最新版变为 `0.3.2`
- 已将 `release/0.3.2` 快进合并回 `main`
- 已创建并推送 git tag `0.3.2`

## 遗留问题

- `docs/specs/` 与 `docs/roadmap/` 当前被 `.gitignore` 全局忽略，新 spec 需要 `git add -f` 才能纳入版本控制；建议后续单独收口此规则
