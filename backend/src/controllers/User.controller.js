import UsersService from "../services/Users.service.js";

export default class UserController {
    #service;

    constructor(service = new UsersService()) {
        this.#service = service;
    }

    getUsers = async (req, res) => {
        try {
            res.json(await this.#service.getUsers());
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    updatePassword = async (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.userId;
            await this.#service.updatePassword(userId, currentPassword, newPassword);
            res.status(200).json({ message: 'Password updated successfully' });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    registerUser = async (req, res) => {
        const invalidError = new Error("Invalid User");
        try {
            if (!req.body) throw invalidError;
            const newUser = await this.#service.registerUser(req.body);
            if (!newUser._id) throw new Error("Unable to create User");
            res.status(201).json(newUser);
        } catch (e) {
            if (e.message === invalidError.message) {
                res.status(400).json({ message: e.message });
            } else {
                res.status(500).json({ message: e.message });
            }
        }
    };

    loginUser = async (req, res) => {
        const invalidError = new Error("Invalid User");
        try {
            if (!req.body) throw invalidError;
            const { email, password } = req.body;
            const result = await this.#service.loginUser(email, password);
            res.json(result);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    getAdminPage = async (req, res) => {
        try {
            res.json(await this.#service.getUsers());
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    deleteUserById = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await this.#service.deleteUserById(id);
            res.status(200).json({ message: 'User deleted successfully', deletedUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };


    updateUserRoleById = async (req, res) => {
        try {
            const { id } = req.params;
            const { role } = req.body;
            const updatedUser = await this.#service.updateUserRoleById(id, role);
            res.status(200).json({ message: 'User role updated successfully', updatedUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}
