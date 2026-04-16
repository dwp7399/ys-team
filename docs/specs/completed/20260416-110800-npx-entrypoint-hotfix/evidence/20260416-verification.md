---
Initiative: 20260416-110800-npx-entrypoint-hotfix
Date: 2026-04-16
Type: verification
---

# Verification Notes

## Root Cause

`ys-team@0.4.1` used path-string equality to decide whether the CLI file was the main entrypoint:

`path.resolve(process.argv[1]) === __filename`

When npm/npx runs from a cache or tarball path under macOS `/tmp`, the same file can appear as `/tmp/...` and `/private/tmp/...`. The string comparison fails, so `main()` is never called and the process exits with code 0 and no output.

## Checks

- `node scripts/ys-team.mjs --help` outputs help text.
- `node --check scripts/ys-team.mjs` passes.
- `npm pack --cache /tmp/ys-team-npm-cache` creates `ys-team-0.4.2.tgz`.
- Extracted tarball execution passes:
  - `node /tmp/ys-team-042-inspect/package/scripts/ys-team.mjs --help`

## Result

CLI entrypoint detection now uses realpath comparison, so symlinked temp/cache paths still call `main()`.

Published verification:

- `npm publish` returned `+ ys-team@0.4.2`.
- `npm view ys-team version` returned `0.4.2`.
- `npx ys-team@0.4.2 --help` outputs help text.
- `npx ys-team@0.4.2 install-skills --dry-run` outputs install summary.
