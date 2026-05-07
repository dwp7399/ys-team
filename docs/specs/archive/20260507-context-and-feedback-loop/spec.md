---
Spec-Type: control
Initiative: 20260507-context-and-feedback-loop
Status: draft
Owner-Session: 2026-05-07-spec-talk-B
Write-Scope:
  - examples/baseline/.ys_team/templates/spec.md
  - examples/baseline/.ys_team/templates/glossary.md
  - examples/baseline/.ys_team/reality.md
  - examples/baseline/.ys_team/VERSION
  - skills/ys-team/baseline/.ys_team/templates/spec.md
  - skills/ys-team/baseline/.ys_team/templates/glossary.md
  - skills/ys-team/baseline/.ys_team/reality.md
  - skills/ys-team/baseline/.ys_team/VERSION
  - .ys_team/templates/spec.md
  - .ys_team/glossary.md
  - .ys_team/reality.md
  - .ys_team/VERSION
  - skills/ys-team-spec-talk/SKILL.md
  - skills/ys-team-spec-work/SKILL.md
  - docs/methodology/overview.md
  - docs/methodology/reference.md
  - docs/methodology/VERSION
  - package.json
  - docs/specs/active/20260507-skill-structure-refactor/
  - docs/specs/active/20260507-context-and-feedback-loop/
  - docs/specs/archive/
  - .ys_team/status.md
Delete-Scope: []
Depends-On:
  - 20260507-skill-structure-refactor
Verification: "见 ## Verification"
---

# 0.6.0 Spec B — 领域语言层 + 反馈环纪律 + grill 子模式 + 0.6.0 release 收口

## Background

延续 0.6.0 迭代规划。Spec A（skill 结构重构）已完成全链路并保留在 `docs/specs/active/`，等本 spec close 时统一归档并发版 0.6.0。

本 spec 承担 mattpocock/skills 调研中识别出的 3 个高价值改进 + 0.6.0 release 收口：

1. **领域语言层** — 借鉴 mattpocock 的 CONTEXT.md 模式。reality.md 是模块结构索引，缺一层"项目术语词典"。spec-talk 经常陷入术语漂移。引入 `.ys_team/glossary.md`（可选、空骨架不阻塞）。
2. **反馈环纪律** — 借鉴 mattpocock diagnose skill 的核心洞察："有快速确定的 pass/fail 信号，bug 就解了 90%"。spec template 缺一层"如何快速判定改对了"。在 `## Verification` 下加 `### Feedback Loop` 子段（必填，允许 `N/A — <理由>`）。
3. **grill 子模式** — 借鉴 mattpocock grill-me 的反向访谈纵深模式。当用户原始需求模糊时，多角色横向讨论会过早分叉。spec-talk 加 grill 子模式：fan-out 前先单线纵深问询。
4. **0.6.0 release 收口** — 本 spec close 阶段 bump 4 处版本号（package.json + 3 个 baseline VERSION）+ npm publish + 双 spec 合并归档 + main 合回 + tag + push。

## Goals

- 领域语言层落地（baseline 模板 + 本仓实例 + skill 加载）
- 反馈环纪律落地（spec template 字段 + spec-work / qa 强制校验）
- grill 子模式落地（spec-talk SKILL.md 增加子流程）
- 方法论文档同步（overview / reference / VERSION）
- 0.6.0 release 完成（4 处版本号、npm publish、双 spec 合并归档、main 合回、tag + push）

## Non-goals

- 不实施 mattpocock 的其他 skill（tdd / diagnose / triage / improve-codebase-architecture）— 我们只吸收原则，不引入对应 skill
- 不引入 ADR 概念（reality.md + spec 现阶段足够）
- 不动 ys-team / ys-team-init 的 SKILL.md（Spec A 范围已覆盖）
- 不动 status.md / config.yaml 结构
- 不重写 4 个 skill 的 description / wrapper（Spec A 范围）
- 不让空 glossary 阻塞任何流程
- 不让 grill 子模式无限循环（最多 5-7 轮强制收口）
- 不重构 reality.md 现有结构（仅在末尾追加 glossary 指引）

## Deliverables

### D1. baseline 模板（双副本 examples/ + skills/ys-team/baseline/）

