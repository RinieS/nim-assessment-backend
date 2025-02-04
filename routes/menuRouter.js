const { Router } = require("express");
const menuController = require("../controllers/menuController");

const menuRouter = Router();

menuRouter.get("/", menuController.getAll);

// menuRouter.get("/:id", menuController.getOne);
menuRouter.post("/", menuController.create);
// task 1a
menuRouter.put("/:id", menuController.update);
// task 1b
menuRouter.delete("/:id", menuController.remove);
// task 1c
menuRouter.get("/search", menuController.getByNameOrDescription);

module.exports = menuRouter;
