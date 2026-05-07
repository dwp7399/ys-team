---
Spec-Type: control
Initiative: 20260507-skill-structure-refactor
Status: draft
Owner-Session: 2026-05-07-spec-talk
Write-Scope:
  - skills/ys-team/SKILL.md
  - skills/ys-team-init/SKILL.md
  - skills/ys-team-spec-talk/SKILL.md
  - skills/ys-team-spec-work/SKILL.md
Delete-Scope: []
Depends-On: []
Verification: "见 ## Verification"
---

# 0.6.0 Spec A — Skill 结构重构

## Background

通过对照 `mattpocock/skills`（63k stars）的 skill 写作风格，识别出本仓 4 个 ys-team-* skill 的 SKILL.md 在两个面向上有可吸收的工程化改进：

1. **description 缺触发短语** — 外部惯例是在 frontmatter description 里嵌入具体触发短语（"Use when user says X"），让 agent 路由信号更强。本仓 description 偏抽象（如 "Entry skill for the ys-team method"），自动路由命中率受影响。
2. **SKILL.md 内部缺分块** — 外部惯例用 `<what-to-do>` / `<supporting-info>` XML tag 把"被调用时立刻执行的指令"和"参考资料 / 子流程细节"分开。本仓 SKILL.md 现在两类信息混在一起，agent 解析与人工阅读都偏弱。

本 spec 是 0.6.0 迭代的第一个 spec（Spec A），定位是低风险结构重构。Spec B（领域语言层 + 反馈环纪律 + grill 子模式）在本 spec 完成后启动。两 spec 合并发布 0.6.0。

## Goals

- 4 个 ys-team-* skill 的 SKILL.md 完成结构重构
- 每个 description 含至少 3 个中文触发短语
- 每个 SKILL.md 正文用 `<what-to-do>` / `<supporting-info>` 分块，信息不丢失、章节不重排
- 调用语义不变（路由 / 讨论 / 执行流程与现状一致）

## Non-goals

- 不动 `examples/baseline/` 与 `skills/ys-team/baseline/` 同步副本（属于 Spec B 范围）
- 不动方法论文档（`docs/methodology/`、`docs/guide/`）
- 不动 spec template（`.ys_team/templates/spec.md`、`examples/baseline/.ys_team/templates/spec.md`）
- 不引入领域语言层（属于 Spec B）
- 不改 spec template 的 verification 字段（属于 Spec B）
- 不引入 grill 子模式（属于 Spec B）
- 不动 `.ys_team/` 实例数据
- 不改 `package.json` 与 `.ys_team/VERSION` 的版本号（由 Spec B close 阶段统一 bump）
- 不重排 SKILL.md 现有章节顺序、不删除任何现有信息
- 不引入硬编码英文 role-id 路径（已知风险，参见方法论架构师角色记忆）

## Deliverables

每个 skill 的 SKILL.md 重构为以下骨架：

```markdown
---
name: <skill-name>
description: <一句话定位>。Use when 用户说"<触发短语 1>"/"<触发短语 2>"/"<触发短语 3>" 等。
---

# <标题>

<what-to-do>
<被调用时立刻执行的指令：路由判断 / 入口选择 / 立即操作>
</what-to-do>

<supporting-info>
<参考资料、子流程细节、format 规范、Style、Markers 等既有章节原文保留>
</supporting-info>
```

### 各 skill 触发短语初稿（pm 提供）

- **ys-team**：
  - "用 ys-team 路由这个改动"
  - "ys-team 状态"
  - "讨论一下要不要做 X"
  - "这件事算 L0/L1/L2"
- **ys-team-init**：
  - "初始化 ys-team"
  - "rebuild baseline"
  - "项目结构变了，重建一下"
  - "装一下方法论到这个仓"
- **ys-team-spec-talk**：
  - "起一个 spec"
  - "为这件事开 spec-talk"
  - "多角色讨论一下"
  - "把刚才讨论的写成 spec"
- **ys-team-spec-work**：
  - "按 spec 执行"
  - "进入 spec-work"
  - "执行 active spec"
  - "把这个 spec 落地"

实际重构时由 spec-work 阶段最终敲定（允许微调，不增减触发短语数量）。

## Acceptance Criteria

