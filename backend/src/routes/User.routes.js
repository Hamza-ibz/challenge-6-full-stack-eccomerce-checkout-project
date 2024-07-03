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
        this.#router.delete("/:id", authMiddleware, this.#userController.deleteUserById);
        this.#router.get("/admin", authMiddleware, this.#userController.getAdminPage);
        this.#router.put("/role/:id", authMiddleware, this.#userController.updateUserRoleById);

        // this.#router.get("/admin", authMiddleware, verifyRole, this.#userController.getAdminPage);
    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}
