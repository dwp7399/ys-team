# Questions.md Verification Evidence

Date: 2026-05-21
Phase: spec-work

## Commands

```bash
rg -n "questions.md|文件化 Grill|超过 5 个|Ready For Spec|Unknown|Out of scope" skills/ys-team-spec-talk/SKILL.md skills/ys-team/SKILL.md docs/methodology/overview.md docs/methodology/reference.md docs/project/module-index.md .ys_team/templates/questions.md examples/baseline/.ys_team/templates/questions.md skills/ys-team/baseline/.ys_team/templates/questions.md
diff -u .ys_team/templates/questions.md examples/baseline/.ys_team/templates/questions.md
diff -u examples/baseline/.ys_team/templates/questions.md skills/ys-team/baseline/.ys_team/templates/questions.md
rg -n "^## Section|^### Q|^Type: (open|single-choice|multi-choice|checklist)|^Required:|^Options:|^Items:|^Answer" .ys_team/templates/questions.md examples/baseline/.ys_team/templates/questions.md skills/ys-team/baseline/.ys_team/templates/questions.md
```

## Result

- Keyword check: PASS. `questions.md`、`文件化 Grill`、`超过 5 个`、`Ready For Spec`、`Unknown`、`Out of scope` all matched in the expected files.
- Template diff 1: PASS. `.ys_team/templates/questions.md` and `examples/baseline/.ys_team/templates/questions.md` have no diff.
- Template diff 2: PASS. `examples/baseline/.ys_team/templates/questions.md` and `skills/ys-team/baseline/.ys_team/templates/questions.md` have no diff.
- Template structure check: PASS. The template contains sections, questions, `Type`, `Required`, `Options` / `Items`, and `Answer` fields, covering `open`, `single-choice`, `multi-choice`, and `checklist`.

## Notes

Spec-work found one close-stage scope gap: release-first close will require version/publish files, but the current Write-Scope does not include package/version files. Implementation and QA can be verified within the approved scope; close requires explicit scope expansion before release.
