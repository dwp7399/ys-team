# Work Log

Spec: 20260429-release-first-close-workflow

## 2026-04-29

- spec-review PASS 后切到 `release/0.5.3` 分支，再进入 spec-work。
- 将本仓 Release Gate 改为 release-first：非 trivial 可交付改动不得只 repo-close，close 必须完成 npm 发布链路、合回 main、tag 和 push。
- 将通用 baseline 改为“项目发布 gate”表达，避免把 npm 强加给外部非 npm 项目。
- 发布线版本从 `0.5.2` 推进到 `0.5.3`，覆盖 `package.json`、`.ys_team/VERSION`、baseline VERSION 和安装副本 VERSION。
- status 标记 `20260429-external-skill-pattern-assimilation` 为 repo-close 但待 npm release 的缺口。
- QA 发现 `status.md` 残留旧判断“本轮不涉及 npm publish，发布需另起 release spec”，已改为 REVISED 历史纠偏记录。
- 修正 close checklist 顺序：先提交代码和 evidence，再执行发布 gate，最后归档并做 close commit。
- close 阶段 `npm pack` 通过。首次 `npm publish` 因 npm 认证失败阻塞；用户提供 npm token 后，publish 在提升网络权限下成功，registry 返回 `+ ys-team@0.5.3`，`npm view ys-team version` 返回 `0.5.3`。

## 偏差处理

- 本轮 spec-talk 初稿漏列发布线版本文件；spec-review 前已补入 Write-Scope，避免 close 阶段越界。
