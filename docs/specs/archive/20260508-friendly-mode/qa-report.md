# QA Report — 20260508-friendly-mode

Date: 2026-05-08
Reviewer: 质量保障守门人
Decision: PASS

## Scope

Validated the friendly mode implementation against the active spec.

## Verification

### Keyword contract

Command:

```bash
rg -n "友好模式|友好总结|二次解释|非程序|不强制结构" skills/ys-team/SKILL.md skills/ys-team-spec-talk/SKILL.md skills/ys-team-spec-work/SKILL.md docs/methodology/overview.md docs/methodology/reference.md docs/guide/getting-started.md README.md .ys_team/glossary.md
```

Result: PASS. All expected entry points contain friendly mode language.

### Governance boundary

Command:

```bash
rg -n "不改变 L0/L1/L2|不降低治理|evidence|可见标志" skills docs/methodology README.md docs/guide/getting-started.md
```

Result: PASS. Skill and methodology docs explicitly preserve routing, evidence, verification, scope, and visible-marker requirements.

### Version alignment

Command:

```bash
node -e 'const fs=require("fs"); const p=require("./package.json").version; for (const f of [".ys_team/VERSION","examples/baseline/.ys_team/VERSION","skills/ys-team/baseline/.ys_team/VERSION"]) { const v=fs.readFileSync(f,"utf8").trim(); if (v!==p) throw new Error(f+"="+v+" package="+p); } console.log("versions aligned", p);'
```

Result: PASS.

Observed output:

```text
versions aligned 0.6.2
```

### Fixed-template regression check

Command:

```bash
rg -n "结论 / 风险 / 下一步|结论/风险/下一步|固定.*模板|固定摘要模板" skills README.md docs/guide docs/methodology .ys_team/glossary.md
```

Result: PASS with expected glossary-only warning. No skill or user-facing guide requires a fixed "conclusion / risk / next step" structure.

### Diff hygiene

Command:

```bash
git diff --check
```

Result: PASS. No whitespace errors.

## Acceptance Criteria

- AC-01: PASS
- AC-02: PASS
- AC-03: PASS
- AC-04: PASS
- AC-05: PASS
- AC-06: PASS
- AC-07: PASS
- AC-08: PASS
- AC-09: PASS

## Residual Risk

The implementation is documentation/skill-behavior text only. Runtime behavior depends on agents following the installed skills. The next close phase still needs release-first publishing work, but publishing is outside this QA pass.

## Addendum — output_mode QA

Date: 2026-05-08
Decision: PASS

User clarified that friendly mode should be configured rather than primarily keyword-triggered. QA reran the relevant checks after the revision.

### Config enum check

Command:

```bash
rg -n "^output_mode: (technical|friendly)$" .ys_team/config.yaml examples/baseline/.ys_team/config.yaml skills/ys-team/baseline/.ys_team/config.yaml
```

Result: PASS. All three config files contain `output_mode: technical`.

### Contract check

Command:

```bash
rg -n "output_mode|technical|friendly|友好模式|友好总结|二次解释|非程序|不强制结构" skills/ys-team/SKILL.md skills/ys-team-spec-talk/SKILL.md skills/ys-team-spec-work/SKILL.md docs/methodology/overview.md docs/methodology/reference.md docs/guide/getting-started.md README.md .ys_team/glossary.md .ys_team/config.yaml examples/baseline/.ys_team/config.yaml skills/ys-team/baseline/.ys_team/config.yaml
```

Result: PASS.

### Diff hygiene

Command:

```bash
git diff --check
```

Result: PASS.
