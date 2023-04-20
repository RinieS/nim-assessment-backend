const { Router } = require("express");
const menuController = require("../controllers/menuController");

const menuRouter = Router();

menuRouter.get("/", menuController.getAll);
// task 1a
menuRouter.put("/:id", menuController.update);
// task 1b
menuRouter.delete("/:id", menuController.remove);

menuRouter.get("/:id", menuController.getOne);
menuRouter.post("/", menuController.create);

module.exports = menuRouter;
