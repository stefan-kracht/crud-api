// Helper functions for the CRUD API

// Generate a unique ID for employees
export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 11);
}