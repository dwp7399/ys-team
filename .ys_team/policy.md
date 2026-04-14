# Policy

## Scope

本策略约束 `ys-team` 仓库内的讨论、spec、文档和交付。

## Execution Rules

- 改动按三级分流：L0 trivial（直接执行）、L1 patch（执行 + status.md 留痕）、L2 spec（完整 spec 流程）。
- L2 改动先以 `docs/specs/` 为准。
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

## Spec-Review Gate

semi-auto / full-auto 模式下，spec-talk 完成后自动触发独立审阅。

审阅范围：
- 目标、Non-goals、Write-Scope、Verification 是否达到"可执行"标准
- 依赖关系是否在 Depends-On 中声明
- 文档同步项是否列入 Write-Scope

PASS → 进入 spec-work（semi-auto 暂停等确认）
REJECT → 回退到 spec-talk，review.md 作为输入，重试计数 +1

## QA Gate

semi-auto / full-auto 模式下，spec-work 完成后自动触发独立验证。

验证范围：
- 项目测试结果
- Acceptance Criteria 每条是否满足
- evidence/ 是否存在且与 Verification 对应
- 文档同步项是否已落地

PASS → 进入 close（semi-auto 暂停等确认）
REJECT → 回退到 spec-work，qa-report.md 作为输入，重试计数 +1

## Quality Bar

项目应定义质量底线，例如：

- 根因修复，不做兼容层
- 未完成文档同步的实现视为未完成交付

## 并行策略

```yaml
spec_parallel: false      # 多个不相关 spec 可同时执行
role_parallel: false       # 同一 spec 内多角色可并行工作
```

当前项目为方法论仓库，规模较小，暂不启用并行。待团队工作流稳定后可在 rebuild 时开启。
