# work

Spec: 20260421-baseline-status-and-role-pool-sourcing
Date: 2026-04-21
Owner: ys-team-spec-work

## Scope

- 状态快照固定窗口与月度摘要载体
- `agency-agents` 默认外部角色池来源
- 槽位/绑定结构回写到 baseline、本仓配置和说明文档

## Execution Notes

- spec-review Round 2 已通过，目录已从 `queued/` 迁入 `active/`
- 本仓运行模式已切换为 `full-auto`
- 先落地 carrier 和 schema，再同步 README / guide / skills / module-index
- 已落地 `examples/baseline/.ys_team/role-pool.yaml`、`history/README.md`、`templates/monthly-summary.md`
- 已将本仓和 baseline 的 `config.yaml` 切到 `governance_slots + slot_bindings + roles` 结构
- 已将本仓和 baseline 的 `status.md` 明确为“最近 10 条判断”的快照入口
- 已同步 `docs/methodology/overview.md`、`docs/methodology/reference.md`、`README.md`、`docs/guide/getting-started.md`、`skills/ys-team*.md` 与 `docs/project/module-index.md`
- QA 已通过，验证命令和结果见 `evidence/20260421-qa-verification.md`
- close 阶段因存在本轮无关的工作区变更而暂不自动执行 Git 收口
