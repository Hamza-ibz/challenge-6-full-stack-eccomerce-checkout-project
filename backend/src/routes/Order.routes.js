import { Router } from "express";
import OrderController from "../controllers/Order.controller.js";

export default class OrderRoutes {
    #orderController;
    #router;
    #routeStartPoint;

    constructor(orderController = new OrderController(), routeStartPoint = "/orders") {
        this.#orderController = orderController;
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => {
        this.#router.get("/", this.#orderController.getOrders);
        this.#router.post("/", this.#orderController.createOrder);
        this.#router.put("/:id", this.#orderController.updateOrder);
        this.#router.delete("/:id", this.#orderController.deleteOrder);
    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}
