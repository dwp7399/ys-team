# 团队状态

updated: 2026-05-07T00:30:00+08:00

## 活跃 Spec

| Spec | 阶段 | 状态 | 负责角色 | 重试次数 | 模式 |
|------|------|------|---------|---------|------|
| 20260507-context-and-feedback-loop | qa | pending | qa | 0 | full-auto |
| 20260507-skill-structure-refactor | qa | PASS（held） | qa | 0 | full-auto |
| 20260421-baseline-status-and-role-pool-sourcing | close | in-progress | gate | 1 | full-auto |
| 20260421-baseline-visible-marker-hardening | close | in-progress | arch, gate | 0 | full-auto |

## 最新判断（保留最近 10 条）

| 时间 | Spec | 角色 | 决定 | 原因 |
|------|------|------|------|------|
| 2026-05-07 | 20260507-context-and-feedback-loop | spec-work | PASS | 3 处 spec.md 加 Feedback Loop / 3 处 glossary.md 创建 / 3 处 reality.md 加领域语言段 / 2 个 SKILL.md 在 supporting-info 内追加（wrapper 保持）/ 方法论 overview+reference 加 2 概念 / VERSION 1.0.0→1.1.0；AC-01~09 自检全 PASS；进入 qa |
| 2026-05-07 | 20260507-context-and-feedback-loop | spec-review | PASS | 独立审阅 12 项检查全 OK + 4 个 Note；强项是边界清晰、release-first close 链路与 Release Gate 完全对齐、wrapper-only 原则在 D3/D4 显式声明、本 spec 自吃狗粮（Feedback Loop 写明 60 秒）；进入 spec-work |
| 2026-05-07 | 20260507-context-and-feedback-loop | spec-talk | PASS | arch/pm/gate 三角色收敛 0.6.0 Spec B：领域语言层 + 反馈环纪律 + grill 子模式 + 0.6.0 release 收口；Depends-On Spec A；close 阶段同一 commit 归档双 spec |
| 2026-05-07 | 20260507-skill-structure-refactor | qa | PASS | 独立 qa 复跑 Verification 全部命令 + 6 项额外审视全 OK；AC-07 硬约束触发"hold at active"，不进 close；2 项 gap 已记录，本 spec 风险极低 |
| 2026-05-07 | 20260507-skill-structure-refactor | spec-work | PASS | 4 个 SKILL.md 完成 description 增强 + what-to-do/supporting-info 分块；自检 AC-01~06 全 PASS（AC-04 仅 4 个 `-` 行均为旧 description 替换）；evidence 含 diff-summary 与 reroute-cases；进入 qa |
| 2026-05-07 | 20260507-skill-structure-refactor | spec-review | PASS | 独立审阅 8 项检查全 OK；强项是边界清晰、AC-04 反向 diff 约束、Rollback 干净；Note：spec-work 阶段需在 evidence 中记录 description 替换造成的 `-` 行来源、保留 reroute case 输入与结果。已切 release/0.6.0 分支，进入 spec-work |
| 2026-05-07 | 20260507-skill-structure-refactor | spec-talk | PASS | arch/pm/gate 三角色收敛 0.6.0 Spec A：4 个 SKILL.md 加触发短语 + what-to-do/supporting-info 分块；Spec A qa PASS 后停 active，由 Spec B close 统一发 0.6.0 |
| 2026-04-29 | 20260429-release-first-close-workflow | gate | PASS | 0.5.3 已 npm publish，release/0.5.3 已合回 main，main 和 v0.5.3 tag 已 push，spec 已归档 |
| 2026-04-29 | 20260429-release-first-close-workflow | gate | PASS | npm publish 成功，registry 已返回 ys-team@0.5.3；继续合回 main、tag 和 push |
| 2026-04-29 | 20260429-release-first-close-workflow | gate | BLOCKED | npm pack 通过，但 npm publish 因本机 npm 未认证失败；npm whoami 返回 401，远端 ys-team 仍为 0.5.2 |
| 2026-04-29 | 20260429-release-first-close-workflow | qa | PASS | release-first 关键词、旧口径清理、baseline 同步和 0.5.3 版本一致性均验证通过；进入 close 发布链路 |
| 2026-04-29 | 20260429-release-first-close-workflow | spec-work | PASS | release-first 规则、分支前置、项目发布 gate 模板和 0.5.3 发布线版本已落地；进入 QA |
| 2026-04-29 | 20260429-release-first-close-workflow | reviewer | PASS | Write-Scope 已补齐发布线版本文件，AC 和 Verification 可约束 release-first close；进入分支执行 |
| 2026-04-29 | 20260429-release-first-close-workflow | spec-talk | PASS | 用户修正交付边界：本仓所有非 trivial 可交付改动都应 release-first，close 必须完成发布链路；上一轮 repo-close 但未 npm release 需标记缺口 |
| 2026-04-29 | 20260429-external-skill-pattern-assimilation | gate | REVISED | 实现与证据已提交并归档，但按 release-first 修正规则仍需纳入 0.5.3 发布链路 |
| 2026-04-29 | 20260429-external-skill-pattern-assimilation | qa | PASS | 用户命令外显、产品定位词、吸收机制词和本轮 baseline 同步文件均已验证；进入 close，剩余 Git 收口待处理 |

## 阻塞项

- `20260507-skill-structure-refactor`：本 spec qa PASS 后停 `active/`，由 Spec B（0.6.0-context-and-feedback-loop）的 close 统一发 0.6.0 并同时归档双方
- `20260421-baseline-status-and-role-pool-sourcing`：工作区存在本轮无关的已修改文件，close 暂不自动执行 Git 收口
- `20260421-baseline-visible-marker-hardening`：工作区存在本轮与历史改动混合，close 暂不自动执行 Git 收口

## 待办

- [ ] Spec A 进入 spec-review（reviewer 独立审阅）
- [ ] Spec A 通过 spec-review 后切到 `release/0.6.0` 或 `work/20260507-skill-structure-refactor` 分支再进 spec-work
- [ ] Spec B（0.6.0-context-and-feedback-loop）在 Spec A qa PASS 后启动 spec-talk
- [ ] 决定 `20260421-baseline-status-and-role-pool-sourcing` 的 Git 收口方式（当前工作区含本轮无关改动）
- [ ] 决定 `20260421-baseline-visible-marker-hardening` 的 Git 收口方式（当前工作区含本轮与历史改动）
- [ ] 视需要执行 `20260421-baseline-postrebuild-hardening` 的 Git 收口（当前未 commit）
