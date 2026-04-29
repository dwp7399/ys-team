# 团队状态

updated: 2026-04-29T11:17:49+08:00

## 活跃 Spec

| Spec | 阶段 | 状态 | 负责角色 | 重试次数 | 模式 |
|------|------|------|---------|---------|------|
| 20260429-release-first-close-workflow | qa | PASS → close | qa, gate | 0 | full-auto |
| 20260421-baseline-status-and-role-pool-sourcing | close | in-progress | gate | 1 | full-auto |
| 20260421-baseline-visible-marker-hardening | close | in-progress | arch, gate | 0 | full-auto |

## 最新判断（保留最近 10 条）

| 时间 | Spec | 角色 | 决定 | 原因 |
|------|------|------|------|------|
| 2026-04-29 | 20260429-release-first-close-workflow | qa | PASS | release-first 关键词、旧口径清理、baseline 同步和 0.5.3 版本一致性均验证通过；进入 close 发布链路 |
| 2026-04-29 | 20260429-release-first-close-workflow | spec-work | PASS | release-first 规则、分支前置、项目发布 gate 模板和 0.5.3 发布线版本已落地；进入 QA |
| 2026-04-29 | 20260429-release-first-close-workflow | reviewer | PASS | Write-Scope 已补齐发布线版本文件，AC 和 Verification 可约束 release-first close；进入分支执行 |
| 2026-04-29 | 20260429-release-first-close-workflow | spec-talk | PASS | 用户修正交付边界：本仓所有非 trivial 可交付改动都应 release-first，close 必须完成发布链路；上一轮 repo-close 但未 npm release 需标记缺口 |
| 2026-04-29 | 20260429-external-skill-pattern-assimilation | gate | REVISED | 实现与证据已提交并归档，但按 release-first 修正规则仍需纳入 0.5.3 发布链路 |
| 2026-04-29 | 20260429-external-skill-pattern-assimilation | qa | PASS | 用户命令外显、产品定位词、吸收机制词和本轮 baseline 同步文件均已验证；进入 close，剩余 Git 收口待处理 |
| 2026-04-29 | 20260429-external-skill-pattern-assimilation | spec-work | PASS | README、guide、methodology、skills 和 baseline 已按吸收机制更新；baseline 源与 npm 安装副本已同步，进入 qa |
| 2026-04-29 | 20260429-external-skill-pattern-assimilation | reviewer | PASS | Write-Scope、Non-goals、AC 和 Verification 能约束外部模式吸收到内部 routing / baseline / docs，并保持用户无需手动选择 workflow；进入 spec-work |
| 2026-04-29 | 20260429-external-skill-pattern-assimilation | spec-talk | PASS | 对比 Addy agent-skills 与 Matt Pocock skills 后收敛：ys-team 保持安装后正常对话和内部自动路由，吸收外部模式到 routing、baseline、docs，而非暴露为用户命令 |
| 2026-04-21 | 20260421-baseline-visible-marker-hardening | qa | PASS | baseline / 同步副本 / apostle 入口均已补齐固定可见标志格式，并验证关键文件已对齐；进入 close 等 Git 收口 |
| 2026-04-21 | 20260421-baseline-visible-marker-hardening | spec-work | PASS | baseline `AGENTS.md` / `CLAUDE.md`、npm 同步副本与 apostle 入口已完成 hardening，并同步升级 VERSION / CHANGELOG |
| 2026-04-21 | 20260421-baseline-visible-marker-hardening | spec-talk | PASS | 讨论收敛：baseline 必须显式列出固定尾标格式，并把“缺少可见标志即切回路由”回流到对外入口文件 |

## 阻塞项

- `20260421-baseline-status-and-role-pool-sourcing`：工作区存在本轮无关的已修改文件，close 暂不自动执行 Git 收口
- `20260421-baseline-visible-marker-hardening`：工作区存在本轮与历史改动混合，close 暂不自动执行 Git 收口
- `20260429-external-skill-pattern-assimilation`：已 repo-close 但未 npm release，按新规则需要补发布链路

## 待办

- [ ] 决定 `20260421-baseline-status-and-role-pool-sourcing` 的 Git 收口方式（当前工作区含本轮无关改动）
- [ ] 决定 `20260421-baseline-visible-marker-hardening` 的 Git 收口方式（当前工作区含本轮与历史改动）
- [ ] 视需要执行 `20260421-baseline-postrebuild-hardening` 的 Git 收口（当前未 commit）
- [ ] 为 `20260429-external-skill-pattern-assimilation` 补 npm release
