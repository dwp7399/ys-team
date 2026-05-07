# Work Log — 0.6.0 Spec B: 领域语言层 + 反馈环纪律 + grill 子模式 + 0.6.0 release 收口

## 执行轨迹

| 时间 | 阶段 | 角色 | 内容 |
|------|------|------|------|
| 2026-05-07 | spec-talk | arch / pm / gate | 三角色收敛 spec.md |
| 2026-05-07 | spec-review | reviewer | 12 项检查全 OK，PASS（含 4 个 Note） |
| 2026-05-07 | spec-work | arch | 在 release/0.6.0 分支执行（与 Spec A 同分支顺序推进） |

## 实施步骤

### 1. spec.md 模板加 Feedback Loop 子段（3 处）

定位：`## Verification` 代码块下、`可接受的 evidence 类型：`（baseline）或 `## Risks`（本仓实例）之前。

子段内容：4 行（命令或步骤 / 期望信号 / 复现成本 / N/A 允许）。

边界决策：本仓 `.ys_team/templates/spec.md` 与 baseline 模板有结构差异（缺 Integration Gate / Documentation Updates / Acceptance Evidence 段）。本 spec 不修复该差异（Style Ban #6），只追加 Feedback Loop 子段。结构同步留待后续单独 spec/L1 patch。

### 2. glossary.md（3 处）

- 2 处 baseline：相同空骨架 + 1 条示例条目（用户）
- 本仓实例：6 条真实术语（Spec / Baseline / 同步副本 / Release 单元 / Feedback Loop / Glossary）

### 3. reality.md 末尾追加「领域语言」段（3 处）

baseline 双副本：纯指引段。
本仓实例：指引段 + 更新记录加 2026-05-07 条目。

### 4. ys-team-spec-talk SKILL.md（仅 supporting-info 内追加）

按 Spec A 的 wrapper-only 模式：
- `## Read Order` 第 7 项后追加第 8 项 glossary 加载
- `## Standard Flow` 第 1 步后插入 1.5 grill 检查（不重排原 1-7 编号）
- `## Spec 产出要求` 末尾追加 glossary 核对句
- `</supporting-info>` 之前追加 `## Grill 子模式` 整段（触发 / 流程 / 退出 / 边界 4 子段）

### 5. ys-team-spec-work SKILL.md（仅 supporting-info 内追加）

按 Spec A 的 wrapper-only 模式：
- `## Read Order` 第 6 项后追加第 7 项 Feedback Loop 段加载
- `## Rules` 末尾追加 Feedback Loop 必填校验 bullet
- `## Execution` 第 4 步后插入 4.5 复现成本校验

### 6. 方法论文档

- `docs/methodology/overview.md`：在 `## Spec 最小定义` 后追加 `## 反馈环纪律` 与 `## 领域语言层` 两段（不重排现有章节）
- `docs/methodology/reference.md`：
  - `### Evidence 类型` 后追加 `### Feedback Loop 子段`
  - 初始化文件清单（`## 初始化与重估` 段下）加 `glossary.md` 与模板清单内 `+ glossary` 标注
  - `### ADR 与领域上下文` 段领域语言说明 bullet 追加 glossary.md 推荐位置
- `docs/methodology/VERSION`：`1.0.0` → `1.1.0`（minor bump，因引入新概念）

## 关键决策

| # | 决策 | 理由 |
|---|------|------|
| 1 | 本仓 .ys_team/templates/spec.md 不做结构同步 | Style Ban #6（不顺手动别人的代码）；结构差异是历史遗留，与本 spec 无关 |
| 2 | grill 子模式步骤编号用 "1.5"（非 1a / 子项）| spec.md D3 显式声明 |
| 3 | overview.md 新章节插入位置：「Spec 最小定义」后、「角色与记忆」前 | 反馈环紧贴 spec 概念；领域语言层紧贴反馈环；不重排既有章节 |
| 4 | methodology VERSION bump 到 1.1.0（非 1.0.1）| 引入新概念（Feedback Loop / glossary），属 minor 级方法论扩展，不是 patch |
| 5 | 本仓 glossary.md 直接登记真实术语而非空骨架 | 本仓自己用 ys-team 管 ys-team，立刻可用作示例 |
| 6 | reality.md 末尾追加「领域语言」段（不嵌入「模块概览」）| 两者职责不同（结构 vs 语言），独立段更清晰 |

## 阻塞 / 例外

无。

## reviewer Note（spec-review 阶段提出）处理

| Note | 处理 |
|------|------|
| 1 | 旧 active spec（baseline-status / baseline-visible-marker）不并入本轮 — 已显式记入 evidence/release-checklist.md 的"非本轮 spec"段 |
| 2 | AC-09 用 `git show main:docs/methodology/VERSION` 比对，依赖 main 版本 — 实测 main = 1.0.0，本仓 = 1.1.0，AC-09 通过；evidence 已固化两值便于复核 |
| 3 | 方法论 VERSION bump 后旧基线项目 rebuild 收到迁移提示 — reference.md 已记 1.1.0 含义；旧基线 rebuild 行为属 ys-team-init 阶段，本 spec 不动 |
| 4 | D5 methodology VERSION 由 spec-work 决定 — 已决定 1.1.0，理由记入「关键决策 #4」 |

## Verification 自检结果（AC-01 ~ AC-09，spec-work 阶段范围）

| AC | 结果 | 证据 |
|----|------|------|
| AC-01 | PASS | 3 处 spec.md 模板均含 `### Feedback Loop` |
| AC-02 | PASS | 3 处 glossary.md 均存在且非空、含 `## 术语` |
| AC-03 | PASS | 3 处 reality.md 均含 `## 领域语言` |
| AC-04 | PASS | spec-talk SKILL.md 含 glossary 加载、`1.5 grill 检查`、`## Grill 子模式` 段 |
| AC-05 | PASS | spec-work SKILL.md 含 Feedback Loop 加载、必填校验、`4.5 校验` 步骤 |
| AC-06 | PASS | 2 个 SKILL.md 的 wrapper 与 description 中 `Use when` 触发短语保持 |
| AC-07 | PASS | overview.md 新增「反馈环纪律」与「领域语言层」两段 |
| AC-08 | PASS | reference.md 含 `### Feedback Loop 子段` + 文件清单含 `glossary.md` |
| AC-09 | PASS | methodology VERSION：1.0.0 → 1.1.0 |

AC-10 ~ AC-15 由 close 阶段验证（版本号 bump、npm publish、归档、合 main、tag、push）。
AC-16（本 spec 自身 Feedback Loop）见下。

## Feedback Loop（本 spec 自身复现成本）

- **命令**：本目录 evidence/ac-verification.sh（即 spec.md Verification 段 AC-01~09 部分）
- **期望信号**：每个 AC 输出 "OK"
- **声明复现成本**：60 秒（含 close 阶段 ~30 秒 npm 调用）
- **本阶段实际**：~5 秒（spec-work 阶段 AC-01~09，bash 脚本一次跑完，无网络调用）
- **偏离说明**：远低于声明上限，属正常（spec-work 阶段不含 npm 调用，复现成本天然更低）

## 下一步

- qa 阶段独立验证 AC-01~09 + 抽查 wrapper 完整性 + 挑战 N/A 类 Feedback Loop
- qa PASS 后进入 close 阶段：4 处版本号 bump + npm publish + 双 spec 合并归档 + main 合回 + tag + push
