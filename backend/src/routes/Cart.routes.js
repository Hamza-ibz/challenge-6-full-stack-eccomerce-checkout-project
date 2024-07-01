import { Router } from "express";
import CartController from "../controllers/Cart.controller.js";

export default class CartRoutes {
    #cartController;
    #router;
    #routeStartPoint;

    constructor(cartController = new CartController(), routeStartPoint = "/cart") {
        this.#cartController = cartController;
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => {
        this.#router.get("/", this.#cartController.getCart);
        this.#router.post("/", this.#cartController.addToCart);
        this.#router.put("/", this.#cartController.updateCart);
        this.#router.delete("/", this.#cartController.removeFromCart);
    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}
