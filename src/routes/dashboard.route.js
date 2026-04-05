const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const { getSummary } = require("../controllers/dashboard.controller");


/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Analytics APIs
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Income, Expense, Net balance
 */
router.get("/", auth, role(["admin", "analyst", "viewer"]), getSummary);

module.exports = router;