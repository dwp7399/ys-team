---
Spec-Type: control
Initiative: 20260521-questions-md-grill
Status: in-progress
Owner-Session: ys-team-spec-talk
Write-Scope:
  - skills/ys-team-spec-talk/SKILL.md
  - skills/ys-team/SKILL.md
  - .ys_team/templates/questions.md
  - examples/baseline/.ys_team/templates/questions.md
  - skills/ys-team/baseline/.ys_team/templates/questions.md
  - docs/methodology/overview.md
  - docs/methodology/reference.md
  - docs/project/module-index.md
  - .ys_team/status.md
  - package.json
  - .ys_team/VERSION
  - examples/baseline/.ys_team/VERSION
  - docs/specs/active/20260521-questions-md-grill/**
Delete-Scope: []
Depends-On: []
Verification: "见 ## Verification"
---

# Questions.md 文件化 Grill

## Background

当前 `ys-team-spec-talk` 已有 Grill 子模式，但它主要是对话式一问一答：主持人识别 3-5 个核心问题，每次问 1 个问题，最多 5-7 轮后收口。这个设计适合模糊但规模较小的 idea；当待确认问题超过 5 个、问题横跨目标/范围/行为/验收/风险等多个维度时，聊天式追问会制造两个问题：

- 主持人为避免拖长对话，会倾向少问，导致用户体感为“没有 grill 环节”。
- 选项数量受聊天节奏限制，经常无法覆盖真实决策空间。

本 spec 引入 `questions.md` 作为 spec-talk Define 阶段的结构化问卷制品。它用于批量澄清需求，不替代 `spec.md`，也不替代 QA 阶段的 `qa-report.md`。

现实依据：
- `docs/project/module-index.md`：`skills/`、`.ys_team/`、`docs/methodology/`、`examples/baseline/` 是相关影响范围。
- `skills/ys-team-spec-talk/SKILL.md`：已有 Grill 子模式，但触发和产物只覆盖对话式追问。
- `docs/methodology/overview.md` / `reference.md`：当前 spec 目录结构没有 `questions.md`，需要同步制品模型。
- `.ys_team/templates/`、`examples/baseline/.ys_team/templates/`、`skills/ys-team/baseline/.ys_team/templates/`：当前模板集中没有 `questions.md`。

## Goals

1. 在 spec-talk 中增加“文件化 Grill”分支：当待确认问题超过 5 个或问题维度过多时，生成 `questions.md`。
2. 定义 `questions.md` 为问卷调查式格式：`Section + Q + Type + Required + Options/Items + Answer`。
3. 支持开放题、单选题、多选题、检查清单题，并允许用户填写 `Unknown` / `Out of scope`。
4. 明确 `questions.md` 的退出条件：达到 Ready For Spec 后，必须收敛为 `spec.md`。
5. 同步本仓自用模板、baseline 模板、bundled baseline 模板和方法论文档。

## Integration Gate

- 用户不需要选择内部工作流；`questions.md` 是 spec-talk 内部 Define 制品。
- 不新增新的可见阶段标志；仍使用 `**[主持人]** ys-team · spec-talk`。
- `questions.md` 不得替代 `spec.md`、`work.md`、`review.md`、`qa-report.md` 或 evidence。
- 问卷必须服务可执行 spec，不写普通调研式问题。
- 如果用户只需要少量澄清，继续使用现有对话式 Grill，不强制生成文件。
- spec-review PASS 后先切到 release/work 分支，再进入 spec-work。
- close 前必须完成项目发布 gate；具体发布方式按本仓 release-first 规则执行。

## Non-goals

- 不引入新的 `qa` 文件命名，避免和 QA 验收语义混淆。
- 不把 `questions.md` 设计成最终需求文档。
- 不改变 L0/L1/L2 路由规则。
- 不改变 spec-review、spec-work、qa、close 的阶段职责。
- 不引入外部表单系统或交互式 CLI。

## Deliverables

1. `skills/ys-team-spec-talk/SKILL.md`
   - 新增“文件化 Grill / Questions 子模式”。
   - 触发条件包括：待确认问题超过 5 个、问题横跨 3 个以上维度、用户需要批量回答、继续聊天追问会拖慢收敛。
   - 明确生成路径：`docs/specs/queued/<initiative-id>/questions.md`。
   - 明确收口：用户填写后，主持人基于答案进入多角色讨论，并生成或修订 `spec.md`。

2. `skills/ys-team/SKILL.md`
   - 轻量讨论入口说明：复杂澄清可升级为 spec-talk 的 `questions.md` 文件化澄清。

3. `questions.md` 模板三份同步
   - `.ys_team/templates/questions.md`
   - `examples/baseline/.ys_team/templates/questions.md`
   - `skills/ys-team/baseline/.ys_team/templates/questions.md`

4. 方法论文档
   - `docs/methodology/overview.md`：spec 目录结构加入 `questions.md` 的可选定位。
   - `docs/methodology/reference.md`：讨论协议加入文件化 Grill 规则、题型和 Ready For Spec 退出条件。

5. 项目现实索引
   - `docs/project/module-index.md` 同步说明 baseline/templates 现在包含 `questions.md`。

## Documentation Updates

- README 不强制修改；除非实现时发现用户接入口径需要说明。
- 如 `questions.md` 模板引入新术语，检查 `.ys_team/glossary.md` 是否需要登记。

## Acceptance Criteria

- AC-01: `ys-team-spec-talk` 明确区分对话式 Grill 和文件化 Grill。
- AC-02: 文件化 Grill 的触发条件包含“超过 5 个待确认问题”。
- AC-03: `questions.md` 模板采用问卷格式，包含 `Section`、`Q`、`Type`、`Required`、`Answer`。
- AC-04: 模板至少覆盖开放题、单选题、多选题、检查清单题。
- AC-05: 模板明确允许 `Unknown` 和 `Out of scope`。
- AC-06: 文档明确 `questions.md` 是 spec-talk Define 阶段的中间制品，不替代 `spec.md` 或 `qa-report.md`。
- AC-07: 三份模板副本保持一致。
- AC-08: 方法论文档和项目现实索引反映新制品。
- AC-09: 关键词静态检查能找到 `questions.md`、`文件化 Grill`、`超过 5 个`、`Ready For Spec`。

## Verification

```bash
rg -n "questions.md|文件化 Grill|超过 5 个|Ready For Spec|Unknown|Out of scope" skills/ys-team-spec-talk/SKILL.md skills/ys-team/SKILL.md docs/methodology/overview.md docs/methodology/reference.md docs/project/module-index.md .ys_team/templates/questions.md examples/baseline/.ys_team/templates/questions.md skills/ys-team/baseline/.ys_team/templates/questions.md
diff -u .ys_team/templates/questions.md examples/baseline/.ys_team/templates/questions.md
diff -u examples/baseline/.ys_team/templates/questions.md skills/ys-team/baseline/.ys_team/templates/questions.md
```

### Feedback Loop

本 spec 改对了的最快 pass/fail 信号是静态搜索和模板 diff。

- 命令或步骤：执行 `## Verification` 中三条命令。
- 期望信号：关键词全部命中，三份 `questions.md` 模板无 diff。
- 复现成本：< 30 秒。

## Acceptance Evidence

- `evidence/questions-md-verification.md`：记录 Verification 命令输出摘要。
- 如实现时存在偏差，记录在 `work.md`。

## Risks

- `questions.md` 可能诱导 agent 过度流程化。缓解：只在待确认问题超过 5 个或维度过多时触发。
- 问卷问题可能变成泛泛调研。缓解：模板要求每题服务 spec，且 Ready For Spec 必须能推动 `spec.md`。
- 与 `qa-report.md` 混淆。缓解：文件命名采用 `questions.md`，文档明确它属于 spec-talk Define 阶段。

## Rollback Plan

删除 `questions.md` 三份模板，并从 `ys-team` / `ys-team-spec-talk` / 方法论文档 / module-index 中移除文件化 Grill 说明。现有对话式 Grill 保持不变。

## Collaboration Summary

- 参与角色：产品演进负责人、方法论架构师、交付守门人。
- 轮次：2 轮。
- 关键分歧：用户确认不使用 `qa` 文件命名，改为 `questions.md`；用户认为问卷调查格式比 requirement 文档更合适。
- 收敛结论：`questions.md` 是 spec-talk Define 阶段的结构化问卷制品，当待确认问题超过 5 个或问题维度过多时生成，用户填写后再收敛为 `spec.md`。
