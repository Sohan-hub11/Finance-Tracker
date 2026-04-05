const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/auth.controller");


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Sohan
 *             email: sohan@gmail.com
 *             password: 123456
 *     responses:
 *       201:
 *         description: User created
 */

router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and get JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: sohan@gmail.com
 *             password: 123456
 *     responses:
 *       200:
 *         description: Returns JWT token
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the user (client should delete token or server can blacklist it)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized (no token or invalid token)
 */
router.post("/logout", logout);

module.exports = router;