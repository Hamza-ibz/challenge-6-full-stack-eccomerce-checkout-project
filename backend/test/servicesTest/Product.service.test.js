// productService.test.js

import { expect } from "chai";
import sinon from "sinon";
import ProductService from "../../src/services/Product.service.js";
import Product from "../../src/models/Product.model.js";

describe("ProductService Unit Tests", () => {
    let productService;

    beforeEach(() => {
        productService = new ProductService();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("getProducts", () => {
        it("should return all products", async () => {
            // Arrange
            const mockProducts = [{ name: "Product 1" }, { name: "Product 2" }];
            sinon.stub(Product, "find").resolves(mockProducts);

            // Act
            const result = await productService.getProducts();

            // Assert
            expect(result).to.deep.equal(mockProducts);
        });

        it("should handle error when products are not found", async () => {
            // Arrange
            sinon.stub(Product, "find").throws(new Error("Products not found"));

            // Act & Assert
            try {
                await productService.getProducts();
                // Fail the test if the above operation does not throw an error
                expect.fail("Expected error was not thrown");
            } catch (error) {
                expect(error.message).to.equal("Products not found");
            }
        });
    });

    describe("getProductById", () => {
        it("should return a product by id", async () => {
            // Arrange
            const mockProduct = { _id: "1", name: "Product 1" };
            sinon.stub(Product, "findById").resolves(mockProduct);

            // Act
            const result = await productService.getProductById("1");

            // Assert
            expect(result).to.deep.equal(mockProduct);
        });

        it("should throw an error when product is not found", async () => {
            // Arrange
            sinon.stub(Product, "findById").returns(null);

            // Act & Assert
            try {
                await productService.getProductById("1");
                // Fail the test if the above operation does not throw an error
                expect.fail("Expected error was not thrown");
            } catch (error) {
                expect(error.message).to.equal("Product not found");
            }
        });
    });

    describe("createProduct", () => {

        it("should throw an error when saving fails", async () => {
            // Arrange
            const newProductData = { name: "New Product", price: 100 };
            const error = new Error("Failed to save product");
            sinon.stub(Product.prototype, "save").throws(error);

            // Act & Assert
            try {
                await productService.createProduct(newProductData);
                // Fail the test if the above operation does not throw an error
                expect.fail("Expected error was not thrown");
            } catch (err) {
                expect(err.message).to.equal("Failed to save product");
            }
        });
    });

    describe("updateProduct", () => {
        it("should update a product by id", async () => {
            // Arrange
            const productId = "1";
            const updateData = { name: "Updated Product" };
            const updatedProduct = { _id: productId, ...updateData };
            sinon.stub(Product, "findByIdAndUpdate").resolves(updatedProduct);

            // Act
            const result = await productService.updateProduct(productId, updateData);

            // Assert
            expect(result).to.deep.equal(updatedProduct);
        });

        it("should throw an error when product is not found", async () => {
            // Arrange
            const productId = "1";
            const updateData = { name: "Updated Product" };
            sinon.stub(Product, "findByIdAndUpdate").returns(null);

            // Act & Assert
            try {
                await productService.updateProduct(productId, updateData);
                // Fail the test if the above operation does not throw an error
                expect.fail("Expected error was not thrown");
            } catch (error) {
                expect(error.message).to.equal("Product not found");
            }
        });
    });

    describe("deleteProduct", () => {
        it("should delete a product by id", async () => {
            // Arrange
            const productId = "1";
            const deletedProduct = { _id: productId, name: "Deleted Product" };
            sinon.stub(Product, "findByIdAndDelete").resolves(deletedProduct);

            // Act
            const result = await productService.deleteProduct(productId);

            // Assert
            expect(result).to.deep.equal(deletedProduct);
        });

        it("should throw an error when product is not found", async () => {
            // Arrange
            const productId = "1";
            sinon.stub(Product, "findByIdAndDelete").returns(null);

            // Act & Assert
            try {
                await productService.deleteProduct(productId);
                // Fail the test if the above operation does not throw an error
                expect.fail("Expected error was not thrown");
            } catch (error) {
                expect(error.message).to.equal("Product not found");
            }
        });
    });
});
