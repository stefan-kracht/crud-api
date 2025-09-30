import { z } from "zod";

// Employee Zod schema
export const EmployeeSchema = z.object({
  id: z.string().openapi({ example: "abc123" }),
  name: z.string().openapi({ example: "John Doe" }),
  age: z.number().int().min(18).max(100).openapi({ example: 30 }),
  isActive: z.boolean().openapi({ example: true }),
  department: z.enum(['engineering', 'marketing', 'sales', 'hr']).openapi({ example: "engineering" }),
  salary: z.number().int().min(0).openapi({ example: 75000 }),
  hireDate: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/).openapi({ example: "2023-01-15T10:00:00.000Z" })
}).openapi("Employee");

// Create employee request schema (without id and hireDate)
export const CreateEmployeeSchema = EmployeeSchema.omit({ id: true, hireDate: true });

// Update employee request schema (all fields optional except id)
export const UpdateEmployeeSchema = EmployeeSchema.partial().omit({ id: true });

// Error response schema
export const ErrorSchema = z.object({
  error: z.string().openapi({ example: "Employee not found" })
});

// Success response schema for delete
export const DeleteSuccessSchema = z.object({
  message: z.string().openapi({ example: "Employee deleted successfully" })
});

// Seed response schema
export const SeedResponseSchema = z.object({
  message: z.string().openapi({ example: "Seeded database with 10 employees" }),
  employees: z.array(EmployeeSchema).openapi({ description: "The generated employees" })
});

// Type exports for TypeScript
export type Employee = z.infer<typeof EmployeeSchema>;
export type CreateEmployee = z.infer<typeof CreateEmployeeSchema>;
export type UpdateEmployee = z.infer<typeof UpdateEmployeeSchema>;