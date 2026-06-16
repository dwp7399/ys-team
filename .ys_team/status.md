# 团队状态

updated: 2026-06-16T10:02:57+08:00

## 活跃 Spec

| Spec | 阶段 | 状态 | 负责角色 | 重试次数 | 模式 |
|------|------|------|---------|---------|------|
| 20260421-baseline-status-and-role-pool-sourcing | close | in-progress | gate | 1 | full-auto |
| 20260421-baseline-visible-marker-hardening | close | in-progress | arch, gate | 0 | full-auto |

## 最新判断（保留最近 10 条）

| 时间 | Spec | 角色 | 决定 | 原因 |
|------|------|------|------|------|
| 2026-06-16 | 20260615-managed-agent-entry-upgrade | close | PASS | npm publish 成功，registry 返回 ys-team@1.0.1，latest=1.0.1、legacy=0.6.5；spec 已归档，进入 main/tag/push 收口 |
| 2026-06-16 | 20260615-managed-agent-entry-upgrade | close | BLOCKED | pre-publish gate 通过，但 `npm whoami` 连续返回 E401 Unauthorized；未执行 npm publish、合回 main、tag 或 push，需恢复 npm 登录后继续 close |
| 2026-06-15 | 20260615-managed-agent-entry-upgrade | qa | PASS | AGENTS/CLAUDE managed block 入口、CLI legacy 替换/插入/幂等路径、check-update 提示、baseline 双副本和 npm pack dry-run 均已验证；未执行 npm publish、合回 main、tag 或 push |
| 2026-06-15 | 20260615-managed-agent-entry-upgrade | spec-work | READY_FOR_QA | baseline 入口托管块、`init-project` 安全升级逻辑、`ys-team-init` rebuild 说明、用户文档和 1.0.1 版本线已落地；evidence 已记录 |
| 2026-06-12 | 20260611-loop-era-redesign | gate | close PASS | npm legacy tag 已指向 0.6.5，ys-team@1.0.0 已发布为 latest；spec 已归档，roadmap 已迁 completed；准备完成 git commit、合回 main、tag 与 push |
| 2026-06-12 | 20260611-loop-era-redesign | gate | close BLOCKED | spec-work 与 QA 已完成，Verification 和 npm pack dry-run 通过；进入 close 时 `npm whoami` 返回 E401 Unauthorized，本机 npm 未认证，未执行 npm publish、legacy tag、git tag 或 push |
| 2026-06-12 | 20260611-loop-era-redesign | qa | PASS | AC-01~18 已逐项验证；反向关键词、正向机制、baseline 全量 diff、版本一致性、结构 lint、npm pack dry-run 均通过；dist-tags 预检查显示当前 latest=0.6.5，legacy/latest 更新留到 close |
| 2026-06-12 | 20260611-loop-era-redesign | implementer | spec-work STARTED | 用户确认验收分级、UI < L2 默认 REJECT、迁移估计和 v1 原地替换 skill 策略；独立 spec-review findings 已修订，Write-Scope/Delete-Scope/AC/Verification 补齐；已切到 work/20260611-loop-era-redesign 并将 spec 迁入 active |
| 2026-06-12 | 20260611-loop-era-redesign | reviewer | spec-review PASS | 独立子代理审阅给出 CONDITIONAL PASS 后，已解决新老共存语义、Write-Scope 漏项、root AGENTS/CLAUDE 与 CLI 入口、Delete-Scope、AC/Verification 覆盖和结构 lint 可执行性；可进入 spec-work |
| 2026-06-11 | 20260611-loop-era-redesign | planner | spec-talk PASS | 五轮讨论收敛为 v1.0 loop era 换代 spec：核心是把工程重量从流程仪式搬到人类级 verifier；保真度分级(L3/L2/L1/L0)、三道闸替代排他、verifier 卡塌缩四制品、跨模型审阅替代五角圆桌、.ys_team 瘦身为跨会话记忆层。已先产出设计文档经用户过目，再起 queued spec。本 spec 自身验收保真度诚实声明为 L1(文档契约)，真实通过率验证在下游试点 |
| 2026-06-02 | 20260602-project-local-sop-assimilation | close | PASS | npm publish 成功，registry 返回 ys-team@0.6.5；发布阻塞已解除，spec 归档并进入 main/tag 推送收口 |
| 2026-06-02 | 20260602-project-local-sop-assimilation | close | BLOCKED | npm pack 通过，但 npm publish 因本机 npm 认证失效失败；npm whoami 返回 E401，远端 ys-team 最新仍为 0.6.4 |
| 2026-06-02 | 20260602-project-local-sop-assimilation | qa | PASS | QA 复跑关键词、反向业务词、版本一致性、方法论版本和 npm pack dry-run 均通过；AC-01~12 全部 PASS，可进入 release-first close |
| 2026-06-02 | 20260602-project-local-sop-assimilation | spec-work | READY_FOR_QA | 项目本地 SOP 概念、baseline 双副本、本仓模板、skills、用户文档和版本线已按 spec 落地；关键词、反向业务词、版本一致性和 npm pack dry-run 验证均通过 |
| 2026-06-02 | 20260602-project-local-sop-assimilation | spec-work | STARTED | 已切到 work/20260602-project-local-sop-assimilation，并将 spec 从 queued 迁入 active；开始按合同更新方法论文档、用户文档、baseline 双副本、skills 和发布线版本 |
| 2026-06-02 | 20260602-project-local-sop-assimilation | spec-review | PASS | spec 已约束项目本地 SOP 的通用边界、Write-Scope 覆盖发布线和 baseline 双副本，Verification 含正向/反向关键词、版本和 npm pack 检查，可进入 spec-work |
| 2026-06-02 | 20260602-project-local-sop-assimilation | spec-talk | PASS | 已基于 ai-gateway 落地实践收敛为项目本地 SOP 吸收机制 spec；边界是不复制业务知识，只吸收 repo-local SOP、条件式 close gate 和 spec-review 合同检查 |
| 2026-05-21 | 20260521-questions-md-grill | close | PASS | npm publish 成功，registry 返回 ys-team@0.6.4；0.6.4 为对齐归档状态的修正发布 |
| 2026-05-21 | 20260521-questions-md-grill | close | BLOCKED | QA 已 PASS；本仓 release-first close 需要 npm publish，但当前 Write-Scope 未包含 package/version 发布文件，需用户确认是否扩 scope |
| 2026-05-21 | 20260521-questions-md-grill | qa | PASS | 关键词检查、三份 questions.md 模板 diff、模板结构检查和 AC 逐项验证均通过；share/ 为无关未跟踪文件，未纳入本 spec |
| 2026-05-21 | 20260521-questions-md-grill | spec-work | PASS | 文件化 Grill 行为、主入口升级说明、三份 questions.md 模板、方法论文档和现实索引已按 spec 落地；evidence 已记录验证结果 |
| 2026-05-21 | 20260521-questions-md-grill | spec-review | PASS | spec 目标、边界、Write-Scope、AC 和 Verification 可执行；已切到 work/20260521-questions-md-grill 并迁入 active |
| 2026-05-21 | 20260521-questions-md-grill | spec-talk | PASS | 用户确认采用 `questions.md` 命名，并要求使用问卷调查式格式；已产出 queued spec，约束文件化 Grill 的触发、模板和 Ready For Spec 退出条件 |
| 2026-05-08 | local-output-mode | patch | PASS | 本仓 ys-team baseline 已是 npm 最新 0.6.2；按用户要求将 `.ys_team/config.yaml` 的 `output_mode` 从 `technical` 改为 `friendly` |
| 2026-05-08 | 20260508-friendly-mode | close | PASS | npm publish 成功，registry 返回 ys-team@0.6.2；spec 进入归档与 main/tag 推送收口 |
| 2026-05-08 | 20260508-friendly-mode | close | REVISED | 混合改动已拆分为本地 baseline 补齐与 friendly output_mode 两组提交；当前剩余 close 工作是 npm publish、合回 main、tag 和 push main/tag |
| 2026-05-08 | 20260508-friendly-mode | qa | PASS | 按用户修正改为配置驱动：`.ys_team/config.yaml`、baseline 双副本均新增 `output_mode: technical`；skill 和文档说明 `technical/friendly` 两种模式；配置枚举、契约关键词、治理边界、版本一致性和 diff hygiene 均通过 |
| 2026-05-08 | 20260508-friendly-mode | spec-talk | REVISED | 用户澄清友好模式应通过配置选择技术模式/友好模式；spec 已改为 `output_mode: technical \| friendly`，关键词仅作为临时覆盖，不作为主机制 |
| 2026-05-08 | 20260508-friendly-mode | close | BLOCKED | QA 已 PASS，但 close 需要 commit / npm publish / 合回 / tag；当前工作区存在本轮开始前已有的 .ys_team 混合改动，不能安全自动收口 |
| 2026-05-08 | 20260508-friendly-mode | qa | PASS | QA 复跑关键词、治理边界、版本一致性、固定模板回归和 diff hygiene 检查，全部通过；实现未把友好模式固化为“结论/风险/下一步”模板 |
| 2026-05-08 | 20260508-friendly-mode | spec-work | PASS | 友好模式已落地为“原输出 + 人话版总结”的二次解释层；4 个 skill、README、Getting Started、方法论文档、glossary、版本文件已更新；关键词、治理边界、版本一致性和 Feedback Loop 验证均通过 |
| 2026-05-08 | 20260508-friendly-mode | spec-work | STARTED | 用户确认后进入 spec-work；已切到 work/20260508-friendly-mode，并将 spec 从 queued 迁入 active |
| 2026-05-08 | 20260508-friendly-mode | spec-review | PASS | spec 已按用户确认修正为“原输出 + 友好总结”的二次解释层；不强制结构、不降低治理、不替代技术细节；Write-Scope 和 Verification 可执行 |
| 2026-05-08 | 20260508-friendly-mode | spec-talk | REVISED | 用户澄清友好模式不是固定“结论/风险/下一步”结构，而是把原始技术输出再做一遍面向非程序背景用户的友好总结；spec 已修订为二次解释层，不强制结构和字段 |
| 2026-05-08 | 20260508-friendly-mode | spec-talk | PASS | 用户反馈当前输出可信但信息过多、专业名词偏重；三角色收敛为“友好模式”呈现层 spec：先给结论/风险/下一步，保留技术细节和治理 gate，不新增独立 workflow |
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

- `20260507-skill-structure-refactor`：已归档（0.6.0 release 完成）
- `20260507-context-and-feedback-loop`：已归档（0.6.0 release 完成）
- `20260421-baseline-status-and-role-pool-sourcing`：工作区存在本轮无关的已修改文件，close 暂不自动执行 Git 收口
- `20260421-baseline-visible-marker-hardening`：工作区存在本轮与历史改动混合，close 暂不自动执行 Git 收口

## 待办

- [ ] 决定 `20260421-baseline-status-and-role-pool-sourcing` 的 Git 收口方式（当前工作区含本轮无关改动）
- [ ] 决定 `20260421-baseline-visible-marker-hardening` 的 Git 收口方式（当前工作区含本轮与历史改动）
