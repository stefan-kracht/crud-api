# CRUD API

A simple CRUD API for managing employees with an in-memory database, built with Hono and TypeScript.

## Features

- Full CRUD operations for employees
- In-memory database (data persists during server runtime)
- OpenAPI 3.0 documentation
- Interactive Swagger UI
- TypeScript support
- Zod validation

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev
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

## Using with Postman

### Option 1: Import OpenAPI Specification

1. Start the development server: `bun run dev`
2. Open Postman
3. Click "Import" in the top left
4. Select "Link" tab
5. Enter: `http://localhost:3000/openapi.json`
6. Click "Continue" and "Import"

### Option 2: Manual Collection Creation

1. Create a new collection in Postman
2. Set base URL to `http://localhost:3000`
3. Add the following requests:

#### List Employees

- Method: GET
- URL: `{{baseUrl}}/employees`

#### Get Employee

- Method: GET
- URL: `{{baseUrl}}/employees/:id`
- Add path variable `id`

#### Create Employee

- Method: POST
- URL: `{{baseUrl}}/employees`
- Body (raw JSON):

```json
{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "department": "engineering",
  "salary": 75000
}
```

#### Update Employee

- Method: PUT
- URL: `{{baseUrl}}/employees/:id`
- Add path variable `id`
- Body (raw JSON): Same as create, but all fields optional

#### Delete Employee

- Method: DELETE
- URL: `{{baseUrl}}/employees/:id`
- Add path variable `id`

#### Seed Database

- Method: POST
- URL: `{{baseUrl}}/actions`
- Body (raw JSON):
```json
{
  "action": "seed",
  "count": 5
}
```

#### Clear Database

- Method: POST
- URL: `{{baseUrl}}/actions`
- Body (raw JSON):
```json
{
  "action": "clear"
}
```

## Employee Schema

```typescript
{
  id: string; // Auto-generated unique identifier
  name: string; // Employee full name
  age: number; // Age (18-100)
  isActive: boolean; // Employment status
  department: "engineering" | "marketing" | "sales" | "hr";
  salary: number; // Annual salary
  hireDate: string; // ISO date string (auto-set on creation)
}
```

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