**spec.md 模板** — 在 `## Verification` 段下新增子段 `### Feedback Loop`，放在 `可接受的 evidence 类型` 之前：

```markdown
### Feedback Loop

本 spec 改对了的最快 pass/fail 信号是什么？目标复现成本 < 30 秒。

- 命令或步骤：<具体命令 / 操作>
- 期望信号：<grep 行数 / 退出码 / 输出片段>
- 复现成本：<秒数估计>

如不适用，写 `N/A — <一句话理由>`。
```

**glossary.md 模板**（新文件）：

```markdown
# 项目术语

> 项目内统一的语言。当某个概念在 spec / 文档 / 对话中可能被叫成不同名字时，登记到这里。
> 空文件不阻塞任何流程；ys-team-spec-talk 加载时若为空则跳过术语对齐环节。

## 术语

| 术语 | 含义 | 避免说法 |
|------|------|---------|
| <例：用户> | <已注册并完成首次登录的人> | <账号、客户、访客> |

## 更新记录

| 时间 | 变更 |
|------|------|
| — | 初始化 |
```

**reality.md 模板** — 在末尾追加一段"领域语言"指引（不修改现有"模块概览"/"依赖关系"段）：

```markdown
## 领域语言

项目术语见 `.ys_team/glossary.md`。当 spec 中出现可能漂移的术语时，先在 glossary 登记再讨论。
```

### D2. 本仓自用实例

- `.ys_team/templates/spec.md`：与 baseline 模板同步
- `.ys_team/glossary.md`：先空骨架（含 1-2 条本仓真实术语示例：spec / baseline / 同步副本 等）
- `.ys_team/reality.md`：追加领域语言指引段

### D3. ys-team-spec-talk SKILL.md 改动（wrapper-only 模式，不破坏 Spec A 结构）

- `<supporting-info>` 内的 `## Read Order` 表追加：`8. .ys_team/glossary.md（如存在且非空）`
- `<supporting-info>` 内的 `## Standard Flow` 在第 1 步后插入新步骤："**1.5 grill 检查** — 若用户显式声明 `先 grill / 访谈我` 或主持人意图三段判断为 `对象=idea, 阻塞=边界不清`，进入 grill 子模式（见下方）。"
- `<supporting-info>` 末尾新增 `## Grill 子模式` 章节：

```markdown
## Grill 子模式

适用于用户原始需求模糊、多角色横向讨论会过早分叉的场景。

### 触发

- 用户显式：`先 grill 我` / `访谈我` / `我也没想清楚，问我`
- 主持人自动：意图三段判断 `对象=idea, 阻塞=边界不清` 时

### 流程

1. 主持人识别 3-5 个核心待澄清问题，构成问题树
2. 选第一个分支问 1 个问题，等用户回答
3. 根据回答深入追问或切下一分支
4. **最多 5-7 轮强制收口**
5. 收口产物：1 段「已澄清的命题」清单
6. 收口后 fan-out 到多角色 Standard Flow

### 退出

- 用户说 `够了 / 够清楚了` → 立即收口
- 5-7 轮上限到 → 强制收口
- 主持人判断"已能形成可讨论命题"→ 主动收口

### 边界

- 一次只问一个问题
- 不在 grill 阶段做多角色讨论
- grill 收口后必须进入 fan-out，不直接产出 spec
```

- `<supporting-info>` 内 `## Spec 产出要求` 段追加："spec 写入前先检查 glossary：spec.md 中出现的项目特定术语，若未登记，提示用户是否登记到 glossary。"

### D4. ys-team-spec-work SKILL.md 改动（wrapper-only 模式）

- `<supporting-info>` 内 `## Read Order` 表追加：`7. spec.md 中的 ### Feedback Loop 段（如存在）`
- `<supporting-info>` 内 `## Rules` 段追加：`- spec.md 必须含 ### Feedback Loop 段；缺失则停止并回到 spec-talk`
- `<supporting-info>` 内 `## Execution` 段第 4 步后插入：`4.5 校验 Feedback Loop 复现成本：执行 Feedback Loop 命令并记录耗时；与 spec 声明对照`

### D5. 方法论文档

