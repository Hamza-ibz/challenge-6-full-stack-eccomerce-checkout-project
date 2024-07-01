import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";

export default class CartService {
    getCart = async (userId) => {
        const cart = await Cart.findOne({ user: userId }).populate('products.product');
        if (!cart) {
            throw new Error("Cart not found");
        }
        return cart;
    };

    addToCart = async (userId, productId) => {
        const cart = await Cart.findOne({ user: userId });
        const product = await Product.findById(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        if (cart) {
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
            await cart.save();
        } else {
            const newCart = new Cart({ user: userId, products: [{ product: productId, quantity: 1 }] });
            await newCart.save();
        }

        return this.getCart(userId);
    };

    updateCart = async (userId, updatedProducts) => {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found");
        }
        cart.products = updatedProducts;
        await cart.save();
        return this.getCart(userId);
    };

    removeFromCart = async (userId, productId) => {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found");
        }
        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();
        return this.getCart(userId);
    };
}
