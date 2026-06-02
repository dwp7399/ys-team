---
Spec-Type: control
Initiative: 20260602-project-local-sop-assimilation
Status: active
Owner-Session: codex
Write-Scope:
  - README.md
  - docs/guide/getting-started.md
  - docs/methodology/overview.md
  - docs/methodology/reference.md
  - docs/project/module-index.md
  - docs/methodology/VERSION
  - package.json
  - .ys_team/VERSION
  - .ys_team/rules.md
  - .ys_team/templates/checklist.md
  - .ys_team/templates/spec.md
  - .ys_team/status.md
  - examples/baseline/CHANGELOG.md
  - examples/baseline/.ys_team/VERSION
  - examples/baseline/.ys_team/rules.md
  - examples/baseline/.ys_team/templates/checklist.md
  - examples/baseline/.ys_team/templates/spec.md
  - skills/ys-team/SKILL.md
  - skills/ys-team-spec-talk/SKILL.md
  - skills/ys-team-spec-work/SKILL.md
  - skills/ys-team-init/SKILL.md
  - skills/ys-team/baseline/CHANGELOG.md
  - skills/ys-team/baseline/.ys_team/VERSION
  - skills/ys-team/baseline/.ys_team/rules.md
  - skills/ys-team/baseline/.ys_team/templates/checklist.md
  - skills/ys-team/baseline/.ys_team/templates/spec.md
  - docs/specs/queued/20260602-project-local-sop-assimilation/
  - docs/specs/active/20260602-project-local-sop-assimilation/
  - docs/specs/archive/20260602-project-local-sop-assimilation/
Delete-Scope: []
Depends-On: []
Verification: "见 ## Verification"
---

# 项目本地 SOP 吸收机制

## Background

用户要求查看同级 `ai-gateway` 项目的 ys-team 落地实践，并判断本仓是否应更新。调研结论是：`ai-gateway` 的关键价值不是 provider/model 业务知识本身，而是把高频、领域强、容易漏项的项目工作沉淀为 repo-local SOP skill、references、rules 和 checklist gate。

已读取的现实证据：

- `../ai-gateway/.ys_team/rules.md`：模型/供应商接入类任务使用 repo-local `ai-gateway-model-integration` skill，且 close 前必须完成二次文档对照、最小成本验证、文档质量确认和 readiness evidence。
- `../ai-gateway/.ys_team/templates/checklist.md`：close 阶段增加条件式模型接入结果责任 gate。
- `../ai-gateway/docs/specs/completed/20260518-model-integration-skill-loop/spec.md`：明确“不把模型接入经验写进 ys-team 核心”，而是放到项目本地 SOP。
- `../ai-gateway/docs/specs/completed/20260529-doc-page-rewrite/review.md`：spec-review 打回点暴露了通用审阅缺口，包括旧 spec 吸收/依赖冲突、Data Contract 不够硬、多执行者写同一最终产物、验证过泛、rollback 不可操作和缺少可停止边界。

当前本仓已经有 L0/L1/L2、Feedback Loop、evidence 类型、角色记忆和 release-first close，但用户向文档和 baseline 对“项目本地 SOP 如何沉淀”说明不足。README 只说 ys-team 会吸收外部 workflow，方法论 reference 主要描述角色记忆，没有明确区分“角色记忆”和“项目本地 SOP”。

## Collaboration Summary

参与角色：方法论架构师、产品演进负责人、交付守门人。

轮次：1。

关键分歧：

- 是否直接把 `ai-gateway-model-integration` 迁入 ys-team 核心。结论：不采用。ys-team 保持通用治理，不携带 provider/model 业务知识。
- 是否恢复旧 toolbox/evolution 机制。结论：不采用。只定义 repo-local SOP 的边界、触发、沉淀位置和 close gate，不重建工具箱体系。
- 是否把项目本地 SOP 做成所有项目必选项。结论：不采用。baseline 只提供条件式占位；只有项目已形成高频风险工作时才启用。
- 是否要求每个 close 都写经验。结论：不采用流水账。只归纳可复用模式；无新经验时记录“已有总结覆盖，无需更新”。

## Goals

- 在方法论中新增“项目本地 SOP”概念：用于承接项目高频、领域强、漏项成本高的工作模式。
- 明确项目本地 SOP 与角色记忆的区别：角色记忆服务角色判断，项目本地 SOP 服务可重复交付路径和 close gate。
- 在 baseline rules/checklist/spec template 中加入通用占位，允许项目声明 repo-local SOP 及其条件式验收 gate。
- 强化 spec-review 检查项，吸收 `ai-gateway` 暴露的通用合同风险。
- 更新 README / getting-started，让用户知道 ys-team 可以把项目实践沉淀到本地，而不是把所有知识写进通用方法论。
- 更新 skills 的执行口径，使 spec-talk / spec-work 在发现高频项目风险时能建议本地 SOP，而不是静默写进角色记忆或核心文档。
- 保持方法论简洁，不引入新的用户必选命令，不改变 L0/L1/L2 分流。
- 按本仓 release-first 规则发布 0.6.5，并保持 baseline 双副本版本一致。

