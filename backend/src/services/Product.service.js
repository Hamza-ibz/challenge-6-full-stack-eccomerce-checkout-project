import Product from "../models/Product.model.js";

export default class ProductService {
    getProducts = async () => {
        return await Product.find({});
    };

    getProductById = async (productId) => {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    };

    createProduct = async (productData) => {
        const newProduct = new Product(productData);
        await newProduct.save();
        return newProduct;
    };

    updateProduct = async (productId, updateData) => {
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        if (!updatedProduct) {
            throw new Error("Product not found");
        }
        return updatedProduct;
    };

    deleteProduct = async (productId) => {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            throw new Error("Product not found");
        }
        return deletedProduct;
    };
}
