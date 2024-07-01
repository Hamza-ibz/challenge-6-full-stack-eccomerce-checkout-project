import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";
import axios from 'axios';

const FAKE_STORE_API_URL = 'https://fakestoreapi.com/products/';

export default class CartService {
    getCart = async (userId) => {
        const cart = await Cart.findOne({ user: userId }).populate('products.product');
        if (!cart) {
            throw new Error("Cart not found");
        }
        return cart;
    };

    async fetchAndSaveProduct(productId) {
        let product = await Product.findOne({ id: productId });

        if (!product) {
            const response = await axios.get(`${FAKE_STORE_API_URL}${productId}`);
            const productData = response.data;

            product = new Product({
                id: productData.id,
                title: productData.title,
                price: productData.price,
                description: productData.description,
                category: productData.category,
                image: productData.image,
                rating: {
                    rate: productData.rating.rate,
                    count: productData.rating.count
                }
            });

            await product.save();
        }

        return product._id;
    }

    async addToCart(userId, productId) {
        const productObjectId = await this.fetchAndSaveProduct(productId);

        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            const productIndex = cart.products.findIndex(p => p.product.toString() === productObjectId.toString());
            if (productIndex > -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: productObjectId, quantity: 1 });
            }
        } else {
            cart = new Cart({ user: userId, products: [{ product: productObjectId, quantity: 1 }] });
        }

        await cart.save();
        return this.getCart(userId);
    }

    updateCart = async (userId, updatedProducts) => {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found");
        }
        cart.products = updatedProducts;
        await cart.save();
        return this.getCart(userId);
    };

    async removeFromCart(userId, productId) {
        const productObjectId = await this.fetchAndSaveProduct(productId);

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found");
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productObjectId.toString());
        if (productIndex > -1) {
            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity -= 1;
            } else {
                cart.products.splice(productIndex, 1);
            }
        } else {
            throw new Error("Product not found in cart");
        }

        await cart.save();
        return this.getCart(userId);
    }
}
