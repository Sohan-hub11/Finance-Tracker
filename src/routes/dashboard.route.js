const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const { getSummary } = require("../controllers/dashboard.controller");

router.get("/", auth, role(["admin", "analyst", "viewer"]), getSummary);

module.exports = router;