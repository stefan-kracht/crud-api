import { z } from "zod";

// Department Zod schema (just the name)
export const DepartmentSchema = z.string().openapi({ example: "Engineering" });

// Employee Zod schema
export const EmployeeSchema = z
  .object({
    id: z.string().openapi({ example: "abc123" }),
    name: z.string().openapi({ example: "John Doe" }),
    age: z.number().int().min(18).max(100).openapi({ example: 30 }),
    isActive: z.boolean().openapi({ example: true }),
    department: z
      .string()
      .openapi({ example: "eng", description: "Department ID" }),
    salary: z.number().int().min(0).openapi({ example: 75000 }),
    hireDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
      .openapi({ example: "2023-01-15T10:00:00.000Z" }),
    image: z.string().url().optional().openapi({ example: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/123.jpg" }),
  })
  .openapi("Employee");

// Create department request schema (just the name)
export const CreateDepartmentSchema = DepartmentSchema;

// Create employee request schema (without id and hireDate)
export const CreateEmployeeSchema = EmployeeSchema.omit({
  id: true,
  hireDate: true,
});

// Update employee request schema (all fields optional except id)
export const UpdateEmployeeSchema = EmployeeSchema.partial().omit({ id: true });

// Error response schema
export const ErrorSchema = z.object({
  error: z.string().openapi({ example: "Employee not found" }),
});

// Success response schema for delete
export const DeleteSuccessSchema = z.object({
  message: z.string().openapi({ example: "Employee deleted successfully" }),
});

// Seed response schema
export const SeedResponseSchema = z.object({
  message: z.string().openapi({ example: "Seeded database with 10 employees" }),
  employees: z
    .array(EmployeeSchema)
    .openapi({ description: "The generated employees" }),
});

// Employee summary schema for list endpoint
export const EmployeeSummarySchema = EmployeeSchema.pick({
  id: true,
  name: true,
  department: true,
  age: true,
});

// GET responses with data wrapper
export const ListDepartmentsResponseSchema = z.object({
  data: z.array(DepartmentSchema),
  count: z.number().openapi({ example: 4 }),
});

export const ListEmployeesResponseSchema = z.object({
  data: z.array(EmployeeSummarySchema),
  count: z.number().openapi({ example: 5 }),
});

export const GetEmployeeResponseSchema = z.object({
  data: EmployeeSchema,
});

// Type exports for TypeScript
export type Department = z.infer<typeof DepartmentSchema>;
export type CreateDepartment = z.infer<typeof CreateDepartmentSchema>;
export type Employee = z.infer<typeof EmployeeSchema>;
export type CreateEmployee = z.infer<typeof CreateEmployeeSchema>;
export type UpdateEmployee = z.infer<typeof UpdateEmployeeSchema>;
