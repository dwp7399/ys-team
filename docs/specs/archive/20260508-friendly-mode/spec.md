---
Spec-Type: control
Initiative: 20260508-friendly-mode
Status: in-progress
Owner-Session: 2026-05-08-spec-work
Write-Scope:
  - package.json
  - .ys_team/VERSION
  - .ys_team/config.yaml
  - examples/baseline/.ys_team/VERSION
  - examples/baseline/.ys_team/config.yaml
  - skills/ys-team/baseline/.ys_team/VERSION
  - skills/ys-team/baseline/.ys_team/config.yaml
  - docs/methodology/VERSION
  - skills/ys-team/SKILL.md
  - skills/ys-team-spec-talk/SKILL.md
  - skills/ys-team-spec-work/SKILL.md
  - skills/ys-team-init/SKILL.md
  - docs/methodology/overview.md
  - docs/methodology/reference.md
  - docs/guide/getting-started.md
  - README.md
  - .ys_team/glossary.md
  - .ys_team/status.md
  - docs/specs/queued/20260508-friendly-mode/
  - docs/specs/active/20260508-friendly-mode/
  - docs/specs/archive/
Delete-Scope: []
Depends-On: []
Verification: "见 ## Verification"
---

# 友好模式

## Collaboration Summary

- 参与角色：产品演进负责人、方法论架构师、交付守门人
- 轮次：3
- 关键分歧：第一版误把友好模式收敛成固定的“结论 / 风险 / 下一步”三段卡片。第二轮修正为“原始输出后的友好总结”。第三轮用户明确希望通过配置选择“技术模式 / 友好模式”，因此最终收敛为 `output_mode: technical | friendly`，关键词只作为临时覆盖，不作为主机制。
- 现实依据：`docs/project/module-index.md`、`skills/ys-team/SKILL.md`、`skills/ys-team-spec-talk/SKILL.md`、`docs/methodology/overview.md`、`.ys_team/rules.md`

## Background

当前 ys-team 的治理输出可信，但在开发过程中会暴露较多技术名词、阶段名、内部约束和验证细节。对没有编程经验或不熟悉 ys-team 术语的用户来说，这些信息需要再翻译一次才容易理解。

本 spec 引入“友好模式”：在不降低治理强度、不隐藏可追溯信息的前提下，在原始输出之外追加一段更像人解释给人听的总结。

## Goals

- 定义输出模式配置：`technical` 保持原技术输出，`friendly` 在原输出后追加人话版总结。
- 定义友好模式的行为边界：它是对原始输出的二次解释层，不是新的工作流、角色或验收捷径。
- 在主要用户可见输出中增加自然语言总结，让没有编程经验的人也能理解“发生了什么、影响是什么、是否需要我管”。
- 不强制总结结构；允许按上下文选择一句话、短段落或少量要点。
- 保留原始技术信息的可追溯性，避免为了简化而丢失风险、证据或关键限制。
- 将“友好模式”登记为项目术语，降低后续 spec 和文档中的含义漂移。

## Integration Gate

- 用户不需要选择内部工作流；本 spec 负责承载必要的讨论、执行、验证和收口约束。
- spec-review PASS 后先切到 release/work 分支，再进入 spec-work。
- close 前必须完成项目发布 gate；具体发布方式按项目本地规则执行。
- 如涉及高风险行为变化，优先小步推进：一个行为、一个测试或等价验证、一个实现闭环。
- 不得以"简单"、"之后补验证"、"文档不用同步"作为降级或跳过 evidence 的理由。

## Non-goals

- 不新增独立 skill。
- 不改变 L0/L1/L2 路由、spec 状态机、QA 或 close 规则。
- 不把所有技术细节删除；技术细节仍需在需要时可见。
- 不引入复杂配置系统；本轮只增加一个 `output_mode` 枚举字段。

## Deliverables

- `.ys_team/config.yaml` 与 baseline 双副本：增加 `output_mode: technical | friendly` 配置，默认 `technical`。
- `skills/ys-team/SKILL.md`：补充 output_mode 加载、技术模式 / 友好模式语义、状态查询的友好总结规则。
- `skills/ys-team-spec-talk/SKILL.md`：在 Host Summary 中支持追加面向非程序背景用户的友好总结。
- `skills/ys-team-spec-work/SKILL.md`：在执行状态输出中支持追加友好总结，解释当前进展、影响和是否需要用户介入。
- `skills/ys-team-init/SKILL.md`：说明初始化或 rebuild 可保留项目本地友好模式约定，但不强行写入重配置。
- `docs/methodology/overview.md` / `reference.md`：把友好模式定义为呈现层，并明确不可降低治理要求。
- `docs/guide/getting-started.md` / `README.md`：面向用户说明如何打开、看到什么、技术细节在哪里。
- `.ys_team/glossary.md`：登记“友好模式”术语。
- 发布线版本文件：本仓 release-first close 如需发版，由 spec-work/close 决定下一个 patch 版本并同步 bump `package.json` 与 3 个 baseline VERSION；方法论语义有新增时同步 bump `docs/methodology/VERSION`。

## Documentation Updates

