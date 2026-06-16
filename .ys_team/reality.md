# 约束与风险地图

> 本仓现实索引由 `docs/project/module-index.md` 承载。
> 本文件只记录 agent 难以从当前代码直接推断的约束、风险和本地 SOP，不复述目录结构。

详见 [docs/project/module-index.md](../docs/project/module-index.md)。

## 项目类型

- 类型：Markdown-first method repository
- 主要技术栈：Markdown / Node.js CLI / npm package

## 硬约束

| 约束 | 影响范围 | 验收提示 |
|------|----------|----------|
| 非 trivial 改动先形成 verifier 卡 | 方法论、skills、baseline、CLI、发布入口 | spec 写清 Write-Scope、Delete-Scope、保真度等级、人等价验收脚本和 Feedback Loop |
| baseline 双副本必须全量一致 | `examples/baseline/`、`skills/ys-team/baseline/` | `diff -qr examples/baseline skills/ys-team/baseline` 无输出 |
| 本仓 release-first | `package.json`、baseline VERSION、npm 发布链路、git tag | close 前必须完成版本一致性、`npm pack`、`npm publish`、合回 `main`、tag 和 push |
| 文档同步是完成前置条件 | `README.md`、`docs/`、`skills/*/SKILL.md`、`.ys_team/` | 受影响文档与实现同次交付更新 |

## 高风险区域

| 区域 | 风险 | 需要的 verifier |
|------|------|-----------------|
| 方法论定义与术语 | 增加概念负担或与公开文档不一致 | 关键词/反向关键词检查，方法论文档与 skill 文案对照 |
| baseline / init / rebuild | 下游项目拿到不完整或过期结构 | baseline 双副本 diff、模板文件完整性检查、VERSION 对齐 |
| CLI / npm 分发 | 发布包缺文件或入口失效 | `npm pack --dry-run`、CLI help/路径检查、发布后 registry 证据 |
| spec 生命周期目录 | 归档、active、completed 状态漂移 | status 与 `docs/specs/` 目录对照，evidence 可复核 |

## 项目本地 SOP

| 场景 | 入口 | 交付清单 |
|------|------|----------|
| 非 trivial 方法论 / skill / baseline 改动 | `docs/specs/queued/<id>/spec.md` | spec-review PASS、work 分支、QA PASS、release-first close |
| baseline rebuild / init 相关改动 | `skills/ys-team-init/SKILL.md`、`examples/baseline/` | 保留本地定制，提示旧结构迁移，验证双副本一致 |
| 发布收口 | `docs/project/npm-publish.md`、`.ys_team/rules.md` Release Gate | 版本一致性、`npm pack`、`npm publish`、merge main、tag、push |

## 权威材料

- `docs/project/module-index.md`：模块关系与影响面索引。
- `docs/methodology/overview.md`：方法论定义与当前公开口径。
- `docs/methodology/reference.md`：规则细节、verifier levels、release gate。
- `README.md`：使用者入口。
- `.ys_team/glossary.md`：项目术语。

## 领域语言

项目术语见 `.ys_team/glossary.md`。当 spec 中出现可能漂移的术语时，先在 glossary 登记再讨论。

## 更新记录

| 时间 | 变更 |
|------|------|
| 2026-06-12 | rebuild 到 v1 约束与风险地图口径，保留 `docs/project/module-index.md` 为现实索引权威入口 |
| 2026-05-07 | 0.6.0 Spec B 接入领域语言层（glossary.md） |
| 2026-04-20 | 迁移到 0.5.0 结构，现实索引指向外部 module-index |
