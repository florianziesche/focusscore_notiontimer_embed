# Contributing to Focus Score

Thank you for considering contributing to Focus Score. This document explains
how to contribute effectively.

## Getting Started

1. **Fork** the repository and clone your fork locally.
2. Create a **feature branch** from `main`: `git checkout -b feat/your-feature`
3. Make your changes and **test locally** by opening `index.html` in a browser.
4. **Commit** with a clear message: `git commit -m "feat: add daily summary view"`
5. **Push** to your fork and open a **Pull Request** against `main`.

## Development Setup

Focus Score is a single-file HTML application with a Vercel serverless proxy.
No build step is required.

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/focuscore.git
cd focuscore

# Local development — just open index.html
open index.html

# To test the Vercel proxy locally
npx vercel dev
```

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation only
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `test:` — adding or updating tests
- `chore:` — maintenance (deps, CI, tooling)

## Pull Request Process

1. Ensure your PR has a clear title and description.
2. Reference any related issues (e.g., `Closes #12`).
3. PRs require at least one approving review before merge.
4. All CI checks must pass.

## Reporting Issues

Use the [issue templates](.github/ISSUE_TEMPLATE/) to report bugs or request
features. Please search existing issues before creating a new one.

## Code Style

- Use `var` (not `let`/`const`) for broad browser compatibility in `index.html`.
- All tunable values belong in the `C` config object — no magic numbers.
- Escape all user-provided strings with `esc()` before inserting into HTML.

## License

By contributing, you agree that your contributions will be licensed under the
[MIT License](LICENSE).
