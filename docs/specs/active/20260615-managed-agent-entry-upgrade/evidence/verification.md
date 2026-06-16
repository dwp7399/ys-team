# Verification Evidence

## Commands

| Command | Result |
|---------|--------|
| `node --check scripts/ys-team.mjs` | PASS |
| Node `mergeManagedEntryMarkdown` probe for legacy AGENTS / legacy CLAUDE / missing entry | PASS, output `merge probes passed` |
| `node scripts/ys-team.mjs init-project --dir <legacy-temp> --dry-run` | PASS, `AGENTS.md: legacy-entry-replaced`, `CLAUDE.md: legacy-entry-replaced` |
| `node scripts/ys-team.mjs init-project --dir <legacy-temp>` | PASS, legacy entries replaced |
| second `init-project --dry-run` on same temp project | PASS, `AGENTS.md: unchanged`, `CLAUDE.md: unchanged` |
| `rg -n "ys-team:managed\|保留本地发布规则\|项目命令\|没有合格\|L0 / L1 / L2\|必须带状态标记" <legacy-temp>/AGENTS.md <legacy-temp>/CLAUDE.md` | PASS, managed markers and local sections present; old terms absent |
| `node scripts/ys-team.mjs init-project --dir <new-temp>` | PASS, `AGENTS.md: created`, `CLAUDE.md: created` |
| `node scripts/ys-team.mjs --help` | PASS, update path includes `install-skills --force` and `init-project --dir /path/to/project` |
| `diff -qr examples/baseline skills/ys-team/baseline` | PASS, no output |
| `rg -n "ys-team:managed\|legacy-entry-replaced\|managed-block" examples/baseline skills/ys-team/baseline scripts README.md docs skills/ys-team-init/SKILL.md` | PASS, managed block contract appears in baseline, CLI, docs, and skill |
| `rg -n "L0/L1/L2\|Response Markers\|必须带状态标记\|排他工作流\|governance_slots\|slot_bindings\|没有合格 verifier 卡" examples/baseline/AGENTS.md examples/baseline/CLAUDE.md skills/ys-team/baseline/AGENTS.md skills/ys-team/baseline/CLAUDE.md` | PASS, no matches |
| `npm pack --dry-run` | PASS, tarball preview `ys-team@1.0.1`, 221 files |
| `git diff --check` | PASS |
| Node `formatUpdateReport` probe | PASS, output includes `init-project --dir /path/to/project` |
| Node version consistency probe | PASS, `package.json`, root `.ys_team/VERSION`, examples baseline VERSION, bundled baseline VERSION are all `1.0.1` |

## Temp Projects

- Legacy upgrade temp: `/var/folders/h4/fp16906j5h1c4ds92m3gnq180000gn/T/ys-team-entry-check-IJvlpY`
- New project temp: `/var/folders/h4/fp16906j5h1c4ds92m3gnq180000gn/T/ys-team-new-project-nba3fp`

## L1 Rationale

This change affects CLI, Markdown baseline, and documentation contracts. The verifier uses syntax checks, function probes, actual CLI execution on temp repositories, static keyword checks, baseline copy diff, and `npm pack --dry-run`. No UI or production runtime is involved.
