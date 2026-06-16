# ys-team 规则参考

本文档是 ys-team v1.0 的规则细节。overview.md 讲理念，本文件讲执行判据。

## 状态模型

ys-team 仍保留 spec 生命周期目录，但阶段语义更轻：

| 目录 | 语义 |
|------|------|
| `queued/` | verifier 卡已起草，等待结构 lint 或独立审阅 |
| `active/` | 已进入执行主链，承载 spec-work、qa、close |
| `completed/` | close 刚完成后的短暂停留区 |
| `archive/` | 历史长期归档 |
| `cancelled/` | 明确终止 |

默认流转：

```text
grill / spec-talk -> spec-review -> spec-work loop -> qa -> close
```

阶段名称只服务内部编排。用户不需要选择阶段。

## 路由规则

路由按“不可逆性 × 不确定性”判断。

| 类型 | 判定 | 要求 |
|------|------|------|
| trivial | 可逆、低风险、意图明确、验收显然 | 直接执行；说明最小验证 |
| patch | 范围清楚、影响有限、快速 verifier 足够 | 执行并留痕；跑验证 |
| spec | 不可逆、高不确定性、跨边界、验收不清 | 先产出 verifier 卡 |

降级必须能说明：

- 为什么风险可逆
- 为什么 Write-Scope 清楚
- 为什么现有 verifier 足够判断成败

无法说明时走 spec。

## Verifier 卡 Schema

spec.md 使用 YAML frontmatter + Markdown body。

### Frontmatter

| 字段 | 必需 | 说明 |
|------|------|------|
| Spec-Type | 是 | `control` 或 `patch` |
| Initiative | 是 | `YYYYMMDD-name` |
| Status | 是 | `draft` / `reviewed` / `in-progress` / `done` / `cancelled` |
| Write-Scope | 是 | 允许修改的文件或目录 |
| Delete-Scope | 否 | 允许删除的文件或目录 |
| Depends-On | 否 | 依赖的 spec |
| Verification | 是 | 指向 Verification 段 |

### Body

必需段落：

- 意图
- 非目标
- Write-Scope
- 验收
- 交付清单
- 依赖 / 风险

验收段必须包含：

- 保真度等级
- 人等价验收脚本，或无法达到 L3/L2 的理由
- Feedback Loop

兼容旧 spec 时，可以保留 Background、Goals、Deliverables、Acceptance Criteria 等标题，但必须能映射到 verifier 卡字段。

## 验收保真度

| 级别 | 定义 | 可接受证据 |
|------|------|------------|
| L3 人等价 | 真实输入、点击、上游调用或运行环境 + 断言 | Playwright、真实 CLI 探针、真实服务调用加事件断言 |
| L2 行为测试 | 覆盖真实业务路径，但不完全等价真人操作 | API 集成测试、服务级端到端、adapter 行为测试 |
| L1 单测+编译 | 单元测试、类型检查、构建、静态检查 | test、build、lint、typecheck |
| L0 人工抽检 | 无充分自动信号，明确人工验证剩余项 | 人工步骤、截图、录屏、抽检记录 |

规则：

- 每个 spec 必须声明 L3/L2/L1/L0。
- L0/L1 必须写明降级理由和剩余风险。
- **UI/交互类 < L2 默认 REJECT**。
- 关键业务流、支付、权限、数据迁移、发布链路等高风险场景优先追求 L3 或 L2。
- 文档/模板类改动通常可以是 L1，但不能夸大为真实业务通过率。

## Feedback Loop

`Feedback Loop` 是 agent 在 spec-work 中最频繁运行的 pass/fail 信号。

字段：

| 字段 | 说明 |
|------|------|
| 命令或步骤 | 可直接执行的命令或明确操作 |
| 期望信号 | 退出码、输出片段、断言结果 |
| 复现成本 | 目标 < 30 秒 |

如果写 `N/A`，必须说明为什么没有快速信号，以及最终验收如何兜底。

## 结构 Lint

进入 spec-work 前检查：

- Write-Scope 非空。
- Delete-Scope 覆盖所有删除行为。
- 每个 Deliverable / 交付清单项能追溯到 Write-Scope。
- 验收声明 L3/L2/L1/L0。
- UI/交互类没有低于 L2。
- Feedback Loop 可运行，或 N/A 理由成立。
- 文档同步项已列入 Write-Scope。
- 发布、迁移、数据、权限等不可逆风险已写入。

v1.0 的结构 lint 是文档化必检规则。审阅者发现不满足时直接 REJECT，不需要五角色圆桌补漏。

## Spec-Review

审阅者只看制品，不看实现推理过程。

必须检查：

- 意图与非目标清楚
- Write-Scope / Delete-Scope 完整
- 验收保真度等级合理
- Feedback Loop 真实可运行
- 交付清单覆盖项目本地 SOP
- AC / Verification 能挡住主要失败模式
- 对高风险工作是否需要跨模型对抗审阅

关键、不可逆、安全、多模块改动建议跨模型审阅。trivial 和低风险 patch 可跳过。

## Spec-Work Loop

执行规则：

1. 读取 spec.md，确认已通过审阅且当前在 release/work 分支。
2. 建立原生 todo，按一个原则或一个机制推进。
3. 每个小闭环先跑 Feedback Loop，红了继续改。
4. 最终跑 Verification，未全绿不得声明完成。
5. 维护 `work.md`：关键决策、偏差、验证进度。
6. 收集 evidence：命令输出、日志、截图、人工抽检记录或发布证据。

scope 外改动必须停下，回到 spec-talk 或请求用户确认。

## QA

QA 不重复实现过程，只验证结果：

