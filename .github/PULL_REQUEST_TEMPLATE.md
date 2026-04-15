## What this PR does

<!-- Describe the change and why it's needed. -->

## Related Issues

<!-- Link related issues: Closes #XX, Relates to #YY -->

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Refactor (no functional change)
- [ ] Documentation
- [ ] Chore (CI, deps, tooling)

## Checklist

- [ ] I have tested this locally (opened `index.html` in a browser)
- [ ] No new hardcoded values — tunable values are in the `C` config object
- [ ] User-provided strings are escaped with `esc()` before HTML insertion
- [ ] The Notion proxy only allows `/v1/databases/` and `/v1/pages/` paths
- [ ] CHANGELOG.md updated (if user-facing change)
