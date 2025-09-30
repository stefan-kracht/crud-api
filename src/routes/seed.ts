import { Hono } from "hono";
import { faker } from "@faker-js/faker";
import { generateId } from "../utils/helpers";
import { employees, type Employee } from "./employees";

const router = new Hono();

// POST /seed - Seed database with random employees
router.post("/", (c) => {
  const count = parseInt(c.req.query("count") || "10");
  const departments: Array<'engineering' | 'marketing' | 'sales' | 'hr'> = ['engineering', 'marketing', 'sales', 'hr'];

  const newEmployees: Employee[] = [];

  for (let i = 0; i < count; i++) {
    const employee: Employee = {
      id: generateId(),
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 65 }),
      isActive: faker.datatype.boolean(),
      department: faker.helpers.arrayElement(departments),
      salary: faker.number.int({ min: 30000, max: 150000 }),
      hireDate: faker.date.past({ years: 10 }).toISOString()
    };
    newEmployees.push(employee);
  }

  employees.push(...newEmployees);

  return c.json({
    message: `Seeded database with ${count} employees`,
    employees: newEmployees
  });
});

export default router;