- **AC-01**：4 个 SKILL.md 的 frontmatter `description` 各含 ≥3 个中文触发短语，且包含 "Use when" 或对等中文锚点
- **AC-02**：4 个 SKILL.md 正文均出现一个 `<what-to-do>` 标签块，块内为该 skill 被调用时立刻应执行的指令
- **AC-03**：4 个 SKILL.md 正文均出现一个 `<supporting-info>` 标签块，承载原有章节（Style、Routing 细则、Markers、Spec 产出要求等），原有信息逐字保留
- **AC-04**：原有章节顺序不重排，原有内容不删除（diff 仅新增 wrapper 与 description 增强）
- **AC-05**：4 个 skill 的调用语义不变，路由 / 讨论 / 执行流程与现状一致（用 reroute case 验证）
- **AC-06**：本 spec 不动 baseline、方法论文档、spec template、`package.json`、`.ys_team/VERSION`
- **AC-07**：本 spec qa PASS 后停在 `docs/specs/active/`，不进 close、不归档；由 Spec B 的 close 阶段统一发 0.6.0 并同时归档

## Verification

```bash
# AC-01：每个 description 含 3+ 中文触发短语 + Use when 锚点
for f in skills/ys-team/SKILL.md skills/ys-team-init/SKILL.md \
         skills/ys-team-spec-talk/SKILL.md skills/ys-team-spec-work/SKILL.md; do
  echo "=== $f ==="
  awk '/^---$/{c++; next} c==1' "$f" | grep -E "(Use when|当用户)"
done

# AC-02 / AC-03：每个 SKILL.md 出现 what-to-do 与 supporting-info 标签
for f in skills/ys-team/SKILL.md skills/ys-team-init/SKILL.md \
         skills/ys-team-spec-talk/SKILL.md skills/ys-team-spec-work/SKILL.md; do
  echo "=== $f ==="
  grep -c "<what-to-do>" "$f"
  grep -c "<supporting-info>" "$f"
done

# AC-04：与 main 对比 diff 仅新增（无删除原文行）
git diff main -- skills/ys-team*/SKILL.md | grep "^-" | grep -v "^--- " | head -20
# 期望：仅 frontmatter 内的 description 行有 - 行，其余 - 行应为 0

# AC-05：reroute case 走查（人工，evidence 中记录）
# - 用户说 "ys-team 状态" → 路由到 ys-team status 分支
# - 用户说 "起一个 spec" → 路由到 ys-team-spec-talk
# - 用户说 "按 spec 执行" → 路由到 ys-team-spec-work
# - 用户说 "rebuild baseline" → 路由到 ys-team-init

# AC-06：未受影响文件 diff 应为空
git diff main -- examples/baseline/ docs/methodology/ docs/guide/ \
    .ys_team/templates/ package.json .ys_team/VERSION
# 期望：无输出
```

## Risks

| 风险 | 缓解 |
|---|---|
| 触发短语过长导致 description 超限被截断 | description 总长 < 250 字符；触发短语简洁化 |
| `<what-to-do>` 块切得太大，与 `<supporting-info>` 边界模糊 | 默认规则：路由判断 / 入口选择 / 立即指令进 what-to-do，其余进 supporting-info |
| 重构破坏现有路由语义 | AC-05 reroute case 走查兜底；diff 强约束仅新增不删除 |
| Spec A 卡 active 期间，新进入仓的人不知道为什么不发版 | status.md 阻塞项里写明"等 Spec B 一起发 0.6.0" |

## Rollback Plan

git revert 4 个 SKILL.md 的本次提交即可恢复原状。无 baseline 改动、无版本号变化、无外部副作用。

## Collaboration Summary

- **参与角色**：方法论架构师 (arch) / 产品演进负责人 (pm) / 交付守门人 (gate)
- **轮次**：3 轮（初始判断 / 分歧识别 / 收敛）
- **关键分歧**：
  1. Spec A 是否独立发版？→ 否，由 Spec B close 统一发 0.6.0
  2. description 中英文比例？→ 触发短语用中文
  3. 分块覆盖范围？→ 仅加 wrapper，不重排不删信息
- **未决问题**：触发短语初稿在 spec-work 阶段允许微调，不增减数量
