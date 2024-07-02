import CartService from "../services/Cart.service.js";

export default class CartController {
    #service;

    constructor(service = new CartService()) {
        this.#service = service;
    }

    getCart = async (req, res) => {
        try {
            const cart = await this.#service.getCart(req.userId);
            res.json(cart);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    addToCart = async (req, res) => {
        try {
            const updatedCart = await this.#service.addToCart(req.userId, req.body.productId);
            res.json(updatedCart);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    updateCart = async (req, res) => {
        try {
            const updatedCart = await this.#service.updateCart(req.userId, req.body);
            res.json(updatedCart);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    removeFromCart = async (req, res) => {
        try {
            const updatedCart = await this.#service.removeFromCart(req.userId, req.body.productId);
            res.json(updatedCart);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
    removeAllFromCart = async (req, res) => {
        try {
            const updatedCart = await this.#service.removeAllFromCart(req.userId);
            res.json(updatedCart);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
}
