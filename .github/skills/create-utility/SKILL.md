---
name: create-utility
description: 'Scaffold a new utility function in this project. Use when adding a new pure helper, formatter, calculator, or data transform to the utils/ folder. Handles folder structure, TypeScript, JSDoc, tests, and README documentation. Run after creation to validate with the util documentation check script.'
argument-hint: 'Utility function name (e.g. calculateWinRate, formatPlayerName)'
---

# Create Utility

## When to Use

- Adding a new helper, formatter, calculator, or data transform
- Any pure function shared across the app that belongs in `utils/`
- Before writing business logic in a component — check `utils/README.md` first to see if it already exists

## File Structure

Each utility lives in its own folder:

```
utils/<utility-name>/
├── index.ts           # Implementation and named export
└── __tests__/
    └── index.ts       # Unit tests
```

## Procedure

1. **Check for an existing utility** by scanning `utils/README.md`. If one already covers the need, reuse it.

2. **Create the folder** at `utils/<utility-name>/`.

3. **Create `index.ts`**:
   - Export a single named function matching the folder name (camelCase).
   - Keep it pure: no side effects, no DOM access, no API calls.
   - Add a JSDoc comment describing parameters, return value, and edge cases.
   - Use strict TypeScript — no `any`.

   Example:

   ```ts
   /**
    * Short description of what the function does.
    *
    * @param input - Description of the input.
    * @returns Description of the return value.
    */
   export const myUtility = (input: string): string => {
     // ...
   }
   ```

4. **Create `__tests__/index.ts`**:
   - Import from `'..'` (the folder index).
   - Cover the happy path and relevant edge cases.
   - Use `describe` + `it` blocks with descriptive labels.

   Example:

   ```ts
   import { myUtility } from '..'

   describe('myUtility', () => {
     it('returns ... when ...', () => {
       expect(myUtility('input')).toBe('expected')
     })
   })
   ```

5. **Update `utils/README.md`** by adding the new function name under the appropriate category. This is **required** — the `scripts/utilPresentInDocumentationCheck.py` script will flag it as missing otherwise.

6. **Validate documentation coverage**:

   ```
   cd scripts && python utilPresentInDocumentationCheck.py
   ```

7. **Run quality checks**:
   ```
   yarn lint
   yarn typecheck
   yarn test utils/<utility-name>
   ```

## README Categories

Place the new entry under the most fitting section in `utils/README.md`:

| Section             | Examples                     |
| ------------------- | ---------------------------- |
| Calculations        | score, rate, ratio, gold, XP |
| Data Fetching       | fetch wrappers               |
| Data Download       | blob/file helpers            |
| Data Analysis       | top players, rankings        |
| Data Formatting     | formatters, transformers     |
| Sorting & Filtering | sort, filter, paginate       |
| Time Helpers        | time comparison, age         |
| Type Guards         | `is*`, `check*` functions    |
| Messaging Helpers   | score messages, thresholds   |
| Data Validation     | outdated checks, blacklists  |
| Time Formatting     | seconds → human-readable     |
| Key Transforms      | camelCase, key mapping       |

If none fits, add a new section following the existing emoji + heading pattern.
