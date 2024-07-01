import Order from "../models/Order.model.js";
import Cart from "../models/Cart.model.js";

export default class OrderService {
    getOrders = async (userId) => {
        return await Order.find({ user: userId }).populate('products.product');
    };

    getOrderById = async (orderId) => {
        const order = await Order.findById(orderId).populate('products.product');
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    };

    createOrder = async (userId, orderData) => {
        const cart = await Cart.findOne({ user: userId }).populate('products.product');
        if (!cart) {
            throw new Error("Cart not found");
        }

        const total = cart.products.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
        const newOrder = new Order({ user: userId, products: cart.products, total, ...orderData });

        await newOrder.save();
        await cart.remove();

        return newOrder;
    };

    updateOrder = async (orderId, updateData) => {
        const order = await Order.findByIdAndUpdate(orderId, updateData, { new: true }).populate('products.product');
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    };

    deleteOrder = async (orderId) => {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    };
}
