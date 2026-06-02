# npm Publish Evidence

Date: 2026-06-02
Package: `ys-team@0.6.5`

## Pre-publish State

Previous close evidence recorded that the package content was ready but `npm publish` was blocked by npm authentication. The user provided a publish token for the retry. The token was only passed through hidden stdin into a temporary npm config and was removed after the command.

## Publish Retry

Command shape:

```bash
npm --userconfig "$cfg" --cache "$cache" publish
```

The first retry under restricted network failed before publish completed:

```text
npm error code ENOTFOUND
npm error network request to https://registry.npmjs.org/ys-team failed
```

The same temporary-config publish was rerun with network access. Result: PASS.

Key output:

```text
name: ys-team
version: 0.6.5
filename: ys-team-0.6.5.tgz
shasum: d2da40e3b8660303677217e3b5c2d76147202388
total files: 200
+ ys-team@0.6.5
```

npm also emitted auto-correction warnings for package metadata:

```text
"bin[ys-team]" script name was cleaned
"repository.url" was normalized to "git+https://github.com/dwp7399/ys-team.git"
```

These warnings did not block publish.

## Registry Verification

```bash
npm view ys-team version
```

Result:

```text
0.6.5
```

## Role Memory Review

Existing close-stage memory already covers evidence quality and release-first handling. This run added no new long-term method rule, so no `.ys_team/memory/` file was changed.
