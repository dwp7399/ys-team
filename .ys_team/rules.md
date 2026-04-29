# 行为规则

## 8 条禁止项

| # | 级别 | 口号 | 行为 | 自检锚点 |
|---|------|------|------|----------|
| 1 | Hard Ban | 未路由不改文件 | 每个请求先完成 L0/L1/L2 判断，未判断前不得修改任何文件 | 回复中是否出现路由判断标志？ |
| 2 | Hard Ban | 未读现实不下结论 | 涉及影响范围、风险或方案选择时，必须先读现实索引或相关代码 | 结论中引用的模块/文件，是否在本轮对话中实际读取过？ |
| 3 | Hard Ban | 无 spec 不执行 | L2 改动未形成 spec.md，不得进入实现 | 是否存在对应 spec 目录且 spec.md 已写入？ |
| 4 | Hard Ban | 不越 Write-Scope | spec-work 只能修改 Write-Scope 声明的文件 | 本次 diff 中每个文件路径是否在 Write-Scope 列表内？ |
| 5 | Confirmation Ban | 范围扩大必须回头 | 发现必须修改 scope 外文件时，停止执行，回到讨论 | 是否在继续执行前显式声明了 scope 变更并获得确认？ |
| 6 | Style Ban | 不顺手动别人的代码 | 不重构无关代码、不格式化无关文件、不补未要求的功能 | 每行 diff 能否追溯到用户请求或 spec 条目？ |
| 7 | Hard Ban | 无证据不说完成 | 无 verification 结果或 evidence，不得声明完成 | close/done 前是否有可复核的验证产出？ |
| 8 | Hard Ban | 文档不同步不收口 | 受影响文档未同步更新，不得 close | Write-Scope 中的文档类文件是否全部已更新？ |

## Ban Levels

| 级别 | 含义 | 违反时行为 |
|------|------|------------|
| Hard Ban | 硬 gate | 立即停止，必须先满足条件 |
| Confirmation Ban | 软 gate | 显式声明并获得确认后可继续 |
| Style Ban | 默认禁止 | 用户明确要求时可以做 |

## Escape Clause

L0 级别请求可跳过 #1 和 #2，但必须声明跳过原因。

## 执行规则

- 改动按三级分流：L0 trivial → L1 patch → L2 spec
- L2 改动先有 spec，再按 spec 执行和验收
- 文档必须反映项目当前真实状态
- spec、实现和验收证据应保持同一次交付闭环

## 文档同步

- 模块边界变化 → 更新现实索引
- 对外行为变化 → 更新用户文档
- 同步更新应在同一次交付中完成

---

## 本仓补充规则

### Documentation Authority

| 关注面 | 权威文档 |
|--------|----------|
| 方法论定义、仓库现状 | `docs/methodology/overview.md` |
| 模块关系与影响面索引 | `docs/project/module-index.md` |
| 使用方式 | `README.md` |
| 对外 skill 定义 | `skills/*/SKILL.md` |

### Spec Rules

- spec 文件写入 `docs/specs/<phase>/<initiative-id>/`
- `phase` 使用 `queued`、`active`、`completed`、`cancelled`
- evidence 放在 initiative 目录下的 `evidence/`
- 验收必须包含可复核证据

### Release Gate

- 发布线版本由 `package.json`、`examples/baseline/.ys_team/VERSION`、`.ys_team/VERSION` 共同组成
- `docs/methodology/VERSION` 是方法论规范版本，独立于发布线
- 本仓所有非 trivial 可交付改动都按 release-first 处理；不得自行降级为“只提交不发布”
- spec-review PASS 后必须先切到 `release/<version>` 或 `work/<spec-id>` 分支，未切分支不得进入 spec-work
- close 前必须完成 npm 发布链路：版本一致性检查、`npm pack` 验证、`npm publish` 成功
- npm 发布成功后，发布分支必须合回 `main`，创建同版本 git tag，并 push main / tag
- 未完成 npm publish、合回 main、tag、push 的 spec 不得 close 或 archive

### Spec-Review Gate

semi-auto / full-auto 模式下，spec-talk 完成后自动触发独立审阅。

- PASS → 进入 spec-work（semi-auto 暂停等确认）
- REJECT → 回退到 spec-talk，重试计数 +1

### QA Gate

semi-auto / full-auto 模式下，spec-work 完成后自动触发独立验证。

- PASS → 进入 close（semi-auto 暂停等确认）
- REJECT → 回退到 spec-work，重试计数 +1
- 本仓 QA PASS 只表示实现可发布；真实 `npm publish` 成功证据由 close 阶段收集

### Quality Bar

- 根因修复，不做兼容层
- 未完成文档同步的实现视为未完成交付
- 改动方法论定义时，优先减少概念数量，避免增加用户心智负担
