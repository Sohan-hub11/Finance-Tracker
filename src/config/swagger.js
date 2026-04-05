const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Tracker API",
      version: "1.0.0",
      description: "Complete Finance Tracker API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      // SCHEMAS
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string", example: "admin" },
            status: { type: "string", example: "active" },
          },
        },

        Record: {
          type: "object",
          properties: {
            _id: { type: "string" },
            amount: { type: "number" },
            type: { type: "string", example: "income" },
            category: { type: "string" },
            date: { type: "string", format: "date" },
            note: { type: "string" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);