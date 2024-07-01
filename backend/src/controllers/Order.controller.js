import OrderService from "../services/Order.service.js";

export default class OrderController {
    #service;

    constructor(service = new OrderService()) {
        this.#service = service;
    }

    getOrders = async (req, res) => {
        try {
            const orders = await this.#service.getOrders(req.userId);
            res.json(orders);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    getOrderById = async (req, res) => {
        try {
            const order = await this.#service.getOrderById(req.params.id);
            res.json(order);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    createOrder = async (req, res) => {
        try {
            const newOrder = await this.#service.createOrder(req.userId, req.body);
            res.status(201).json(newOrder);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    updateOrder = async (req, res) => {
        try {
            const updatedOrder = await this.#service.updateOrder(req.params.id, req.body);
            res.json(updatedOrder);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    deleteOrder = async (req, res) => {
        try {
            await this.#service.deleteOrder(req.params.id);
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
}
