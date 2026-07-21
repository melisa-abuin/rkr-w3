<div align="center">

<img src="apps/web/public/rkr-icon-primary-x64.png" alt="Run Kitty Run logo" />

# Run Kitty Run - Warcraft 3 Custom Map Statistics

</div>

Statistics dashboard for _Run Kitty Run_, a Warcraft 3 custom map. Tracks player stats, leaderboards, tournaments, and challenges.

## Monorepo structure

```
rkr-w3/
├── apps/
│   ├── web/      # Next.js statistics dashboard
│   └── admin/    # Admin app (in development)
├── packages/
│   └── dls/      # Design language system — components, hooks, utils, constants, interfaces
└── scripts/      # CI/analysis scripts (Python)
```

## Tech stack

- [Turborepo](https://turbo.build/) — monorepo build system
- [Next.js](https://nextjs.org/) — framework
- [React 19](https://react.dev/) — UI
- [TypeScript](https://www.typescriptlang.org/) — language
- [TanStack Query](https://tanstack.com/query) — data fetching
- [Vitest](https://vitest.dev/) — testing

## Setup

```bash
yarn          # install all workspace dependencies
yarn dev:web  # start the web app at http://localhost:3000
```

## Commands

| Command          | Description              |
| ---------------- | ------------------------ |
| `yarn dev`       | Start all apps           |
| `yarn dev:web`   | Start the web app only   |
| `yarn dev:admin` | Start the admin app only |
| `yarn build`     | Build all apps           |
| `yarn test`      | Run all tests            |
| `yarn typecheck` | Type-check all packages  |
| `yarn lint`      | Lint all packages        |

## Contributing

We welcome contributions from the community! To contribute to the development of this web application (not the custom map), follow these steps:

1. **Fork** the repository to your own GitHub account.
2. Create a new **issue** in the main repository describing the feature or bug fix you'd like to work on.
3. After the issue is approved or discussed, create a **branch** on your forked repository.
4. Make your changes, ensuring that each **commit** is atomic and follows this structure:  
   `"<type> #<issue-number>: <subject>"`
   For example:  
   `"feature #5: add new feature"`
5. Open a **pull request** (PR) from your branch to the main repository, linking it to the related issue.
