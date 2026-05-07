# Evidence — Diff Summary

## 命令

```bash
git diff main -- skills/ys-team*/SKILL.md
```

## 统计（4 个文件）

| 文件 | `-` 行（含 `--- ` 文件头） | 真实删除行 | `+` 行（新增） |
|------|----------------------|-----------|--------------|
| skills/ys-team/SKILL.md | 5 | 1（旧 description） | 21 |
| skills/ys-team-init/SKILL.md | 5 | 1（旧 description） | 16 |
| skills/ys-team-spec-talk/SKILL.md | 5 | 1（旧 description） | 14 |
| skills/ys-team-spec-work/SKILL.md | 5 | 1（旧 description） | 18 |

## 真实删除行（去除 `--- a/...` 文件头后的 `-` 行）

```
-description: "Entry skill for the ys-team method. Route requests, explain the method, display status, and run lightweight discussions — all anchored in repository reality."
-description: "Initialize or rebuild a repository-local ys-team baseline. Generate the smallest useful .ys_team setup from project reality, rebuild when project shape changes, and maintain the reality index."
-description: "Discuss a non-trivial change using the repository's local .ys_team setup, load roles from config.yaml, converge to spec output."
-description: "Silent internal execution capability for approved ys-team specs. Execute against spec contract, keep docs and evidence aligned."
```

## AC-04 解释

**期望**：diff 仅新增 wrapper 与 description 增强，无原有正文删除。

**实际**：4 个 `-` 行**全部是 frontmatter description 替换**（旧 description 行被新 description 行替换）。`<what-to-do>`、`<supporting-info>` 标签和 description 增强是新增内容（`+` 行），原有正文（包括所有 `## 章节`、表格、代码块）逐字保留。

reviewer 在 spec-review 阶段已预见此情况（Note 1），并接受"description 整段替换造成的 `-` 行"为 AC-04 期望范围内。

## AC-06 验证

```bash
git diff main -- examples/baseline/ docs/methodology/ docs/guide/ \
    .ys_team/templates/ package.json .ys_team/VERSION
# (无输出)
```

未受影响文件 0 改动 ✓
