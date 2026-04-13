# Contributing

## Principles

- 保持 `ys-team` 的对外心智尽量少。
- 优先补强稳定原则、边界和项目本地化能力，不把仓库做成重流程系统。
- 改动按三级分流：L0 trivial 直接执行、L1 patch 执行+留痕、L2 spec 完整流程。
- 方法论规范见 `docs/methodology/`，平台适配逻辑见 `skills/*/SKILL.md`。
- 文档必须反映仓库当前真实状态。

## Development Notes

- `README.md` 面向使用者，描述当前公开能力和使用方式。
- `skills/*/SKILL.md` 是对外能力定义，变更时需同步更新 `README.md` 和 `docs/project/`。
- `.ys_team/` 是本仓自己的工作流基线；如果本仓方法变了，优先走 spec 和本地规则更新。

## Pull Requests

- 保持改动主题单一。
- 对外行为变化请在 PR 描述中说明：
  - 变更前是什么
  - 变更后是什么
  - 为什么这样改
  - 如何验证
