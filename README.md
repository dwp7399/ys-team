# ys-team

`ys-team` 是一组用于组织 AI 员工工作的 skills，以及围绕这些 skills 的项目本地化方法论。

当前仓库按三层组织：

- `ys-team`：方法论本体
- `examples/baseline/`：默认工作流骨架
- `ys-team-init` / `ys-team-rebuild`：把默认骨架落到具体项目，或在项目变化后重估本地规则

## The Zen of ys-team

- 现实先于生成。
- 规格先于执行。
- 讨论归于收敛。
- 证据胜于感觉。

## 这是什么

`ys-team` 不是固定流程图，也不是重型治理平台。

它提供的是一组稳定约束：

- 项目必须有能反映真实状态的共享现实索引。
- 非 trivial 工作先收敛为 spec，再依据 spec 执行和验收。
- 多角色讨论用于覆盖风险并形成收敛结论。
- 交付结果必须可验证、可追溯。

## 安装与使用

### 第一次使用

**第一步：安装 skills**

```bash
npx ys-team install-skills --dest ~/.claude/skills --force
```

> 默认目标为 `~/.agents/skills`，Claude Code 用户需指定 `~/.claude/skills`。
> 安装时会同时把 bundled baseline 写入 `ys-team/baseline/`，供 `ys-team-init` / `ys-team-rebuild` 读取模板。

**第二步：在项目里初始化**

打开目标项目，对 Claude 说：

```
用 ys-team-init 这个 skill 初始化这个项目
```

### 更新 skills

```bash
# 检查是否有新版本
npx ys-team check-update

# 更新到最新版
npx ys-team@latest install-skills --dest ~/.claude/skills --force
```

### 更新已有项目的工作流

skills 更新后，项目里的 `.ys_team/` 不会自动变化。如果新版本有结构调整，在项目里运行：

```
用 ys-team-rebuild 重估这个项目的工作流配置
```

对 Python / Java 项目，起步动作保持一致，差异由 `ys-team-init` 在识别项目结构时自动处理。

## 工作流可见标志

只要当前回复处于 `ys-team` 工作流中，末尾必须出现明显标志：

- 路由判断：`` `ys-team` · [判断结果] → [下一步] ``
- discussion / spec-talk：`**[主持人]** ys-team · spec-talk`
- spec-work：`**[执行中]** ys-team · spec-work`
- submit：`**[验收]** ys-team · submit`
- status：`**[状态]** ys-team · status`

如果没有这些标志，说明当前回复还没真正进入 `ys-team` 工作流，可以直接要求：

`请先进入 ys-team 工作流，并给出当前阶段标志。`

## CLI 参考

```bash
npx ys-team --help
npx ys-team install-skills [--dest <dir>] [--force] [--dry-run]
npx ys-team init-project [--dir <project-dir>] [--force] [--dry-run]
npx ys-team check-update
```

`init-project` 会向目标项目写入 `.agents/skills`、`AGENTS.md`、`CLAUDE.md`，之后仍需在项目里执行 `ys-team-init`。
同时也会写入 `.agents/skills/ys-team/baseline/`，所以项目里的 `ys-team-init` 能拿到默认模板。

## 本仓结构

- `skills/`：对外发布的 ys-team skills
- `examples/baseline/`：默认工作流骨架
- `.ys_team/`：本仓自用工作流基线
- `docs/project/`：仓库现状说明
- `docs/specs/`：后续演进 spec

其中 `skills/` 还包含一组静默内部能力，用于支撑默认工作流完整落地，但不要求用户主动理解或显式调用。

## 当前边界

当前仓库先收口四件事：

- `ys-team` 的理念入口
- `examples/baseline/` 的默认工作流表达
- `ys-team-init` 的项目初始化职责
- `ys-team-rebuild` 的本地规则重估职责
