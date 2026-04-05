# Policy

## Scope

本策略约束 `ys-team` 仓库内的讨论、spec、文档和交付。

## Execution Rules

- 非 trivial 改动先以 `docs/specs/` 为准。
- 文档必须反映项目当前真实状态。
- spec、实现和验收证据应保持同一次交付闭环。
- README、skills、项目文档之间必须保持一致。
- 改动方法论定义时，优先减少概念数量，避免增加不必要用户心智。

## Documentation Authority

| 关注面 | 权威文档 |
|--------|----------|
| 方法论定义、仓库现状 | `docs/project/overview.md` |
| 模块关系与影响面索引 | `docs/project/module-index.md` |
| 仓库结构 | `docs/project/structure.md` |
| 使用方式 | `README.md` |
| 对外 skill 定义 | `skills/*/SKILL.md` |

## Reality Index

现实索引（`docs/project/module-index.md`）是本仓各角色对方法仓模块现实达成共识的基础设施。

- **承载内容**：skills、baseline、仓库自用 `.ys_team/`、项目文档之间的职责划分与依赖关系
- **维护时机**：新增 skill、调整 baseline 结构、变更 init/rebuild 职责边界时更新
- **使用时机**：spec/control 阶段快速判断影响范围；rebuild 时判断哪些文档和骨架需要同步

## Documentation Sync Rules

- 方法论主定义变化 → 更新 `docs/project/overview.md` 和相关 `skills/*/SKILL.md`
- 模块边界或 baseline 结构变化 → 更新 `docs/project/module-index.md`
- 用户接入方式变化 → 更新 `README.md`
- skill 边界变化 → 更新对应 `SKILL.md`
- spec 模板变化 → 更新 `.ys_team/templates/`

## Spec Rules

- spec 文件写入 `docs/specs/<phase>/<initiative-id>/`
- `phase` 使用 `queued`、`active`、`completed`、`cancelled`
- evidence 放在 initiative 目录下的 `evidence/`
- 验收必须包含可复核证据
