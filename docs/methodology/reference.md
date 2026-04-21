# ys-team 规则参考

本文档是 ys-team 方法论的完整规则参考。面向"查规则细节"，不重复 overview.md 的理念阐述。

## 状态机

L2 改动经过以下状态：

| 状态 | 含义 | 负责方 |
|------|------|--------|
| idle | 无活跃 spec | — |
| spec-talk | 多角色讨论，收敛需求 | 讨论角色组 |
| spec-review | 独立审阅 spec 质量 | 审阅角色 |
| spec-work | 按 spec 执行实现 | 执行角色 |
| qa | 独立验证落地效果 | 质检角色 |
| close | 提交、更新状态、归档 | 编排层 |
| done | spec 已完成 | — |
| halt | 重试耗尽，等待人工决策 | 用户 |

## Spec 目录生命周期

| 目录 | 语义 | 进入条件 | 离开条件 |
|------|------|----------|----------|
| `queued/` | 已起草、待独立审阅 | `spec-talk` 完成并写入 `spec.md` | `spec-review` 通过后迁入 `active/` |
| `active/` | 当前正在推进的 spec | 审阅通过，进入执行主链 | `close` 完成后迁入 `completed/` 或直接迁入 `archive/` |
| `completed/` | 已完成 close 的短暂停留区 | close 刚结束、尚未归档 | 归档整理后迁入 `archive/` |
| `cancelled/` | 已明确终止 | 用户或流程明确放弃 | 通常不再流转 |
| `archive/` | 历史长期归档 | 历史 spec 完成收口 | 长期保留，不再参与活跃流程 |

规则：

- 一个 spec 在任一时刻只应位于一个目录。
- `queued -> active -> completed -> archive` 是默认正向路径；允许在 `close` 后直接进入 `archive/`。
- 历史 spec 迁入 `archive/` 时不要求补齐旧模板或旧格式。
- `cancelled/` 与 `archive/` 都不是可恢复执行队列；若需重启，应新建 spec。

### 状态转换

```
idle ──→ spec-talk ──→ spec-review ──→ spec-work ──→ qa ──→ close ──→ done
              ↑ REJECT       │              ↑ REJECT  │
              └──────────────┘              └─────────┘
                                    重试耗尽 → halt
```

| 从 | 到 | 触发条件 | 产出 |
|----|-----|----------|------|
| idle | spec-talk | 路由判断为 L2 | — |
| spec-talk | spec-review | 讨论收敛，角色组 PASS | spec.md |
| spec-review | spec-work | 审阅 PASS | review.md (PASS) |
| spec-review | spec-talk | 审阅 REJECT，重试 < 上限 | review.md (REJECT) |
| spec-work | qa | 执行完成 | work.md |
| qa | close | 质检 PASS | qa-report.md (PASS) |
| qa | spec-work | 质检 REJECT，重试 < 上限 | qa-report.md (REJECT) |
| close | done | 提交完成 | — |
| spec-review | halt | REJECT，重试 ≥ 上限 | — |
| qa | halt | REJECT，重试 ≥ 上限 | — |

### 重试语义

- spec-review REJECT → 回到 spec-talk，将 review.md 作为输入
- qa REJECT → 回到 spec-work，将 qa-report.md 作为输入
- 每次 REJECT 重试计数 +1，上限由 config.yaml `max_retries` 决定（默认 2）
- 重试耗尽 → halt，等待用户决策

### 上下文隔离

阶段间通过制品文件通信，不共享对话历史：

- spec-review 角色只看到 spec.md，看不到讨论过程
- qa 角色只看到 spec 制品和实现结果，不参与执行决策
- 每个角色启动时读取自己的角色记忆，不读取其他角色的记忆

## 编排模式

由 config.yaml `mode` 字段决定：

| 模式 | spec-work 前 | close 前 | 重试耗尽 |
|------|-------------|----------|----------|
| manual | 用户手动推进 | 用户手动推进 | 用户决策 |
| semi-auto | 暂停等确认 | 暂停等确认 | 暂停（降级） |
| full-auto | 自动继续 | 自动继续 | 暂停（降级） |

三种模式共享同一状态机，区别仅在于阶段间是否自动流转。full-auto 重试耗尽时自动降级为 semi-auto。

## Ban Levels 详细定义

| 级别 | 含义 | 违反时行为 | 适用场景 |
|------|------|------------|----------|
| Hard Ban | 硬 gate | 立即停止，必须先满足条件才能继续 | 流程完整性、证据要求 |
| Confirmation Ban | 软 gate | 显式声明变更并获得用户确认后可继续 | scope 扩大、依赖变更 |
| Style Ban | 默认禁止 | 用户明确要求时可以做 | 代码风格、额外重构 |

## spec.md Schema

spec.md 使用 YAML frontmatter + Markdown body：

### Frontmatter 字段

