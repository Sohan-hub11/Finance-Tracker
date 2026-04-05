const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/record.controller");

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Records
 *   description: Financial records APIs
 */


/**
 * @swagger
 * /records:
 *   post:
 *     summary: Create a record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             amount: 5000
 *             type: income
 *             category: salary
 *             date: 2026-04-05
 *             note: monthly salary
 *     responses:
 *       201:
 *         description: Record created
 */

router.post("/", role(["admin"]), createRecord);

/**
 * @swagger
 * /records:
 *   get:
 *     summary: Get records with pagination & filters
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: minAmount
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxAmount
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Paginated records list
 */
router.get("/", role(["admin", "analyst"]), getRecords);

/**
 * @swagger
 * /records/{id}:
 *   put:
 *     summary: Update record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             amount: 6000
 *     responses:
 *       200:
 *         description: Record updated
 */
router.put("/:id", role(["admin"]), updateRecord);

/**
 * @swagger
 * /records/{id}:
 *   delete:
 *     summary: Delete record (Admin only)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Record deleted
 */

router.delete("/:id", role(["admin"]), deleteRecord);

module.exports = router;