- README 面向用户给出一句话价值：打开后会在原输出后多一段“人话版”总结。
- Getting Started 加入日常使用示例，避免写成新流程手册或固定模板。
- 方法论文档只记录原则和边界，不堆叠实现细节。

## Friendly Mode Contract

输出模式由 `.ys_team/config.yaml` 的 `output_mode` 控制：

- `technical`：默认模式。只输出原始技术内容和 ys-team 必需的可见标志。
- `friendly`：在保留原始技术信息的基础上，追加一段友好总结。它的目标不是替换技术输出，而是把技术输出再解释一遍。

用户本轮口头要求“用人话总结”时，可以临时按 `friendly` 输出；但稳定行为应以配置为准。

友好总结不强制结构和字段。根据上下文，它可以是一句话、一个短段落，或少量要点。总结时优先做到：

- 少用内部阶段名、英文缩写和专业术语；必须出现时，用括号解释。
- 把“执行了什么技术动作”翻译成“这对项目意味着什么”。
- 说明用户是否需要做决定、等待结果，还是无需处理。
- 有阻塞、验证失败、范围扩大时，用直白语言说清严重性，不能淡化。

技术细节仍需保留：

- 路由判断仍必须保留 L0/L1/L2 和可见标志。
- spec / qa / close 仍必须保留 evidence、verification、scope 等可审计信息。
- 原始输出已经足够短且没有专业术语时，友好总结可以省略或只补一句。

## Acceptance Criteria

- AC-01: `skills/ys-team/SKILL.md` 明确定义友好模式的触发方式、输出结构和不可降低治理强度的边界。
- AC-02: `ys-team` 状态查询读取 `output_mode`；`friendly` 下追加非程序背景用户也能理解的状态总结，同时保留活跃 spec 和最新判断。
- AC-03: `ys-team-spec-talk` 的 Host Summary 支持友好总结，但仍保留参与角色、决策、产出、下一步。
- AC-04: `ys-team-spec-work` 的可见输出支持友好总结，但不得省略状态、阻塞、验证或 evidence 要求。
- AC-05: README 和 Getting Started 用非专业语言说明友好模式，不引入新命令负担。
- AC-06: 方法论文档明确友好模式是输出呈现层，不是新工作流，不改变 L0/L1/L2 和 evidence gate。
- AC-07: `.ys_team/glossary.md` 登记“友好模式”，避免后续和“简化模式”“低强度模式”“固定摘要模板”混淆。
- AC-08: 静态检查能确认关键文件中出现 `output_mode`、`technical`、`friendly` 与友好模式契约关键词。
- AC-09: release-first 版本文件在 close 前保持一致；若本 spec 独立发版，`package.json`、`.ys_team/VERSION`、`examples/baseline/.ys_team/VERSION`、`skills/ys-team/baseline/.ys_team/VERSION` 必须同步到同一版本。

## Verification

```bash
rg -n "output_mode|technical|friendly|友好模式|友好总结|二次解释|非程序|不强制结构" skills/ys-team/SKILL.md skills/ys-team-spec-talk/SKILL.md skills/ys-team-spec-work/SKILL.md docs/methodology/overview.md docs/methodology/reference.md docs/guide/getting-started.md README.md .ys_team/glossary.md .ys_team/config.yaml examples/baseline/.ys_team/config.yaml skills/ys-team/baseline/.ys_team/config.yaml
rg -n "不改变 L0/L1/L2|不降低治理|evidence|可见标志" skills docs/methodology README.md docs/guide/getting-started.md
rg -n "^output_mode: (technical|friendly)$" .ys_team/config.yaml examples/baseline/.ys_team/config.yaml skills/ys-team/baseline/.ys_team/config.yaml
node -e 'const fs=require("fs"); const p=require("./package.json").version; for (const f of [".ys_team/VERSION","examples/baseline/.ys_team/VERSION","skills/ys-team/baseline/.ys_team/VERSION"]) { const v=fs.readFileSync(f,"utf8").trim(); if (v!==p) throw new Error(f+"="+v+" package="+p); }'
```

### Feedback Loop

- 命令或步骤：`rg -n "output_mode|technical|friendly|友好模式|友好总结|二次解释|非程序|不强制结构" skills/ys-team/SKILL.md docs/methodology/overview.md README.md .ys_team/config.yaml`
- 期望信号：三类入口文件与配置文件均命中，且输出中同时包含 `output_mode`、`technical`、`friendly` 和“友好总结 / 二次解释 / 不强制结构”口径。
- 复现成本：< 10 秒。

## Acceptance Evidence

- `evidence/friendly-mode-keyword-check.log`：关键词检查输出。
- `evidence/friendly-mode-contract-review.md`：人工核对友好模式是否保留治理 gate。
- `work.md`：记录执行中的 scope 偏差和验证结果。

## Risks

- 风险：友好模式被误解为“少走流程”。缓解：所有文档明确它只改变呈现，不改变 gate。
- 风险：输出变短后丢失关键信息。缓解：友好总结是追加解释，不替代关键技术信息。
- 风险：新术语增加心智负担。缓解：只保留“友好模式”一个术语，不引入“简化模式 / 决策模式 / 固定摘要模板”等别名。

## Rollback Plan

删除本 spec 引入的友好模式段落和 glossary 条目，恢复原有输出规则；不涉及代码数据迁移。
