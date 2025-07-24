const express = require("express");
const { createService, updateService, deleteService, getAllServices } = require("../controllers/serviceController");
const router = express.Router();

router.post("/", createService);
router.get("/", getAllServices);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;
