import { Hono } from "hono";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import actionsRouter from "./routes/actions";
import employeesRouter from "./routes/employees";
import { swaggerUI } from "@hono/swagger-ui";

const app = new OpenAPIHono();

// Enable CORS for all routes
app.use('*', cors());

// Register route modules
app.route("/employees", employeesRouter);
app.route("/actions", actionsRouter);

// OpenAPI documentation endpoint
app.get("/openapi.json", (c) => {
  return c.json(
    app.getOpenAPIDocument({
      openapi: "3.0.0",
      info: {
        title: "CRUD API",
        version: "1.0.0",
        description:
          "A simple CRUD API for managing employees with an in-memory database",
      },
      servers: [
        {
          url: "http://localhost:3333",
          description: "Development server",
        },
      ],
    })
  );
});

// Swagger UI
app.get("/docs", swaggerUI({ url: "/openapi.json" }));

// Root endpoint
app.get("/", (c) => {
  return c.text(
    "CRUD API - Employees endpoint available at /employees\nAPI Documentation: /docs"
  );
});

export default {
  port: 3333,
  fetch: app.fetch,
};
