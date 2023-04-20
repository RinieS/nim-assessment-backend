const { Router } = require("express");
const orderController = require("../controllers/orderController");

const orderRouter = Router();
// task 2b
orderRouter.get("/status", orderController.getByStatus);
// task 2a
orderRouter.get("/total-sales", orderController.getTotalSales);

orderRouter.get("/", orderController.getAll);
orderRouter.get("/:id", orderController.getOne);
orderRouter.post("/", orderController.create);
orderRouter.put("/:id", orderController.update);
orderRouter.delete("/:id", orderController.remove);

module.exports = orderRouter;
