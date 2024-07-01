import { Router } from "express";
import ProductController from "../controllers/Product.controller.js";

export default class ProductRoutes {
    #productController;
    #router;
    #routeStartPoint;

    constructor(productController = new ProductController(), routeStartPoint = "/products") {
        this.#productController = productController;
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => {
        this.#router.get("/", this.#productController.getProducts);
        this.#router.post("/", this.#productController.createProduct);
        this.#router.put("/:id", this.#productController.updateProduct);
        this.#router.delete("/:id", this.#productController.deleteProduct);
    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}
