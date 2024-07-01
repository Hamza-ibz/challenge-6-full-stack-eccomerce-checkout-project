import * as expressValidator from "express-validator";
import Users from "../models/Users.model.js";

export default class RegisterValidator {
    static validate = () => {
        return [
            expressValidator.body("_id").optional().isMongoId(),
            expressValidator
                .body("email")
                .exists()
                .normalizeEmail()
                .escape()
                .isEmail()
                .notEmpty()
                .withMessage("A valid email is required"),
            expressValidator
                .body("password")
                .exists()
                .escape()
                .notEmpty()
                .isLength({ min: 8 })
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
                .withMessage("Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."),
            // expressValidator
            //     .body("role")
            //     .optional()
            //     .isIn(['user', 'admin'])
            //     .withMessage("Role must be either 'user' or 'admin'"),
            RegisterValidator.handleValidationErrors,
        ];
    };

    static handleValidationErrors = (req, res, next) => {
        const errors = expressValidator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };

    static checkDuplicateEmail = () => {
        return async (req, res, next) => {
            try {
                const user = await Users.findOne({ email: req.body.email });
                if (user) {
                    return res.status(400).json({ errors: [{ msg: 'Email already in use' }] });
                }
                next();
            } catch (err) {
                return res.status(500).json({ errors: [{ msg: 'Server error' }] });
            }
        };
    };
}
