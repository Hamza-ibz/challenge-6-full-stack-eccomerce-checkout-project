import ProductService from "../services/Product.service.js";

export default class ProductController {
    #service;

    constructor(service = new ProductService()) {
        this.#service = service;
    }

    getProducts = async (req, res) => {
        try {
            res.json(await this.#service.getProducts());
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    getProductById = async (req, res) => {
        try {
            const product = await this.#service.getProductById(req.params.id);
            res.json(product);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    createProduct = async (req, res) => {
        try {
            const newProduct = await this.#service.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    updateProduct = async (req, res) => {
        try {
            const updatedProduct = await this.#service.updateProduct(req.params.id, req.body);
            res.json(updatedProduct);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    deleteProduct = async (req, res) => {
        try {
            await this.#service.deleteProduct(req.params.id);
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
}
