---
Initiative: 20260415-193020-delivery-flow-carrier
Date: 2026-04-15
Type: verification
---

# Verification Notes

## Summary

- `delivery-flow.md` 已落到 self-use `.ys_team/`、examples baseline、bundled baseline 三处
- methodology 已定义该承载位的定位、最小结构和 bootstrap 生成规则
- `ys-team`、`spec-talk`、`spec-work`、`init`、`rebuild` 已接入 delivery-flow 读取或同步逻辑
- 当前工作流定义中的 `submit` 已删除，验收职责回归 `qa`，收口动作保留在 `close`
- `install-skills --force` 已增加 stale ys-team skill 清理逻辑，升级时会清理旧的 `ys-team-submit`
- 现实文档和 baseline changelog 已同步

## Key Checks

- `rg -n "delivery-flow|Execution Start|Spec State Moves|只覆盖核心交付主链|Local Delivery Flow|Delivery Flow 初始化|Delivery Flow Sync|submit|ys-team-submit" AGENTS.md CLAUDE.md docs .ys_team examples/baseline skills/ys-team/SKILL.md skills/ys-team-spec-talk/SKILL.md skills/ys-team-spec-work/SKILL.md skills/ys-team-init/SKILL.md skills/ys-team-rebuild/SKILL.md skills/ys-team-status/SKILL.md skills/ys-team/baseline`
- `sed -n '1,220p' .ys_team/delivery-flow.md`
- `sed -n '1,220p' docs/methodology/04-artifact-schema.md`
- `sed -n '1,220p' skills/ys-team-spec-work/SKILL.md`
- `node scripts/ys-team.mjs install-skills --dest /tmp/ys-team-prune-check --force --dry-run`

## Result

- 本次落地不是“只增文件”，而是已经接入主链读取顺序
- `delivery-flow.md` 的边界保持为“核心交付逻辑承载位”，未膨胀成大而全流程文档
- `submit` 已从当前工作流定义中删除，验收判断回归 `qa`，收口动作保留在 `close`
- 更新安装会清理已不再 bundled 的旧 ys-team skill，不会再让 `ys-team-submit` 在升级后长期残留
- 发布前检查通过：`node scripts/ys-team.mjs --help`、`install-skills --dry-run`、`init-project --dry-run`、`npm pack --dry-run --cache /tmp/ys-team-npm-cache`
- `npm whoami --userconfig /tmp/ys-team-npmrc --cache /tmp/ys-team-npm-cache` 返回 `ys7399`
- `npm publish --userconfig /tmp/ys-team-npmrc --cache /tmp/ys-team-npm-cache` 成功返回 `+ ys-team@0.4.1`
- `release/0.4.1` 已 fast-forward 合并回 `main`，并创建 git tag `0.4.1`
