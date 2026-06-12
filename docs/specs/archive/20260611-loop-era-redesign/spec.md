---
Spec-Type: control
Initiative: 20260611-loop-era-redesign
Status: done
Owner-Session: work/20260611-loop-era-redesign
Write-Scope:
  - AGENTS.md
  - CLAUDE.md
  - docs/methodology/overview.md
  - docs/methodology/reference.md
  - docs/methodology/VERSION
  - docs/project/module-index.md
  - skills/ys-team/SKILL.md
  - skills/ys-team-spec-talk/SKILL.md
  - skills/ys-team-spec-work/SKILL.md
  - skills/ys-team-init/SKILL.md
  - examples/baseline/.ys_team/
  - examples/baseline/AGENTS.md
  - examples/baseline/CLAUDE.md
  - examples/baseline/CHANGELOG.md
  - skills/ys-team/baseline/
  - docs/guide/why-ys-team.md
  - docs/guide/getting-started.md
  - README.md
  - package.json
  - scripts/ys-team.mjs
  - .ys_team/status.md
  - docs/roadmap/active/v1.0-loop-era-redesign.md
  - docs/roadmap/completed/v1.0-loop-era-redesign.md
  - docs/specs/queued/20260611-loop-era-redesign/
  - docs/specs/active/20260611-loop-era-redesign/
  - docs/specs/archive/20260611-loop-era-redesign/
Delete-Scope:
  - examples/baseline/.ys_team/role-pool.yaml
  - examples/baseline/.ys_team/templates/monthly-summary.md
  - skills/ys-team/baseline/.ys_team/role-pool.yaml
  - skills/ys-team/baseline/.ys_team/templates/monthly-summary.md
  - docs/roadmap/active/v1.0-loop-era-redesign.md # close 时迁入 completed 后删除 active 副本
Depends-On: []
Verification: "见 ## Verification"
---

# ys-team v1.0:Loop Era 换代

## Background

ys-team 设计于 prompt engineering 时代,用过程层流程仪式(强制 marker、五角圆桌、四制品、每阶段暂停确认)约束 agent。进入 loop engineering 时代后,Claude Code / Codex 原生具备 observe→plan→act→verify→repeat 的自循环能力,这套流程仪式出现系统性错配:

- agent 已自带的能力(plan、读码、测试反馈、自我纠错)仍被重流程强制 → 纯 token/注意力税。
- agent 供给不了的能力(跨会话记忆、人类级验收、硬约束)投入不足 → 漏。

两项目实测验证了错配的代价:
- jarvis `todo-outline-editor`:全流程走完、marker 齐全、`cargo test + npm build` 全绿,交付后仍出 3 个 user-reported bug(粘贴失败、Enter/Tab 不可用、Markdown 解析失败)。验收信号(单测+编译)不保真。
- jarvis `codex-agent-drawer`:验收用真实 codex exec 探针 + JSONL 事件断言(人等价),一次通过。
- ai-gateway:20% spec 被 REJECT 后重写(6/30),典型理由"Write-Scope 缺、验收不清"——机械可检的结构问题;五角圆桌中只有"挑战者"抓到真 bug,其余四角贡献是补漏项。

完整分析与四个参考项目(obra/superpowers、mattpocock/skills、garrytan/gstack、karpathy-skills)对比见 `docs/roadmap/active/v1.0-loop-era-redesign.md`。

## Goals

把工程重量从"约束执行过程的流程仪式",搬迁到"供给一个人类级保真、且能在 agent loop 内自跑的退出判定(verifier)";流程结构降到能托住该 verifier 的最小集。

具体达成:
1. 建立验收保真度分级标准(L3/L2/L1/L0),作为系统中枢。
2. 用"三道闸 + 软约束"替代排他规则(强制 marker + 禁用其他 skill)。
3. Spec 制品塌缩为一张 verifier 卡 + 结构 lint 前置。
4. 五角圆桌降为一个跨模型对抗审阅。
5. `.ys_team/` 从治理中心瘦身为跨会话记忆层;角色记忆拍平为项目错题本。
6. CheckList 拆为"流程打勾(折叠进原生 todo)"与"交付清单(并入 verifier 卡)"。
7. 尾缀从合规标记改为结果状态,去掉强制机制。

## Integration Gate

实现期间必须保持的轻量约束。

