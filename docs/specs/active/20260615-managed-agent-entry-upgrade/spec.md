---
Spec-Type: control
Initiative: 20260615-managed-agent-entry-upgrade
Status: active
Owner-Session: codex
Write-Scope:
  - package.json
  - scripts/ys-team.mjs
  - README.md
  - docs/guide/getting-started.md
  - docs/methodology/reference.md
  - docs/project/module-index.md
  - docs/project/npm-publish.md
  - docs/project/structure.md
  - examples/baseline/AGENTS.md
  - examples/baseline/CLAUDE.md
  - examples/baseline/CHANGELOG.md
  - examples/baseline/.ys_team/VERSION
  - skills/ys-team-init/SKILL.md
  - skills/ys-team/baseline/**
  - .ys_team/VERSION
  - .ys_team/status.md
  - docs/specs/active/20260615-managed-agent-entry-upgrade/**
Delete-Scope: []
Depends-On: []
Verification: "见 ## 验收"
---

# Managed Agent Entry Upgrade

## 意图

让已经使用 ys-team 的项目在升级到 v1.0.1 时，能稳定迁移 `AGENTS.md` / `CLAUDE.md` 里的 ys-team 入口口径：自动更新托管块，保留项目本地约束，并检测旧 L0/L1/L2、尾标和 role/slot 口径。

## 非目标

- 不发布 npm。
- 不修改外部项目文件。
- 不把项目本地规则写进通用 baseline。
- 不重新设计 ys-team v1 的 routing 模型。

## Write-Scope

- `scripts/ys-team.mjs`：新增 agent entry managed block 合并、legacy 检测和 `init-project` 更新行为。
- `examples/baseline/AGENTS.md` / `CLAUDE.md`：加入 managed block marker。
- `skills/ys-team-init/SKILL.md`：rebuild 明确检查并迁移入口托管块。
- `README.md` / docs：说明已有项目升级方式。
- 版本线：`package.json`、baseline VERSION、本仓 `.ys_team/VERSION` 到 `1.0.1`。

## 验收

### 保真度等级

L1：这是 CLI、baseline 和文档契约改动，不涉及 UI 或业务运行时。用 Node CLI dry-run、单元式函数探针、baseline 双副本 diff、关键词检查和 npm pack dry-run 验收。

### 人等价验收脚本

- 命令或步骤：执行 Verification 中的命令。
- 输入：一个含旧 `AGENTS.md` / `CLAUDE.md` 的临时项目。
- 期望：`init-project --dry-run` 报告会更新入口托管块；实际执行后旧 ys-team 段落被替换成 v1 managed block，项目本地段落保留；无 managed block 的新项目仍能生成入口文件。
- 复现成本：约 1 分钟。

### Feedback Loop

- 命令或步骤：`node scripts/ys-team.mjs init-project --dir /tmp/ys-team-entry-check --dry-run`
- 期望信号：输出包含 `managed block` 或 `AGENTS.md` / `CLAUDE.md` 的入口更新动作。
- 复现成本：< 5 秒。

## 交付清单

- [x] baseline AGENTS/CLAUDE 有 managed block marker。
- [x] CLI 能替换 managed block、替换 legacy ys-team 段落、插入缺失托管块。
- [x] `ys-team-init` rebuild 说明要求检查 AGENTS/CLAUDE。
- [x] docs 告诉已有用户如何升级入口文件。
- [x] baseline 双副本全量一致。
- [x] npm pack dry-run 通过。

## 依赖 / 风险

- 依赖：已有 `examples/baseline/CHANGELOG.md` 和 `check-update` 摘要机制。
- 风险：过度自动替换会误删项目本地规则；实现必须只替换托管块或可识别的旧 ys-team 入口段。
- 回滚：恢复 CLI 合并函数、baseline AGENTS/CLAUDE、版本文件和文档即可。
