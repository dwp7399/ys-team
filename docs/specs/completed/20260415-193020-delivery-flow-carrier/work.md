---
Spec-Type: work
Initiative: 20260415-193020-delivery-flow-carrier
Status: completed
Owner-Session: ys-team-spec-work
Write-Scope:
  - docs/methodology/04-artifact-schema.md
  - docs/methodology/06-bootstrap-and-evolution.md
  - docs/project/module-index.md
  - docs/project/overview.md
  - docs/project/npm-publish.md
  - README.md
  - package.json
  - scripts/ys-team.mjs
  - .ys_team/VERSION
  - .ys_team/README.md
  - .ys_team/policy.md
  - .ys_team/status.md
  - .ys_team/delivery-flow.md
  - examples/baseline/.ys_team/VERSION
  - examples/baseline/.ys_team/README.md
  - examples/baseline/.ys_team/policy.md
  - examples/baseline/.ys_team/delivery-flow.md
  - skills/ys-team/baseline/.ys_team/README.md
  - skills/ys-team/baseline/.ys_team/policy.md
  - skills/ys-team/baseline/.ys_team/delivery-flow.md
  - examples/baseline/CHANGELOG.md
  - docs/guide/getting-started.md
  - AGENTS.md
  - CLAUDE.md
  - skills/ys-team/SKILL.md
  - skills/ys-team-init/SKILL.md
  - skills/ys-team-rebuild/SKILL.md
  - skills/ys-team-spec-talk/SKILL.md
  - skills/ys-team-spec-work/SKILL.md
  - skills/ys-team-status/SKILL.md
  - skills/ys-team-submit/SKILL.md
  - skills/ys-team/baseline/.ys_team/VERSION
  - .ys_team/toolbox/完成前验证.md
  - .ys_team/memory/roles/方法论架构师.md
  - examples/baseline/AGENTS.md
  - examples/baseline/CLAUDE.md
  - examples/baseline/README.md
  - skills/ys-team/baseline/AGENTS.md
  - skills/ys-team/baseline/CLAUDE.md
  - skills/ys-team/baseline/README.md
Verification: "搜索 delivery-flow 和 submit 在 methodology / baseline / self-use `.ys_team` / skills / guide 中的当前落点；逐文件检查新文档结构、读取顺序与 qa/close 语义；dry-run 验证 `install-skills --force` 的 stale skill 清理输出；检查发布线版本 bump 与真实 `npm publish` 成功证据"
---

# delivery-flow 承载位落地

## 执行摘要

- 新增三份 `delivery-flow.md`：本仓 `.ys_team/`、baseline 示例、bundled baseline
- 在本仓与 baseline 的 `README.md` / `policy.md` 中接入 delivery-flow 的职责与读取顺序
- 在 methodology 中增加 `delivery-flow.md` 的抽象定义和 init/rebuild 产物说明
- 在 `ys-team`、`spec-talk`、`spec-work`、`init`、`rebuild` 的 skill 文案中接入 delivery-flow
- 更新 module index、overview 和 baseline changelog，反映新承载位
- 删除 `ys-team-submit` skill，并把当前定义中的 submit marker / 状态写入并回 `qa` / `close`
- 在 CLI 中加入 stale ys-team skill 清理逻辑，并把更新行为同步到 README / getting-started / module-index
- 将发布线版本 bump 到 `0.4.1`，并按发布治理完成真实 npm 发包

## 实际变更

- 为 `delivery-flow.md` 定义最小结构：`Positioning`、`Core Flow`、`Project Decisions`、`Exception Rules`
- 明确该文档只覆盖核心交付主链，不追求覆盖全部项目细节
- 明确项目必须补齐 6 个绑定点：`Execution Start`、`Spec State Moves`、`Evidence Timing`、`Status Timing`、`Delivery Done`、`Release Relation`
- 让 `ys-team-spec-talk` 和 `ys-team-spec-work` 在主链运行时读取 `.ys_team/delivery-flow.md`
- 从当前工作流定义中删除 `submit`，避免和 `qa` / `close` 重叠
- 让 `install-skills --force` 在升级时清理不再 bundled 的旧 ys-team skill，避免本地继续残留 `ys-team-submit`
- 将本轮变更打入 npm 发布线，使下游通过更新安装获得 delivery-flow 与 submit 删除后的新基线

## 验证命令 / 步骤

- `rg -n "delivery-flow|Execution Start|Spec State Moves|只覆盖核心交付主链|Local Delivery Flow|Delivery Flow 初始化|Delivery Flow Sync|submit|ys-team-submit" AGENTS.md CLAUDE.md docs .ys_team examples/baseline skills/ys-team/SKILL.md skills/ys-team-spec-talk/SKILL.md skills/ys-team-spec-work/SKILL.md skills/ys-team-init/SKILL.md skills/ys-team-rebuild/SKILL.md skills/ys-team-status/SKILL.md skills/ys-team/baseline`
- 阅读 `.ys_team/delivery-flow.md`
- 阅读 `docs/methodology/04-artifact-schema.md`
- 阅读 `skills/ys-team-spec-work/SKILL.md`
- `node scripts/ys-team.mjs install-skills --dest /tmp/ys-team-prune-check --force --dry-run`
- 真实 `npm publish` 成功记录

## 产出清单

- `.ys_team/delivery-flow.md`
- `examples/baseline/.ys_team/delivery-flow.md`
- `skills/ys-team/baseline/.ys_team/delivery-flow.md`
- `docs/methodology/04-artifact-schema.md`
- `docs/methodology/06-bootstrap-and-evolution.md`
- `skills/ys-team/SKILL.md`
- `skills/ys-team-spec-talk/SKILL.md`
- `skills/ys-team-spec-work/SKILL.md`
- `skills/ys-team-init/SKILL.md`
- `skills/ys-team-rebuild/SKILL.md`
- `skills/ys-team-status/SKILL.md`
- `AGENTS.md`
- `CLAUDE.md`
- `docs/guide/getting-started.md`
- `README.md`
- `scripts/ys-team.mjs`
- `package.json`
- `.ys_team/VERSION`
- `examples/baseline/.ys_team/VERSION`
- `skills/ys-team/baseline/.ys_team/VERSION`

## 当前状态

主修改与人工验证已完成，可进入 `close`。由于本轮未执行 git commit / spec 归档，当前保持待收口。
