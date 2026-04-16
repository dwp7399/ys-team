---
Spec-Type: work
Initiative: 20260416-110800-npx-entrypoint-hotfix
Status: completed
Owner-Session: ys-team-spec-work
---

# npx entrypoint hotfix work

## Plan

- Replace path-string entrypoint comparison with realpath-based comparison.
- Bump release line to `0.4.2`.
- Verify tarball and npx execution.
- Publish `ys-team@0.4.2`.

## Result

- `ys-team@0.4.2` published successfully.
- `npx ys-team@0.4.2 --help` outputs help text.
- `npx ys-team@0.4.2 install-skills --dry-run` outputs install summary.
