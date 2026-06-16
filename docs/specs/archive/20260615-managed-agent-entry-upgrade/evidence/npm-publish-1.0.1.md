# npm Publish 1.0.1

Status: PASS

## Publish

Command:

```text
npm publish --userconfig /tmp/ys-team-npmrc --cache /tmp/ys-team-npm-cache
```

Result:

```text
+ ys-team@1.0.1
```

Notes:

- Published with npm account `ys7399`.
- npm emitted package auto-correction warnings for `bin[ys-team]` script name and `repository.url`; publish still succeeded.
- Temporary npm token config `/tmp/ys-team-npmrc` was deleted after publish.

## Registry Verification

```text
npm view ys-team version
1.0.1
```

```json
{
  "legacy": "0.6.5",
  "latest": "1.0.1"
}
```
