# CRUD API

A simple CRUD API for managing employees with an in-memory database, built with Hono and TypeScript.

## Features

- Full CRUD operations for employees
- In-memory database (data persists during server runtime)
- OpenAPI 3.0 documentation
- Interactive Swagger UI
- TypeScript support
- Zod validation

## Rund development server

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

The API will be available at `http://localhost:3000`

## Run with Docker

```bash
# Build the Docker image
docker build -t crud-api .

# Run the container
docker run -p 3000:3000 crud-api
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Employees

- `GET /employees` - List all employees
- `GET /employees/:id` - Get specific employee
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Database Actions

- `POST /actions` - Perform database operations (seed or clear)

## API Documentation

### Interactive Documentation

Visit `http://localhost:3000/docs` for the interactive Swagger UI documentation.

### OpenAPI Specification

The OpenAPI 3.0 specification is available at `http://localhost:3000/openapi.json`

### OpenAPI Specification

## Development

```bash
# Type checking
bunx tsc --noEmit

# Start development server with hot reload
bun run dev
```

## Project Structure

```
src/
├── index.ts          # Main application entry point
├── routes/
│   ├── employees.ts  # Employee CRUD endpoints
│   └── actions.ts    # Database actions (seed/clear)
├── schemas/
│   └── index.ts      # Centralized Zod schema definitions
└── utils/
    └── helpers.ts    # Utility functions
```
