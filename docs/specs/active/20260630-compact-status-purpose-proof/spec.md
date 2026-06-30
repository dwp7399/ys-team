---
Spec-Type: control
Initiative: 20260630-compact-status-purpose-proof
Status: active
Owner-Session: codex
Write-Scope:
  - AGENTS.md
  - CLAUDE.md
  - README.md
  - docs/guide/getting-started.md
  - docs/guide/examples.md
  - docs/methodology/overview.md
  - docs/methodology/reference.md
  - docs/methodology/VERSION
  - docs/project/module-index.md
  - package.json
  - .ys_team/VERSION
  - .ys_team/rules.md
  - .ys_team/status.md
  - .ys_team/history/README.md
  - .ys_team/templates/spec.md
  - .ys_team/templates/checklist.md
  - examples/baseline/AGENTS.md
  - examples/baseline/CLAUDE.md
  - examples/baseline/CHANGELOG.md
  - examples/baseline/.ys_team/VERSION
  - examples/baseline/.ys_team/rules.md
  - examples/baseline/.ys_team/status.md
  - examples/baseline/.ys_team/templates/spec.md
  - examples/baseline/.ys_team/templates/checklist.md
  - skills/ys-team/SKILL.md
  - skills/ys-team-spec-talk/SKILL.md
  - skills/ys-team-spec-work/SKILL.md
  - skills/ys-team-init/SKILL.md
  - skills/ys-team/baseline/AGENTS.md
  - skills/ys-team/baseline/CLAUDE.md
  - skills/ys-team/baseline/CHANGELOG.md
  - skills/ys-team/baseline/.ys_team/VERSION
  - skills/ys-team/baseline/.ys_team/rules.md
  - skills/ys-team/baseline/.ys_team/status.md
  - skills/ys-team/baseline/.ys_team/templates/spec.md
  - skills/ys-team/baseline/.ys_team/templates/checklist.md
  - docs/specs/queued/20260630-compact-status-purpose-proof/
  - docs/specs/active/20260630-compact-status-purpose-proof/
  - docs/specs/archive/20260630-compact-status-purpose-proof/
Delete-Scope: []
Depends-On: []
Verification: "见 ## 验收"
---

# 短 Status 与目的-验收证明增强

## 意图

把本轮讨论收敛成一次小版本方法论增强：让 ys-team 的常驻上下文更短，把任务过程留在 spec/evidence，把可复用经验留在 memory；同时在 verifier 卡中加入“目的与验收证明”结构，让复杂改动先证明用户目标，而不是只证明文件已改。

本轮还补充轻量 skill 分层口径和 curated examples，用示例帮助使用者理解 direct / patch / spec、本地 SOP 和 verifier-first 的实际写法。

## 用户确认范围

- status 要更短：任务日志在 spec 里，项目经验在 memory 里，status 只做当前仪表盘。
- “目的与验收”逻辑可以落地，作为 verifier 卡增强。
- “证据边界”暂不单独形成新概念，只允许在 QA/示例里自然表达“证明了什么 / 未证明什么”。
- Codex hook 暂不处理；不新增 hook 文档、不移动 hook 模板、不默认安装 hook。
- 对比 GitHub 同类项目后的取舍：保留 ys-team 轻量治理，不学习重型全流程；吸收短上下文、目的-证明绑定、小而可组合 skill、curated examples。

## 非目标

- 不新增新的核心 skill。
- 不引入 AGENTS / Codex hook 默认安装或项目 hook 机制。
- 不恢复旧角色池、五角圆桌、强制尾标或重状态机。
- 不把 ai-gateway provider/model 业务知识写入通用方法论。
- 不把 “证明边界 / readiness / live-ready” 作为新的 ys-team 核心术语。
- 不修改 CLI 行为或 `scripts/hooks-template.json`。

## 设计判断

### 短 status

`status.md` 的定位收窄为当前仪表盘：

- 活跃项和 queued 项只保留当前判断与一句目的。
- 最新判断固定为最近 5 条。
- 完整过程、命令输出、QA 结论和发布证据进入对应 spec 的 `work.md`、`qa-report.md`、`evidence/`。
- 可复用经验进入 `.ys_team/memory/*.md`，不留在 status。

### 目的与验收证明

复杂 spec 增加可选但推荐的结构：

```markdown
## 目的与验收证明

| 目的 | 验收证明 |
|------|----------|
| 用户真正想达成的结果 | 什么证据证明它达成 |
```

规则：

- 目的不能写成“改某文件”或“新增某字段”这类实现动作。
- 验收证明必须是可观察结果、命令断言、人工脚本或明确降级理由。
- 它不替代 `人等价验收脚本` 和 `Feedback Loop`；它负责把目标与 verifier 对齐。

