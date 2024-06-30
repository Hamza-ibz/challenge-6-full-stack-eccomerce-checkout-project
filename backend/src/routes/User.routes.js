import { Router } from "express";

export default class UserRoutes {
    #userController;
    #router;
    #routeStartPoint;

    constructor(routeStartPoint = "/") {
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => {
        // User routes
        this.#router.get("/getUsers");
        this.#router.post("/register");
        this.#router.post("/login");
        this.#router.post("/update-password");
    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}


