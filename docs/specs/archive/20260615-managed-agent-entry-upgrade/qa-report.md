# QA Report

Status: PASS

## AC Results

| Item | Result | Evidence |
|------|--------|----------|
| baseline AGENTS/CLAUDE 有 managed block marker | PASS | baseline files contain `ys-team:managed:start version=1.0.1` and matching end markers |
| CLI 能替换 managed block、替换 legacy ys-team 段落、插入缺失托管块 | PASS | function probes and temp project `init-project` runs |
| `ys-team-init` rebuild 说明要求检查 AGENTS/CLAUDE | PASS | `skills/ys-team-init/SKILL.md` includes managed block rebuild rules |
| docs 告诉已有用户如何升级入口文件 | PASS | README, getting-started, methodology reference, module index, npm publish docs updated |
| baseline 双副本全量一致 | PASS | `diff -qr examples/baseline skills/ys-team/baseline` no output |
| npm pack dry-run 通过 | PASS | `npm pack --dry-run` returned 0 for `ys-team@1.0.1` |

## Residual Risk

- `init-project` can only replace legacy sections it can recognize safely. If a project has copied old ys-team wording into arbitrary local headings outside the detected range, docs and `ys-team-init` now require manual cleanup before declaring upgrade complete.
- Release-first close is not complete: no `npm publish`, merge to `main`, tag, or push was performed in this turn.
