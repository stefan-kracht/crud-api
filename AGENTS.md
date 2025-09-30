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
- `src/index.ts`: Main application entry point and route registration
- `src/routes/`: Route modules organized by resource
  - `employees.ts`: Employee CRUD endpoints
  - `seed.ts`: Database seeding endpoints
- `src/utils/`: Utility functions and helpers
- In-memory database using array storage
- Keep code modular and well-organized

## API Endpoints
- `GET /employees` - List all employees
- `GET /employees/:id` - Get specific employee
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee
- `POST /seed?count=N` - Seed database with N random employees (default 10)

## API Documentation
- `GET /docs` - Interactive Swagger UI documentation
- `GET /openapi.json` - OpenAPI 3.0 specification (can be imported into Postman)