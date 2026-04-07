# ys-team 项目概览

## 项目定位

`ys-team` 是一个面向 AI 团队治理的轻量方法论仓库。

它的目标不是提供重型流程系统，而是提供：

- 一组稳定的治理原则
- 一组可分发的 skills
- 一套可在项目内本地化的 baseline 工作流
- 一种以 Spec 为中心的工作方式

## 当前状态

当前仓库已完成第一版骨架，并进入收口阶段，主要承载：

- `ys-team` 理念入口 skill
- `examples/baseline/` 默认工作流骨架
- `ys-team-init` 初始化 skill
- `ys-team-rebuild` 重建 skill
- 一组支撑 discussion / spec / work / acceptance 的静默内部 skills
- 一份供本仓和下游项目共用的 baseline version / reality index 约束
- 本仓自用的 `.ys_team/` 配置
- 一组用于收口产品化细节并可继续演进的 specs

## 核心原则

- 现实先于生成。
- 规格先于执行。
- 讨论归于收敛。
- 证据胜于感觉。

## 目标用户

- 想在项目内使用 AI 员工协作的团队
- 想以低侵入方式给 Python 或 Java 项目接入 spec-first 工作方式的团队
- 想把项目本地规则和全局方法论分层管理的团队

## 当前边界

当前仓库先不追求完整的技能矩阵和自动化安装器。

当前优先级是：

1. 收口方法论定义
2. 明确 baseline / init / rebuild 的职责边界
3. 给 Python / Java 项目提供可解释、可起步的接入方式
4. 让 init 后的项目能直接进入类似 `ai-gateway` 的默认工作流
5. 让 ys-team 工作流在用户响应中具备稳定、明显的可见标志

## 工作流可见标志

`ys-team` 当前要求所有工作流响应在末尾留下明显标志，用来判断是否真的处于工作流内。

- 路由判断：`` `ys-team` · [判断结果] → [下一步] ``
- discussion / spec-talk：`**[主持人]** ys-team · spec-talk`
- spec-work：`**[执行中]** ys-team · spec-work`
- submit：`**[验收]** ys-team · submit`
- status：`**[状态]** ys-team · status`

如果缺少这些标志，应视为还没有真正进入 ys-team 工作流。

## npm 分发边界

仓库已提供双模式 npm 安装面：

- 全局模式：通过 `install-skills` 安装到 `~/.agents/skills`
- 项目模式：通过 `init-project` 安装到项目内 `.agents/skills`，并下发 baseline 版 `AGENTS.md` / `CLAUDE.md`

当前 npm 面已经能完成“把 ys-team skills 装到用户级或项目级目录”这一核心动作。

当前仍不把 npm 包定义为完整安装器；目标项目接入仍需要后续执行 `ys-team-init`。

另一个边界是：仓库已具备可发布形态，但真实 npm registry 发布仍依赖发布者自己的 npm 账号和凭证。

## 默认落地模型

当前仓库的落地模型是：

- `ys-team` 提供方法论和公开入口
- `examples/baseline/` 承载默认工作流骨架
- `.ys_team/` 作为方法仓自用本地基线，并显式对齐 baseline version
- `ys-team-init` 把 baseline 按项目现实落到本地
- 静默内部 skills 支撑 discussion、spec、work、status、submit 等能力

目标不是让用户理解全部 skill，而是让用户在 init 后直接开始工作。
