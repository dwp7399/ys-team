---
Spec-Type: control
Initiative: 20260415-193020-delivery-flow-carrier
Status: completed
Owner-Session: ys-team
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
Depends-On: []
Verification: "检查 methodology 已定义 delivery-flow.md 的定位与最小结构；检查 baseline 与本仓 `.ys_team/` 均存在 delivery-flow.md；检查 ys-team / spec-talk / spec-work / init / rebuild 已把 delivery-flow 接入读取或同步路径；检查当前工作流定义中已删除 submit，并将验收/状态职责并回 qa/close；检查 `install-skills --force` 会清理已不再 bundled 的旧 ys-team skill；检查 module-index、guide 与 README 已反映该新行为；检查发布线版本已 bump 到 0.4.1，且真实 `npm publish` 成功"
---

# delivery-flow 承载位落地

## Background

当前 ys-team 已有状态机、spec 制品和治理规则，但缺少一个项目本地的“核心交付逻辑承载位”。

用户明确要求：

1. 需要一个能固定核心交付主链的位置，而不是让项目自己猜
2. 该文档只在自己的作用范围内保证一致性，不追求全覆盖
3. ys-team 方法仓设计时应保持泛化，baseline 可给默认填法，项目本地再具体化

## Goals

1. 在方法论层为 `delivery-flow.md` 建立清晰定位：核心交付逻辑承载位，而非大而全流程图
2. 给 baseline 与本仓 `.ys_team/` 增加 `delivery-flow.md` 默认骨架
3. 让 `ys-team` 主链技能与 init/rebuild 能读取、生成和同步这份文档
4. 同步更新仓库现实文档，避免新承载位落地后文档失真
5. 删除当前工作流定义中的 `submit`，将相关职责并回 `qa` / `close`
6. 让 `install-skills --force` 在 npm 更新时清理已不再 bundled 的旧 ys-team skill，避免废弃 skill 长期残留
7. 以 `0.4.1` 发布本轮变更，使 delivery-flow 承载位与 submit 删除进入 npm 发布线

## Deliverables

**D1：方法论定义**（`docs/methodology/04-artifact-schema.md`, `docs/methodology/06-bootstrap-and-evolution.md`）

- 为 `delivery-flow.md` 定义定位、最小结构和与 baseline/init 的关系
- 明确它只覆盖核心交付主链，不追求全覆盖

**D2：本地与 baseline 骨架**（`.ys_team/`, `examples/baseline/.ys_team/`, `skills/ys-team/baseline/.ys_team/`）

- 新增 `delivery-flow.md`
- 在 README / policy 中声明其职责和读取顺序

**D3：主链接入**（`skills/ys-team*.md`, `skills/ys-team-init/SKILL.md`, `skills/ys-team-rebuild/SKILL.md`）

- `ys-team`、`spec-talk`、`spec-work` 把 `delivery-flow.md` 接入读取顺序或本地绑定说明
- init / rebuild 把 `delivery-flow.md` 视为 baseline 资产的一部分

**D4：现实同步**（`docs/project/module-index.md`, `docs/project/overview.md`, `examples/baseline/CHANGELOG.md`）

- 让仓库现实索引和概览能反映新的交付承载位
- 在 baseline changelog 记录该未发布变化

**D5：submit 删除**（`skills/ys-team-submit/SKILL.md` 及其引用面）

- 删除 `ys-team-submit` skill
- 从当前工作流标志、guide、baseline、status 写入方和工具绑定中移除 submit
- 将“验收判断”统一收敛到 `qa`，将“收口动作”统一收敛到 `close`

**D6：安装清理逻辑**（`scripts/ys-team.mjs`, `README.md`, `docs/guide/getting-started.md`）

- `install-skills --force` 会替换同名已安装 skill，并清理已不再由当前 npm 包提供的旧 ys-team skill
- 对外文档明确：`npm publish` 不会自动删除本地 skill，删除动作发生在用户执行更新安装时

**D7：0.4.1 发布线**（`package.json`, `.ys_team/VERSION`, `examples/baseline/.ys_team/VERSION`, `skills/ys-team/baseline/.ys_team/VERSION`）

- 发布线版本 bump 到 `0.4.1`
- 按 `release/0.4.1 -> npm publish -> merge main -> tag` 顺序完成真实发布
- 为本次发布保留可复核的 publish 证据

## Acceptance Criteria

