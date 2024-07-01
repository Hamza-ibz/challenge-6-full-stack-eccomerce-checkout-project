import { Router } from "express";
import UserController from "../controllers/User.controller.js";
import registerValidator from "../middleware/Register.validator.js";
import authMiddleware from "../middleware/AuthToken.validator.js";

export default class UserRoutes {
    #userController;
    #router;
    #routeStartPoint;

    constructor(userController = new UserController(), routeStartPoint = "/users") {
        this.#userController = userController;
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => {
        // User routes
        this.#router.get("/", this.#userController.getUsers);
        this.#router.post("/register", registerValidator.validate(), registerValidator.checkDuplicateEmail(), this.#userController.registerUser);
        this.#router.post("/login", this.#userController.loginUser);
        this.#router.post("/update-password", authMiddleware, this.#userController.updatePassword);
    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}
