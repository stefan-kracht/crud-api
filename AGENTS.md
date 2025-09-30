# Agent Guidelines for crud-api

## Commands
- **Dev server**: `bun run dev`
- **Build**: `bun build src/index.ts` (if needed)
- **Type check**: `bunx tsc --noEmit`
- **Lint**: No linter configured - consider adding ESLint
- **Test**: No test framework configured - consider adding Vitest or Bun test
- **Run single test**: Not applicable (no tests configured)

## Code Style
- **Language**: TypeScript with strict mode enabled
- **Framework**: Hono for web API
- **Imports**: ES6 import syntax, one import per line
- **Naming**: camelCase for variables/functions, PascalCase for types/classes
- **Types**: Explicit typing required, use interfaces for complex objects
- **Formatting**: 2-space indentation, single quotes for strings
- **Error handling**: Use try/catch blocks, return appropriate HTTP status codes
- **JSX**: React JSX syntax with Hono's jsxImportSource
- **Exports**: Default export for main app, named exports for utilities

## Project Structure
- `src/index.ts`: Main application entry point
- Keep code modular and well-organized