# npm publish evidence — ys-team@0.6.2

Date: 2026-05-08
Package: `ys-team`
Version: `0.6.2`

## Authentication

Command:

```bash
npm --userconfig /tmp/ys-team-npmrc-062 whoami --loglevel=error
```

Result: PASS.

Observed npm user:

```text
ys7399
```

## Pack

Command:

```bash
npm pack --userconfig /tmp/ys-team-npmrc-062
```

Result: PASS.

Observed tarball:

```text
ys-team-0.6.2.tgz
```

Package details:

```text
name: ys-team
version: 0.6.2
package size: 150.2 kB
unpacked size: 450.8 kB
total files: 183
```

## Publish

Command:

```bash
npm publish --userconfig /tmp/ys-team-npmrc-062
```

Result: PASS.

Observed output:

```text
+ ys-team@0.6.2
```

## Registry Verification

Command:

```bash
npm view ys-team@0.6.2 version
```

Result: PASS.

Observed output:

```text
0.6.2
```

## Cleanup

The generated tarball and temporary npm config were removed after publish.
