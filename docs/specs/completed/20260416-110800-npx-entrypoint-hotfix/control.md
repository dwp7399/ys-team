---
Spec-Type: control
Initiative: 20260416-110800-npx-entrypoint-hotfix
Status: completed
Owner-Session: ys-team
Write-Scope:
  - scripts/ys-team.mjs
  - package.json
  - .ys_team/VERSION
  - examples/baseline/.ys_team/VERSION
  - skills/ys-team/baseline/.ys_team/VERSION
  - examples/baseline/CHANGELOG.md
  - .ys_team/status.md
Verification: "解包 npm tarball 后从 /tmp 路径直接执行 CLI；确认 npx/pack 路径能输出 help；发布 ys-team@0.4.2"
---

# npx entrypoint hotfix

## Background

`ys-team@0.4.1` 发布后，用户执行 `npx ys-team check-update` 和 `npx ys-team install-skills --force` 无任何输出。

复现发现：发布包内容存在、bin 元数据存在、脚本有执行权限，但从 `/tmp` 解包路径执行 `node .../scripts/ys-team.mjs --help` 也静默退出。

根因是入口判断使用 `path.resolve(process.argv[1]) === __filename`。在 macOS 上 `/tmp` 会解析到 `/private/tmp`，两边路径字符串不一致，导致 `main()` 没有被调用。

## Goals

1. 修复 CLI entrypoint 判断，使 npx/cache/tarball 路径均能调用 `main()`
2. 发布 `ys-team@0.4.2` 修复线上不可用版本
3. 保留可复核验证证据

## Acceptance Criteria

- [ ] 从 tarball 解包路径执行 `node .../scripts/ys-team.mjs --help` 有输出
- [ ] `npx ys-team@0.4.2 --help` 有输出
- [ ] `npx ys-team@0.4.2 install-skills --force` 不再静默
- [ ] `ys-team@0.4.2` 已成功发布到 npm

## Rollback Plan

- 如 `0.4.2` 发布失败，保留 `0.4.1` 状态并继续 hotfix
- 如发布成功但仍异常，继续发布 `0.4.3` 修复
