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

## 当前推荐使用方式

当前版本建议只记两步：

1. 获取本仓 `skills/` 下的技能目录，并安装到你的本地 skills 目录。
2. 说 “帮我安装/更新 https://github.com/dwp7399/ys-team 这里的 skills，然后用里面的 init，初始化我的项目。然后更新 agents.md 和 claude.md，使用 ys-team 作为最优先使用工作流”

对 Python / Java 项目，当前起步动作保持一致：

- Python 项目：先安装 skills，再用 `ys-team-init` 生成项目本地 `.ys_team/`、`docs/specs/` 和现实索引
- Java 项目：同样先安装 skills，再用 `ys-team-init` 落地本地基线；Java 差异主要体现在 init 对构建工具、多模块和兼容性边界的识别，而不是要求先改业务代码

## 工作流可见标志

只要当前回复处于 `ys-team` 工作流中，末尾必须出现明显标志：

- 路由判断：`` `ys-team` · [判断结果] → [下一步] ``
- discussion / spec-talk：`**[主持人]** ys-team · spec-talk`
- spec-work：`**[执行中]** ys-team · spec-work`
- submit：`**[验收]** ys-team · submit`
- status：`**[状态]** ys-team · status`

如果没有这些标志，说明当前回复还没真正进入 `ys-team` 工作流，可以直接要求：

`请先进入 ys-team 工作流，并给出当前阶段标志。`

## npm 分发现状

当前仓库已经有 npm 包元数据，并提供两种 npm 安装模式，但还不是完整的一键初始化器。

当前 npm 面提供的是：

- 发布 `skills/`、`examples/baseline/`、`registry/`、文档和脚本
- 一个最小 CLI 入口：`npx ys-team --help`
- 全局安装：把包内 skills 安装到 `~/.agents/skills`
- 项目级安装：把包内 skills 安装到项目的 `.agents/skills`，并下发 baseline 版 `AGENTS.md` / `CLAUDE.md`
- 支持显式目标目录、项目目录和安全覆盖控制：`--dest`、`--dir`、`--force`、`--dry-run`

当前 npm 面还**没有**：

- 自动执行 `ys-team-init`
- 自动登录或发布到 npm registry

全局安装模式：

```bash
npx ys-team install-skills
```

全局安装到自定义目录：

```bash
npx ys-team install-skills --dest /path/to/skills
```

项目级安装模式：

```bash
npx ys-team init-project --dir /path/to/project
```

项目级安装会：

- 写入 `/path/to/project/.agents/skills`
- 写入 `/path/to/project/AGENTS.md`
- 写入 `/path/to/project/CLAUDE.md`

两种模式后续都仍需在目标仓库里执行 `ys-team-init`。

## npm 发布状态

当前仓库已经具备**可发布到 npm registry** 的包形态，包括：

- CLI 入口
- `publishConfig.access = public`
- 可通过 `npm pack --dry-run` 验证的打包内容

但这不等于已经完成真实发布。真实发布仍需要：

- npm 账号
- `npm login`
- 可能的 token / 2FA 配置
- 在发布环境执行 `npm publish`

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
