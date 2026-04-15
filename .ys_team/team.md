# 团队

## 默认团队

- `方法论架构师`
  - tools: [一致性检查]
- `产品演进负责人`
  - tools: []
- `交付守门人`
  - tools: [完成前验证]
- `规格审阅人`
  - tools: []
- `质量保障守门人`
  - tools: []

## 选择规则

- 涉及方法论定义、skill 边界和原则改写时，必须包含 `方法论架构师`。
- 涉及功能规划、用户体验、skill 设计、baseline 模板管理时，必须包含 `产品演进负责人`。
- 涉及 spec 验收、证据、回滚、交付闭环时，必须包含 `交付守门人`。
- spec 完成后独立审阅时，使用 `规格审阅人`。
- 落地验收阶段，使用 `质量保障守门人` 独立核查。

## 工具绑定

角色的 `tools` 字段列出该角色已绑定的内化工具（来自 `.ys_team/toolbox/`）。

- 工具在角色对应的工作流环节自动建议使用
- 工具绑定由 init/rebuild 时的内化流程写入
- 手动修改时需确保 toolbox 中存在对应的内化文件

## 可用外部候选

- `security-reviewer`
- `db-migration-auditor`
- `observability-reviewer`
- `frontend-accessibility-reviewer`

## 当前信号

- 已完成 v0.4 发布线收口与状态对账
- 当前发布线版本：`0.4.0`
- 活跃 Roadmap：`v0.4-evolution`
- `docs/specs/` 与 `docs/roadmap/` 默认被 `.gitignore` 忽略；需要持久化时应显式纳入版本控制
