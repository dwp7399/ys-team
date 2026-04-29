---
Spec-Type: control
Initiative: 20260429-external-skill-pattern-assimilation
Status: active
Owner-Session: —
Write-Scope:
  - README.md
  - docs/guide/getting-started.md
  - docs/guide/why-ys-team.md
  - docs/methodology/overview.md
  - docs/methodology/reference.md
  - docs/project/module-index.md
  - skills/ys-team/SKILL.md
  - skills/ys-team-init/SKILL.md
  - skills/ys-team-spec-talk/SKILL.md
  - skills/ys-team-spec-work/SKILL.md
  - examples/baseline/.ys_team/rules.md
  - examples/baseline/.ys_team/templates/spec.md
  - examples/baseline/.ys_team/templates/checklist.md
  - skills/ys-team/baseline/.ys_team/rules.md
  - skills/ys-team/baseline/.ys_team/templates/spec.md
  - skills/ys-team/baseline/.ys_team/templates/checklist.md
Delete-Scope: []
Depends-On: []
Verification: "见 ## Verification"
---

# External Skill Pattern Assimilation

## Collaboration Summary

- 参与角色：产品演进负责人、方法论架构师、交付守门人
- 轮次：1
- 关键分歧：是否把 Addy Osmani `agent-skills` 和 Matt Pocock `skills` 的模式外显为用户命令。结论是不外显，ys-team 保持“安装后正常对话、内部自动路由”的定位。
- 决策：PASS，进入 active，spec-review 已通过。

## Background

用户希望 ys-team 不是一组需要人工选择的 `/spec`、`/tdd`、`/review` 命令，而是安装后默认接管 AI 编码协作纪律：用户继续正常对话，ys-team 在内部判断 L0/L1/L2，并按需要自动进入讨论、规格、执行、验证和收口。

对比两个外部项目后，当前判断：

- Addy Osmani `agent-skills` 的优势是把工程生命周期产品化：Define / Plan / Build / Verify / Review / Ship，每个阶段有触发条件、验证出口和反偷懒约束。
- Matt Pocock `skills` 的优势是从真实开发失败模式出发，强调 `grill-with-docs`、领域语言、ADR、issue tracker、TDD vertical slice、diagnose / zoom-out 这类小而锋利的工作流。
- ys-team 的差异化不是技能数量，而是 repo-local governance layer：`.ys_team/` 落地规则、现实索引、角色绑定、spec 生命周期、状态、证据和记忆，并可随项目变化 rebuild。

本 spec 要把外部先进模式吸收到 ys-team 的内部规则和默认 baseline 中，同时保持用户无需选择具体 workflow 的产品承诺。

## Goals

- 明确 ys-team 的产品定位：安装一次，正常开发；用户表达目标，ys-team 自动判断流程。
- 将 Addy `agent-skills` 的 lifecycle、verification gate、anti-rationalization 形式内化到 ys-team routing、rules、templates 和 spec-work。
- 将 Matt `skills` 的 grill-with-docs、domain context、ADR 克制标准、TDD vertical slice、setup/rebuild 项目约定内化到 ys-team spec-talk、init/rebuild 和 baseline。
- 建立“外部模式吸收机制”：先进 skill 模式先被归类为 routing 策略、baseline 规则、文档口径或明确不吸收项，而不是直接暴露成用户必须记住的新命令。
- 保持方法论概念数量受控，避免把 ys-team 变成通用 skills 大合集。

## Non-goals

- 不新增面向用户的 `/spec`、`/tdd`、`/review`、`/grill` 等命令体系。
- 不复制 Addy 或 Matt 项目的 skill 文件。
- 不把所有通用工程 best practices 写进 ys-team。
- 不在本轮实现 CLI 行为变更或网络抓取外部仓库能力。
- 不要求用户迁移到 GitHub Issues；本地 `docs/specs/` 仍是默认 spec 生命周期载体。

## Pattern Decisions

### 从 Addy `agent-skills` 吸收

| 外部模式 | ys-team 内化位置 | 处理方式 |
|---|---|---|
| Define / Plan / Build / Verify / Review / Ship 生命周期 | `skills/ys-team/SKILL.md`、`docs/methodology/overview.md` | 作为内部阶段语言，不作为用户命令 |
| 每阶段 verification gate | spec template、checklist、`ys-team-spec-work` | 明确 evidence 类型：测试、构建、静态检查、人工验证、截图/日志 |
| anti-rationalization | baseline `rules.md`、methodology reference | 增加反逃避自检：不得以“简单”“之后补测试”“文档不用同步”为由降级 |
| skill anatomy | `skills/*/SKILL.md` | 统一内部 skill 的触发、边界、流程、验证结构 |
| 多工具安装叙事 | README、getting-started | 说明 ys-team 本质是 Markdown baseline + skills，可适配不同 agent 环境 |

### 从 Matt `skills` 吸收

