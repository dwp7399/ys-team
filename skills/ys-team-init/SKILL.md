---
name: ys-team-init
description: "Initialize or rebuild a repository-local ys-team baseline. Generate the smallest useful .ys_team setup from project reality, rebuild when project shape changes, and maintain the reality index."
---

# ys-team-init

初始化或重建项目本地 ys-team baseline。

## Purpose

- 首次使用：从 bundled baseline 生成最小 `.ys_team/` 结构
- 重建（`--rebuild`）：项目形态变化后最小化更新
- 两种模式共享同一 skill，通过是否已存在 `.ys_team/` 自动判断

## Baseline Source

按以下顺序解析 baseline 资源：
1. `examples/baseline/`（仓库内开发）
2. `../ys-team/baseline/`（npm 安装后）

都不存在则报错。

## Init 模式（首次）

### 语言检测

1. 检查用户 CLAUDE.md 中的语言偏好
2. 检查系统 locale
3. 无法判断时询问用户

### 项目类型检测

| 检测信号 | 项目类型 |
|----------|----------|
| requirements.txt / pyproject.toml | python-backend |
| pom.xml / build.gradle | java-backend |
| package.json + React | frontend-react |
| 前后端都有 | fullstack |
| 以上都不匹配 | general |

### 产出文件

从 baseline 复制并适配：

- `.ys_team/config.yaml` — 根据项目类型调整角色列表
- `.ys_team/rules.md` — 从 baseline 复制
- `.ys_team/reality.md` — 生成现实索引（见下文）
- `.ys_team/status.md` — 空模板
- `.ys_team/VERSION` — 当前 baseline 版本
- `.ys_team/templates/checklist.md` — 从 baseline 复制
- `.ys_team/templates/spec.md` — 从 baseline 复制
- `.ys_team/memory/` — 根据 config.yaml roles 生成空记忆文件
- `docs/specs/`（目录结构）
- `AGENTS.md`（如不存在，从 baseline 适配生成）

### 记忆初始化

根据 config.yaml 的 roles 列表，为每个角色创建空记忆文件：

```
.ys_team/memory/<role-id>.md
```

文件初始内容：
```markdown
# <角色名> 经验记忆

## 当前核心原则

（尚无经验积累）

## 经验条目

（尚无条目）
```

## Rebuild 模式

当 `.ys_team/` 已存在时自动进入 rebuild 模式。

### 旧结构检测

如果发现以下旧结构文件，输出迁移提示：
- `policy.md` → 已替换为 `rules.md`
- `team.md` → 已替换为 `config.yaml`
- `delivery-flow.md` → 已替换为 `templates/checklist.md`
- `toolbox/` → 已删除，不再需要
- `evolution/` → 已删除，不再需要
- `TEAM.md`（项目根目录）→ 配置已收进 `config.yaml`

### 版本检查

1. 读取项目 `.ys_team/VERSION`
2. 对比 baseline VERSION
3. 版本不同时提示用户是否同步
4. 同步时保留项目本地定制

### 重估规则

- 改最小面：只更新确实需要变化的部分
- 保留本地化：不覆盖项目已定制的内容
- 版本对齐：更新 VERSION

### 记忆健康检查

1. 角色记忆文件与 config.yaml roles 对齐
   - 新角色缺记忆 → 创建空文件
   - 角色已移除但记忆存在 → 保留，标记 `archived: true`
2. 条目超过 15 条 → 合并相似条目，重新生成摘要头
3. 摘要头过时 → 从条目重新提炼

## 现实索引生成（合并自 ys-team-doc-build）

Init 和 rebuild 完成后，自动生成或更新 `.ys_team/reality.md`。

### 核心原则

- 关系优先：先建立模块间依赖关系图
- 摘要辅助：每个模块 2-3 句业务职责摘要
- 规模自适应：小项目详细索引，大项目只索引核心模块

### 规模策略

| 项目规模 | 策略 |
|----------|------|
| 小（<500 文件） | 详细模块索引 + 关键类描述 |
| 中（500-2000） | 模块索引 + 入口点列表 |
| 大（>2000） | 核心模块 + 分层入口点 |

### 执行步骤

1. 检测语言和构建工具
2. 估算规模（排除 target/dist/node_modules/.git）
3. 识别模块边界（语言特定信号）
4. 提取模块间关系（Grep 扫描入口、服务、数据访问、消息、外部依赖）
5. 生成业务摘要（每模块 2-3 句）
6. 写入 `.ys_team/reality.md`

### 输出格式

```markdown
# 项目现实索引

**项目类型**: [检测结果]
**规模**: [Small/Medium/Large] (~N 文件)
**更新时间**: [YYYY-MM-DD]

## [模块名]
**职责**：[2-3 句业务摘要]

**关系**：
- 入口：[入口类]
- 数据访问：[mapper/repository]
- 外部依赖：[API/SDK]
- 被依赖：[依赖此模块的模块]
```

### 验证

- 每个模块有非空职责摘要
- 依赖关系双向一致
- 不编造条目

### Token 成本

生成超过 ~80k tokens 时警告用户，建议缩减到核心模块。

## After Init/Rebuild

- 使用生成的 `.ys_team/` 作为项目 baseline
- 正常工作不需要重新 init
- 只在项目形态明显变化后 rebuild

## Success Criteria

Init/rebuild 后项目可以立即使用 ys-team：
- 讨论可以收敛为 spec
- spec 可以指导执行
- 执行可以用证据验收