- `docs/methodology/overview.md`：新增「领域语言层」与「反馈环纪律」两段（每段 ~5 行）
- `docs/methodology/reference.md`：在 spec template 字段说明中加 `### Feedback Loop` 条目；在 baseline 文件清单中加 `glossary.md`
- `docs/methodology/VERSION`：bump（具体版本号由 spec-work 决定，建议从 1.0.x → 1.1.0，因为引入新概念）

### D6. close 阶段（release-first）

由 close-owner（gate 角色）执行：

1. **版本号同步 bump 到 0.6.0**（4 处）：
   - `package.json`
   - `examples/baseline/.ys_team/VERSION`
   - `skills/ys-team/baseline/.ys_team/VERSION`
   - `.ys_team/VERSION`
2. **npm 发布预检**：`npm whoami`（若 401，停止报告）
3. **`npm pack` 验证**：检查产物结构与体积
4. **`npm publish`**：等待 registry 返回 `ys-team@0.6.0`
5. **双 spec 合并归档**（同一 commit）：
   - `git mv docs/specs/active/20260507-skill-structure-refactor docs/specs/archive/`
   - `git mv docs/specs/active/20260507-context-and-feedback-loop docs/specs/archive/`
   - 更新 `.ys_team/status.md`：移除两条活跃 spec，归档信息记入待办最末
6. **合回 main**：`git checkout main && git merge --no-ff release/0.6.0`
7. **tag + push**：`git tag v0.6.0 && git push origin main && git push origin v0.6.0`

## Acceptance Criteria

### baseline 与实例

- **AC-01**：3 处 spec.md 模板（baseline × 2 + 本仓实例）均含 `### Feedback Loop` 子段，位置在 `## Verification` 之下、`可接受的 evidence 类型` 之前
- **AC-02**：3 处 glossary.md（baseline × 2 + 本仓实例）存在，含「术语」表头与「更新记录」段；空骨架内不为空（至少 1 条示例条目）
- **AC-03**：3 处 reality.md（baseline × 2 + 本仓实例）末尾追加领域语言指引段，原有「模块概览」/「依赖关系」段未被改动

### skill

- **AC-04**：skills/ys-team-spec-talk/SKILL.md 的 `<supporting-info>` 内：Read Order 含 glossary 加载项；Standard Flow 含 grill 检查步骤；新增 `## Grill 子模式` 章节含触发 / 流程 / 退出 / 边界 4 个子段；Spec 产出要求含 glossary 登记提示
- **AC-05**：skills/ys-team-spec-work/SKILL.md 的 `<supporting-info>` 内：Read Order 含 Feedback Loop 加载项；Rules 含 Feedback Loop 必填校验；Execution 含 Feedback Loop 复现成本校验步骤
- **AC-06**：两个 SKILL.md 的 `<what-to-do>` / `<supporting-info>` wrapper 结构与 description 触发短语未被破坏（Spec A 成果保持）

### 方法论文档

- **AC-07**：docs/methodology/overview.md 含「领域语言层」与「反馈环纪律」两段
- **AC-08**：docs/methodology/reference.md 的 spec template 字段说明含 `### Feedback Loop` 条目；baseline 文件清单含 `glossary.md`
- **AC-09**：docs/methodology/VERSION 已 bump

### release（close 阶段）

- **AC-10**：4 处版本号（package.json + 3 处 .ys_team/VERSION）均为 `0.6.0`
- **AC-11**：`grep -r "0\.5\.3"` 在 4 处版本号文件中无结果（除 CHANGELOG / 历史记录）
- **AC-12**：`npm view ys-team@0.6.0` 返回 registry 记录（npm publish 成功证据）
- **AC-13**：双 spec 已从 `docs/specs/active/` 移动到 `docs/specs/archive/`
- **AC-14**：main 分支含 release/0.6.0 的合并提交；`v0.6.0` tag 存在并指向合并提交
- **AC-15**：origin/main 与 origin/v0.6.0 已 push（`git ls-remote` 验证）

### Feedback Loop（本 spec 自身的反馈环）

- **AC-16**：本 spec 的 `### Feedback Loop` 段非空且复现成本声明 < 60 秒（本 spec 横跨多模块，30 秒可能不够，放宽到 60 秒）