## Integration Gate

- 用户不需要选择内部工作流；本 spec 只更新 ys-team 的规则、模板、文档和 skill 口径。
- 项目本地 SOP 是可选机制，不得要求所有项目初始化后都创建 SOP。
- 不得复制 `ai-gateway` 的 provider/model 接入细节、readiness 具体枚举或 `/doc` fragment 路径到通用 baseline。
- baseline 可以给出通用占位和示例措辞，但不得把某个项目的路径写死为默认规则。
- spec-review PASS 后先切到 `work/20260602-project-local-sop-assimilation` 或 release 分支，再进入 spec-work。
- 本仓 close 必须完成 0.6.5 发布链路：版本一致、`npm pack`、`npm publish`、合回 main、tag/push 和归档。

## Non-goals

- 不重新引入已删除的 toolbox/evolution 机制。
- 不新增第五个 ys-team 核心 skill。
- 不实现自动生成 repo-local SOP skill 的脚本。
- 不修改外部 `ai-gateway` 项目。
- 不要求项目必须安装额外第三方 skill。
- 不改变 full-auto/semi-auto/manual 状态机。

## Deliverables

### 方法论文档

- `docs/methodology/overview.md`：新增项目本地 SOP 的简短概念说明，强调“通用治理在 ys-team，领域 SOP 在项目本地”。
- `docs/methodology/reference.md`：
  - 新增 Project Local SOP 规则段。
  - 明确 SOP 的沉淀条件、推荐位置、与角色记忆区别、close gate 形态。
  - 扩展 spec-review 检查项：依赖/吸收冲突、Data Contract、单写入/聚合协议、具体 evidence、rollback、可停止边界。
- `docs/methodology/VERSION`：作为新增方法论概念升级到 `1.3.0`。

### 用户文档

- `README.md`：在日常使用或工作流吸收段落中说明项目实践可以沉淀为 repo-local SOP，但不增加用户日常命令负担。
- `docs/guide/getting-started.md`：补充何时考虑本地 SOP、rebuild 如何保留本地定制、Python/Java 项目如何低成本开始使用。
- `docs/project/module-index.md`：同步文档职责变化。

### Baseline 与本仓本地规则

- `examples/baseline/.ys_team/rules.md` 与 `skills/ys-team/baseline/.ys_team/rules.md`：
  - 增加“项目本地 SOP”规则。
  - 明确本地 SOP 不改变 L0/L1/L2，且只在项目声明时触发。
- `examples/baseline/.ys_team/templates/checklist.md` 与 `skills/ys-team/baseline/.ys_team/templates/checklist.md`：
  - close 阶段增加条件式本地 SOP gate。
- `examples/baseline/.ys_team/templates/spec.md` 与 `skills/ys-team/baseline/.ys_team/templates/spec.md`：
  - 在 Integration Gate 或 Acceptance Evidence 附近加入可选 Project Local SOP Gate 提示。
- `.ys_team/rules.md`、`.ys_team/templates/checklist.md`、`.ys_team/templates/spec.md`：同步本仓本地 baseline 口径。

### Skills

- `skills/ys-team/SKILL.md`：路由/讨论说明中补充项目本地 SOP 的边界，不外显为用户必选命令。
- `skills/ys-team-spec-talk/SKILL.md`：spec-talk 收敛时，如发现高频项目风险，可建议 repo-local SOP，而不是写进 ys-team 核心。
- `skills/ys-team-spec-work/SKILL.md`：执行和 close 前检查项目本地 SOP gate。
- `skills/ys-team-init/SKILL.md`：rebuild 说明保留项目本地 SOP 定制，不覆盖本地 `.agents/skills` 或本地 rules gate。

### 发布线

- `package.json`、`.ys_team/VERSION`、`examples/baseline/.ys_team/VERSION`、`skills/ys-team/baseline/.ys_team/VERSION` 升级到 0.6.5。
- `examples/baseline/CHANGELOG.md` 与 `skills/ys-team/baseline/CHANGELOG.md` 增加 0.6.5 条目。

## Acceptance Criteria

- AC-01：方法论文档清楚定义“项目本地 SOP”，并说明它用于项目高频领域工作，不属于 ys-team 核心业务知识。
- AC-02：文档清楚区分角色记忆与项目本地 SOP：前者记录角色判断经验，后者承载可重复交付路径、references 和 close gate。
- AC-03：README / getting-started 告诉用户项目实践可沉淀到本地，且不需要用户手动选择额外工作流。
- AC-04：baseline rules 双副本均包含项目本地 SOP 规则，且明确不改变 L0/L1/L2。
- AC-05：baseline checklist 双副本 close 阶段均包含条件式本地 SOP gate。
- AC-06：baseline spec template 双副本包含可选本地 SOP gate 提示，不强制所有 spec 使用。
- AC-07：本仓 `.ys_team` 本地 rules/checklist/spec template 与发布 baseline 口径一致。
- AC-08：spec-review 检查项覆盖依赖/吸收冲突、Data Contract、单写入/聚合协议、具体 evidence、rollback 和可停止边界。
- AC-09：skills 文案能引导发现高频项目风险时沉淀 repo-local SOP，但不复制 `ai-gateway` provider/model 细节。
- AC-10：init/rebuild 口径明确保留项目本地 SOP 定制，不静默覆盖。
- AC-11：发布线版本文件对齐到 `0.6.5`；方法论版本对齐到 `1.3.0`。
- AC-12：Verification 命令和静态关键词检查能证明上述规则、模板、文档、skill 和版本均已同步。

