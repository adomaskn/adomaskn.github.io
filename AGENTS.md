# AGENTS.md

Guidelines for contributors and coding agents working in this repository.

## Project Scope

- Repository hosts the main portfolio site at `https://adomaskn.github.io/`.
- Main entry point is `index.html`.
- Static assets live in `public/`, `assets/`, `css/`, and `js/`.
- Production output is generated into `dist/` by Vite.

## Navigation and Language Rules

- Preserve active language across navigation using query param `lang`.
- Supported values are currently `en` and `lt`.
- Main page must keep URLs consistent with active language:
  - `https://adomaskn.github.io/?lang=en`
  - `https://adomaskn.github.io/?lang=lt`
- Outbound project links (for example `virtual-gallery`, `car-showroom`) must include active `lang`.
- If you add new internal/external project links from the main page, include language preservation logic.

## Editing Rules

- Keep changes minimal and scoped to the user request.
- Do not remove unrelated user changes.
- Prefer simple, framework-free JavaScript for `index.html` page behaviors.
- Keep markup valid and avoid introducing non-ASCII text unless needed.

## Validation Checklist

Before finalizing changes:

1. Run `npm run build`.
2. Confirm expected files changed with `git status`.
3. If navigation was edited, verify language persistence paths manually:
   - main page with `?lang=en` and `?lang=lt`
   - link-through to `virtual-gallery` and back/home flows if editable in this repo

## Git Workflow

- Use clear commit messages with focused scope.
- Do not amend commits unless explicitly requested.
- Do not use destructive git commands unless explicitly requested.
