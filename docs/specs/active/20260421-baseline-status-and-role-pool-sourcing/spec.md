---
Spec-Type: control
Initiative: 20260421-baseline-status-and-role-pool-sourcing
Status: in-progress
Owner-Session: ys-team-spec-work
Write-Scope:
  - docs/methodology/overview.md
  - docs/methodology/reference.md
  - README.md
  - docs/guide/getting-started.md
  - skills/ys-team/SKILL.md
  - skills/ys-team-init/SKILL.md
  - .ys_team/config.yaml
  - examples/baseline/AGENTS.md
  - examples/baseline/.ys_team/config.yaml
  - examples/baseline/.ys_team/status.md
  - examples/baseline/.ys_team/role-pool.yaml
  - examples/baseline/.ys_team/history/README.md
  - examples/baseline/.ys_team/templates/monthly-summary.md
  - docs/project/module-index.md
  - .ys_team/status.md
  - docs/specs/active/20260421-baseline-status-and-role-pool-sourcing/**
Delete-Scope: []
Depends-On: []
Absorbs: []
Verification: "见 ## Verification"
---

# baseline 状态快照收敛与外部角色池接入

## Background

当前 ys-team 已将 `status.md` 定义为状态追踪入口，但本仓自用 `.ys_team/status.md` 仍在累积判断记录；随着 spec 数增长，启动成本和人工阅读成本都会继续上升。现有方法论也还没有把“当前快照”和“历史摘要”彻底分层。

与此同时，baseline 默认角色仍偏薄，目前更像一组治理占位，而不是按项目现实落下来的专业角色集合。讨论收敛后的方向是：

- ys-team 固定治理槽位与阶段合同，而不是固定角色名
- baseline 不自维护一个庞大角色池
- baseline 允许声明外部角色池来源，并在 `init/rebuild` 时依据项目类型和现实索引，为槽位绑定候选角色
- 默认外部来源采用 `agency-agents`，但运行时不应硬依赖远程 GitHub 状态

这两件事都属于 baseline 与方法论边界调整，需要通过同一个 control spec 收敛，避免后续同时改 baseline、README、方法论文档和 init 口径时出现定义漂移。

## Goals

1. 将 `status.md` 明确收敛为“有界快照”，不再承担无限增长的判断总账。
2. 为 baseline 增加按月轻量摘要机制，保留最小历史统计与主要阻塞。
3. 将方法论中的“固定角色”表述改为“固定治理槽位 + 动态角色绑定”。
4. 将 `agency-agents` 定义为 baseline 默认外部角色池来源，并约束为“钉住版本/快照引用”，而非运行时远程依赖。
5. 为 `ys-team-init` / `--rebuild` 补齐角色池来源、候选筛选和本地落地的最小契约。
6. 同步 README、入门文档、skill 文案和现实索引，使对外口径一致。

## Non-goals

- 不在本轮将 `agency-agents` 整个仓库 vendoring 到 ys-team 仓库内。
- 不在本轮实现联网抓取或自动同步远程角色池。
- 不在本轮为每一种技术栈穷举完整角色映射表；只定义最小可扩展机制和首批默认映射。
- 不把 ys-team 扩展成通用 agent marketplace；角色池来源仍服务于 baseline 初始化和重建。
- 不把月度摘要做成重型项目管理报表。

## Deliverables

- 方法论文档补齐 `status.md` 快照边界、月度摘要语义、治理槽位与动态角色绑定定义
- baseline 默认文件补齐新的状态模板、`role-pool.yaml` 和月度摘要模板载体
- `ys-team-init` 文案补齐外部角色池来源、项目类型筛选、落地配置和 rebuild 行为
- `ys-team` 主入口文案与 README/开始使用文档同步更新
- 本仓 `.ys_team/config.yaml` 采用新槽位/绑定结构并保持 `full-auto` 模式
- 本仓现实索引更新，明确 baseline 新增“状态快照 + 外部角色池来源”能力
- 本次 initiative 的 `queued` spec 与 checklist

## Integration Gate

1. `status.md` 必须继续保持“启动即读”的轻量入口定位，月度摘要不得反客为主。
2. 外部角色池来源必须是可复现的固定来源描述；`init/rebuild` 不依赖实时联网。
3. 方法论中固定的是治理槽位和阶段独立性，而不是固定角色人格或固定角色名。
4. baseline 对外默认口径必须让初次使用者理解“ys-team 不维护 147 个角色，但可以从推荐来源中按项目落角色”。
5. 角色池来源的权威载体固定为 `role-pool.yaml`，项目运行时的槽位和绑定权威载体固定为 `.ys_team/config.yaml`；本轮不再把这两个决策留到实现期。
6. 首批默认映射必须精确到具体 agent 标识，不允许只写 division 级建议。
7. 若发现需要引入超出 baseline 的复杂选择器或同步机制，应停在契约层，不在本轮继续膨胀实现。

## Deliverable Sketch

### A. 状态快照收敛

- `status.md` 仅保留：
  - `updated`
  - 活跃 Spec
  - 最新判断（固定窗口，最近 10 条）
  - 阻塞项
  - 待办
- baseline 新增 `examples/baseline/.ys_team/templates/monthly-summary.md` 作为月度摘要模板
- baseline 新增 `examples/baseline/.ys_team/history/README.md` 说明摘要目录语义和统计字段
- 月度摘要仅记录：
  - 当月新增 spec 数
  - close / cancel 数
  - spec-review reject 数
  - qa reject 数
  - rebuild 次数
  - 主要阻塞与说明

### B. 外部角色池来源

- baseline 新增 `examples/baseline/.ys_team/role-pool.yaml` 作为外部角色池来源的单一权威载体
- `role-pool.yaml` 固定包含 4 个顶级段：
  - `sources`
  - `roles`
  - `slots`
  - `mappings`
- 默认来源固定为 `agency-agents`
- `sources` 最小字段：
  - `id`
  - `repo`
  - `ref`
  - `license`
  - `default`
  - `runtime_network`
- `roles` 最小字段：
  - `id`
  - `name`
  - `focus`
  - `source`
  - `upstream_path`
- `slots` 最小字段：
  - `id`
  - `stage`
  - `required`
  - `purpose`
- `mappings` 最小字段：
  - `project_type`
  - `slot`
  - `candidates`
- `mappings.candidates` 必须是具体 agent `id` 的有序列表，不允许只写 division 名称

### C. 槽位绑定

- baseline 和项目运行时统一把槽位/绑定写入 `.ys_team/config.yaml`
- `.ys_team/config.yaml` 新增 2 个段：
  - `governance_slots`
  - `slot_bindings`
- `governance_slots` 首批固定包含：
  - `planner`
  - `implementer`
  - `spec_reviewer`
  - `qa_reviewer`
  - `close_owner`
- `slot_bindings` 最小字段：
  - `slot`
  - `role_id`
  - `source`
  - `binding_type`
- `binding_type` 仅允许：
  - `default`
  - `project-shaped`
  - `temporary`
- `init/rebuild` 根据项目类型、现实索引和 `role-pool.yaml` 的具体 `mappings`，为项目写入本地绑定结果
- `.ys_team/config.yaml` 中现有 `roles` 列表继续保留，但语义变为“当前项目已绑定并启用的角色集合”

## Acceptance Criteria

- AC-01：方法论文档明确说明 `status.md` 是有界快照，而不是历史总账。
- AC-02：baseline 提供 `examples/baseline/.ys_team/templates/monthly-summary.md` 和 `examples/baseline/.ys_team/history/README.md` 两个固定载体，且字段只覆盖轻量治理统计。
- AC-03：本仓和 baseline 的 `status.md` 模板都明确“最新判断只保留最近 10 条”，避免持续无限增长。
- AC-04：方法论文档和 `ys-team-init` 文案明确区分“治理槽位”和“角色绑定”，不再把 `arch / pm / gate` 一类名称表述为必须固定人格。
- AC-05：baseline 新增 `examples/baseline/.ys_team/role-pool.yaml`，并包含 `sources / roles / slots / mappings` 四段及其最小字段；`sources` 中默认来源为 `agency-agents`，且 `runtime_network: false`。
- AC-06：`.ys_team/config.yaml` 和 baseline `config.yaml` 都采用 `governance_slots + slot_bindings + roles` 的结构，其中首批必备槽位为 `planner / implementer / spec_reviewer / qa_reviewer / close_owner`。
- AC-07：`ys-team-init` / rebuild 文案明确说明会依据项目类型和现实索引，从 `role-pool.yaml` 的具体 agent 候选中选择角色并落到本地 `slot_bindings`，且不需要运行时联网。
- AC-08：README 与入门文档对外说明“ys-team 不自维护庞大角色池，但支持从推荐来源按项目落角色”，且口径与方法论文档一致。
- AC-09：README、`docs/guide/getting-started.md`、`skills/ys-team/SKILL.md`、`skills/ys-team-init/SKILL.md` 对“默认外部角色池来源”和“槽位绑定”使用同一套术语。
- AC-10：`docs/project/module-index.md` 更新后，能反映 baseline 对状态快照和角色池来源的新增职责。
- AC-11：本仓 `.ys_team/config.yaml` 已切到新结构并保持 `mode: full-auto`。
- AC-12：`.ys_team/status.md` 已为本次 spec-talk / spec-review 留痕，并保留最近判断窗口，不因本轮讨论破坏现有结构。

## Collaboration Summary

- Participants:
  - 方法论架构师
  - 产品演进负责人
  - 交付守门人
- Discussion Rounds:
  - 3
- Key Disagreements:
  - 是否需要固定治理角色：结论收敛为“固定治理槽位，不固定角色名”
  - 是否直接维护角色池：结论收敛为“baseline 只维护外部来源与映射协议，不维护大角色池正文”
  - `status.md` 历史处理方式：结论收敛为“有界快照 + 月度轻量摘要”
- Reporter:
  - 方法论架构师

## Verification

```bash
sed -n '1,260p' docs/specs/active/20260421-baseline-status-and-role-pool-sourcing/spec.md
sed -n '1,220p' docs/specs/active/20260421-baseline-status-and-role-pool-sourcing/checklist.md
sed -n '1,220p' .ys_team/config.yaml
sed -n '1,220p' .ys_team/status.md
test -f examples/baseline/.ys_team/role-pool.yaml
test -f examples/baseline/.ys_team/history/README.md
test -f examples/baseline/.ys_team/templates/monthly-summary.md
rg -n "^sources:|^roles:|^slots:|^mappings:|runtime_network: false|repo: .*agency-agents|ref:" examples/baseline/.ys_team/role-pool.yaml
rg -n "governance_slots|slot_bindings|planner|implementer|spec_reviewer|qa_reviewer|close_owner|mode: full-auto" .ys_team/config.yaml examples/baseline/.ys_team/config.yaml
rg -n "最近 10 条|固定窗口|monthly-summary|role-pool.yaml|治理槽位|slot_bindings|runtime_network" docs/methodology README.md docs/guide skills examples/baseline/AGENTS.md examples/baseline/.ys_team
```

## Risks

- 如果把角色池来源设计成运行时远程依赖，会让 init/rebuild 失去可复现性和离线可用性。
- 如果把槽位和绑定写得过抽象，用户会读不懂 baseline 到底生成了什么。
- 如果月度摘要承载过多字段，会把轻量治理重新推向项目管理工具。

## Rollback Plan

- 若角色池来源方案在实现阶段被证明过重，回滚到“仅保留治理槽位与本地角色绑定”的最小机制，暂不公开默认上游来源。
- 若月度摘要机制被证明增加维护负担，回滚为“status 固定窗口 + spec archive 承载历史”的更小方案。
