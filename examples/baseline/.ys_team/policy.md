# Policy

## Execution Rules

- 改动按三级分流：L0 trivial（直接执行）、L1 patch（执行 + status.md 留痕）、L2 spec（完整 spec 流程）。
- L2 改动先以 `docs/specs/` 为准。
- 文档必须反映项目当前真实状态。
- spec、实现和验收证据应保持同一次交付闭环。
- 默认保持最小公开心智，不为了”看起来完整”而把内部能力暴露成用户菜单。

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

### Spec 级并行（spec_parallel）

启用后，多个不相关的 spec 可同时走 spec-work → submit 链。

- 类似多个 feature branch 同时开发
- 冲突检测：如果两个 spec 的 write-scope 涉及同一模块，降级为串行，并在 status.md 中标注冲突
- 每条并行线在 status.md 中独立追踪

### 角色级并行（role_parallel）

启用后，同一 spec 内多个角色可并行工作。

- 如 project-architect 做设计时 delivery-guard 同步准备验收标准
- 讨论收敛后汇总各角色结果
- 角色间有依赖时仍需串行（如 architect 的设计完成后 domain-integrator 才能评估集成面）

### 默认关闭

并行能力默认关闭。项目在确认以下条件后可在 rebuild 时开启：

- 团队对 ys-team 工作流已熟悉
- status 数据追踪正常运行
- 项目模块边界清晰（现实索引完整）
