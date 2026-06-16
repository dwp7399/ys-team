# 旧角色配置迁移记录

> 2026-06-12 rebuild 到 v1 时，`.ys_team/config.yaml` 已移除 `roles`、`governance_slots`、`slot_bindings` 和 `role_selection`。
> v1 baseline 不再读取这些字段；本文件只保留迁移前的本仓本地语义，供后续确认是否拍平成 verifier/review 策略或删除。

## 原本仓角色

| id | 名称 | focus | tools |
|----|------|-------|-------|
| arch | 方法论架构师 | 方法论定义、skill 边界、原则改写 | 一致性检查 |
| pm | 产品演进负责人 | 功能规划、用户体验、skill 设计、baseline 模板 | — |
| gate | 交付守门人 | spec 验收、证据、回滚、交付闭环 | 完成前验证 |
| reviewer | 规格审阅人 | spec 独立审阅 | — |
| qa | 质量保障守门人 | 落地验收独立核查 | — |

## 原 slot 语义

| slot | stage | required | purpose |
|------|-------|----------|---------|
| planner | spec-talk | true | 收敛需求、提出边界和形成 spec 草案 |
| implementer | spec-work | true | 按 spec 落地并维护执行日志 |
| spec_reviewer | spec-review | true | 独立审阅 spec 的完整性和可执行性 |
| qa_reviewer | qa | true | 独立验证实现结果和验收证据 |
| close_owner | close | true | 负责状态收口、归档和交付闭环 |

## 原绑定

| slot | role_id | source | binding_type |
|------|---------|--------|--------------|
| planner | pm | local | project-shaped |
| implementer | arch | local | project-shaped |
| spec_reviewer | reviewer | local | project-shaped |
| qa_reviewer | qa | local | project-shaped |
| close_owner | gate | local | project-shaped |

## 原选择规则

- 涉及方法论定义、skill 边界和原则改写 → 必须包含 arch。
- 涉及功能规划、用户体验、baseline 模板 → 必须包含 pm。
- 涉及 spec 验收、证据、交付闭环 → 必须包含 gate。
- spec 完成后独立审阅 → reviewer。
- 落地验收阶段 → qa。

## v1 迁移建议

- 角色选择不要再作为全局硬流程；按 verifier 卡里的风险和验收要求决定是否需要独立审阅。
- 可复用失败模式写入领域错题本，例如 `.ys_team/memory/verification.md`、`.ys_team/memory/release.md` 或 `.ys_team/memory/ui-interaction.md`。
- 如果确认不再需要旧角色语义，可在单独 cleanup 中删除本文件、`.ys_team/role-pool.yaml` 和旧角色 memory 文件。
