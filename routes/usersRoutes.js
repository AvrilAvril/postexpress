const express = require("express");

const usersControllers = require("../controllers/usersControllers");
//const ordersControllers = require("../controllers/ordersControllers");

const router = express.Router();

router.get("/:id", usersControllers.getById);

router.get("/", usersControllers.getAll);

router.post("/", usersControllers.create);

router.put("/:id", usersControllers.updateById);

router.delete(
  "/:id",
  secure, // a token param is available on the url, that the value of it is existing in the database
  // if it exists we go next, if it doesnt we send back a 401
  usersControllers.deleteById
);

module.exports = router;
