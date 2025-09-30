import {
  CreateDepartmentSchema,
  DeleteSuccessSchema,
  DepartmentSchema,
  ErrorSchema,
  ListDepartmentsResponseSchema,
} from "../schemas";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";

import { z } from "zod";

// In-memory database for departments
export const departments: string[] = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
];

const router = new OpenAPIHono();

// GET /departments - List all departments
const listDepartmentsRoute = createRoute({
  method: "get",
  path: "/",
  summary: "List all departments",
  description: "Retrieve a list of all departments in the database",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ListDepartmentsResponseSchema,
        },
      },
      description: "List of departments with count",
    },
  },
});

router.openapi(listDepartmentsRoute, (c) => {
  return c.json({ data: departments, count: departments.length });
});

// POST /departments - Create new department
const createDepartmentRoute = createRoute({
  method: "post",
  path: "/",
  summary: "Create new department",
  description: "Create a new department with the provided name",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateDepartmentSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: DepartmentSchema,
        },
      },
      description: "Department created successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Invalid request data or department already exists",
    },
  },
});

router.openapi(createDepartmentRoute, async (c) => {
  try {
    const name = await c.req.json();

    if (departments.includes(name)) {
      return c.json({ error: "Department already exists" }, 400);
    }

    departments.push(name);
    return c.json(name, 201);
  } catch (error) {
    return c.json({ error: "Invalid JSON" }, 400);
  }
});

// DELETE /departments/:name - Delete department
const deleteDepartmentRoute = createRoute({
  method: "delete",
  path: "/:name",
  summary: "Delete department",
  description: "Delete a department by its name",
  request: {
    params: z.object({
      name: z.string().openapi({ example: "Engineering" }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DeleteSuccessSchema,
        },
      },
      description: "Department deleted successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Department not found",
    },
  },
});

router.openapi(deleteDepartmentRoute, (c) => {
  const name = c.req.param("name");
  const departmentIndex = departments.indexOf(name);

  if (departmentIndex === -1) {
    return c.json({ error: "Department not found" }, 404);
  }

  departments.splice(departmentIndex, 1);
  return c.json({ message: "Department deleted successfully" }, 200);
});

export default router;