| 字段 | 必需 | 说明 |
|------|------|------|
| Spec-Type | 是 | `control`（默认）或 `patch` |
| Initiative | 是 | spec 标识（格式：`YYYYMMDD-name`） |
| Status | 是 | `draft` / `reviewed` / `in-progress` / `done` / `cancelled` |
| Owner-Session | 否 | 负责的会话标识 |
| Write-Scope | 是 | 允许修改的文件/目录列表 |
| Delete-Scope | 否 | 允许删除的文件/目录列表 |
| Depends-On | 否 | 依赖的其他 spec |
| Absorbs | 否 | 被本 spec 吸收的其他 spec |
| Verification | 是 | 指向 Verification 段落 |

### Body 必需段落

- Background
- Goals
- Integration Gate
- Deliverables
- Acceptance Criteria
- Verification

### Body 可选段落

- Non-goals
- Documentation Updates
- Acceptance Evidence
- Risks
- Rollback Plan
- 关键设计决策
- 能力迁移矩阵（大规模重构时）
- 执行顺序（多步骤时）

### work.md 语义

- `work.md` 是 `spec-work` 阶段的执行日志，记录关键决策、偏差处理和验证进度。
- `work.md` 可以缺席于纯讨论阶段，但一旦进入 `spec-work`，应开始持续维护。
- `work.md` 不替代 `review.md`、`qa-report.md` 或 `evidence/`。

## checklist.md 模板定义

交付检查清单绑定 5 个核心流程，每个 spec 从模板复制一份：

```markdown
# 交付检查清单

Spec: <spec-id>

## spec-talk
- [ ] 路由判断完成（L0/L1/L2）
- [ ] 参与角色已选定
- [ ] 讨论收敛，spec.md 已写入
- [ ] Write-Scope 明确到文件级

## spec-review
- [ ] 独立审阅完成
- [ ] AC 可验证、Verification 可执行
- [ ] Write-Scope 无遗漏

## spec-work
- [ ] spec 已从 queued 迁入 active
- [ ] 按 Write-Scope 执行，无越界
- [ ] work.md 记录关键决策
- [ ] 代码变更与 spec 一致

## qa
- [ ] AC 逐项验证
- [ ] Verification 命令执行通过
- [ ] evidence/ 已存放证据

## close
- [ ] status.md 更新
- [ ] 文档同步完成
- [ ] 最小 Git 收口完成
- [ ] git commit（代码 + evidence）
- [ ] spec 已迁入 completed 或 archive
```

## config.yaml Schema

```yaml
mode: manual          # manual | semi-auto | full-auto
roles: []
governance_slots:
  - id: planner
    stage: spec-talk
    required: true
    purpose: 收敛需求、提出边界和形成 spec 草案
slot_bindings:
  - slot: planner
    role_id: agency-product-manager
    source: agency-agents
    binding_type: default
max_retries: 2        # spec-review / qa REJECT 重试上限
```

### 字段说明

- `mode`：编排模式，决定阶段间是否自动流转
- `roles`：项目当前已绑定并启用的角色列表，每个角色 3 字段
  - `id`：角色标识（英文，用于记忆文件名）
  - `name`：显示名（可本地化）
  - `focus`：职责焦点（1 句话）
- `governance_slots`：固定治理槽位
  - `id`：槽位标识（如 `planner`、`spec_reviewer`）
  - `stage`：该槽位主要服务的阶段
  - `required`：是否为必备槽位
  - `purpose`：槽位职责
- `slot_bindings`：当前项目的槽位绑定结果
  - `slot`：槽位标识
  - `role_id`：绑定到的角色 id
  - `source`：角色来源（如 `agency-agents` 或 `local`）
  - `binding_type`：`default` / `project-shaped` / `temporary`
- `max_retries`：REJECT 重试上限，耗尽进入 halt

## role-pool.yaml Schema

`role-pool.yaml` 是外部角色池来源的单一权威载体。它服务于 `init/rebuild`，不是运行时联网依赖。

```yaml
sources:
  - id: agency-agents
    repo: https://github.com/msitarzewski/agency-agents
    ref: 783f6a7
    license: MIT
    default: true
    runtime_network: false
roles:
  - id: agency-product-manager
    name: Product Manager
    focus: 发现、需求澄清、优先级与交付范围收敛
    source: agency-agents
    upstream_path: product/product-manager.md
slots:
  - id: planner
    stage: spec-talk
    required: true
    purpose: 收敛需求、提出边界和形成 spec 草案
mappings:
  - project_type: frontend-react
    slot: implementer
    candidates: [agency-frontend-developer, agency-software-architect]
```

### 字段说明

- `sources`：外部来源清单；必须记录 `repo`、`ref` 和 `runtime_network`
- `roles`：从来源中筛选出的可用候选角色快照
- `slots`：治理槽位定义；应与 `config.yaml.governance_slots` 保持同语义
- `mappings`：按项目类型为槽位提供默认候选；`candidates` 必须是具体角色 id 的有序列表，不允许只写 division 名称

## 角色记忆格式

文件路径：`.ys_team/memory/<role-id>.md`

```markdown
# <角色名> 经验记忆

## 当前核心原则

> rebuild 时从条目自动提炼，角色启动时优先读取此段。

1. ...
2. ...

## 经验条目

### <日期> <简述>

- 错误模式：...
- 正确做法：...
- 适用场景：...
```

### 记忆规则

