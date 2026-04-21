# 20260421 QA Verification

## Commands

```text
$ test -f examples/baseline/.ys_team/role-pool.yaml
$ test -f examples/baseline/.ys_team/history/README.md
$ test -f examples/baseline/.ys_team/templates/monthly-summary.md
$ rg -n "^sources:|^roles:|^slots:|^mappings:|runtime_network: false|repo: .*agency-agents|ref:" examples/baseline/.ys_team/role-pool.yaml
$ rg -n "governance_slots|slot_bindings|planner|implementer|spec_reviewer|qa_reviewer|close_owner|mode: full-auto" .ys_team/config.yaml examples/baseline/.ys_team/config.yaml
$ rg -n "最近 10 条|固定窗口|monthly-summary|role-pool.yaml|治理槽位|slot_bindings|runtime_network" docs/methodology README.md docs/guide skills examples/baseline/AGENTS.md examples/baseline/.ys_team
$ awk 'BEGIN{insec=0} /^## 最新判断/{insec=1; next} /^## 阻塞项/{insec=0} insec && /^\| 2026-/{count++} END{print count}' .ys_team/status.md
10
```

## Result

- baseline 已新增 `role-pool.yaml`、`history/README.md` 和 `templates/monthly-summary.md` 三个固定载体。
- `role-pool.yaml` 已包含 `sources / roles / slots / mappings` 四段，且默认来源为 `agency-agents`，`ref` 固定为 `783f6a7`，`runtime_network: false`。
- 本仓 `.ys_team/config.yaml` 与 baseline `config.yaml` 已采用 `governance_slots + slot_bindings + roles` 结构。
- 方法论文档、README、入门文档、skill 和 baseline AGENTS 已统一使用“治理槽位 / 槽位绑定 / role-pool.yaml / 最近 10 条判断”的口径。
- `.ys_team/status.md` 的「最新判断」当前为 10 条，满足固定窗口约束。

## Gap

- 当前工作区存在与本轮无关的已修改文件（如 `.ys_team/VERSION`、`package.json`、`examples/baseline/.ys_team/VERSION`），因此本轮不自动执行 Git 收口。
