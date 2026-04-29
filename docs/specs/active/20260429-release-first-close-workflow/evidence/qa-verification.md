# QA Verification Evidence

Spec: 20260429-release-first-close-workflow

Date: 2026-04-29

## Commands

```bash
rg -n "release-first|npm publish|合回 main|tag|push|发布 gate|发布链路|切分支" README.md .ys_team docs/methodology skills examples/baseline
! rg -n "普通 close 不需要|发版类 spec 才|本轮不涉及 npm publish|发布需另起 release spec" README.md .ys_team docs/methodology skills examples/baseline
diff -u examples/baseline/.ys_team/rules.md skills/ys-team/baseline/.ys_team/rules.md
diff -u examples/baseline/.ys_team/VERSION skills/ys-team/baseline/.ys_team/VERSION
diff -u examples/baseline/.ys_team/templates/spec.md skills/ys-team/baseline/.ys_team/templates/spec.md
diff -u examples/baseline/.ys_team/templates/checklist.md skills/ys-team/baseline/.ys_team/templates/checklist.md
node -e 'const p=require("./package.json").version; const fs=require("fs"); for (const f of [".ys_team/VERSION","examples/baseline/.ys_team/VERSION","skills/ys-team/baseline/.ys_team/VERSION"]) { const v=fs.readFileSync(f,"utf8").trim(); if (v!==p) throw new Error(f+"="+v+" package="+p); }'
git diff --check
```

## Result

- Release-first keyword check: PASS.
- Old close wording absence check: PASS.
- Baseline rules/spec/checklist sync checks: PASS.
- Baseline VERSION sync check: PASS.
- Package/baseline version consistency check: PASS.
- Whitespace check: PASS.
