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
2. 在目标项目执行一次 `ys-team-init`，让它基于 `examples/baseline/` 和项目现实生成最小可用的 `.ys_team/` 基线。

项目形态明显变化后，再执行 `ys-team-rebuild`。

当前仓库对外公开的初始化动作已经统一为 `ys-team-init`，不再额外暴露 `build`。`ys-team-init` 的职责不是让用户选择复杂流程，而是把默认 `baseline` 工作流落到项目本地。

`init` 完成后，项目应直接具备类似 `ai-gateway` 的默认工作方式：

- 可以讨论并收敛需求
- 可以把需求整理成 spec
- 可以按 spec 执行
- 可以按 spec 验收并沉淀证据

这些能力可以由多个静默内部 skills 支撑，但默认不要求用户主动理解或显式调用。

## 安装 skills

本仓面向 GitHub 分发。当前最简单的方式是把需要的 skill 目录拷贝到你正在使用的 agent skill 目录中。

常见目标目录示例：

- `~/.agents/skills/`
- `$CODEX_HOME/skills/`

至少安装这三个目录：

- `skills/ys-team/`
- `skills/ys-team-init/`
- `skills/ys-team-rebuild/`

如果你想先看默认工作流长什么样，再决定是否接入，可以先阅读：

- `examples/baseline/`

## 使用方式

### Python 项目

典型项目形态：

- `pyproject.toml`
- `src/`、`app/` 或类似目录
- `docs/` 可能已存在，也可能还没有

初始化方式：

1. 在项目中调用 `ys-team-init`
2. 让它读取项目现状、目录结构和已有文档
3. 以 `examples/baseline/` 为默认工作流来源，生成项目自己的 `.ys_team/`

初始化后，推荐这样使用：

- 讨论需求时，按 ys-team 先收敛 spec
- 实现时，以 spec 为唯一工作依据
- 验收时，把验证结果回填到 spec evidence
- 默认不需要手动点名内部 skills；项目会沿着默认工作流推进

### Java 项目

典型项目形态：

- `pom.xml` 或 `build.gradle`
- 单模块或多模块微服务结构
- 可能包含 API、service、infra、job、mq、db migration 等模块

初始化方式同样只需一次：

1. 在项目中调用 `ys-team-init`
2. 让它识别 Java 项目结构和已有文档
3. 以 `examples/baseline/` 为默认工作流来源，生成偏 Java 微服务语境的 `.ys_team/` 和 spec 模板

Java 项目接入时，重点不是改代码，而是先建立这些约束：

- 共享现实索引
- spec 先行
- 多角色收敛
- 证据化验收

也就是说，第一天就可以开始用 ys-team，而不必先重构仓库。

同样地，Java 项目默认也不需要用户自己调用内部 skills；只要 `init` 后按项目默认工作流使用即可。

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

后续关于更完整 skill 面、语言模板分层、分发方式和自动理解能力，统一在 `docs/specs/` 中推进。
