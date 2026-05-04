## Project Knowledge

- Tech stack: Next.js, React 18, TypeScript, Jest.
- Package manager: Yarn (classic).
- App routing: uses App Router under app.
- API routes: uses Pages Router API handlers under pages/api.

## Repository Structure

- app/: route segments and page composition.
- pages/api/: backend-for-frontend endpoints.
- components/: atomic design system.
- hooks/: reusable React hooks.
- interfaces/: shared TypeScript models.
- utils/: shared pure helpers and formatters.

## Component Architecture

- Follow atomic structure: atoms, molecules, organisms, templates.
- Keep imports directional to avoid architecture leaks.
- Atoms should stay generic and reusable.
- Molecules should be built from atoms and local logic.
- Organisms compose molecules and atoms for larger sections.
- Templates compose full page-level sections.

## Coding Guidelines

- Prefer strict typing and avoid any.
- Keep utilities pure and testable.
- Reuse existing helpers from utils before creating new ones.
- Keep styling co-located with component CSS modules.
- Follow existing naming and folder patterns.

## API And Data Rules

- Move data shaping and filtering to API or utils when possible.
- Keep UI components focused on rendering.
- Return API responses already prepared for the page consumer.

## Quality Checks

Before finishing changes, run:

- yarn lint
- yarn typecheck
- yarn test (or focused tests for touched code)

## Contribution Notes

- Keep commits atomic and issue-linked.
- Commit message convention:
  - <type> #<issue-number>: <subject>