### Skill 分层

只补文档口径，不改变 skill 结构：

- 用户入口 skill：`ys-team`、`ys-team-init`、`ys-team-spec-talk`、`ys-team-spec-work`。
- 项目本地 discipline / SOP：TDD、debug、domain glossary、provider integration 等项目内可复用路径。
- agent 自动加载：命中项目本地 SOP 时读取本地规则、references 或 repo-local skill；不要求用户手动选择内部工作流。

### Curated examples

新增使用者向示例，优先展示：

- 小 patch：为什么不进 spec、怎么说明最小验证。
- 中等 spec：如何写目的-验收证明矩阵、Feedback Loop 和最终验收。
- 项目本地 SOP：高频任务如何从 memory / checklist / repo-local skill 沉淀。

示例必须短，不变成第二套方法论文档。

## Write-Scope

- `README.md`：更新日常使用与文档地图，指向短 status、目的-验收证明和 examples。
- `docs/guide/getting-started.md`：说明 status / spec / memory 分工，补充使用者如何开始用目的-验收证明。
- `docs/guide/examples.md`：新增 curated examples。
- `docs/methodology/overview.md`、`docs/methodology/reference.md`：定义短 status、目的-验收证明、skill 分层口径和结构 lint。
- `docs/methodology/VERSION`：方法论版本升级到 `2.1.0`。
- `docs/project/module-index.md`：同步 docs/guide 和 `.ys_team/status.md` 职责变化。
- `package.json`、`.ys_team/VERSION`、baseline VERSION 双副本：npm 发布线升级到 `1.0.2`。
- `.ys_team/rules.md`、baseline rules 双副本：固化短 status 和目的-验收证明规则。
- `.ys_team/status.md`、baseline status 双副本：改为短仪表盘格式，最新判断最多 5 条。
- `.ys_team/templates/spec.md`、baseline spec template 双副本：加入 `目的与验收证明`。
- `.ys_team/templates/checklist.md`、baseline checklist 双副本：加入 status 短上下文和目的-验收证明检查项。
- `examples/baseline/AGENTS.md`、`CLAUDE.md` 与 skill baseline 同步副本：托管块中更新 verifier 卡重心与 status 分工。
- `examples/baseline/CHANGELOG.md` 与 skill baseline 同步副本：记录 1.0.2 变更。
- `skills/ys-team*.md`：更新路由、spec-talk、spec-work、init/rebuild 口径，确保新模板与短 status 规则可执行。
- `docs/specs/queued|active|archive/20260630-compact-status-purpose-proof/`：保存 spec、work、QA 和 evidence。

## 验收

### 保真度等级

L1。

理由：本轮是 Markdown-first 方法论、模板和 skill 文案更新，可以通过静态结构检查、关键词检查、反向关键词、baseline 双副本 diff、版本一致性和 `npm pack --dry-run` 验证。没有 UI、运行时服务或真实外部集成。

### 核心目的与验收证明

| 目的 | 验收证明 |
|------|----------|
| 降低常驻上下文噪音，让 agent 每次读到当前判断，而不是任务流水账 | `.ys_team/status.md` 与 baseline status 都声明只做当前仪表盘；最新判断不超过 5 条；任务过程、QA、发布证据分别落在 spec 的 `work.md` / `qa-report.md` / `evidence/` |
| 让 verifier 卡先证明用户目标，而不是只证明文件被改过 | 本地和 baseline spec template 都包含 `## 目的与验收证明`；`ys-team-spec-talk` 的 Structure Lint 要求目的不能是实现动作、证明必须可观察；`docs/guide/examples.md` 给出正反例 |
| 保持 ys-team 轻量，不把调研到的重流程照搬进核心 | README / methodology 仍只强调 `direct / patch / spec`、三道闸、5 个用户概念；没有新增核心 skill、阶段、命令或强制工作流 |
| 让项目本地 SOP / discipline 的边界更清楚 | overview/reference/getting-started 说明用户入口 skill 和项目本地 SOP / repo-local skill 的区别；业务知识留项目本地，不写进通用 baseline |
| 让新用户能通过短例子学会怎么用，而不是读完整方法论文档 | `docs/guide/examples.md` 包含 direct/patch、目的-验收证明、本地 SOP 三类例子；README 和 getting-started 能发现这个入口 |

### 边界证明

| 边界 | 证明方式 |
|------|----------|
| 不处理 hook | `scripts/hooks-template.json` 未改；公开文档不出现 `SessionStart`、`Stop hook`、`Codex hook` 默认安装说明 |
| 不引入“证据边界 / readiness”新术语 | 公开方法论、baseline、skills 不出现 `readiness`、`live-ready`、`config-ready`、`证明边界` 作为规则 |
| 不破坏 baseline 分发一致性 | `diff -qr examples/baseline skills/ys-team/baseline` 无输出 |
| 不破坏版本和 npm 包 | `package.json` / baseline VERSION 为 `1.0.2`，methodology 为 `2.1.0`；`npm pack --dry-run` 通过 |
| 不把历史证据删掉 | 只缩短 `.ys_team/status.md`；历史 spec、work、qa-report、evidence 文件仍保留 |

