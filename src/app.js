const express = require('express');
const authRoutes = require('./routes/auth.route');
const recordRoutes = require('./routes/record.route');
const dashboardRoutes = require('./routes/dashboard.route');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);




module.exports = app;