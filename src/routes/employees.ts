import { z } from "zod";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { generateId } from "./utils/helpers";
import {
  EmployeeSchema,
  CreateEmployeeSchema,
  UpdateEmployeeSchema,
  ErrorSchema,
  DeleteSuccessSchema,
  ListEmployeesResponseSchema,
  GetEmployeeResponseSchema,
  type Employee,
} from "../schemas";

// In-memory database
export const employees: Employee[] = [];

const router = new OpenAPIHono();

// GET /employees - List all employees
const listEmployeesRoute = createRoute({
  method: "get",
  path: "/",
  summary: "List all employees",
  description: "Retrieve a list of all employees in the database",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ListEmployeesResponseSchema,
        },
      },
      description: "List of employees with count",
    },
  },
});

router.openapi(listEmployeesRoute, (c) => {
  return c.json({
    data: employees.map(e => ({
      id: e.id,
      name: e.name,
      department: e.department,
      age: e.age
    })),
    count: employees.length
  });
});

// GET /employees/:id - Get specific employee
const getEmployeeRoute = createRoute({
  method: "get",
  path: "/:id",
  summary: "Get employee by ID",
  description: "Retrieve a specific employee by their ID",
  request: {
    params: z.object({
      id: z.string().openapi({ example: "abc123" }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetEmployeeResponseSchema,
        },
      },
      description: "Employee details",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Employee not found",
    },
  },
});

router.openapi(getEmployeeRoute, (c) => {
  const id = c.req.param("id");
  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return c.json({ error: "Employee not found" }, 404);
  }

  return c.json({ data: employee }, 200);
});

// POST /employees - Create new employee
const createEmployeeRoute = createRoute({
  method: "post",
  path: "/",
  summary: "Create new employee",
  description: "Create a new employee with the provided information",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateEmployeeSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: EmployeeSchema,
        },
      },
      description: "Employee created successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Invalid request data",
    },
  },
});

router.openapi(createEmployeeRoute, async (c) => {
  try {
    const body = await c.req.json();

    const newEmployee = {
      id: generateId(),
      name: body.name,
      age: body.age,
      isActive: body.isActive,
      department: body.department,
      salary: body.salary,
      hireDate: body.hireDate || new Date().toISOString(),
    };

    employees.push(newEmployee);
    return c.json(newEmployee, 201);
  } catch (error) {
    return c.json({ error: "Invalid JSON" }, 400);
  }
});

// PUT /employees/:id - Update employee
const updateEmployeeRoute = createRoute({
  method: "put",
  path: "/:id",
  summary: "Update employee",
  description: "Update an existing employee's information",
  request: {
    params: z.object({
      id: z.string().openapi({ example: "abc123" }),
    }),
    body: {
      content: {
        "application/json": {
          schema: UpdateEmployeeSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: EmployeeSchema,
        },
      },
      description: "Employee updated successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Invalid JSON",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Employee not found",
    },
  },
});

router.openapi(updateEmployeeRoute, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const employeeIndex = employees.findIndex((e) => e.id === id);

    if (employeeIndex === -1) {
      return c.json({ error: "Employee not found" }, 404);
    }

    const updatedEmployee = { ...employees[employeeIndex], ...body };
    employees[employeeIndex] = updatedEmployee;

    return c.json(updatedEmployee, 200);
  } catch (error) {
    return c.json({ error: "Invalid JSON" }, 400);
  }
});

// DELETE /employees/:id - Delete employee
const deleteEmployeeRoute = createRoute({
  method: "delete",
  path: "/:id",
  summary: "Delete employee",
  description: "Delete an employee by their ID",
  request: {
    params: z.object({
      id: z.string().openapi({ example: "abc123" }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DeleteSuccessSchema,
        },
      },
      description: "Employee deleted successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Employee not found",
    },
  },
});

router.openapi(deleteEmployeeRoute, (c) => {
  const id = c.req.param("id");
  const employeeIndex = employees.findIndex((e) => e.id === id);

  if (employeeIndex === -1) {
    return c.json({ error: "Employee not found" }, 404);
  }

  employees.splice(employeeIndex, 1);
  return c.json({ message: "Employee deleted successfully" }, 200);
});

export default router;