| 外部模式 | ys-team 内化位置 | 处理方式 |
|---|---|---|
| grill-with-docs | `ys-team-spec-talk` | 讨论必须对照现实索引、项目文档、已有 spec/ADR，而不是空泛追问 |
| CONTEXT / domain language | `ys-team-init`、docs/project 文档 | 设计可选 `docs/project/context.md` 口径；现实索引管结构，context 管业务语言 |
| ADR 克制标准 | methodology reference、spec template | 只有难逆转、未来会疑惑、有真实 trade-off 的决策才需要 ADR |
| setup 项目协作约定 | `ys-team-init` / rebuild | rebuild 可识别并提示补齐项目约定，不覆盖本地定制 |
| TDD vertical slice | `ys-team-spec-work`、checklist | 高风险行为改动默认优先一条行为一个测试一个实现 |
| diagnose / zoom-out | routing / rebuild 文档 | 作为内部诊断和架构复盘策略，不暴露为独立命令 |

## Deliverables

- README 更新：强化“安装后不用管、正常对话、自动路由、`.ys_team/` 可 rebuild”的定位。
- getting-started 更新：把日常使用从“选择技能”改成“直接提出需求，ys-team 自动判断”。
- why-ys-team 更新：补充“用户不背流程”的反模式和价值。
- methodology overview/reference 更新：加入外部模式吸收原则、内部生命周期、anti-rationalization、ADR 克制标准。
- `skills/ys-team/SKILL.md` 更新：路由规则显式吸收 lifecycle，但对用户保持自动判断。
- `skills/ys-team-init/SKILL.md` 更新：定义 rebuild 对 project context / ADR / 本地协作约定的识别和提示边界。
- `skills/ys-team-spec-talk/SKILL.md` 更新：强化 grill-with-docs 式追问，必须基于现实索引和项目文档。
- `skills/ys-team-spec-work/SKILL.md` 更新：强化 evidence 类型和 TDD vertical slice 默认策略。
- baseline `rules.md`、`spec.md`、`checklist.md` 与 `skills/ys-team/baseline/` 同步副本更新。
- `docs/project/module-index.md` 更新：如新增或重定义 `docs/project/context.md` / ADR 约定，必须反映现实索引。

## Acceptance Criteria

- AC-01: README 首屏说明 ys-team 是“安装后正常对话、内部自动路由”的 repo-local governance layer，不把用户引导到手动选择 `/spec` 或 `/tdd`。
- AC-02: 文档明确 Addy/Matt 类外部模式的吸收边界：吸收到内部 routing / baseline / docs，不变成用户必须记住的新命令。
- AC-03: `skills/ys-team/SKILL.md` 的 L0/L1/L2 routing 与内部 lifecycle 能对应起来，并保持“举证责任在降级”。
- AC-04: baseline rules 增加 anti-rationalization 自检，覆盖跳过 spec、跳过测试/验证、范围扩张、文档不同步等场景。
- AC-05: spec/checklist 模板明确 evidence 类型，并能指导 spec-work 记录可复核验证。
- AC-06: spec-talk 规则要求基于现实索引、项目文档、已有 spec/ADR 追问，避免无依据讨论。
- AC-07: init/rebuild 文档说明 project context / ADR / 本地协作约定的处理方式，并明确不覆盖本地定制。
- AC-08: 如文档新增 `docs/project/context.md` 或 ADR 约定，`docs/project/module-index.md` 同步更新。
- AC-09: baseline 源文件和 `skills/ys-team/baseline/` 同步副本保持一致。
- AC-10: 全文不得出现把 ys-team 定位成“需要用户主动选择的一组 skills pack”的表述。

## Verification

```bash
! rg -n '(^|[^[:alnum:]_.-])/(spec|tdd|review|grill)\b' README.md docs/guide docs/methodology skills examples/baseline
rg -n "自动路由|正常对话|不用|rebuild|\\.ys_team" README.md docs/guide docs/methodology skills
rg -n "anti-rationalization|逃避|降级|验证|evidence|ADR|context|领域" docs/methodology skills examples/baseline
diff -u examples/baseline/.ys_team/rules.md skills/ys-team/baseline/.ys_team/rules.md
diff -u examples/baseline/.ys_team/templates/spec.md skills/ys-team/baseline/.ys_team/templates/spec.md
diff -u examples/baseline/.ys_team/templates/checklist.md skills/ys-team/baseline/.ys_team/templates/checklist.md
```

## Risks

- 过度吸收外部项目会让 ys-team 变成概念堆叠，削弱“用户不背流程”的核心定位。
- 新增 context / ADR 约定如果处理不好，会和 `.ys_team/reality.md` 职责重叠。
- 同时修改 README、方法论、skills 和 baseline，容易出现口径不一致。

## Rollback Plan

- 如果改版后口径变复杂，回退到当前四原则叙事，仅保留 anti-rationalization 和 evidence 类型增强。
- 如果 context / ADR 约定引入成本过高，改为文档推荐项，不进入 init/rebuild 默认产物。