- AC 逐项检查
- Verification 命令执行
- evidence 完整性
- L0/L1 降级理由是否诚实
- UI/交互是否达到至少 L2
- 文档、baseline、版本线是否同步

QA 可以 PASS、REJECT 或 BLOCKED。REJECT 回到 spec-work；BLOCKED 需要用户或外部条件。

## Close

close 是项目本地发布 gate。ys-team 本仓使用 release-first：

1. 三条版本线检查：npm `package.json`、baseline `.ys_team/VERSION`、`docs/methodology/VERSION`。
2. baseline 双副本全量一致。
3. `npm pack --dry-run`。
4. `npm publish`，并维护 npm dist-tag。
5. 合回 `main`，打 git tag，push main + tag。
6. 更新 status，归档 spec。

外部项目应在 verifier 卡的交付清单里写自己的发布 gate。

## `.ys_team/` 文件语义

| 文件 | 语义 |
|------|------|
| `config.yaml` | 轻量策略开关：模式、输出模式、默认验收门槛、是否启用跨模型审阅 |
| `rules.md` | 项目行为边界 |
| `reality.md` | 约束与风险地图，不复述目录树 |
| `glossary.md` | 术语表 |
| `status.md` | 当前快照 |
| `templates/spec.md` | verifier 卡模板 |
| `templates/checklist.md` | 项目交付清单模板 |
| `templates/questions.md` | 文件化 grill 问卷模板 |
| `memory/` | 项目错题本 |
| `history/` | 低频历史归档 |

不再默认生成 `role-pool.yaml`、治理槽位绑定或按人格拆分的角色记忆。

## config.yaml Schema

```yaml
mode: manual
output_mode: technical
verification:
  default_min_level: L1
  ui_min_level: L2
  require_feedback_loop: true
  allow_l0_with_reason: true
review:
  cross_model_adversarial: optional
  trivial_skip: true
max_retries: 2
```

字段说明：

- `mode`：`manual` / `semi-auto` / `full-auto`，只影响阶段是否自动继续。
- `output_mode`：`technical` / `friendly`。
- `verification.default_min_level`：默认最低验收等级。
- `verification.ui_min_level`：UI/交互最低验收等级，默认 L2。
- `verification.require_feedback_loop`：是否要求 Feedback Loop。
- `review.cross_model_adversarial`：`off` / `optional` / `required`。
- `max_retries`：REJECT 后最多重试次数。

## 项目错题本

路径：`.ys_team/memory/`

推荐按领域命名：

- `verification.md`
- `release.md`
- `ui-interaction.md`
- `data-migration.md`

格式：

```markdown
# <领域> 错题本

## 当前高风险模式

- ...

## 条目

### <日期> <简述>

- 错误模式：...
- 正确做法：...
- 适用场景：...
```

只记录可复用模式，不写流水账，不按人格分文件。

## 初始化与 Rebuild

init 生成最小 baseline：

- `.ys_team/config.yaml`
- `.ys_team/rules.md`
- `.ys_team/reality.md`
- `.ys_team/glossary.md`
- `.ys_team/status.md`
- `.ys_team/VERSION`
- `.ys_team/templates/`
- `.ys_team/history/`
- `.ys_team/memory/`
- `docs/specs/`
- `AGENTS.md` / `CLAUDE.md`（如不存在；如存在则更新 `ys-team:managed` 托管块）

rebuild 原则：

- 保留本地定制。
- 只更新确实需要变化的模板和版本。
- reality 从结构地图瘦身为约束与风险地图。
- 检测旧 `role-pool.yaml`、`governance_slots`、`slot_bindings`、按角色记忆文件时提示迁移到 v1。
- 检测 `AGENTS.md` / `CLAUDE.md` 旧入口口径，并只替换 `ys-team:managed` 托管块或可识别的旧 ys-team 段落。
- 不把项目业务知识写回通用 baseline。

### AGENTS / CLAUDE 托管块

`AGENTS.md` / `CLAUDE.md` 里的 ys-team 入口使用托管块维护：

```markdown
<!-- ys-team:managed:start version=1.0.1 -->
...
<!-- ys-team:managed:end -->
```

升级时只替换托管块，托管块外的项目本地规则保留。若旧项目没有托管块，rebuild 或 `init-project` 应替换可识别的旧 ys-team 入口段；无法安全识别时，在标题后插入托管块并提示用户清理旧 L0/L1/L2、固定尾标或 role/slot 口径。

## 讨论协议

### Grill

需求模糊时先问用户，不急着产出 spec。

文件化 grill 使用 `questions.md`，适用于问题超过 5 个或横跨多个维度。进入 spec 前必须达到：

- 目标清楚
- 非目标清楚
- 关键行为清楚
- 验收方式清楚
- Write-Scope 可估计

### 结果状态

响应可以用结果状态尾缀帮助用户判断：

```text
spec 卡已签 · loop 3/5 验收项过 · 未全绿
```

尾缀不是强制合规标记。真正的完成条件是 verifier 和 evidence。

## 文档同步

实现变化时，相关文档必须同次更新：

- 方法论变化 → `docs/methodology/`、skills、baseline、README/guide
- 发布入口变化 → root `AGENTS.md` / `CLAUDE.md`、CLI help
- baseline 变化 → `examples/baseline/` 与 `skills/ys-team/baseline/` 全量一致
- 项目现实变化 → `docs/project/module-index.md` 或项目本地 reality

## 版本管理

| 版本 | 文件 | 语义 |
|------|------|------|
| npm | `package.json` | 发布包版本 |
| baseline | `.ys_team/VERSION` | 项目本地基线版本 |
| methodology | `docs/methodology/VERSION` | 方法论规范版本 |

v1.0.1 本仓三条线分别为 npm 1.0.1、baseline 1.0.1、methodology 2.0.0。
