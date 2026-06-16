# Publish Attempt 2026-06-16

Status: BLOCKED

## Pre-Publish Gate

- `node --check scripts/ys-team.mjs`: PASS
- `diff -qr examples/baseline skills/ys-team/baseline`: PASS
- `git diff --check`: PASS
- version consistency probe: PASS, all publish-line versions are `1.0.1`
- `npm pack --dry-run`: PASS, tarball preview `ys-team@1.0.1`, 221 files
- `npm view ys-team version`: PASS, registry latest remains `1.0.0`

## Blocking Command

```text
npm whoami
```

Result:

```text
npm error code E401
npm error 401 Unauthorized - GET https://registry.npmjs.org/-/whoami
```

## Close Impact

`npm publish` was not attempted after the auth preflight failed. Release-first close remains blocked until npm authentication is restored. No merge to `main`, git tag, or push should be treated as complete before publish succeeds.
