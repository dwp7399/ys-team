# Spec 生命周期状态机

## 三级分流

所有改动请求先经过路由判断，按影响范围分为三个级别：

| 级别 | 名称 | 判定条件 | 流程 | 产出 |
|------|------|----------|------|------|
| L0 | trivial | 单文件、无影响、用户声明 trivial | 直接执行 | 无 |
| L1 | patch | ≤3 文件、单模块内、意图清晰 | 执行 → 留痕 | patch-note |
| L2 | spec | 跨模块、有风险、需讨论收敛 | 完整状态机 | 全套制品 |

举证责任在"降级"：不确定时走 L2。

### L0 trivial 条件（全部满足）

- 单文件改动
- 无跨模块影响
- 无回滚风险
- 用户明确声明是 trivial

### L1 patch 条件（全部满足）

- 改动范围 ≤ 3 个文件
- 影响范围在单模块内
- 无数据迁移、无外部 API 变更、无安全敏感操作
- 改动意图清晰，不需要多角色讨论来收敛

L1 执行后须在状态追踪中留一行记录。

### L2 spec

不满足 L0 或 L1 条件的改动，进入完整状态机。

## 状态定义

L2 改动经过以下状态：

| 状态 | 含义 | 负责方 |
|------|------|--------|
| idle | 无活跃 spec | — |
| spec-talk | 多角色讨论，收敛需求 | 讨论角色组 |
| spec-review | 独立审阅 spec 质量 | 审阅角色 |
| spec-work | 按 spec 执行实现 | 执行角色 |
| qa | 独立验证落地效果 | 质检角色 |
| close | 汇总、提交、更新状态 | 编排层 |
| done | spec 已完成 | — |
| halt | 重试耗尽，等待人工决策 | 用户 |

## 状态转换

| 从 | 到 | 触发条件 | 产出制品 |
|----|-----|----------|----------|
| idle | spec-talk | 路由判断为 L2 | — |
| spec-talk | spec-review | 讨论收敛，角色组 PASS | requirement.md, control.md |
| spec-review | spec-work | 审阅 PASS | review.md (PASS) |
| spec-review | spec-talk | 审阅 REJECT，重试 < 上限 | review.md (REJECT) |
| spec-work | qa | 执行完成 | work.md, workspace.md |
| qa | close | 质检 PASS | qa-report.md (PASS) |
| qa | spec-work | 质检 REJECT，重试 < 上限 | qa-report.md (REJECT) |
| close | done | 提交完成，状态更新 | — |
| spec-review | halt | 审阅 REJECT，重试 ≥ 上限 | — |
| qa | halt | 质检 REJECT，重试 ≥ 上限 | — |

```
idle ──→ spec-talk ──→ spec-review ──→ spec-work ──→ qa ──→ close ──→ done
              ↑ REJECT       │              ↑ REJECT  │
              └──────────────┘              └─────────┘
                                    重试耗尽 → halt
```

## 编排模式

同一状态机有三种行为变体，由项目配置决定：

| 模式 | spec-work 前 | close 前 | 重试耗尽 |
|------|-------------|----------|----------|
| manual | 用户手动推进每个阶段 | 用户手动推进 | 用户决策 |
| semi-auto | 暂停，等用户确认 | 暂停，等用户确认 | 暂停（降级） |
| full-auto | 自动继续 | 自动继续 | 暂停（降级） |

三种模式共享同一状态机和转换规则，区别仅在于阶段间是否自动流转。

重试耗尽时，full-auto 自动降级为 semi-auto，等待用户决策。

## 重试语义

- spec-review REJECT → 回到 spec-talk，将 review.md 作为输入
- qa REJECT → 回到 spec-work，将 qa-report.md 作为输入
- 每次 REJECT 重试计数 +1
- 重试上限由项目配置决定（默认 3 次）
- 重试耗尽 → 进入 halt 状态

## 上下文隔离

状态机的关键设计原则：阶段间通过制品文件通信，不共享对话历史。

- spec-review 角色只看到 requirement.md 和 control.md，看不到讨论过程
- qa 角色只看到 spec 制品和实现结果，不参与执行决策
- 这确保审阅和质检的独立性

## 状态追踪

每个活跃 spec 在状态追踪文件中维护一行记录，包含：

| 列 | 说明 |
|----|------|
| Spec | spec 标识 |
| 阶段 | 当前状态机状态 |
| 状态 | 进行中 / 已阻塞 / 已完成 / 已暂停 |
| 负责角色 | 当前阶段的负责角色 |
| 重试次数 | spec-review 或 qa 的 REJECT 重试计数 |
| 模式 | manual / semi-auto / full-auto |

阶段转换时必须同步更新状态追踪。
