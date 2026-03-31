# ys-team 项目概览

## 项目定位

`ys-team` 是一个面向 AI 团队治理的轻量方法论仓库。

它的目标不是提供重型流程系统，而是提供：

- 一组稳定的治理原则
- 一组可分发的 skills
- 一套可在项目内本地化的 baseline 工作流
- 一种以 Spec 为中心的工作方式

## 当前状态

当前仓库刚建立第一版骨架，主要承载：

- `ys-team` 理念入口 skill
- `examples/baseline/` 默认工作流骨架
- `ys-team-init` 初始化 skill
- `ys-team-rebuild` 重建 skill
- 一组支撑 discussion / spec / work / acceptance 的静默内部 skills
- 本仓自用的 `.ys_team/` 配置
- 一份记录后续产品化方向的 queued spec

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

## 默认落地模型

当前仓库的落地模型是：

- `ys-team` 提供方法论和公开入口
- `examples/baseline/` 承载默认工作流骨架
- `ys-team-init` 把 baseline 按项目现实落到本地
- 静默内部 skills 支撑 discussion、spec、work、status、submit 等能力

目标不是让用户理解全部 skill，而是让用户在 init 后直接开始工作。
