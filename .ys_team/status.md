# 团队状态

updated: 2026-06-30T15:05:12+08:00

本文件只做当前仪表盘。任务过程、命令输出、QA 结论和发布证据写入对应 spec；可复用经验写入 `.ys_team/memory/`。

## 活跃 Spec

| Spec | 阶段 | 状态 | 负责角色 | 重试次数 | 模式 |
|------|------|------|---------|---------|------|
| 20260421-baseline-status-and-role-pool-sourcing | close | in-progress | gate | 1 | full-auto |
| 20260421-baseline-visible-marker-hardening | close | in-progress | arch, gate | 0 | full-auto |

## Queued Spec

| Spec | 依赖 | 简述 |
|------|------|------|
| （无） | - | 当前无 queued spec |

## 最新判断（最近 5 条）

| 时间 | Spec | 角色 | 决定 | 原因 |
|------|------|------|------|------|
| 2026-06-30 | 20260630-compact-status-purpose-proof | close | PASS | npm publish 成功，registry 返回 ys-team@1.0.2，latest=1.0.2、legacy=0.6.5；spec 已归档，准备合回 main、tag 和 push |
| 2026-06-30 | 20260630-compact-status-purpose-proof | close | BLOCKED | `npm whoami` 返回 E401 Unauthorized，当前本机 npm 未认证；未执行 `npm publish`、合回 main、tag 或 push |
| 2026-06-30 | 20260630-compact-status-purpose-proof | qa | PASS_READY_FOR_CLOSE | 正向/反向关键词、status 5 条窗口、baseline diff、版本一致性、`git diff --check`、`npm pack --dry-run` 均通过；release-first close 尚未执行 |
| 2026-06-30 | 20260630-compact-status-purpose-proof | spec-work | READY_FOR_QA | 短 status、目的与验收证明、skill 分层口径、curated examples、版本线和 baseline 双副本已落地；不处理 hook |
| 2026-06-30 | 20260630-compact-status-purpose-proof | spec-work | STARTED | 用户确认先落地短 status、目的与验收证明、skill 分层口径和 curated examples；hook 机制明确排除；已切到 `work/20260630-compact-status-purpose-proof` |

## 阻塞项

- `20260421-baseline-status-and-role-pool-sourcing`：历史 close in-progress，需决定是否补 Git 收口或取消。
- `20260421-baseline-visible-marker-hardening`：历史 close in-progress，需决定是否补 Git 收口或取消。

## 待办

- [ ] 完成 `20260630-compact-status-purpose-proof` 的 main / tag push。
- [ ] 决定两个 20260421 历史 active spec 的收口方式。
