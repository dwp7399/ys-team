# ys-team

给项目装一层 AI 协作纪律。安装一次，正常开发。

## 你为什么会需要它

用 AI agent 写代码很爽，但你大概遇到过这些情况：

- AI 改了不该改的文件，你事后才发现
- 一个"简单需求"越改越大，最后不知道改了什么
- 出了 bug 回头看，找不到当时为什么这样改
- 你说"加个接口"，AI 直接动手，没人讨论过这个接口该长什么样

ys-team 不是要让你记住一堆命令，也不是把工作流拆成需要手动选择的工具箱。它的目标是：你照常描述需求，ys-team 在仓库本地自动判断复杂度，简单事直接做，复杂事先讨论成规格，再执行、验证和收口。

> AI 没有约束时会怎样？看 [反模式案例](docs/guide/why-ys-team.md#反模式案例)。

## 它怎么工作

四个原则：

- 现实先于生成 — AI 先看你的项目长什么样，再决定怎么改
- 规格先于执行 — 复杂改动先写清楚要做什么，再动手
- 讨论归于收敛 — 多个角色审视同一个问题，但目标是形成结论，不是无限展开
- 证据胜于感觉 — 改完了要能验证，不是"我觉得改好了"

实际路径：你发一个请求 → ys-team 判断这件事有多复杂 → 简单的直接改 → 小范围改动留痕 → 高风险改动自动进入讨论、规格、执行、验证和收口。

默认 baseline 还会根据项目类型帮你选一套角色绑定。ys-team 不自己维护一个巨大的角色池，而是把治理槽位固定下来，再从推荐来源里挑合适角色落到本地配置。

`.ys_team/` 是项目本地基线，里面保存规则、现实索引、角色绑定、状态、模板和记忆。项目结构变化后运行 rebuild，ys-team 会在保留本地定制的前提下重估基线。

## 适用范围

ys-team 更适合：
- 个人开发者用 AI coding agent 写代码，想让 AI 更靠谱
- 小团队多人共用 AI agent 协作，需要基本的治理约束
- 希望给 AI 编码建立最低纪律的任何团队

对已有成熟工程治理的大团队，ys-team 不一定直接替代现有流程，更适合作为 AI 协作层的补充。

不适用于不涉及代码改动的纯对话场景。

## 30 秒开始

```bash
# 安装（默认装到 ~/.claude/skills）
npx ys-team install-skills --force

# 在你的项目里，对 Claude 说：
# "用 ys-team-init 初始化这个项目"
```

装好之后，在项目里执行 `ys-team-init`，工作流就启用了。详细的首次使用指南见 [开始使用](docs/guide/getting-started.md)。

默认外部角色池来源是 `agency-agents`，但 `init/rebuild` 使用的是 baseline 里钉住的离线来源描述，不要求运行时联网。

## 日常怎么用

装好之后，你正常和 AI 对话就行。ys-team 会自动判断每个请求该走什么路径：

**小修小补** — "帮我修一下这个拼写错误"
直接改，不需要任何流程。和没装 ys-team 一样。

**明确的小范围改动** — "帮我把这三个文件的日志格式统一一下"
直接改，但会在状态记录里留一笔，方便以后追溯。

**需要想清楚的改动** — "帮我给用户系统加一个注销功能"
先讨论（这个功能该怎么做、影响哪些模块、有什么风险），形成明确的规格，再按规格执行，最后验收。

详细的使用指南见 [开始使用](docs/guide/getting-started.md)。

ys-team 会持续吸收外部 agent workflow 的好模式，但吸收位置在内部路由、baseline 规则、模板和文档口径里。用户不需要决定什么时候该启动某个具体工作流。

## 文档地图

| 文档 | 说明 |
|------|------|
| [为什么需要 ys-team](docs/guide/why-ys-team.md) | 问题、解法、反模式案例 |
| [开始使用](docs/guide/getting-started.md) | 安装、初始化、日常使用、常见问题 |
| [方法论规范](docs/methodology/) | 形式化的规则和协议定义（深入阅读） |

## CLI 参考

```bash
npx ys-team install-skills [--dest <dir>] [--force] [--dry-run]
npx ys-team init-project [--dir <project-dir>] [--force] [--dry-run]
npx ys-team check-update
```

`install-skills --force` 会替换当前 ys-team 已安装的同名 skill，并清理已经不再由当前 npm 包提供的旧 ys-team skill。`check-update` 在版本落后时，会额外展示缺失版本的主要变化、关键文件和迁移建议；如果远程摘要提取失败，则会降级为提示查看 `CHANGELOG.md` 链接。

## 仓库发版约束

ys-team 方法论版本和 npm 发布版本不是同一条线：

- npm 发布线：`package.json` + baseline `.ys_team/VERSION`
- 方法论线：`docs/methodology/VERSION`

本仓发版使用 `release/<version>` 分支。只有 `npm publish` 成功后，代码才会合并回 `main`，随后创建同版本 git tag。

## 兼容性说明

0.5.0 对 baseline 结构做了不兼容变更（config.yaml 替代 TEAM.md + team.md，rules.md 替代 policy.md，checklist 替代 delivery-flow）。已接入 0.4.x 的项目执行 `ys-team-init --rebuild` 时会收到迁移提示。

## The Zen of ys-team

- 现实先于生成。
- 规格先于执行。
- 讨论归于收敛。
- 证据胜于感觉。
