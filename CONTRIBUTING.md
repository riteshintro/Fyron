# Contributing to Fyron

## Requirements

- Node.js >= 20
- pnpm >= 10.18.3

## Setup

```bash
git clone https://github.com/riteshintro/Fyron.git
cd Fyron
pnpm install
pnpm rebuild esbuild @swc/core
pnpm -r build
```

## Structure

```
packages/
  core/           @fyron/core — framework runtime
  cli/            @fyron/cli  — artisan-style CLI
  create-fyron-app/           — project scaffolder
examples/
  blog-api/       — dogfood example (test changes here)
docs/             — Fumadocs site
```

## Development workflow

```bash
# Watch mode (all packages)
pnpm -r dev

# Typecheck
pnpm -r typecheck

# Tests
pnpm -r test

# Single package
pnpm --filter @fyron/core test
```

## Tests

Tests live in `packages/<pkg>/src/__tests__/`. The core test suite uses `@electric-sql/pglite` for in-process Postgres — no Docker required.

After adding a feature, add tests in the relevant `*.test.ts` file. The suite must pass on both Node 20 and 22.

## Adding a feature

1. Implement in `packages/core/src/<module>/`
2. Export from the module's `index.ts`
3. Re-export from `packages/core/src/index.ts` if it belongs in the public API
4. Add a service provider in `packages/core/src/providers/` if the module needs boot-time setup
5. Expose a CLI command in `packages/cli/src/commands/` if relevant
6. Document in `docs/content/docs/`

## Commit style

```
type(scope): short description

feat(routing): add Route.redirect() helper
fix(auth): handle missing BETTER_AUTH_SECRET gracefully
docs(scheduler): add dailyAt() example
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.

## Pull requests

- One feature or fix per PR
- Run `pnpm -r typecheck && pnpm -r test` before opening
- Update `CHANGELOG.md` under `[Unreleased]`
- Reference issues with `Fixes #N`

## Releasing

See [.github/RELEASING.md](.github/RELEASING.md).
