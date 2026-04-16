# 开始使用

## 前置条件

- 已安装 [Claude Code](https://docs.anthropic.com/en/docs/claude-code)
- Node.js 18+（用于运行安装命令）

## 安装

```bash
npx ys-team install-skills --force
```

这条命令把 ys-team 的 skills 安装到 `~/.claude/skills/`。更新时用 `npx ys-team@latest install-skills --force`，CLI 会替换同名 skill 并清理旧版本移除的 skill。

自定义安装路径：

```bash
npx ys-team install-skills --dest /your/path --force
```

## 初始化项目

打开你的项目目录，对 Claude 说：

```
用 ys-team-init 初始化这个项目
```

init 会做这些事：

- 扫描项目结构（识别 Python、Java、前端等类型）
- 创建 `.ys_team/` 目录（config.yaml、rules.md、模板）
- 生成现实索引（`.ys_team/reality.md`，记录项目模块关系）
- 如果没有 `AGENTS.md`，生成一份

你不需要理解这些文件的内部结构。init 完成后直接开始工作。

## 日常使用

装好之后正常和 AI 对话。ys-team 自动判断每个请求该走什么路径：

**小修小补** — “帮我修一下这个拼写错误”
直接改，不需要任何流程。

**明确的小范围改动** — “帮我把这三个文件的日志格式统一一下”
直接改，在状态记录里留一笔。

**需要想清楚的改动** — “帮我给用户系统加一个注销功能”
先讨论 → 形成 spec → 按 spec 执行 → 验收。

## 可见标志

ys-team 运行时，每次回复末尾都有标志，告诉你当前阶段：

```
ys-team · 判定为 L1 patch → 直接执行
```

```
**[主持人]** ys-team · spec-talk
```

```
**[执行中]** ys-team · spec-work
```

如果回复末尾没有标志，说明工作流没启动，可以说：`请先进入 ys-team 工作流`

## 什么时候需要 rebuild

项目形态明显变化时（新增主要模块、技术栈变了、角色调整），对 Claude 说：

```
用 ys-team-init --rebuild 重估这个项目
```

rebuild 会重新扫描项目，更新角色和现实索引，保留已有定制。

## 更新 ys-team

```bash
npx ys-team check-update
npx ys-team@latest install-skills --force
```

skills 更新后，项目里的 `.ys_team/` 不会自动变化。如果新版本有结构调整，再跑一次 rebuild。

## 常见问题

**Q: init 之后什么都没变？**
确认 skills 安装路径正确。Claude Code 默认从 `~/.claude/skills/` 加载。

**Q: 每次请求都走完整流程，太重了？**
ys-team 自动判断复杂度。简单改动直接执行。如果判断不准，直接说”这是个小改动，直接改就行。”

**Q: 我想暂时不用 ys-team？**
删除 `AGENTS.md` 和 `CLAUDE.md` 中的 ys-team 配置即可。`.ys_team/` 可以保留。
