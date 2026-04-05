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

router.post("/", role(["admin"]), createRecord);
router.get("/", role(["admin", "analyst"]), getRecords);
router.put("/:id", role(["admin"]), updateRecord);
router.delete("/:id", role(["admin"]), deleteRecord);

module.exports = router;