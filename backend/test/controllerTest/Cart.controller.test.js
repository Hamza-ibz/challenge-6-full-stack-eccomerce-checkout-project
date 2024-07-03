import { expect } from "chai";
import sinon from "sinon";
import CartController from "../../src/controllers/Cart.controller.js";

describe("CartController Unit Tests", () => {
    let cartController, mockCartService, mockRequest, mockResponse;

    beforeEach(() => {
        mockCartService = {
            getCart: sinon.stub(),
            addToCart: sinon.stub(),
            updateCart: sinon.stub(),
            removeFromCart: sinon.stub(),
            removeAllFromCart: sinon.stub(),
        };
        cartController = new CartController(mockCartService);
        mockRequest = {
            body: {},
            params: {},
            userId: "user1",
        };
        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
        };
    });

    describe("getCart", () => {
        it("should return the user's cart", async () => {
            // Arrange
            const cart = { userId: "user1", items: [{ productId: "1", quantity: 2 }] };
            mockCartService.getCart.resolves(cart);

            // Act
            await cartController.getCart(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.json.calledWith(cart)).to.be.true;
        });

        it("should return a 500 response when an error occurs while getting the cart", async () => {
            // Arrange
            const error = new Error("Database error");
            mockCartService.getCart.rejects(error);

            // Act
            await cartController.getCart(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe("addToCart", () => {
        it("should add a product to the user's cart", async () => {
            // Arrange
            const updatedCart = { userId: "user1", items: [{ productId: "1", quantity: 1 }] };
            mockCartService.addToCart.resolves(updatedCart);
            mockRequest.body = { productId: "1" };

            // Act
            await cartController.addToCart(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.json.calledWith(updatedCart)).to.be.true;
        });

        it("should return a 500 response when an error occurs while adding a product to the cart", async () => {
            // Arrange
            const error = new Error("Database error");
            mockCartService.addToCart.rejects(error);
            mockRequest.body = { productId: "1" };

            // Act
            await cartController.addToCart(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe("updateCart", () => {
        it("should update the user's cart", async () => {
            // Arrange
            const updatedCart = { userId: "user1", items: [{ productId: "1", quantity: 3 }] };
            mockCartService.updateCart.resolves(updatedCart);
            mockRequest.body = { items: [{ productId: "1", quantity: 3 }] };

            // Act
            await cartController.updateCart(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.json.calledWith(updatedCart)).to.be.true;
        });

        it("should return a 500 response when an error occurs while updating the cart", async () => {
            // Arrange
            const error = new Error("Database error");
            mockCartService.updateCart.rejects(error);
            mockRequest.body = { items: [{ productId: "1", quantity: 3 }] };

            // Act
            await cartController.updateCart(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe("removeFromCart", () => {
        it("should remove a product from the user's cart", async () => {
            // Arrange
            const updatedCart = { userId: "user1", items: [] };
            mockCartService.removeFromCart.resolves(updatedCart);
            mockRequest.body = { productId: "1" };

            // Act
            await cartController.removeFromCart(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.json.calledWith(updatedCart)).to.be.true;
        });

        it("should return a 500 response when an error occurs while removing a product from the cart", async () => {
            // Arrange
            const error = new Error("Database error");
            mockCartService.removeFromCart.rejects(error);
            mockRequest.body = { productId: "1" };

            // Act
            await cartController.removeFromCart(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe("removeAllFromCart", () => {
        it("should remove all products from the user's cart", async () => {
            // Arrange
            const updatedCart = { userId: "user1", items: [] };
            mockCartService.removeAllFromCart.resolves(updatedCart);

            // Act
            await cartController.removeAllFromCart(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.json.calledWith(updatedCart)).to.be.true;
        });

        it("should return a 500 response when an error occurs while removing all products from the cart", async () => {
            // Arrange
            const error = new Error("Database error");
            mockCartService.removeAllFromCart.rejects(error);

            // Act
            await cartController.removeAllFromCart(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });
});
