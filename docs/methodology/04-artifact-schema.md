# Spec 制品定义

## Spec 目录结构

```
docs/specs/
├── queued/          # 排队中
├── active/          # 执行中
├── completed/       # 已完成
└── cancelled/       # 已取消

docs/specs/<phase>/<initiative-id>/
├── requirement.md   # 原始需求记录
├── control.md       # spec 合约
├── work.md          # 执行记录
├── review.md        # 审阅结论
├── qa-report.md     # QA 验收报告
├── workspace.md     # 工作记忆
└── evidence/        # 验收证据
```

initiative-id 格式：`YYYYMMDD-HHMMSS-name`（推荐）。历史 spec 可能使用 `YYYYMMDD-name` 等变体，不要求迁移，新 spec 统一使用推荐格式。

## 制品清单

### requirement.md — 原始需求记录

产出阶段：spec-talk

| 字段 | 必需 | 说明 |
|------|------|------|
| 需求来源 | 是 | 提出时间、来源方式 |
| 原始描述 | 是 | 用户原话或精简版，不加工不改写 |
| 背景补充 | 否 | 仓库现状中与此需求相关的已知信息 |
| 初步范围判断 | 是 | 影响模块、是否跨模块、是否涉及 DB/API 变更 |

### control.md — Spec 合约

产出阶段：spec-talk

这是 spec 的核心文件，定义了"做什么、怎么验收"。

| 字段 | 必需 | 说明 |
|------|------|------|
| Background | 是 | 为什么要做这件事 |
| Goals | 是 | 要达成什么 |
| Deliverables | 是 | 具体交付物 |
| Acceptance Criteria | 是 | 验收标准 |
| Write-Scope | 是 | 允许修改的文件或目录范围 |
| Verification | 是 | 可直接执行的验证命令或明确的人工检查步骤 |
| Risks | 否 | 已识别的风险 |
| Rollback Plan | 否 | 回滚方案 |
| Collaboration Summary | 是（讨论产出时） | 参与角色、讨论轮次、关键分歧 |
| Discussion Digest | 是（讨论产出时） | 讨论过程精简记录 |
| Documentation Updates | 否 | 需要同步更新的文档 |
| Depends-On | 否 | 依赖的其他 spec |

Write-Scope 语义：执行阶段只能修改 Write-Scope 声明的文件或目录。超出范围的修改需要回到讨论阶段扩展 scope。

Verification 语义：必须是可直接执行的命令或可明确复核的步骤，不能是"确认功能正常"这样的模糊描述。

### work.md — 执行记录

产出阶段：spec-work

结构与 control.md 类似，记录实际执行的内容。执行完成后，work.md 应反映实际交付的状态。

### review.md — 审阅结论

产出阶段：spec-review

| 字段 | 必需 | 说明 |
|------|------|------|
| Decision | 是 | PASS / REJECT |
| 审阅依据 | 是 | 逐项检查清单 |
| 发现问题 | REJECT 时必需 | 具体问题列表 |
| 修改建议 | REJECT 时必需 | 具体到章节或字段的修改建议 |

审阅依据检查项：
- 目标和 Non-goals 清晰无歧义
- Write-Scope 明确到文件或目录
- Verification 命令可直接执行
- Acceptance Criteria 涵盖主要验收路径
- 回滚方案可执行（如适用）
- 文档同步项已列入 Write-Scope（如适用）
- 与现有 active spec 的依赖关系已声明

### qa-report.md — QA 验收报告

产出阶段：qa

| 字段 | 必需 | 说明 |
|------|------|------|
| Decision | 是 | PASS / REJECT |
| 验收范围 | 是 | 本次 QA 覆盖的 work 列表 |
| 自动化验证 | 否 | 测试命令及结果摘要 |
| Acceptance Criteria 验证 | 是 | 逐项验收结果表 |
| Evidence 检查 | 是 | 证据文件存在性和完整性 |
| 未通过项 | REJECT 时必需 | 具体失败条目 |
| 修复建议 | REJECT 时必需 | 具体到文件和修复步骤 |

### workspace.md — 工作记忆

贯穿整个 spec 生命周期，跨阶段共享。

| 字段 | 必需 | 说明 |
|------|------|------|
| 当前状态 | 是 | 当前阶段和进度概述 |
| 关键决策记录 | 否 | 讨论或执行中的关键取舍 |
| 遗留问题 | 否 | 未解决的问题及优先级 |
| 阶段输出摘要 | 否 | 每个阶段完成后追加 |

workspace.md 有容量上限（由项目配置决定），超出时压缩。

## Roadmap 制品

```
docs/roadmap/
├── queued/
├── active/
├── completed/
└── cancelled/
```

Roadmap 制品用于 stage 级别的规划，包含：

| 字段 | 必需 | 说明 |
|------|------|------|
| Background | 是 | 为什么做这个阶段规划 |
| Goals | 是 | 阶段目标 |
| Scope | 是 | 包含和不包含什么 |
| Milestones | 是 | 里程碑列表 |
| Risks | 否 | 已识别风险 |
| Exit Criteria | 是 | 阶段完成的判定标准 |

## 证据目录

每个 spec 的 `evidence/` 目录存放验收证据：

- 测试输出截图或日志
- 命令执行结果
- 对比截图（before/after）
- 其他可复核的交付证明

证据必须可复核，不能只是"已确认"的文字声明。
