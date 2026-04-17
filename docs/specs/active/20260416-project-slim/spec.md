---
Spec-Type: control
Initiative: 20260416-project-slim
Status: reviewed
Owner-Session: ys-team
Write-Scope:
  # 方法论文档（重写）
  - docs/methodology/overview.md
  - docs/methodology/reference.md
  # 用户指南（精简）
  - docs/guide/why-ys-team.md
  - docs/guide/getting-started.md
  # Skills（重构）
  - skills/ys-team/SKILL.md
  - skills/ys-team-init/SKILL.md
  - skills/ys-team-spec-talk/SKILL.md
  - skills/ys-team-spec-work/SKILL.md
  # Baseline（重建）
  - examples/baseline/AGENTS.md
  - examples/baseline/CLAUDE.md
  - examples/baseline/CHANGELOG.md
  - examples/baseline/.ys_team/config.yaml
  - examples/baseline/.ys_team/rules.md
  - examples/baseline/.ys_team/reality.md
  - examples/baseline/.ys_team/status.md
  - examples/baseline/.ys_team/VERSION
  - examples/baseline/.ys_team/templates/checklist.md
  - examples/baseline/.ys_team/templates/spec.md
  - examples/baseline/.ys_team/memory/
  # 入口文档
  - README.md
  # 项目索引
  - docs/project/module-index.md
  # Bundled baseline 同步（必须与 examples/baseline/ 一致）
  - skills/ys-team/baseline/**
  # Spec 流程产出
  - docs/specs/active/20260416-project-slim/checklist.md
  - docs/specs/active/20260416-project-slim/work*.md
  - docs/specs/active/20260416-project-slim/evidence/
  # 版本号
  - package.json
  # 状态留痕
  - .ys_team/status.md
Delete-Scope:
  # 方法论旧文件
  - docs/methodology/00-overview.md
  - docs/methodology/01-state-machine.md
  - docs/methodology/02-role-protocol.md
  - docs/methodology/03-discussion-protocol.md
  - docs/methodology/04-artifact-schema.md
  - docs/methodology/05-governance.md
  - docs/methodology/06-bootstrap-and-evolution.md
  # 被合并的 skills
  - skills/ys-team-talk/
  - skills/ys-team-status/
  - skills/ys-team-rebuild/
  - skills/ys-team-doc-build/
  # 被合并的 guide
  - docs/guide/daily-usage.md
  - docs/guide/cases-and-evolution.md
  # Baseline 旧文件
  - examples/baseline/.ys_team/delivery-flow.md
  - examples/baseline/.ys_team/policy.md
  - examples/baseline/.ys_team/methods.md
  - examples/baseline/.ys_team/team.md
  - examples/baseline/.ys_team/README.md
  - examples/baseline/.ys_team/roles/
  - examples/baseline/.ys_team/toolbox/
  - examples/baseline/.ys_team/evolution/
  - examples/baseline/.ys_team/templates/work.md
  - examples/baseline/.ys_team/templates/workspace.md
  - examples/baseline/.ys_team/templates/requirement.md
  - examples/baseline/.ys_team/templates/roadmap-version.md
  - examples/baseline/.ys_team/templates/review.md
  - examples/baseline/.ys_team/templates/control.md
  - examples/baseline/.ys_team/templates/qa-report.md
  - examples/baseline/TEAM.md
  - examples/baseline/docs/roadmap/
  - examples/baseline/docs/project/overview.md
  # Baseline memory 旧文件
  - examples/baseline/.ys_team/memory/policy.md
  - examples/baseline/.ys_team/memory/roles/
  # 被吸收的 spec
  - docs/specs/active/20260416-negative-control-language/
Depends-On: []
Absorbs: 20260416-negative-control-language
Verification: "见 ## Verification"
---

# ys-team 项目瘦身

## 原始需求

用户在对照 `forrestchang/andrej-karpathy-skills`（45k stars）后，提出两个方向：

1. 引入反向控制语言（禁止项比推荐项约束力更强）
2. 项目整体偏臃肿、结构不清晰、心智负担重，需要瘦身

经过 4 轮讨论，收敛为：项目从"治理平台"重新定位为"纪律层"。反向控制语言作为瘦身后 rules.md 的核心内容被吸收，不再作为独立 spec。

用户核心诉求：**结构清晰、很薄、心智负担轻、提效强、脱离模型和工具约束、适用范围广。**

## Background

ys-team 当前状态：
- 242 个文件（含 specs），baseline 落地 ~34 个文件到用户项目
- 方法论 7 篇文档 800+ 行，skills 8 个共 1180 行
- 用户需要理解：L0/L1/L2 路由、6 内部角色 + 4 外部角色、7 种 spec 制品、3 条版本线、toolbox 内化、evolution 追踪、delivery-flow 6 个绑定点、TEAM.md 配置面板、memory 系统……

对照 Karpathy 项目：68 行 CLAUDE.md + 1 个 EXAMPLES.md 解决了 80% 的行为控制问题。

ys-team 比 Karpathy 真正多出的价值只有 5 件事：
1. L0/L1/L2 路由（不是所有事都需要同等流程）
2. 现实索引（先看项目再动手）
3. Spec + Write-Scope（复杂改动有执行合约）
4. 反向控制（禁止项约束 agent 行为）
5. 证据验收（可验证的交付）

其余都是治理开销。

## Goals

1. 将 .ys_team/ 落地从 ~34 文件精简到 ~10 文件
2. 方法论从 7 篇重写为 2 篇（overview + reference）
3. Skills 从 8 个减到 4 个（2 用户可见 + 2 内部委托）
4. Spec 制品从 7 种必须降到 1 种必须（spec.md）+ 交付检查清单 + 可选执行层产出
5. 角色系统从"角色卡文件"降级为"config 配置项"，保留 subagent 隔离机制
6. 角色记忆保留错题本格式，增加摘要头机制
7. 吸收反向控制语言（8 条禁止项 + Ban Levels）进 rules.md
8. 删除 toolbox、evolution、delivery-flow 6 绑定点、TEAM.md、methods.md
9. 用户心智从 ~10 个概念降到 3 个：规则、现实索引、Spec

## Non-goals

- 不修改本仓自用 `.ys_team/`（配置、策略、交付流）；status.md 仅允许工作流留痕
- 不修改本仓 root `AGENTS.md` / `CLAUDE.md` — 本仓自用基线延后迁移，root 入口保持旧规则（含 toolbox 排他），仅 baseline 和分发面进入新规则。README 和 CHANGELOG 中说明兼容期
- 不改变 L0/L1/L2 基本分流模型
- 不改变 npm 分发方式（CLI 命令保持不变）
- 不引入 Claude plugin / marketplace
- 不在本次实现 semi-auto/full-auto 编排的代码变更（只在方法论中保留定义）

## 关键设计决策

以下决策在 4 轮讨论中确认，执行时不再重新讨论。

### D1: 角色保留为一等概念，但大幅压缩定义体积

- 角色定义从独立文件改为 config.yaml 内联（每个角色 3 字段：id、name、focus）
- 删除角色卡 schema、subagent_policy 枚举、外部角色升级协议
- subagent 隔离机制保留（讨论时用独立上下文保证多视角）
- 内部/外部角色的区分简化为：config 里列的是固定角色，临时需要的按需创建
- 按需创建的角色如果被反复引入（rebuild 时检测），建议升级为固定角色

### D2: 角色记忆用错题本 + 摘要头

- 经验条目保留当前格式：错误模式 → 正确做法 → 适用场景
- 新增"当前核心原则"摘要头，rebuild 时从条目自动提炼
- 角色启动时先读摘要头，需要细节时读具体条目
- 条目超过阈值（如 15 条）时，rebuild 时合并相似条目并重新生成摘要头
- 删除 memory/policy.md 和健康检查机制，压缩规则内嵌 skill

**Memory Baseline 决策：**
- `examples/baseline/.ys_team/memory/policy.md` → 删除（纳入 Delete-Scope）
- `examples/baseline/.ys_team/memory/roles/*.md` → 全部删除。init 时根据 config.yaml 的 roles 列表生成空记忆文件（`memory/<role-id>.md`），不预置旧角色名的记忆文件
- baseline 只保留空的 `memory/` 目录（用 `.gitkeep`），不预置任何记忆文件
- `skills/ys-team/baseline/` 同步适用上述规则

### D3: Spec 制品分两层

方法论定义的制品（用户必须理解）：
- `spec.md` — 执行合约（合并 requirement + control）
- `checklist.md` — 交付检查清单（从模板复制，绑定 5 个核心流程，每阶段打勾）
- `evidence/` — 验收证据

执行层自动产出的制品（用户不需要理解，skill 自动管理）：
- `work.md` — 执行笔记（spec-work subagent 写入中间状态和关键决策）
- `work-XX.md` — 多步拆分子合约（各有自己的 Write-Scope 和 Verification）
- `review.md` — 审阅结论（semi-auto/full-auto 自动产出）
- `qa-report.md` — QA 报告（semi-auto/full-auto 自动产出）

### D4: delivery-flow 替换为交付检查清单

- 删除 delivery-flow.md 及其 6 个绑定点
- 替换为 checklist 模板，绑定 5 个核心流程（spec-talk → spec-review → spec-work → qa → close）
- 每个 spec 从模板复制一份 checklist.md，各阶段完成时打勾
- semi-auto/full-auto 下由 subagent 自动打勾

### D5: TEAM.md 收进 config.yaml

- 删除 TEAM.md
- 配置收进 `.ys_team/config.yaml`：mode、roles、max_retries
- 不需要配置的项目不创建此文件，init 用默认值

**config.yaml 最小示例：**
```yaml
mode: manual          # manual | semi-auto | full-auto
roles:
  - id: arch
    name: 架构师
    focus: 结构与边界
  - id: pm
    name: 产品负责人
    focus: 价值与优先级
  - id: gate
    name: 守门人
    focus: 质量与证据
max_retries: 2
```

### D6: 反向控制语言吸收进 rules.md

8 条禁止项（含分级和自检锚点）+ Ban Levels 定义 + 反模式案例，全部作为 rules.md 和 methodology overview 的内容落地。不再作为独立 spec。

### D7: Skills 从 8 减到 4

| Skill | 定位 | 用户可见 | 合并来源 |
|-------|------|---------|---------|
| ys-team | 入口 + 路由 + 行为规则 | 是 | + ys-team-talk + ys-team-status |
| ys-team-init | 初始化 + 重建 + 现实索引 | 是 | + ys-team-rebuild + ys-team-doc-build（≤300 行触发拆分） |
| ys-team-spec-talk | 多角色讨论 + spec 产出 | 否（内部委托） | 精简 |
| ys-team-spec-work | 按 spec 执行 + evidence | 否（内部委托） | 精简 |

### D8: 方法论从 7 篇重写为 2 篇

- `overview.md`：核心思想（4 原则 + 反向控制）、路由模型、spec 最小定义、角色与记忆概述、交付检查清单
- `reference.md`：完整规则参考（Ban Levels、spec.md schema、checklist 模板定义、config.yaml schema、记忆格式、状态机详细定义、编排模式）

### D9: 版本号 0.5.0 + 旧结构迁移提示

- 本次发布版本号为 `0.5.0`（baseline 结构不兼容，minor bump）
- Step 6 更新 package.json、examples/baseline/.ys_team/VERSION、CHANGELOG
- `ys-team-init` 的 rebuild 路径加入旧结构检测：发现 `policy.md` / `team.md` / `delivery-flow.md` 时输出迁移提示
- Write-Scope 追加 `package.json`

### D10: init 子文件拆分预案

- `SKILL.md` 主体承载 init + rebuild 的路由判断和公共逻辑
- 现实索引生成逻辑拆入 `init-reality.md`（由 SKILL.md 声明引用）
- 合并后超过 300 行即触发拆分

overview 面向"理解方法论"，reference 面向"查规则细节"。

## Deliverables

### 新建

| 文件 | 说明 |
|------|------|
| docs/methodology/overview.md | 核心方法论（合并 00-overview + 反向控制 + 路由 + spec 定义） |
| docs/methodology/reference.md | 完整规则参考（合并 01-06 精华） |
| examples/baseline/.ys_team/config.yaml | 极简配置（替代 TEAM.md + team.md） |
| examples/baseline/.ys_team/rules.md | 行为规则 + 禁止项（替代 policy.md + methods.md） |
| examples/baseline/.ys_team/templates/checklist.md | 交付检查清单模板（替代 delivery-flow.md） |
| examples/baseline/.ys_team/templates/spec.md | spec 模板（替代 7 个制品模板） |

### 重写

| 文件 | 说明 |
|------|------|
| README.md | 精简，加反模式入口（≤10 行新增） |
| docs/guide/why-ys-team.md | 加反模式案例（≥3 个，按规定结构） |
| docs/guide/getting-started.md | 适配新的 .ys_team/ 结构 |
| skills/ys-team/SKILL.md | 合并 talk + status，加禁止项执行边界 |
| skills/ys-team-init/SKILL.md | 合并 rebuild + doc-build，适配新 baseline |
| skills/ys-team-spec-talk/SKILL.md | 精简，去掉 evolution 感知、外部角色协议 |
| skills/ys-team-spec-work/SKILL.md | 精简，去掉 evolution 感知 |
| examples/baseline/AGENTS.md | 适配新结构，承载最小禁止项 |
| examples/baseline/CLAUDE.md | 适配新结构 |
| examples/baseline/.ys_team/status.md | 保留，结构不变 |
| examples/baseline/.ys_team/reality.md | 从 module-index.md 重命名，内容结构不变 |
| examples/baseline/.ys_team/VERSION | 保留 |
| examples/baseline/CHANGELOG.md | 记录本次变更 |
| docs/project/module-index.md | 同步更新 |

### 删除

| 文件/目录 | 原因 |
|-----------|------|
| docs/methodology/00-overview.md | 合并进 overview.md |
| docs/methodology/01-state-machine.md | 合并进 reference.md |
| docs/methodology/02-role-protocol.md | 合并进 reference.md |
| docs/methodology/03-discussion-protocol.md | 合并进 reference.md |
| docs/methodology/04-artifact-schema.md | 合并进 reference.md |
| docs/methodology/05-governance.md | 合并进 overview.md + reference.md |
| docs/methodology/06-bootstrap-and-evolution.md | 合并进 reference.md |
| skills/ys-team-talk/ | 合并进 ys-team |
| skills/ys-team-status/ | 合并进 ys-team |
| skills/ys-team-rebuild/ | 合并进 ys-team-init |
| skills/ys-team-doc-build/ | 合并进 ys-team-init |
| docs/guide/daily-usage.md | 合并进 getting-started.md |
| docs/guide/cases-and-evolution.md | 合并进 why-ys-team.md |
| examples/baseline/.ys_team/delivery-flow.md | 替换为 checklist 模板 |
| examples/baseline/.ys_team/policy.md | 替换为 rules.md |
| examples/baseline/.ys_team/methods.md | 内容进 methodology |
| examples/baseline/.ys_team/team.md | 替换为 config.yaml |
| examples/baseline/.ys_team/README.md | 不需要 |
| examples/baseline/.ys_team/roles/ | 角色定义进 config.yaml |
| examples/baseline/.ys_team/toolbox/ | 删除机制 |
| examples/baseline/.ys_team/evolution/ | 删除机制 |
| examples/baseline/.ys_team/templates/work.md | 不再需要独立模板 |
| examples/baseline/.ys_team/templates/workspace.md | 删除制品 |
| examples/baseline/.ys_team/templates/requirement.md | 合并进 spec.md |
| examples/baseline/.ys_team/templates/roadmap-version.md | 精简掉 |
| examples/baseline/.ys_team/templates/review.md | 执行层自动产出，不需要模板 |
| examples/baseline/.ys_team/templates/control.md | 替换为 spec.md |
| examples/baseline/.ys_team/templates/qa-report.md | 执行层自动产出，不需要模板 |
| examples/baseline/TEAM.md | 替换为 config.yaml |
| examples/baseline/docs/roadmap/ | 精简掉 |
| examples/baseline/docs/project/overview.md | 合并进 reality.md |

### skills/ys-team/baseline/ 同步

`skills/ys-team/baseline/` 是 baseline 的 npm 分发副本，必须与 `examples/baseline/` 保持同步。上述所有 baseline 变更同时应用到此目录。已纳入 Write-Scope。

## 能力迁移矩阵

每个被删除或合并的能力必须有明确的新承载位置。执行时逐行验证"新位置是否真正承载了原能力"。

| 旧能力 | 旧承载位置 | 新承载位置 | 验证方式 |
|--------|-----------|-----------|---------|
| 状态机定义（idle→spec-talk→...→done） | 01-state-machine.md | reference.md § 状态机 | rg "spec-talk.*spec-review.*spec-work.*qa.*close" docs/methodology/reference.md |
| 角色卡 schema + subagent_policy | 02-role-protocol.md + roles/*.md | config.yaml roles 字段 + reference.md § 角色 | 确认 config.yaml 有 roles 列表，reference.md 有角色说明 |
| 讨论协议（意图三段判断、结果卡、角色简报） | 03-discussion-protocol.md | ys-team-spec-talk/SKILL.md | rg "结果卡\|result card\|Role Brief" skills/ys-team-spec-talk/SKILL.md |
| Spec 制品 schema（7 种制品定义） | 04-artifact-schema.md | reference.md § spec 制品 + templates/spec.md | 确认 spec.md 模板包含 Background/Goals/Write-Scope/AC/Verification |
| 治理规则（分流、文档权威、交付门禁） | 05-governance.md | overview.md § 反向控制 + rules.md | rg "Hard Ban\|L0\|L1\|L2" docs/methodology/overview.md |
| 初始化/演进（init 产出、rebuild 规则、版本管理） | 06-bootstrap-and-evolution.md | reference.md § 初始化 + ys-team-init/SKILL.md | 确认 init skill 包含项目类型检测和 reality 生成 |
| ys-team-talk（轻量讨论） | skills/ys-team-talk/SKILL.md | skills/ys-team/SKILL.md 内联 | rg "讨论\|discussion\|talk" skills/ys-team/SKILL.md |
| ys-team-status（状态查询） | skills/ys-team-status/SKILL.md | skills/ys-team/SKILL.md 内联 | rg "status" skills/ys-team/SKILL.md |
| ys-team-rebuild（重估） | skills/ys-team-rebuild/SKILL.md | skills/ys-team-init/SKILL.md（--rebuild） | rg "rebuild\|重估" skills/ys-team-init/SKILL.md |
| ys-team-doc-build（现实索引生成） | skills/ys-team-doc-build/SKILL.md | skills/ys-team-init/SKILL.md 内联 | rg "reality\|现实索引\|module-index" skills/ys-team-init/SKILL.md |
| Toolbox 内化（sources + candidates） | .ys_team/toolbox/ | 删除，不迁移 | 确认 skills 和 baseline 不再引用 toolbox |
| Evolution 追踪（requests.md） | .ys_team/evolution/ | 删除，不迁移 | 确认 skills 和 baseline 不再引用 evolution |
| Delivery-flow 6 绑定点 | .ys_team/delivery-flow.md | templates/checklist.md（5 核心流程检查项） | 确认 checklist 覆盖 spec-talk/review/work/qa/close |
| 角色记忆健康检查 | memory/policy.md | 压缩规则内嵌 ys-team-init/SKILL.md（rebuild 时执行） | rg "记忆\|memory\|压缩\|摘要头" skills/ys-team-init/SKILL.md |
| 外部角色升级协议 | 02-role-protocol.md § 外部角色升级 | 按需创建机制写入 ys-team-spec-talk/SKILL.md | rg "临时\|按需\|外部" skills/ys-team-spec-talk/SKILL.md |
| QA/review 制品模板 | templates/review.md + qa-report.md | 执行层自动产出，格式定义在 reference.md | rg "review\|qa-report" docs/methodology/reference.md |
| workspace.md（跨阶段工作记忆） | templates/workspace.md | work.md 替代（执行笔记） | 确认 ys-team-spec-work/SKILL.md 引导写入 work.md |
| TEAM.md 配置面板 | TEAM.md + .ys_team/team.md | .ys_team/config.yaml | 确认 config.yaml 包含 mode/roles/max_retries |
| daily-usage 使用指南 | docs/guide/daily-usage.md | docs/guide/getting-started.md | 确认 getting-started 包含日常使用场景 |
| cases-and-evolution 案例 | docs/guide/cases-and-evolution.md | docs/guide/why-ys-team.md（反模式案例） | 确认 why-ys-team 有 ≥3 个案例 |

## 反向控制语言（从 20260416-negative-control-language 吸收）

### 8 条禁止项

| # | 类别 | 级别 | 口号 | 行为 | 自检锚点 |
|---|------|------|------|------|----------|
| 1 | 流程 | Hard Ban | 未路由不改文件 | 每个请求先完成 L0/L1/L2 判断，未判断前不得修改任何文件 | 回复中是否出现路由判断标志？ |
| 2 | 行为 | Hard Ban | 未读现实不下结论 | 涉及影响范围、风险或方案选择时，必须先读现实索引或相关代码 | 结论中引用的模块/文件，是否在本轮对话中实际读取过？ |
| 3 | 流程 | Hard Ban | 无 spec 不执行 | L2 改动未形成 spec.md，不得进入实现 | 是否存在对应 spec 目录且 spec.md 已写入？ |
| 4 | 流程 | Hard Ban | 不越 Write-Scope | spec-work 只能修改 Write-Scope 声明的文件 | 本次 diff 中每个文件路径是否在 Write-Scope 列表内？ |
| 5 | 行为 | Confirmation Ban | 范围扩大必须回头 | 发现必须修改 scope 外文件时，停止执行，回到讨论 | 是否在继续执行前显式声明了 scope 变更并获得确认？ |
| 6 | 行为 | Style Ban | 不顺手动别人的代码 | 不重构无关代码、不格式化无关文件、不补未要求的功能 | 每行 diff 能否追溯到用户请求或 spec 条目？ |
| 7 | 流程 | Hard Ban | 无证据不说完成 | 无 verification 结果、evidence 或明确"无法验证"说明，不得声明完成 | close/done 前是否有可复核的验证产出？ |
| 8 | 流程 | Hard Ban | 文档不同步不收口 | 受影响文档未同步更新，不得 close | Write-Scope 中的文档类文件是否全部已更新？ |

### Ban Levels

| 级别 | 含义 | 违反时行为 |
|------|------|------------|
| Hard Ban | 硬 gate | 立即停止，必须先满足条件 |
| Confirmation Ban | 软 gate | 显式声明并获得确认后可继续 |
| Style Ban | 默认禁止 | 用户明确要求时可以做 |

### Escape Clause

L0 级别请求可跳过 #1 和 #2，但必须声明跳过原因。

### 反模式案例结构（why-ys-team.md 中使用）

每个案例必须包含：
1. 用户请求原文
2. 没有约束时 AI 会怎么做（具体错误行为）
3. ys-team 的禁止项如何阻断（指向具体编号和自检锚点）
4. 正确行为

至少 3 个案例，分别覆盖行为边界、流程边界、Confirmation Ban。

## 执行顺序

分 6 步，有依赖关系的必须串行。核心原则：先建新结构，再适配消费方，最后删旧物，避免中途断裂。

### Step 1: 方法论定义（基础层，其他所有步骤依赖此步）

1. 写 `docs/methodology/overview.md`
2. 写 `docs/methodology/reference.md`
3. 暂不删除 00-06 旧文件（Step 5 统一删除）

### Step 2: Baseline 草案（只建新文件，不删旧文件）

1. 新建 config.yaml、rules.md、checklist 模板、spec 模板
2. 新建 reality.md
3. 重写 AGENTS.md、CLAUDE.md、status.md
4. 暂不删除旧文件、暂不同步 bundled baseline（Step 5 统一处理）

### Step 3: Skills 重构（读取新 baseline 结构）

1. 重写 ys-team/SKILL.md（合并 talk + status，引用新 config.yaml/rules.md 路径）
2. 重写 ys-team-init/SKILL.md（合并 rebuild + doc-build，引用新 baseline 结构）
3. 精简 ys-team-spec-talk/SKILL.md（引用新 config.yaml 角色定义）
4. 精简 ys-team-spec-work/SKILL.md（引用新 checklist/spec.md 路径）
5. 暂不删除旧 skill 目录（Step 5 统一删除）

### Step 4: 用户文档

1. 重写 docs/guide/why-ys-team.md（加反模式案例）
2. 重写 docs/guide/getting-started.md
3. 更新 README.md（加反模式入口 + 兼容期说明）
4. 更新 docs/project/module-index.md

### Step 5: 删除旧物 + 同步

1. 删除 methodology 00-06 旧文件
2. 删除 baseline 旧文件（roles/、toolbox/、evolution/、旧模板、delivery-flow.md、policy.md、methods.md、team.md、README.md、TEAM.md、docs/roadmap/、docs/project/overview.md）
3. 删除旧 skill 目录（ys-team-talk/、ys-team-status/、ys-team-rebuild/、ys-team-doc-build/）
4. 删除旧 guide（daily-usage.md、cases-and-evolution.md）
5. 删除被吸收的 spec（20260416-negative-control-language/）
6. 同步 skills/ys-team/baseline/ 与 examples/baseline/
7. 逐行验证能力迁移矩阵

### Step 6: 收口 + 分发验证

1. 更新 examples/baseline/CHANGELOG.md
2. 更新 .ys_team/status.md
3. 运行分发验证（见 Verification § 分发验证）

## Acceptance Criteria

### 结构验证

- AC-01: .ys_team/ baseline 落地文件 ≤ 10 个（不含 memory/*.md）
- AC-02: methodology/ 只有 overview.md + reference.md + VERSION
- AC-03: skills/ 只有 ys-team、ys-team-init、ys-team-spec-talk、ys-team-spec-work 四个目录
- AC-04: guide/ 只有 why-ys-team.md + getting-started.md

### 内容验证

- AC-05: overview.md 包含 4 原则 + 反向控制 + 路由模型 + spec 定义 + 角色概述 + 检查清单
- AC-06: rules.md 包含 8 条禁止项（含分级和自检锚点）+ Ban Levels + Escape Clause
- AC-07: config.yaml 包含 mode + roles（每个 3 字段）+ max_retries
- AC-08: checklist 模板绑定 5 个核心流程，每流程有具体检查项
- AC-09: spec 模板合并了 requirement + control 的内容
- AC-10: why-ys-team.md 至少 3 个反模式案例，遵循规定结构
- AC-11: AGENTS.md 禁止项部分 ≤ 30 行
- AC-12: CLAUDE.md 禁止项部分 ≤ 10 行
- AC-13: README.md 新增内容 ≤ 10 行

### 一致性验证

- AC-14: overview.md 定义的禁止项 == rules.md 的禁止项 == AGENTS.md 的禁止项（同一套 8 条）
- AC-15: skills/ys-team/baseline/ 与 examples/baseline/ 内容一致
- AC-16: 被删除的 skill 不再被任何文件引用

### 排除验证

- AC-17: 不出现 Claude plugin / marketplace
- AC-18: 旧概念（toolbox/_sources、evolution/requests、delivery-flow 绑定点、TEAM.md、methods.md）不出现在运行路径中（CHANGELOG 迁移说明除外）
- AC-19: 本仓自用 .ys_team/ 的配置、策略、交付流未被修改；root AGENTS.md / CLAUDE.md 未被修改

### 分发验证

- AC-20: `npm pack --dry-run` 不包含被删除的 skill 目录；`install-skills --force` 安装后只有 4 个 skill 目录；bundled baseline 与 examples/baseline 一致

### 能力迁移验证

- AC-21: 能力迁移矩阵中每一行的"验证方式"执行通过，无能力被静默丢弃

## Verification

### 结构验证

```bash
# baseline 落地文件数（不含 memory/）
find examples/baseline/.ys_team -maxdepth 1 -not -name memory -not -name '.ys_team' | wc -l  # ≤ 6

# methodology 只有 overview + reference（VERSION 不算 .md）
find docs/methodology -maxdepth 1 -name '*.md' | wc -l  # == 2

# skills 只有 4 个目录
find skills -maxdepth 1 -type d -not -name skills | wc -l  # == 4

# guide 只有 2 个 .md
find docs/guide -maxdepth 1 -name '*.md' | wc -l  # == 2
```

### 内容验证

```bash
# 禁止项存在性
rg -c "Hard Ban|Confirmation Ban|Style Ban" docs/methodology/overview.md examples/baseline/.ys_team/rules.md examples/baseline/AGENTS.md

# 反模式案例（至少 3 组完整结构）
rg -c "用户请求" docs/guide/why-ys-team.md  # ≥ 3
rg -c "没有约束时" docs/guide/why-ys-team.md  # ≥ 3
rg -c "禁止项如何阻断" docs/guide/why-ys-team.md  # ≥ 3
rg -c "正确行为" docs/guide/why-ys-team.md  # ≥ 3

# 密度检查
wc -l examples/baseline/AGENTS.md examples/baseline/CLAUDE.md
```

### 删除验证

```bash
# 旧 skill 目录不存在
test ! -d skills/ys-team-talk && test ! -d skills/ys-team-status && test ! -d skills/ys-team-rebuild && test ! -d skills/ys-team-doc-build && echo "PASS"

# 旧 baseline 文件不存在
test ! -f examples/baseline/.ys_team/delivery-flow.md && \
test ! -f examples/baseline/.ys_team/policy.md && \
test ! -f examples/baseline/.ys_team/methods.md && \
test ! -f examples/baseline/.ys_team/team.md && \
test ! -d examples/baseline/.ys_team/toolbox && \
test ! -d examples/baseline/.ys_team/evolution && \
test ! -d examples/baseline/.ys_team/roles && \
test ! -f examples/baseline/TEAM.md && \
echo "PASS"

# 旧 methodology 文件不存在
test ! -f docs/methodology/00-overview.md && \
test ! -f docs/methodology/01-state-machine.md && \
test ! -f docs/methodology/02-role-protocol.md && \
test ! -f docs/methodology/03-discussion-protocol.md && \
test ! -f docs/methodology/04-artifact-schema.md && \
test ! -f docs/methodology/05-governance.md && \
test ! -f docs/methodology/06-bootstrap-and-evolution.md && \
echo "PASS"

# 被吸收的 spec 不存在
test ! -d docs/specs/active/20260416-negative-control-language && echo "PASS"
```

### 排除验证

```bash
# 不出现 Claude plugin / marketplace（rg 命中=失败，所以用 ! 取反）
! rg "Claude plugin|marketplace" README.md docs/ skills/ examples/baseline/ && echo "PASS: no plugin/marketplace references"

# 旧概念不出现在运行路径中（排除 CHANGELOG 的历史记录段和迁移说明）
! rg "toolbox/_sources|evolution/requests|delivery-flow.*绑定点" examples/baseline/.ys_team/ skills/ --glob '!CHANGELOG.md' && echo "PASS: no stale toolbox/evolution/delivery-flow refs"
! rg "TEAM\.md" examples/baseline/.ys_team/ skills/ --glob '!CHANGELOG.md' && echo "PASS: no TEAM.md refs"
! rg "methods\.md" examples/baseline/.ys_team/ skills/ --glob '!CHANGELOG.md' && echo "PASS: no methods.md refs"
```

### Baseline 同步验证

```bash
diff -rq examples/baseline/ skills/ys-team/baseline/ --exclude='.gitkeep' --exclude='.DS_Store'
```

### 分发验证

```bash
# npm pack 确认旧 skill 目录不在包内
npm pack --dry-run > /tmp/ys-team-pack-list.txt 2>&1
! rg "ys-team-talk/|ys-team-status/|ys-team-rebuild/|ys-team-doc-build/" /tmp/ys-team-pack-list.txt && echo "PASS: no stale skills in pack"
rm /tmp/ys-team-pack-list.txt

# CLI dry-run 确认只安装 4 个 skill
node scripts/ys-team.mjs install-skills --dest /tmp/ys-team-slim-test --force --dry-run

# 真实临时安装确认 skill 列表和 baseline 一致性
rm -rf /tmp/ys-team-slim-test
node scripts/ys-team.mjs install-skills --dest /tmp/ys-team-slim-test --force
installed=$(ls /tmp/ys-team-slim-test | sort | tr '\n' ',')
[ "$installed" = "ys-team,ys-team-init,ys-team-spec-talk,ys-team-spec-work," ] \
  && echo "PASS: exactly 4 skills" \
  || { echo "FAIL: unexpected skills: $installed"; exit 1; }
diff -rq /tmp/ys-team-slim-test/ys-team/baseline/ examples/baseline/ --exclude='.gitkeep'
rm -rf /tmp/ys-team-slim-test
```

### 能力迁移矩阵验证（人工 + 自动）

逐行执行能力迁移矩阵中的"验证方式"列。每行 PASS 后打勾。

### 一致性核对（人工）

逐条检查 8 条禁止项在三处的一致性：

| # | overview.md | rules.md | AGENTS.md |
|---|------------|----------|-----------|
| 1 | ☐ | ☐ | ☐ |
| 2 | ☐ | ☐ | ☐ |
| 3 | ☐ | ☐ | ☐ |
| 4 | ☐ | ☐ | ☐ |
| 5 | ☐ | ☐ | ☐ |
| 6 | ☐ | ☐ | ☐ |
| 7 | ☐ | ☐ | ☐ |
| 8 | ☐ | ☐ | ☐ |

## Risks

1. **瘦身过度导致能力丢失** — 缓解：能力迁移矩阵逐行验证，每个删除项有明确的新承载位置。
2. **baseline 重建后 ai-gateway 等已接入项目需要迁移** — 缓解：CHANGELOG.md 记录迁移指引。本次不要求已接入项目立即迁移，旧格式在下一个大版本前继续兼容。
3. **skills 合并后单个 SKILL.md 过长** — 缓解：每个 skill 目标 200-300 行。如果合并后超过 350 行，拆分为子文件而不是恢复独立 skill。
4. **spec.md 对超大需求（如 callback-mode 264 行 control）可能过长** — 缓解：ai-gateway 实测最大 ~300 行（含 requirement），单文件可承载。work-XX.md 多步拆分机制保留。
5. **删除 skill 目录影响 npm 分发面** — 缓解：分发验证（npm pack + install-skills dry-run + 真实临时安装）作为 Step 6 的必须环节。`install-skills --force` 已有 stale skill 清理逻辑（scripts/ys-team.mjs:183-189），会自动清理用户已安装的旧 skill。
6. **本仓 root 入口与新方法论不一致** — 缓解：Non-goals 明确本仓自用延后迁移，README/CHANGELOG 说明兼容期。
7. **本仓自用 .ys_team/ 永远不迁移** — 缓解：0.5.0 发布验证通过后，下一个 spec 必须完成本仓 `.ys_team/` 迁移到新结构。

## Rollback Plan

- **触发条件**：瘦身后 ai-gateway 等项目接入出现严重能力退化，或新用户反馈简化后的方法论无法承载中等复杂度项目。
- **全量回滚**：git revert 到瘦身前的 commit。
- **部分回滚**：恢复被过度简化的单个模块（如恢复独立 spec-talk skill），不需要全量恢复。

## Acceptance Evidence

待 spec-work 产出。