## Verification

```bash
cd /Users/ys/base/code/aigc/ys-team

# AC-01: spec.md 模板含 Feedback Loop
for f in examples/baseline/.ys_team/templates/spec.md \
         skills/ys-team/baseline/.ys_team/templates/spec.md \
         .ys_team/templates/spec.md; do
  grep -q "### Feedback Loop" "$f" && echo "OK: $f" || echo "FAIL: $f"
done

# AC-02: glossary.md 存在且非空
for f in examples/baseline/.ys_team/templates/glossary.md \
         skills/ys-team/baseline/.ys_team/templates/glossary.md \
         .ys_team/glossary.md; do
  [ -s "$f" ] && grep -q "## 术语" "$f" && echo "OK: $f" || echo "FAIL: $f"
done

# AC-03: reality.md 含「领域语言」段
for f in examples/baseline/.ys_team/reality.md \
         skills/ys-team/baseline/.ys_team/reality.md \
         .ys_team/reality.md; do
  grep -q "## 领域语言" "$f" && echo "OK: $f" || echo "FAIL: $f"
done

# AC-04: spec-talk SKILL.md 含新增内容
grep -q "glossary.md" skills/ys-team-spec-talk/SKILL.md && \
grep -q "## Grill 子模式" skills/ys-team-spec-talk/SKILL.md && \
echo "AC-04 OK" || echo "AC-04 FAIL"

# AC-05: spec-work SKILL.md 含 Feedback Loop 校验
grep -q "Feedback Loop" skills/ys-team-spec-work/SKILL.md && echo "AC-05 OK" || echo "AC-05 FAIL"

# AC-06: wrapper 与触发短语未被破坏
for f in skills/ys-team-spec-talk/SKILL.md skills/ys-team-spec-work/SKILL.md; do
  what=$(grep -c '<what-to-do>' "$f")
  sup=$(grep -c '<supporting-info>' "$f")
  use=$(awk '/^---$/{c++; next} c==1' "$f" | grep -c "Use when")
  [ "$what" = "1" ] && [ "$sup" = "1" ] && [ "$use" = "1" ] && echo "OK: $f" || echo "FAIL: $f"
done

# AC-07/08/09: 方法论文档
grep -q "领域语言层" docs/methodology/overview.md && grep -q "反馈环纪律" docs/methodology/overview.md && echo "AC-07 OK" || echo "AC-07 FAIL"
grep -q "Feedback Loop" docs/methodology/reference.md && grep -q "glossary" docs/methodology/reference.md && echo "AC-08 OK" || echo "AC-08 FAIL"
[ "$(cat docs/methodology/VERSION)" != "$(git show main:docs/methodology/VERSION 2>/dev/null)" ] && echo "AC-09 OK" || echo "AC-09 FAIL"

# AC-10: 4 处版本号
v_pkg=$(node -p "require('./package.json').version")
v_ex=$(cat examples/baseline/.ys_team/VERSION)
v_sk=$(cat skills/ys-team/baseline/.ys_team/VERSION)
v_self=$(cat .ys_team/VERSION)
[ "$v_pkg" = "0.6.0" ] && [ "$v_ex" = "0.6.0" ] && [ "$v_sk" = "0.6.0" ] && [ "$v_self" = "0.6.0" ] && echo "AC-10 OK" || echo "AC-10 FAIL: $v_pkg/$v_ex/$v_sk/$v_self"

# AC-11: 无 0.5.3 残留
! grep -l "0\.5\.3" package.json examples/baseline/.ys_team/VERSION \
    skills/ys-team/baseline/.ys_team/VERSION .ys_team/VERSION 2>/dev/null && \
    echo "AC-11 OK" || echo "AC-11 FAIL"

# AC-12: npm publish 成功
npm view ys-team@0.6.0 version 2>&1 | grep -q "0.6.0" && echo "AC-12 OK" || echo "AC-12 FAIL"

# AC-13: 双 spec 已归档
[ -d docs/specs/archive/20260507-skill-structure-refactor ] && \
[ -d docs/specs/archive/20260507-context-and-feedback-loop ] && \
[ ! -d docs/specs/active/20260507-skill-structure-refactor ] && \
[ ! -d docs/specs/active/20260507-context-and-feedback-loop ] && \
echo "AC-13 OK" || echo "AC-13 FAIL"

# AC-14: main 合并 + tag
git log main --oneline | head -1 | grep -q "Merge branch 'release/0.6.0'" && echo "AC-14 merge OK" || echo "AC-14 merge FAIL"
git rev-parse v0.6.0 >/dev/null 2>&1 && echo "AC-14 tag OK" || echo "AC-14 tag FAIL"

# AC-15: 已 push
git ls-remote origin main | grep -q "$(git rev-parse main)" && echo "AC-15 main OK" || echo "AC-15 main FAIL"
git ls-remote origin refs/tags/v0.6.0 | grep -q "$(git rev-parse v0.6.0)" && echo "AC-15 tag OK" || echo "AC-15 tag FAIL"
```