## Verification

```bash
rg -n "项目本地 SOP|repo-local SOP|本地 SOP|领域 SOP" README.md docs/guide/getting-started.md docs/methodology/overview.md docs/methodology/reference.md skills/ys-team/SKILL.md skills/ys-team-spec-talk/SKILL.md skills/ys-team-spec-work/SKILL.md skills/ys-team-init/SKILL.md
rg -n "不改变 L0/L1/L2|条件式|已有总结覆盖|无需更新|close gate" .ys_team/rules.md .ys_team/templates/checklist.md examples/baseline/.ys_team/rules.md examples/baseline/.ys_team/templates/checklist.md skills/ys-team/baseline/.ys_team/rules.md skills/ys-team/baseline/.ys_team/templates/checklist.md
rg -n "Data Contract|单写入|聚合|rollback|可停止边界|Depends-On|Absorbs" docs/methodology/reference.md
node -e "const fs=require('fs'); const pkg=JSON.parse(fs.readFileSync('package.json','utf8')); const versions=['.ys_team/VERSION','examples/baseline/.ys_team/VERSION','skills/ys-team/baseline/.ys_team/VERSION'].map(p=>fs.readFileSync(p,'utf8').trim()); if (pkg.version!=='0.6.5'||versions.some(v=>v!=='0.6.5')) { console.error(pkg.version, versions); process.exit(1); }"
node -e "const fs=require('fs'); const v=fs.readFileSync('docs/methodology/VERSION','utf8').trim(); if (v!=='1.3.0') { console.error(v); process.exit(1); }"
if rg -n "ai-gateway-model-integration|kling|dashscope|ProviderKey|models.json" README.md docs/guide/getting-started.md docs/methodology/overview.md docs/methodology/reference.md skills/ys-team/SKILL.md skills/ys-team-spec-talk/SKILL.md skills/ys-team-spec-work/SKILL.md skills/ys-team-init/SKILL.md examples/baseline/.ys_team/rules.md examples/baseline/.ys_team/templates/checklist.md examples/baseline/.ys_team/templates/spec.md skills/ys-team/baseline/.ys_team/rules.md skills/ys-team/baseline/.ys_team/templates/checklist.md skills/ys-team/baseline/.ys_team/templates/spec.md; then exit 1; fi
npm pack --dry-run
```

### Feedback Loop

本 spec 改对了的最快 pass/fail 信号是什么？目标复现成本 < 30 秒。

- 命令或步骤：`rg -n "项目本地 SOP|repo-local SOP|不改变 L0/L1/L2|已有总结覆盖|Data Contract|可停止边界" README.md docs/methodology/reference.md examples/baseline/.ys_team/rules.md examples/baseline/.ys_team/templates/checklist.md skills/ys-team/baseline/.ys_team/rules.md`
- 期望信号：README、方法论 reference、baseline rules/checklist 和 skill baseline 中都能命中；反向检查确认实现文件不出现 `ai-gateway-model-integration`、`kling`、`dashscope` 等项目业务名。
- 复现成本：< 5 秒。

可接受的 evidence 类型：

- 静态检查：`rg` 命令输出。
- 版本检查：Node 版本一致性脚本。
- 打包检查：`npm pack --dry-run` 或 `npm pack` 输出。
- 人工抽读：确认没有把 `ai-gateway` 业务知识写进通用方法论。

## Acceptance Evidence

- `evidence/work-01-verification.md`：记录关键词检查、版本检查和 `npm pack` 输出。
- `review.md`：记录 spec-review 对边界、Write-Scope、AC 和 Verification 的独立判断。
- `qa-report.md`：记录 QA 逐项 AC 验收。

## Risks

- 概念变多，削弱 ys-team 简洁性。缓解：用户向只用“项目本地 SOP”一个概念，避免恢复 toolbox/evolution。
- 把 ai-gateway 业务细节误写入通用 baseline。缓解：AC 和 Feedback Loop 反向检查不得出现项目业务名。
- baseline、本仓本地 `.ys_team`、skill baseline 三份不同步。缓解：Verification 同时检查双副本和本地模板。
- release-first close 工作量较大。缓解：本 spec 独立作为 0.6.5 release 单元，不与历史 blocked close 混合。

## Rollback Plan

- 回退 README、docs、skills、baseline 和本仓 `.ys_team` 中关于项目本地 SOP 的新增文案。
- 将版本文件回退到 0.6.4。
- 删除 `docs/specs/active/20260602-project-local-sop-assimilation/` 或将 queued spec 标记为 cancelled。