- [ ] `docs/methodology/04-artifact-schema.md` 已定义 `delivery-flow.md`，包含“只覆盖核心交付主链、不追求全覆盖”的边界
- [ ] `docs/methodology/06-bootstrap-and-evolution.md` 与 `skills/ys-team-init/SKILL.md` 均把 `.ys_team/delivery-flow.md` 列为 baseline/init 产物
- [ ] `.ys_team/delivery-flow.md`、`examples/baseline/.ys_team/delivery-flow.md`、`skills/ys-team/baseline/.ys_team/delivery-flow.md` 全部存在，且结构一致
- [ ] `skills/ys-team/SKILL.md`、`skills/ys-team-spec-talk/SKILL.md`、`skills/ys-team-spec-work/SKILL.md` 已把 `delivery-flow.md` 纳入主链读取或约束说明
- [ ] `docs/project/module-index.md` 与 `docs/project/overview.md` 已反映 delivery-flow 作为本地交付承载位的存在
- [ ] `examples/baseline/CHANGELOG.md` 已记录 delivery-flow 引入为未发布变化
- [ ] `skills/ys-team-submit/SKILL.md` 已删除，且当前工作流定义不再把 submit 视为独立阶段或可见标志
- [ ] `skills/ys-team-status/SKILL.md`、`AGENTS.md`、`CLAUDE.md`、guide 与 baseline 文档已改为 `qa / close` 语义
- [ ] `scripts/ys-team.mjs` 已在 `install-skills --force` 下清理 stale ys-team skill，且 README / getting-started / module-index 已写明该行为
- [ ] 发布线版本已 bump 到 `0.4.1`，且真实 `npm publish` 已成功

## Discussion Digest

- Rounds: 1
- Conclusion: PASS
- Key Decision: `delivery-flow.md` 在 ys-team 层先定义为抽象承载格式；baseline 提供默认填法；项目本地再实例化成真实执行清单；同时删除 `submit`，把验收职责并回 `qa`，并在更新安装时清理废弃 ys-team skill；本轮通过 `0.4.1` 真实发布把变更推入 npm 发布线

## Collaboration Summary

- Participants: 方法论架构师、产品演进负责人、交付守门人
- Reporter: 方法论架构师
- Estimated Cost: 中（跨方法论、baseline、技能读写路径）

## Verification

- 阅读 `docs/methodology/04-artifact-schema.md` 与 `06-bootstrap-and-evolution.md`，确认定位、结构与初始化产出已同步
- 检查三份 `delivery-flow.md` 是否存在且包含 `Positioning`、`Core Flow`、`Project Decisions`、`Exception Rules`
- 搜索 `skills/ys-team/SKILL.md`、`skills/ys-team-spec-talk/SKILL.md`、`skills/ys-team-spec-work/SKILL.md`、`skills/ys-team-init/SKILL.md`、`skills/ys-team-rebuild/SKILL.md`、`skills/ys-team-status/SKILL.md`，确认 `delivery-flow` 已接入且 `submit` 已移除
- 运行 `node scripts/ys-team.mjs install-skills --dest /tmp/... --force --dry-run`，确认 stale bundled skill 会被列为待清理
- 阅读 `README.md`、`docs/guide/getting-started.md`、`docs/project/module-index.md`、`examples/baseline/CHANGELOG.md`，确认安装清理语义已同步
- 检查 `package.json`、`.ys_team/VERSION`、`examples/baseline/.ys_team/VERSION`、`skills/ys-team/baseline/.ys_team/VERSION` 全部为 `0.4.1`
- 保留真实 `npm publish` 成功记录作为验收证据

## Acceptance Evidence

- `docs/specs/completed/20260415-193020-delivery-flow-carrier/work.md`
- 相关 `rg` / `sed` 检查输出

## Documentation Updates

- 方法论主定义变化 → `docs/methodology/*`
- baseline 结构变化 → `docs/project/module-index.md`
- 当前落地模型变化 → `docs/project/overview.md`

## Risks

- 如果只新增 baseline 文件而不接入主链技能读取顺序，`delivery-flow.md` 会变成摆设
- 如果把 `delivery-flow.md` 写得过宽，会重复 `policy.md` 和项目其他交付文档，反而降低聚焦度

## Rollback Plan

- 删除新增的 `delivery-flow.md`
- 回滚 methodology / baseline / skill 中对该承载位的引用
- 恢复 `module-index`、`overview` 与 changelog 到变更前状态