- 用户不需要选择内部工作流;本 spec 负责承载必要的讨论、执行、验证和收口约束。
- v1 原地替换现有 `ys-team` / `ys-team-*` skill;旧版仅通过 npm `legacy` tag 保留,不在同一包内新增 `ys-team-v1` / `ys-team-legacy` 双 skill。
- spec-review PASS 后先切到 release/work 分支,再进入 spec-work。
- close 前必须完成本仓 release-first 发布 gate(版本一致性、npm pack/publish、合回 main、tag、push)。
- 本 spec 改动量大,强制小步推进:一个原则/一个机制为一个实现闭环,各自带验证。
- baseline 双副本(`examples/baseline/` 与 `skills/ys-team/baseline/`)必须同次同步,QA 校验全量一致。
- root `AGENTS.md` / `CLAUDE.md` 与 CLI help 属于发布入口,必须同步切到 v1 口径,不能保留排他/强制 marker/文件数判级。
- 三条版本线(npm package.json、baseline VERSION、methodology VERSION)按各自语义对齐。

## Non-goals

- 不下线 v0.x:旧版通过 npm legacy tag 保留,存量项目可继续使用。
- 不在同一 npm 包内维护两套 skill 名称;v1 包内现有 skill 原地升级。
- 不在本 spec 内实现 Playwright / Tauri 验收 harness 的具体代码(那属于下游项目);本 spec 只定义 verifier 分级标准和 harness 模板约定。
- 不迁移 ai-gateway / jarvis 的存量 spec(迁移是独立动作,本 spec 只产出迁移路径文档)。
- 不改变"装一次 + 项目变形重估一次"的用户操作模型。

## Deliverables

### D1:方法论换代(`docs/methodology/`)

- `overview.md`:四原则在 loop era 重新定位(逐条:保留/砍/改 + 实测依据);8 条 ban 重写为"入口闸 + 出口闸 + 可见性"三道闸;三级路由触发轴从"文件数/模块数"改为"不可逆性 × 不确定性";Spec 最小定义换成 verifier 卡;新增"验收保真度分级"章节(系统中枢);"角色与记忆"改为项目错题本(去人格壳)。
- `reference.md`:同步详细规则;补充 verifier 分级判定标准、结构 lint 规则、跨模型审阅触发条件。
- `VERSION`:methodology 版本从 1.3.0 升 2.0.0(破坏性换代)。

### D2:Skill 适配(`skills/`)

- `ys-team/SKILL.md`:去强制 marker 机制(缺失即切回的硬规则);路由按不可逆性/不确定性判级;讨论能力保留 grill、删五角圆桌默认开;Response Markers 改为可选的"结果状态尾缀"。
- `ys-team-spec-talk/SKILL.md`:grill 保留并前置;产出 verifier 卡(非旧四制品);Standard Flow 五角讨论改为"grill → 结构 lint → 可选跨模型审阅"。
- `ys-team-spec-work/SKILL.md`:执行核心改为"loop 内反复跑人等价验收,红了继续改、绿了才 done";验收保真度等级校验(UI 类 < L2 停止);去角色人格,读项目错题本。
- `ys-team-init/SKILL.md`:初始化 v1 baseline;角色记忆生成改为错题本;config 模板瘦身。

### D3:Baseline 换代(`examples/baseline/` + `skills/ys-team/baseline/` 双副本)

- `.ys_team/config.yaml`:砍五角/槽位绑定,只留验收策略开关(默认保真度门槛、是否启用跨模型审阅)。
- `.ys_team/templates/spec.md`:换成 verifier 卡模板(意图/非目标/Write-Scope/验收[含保真度等级 + 人等价脚本 + Feedback Loop]/交付清单/依赖风险)。
- `.ys_team/templates/checklist.md`:拆解——流程项移除(交给原生 todo),保留交付清单段。
- `.ys_team/templates/questions.md`:保留(grill 用)。
- `.ys_team/rules.md`:三道闸表述;去重。
- `.ys_team/reality.md`:模板改为"约束与风险地图"导向(注释引导只写硬约束,不复述结构)。
- `.ys_team/memory/`:模板从 `<role>.md` 改为项目错题本(领域标签)。
- 删除 `.ys_team/role-pool.yaml` 与 `.ys_team/templates/monthly-summary.md`:前者属于旧五角色/槽位系统,后者属于旧流程月报模板,均不进入 v1 baseline。
- `AGENTS.md` / `CLAUDE.md`:去排他、去强制 marker;加"非 trivial 走 verifier 卡 + 验收闸"软约束;加验收保真度要求。
- `CHANGELOG.md`:记录 v1.0 换代。

### D4:用户文档(`docs/guide/` + `README.md`)

- `why-ys-team.md`:四原则 loop era 版本;"为什么不再排他"。
- `getting-started.md`:新使用方式(grill → 签 verifier 卡 → loop 自跑 → 抽检证据);两个真决策点。
- `README.md`:概念从 20+ 压到 5(规则/约束地图/术语表/错题本/verifier 卡)。

### D5:版本线与 CLI(`package.json` + `scripts/ys-team.mjs`)

