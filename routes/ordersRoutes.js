const express = require("express");
const ordersControllers = require("../controllers/ordersControllers.js");

const router = express.Router();

router.get("/:id", ordersControllers.getById);

router.get("/", ordersControllers.getAll);

router.post("/", secure, ordersControllers.create);

router.put("/:id", ordersControllers.updateById);

router.delete("/:id", ordersControllers.deleteById);

module.exports = router;
