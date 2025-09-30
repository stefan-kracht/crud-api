import { Hono } from "hono";
import employeesRouter from "./routes/employees";
import seedRouter from "./routes/seed";

const app = new Hono();

// Register route modules
app.route("/employees", employeesRouter);
app.route("/seed", seedRouter);

// Root endpoint
app.get("/", (c) => {
  return c.text("CRUD API - Employees endpoint available at /employees");
});

export default app;
