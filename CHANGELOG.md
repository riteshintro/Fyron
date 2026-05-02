# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- `Application` global singleton now warns instead of silently overwriting when a second instance is constructed
- Provider `register()` and `boot()` failures now include the provider class name in the error message
- Log message typo `'avor booted'` corrected to `'fyron booted'`
- `@fyron/core/container` sub-path import now loads `reflect-metadata` automatically

### Added
- `Application.reset()` static method for test teardown isolation
- `Application.withProvidersBefore(target, providers)` — insert custom providers before a specific built-in
- `Application.withProvidersAfter(target, providers)` — insert custom providers after a specific built-in
- SIGTERM / SIGINT handlers auto-wired in `Application.listen()` for graceful shutdown
- `sideEffects: false` in `@fyron/core` package.json for tree-shaking support
- `drizzle-orm` and `handlebars` declared as `peerDependencies` in `@fyron/cli` (already transitively available via `@fyron/core`)
- CI matrix now tests Node 20 and Node 22
- `create-fyron-app` reads its own version at runtime so scaffolded projects always reference the correct package versions

### Changed
- `noUnusedLocals` and `noUnusedParameters` enabled in `tsconfig.base.json`

---

## [0.1.2] — 2025-03-xx

### Changed
- Bumped version to 0.1.2 across all packages
- Updated publish workflow

---

## [0.1.1] — 2025-03-xx

### Changed
- Renamed core package to `fyronjs` to avoid npm conflicts, then to `@fyron/core`

---

## [0.1.0] — 2025-03-xx

### Added
- Initial public release
- `@fyron/core` — HTTP kernel (Fastify 5), routing facade, DI container (tsyringe), Drizzle ORM Active Record, Zod validation, better-auth, nodemailer/handlebars mail, croner scheduler, file uploads
- `@fyron/cli` — 12 artisan-style commands: `serve`, `route:list`, `make:*`, `migrate`, `db:seed`, `schedule:*`
- `create-fyron-app` — project scaffolder
- `examples/blog-api` — full working example application

[Unreleased]: https://github.com/riteshintro/Fyron/compare/v0.1.2...HEAD
[0.1.2]: https://github.com/riteshintro/Fyron/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/riteshintro/Fyron/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/riteshintro/Fyron/releases/tag/v0.1.0