- 每个角色只读写自己的记忆文件
- 写入判断：是否发现非显而易见的陷阱或模式？
- 条目超过 15 条时，rebuild 时合并相似条目并重新生成摘要头
- 不记录 PII、密钥、token

## 状态追踪（status.md）

`status.md` 是当前快照，不是历史总账。它只保留活跃 spec、阻塞项、待办和最近 10 条判断。月度轻量统计写入 `.ys_team/history/YYYY-MM.md`。

每个活跃 spec 在 status.md 中维护一行记录：

| 列 | 说明 |
|----|------|
| Spec | spec 标识 |
| 阶段 | 当前状态机状态 |
| 状态 | draft / in-progress / done / halt |
| 负责角色 | 当前阶段的负责角色 |
| 重试次数 | REJECT 重试计数 |
| 模式 | manual / semi-auto / full-auto |

阶段转换时必须同步更新。`最新判断` 固定只保留最近 10 条，超出窗口的内容不继续在 `status.md` 追记。

## 讨论协议

### 意图三段判断

讨论开始前：

1. **当前对象** — idea / spec / requirement / 已有制品
2. **当前目标** — 澄清 / 起草 / 审阅 / 执行准备
3. **当前阻塞** — 边界不清 / 缺少验证 / 依赖未完成 / 无阻塞

三段判断不清楚时，先向用户确认。

### 收敛规则

- 每轮讨论必须收敛到明确结论、现状和下一步
- 重复出现前轮论点、扩大范围而非收窄 → 停轮，输出当前状态
- 讨论产出 spec 时，spec.md 中记录协作摘要（参与角色、轮次、关键分歧）

### 结果卡

重要讨论输出结果卡：

| 字段 | 必需 | 说明 |
|------|------|------|
| Decision | 是 | PASS / BLOCKED / REJECT |
| Current State | 是 | 当前状态描述 |
| Why | 是 | 决策原因 |
| Next Step | 是 | 下一步行动 |

## 审阅检查项（spec-review）

- 目标和 Non-goals 清晰无歧义
- Write-Scope 明确到文件或目录
- Verification 命令可直接执行
- AC 涵盖主要验收路径
- 回滚方案可执行（如适用）
- 文档同步项已列入 Write-Scope

## QA 验收项

- AC 逐项验证结果
- Verification 命令执行输出
- evidence/ 文件存在性和完整性
- 未通过项的具体失败原因和修复建议

## 初始化与重估

### 初始化

扫描项目实际文件，生成最小 `.ys_team/` 结构：

- config.yaml（角色、模式、治理槽位、槽位绑定）
- role-pool.yaml（外部角色池来源与默认映射）
- rules.md（行为规则）
- reality.md（现实索引）
- status.md（状态追踪快照）
- VERSION
- templates/（checklist + spec + monthly-summary 模板）
- history/（月度摘要目录）
- memory/（空目录，init 时根据 roles 生成空记忆文件）

### 项目类型检测

| 检测信号 | 项目类型 |
|----------|----------|
| requirements.txt / pyproject.toml | python-backend |
| pom.xml / build.gradle | java-backend |
| package.json + React | frontend-react |
| 前后端都有 | fullstack |
| 以上都不匹配 | general |

检测出项目类型后，`init/rebuild` 应使用 `role-pool.yaml.mappings` 为每个必备槽位挑选候选角色，并将结果写入 `.ys_team/config.yaml.slot_bindings`。

### 现实索引生成

- 关系优先：先建立模块间的依赖关系图
- 摘要辅助：每个模块 2-3 句业务职责摘要
- 规模自适应：小项目用核心模块索引，大项目分层

### 重估触发条件

- 项目技术栈发生变化
- 新增或移除主要模块
- 现有角色不再匹配交付现实
- 基线版本有重大更新

### 重估规则

- 改最小面：只更新确实需要变化的部分
- 保留本地化：不覆盖项目已定制的内容
- 版本对齐：检查项目版本与基线版本差异
- 记忆健康：角色记忆与当前角色对齐，超限条目压缩
- 槽位重算：项目类型或现实索引变化时，允许刷新 `slot_bindings`，但应保留用户手动定制的绑定

### 旧结构迁移

rebuild 时检测到旧结构文件（`policy.md`、`team.md`、`delivery-flow.md`）时，输出迁移提示而非静默覆盖。

## 版本管理

| 版本 | 文件 | 追踪什么 |
|------|------|----------|
| 基线版本 | `.ys_team/VERSION` | 项目本地基线 |
| 方法论版本 | `docs/methodology/VERSION` | 方法论规范 |

rebuild 时对比项目版本与基线版本，决定是否需要更新。

## 文档同步规则

实现变化时，相关文档必须同步更新：

- 模块边界变化 → 更新现实索引
- 对外行为变化 → 更新用户文档
- 方法论定义变化 → 更新方法论文档和 skill
- 模板变化 → 更新模板文件

同步更新应在同一次交付中完成。

## 并行策略

### Spec 级并行

多个不相关的 spec 可同时执行。Write-Scope 涉及同一模块时降级为串行。

### 默认关闭

并行能力默认关闭，项目确认模块边界清晰后可开启。
