# Delivery Flow

本文件用于固定当前项目的核心交付主链，只在自己的作用范围内保证一致性，不追求覆盖全部工作细节。

未在本文件定义的项目细节，可由其他本地规则补充，但不得与本文件冲突。

## Positioning

- Scope：默认适用于 `L2 spec`；`L0 trivial` 和 `L1 patch` 不进入完整 5 步主链
- Goal：固定核心交付逻辑，减少阶段交接时的猜测
- Relation：`TEAM.md` 管编排模式与角色配置，`.ys_team/policy.md` 管治理规则与门禁，`.ys_team/status.md` 管运行态追踪，`docs/specs/` 制品承载具体执行合约

## Core Flow

### spec-talk

- Goal：收敛需求、边界与执行前提
- Enter When：路由判断为 `L2 spec`，或现有 spec 需要重定义
- Must Align：`spec`、`docs`、`status`
- Done When：需求与控制制品已达到可审阅状态，阻塞与下一步明确
- Next / Back：`PASS -> spec-review`；`BLOCKED -> 等待输入`；`REJECT -> 重新定义`

### spec-review

- Goal：独立检查 spec 是否可执行
- Enter When：`spec-talk` 已产出可审阅 spec
- Must Align：`spec`、`docs`、`status`
- Done When：审阅结论已明确可执行性或给出具体修改项
- Next / Back：`PASS -> spec-work`；`REJECT -> spec-talk`；重试耗尽 `-> halt`

### spec-work

- Goal：按 spec 落地实现，并同步必要文档和证据
- Enter When：`spec-review` 通过，或项目明确定义允许直接进入执行
- Must Align：`spec`、`code`、`docs`、`evidence`、`status`
- Done When：write-scope 内的变更已完成，执行记录与工作记忆已更新，QA 输入齐备
- Next / Back：完成 `-> qa`；阻塞 `-> blocked`

### qa

- Goal：独立验证交付结果是否符合 spec
- Enter When：`spec-work` 声明完成，且可提供可复核 evidence
- Must Align：`spec`、`code`、`docs`、`evidence`、`status`、`release`
- Done When：acceptance 与 verification 结论明确
- Next / Back：`PASS -> close`；`REJECT -> spec-work`；重试耗尽 `-> halt`

### close

- Goal：完成交付收口与状态归档
- Enter When：`qa` 通过，且项目定义的额外 gate 已满足
- Must Align：`spec`、`docs`、`evidence`、`status`、`release`
- Done When：spec phase、状态追踪和收口动作已更新完毕
- Next / Back：完成 `-> done`；若需补充，回到项目定义的前一环节

## Project Decisions

项目必须显式填写以下绑定点；未填写则视为 delivery-flow 尚未完成本地化：

- `Execution Start`：项目从哪个阶段开始允许改实现
- `Spec State Moves`：`queued / active / completed / cancelled` 在什么时机迁移
- `Evidence Timing`：evidence 最晚在哪一步必须补齐
- `Status Timing`：哪些关键节点必须更新 `.ys_team/status.md`
- `Delivery Done`：哪一刻算正式交付完成
- `Release Relation`：如果项目存在发布动作，发布与 `close` 的先后关系

## Exception Rules

- `Routing`：决定是否进入当前交付主链；默认只有 `L2 spec` 进入
- `Blocked`：阶段内无法继续时，必须记录阻塞项、责任方和解除条件
- `Reject / Halt`：`spec-review` 或 `qa` 不通过时回退到上一核心阶段；重试耗尽后进入 `halt`，等待人工决策
