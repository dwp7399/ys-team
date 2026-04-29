# QA Verification Evidence

Spec: 20260429-external-skill-pattern-assimilation

Date: 2026-04-29

## Commands

```bash
! rg -n '(^|[^[:alnum:]_.-])/(spec|tdd|review|grill)\b' README.md docs/guide docs/methodology skills examples/baseline
rg -n "自动路由|正常对话|不用|rebuild|\\.ys_team" README.md docs/guide docs/methodology skills
rg -n "anti-rationalization|逃避|降级|验证|evidence|ADR|context|领域" docs/methodology skills examples/baseline
diff -u examples/baseline/.ys_team/rules.md skills/ys-team/baseline/.ys_team/rules.md
diff -u examples/baseline/.ys_team/templates/spec.md skills/ys-team/baseline/.ys_team/templates/spec.md
diff -u examples/baseline/.ys_team/templates/checklist.md skills/ys-team/baseline/.ys_team/templates/checklist.md
```

## Result

- User command exposure check: PASS. No user-facing workflow command pattern matched.
- Product positioning check: PASS. `正常对话` / `自动路由` / `.ys_team` / `rebuild` appear in README, guide, methodology, and skills.
- Assimilation vocabulary check: PASS. `evidence` / `ADR` / `context` / `领域` / `降级` / `验证` appear in methodology, skills, and baseline.
- Baseline sync check: PASS for the three files in this spec scope:
  - `rules.md`
  - `templates/spec.md`
  - `templates/checklist.md`

## Note

A full `.ys_team` directory diff is intentionally not used for this spec because pre-existing out-of-scope differences remain between `examples/baseline/.ys_team` and `skills/ys-team/baseline/.ys_team`.
