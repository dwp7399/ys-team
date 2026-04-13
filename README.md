# ys-team

AI 团队治理方法论：以共享现实索引为对齐基础、以多角色讨论为收敛机制、以 Spec 为执行与验收统一依据。

## 30 秒上手

```bash
# 安装 skills（默认安装到 ~/.claude/skills）
npx ys-team install-skills --force

# 在目标项目里，对 Claude 说：
# "用 ys-team-init 初始化这个项目"
```

安装完成后，在目标项目里执行 `ys-team-init` 即可启用工作流路由。

## The Zen of ys-team

- 现实先于生成。
- 规格先于执行。
- 讨论归于收敛。
- 证据胜于感觉。

## 这是什么

ys-team 不是固定流程图，不是项目管理工具。它提供一组稳定约束：

- 项目必须有能反映真实状态的共享现实索引
- 非 trivial 工作先收敛为 Spec，再依据 Spec 执行和验收
- 多角色讨论用于覆盖风险并形成收敛结论
- 交付结果必须可验证、可追溯

## 工作流

所有改动请求经过路由判断，按三级分流：

| 级别 | 名称 | 条件 | 流程 |
|------|------|------|------|
| L0 | trivial | 单文件、无影响、用户声明 | 直接执行 |
| L1 | patch | ≤3 文件、单模块内、意图清晰 | 执行 → 留痕 |
| L2 | spec | 跨模块、有风险、需讨论收敛 | 完整 spec 流程 |

L2 完整流程：

```
spec-talk → spec-review → spec-work → qa → close → done
```

三种编排模式：manual（手动推进）、semi-auto（自动流转，关键节点暂停）、full-auto（全自动）。

详见 [方法论规范](docs/methodology/)。

## 更新

```bash
npx ys-team check-update
npx ys-team@latest install-skills --force
```

skills 更新后，项目里的 `.ys_team/` 不会自动变化。如需同步：

```
# 在项目里对 Claude 说：
# "用 ys-team-rebuild 重估这个项目的工作流配置"
```

## CLI 参考

```bash
npx ys-team install-skills [--dest <dir>] [--force] [--dry-run]
npx ys-team init-project [--dir <project-dir>] [--force] [--dry-run]
npx ys-team check-update
npx ys-team --help
```

`install-skills` 安装 skills 到指定目录（默认 `~/.claude/skills`），同时写入 baseline 模板。

`init-project` 向目标项目写入 `.agents/skills`、`AGENTS.md`、`CLAUDE.md`，之后仍需在项目里执行 `ys-team-init`。

## 方法论规范

完整方法论规范位于 `docs/methodology/`：

| 文档 | 内容 |
|------|------|
| [00-overview](docs/methodology/00-overview.md) | 方法概述与核心不变量 |
| [01-state-machine](docs/methodology/01-state-machine.md) | Spec 生命周期状态机 |
| [02-role-protocol](docs/methodology/02-role-protocol.md) | 角色定义、选择、通信、演进 |
| [03-discussion-protocol](docs/methodology/03-discussion-protocol.md) | 讨论收敛、结果卡、决策语义 |
| [04-artifact-schema](docs/methodology/04-artifact-schema.md) | Spec 制品定义 |
| [05-governance](docs/methodology/05-governance.md) | 治理规则、记忆策略 |
| [06-bootstrap-and-evolution](docs/methodology/06-bootstrap-and-evolution.md) | 初始化与演进 |

这些文档是平台无关的方法论定义，不依赖任何特定 AI 工具的实现细节。

## 工作流可见标志

ys-team 工作流中，回复末尾必须出现可见标志：

- 路由判断：`` `ys-team` · [判断结果] → [下一步] ``
- 讨论：`**[主持人]** ys-team · spec-talk`
- 执行：`**[执行中]** ys-team · spec-work`
- 验收：`**[验收]** ys-team · submit`
- 状态：`**[状态]** ys-team · status`

没有标志说明不在工作流中，可以要求切回。

## 仓库结构

- `skills/` — 对外发布的 ys-team skills
- `examples/baseline/` — 默认工作流骨架
- `docs/methodology/` — 平台无关的方法论规范
- `docs/project/` — 仓库现状说明
- `docs/specs/` — 演进 spec
- `.ys_team/` — 本仓自用工作流基线