- npm 版本升 1.0.0(主版本换代)。
- legacy tag 策略:发布前把当前 latest(0.6.x 线)打 `legacy` tag,说明写入 CHANGELOG;v1 包内原地替换现有 skill 名。
- CLI help 去掉 L0/L1/L2 的"文件数/模块数"判级,改为 v1 使用方式:grill → verifier 卡 → loop 自跑 → 抽检证据,并说明路由按不可逆性 × 不确定性判断。

### D6:迁移路径(并入 `docs/roadmap/active/v1.0-loop-era-redesign.md`)

- 设计文档已含迁移路径(第六节);spec-work 阶段据实现结果校正,确保与最终 baseline 一致。

## Documentation Updates

- `docs/roadmap/active/v1.0-loop-era-redesign.md`:实现期间据实校正(分级标准、迁移时间估计、harness 约定),完成后迁 `completed/`。
- `docs/project/module-index.md`:如 baseline、skills、CLI 或发布入口结构发生变化,同步更新现实索引。
- `.ys_team/status.md`:各阶段留痕。
- `examples/baseline/CHANGELOG.md`:v1.0 条目。

## Project Local SOP Gate

命中本仓 release-first SOP。close 阶段必须:
1. 三条版本线一致性检查(npm package.json = baseline VERSION 的 npm 行;methodology VERSION 独立)。
2. baseline 双副本全量 diff 为空(`examples/baseline/` 与 `skills/ys-team/baseline/` 内容一致)。
3. `npm pack` dry-run 通过。
4. `npm publish`(新版打 latest,旧版补 legacy tag)。
5. 合回 main、打 git tag、push main + tag。

## Acceptance Criteria

- AC-01:`overview.md` 四原则均有"loop era 重新定位"段,每条标注保留/砍/改且引用实测依据;8 条 ban 已重写为三道闸结构。
- AC-02:`overview.md` 与 `reference.md` 均含"验收保真度分级"章节,定义 L3/L2/L1/L0 且明确"UI/交互类 < L2 默认 REJECT"。
- AC-03:三级路由触发轴在 overview.md、reference.md、SKILL.md 与 CLI help 中均已从"文件数/模块数"改为"不可逆性 × 不确定性"。
- AC-04:`ys-team/SKILL.md` 不再含"缺 marker 即视为脱离工作流、立刻切回"的强制表述;尾缀改为可选结果状态。
- AC-05:`ys-team-spec-talk/SKILL.md` 保留 grill 与 questions.md;Standard Flow 不再默认五角圆桌,改为 grill → 结构 lint →(可选)跨模型审阅。
- AC-06:`ys-team-spec-work/SKILL.md` 执行核心为"loop 内跑人等价验收,绿了才 done",含保真度等级校验。
- AC-07:baseline `templates/spec.md` 为 verifier 卡结构(含保真度等级 + 人等价验收脚本 + Feedback Loop + 交付清单),双副本一致。
- AC-08:baseline `config.yaml` 不再含五角色/governance_slots/slot_bindings;含验收策略开关。
- AC-09:baseline `memory/` 模板为项目错题本(领域标签),无 `<role>.md` 人格结构;baseline 不再含 `role-pool.yaml` 和 `templates/monthly-summary.md`。
- AC-10:baseline `AGENTS.md` / `CLAUDE.md` 无排他规则、无强制 marker;含 verifier 卡 + 验收闸软约束。
- AC-11:root `AGENTS.md` / `CLAUDE.md` 无排他规则、无强制 marker;与 baseline 入口口径一致。
- AC-12:`README.md` 用户心智概念为 5 个(规则/约束地图/术语表/错题本/verifier 卡);`docs/guide/` 两篇文档同步说明 v1 使用方式与"不再排他"边界。
- AC-13:`ys-team-init/SKILL.md` 与 `scripts/ys-team.mjs` 均反映 v1 baseline、项目错题本、verifier 卡和新路由轴。
- AC-14:三条版本线已升级(npm 1.0.0、baseline VERSION 双副本对齐、methodology 2.0.0)且一致性检查通过。
- AC-15:baseline 双副本全量 diff 为空(`examples/baseline/` 与 `skills/ys-team/baseline/`)。
- AC-16:结构 lint 已作为进入 spec-work 的前置检查写入 `reference.md`、`ys-team-spec-talk/SKILL.md` 和 baseline `templates/spec.md`;本 spec 不新增脚本,采用文档化必检规则。
- AC-17:legacy tag 策略已写入 `examples/baseline/CHANGELOG.md` 或 close report;close 证据能证明 npm `legacy` tag 指向 0.6.x 线、`latest` 指向 1.0.0。
- AC-18:设计文档迁移路径与最终 baseline 一致(无矛盾描述),完成后迁入 `docs/roadmap/completed/`。

