import { Hono } from "hono";
import { generateId } from "../utils/helpers";

// Employee interface with various primitive types
export interface Employee {
  id: string;
  name: string;
  age: number;
  isActive: boolean;
  department: "engineering" | "marketing" | "sales" | "hr"; // enum-like
  salary: number;
  hireDate: string; // ISO date string
}

// In-memory database
export const employees: Employee[] = [];

const router = new Hono();

// GET /employees - List all employees
router.get("/", (c) => {
  return c.json(employees);
});

// GET /employees/:id - Get specific employee
router.get("/:id", (c) => {
  const id = c.req.param("id");
  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return c.json({ error: "Employee not found" }, 404);
  }

  return c.json(employee);
});

// POST /employees - Create new employee
router.post("/", async (c) => {
  try {
    const body = await c.req.json<Employee>();

    // Validate required fields
    if (
      !body.name ||
      !body.age ||
      typeof body.isActive !== "boolean" ||
      !body.department ||
      !body.salary
    ) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Validate department enum
    const validDepartments = ["engineering", "marketing", "sales", "hr"];
    if (!validDepartments.includes(body.department)) {
      return c.json({ error: "Invalid department" }, 400);
    }

    const newEmployee: Employee = {
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
router.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json<Partial<Employee>>();
    const employeeIndex = employees.findIndex((e) => e.id === id);

    if (employeeIndex === -1) {
      return c.json({ error: "Employee not found" }, 404);
    }

    // Validate department if provided
    if (body.department) {
      const validDepartments = ["engineering", "marketing", "sales", "hr"];
      if (!validDepartments.includes(body.department)) {
        return c.json({ error: "Invalid department" }, 400);
      }
    }

    const updatedEmployee = { ...employees[employeeIndex], ...body };
    employees[employeeIndex] = updatedEmployee;

    return c.json(updatedEmployee);
  } catch (error) {
    return c.json({ error: "Invalid JSON" }, 400);
  }
});

// DELETE /employees/:id - Delete employee
router.delete("/:id", (c) => {
  const id = c.req.param("id");
  const employeeIndex = employees.findIndex((e) => e.id === id);

  if (employeeIndex === -1) {
    return c.json({ error: "Employee not found" }, 404);
  }

  employees.splice(employeeIndex, 1);
  return c.json({ message: "Employee deleted successfully" });
});

export default router;
