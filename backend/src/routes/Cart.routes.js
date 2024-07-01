import { Router } from "express";
import CartController from "../controllers/Cart.controller.js";
import authMiddleware from "../middleware/AuthToken.validator.js"; // Ensure the correct path


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
        this.#router.get("/", authMiddleware, this.#cartController.getCart);
        this.#router.post("/", authMiddleware, this.#cartController.addToCart);
        this.#router.put("/", authMiddleware, this.#cartController.updateCart);
        this.#router.delete("/", authMiddleware, this.#cartController.removeFromCart);
    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}
