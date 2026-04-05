# Team

## Default Team

- `method-architect`
  - tools: [systematic-debugging]
- `init-onboarding-steward`
  - tools: []
- `delivery-guard`
  - tools: [verification]

## Selection Rules

- 涉及方法论定义、skill 边界和原则改写时，必须包含 `method-architect`。
- 涉及 init / rebuild 行为、README 接入说明、跨语言上手路径时，必须包含 `init-onboarding-steward`。
- 涉及 spec 验收、证据、回滚、交付闭环时，必须包含 `delivery-guard`。

## Tools Binding

角色的 `tools` 字段列出该角色已绑定的内化工具（来自 `.ys_team/toolbox/`）。

- 工具在角色对应的工作流环节自动建议使用
- 工具绑定由 init/rebuild 时的内化流程写入
- 手动修改时需确保 toolbox 中存在对应的内化文件
