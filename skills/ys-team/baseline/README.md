# baseline

`baseline` 是 `ys-team` 当前默认工作流的公开承载。

它不是某个项目的完整复制品，而是从已验证项目工作流中提纯出来的默认骨架。

## 作用

- 作为 `ys-team-init` 的默认工作流来源
- 作为使用者理解“初始化后项目会长成什么样”的样例
- 作为后续新增 preset 前的默认 baseline

## 设计原则

- 保留通用协作机制
- 保留 spec-first 骨架
- 保留角色、模板、证据和文档同步机制
- 不保留具体项目的领域角色、目录结构和技术栈命令

## 包含内容

- `.ys_team/`
- `docs/specs/`
- `docs/roadmap/`
- `docs/project/`

## 默认能力目标

基于 `baseline` 初始化后的项目，应直接具备这条默认链路：

- discussion
- spec
- work
- acceptance

这些能力可以由多个静默内部 skills 支撑，但不要求用户主动点名调用。

## 可见标志

初始化后的项目在执行 `ys-team` 工作流时，回复末尾必须出现明显标志：

- 路由判断：`` `ys-team` · [判断结果] → [下一步] ``
- discussion / spec-talk：`**[主持人]** ys-team · spec-talk`
- spec-work：`**[执行中]** ys-team · spec-work`
- qa：`**[质检]** ys-team · qa`
- close：`**[关闭]** ys-team · close`
- status：`**[状态]** ys-team · status`

如果没有这些标志，说明当前还没有真正进入 ys-team 工作流。

## 不包含内容

- 某个单一项目的领域角色
- 某个语言栈的固定验证命令
- 某个业务系统的目录映射
