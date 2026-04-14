---
Spec-Type: control
Initiative: 20260414-183500-rebuild-method-repo
Status: done
Owner-Session: ys-team
Write-Scope:
  - .ys_team/team.md
  - docs/project/module-index.md
  - .ys_team/status.md
  - docs/specs/active/20260414-183500-rebuild-method-repo/
Depends-On: []
Verification: "diff -u examples/baseline/.ys_team/team.md .ys_team/team.md | sed -n '1,220p' && sed -n '1,40p' docs/project/module-index.md && git diff --check"
---

# 本仓正常 rebuild 收口

## Background

本仓刚完成 `0.3.2` 发版，发布线版本已对齐，但用户希望按“正常项目 rebuild”流程重新评估本仓 `.ys_team/` 是否仍和当前 baseline、TEAM 配置及仓库现实一致。

rebuild 检查结果显示：
- `.ys_team/VERSION` 已和 baseline 对齐，无需版本同步
- 记忆文件存在且未超限
- toolbox 没有待处理候选，也没有“需要深化”标记
- TEAM 配置与本仓角色集合一致
- 但本仓 `.ys_team/team.md` 仍未吸收 baseline 中新增的 `Available External Candidates` / `Current Signals` 段，现实索引的更新时间也未覆盖本次 rebuild

## Goals

1. 以最小改动完成一次真实 rebuild。
2. 保留本仓角色中文本地化和方法仓特有边界。
3. 同步 baseline 中对本仓仍有价值的 team 结构段。
4. 让现实索引的更新时间反映本次 rebuild 已执行。

## Non-Goals

- 不修改已对齐的版本号
- 不新增或重做 toolbox 内化
- 不重写本仓特有的 methods / policy / README 本地化表达

## Deliverables

- `.ys_team/team.md` 增加 `Available External Candidates` 与 `Current Signals`
- `docs/project/module-index.md` 更新时间刷新
- rebuild 结果写入 `.ys_team/status.md`

## Acceptance Criteria

- [ ] 明确记录本次 rebuild 的版本检查结果：本仓 `.ys_team/VERSION` 与 baseline 一致，无需同步
- [ ] `.ys_team/team.md` 补入 baseline 中新增但本仓仍适用的 `Available External Candidates` 与 `Current Signals`
- [ ] `.ys_team/team.md` 保留本仓角色中文名和工具绑定
- [ ] 记忆文件与 TEAM 角色列表保持对齐，且无超限项
- [ ] toolbox 候选与深化检查完成，结论写入 rebuild 结果
- [ ] `docs/project/module-index.md` 的 `Last Updated` 反映本次 rebuild
- [ ] `git diff --check` 通过

## Collaboration Summary

- Participants: 方法论架构师、产品演进负责人、交付守门人
- Reporter: 方法论架构师
- Rounds: 1
- Escalations: 无
- Estimated Cost: minimal
- Submit Recommendation: No

## Discussion Digest

- 方法论架构师：本次 rebuild 更像一次“基线吸收 + 健康检查”，不需要重建大量文件。
- 产品演进负责人：用户要的是正常 rebuild 过程，不是再抽象讨论，因此只做最小同步即可。
- 交付守门人：把版本、记忆、toolbox、TEAM 一轮检查留痕，再同步 team 与 reality index 即可闭环。

## Verification

```bash
diff -u examples/baseline/.ys_team/team.md .ys_team/team.md | sed -n '1,220p'
sed -n '1,40p' docs/project/module-index.md
git diff --check
```

## Acceptance Evidence

- `docs/specs/completed/20260414-183500-rebuild-method-repo/evidence/20260414-closeout.md`

## Documentation Updates

- `docs/project/module-index.md`

## Risks

- 低：本次只做本仓 `.ys_team/` 与现实索引的最小同步

## Rollback Plan

git revert 本次 rebuild 提交即可。
