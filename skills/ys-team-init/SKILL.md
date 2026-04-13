---
name: ys-team-init
description: "Initialize a repository-local ys-team baseline once. Generate the smallest useful .ys_team setup from project reality without forcing a heavy process."
---

# ys-team-init

Use this skill when a repository wants to start using `ys-team` and does not yet have a project-local `.ys_team/`.

> 初始化与演进协议见 `docs/methodology/06-bootstrap-and-evolution.md`。

## Purpose

Create the first project-local ys-team baseline with the lightest useful footprint.

`ys-team-init` is not a project modeling ceremony.
It is a one-time repository specialization step.

Its default workflow source is the bundled baseline.

- Repository source: `examples/baseline/`
- npm-installed source: `ys-team/baseline/` inside the installed skill directory set

## 语言检测

Init 的第一步是确认用户主语言，所有角色名、角色卡、team.md、selection rules 将使用该语言。

检测逻辑：
1. 检查用户 CLAUDE.md 中是否有语言偏好声明
2. 检查系统 locale 环境
3. 如无法判断，直接询问用户："团队角色使用什么语言命名？（如：中文/English）"

确认后：
- baseline 中的角色模板按用户语言生成
- `team.md` 的选择规则使用用户语言
- 角色卡文件名使用用户语言

## Core Rules

- Read repository reality before generating anything.
- Start from the bundled baseline as the default workflow source.
- Prefer the smallest useful local baseline.
- Do not require the user to understand internal ys-team structure first.
- Do not block init only because some docs are missing; generate a minimal skeleton when needed.
- Keep the result repository-local.

## Minimum Outputs

Generate or adapt:

- `TEAM.md`（从 bundled baseline 的 `TEAM.md` 适配，根据项目类型调整 roles 列表）
- `.ys_team/README.md`
- `.ys_team/team.md`
- `.ys_team/methods.md`
- `.ys_team/policy.md`
- `.ys_team/templates/`
- `.ys_team/memory/policy.md`（从 baseline 复制）
- `.ys_team/memory/roles/`（根据 TEAM.md 的 roles 列表生成空记忆文件）
- `docs/specs/`
- `docs/roadmap/`

When the repository lacks a current-state project doc, create a minimal `docs/project/overview.md` skeleton.

If the repository does not have an `AGENTS.md`, generate one from the bundled baseline `AGENTS.md`, adapted to the project's name and stack.

## Baseline Source Resolution

When `ys-team-init` runs, resolve baseline assets in this order:

1. `examples/baseline/` inside the current `ys-team` repository
2. `../ys-team/baseline/` relative to the installed skill directory

If neither exists, stop and report that the installed ys-team package is incomplete.

## Language Sensitivity

The method is language-agnostic, but local wording should match project reality.

Examples:

- Python services should reflect their actual package manager, test command, and runtime boundaries.
- Java services should reflect their build tool, multi-module structure, compatibility concerns, release order, migration surface, and async contracts.

## Success Criteria

The repository can start using ys-team immediately after init, without first rewriting the whole project.

That means:

- discussion can converge into spec
- spec can guide execution
- execution can be accepted with evidence

## 工具内化（Toolbox Internalization）

基础 init 完成后，自动执行工具内化流程：

### 步骤

1. **创建 toolbox 目录**：从 bundled baseline 的 `.ys_team/toolbox/` 复制模板（`_sources.md`、`_candidates.md`）

2. **扫描项目类型**：根据仓库中的文件特征判断项目类型：
   - `requirements.txt` / `pyproject.toml` / `setup.py` → python-backend
   - `pom.xml` / `build.gradle` → java-backend
   - `package.json` + React 依赖 → frontend-react
   - 前后端都有 → fullstack
   - 无法判断 → general

3. **匹配 registry 推荐**：读取 `registry/{项目类型}.md` + `registry/general.md`，合并推荐列表

4. **检索与安装**：
   - 对推荐列表中的每个工具，检查是否已安装
   - 已安装的：直接进入内化流程
   - 未安装但有明确来源的：静默安装后内化
   - 如果用户安装了 `find-skills` 等检索工具，额外根据项目特征搜索适合的 skill，和用户确认后安装

5. **选择性内化**：对每个选中的工具：
   - 阅读原 skill 内容
   - 提取对团队有用的部分（不是完整复制）
   - 改写成符合 ys-team 方法论的格式
   - 保留源链接（skill 名、版本、URL）
   - 写入 `.ys_team/toolbox/{能力名}.md`

6. **角色绑定**：根据推荐的绑定角色建议，更新 `team.md` 中对应角色的 `tools` 字段

7. **更新源索引**：将所有内化工具记录到 `.ys_team/toolbox/_sources.md`

### 内化文件格式

```markdown
# [能力名称]

source: [原 skill 全名]
source_url: [GitHub 或 marketplace 地址]
version: [内化时的版本]
internalized: [日期]

## 团队用法

[改写后的、融入团队方法论的能力描述]

## 绑定角色

- [角色名]（[使用场景]）

## 重新内化触发条件

[什么情况下应该回到原 skill 重新学习]
```

### 完成提示

```
团队基础配置已完成，已内化 N 个工具。
如需调整工具配置，可运行 /ys-team-rebuild。
```

## TEAM.md 生成

Init 时从 bundled baseline 的 `TEAM.md` 生成项目的 `TEAM.md`：

1. 复制 bundled baseline TEAM.md 到项目根目录
2. 根据项目类型调整 roles 列表（如纯前端项目去掉 domain-integrator，加 frontend-accessibility-reviewer）
3. 默认 mode 为 manual
4. 提示用户可按需调整配置

## 记忆系统初始化

Init 时初始化记忆目录：

1. 从 bundled baseline 的 `.ys_team/memory/policy.md` 复制记忆策略
2. 创建 `.ys_team/memory/roles/` 目录
3. 根据 TEAM.md 的 roles 列表，为每个角色创建空记忆文件（`<role>.md`）
4. 提示用户记忆系统已就绪

## Status 初始化

Init 时从 bundled baseline 的 `.ys_team/status.md` 复制空模板到项目的 `.ys_team/status.md`。

提示用户可选配置 hooks 以增强状态追踪：

```
团队状态追踪已初始化（.ys_team/status.md）。
各工作流环节会在关键节点自动更新状态。

如需更细粒度的事件采集（文件变更、session 等），可参考 scripts/hooks-template.json 配置 Claude Code hooks。
```

## After Init

- Use the generated local `.ys_team/` as the project's baseline.
- Treat the bundled baseline as the default workflow source, not as a rigid project copy.
- Do not rerun init for normal project work.
- Use `ys-team-rebuild` only when project reality has materially changed.

After `.ys_team/` is generated, automatically invoke `ys-team-doc-build` to create the initial reality index (`docs/project/module-index.md`). This is required — the shared reality index is part of the minimum useful baseline.
