import { z } from "zod";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { faker } from "@faker-js/faker";
import { generateId } from "./utils/helpers";
import { employees } from "./employees";
import {
  EmployeeSchema,
  SeedResponseSchema,
  type Employee,
  type Department,
} from "../schemas";

const router = new OpenAPIHono();

// POST /actions - Perform database actions
const actionsRoute = createRoute({
  method: "post",
  path: "/",
  summary: "Database actions",
  description:
    "Perform various database operations like seeding or clearing data",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            action: z.enum(["seed", "clear"]).openapi({
              example: "seed",
              description:
                "Action to perform: 'seed' to add random employees, 'clear' to delete all employees",
            }),
            count: z.number().int().min(1).max(100).optional().openapi({
              example: 10,
              description:
                "Number of employees to seed (only used with 'seed' action, default: 10)",
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z
            .object({
              message: z.string(),
              employees: z.array(EmployeeSchema).optional(),
              deletedCount: z.number().optional(),
            })
            .openapi("ActionResponse"),
        },
      },
      description: "Action completed successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({
            error: z.string().openapi({ example: "Invalid action" }),
          }),
        },
      },
      description: "Invalid request",
    },
  },
});

router.openapi(actionsRoute, async (c) => {
  const body = await c.req.json();
  const { action, count = 10 } = body;

  if (action === "seed") {
    const departments: Department[] = [
      "engineering",
      "marketing",
      "sales",
      "hr",
    ];

    const newEmployees: Employee[] = [];

    for (let i = 0; i < count; i++) {
      const employee: Employee = {
        id: generateId(),
        name: faker.person.fullName(),
        age: faker.number.int({ min: 18, max: 65 }),
        isActive: faker.datatype.boolean(),
        department: faker.helpers.arrayElement(departments),
        salary: faker.number.int({ min: 30000, max: 150000 }),
        hireDate: faker.date.past({ years: 10 }).toISOString(),
      };
      newEmployees.push(employee);
    }

    employees.push(...newEmployees);

    return c.json(
      {
        message: `Seeded database with ${count} employees`,
        employees: newEmployees,
      } as any,
      200
    );
  } else if (action === "clear") {
    const deletedCount = employees.length;
    employees.length = 0; // Clear the array

    return c.json(
      {
        message: "Deleted all employees from database",
        deletedCount,
      } as any,
      200
    );
  } else {
    return c.json(
      { error: "Invalid action. Use 'seed' or 'clear'" } as any,
      400
    );
  }
});

export default router;
