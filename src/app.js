const express = require('express');
const authRoutes = require('./routes/auth.route');
const recordRoutes = require('./routes/record.route');
const dashboardRoutes = require('./routes/dashboard.route');
const errorHandler = require("./middlewares/error.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// Swagger UI setup.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Error Middleware
app.use(errorHandler);


module.exports = app;