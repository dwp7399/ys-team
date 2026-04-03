# Policy

## Execution Rules

- 非 trivial 改动先以 `docs/specs/` 为准。
- 文档必须反映项目当前真实状态。
- spec、实现和验收证据应保持同一次交付闭环。
- 默认保持最小公开心智，不为了“看起来完整”而把内部能力暴露成用户菜单。

## Documentation Authority

项目应声明：

- 哪些文档承载当前现实
- 哪些文档承载接口或结构说明
- 哪些文档承载 roadmap / spec
- 哪些文档是代码变化后必须同步更新的权威来源

## Reality Index

现实索引（`docs/project/module-index.md`）是 AI 团队各角色对项目模块现实达成共识的基础设施。

- **承载内容**：模块划分、业务职责摘要（2–3 句）、模块间依赖关系
- **维护时机**：模块新增、模块职责重大变化、模块间依赖关系变化时更新
- **维护方式**：运行 `ys-team-doc-build`（`ys-team-rebuild` 时自动调用）
- **使用时机**：control 阶段快速判断影响范围；work 阶段 Write-Scope 语义对齐；evidence 阶段生成验收检查点
- **读取优先**：在讨论改动前，先读索引，再决定是否需要深入代码

## Documentation Sync Rules

项目应定义：

- 实现变化时哪些文档必须同步更新
- 对外行为变化时哪些说明必须更新

## Spec Rules

- control / work 写入 `docs/specs/<phase>/<initiative-id>/`
- evidence 放在对应 initiative 的 `evidence/`
- verification 必须可执行或可复核
- work 的 write-scope 必须明确到文件或目录

## Submit Gate

项目应定义哪些情况需要更重的交付复核，例如：

- 数据迁移
- 对外接口行为变化
- 多模块联动
- 外部回调或异步链路上线