### Feedback Loop（本 spec 自身）

- **命令**：上述 AC-01 ~ AC-15 验证脚本（spec-work 阶段先到 AC-09，close 阶段补 AC-10 ~ AC-15）
- **期望信号**：每个 AC 输出 "OK"
- **复现成本**：spec-work 阶段 AC ~10 秒；close 阶段含 npm 调用 ~30 秒；总和 ~60 秒

可接受的 evidence 类型：
- 测试：上述 Verification 命令输出
- 构建：`npm pack` 输出
- 运行证据：`npm publish` 返回、`git log` / `git ls-remote` 输出

## Risks

| 风险 | 缓解 |
|------|------|
| npm publish 因 401 失败（前次 0.5.3 已踩过）| close 第一步 `npm whoami` 预检；失败则立即停止并提示用户 `npm login` |
| 4 处版本号漏改 | AC-10 + AC-11 双向 grep 兜底；close checklist 明确逐文件 |
| 方法论 VERSION bump 后旧基线项目 rebuild 收到迁移提示 | reference.md 写明 0.5.x → 0.6.0 的迁移点（仅追加，不破坏） |
| grill 子模式被误触发，用户体验差 | 5-7 轮强制收口；用户说 `够了` 立即退出；触发条件保守（默认人工，自动条件严格） |
| Feedback Loop 字段沦为形式（写空壳）| qa 角色挑战 N/A 理由是否成立；非 N/A 必须复现成本数值 |
| Spec A 与本 spec 在归档时 status.md 状态混乱 | close 同一 commit 同时移动两个 spec 目录 + 一次性更新 status.md |
| release/0.6.0 分支已含 Spec A 改动，本 spec 改动叠加可能合并冲突 | 本 spec 在同一 release/0.6.0 分支顺序推进，无冲突源 |
| methodology VERSION 与 baseline VERSION 失同步 | 都纳入 Write-Scope，spec-work 一次完成 |

## Rollback Plan

- spec-work 阶段：`git revert` 本 spec 的 commit；release/0.6.0 分支可保留以便重做
- close 阶段（npm publish 之前）：放弃 release/0.6.0 分支，回到 main（main 未受影响）
- close 阶段（npm publish 之后）：`npm deprecate ys-team@0.6.0 "rolled back"`（72h 内可 unpublish，否则只能 deprecate）；不合 main、不打 tag；下一轮以 0.6.1 重发

## Collaboration Summary

- **参与角色**：方法论架构师 (arch) / 产品演进负责人 (pm) / 交付守门人 (gate)
- **轮次**：3 轮（初始判断 / 分歧识别 / 收敛）
- **关键分歧与收敛**：
  1. grill 触发 — 双触发（用户显式 + 主持人自动），5-7 轮强制收口
  2. glossary 必选/可选 — 可选，空骨架不阻塞
  3. Feedback Loop 必填性 — 必填，允许 `N/A — <理由>`
  4. 方法论文档纳入 — 纳入，VERSION 同步 bump
  5. 双 spec 归档顺序 — 同一 commit 同时移动
- **依赖锚定**：本 spec `Depends-On: 20260507-skill-structure-refactor`；spec-work 必须确认 Spec A 处于 qa PASS / held 状态后才推进
- **未决问题**：methodology VERSION 具体值由 spec-work 决定（建议 1.0.x → 1.1.0）
