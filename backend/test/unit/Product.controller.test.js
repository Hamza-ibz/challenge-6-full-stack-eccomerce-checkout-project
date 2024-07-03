import { expect } from "chai";
import sinon from "sinon";
import ProductController from "../../src/controllers/Product.controller.js";

describe("ProductController Unit Tests", () => {
    let productController, mockProductService, mockRequest, mockResponse;

    beforeEach(() => {
        mockProductService = {
            getProducts: sinon.stub(),
            getProductById: sinon.stub(),
            createProduct: sinon.stub(),
            updateProduct: sinon.stub(),
            deleteProduct: sinon.stub(),
        };
        productController = new ProductController(mockProductService);
        mockRequest = {
            body: {},
            params: { id: "1" },
        };
        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
        };
    });

    describe("getProducts", () => {
        it("should return a list of products", async () => {
            // Arrange
            const products = [{ id: "1", name: "Product 1" }, { id: "2", name: "Product 2" }];
            mockProductService.getProducts.resolves(products);

            // Act
            await productController.getProducts(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.json.calledWith(products)).to.be.true;
        });

        it("should return a 500 response when an error occurs while retrieving products", async () => {
            // Arrange
            const error = new Error("Database error");
            mockProductService.getProducts.rejects(error);

            // Act
            await productController.getProducts(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe("getProductById", () => {
        it("should return a product by ID", async () => {
            // Arrange
            const product = { id: "1", name: "Product 1" };
            mockProductService.getProductById.resolves(product);

            // Act
            await productController.getProductById(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.json.calledWith(product)).to.be.true;
        });

        it("should return a 500 response when an error occurs while retrieving a product by ID", async () => {
            // Arrange
            const error = new Error("Database error");
            mockProductService.getProductById.rejects(error);

            // Act
            await productController.getProductById(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe("createProduct", () => {
        it("should create a new product", async () => {
            // Arrange
            const newProduct = { id: "1", name: "New Product" };
            mockProductService.createProduct.resolves(newProduct);
            mockRequest.body = newProduct;

            // Act
            await productController.createProduct(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(201)).to.be.true;
            expect(mockResponse.json.calledWith(newProduct)).to.be.true;
        });

        it("should return a 500 response when an error occurs while creating a product", async () => {
            // Arrange
            const error = new Error("Database error");
            mockProductService.createProduct.rejects(error);
            mockRequest.body = { name: "New Product" };

            // Act
            await productController.createProduct(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe("updateProduct", () => {
        it("should update a product", async () => {
            // Arrange
            const updatedProduct = { id: "1", name: "Updated Product" };
            mockProductService.updateProduct.resolves(updatedProduct);
            mockRequest.body = updatedProduct;

            // Act
            await productController.updateProduct(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.json.calledWith(updatedProduct)).to.be.true;
        });

        it("should return a 500 response when an error occurs while updating a product", async () => {
            // Arrange
            const error = new Error("Database error");
            mockProductService.updateProduct.rejects(error);
            mockRequest.body = { name: "Updated Product" };

            // Act
            await productController.updateProduct(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe("deleteProduct", () => {
        it("should delete a product", async () => {
            // Arrange
            const productId = "1";
            mockProductService.deleteProduct.resolves();

            // Act
            await productController.deleteProduct(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(200)).to.be.true;
            expect(mockResponse.json.calledWith({ message: "Product deleted successfully" })).to.be.true;
        });

        it("should return a 500 response when an error occurs while deleting a product", async () => {
            // Arrange
            const error = new Error("Database error");
            mockProductService.deleteProduct.rejects(error);

            // Act
            await productController.deleteProduct(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });
});
