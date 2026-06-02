# Verification Evidence: 20260602-project-local-sop-assimilation

Date: 2026-06-02

## Summary

All spec-work verification passed.

## Commands

### Project Local SOP keyword coverage

```bash
rg -n "项目本地 SOP|repo-local SOP|本地 SOP|领域 SOP" README.md docs/guide/getting-started.md docs/methodology/overview.md docs/methodology/reference.md skills/ys-team/SKILL.md skills/ys-team-spec-talk/SKILL.md skills/ys-team-spec-work/SKILL.md skills/ys-team-init/SKILL.md
```

Result: PASS.

Observed coverage:

- `README.md`
- `docs/guide/getting-started.md`
- `docs/methodology/overview.md`
- `docs/methodology/reference.md`
- `skills/ys-team/SKILL.md`
- `skills/ys-team-spec-talk/SKILL.md`
- `skills/ys-team-spec-work/SKILL.md`
- `skills/ys-team-init/SKILL.md`

### Rules and checklist gate coverage

```bash
rg -n "不改变 L0/L1/L2|条件式|已有总结覆盖|无需更新|close gate" .ys_team/rules.md .ys_team/templates/checklist.md examples/baseline/.ys_team/rules.md examples/baseline/.ys_team/templates/checklist.md skills/ys-team/baseline/.ys_team/rules.md skills/ys-team/baseline/.ys_team/templates/checklist.md
```

Result: PASS.

Observed coverage:

- `.ys_team/rules.md`
- `.ys_team/templates/checklist.md`
- `examples/baseline/.ys_team/rules.md`
- `examples/baseline/.ys_team/templates/checklist.md`
- `skills/ys-team/baseline/.ys_team/rules.md`
- `skills/ys-team/baseline/.ys_team/templates/checklist.md`

### Spec-review hardening coverage

```bash
rg -n "Data Contract|单写入|聚合|rollback|可停止边界|Depends-On|Absorbs" docs/methodology/reference.md
```

Result: PASS.

Observed coverage:

- `Depends-On / Absorbs / Supersedes` conflict check
- `Data Contract` fixedness
- single-writer / aggregation protocol
- concrete evidence
- rollback coverage
- stop boundary

### Business-detail leakage guard

```bash
if rg -n "ai-gateway-model-integration|kling|dashscope|ProviderKey|models.json" README.md docs/guide/getting-started.md docs/methodology/overview.md docs/methodology/reference.md skills/ys-team/SKILL.md skills/ys-team-spec-talk/SKILL.md skills/ys-team-spec-work/SKILL.md skills/ys-team-init/SKILL.md examples/baseline/.ys_team/rules.md examples/baseline/.ys_team/templates/checklist.md examples/baseline/.ys_team/templates/spec.md skills/ys-team/baseline/.ys_team/rules.md skills/ys-team/baseline/.ys_team/templates/checklist.md skills/ys-team/baseline/.ys_team/templates/spec.md; then exit 1; fi
```

Result: PASS. No project-specific business terms were found in the implementation surfaces.

### Version checks

```bash
node -e "const fs=require('fs'); const pkg=JSON.parse(fs.readFileSync('package.json','utf8')); const versions=['.ys_team/VERSION','examples/baseline/.ys_team/VERSION','skills/ys-team/baseline/.ys_team/VERSION'].map(p=>fs.readFileSync(p,'utf8').trim()); if (pkg.version!=='0.6.5'||versions.some(v=>v!=='0.6.5')) { console.error(pkg.version, versions); process.exit(1); }"
node -e "const fs=require('fs'); const v=fs.readFileSync('docs/methodology/VERSION','utf8').trim(); if (v!=='1.3.0') { console.error(v); process.exit(1); }"
```

Result: PASS. Both commands exited 0.

### Package dry run

```bash
npm pack --dry-run
```

Result: PASS.

Key output:

```text
name: ys-team
version: 0.6.5
filename: ys-team-0.6.5.tgz
total files: 197
```

Package contents included updated docs, baseline files, skills, and the active spec directory.
