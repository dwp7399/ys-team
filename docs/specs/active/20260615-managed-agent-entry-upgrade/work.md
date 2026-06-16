# Work Log

## 2026-06-15

- 分支：`work/20260615-managed-agent-entry-upgrade`。
- 前置偏差：本轮开始时已有未提交 rebuild 改动位于 `main`；已在保留工作区改动的前提下切到 work 分支继续收口。用户已确认“一起改掉”，视为进入实现授权；未执行 npm publish / git commit / merge / tag。

## Loop 1: Baseline Entry Contract

- 目标：让新项目入口文件带 `ys-team:managed` 托管块，并把旧“强制进入完整流程 / 固定尾标”口径改为 v1 的 `direct` / `patch` / `spec` 路由。
- 改动：更新 `examples/baseline/AGENTS.md`、`examples/baseline/CLAUDE.md` 和 `examples/baseline/CHANGELOG.md`，版本线 bump 到 `1.0.1`。
- 验证：baseline 入口文件含 start/end marker；反向关键词检查无旧入口残留。

## Loop 2: CLI Safe Upgrade

- 目标：已有项目升级时不再整文件覆盖 `AGENTS.md` / `CLAUDE.md`。
- 改动：`scripts/ys-team.mjs` 增加 managed block 提取/替换、legacy 入口段识别、标题后插入、`init-project` 安全更新入口文件；`check-update` 输出补充 `init-project --dir /path/to/project`。
- 验证：Node 函数探针覆盖 legacy AGENTS、legacy CLAUDE、无入口文件三条路径；临时项目 dry-run / actual run 均通过。

## Loop 3: Docs, Skill, Baseline Copy

- 目标：让旧用户知道升级路径，并保持 npm skill 内嵌 baseline 与 examples baseline 一致。
- 改动：更新 `README.md`、`docs/guide/getting-started.md`、`docs/methodology/reference.md`、`docs/project/module-index.md`、`docs/project/npm-publish.md`、`docs/project/structure.md`、`skills/ys-team-init/SKILL.md`；同步 `examples/baseline/` 到 `skills/ys-team/baseline/`。
- 验证：`diff -qr examples/baseline skills/ys-team/baseline` 无输出；`npm pack --dry-run` 通过并显示 `ys-team@1.0.1`。

## Scope Notes

- 未修改外部项目文件。
- 未发布 npm。
- `share/` 为本轮开始前已有未跟踪目录，未纳入本 spec。
- `.ys_team/config.yaml`、`.ys_team/rules.md`、`.ys_team/reality.md` 等 rebuild 改动来自前置上下文，本轮未回滚。
