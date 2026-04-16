# 开始使用

## 前置条件

- 已安装 [Claude Code](https://docs.anthropic.com/en/docs/claude-code)
- Node.js 18+（用于运行安装命令）

## 安装

```bash
npx ys-team install-skills --force
```

这条命令会把 ys-team 的 skills 安装到 `~/.claude/skills/`。安装完成后，Claude Code 就能识别 ys-team 的工作流了。
如果你之后用 `npx ys-team@latest install-skills --force` 更新，CLI 会替换同名 ys-team skill，并清理已经被新版本移除的旧 ys-team skill。

如果你想装到其他位置：

```bash
npx ys-team install-skills --dest /your/path --force
```

## 初始化项目

打开你的项目目录，对 Claude 说：

```
用 ys-team-init 初始化这个项目
```

init 会做这些事：

- 扫描你的项目结构（识别是 Python、Java、前端还是其他类型）
- 在项目里创建 `.ys_team/` 目录（角色定义、策略、模板）
- 生成 `TEAM.md`（工作流配置）
- 生成现实索引（`docs/project/module-index.md`，记录你的项目模块关系）
- 如果项目还没有 `AGENTS.md`，生成一份（让 Claude Code 知道要走 ys-team 工作流）

你不需要理解这些文件的内部结构。init 完成后，直接开始工作就行。

## 可见标志

ys-team 运行时，每次回复末尾都会有一个标志，告诉你当前处于什么阶段。

当角色记忆发生实际写入时，Host Summary 前会出现通知行：

```
> **[记忆更新]** <角色名>：<一句话描述新增的经验>
```

有写入才显示，无写入不显示。这是 v0.4 新增的可见信号，表示角色经验已积累。

---

```
ys-team · 判定为 L1 patch → 直接执行
```

```
**[主持人]** ys-team · spec-talk
```

```
**[审阅]** ys-team · spec-review
```

```
**[执行中]** ys-team · spec-work
```

```
**[质检]** ys-team · qa
```

```
**[关闭]** ys-team · close
```

```
**[状态]** ys-team · status
```

如果你发现回复末尾没有这些标志，说明工作流没有启动。可以直接说：

```
请先进入 ys-team 工作流
```

## 什么时候需要 rebuild

项目形态发生明显变化时（比如加了新的主要模块、技术栈变了、团队角色调整了），对 Claude 说：

```
用 ys-team-rebuild 重估这个项目的工作流配置
```

rebuild 会重新扫描项目，更新角色、工具绑定和现实索引，但保留你已有的定制。

## 更新 ys-team

```bash
# 检查是否有新版本
npx ys-team check-update

# 更新到最新版
npx ys-team@latest install-skills --force
```

skills 更新后，项目里的 `.ys_team/` 不会自动变化。如果新版本有结构调整，再跑一次 rebuild。

对已经接入 ys-team 的项目，如果你看到项目里的 `.ys_team/VERSION` 低于当前 baseline 版本，这表示“项目本地工作流基线还没同步”，而不是技能没装上。处理方式是：更新 skills 后，再执行一次 `ys-team-rebuild`。

## 常见问题

**Q: init 之后什么都没变？**
确认 skills 安装路径正确。Claude Code 默认从 `~/.claude/skills/` 加载 skills。

**Q: 每次请求都要走完整流程，太重了？**
ys-team 会自动判断复杂度。简单改动（修拼写、改注释）直接执行，不走任何流程。如果你觉得判断不准，可以直接告诉 AI："这是个小改动，直接改就行。"

**Q: 我想暂时不用 ys-team？**
删除项目里的 `AGENTS.md` 和 `CLAUDE.md` 中的 ys-team 相关配置即可。`.ys_team/` 目录可以保留，下次想用的时候直接恢复配置。

**Q: 支持哪些项目类型？**
init 会自动识别 Python、Java、前端（React）、全栈项目。其他类型使用通用配置，也能正常工作。