## Verification

```bash
# 1. 反向关键词:确认排他/强制 marker 已移除
! grep -rn "缺失即视为未进入工作流\|立刻回到路由\|禁止自动触发\|缺少标记 → 视为未进入\|排他工作流\|缺 marker" \
  AGENTS.md CLAUDE.md scripts/ys-team.mjs skills/ examples/baseline/ skills/ys-team/baseline/

# 1b. 反向关键词:确认旧文件数/模块数判级不再出现在发布入口
! grep -rn "single file\|≤3 files\|单文件\|文件数/模块数\|single module" \
  scripts/ys-team.mjs skills/ys-team/SKILL.md docs/methodology/overview.md docs/methodology/reference.md

# 2. 正向关键词:确认新机制存在
grep -rn "验收保真度\|人等价验收\|不可逆性\|verifier" docs/methodology/overview.md docs/methodology/reference.md
grep -rn "L3\|L2\|L1\|L0" docs/methodology/overview.md docs/methodology/reference.md
grep -n "入口闸\|出口闸\|可见性" docs/methodology/overview.md
grep -rn "verifier 卡\|两个真决策点\|不再排他" README.md docs/guide/

# 3. config 反向:五角色/槽位已移除
! grep -rn "governance_slots\|slot_bindings\|challenger\|五角" \
  examples/baseline/.ys_team/config.yaml skills/ys-team/baseline/.ys_team/config.yaml

# 4. baseline 旧角色池/月报模板已移除
test ! -e examples/baseline/.ys_team/role-pool.yaml
test ! -e examples/baseline/.ys_team/templates/monthly-summary.md
test ! -e skills/ys-team/baseline/.ys_team/role-pool.yaml
test ! -e skills/ys-team/baseline/.ys_team/templates/monthly-summary.md

# 5. baseline 双副本全量一致
diff -r examples/baseline/ skills/ys-team/baseline/

# 6. 版本一致性
test "$(node -p "require('./package.json').version")" = "1.0.0"
test "$(cat examples/baseline/.ys_team/VERSION)" = "1.0.0"
test "$(cat skills/ys-team/baseline/.ys_team/VERSION)" = "1.0.0"
test "$(cat docs/methodology/VERSION)" = "2.0.0"

# 7. verifier 卡结构 lint
grep -n "意图\|非目标\|Write-Scope\|保真度等级\|人等价验收脚本\|Feedback Loop\|交付清单" \
  examples/baseline/.ys_team/templates/spec.md

# 8. npm 打包
npm pack --dry-run
```

### Feedback Loop

本 spec 改对了的最快 pass/fail 信号:反向关键词检查(排他/强制 marker 是否真被移除)+ baseline 双副本 diff 为空。

- 命令或步骤:运行 Verification 第 1 步(反向 grep)和第 5 步(`diff -r` 双副本全量一致)。
- 期望信号:第 1 步无输出(grep 未命中,`!` 取反后退出码 0);第 4 步无输出(diff 为空)。
- 复现成本:< 10 秒。

### 本 spec 自身的验收保真度等级

**L1(文档/配置类),诚实声明:** 本 spec 的交付物是方法论文档、skill 定义和 baseline 模板,属于文本契约,没有可运行的交互。验收靠关键词检查(正向/反向)+ 结构检查 + 双副本 diff,够到 L1。

更高保真度(L3 人等价)的验证在**下游**:v1.0 baseline 是否真能提高一次通过率,需在 ai-gateway / jarvis 试点迁移后,用真实 spec 落地数据验证。该验证不属于本 spec 的退出条件,作为后续 roadmap 项跟踪。这是本方法论"诚实标注保真度上界"原则的自我应用。

可接受的 evidence 类型:
- 静态检查:正向/反向关键词 grep、config 字段检查
- 结构检查:verifier 卡模板字段完整性、baseline 双副本 diff
- 构建:`npm pack --dry-run`、版本一致性
- 发布证据:`npm view ys-team dist-tags --json` 返回 `latest` = 1.0.0 且 `legacy` 指向 0.6.x 线

## Acceptance Evidence

`evidence/` 应留下:
- `keyword-checks.log`:正向/反向关键词检查输出
- `baseline-diff.log`:双副本全量 diff 结果
- `structure-lint-check.log`:verifier 卡模板字段与结构 lint 规则检查
- `version-consistency.log`:三条版本线检查
- `npm-pack.log`:打包 dry-run
- `dist-tags.log`:npm dist-tag 检查
- `close-report.md`:发布链路收口记录(npm publish、legacy tag、main 合回、tag、push)