### 人等价验收脚本

1. 模板与规则检查
   - 命令：
     `rg -n "目的与验收证明|最新判断.*5|任务日志.*spec|项目经验.*memory|短仪表盘|skill 分层|用户入口 skill|项目本地.*SOP|curated examples" README.md docs/guide docs/methodology .ys_team examples/baseline skills`
   - 输入：更新后的文档、模板、skills。
   - 期望：README、getting-started、examples、methodology、rules、templates、skills 和 baseline 双副本均有对应口径。
   - 复现成本：< 5 秒。

2. 反向检查
   - 命令：
     `if rg -n "SessionStart|Stop hook|Codex hook|live-ready|config-ready|readiness|证明边界|status-events.log" README.md docs/guide docs/methodology .ys_team examples/baseline skills; then exit 1; fi`
   - 输入：本轮允许修改的公开文档、模板和 skill。
   - 期望：不出现被排除的 hook 默认安装口径或未采纳术语。
   - 复现成本：< 5 秒。

3. status 固定窗口
   - 命令：
     `awk 'BEGIN{insec=0} /^## 最新判断/{insec=1; next} /^## /{if(insec){insec=0}} insec && /^\\| 20[0-9][0-9]-/{count++} END{if(count>5){print count; exit 1}; print count}' .ys_team/status.md examples/baseline/.ys_team/status.md skills/ys-team/baseline/.ys_team/status.md`
   - 输入：本仓 status 与 baseline status 模板。
   - 期望：三份文件均不超过 5 条最新判断。
   - 复现成本：< 5 秒。

4. baseline 双副本一致
   - 命令：`diff -qr examples/baseline skills/ys-team/baseline`
   - 输入：baseline 双副本。
   - 期望：无输出。
   - 复现成本：< 5 秒。

5. 版本与打包
   - 命令：
     `node -e "const fs=require('fs'); const pkg=JSON.parse(fs.readFileSync('package.json','utf8')); const versions=['.ys_team/VERSION','examples/baseline/.ys_team/VERSION','skills/ys-team/baseline/.ys_team/VERSION'].map(p=>fs.readFileSync(p,'utf8').trim()); if(pkg.version!=='1.0.2'||versions.some(v=>v!=='1.0.2')){console.error(pkg.version, versions); process.exit(1)}; if(fs.readFileSync('docs/methodology/VERSION','utf8').trim()!=='2.1.0') process.exit(1)"`
     `npm pack --dry-run`
   - 输入：版本文件和 npm package。
   - 期望：版本一致，pack dry-run 成功。
   - 复现成本：< 30 秒。

如无法执行 `npm pack --dry-run`，必须说明原因；不能声明 release-ready。

### Feedback Loop

最快 pass/fail 信号：

```bash
rg -n "目的与验收证明|最新判断.*5|任务日志.*spec|项目经验.*memory" README.md docs/methodology .ys_team/templates/spec.md examples/baseline/.ys_team/templates/spec.md skills/ys-team/baseline/.ys_team/templates/spec.md skills/ys-team-spec-talk/SKILL.md
```

期望信号：README、方法论、三份 spec template 和 spec-talk skill 都命中。

复现成本：< 5 秒。

## 交付清单

- [ ] status 短仪表盘规则落地。
- [ ] 目的与验收证明矩阵落地。
- [ ] skill 分层口径落地。
- [ ] curated examples 落地。
- [ ] README / Getting Started / 方法论 / skill 文案同步。
- [ ] baseline 双副本全量一致。
- [ ] 版本文件升级到 `1.0.2` / `2.1.0`。
- [ ] `npm pack --dry-run` 通过。
- [ ] 发布 gate：npm publish、合回 main、tag、push。

## 依赖 / 风险

- 依赖：无外部服务依赖；release close 依赖 npm 登录状态和 git remote 权限。
- 风险：概念继续膨胀。缓解：不新增“证据边界”术语，不引入 hook，不新增核心 skill。
- 风险：baseline、本仓 `.ys_team` 和 skill baseline 三份模板漂移。缓解：`diff -qr` 与关键词检查。
- 风险：status 被误删成没有判断依据。缓解：status 只删过程日志，spec/work/qa/evidence 保留任务历史。
- 回滚：回退上述文档、模板、skill 和版本文件；删除本 spec 目录或迁入 cancelled。
