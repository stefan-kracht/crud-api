import { EmployeeSchema, employees } from "./employees";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";

import { faker } from "@faker-js/faker";
import { generateId } from "../utils/helpers";
import { z } from "zod";

const router = new OpenAPIHono();

// Seed response schema
const SeedResponseSchema = z.object({
  message: z.string().openapi({ example: "Seeded database with 10 employees" }),
  employees: z
    .array(EmployeeSchema)
    .openapi({ description: "The generated employees" }),
});

// POST /seed - Seed database with random employees
const seedRoute = createRoute({
  method: "post",
  path: "/",
  summary: "Seed database with random employees",
  description:
    "Generate and add random employees to the database for testing purposes",
  request: {
    query: z.object({
      count: z
        .string()
        .optional()
        .openapi({
          example: "10",
          description: "Number of employees to generate (default: 10)",
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SeedResponseSchema,
        },
      },
      description: "Database seeded successfully",
    },
  },
});

router.openapi(seedRoute, (c) => {
  const count = parseInt(c.req.query("count") || "10");
  const departments: Array<"engineering" | "marketing" | "sales" | "hr"> = [
    "engineering",
    "marketing",
    "sales",
    "hr",
  ];

  const newEmployees: z.infer<typeof EmployeeSchema>[] = [];

  for (let i = 0; i < count; i++) {
    const employee: z.infer<typeof EmployeeSchema> = {
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

  return c.json({
    message: `Seeded database with ${count} employees`,
    employees: newEmployees,
  });
});

export default router;
