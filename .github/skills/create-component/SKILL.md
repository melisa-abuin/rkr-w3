---
name: create-component
description: 'Scaffold a new React component in this project. Use when creating a new atom, molecule, organism, or template component. Handles layer selection, file structure, CSS module, TypeScript typing, and import direction rules. Run after creation to validate with the atomic structure check script.'
argument-hint: 'Component name and optionally the atomic layer (atom/molecule/organism/template)'
---

# Create Component

## When to Use

- Adding a new UI component to the design system
- Scaffolding atoms, molecules, organisms, or templates
- Ensuring a new component follows atomic design conventions and import rules

## Atomic Layer Decision

Choose the layer based on what the component does:

| Layer       | Rule                                       | Can import from                             |
| ----------- | ------------------------------------------ | ------------------------------------------- |
| `atoms`     | Generic, reusable, no business logic       | nothing inside `components/`                |
| `molecules` | Built from atoms + local logic             | `atoms` only (via `@/components/atoms/...`) |
| `organisms` | Larger sections, compose molecules + atoms | `atoms`, `molecules`                        |
| `templates` | Full page-level sections                   | `atoms`, `molecules`, `organisms`           |

**Key constraint**: never use `../` to cross layer boundaries. Always use the `@/components/<layer>/` alias.

## File Structure

Each component lives in its own folder:

```
components/<layer>/<component-name>/
├── index.tsx          # Component implementation
├── index.module.css   # Scoped styles (always co-located)
└── __tests__/         # Optional but encouraged for atoms
    └── index.tsx
```

## Procedure

1. **Determine the layer** using the table above. If unsure, ask which layer fits best.

2. **Create the folder** at `components/<layer>/<component-name>/`.

3. **Create `index.tsx`**:
   - Add `'use client'` directive only if the component uses browser APIs or React hooks that require it.
   - Define a `Props` type (strict, no `any`).
   - Export a single default function component.
   - Import styles: `import styles from './index.module.css'`
   - Keep imports directional — only import from allowed layers (see table above).

4. **Create `index.module.css`**:
   - Use CSS custom properties (`var(--...)`) from the theme for colors, spacing, etc.
   - Keep all styles scoped to this file.

5. **Validate import rules** by running the atomic structure check from the `scripts/` folder:

   ```
   cd scripts && python atomicStructureCheck.py
   ```

   Fix any reported forbidden imports before finishing.

6. **Run quality checks**:
   ```
   yarn lint
   yarn typecheck
   ```

## Import Rule Reference

| In this layer | Forbidden imports                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------- |
| atoms         | Any `@/components/...`, any `../`                                                               |
| molecules     | `molecules`, `organisms`, `templates`; `../../atoms/...` (use `@/components/atoms/...` instead) |
| organisms     | `organisms`, `templates`; `../../molecules/...`, `../../atoms/...`                              |
| templates     | `templates`; cross-layer relative paths                                                         |
