# Team

## Default Team

- `project-architect`
  - tools: []
- `domain-integrator`
  - tools: []
- `doc-spec-steward`
  - tools: []
- `delivery-guard`
  - tools: []

## Selection Rules

- 涉及系统边界、模块职责和主链路设计时，必须包含 `project-architect`。
- 涉及外部系统、契约、集成面或领域适配时，必须包含 `domain-integrator`。
- 涉及项目文档、spec、模板或对外说明时，必须包含 `doc-spec-steward`。
- 涉及验收、风险、回滚和证据时，必须包含 `delivery-guard`。

## Tools Binding

角色的 `tools` 字段列出该角色已绑定的内化工具（来自 `.ys_team/toolbox/`）。

- 工具在角色对应的工作流环节自动建议使用
- 工具绑定由 init/rebuild 时的内化流程写入
- 手动修改时需确保 toolbox 中存在对应的内化文件

## Available External Candidates

- `security-reviewer`
- `db-migration-auditor`
- `observability-reviewer`
- `frontend-accessibility-reviewer`
