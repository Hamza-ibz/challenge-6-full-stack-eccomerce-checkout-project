import { expect } from "chai";
import sinon from "sinon";
import OrderController from "../../src/controllers/Order.controller.js";

describe("OrderController Unit Tests", () => {
    let orderController, mockOrderService, mockRequest, mockResponse;

    beforeEach(() => {
        mockOrderService = {
            getOrders: sinon.stub(),
            getOrderById: sinon.stub(),
            createOrder: sinon.stub(),
            updateOrder: sinon.stub(),
            deleteOrder: sinon.stub(),
        };
        orderController = new OrderController(mockOrderService);
        mockRequest = {
            body: {},
            params: { id: "1" },
            userId: "user1",
        };
        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
        };
    });

    describe("getOrders", () => {
        it("should return a list of orders for a user", async () => {
            // Arrange
            const orders = [{ id: "1", userId: "user1", total: 100 }];
            mockOrderService.getOrders.resolves(orders);

            // Act
            await orderController.getOrders(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.json.calledWith(orders)).to.be.true;
        });

        it("should return a 500 response when an error occurs while retrieving orders", async () => {
            // Arrange
            const error = new Error("Database error");
            mockOrderService.getOrders.rejects(error);

            // Act
            await orderController.getOrders(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe("getOrderById", () => {
        it("should return an order by ID", async () => {
            // Arrange
            const order = { id: "1", userId: "user1", total: 100 };
            mockOrderService.getOrderById.resolves(order);

            // Act
            await orderController.getOrderById(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.json.calledWith(order)).to.be.true;
        });

        it("should return a 500 response when an error occurs while retrieving an order by ID", async () => {
            // Arrange
            const error = new Error("Database error");
            mockOrderService.getOrderById.rejects(error);

            // Act
            await orderController.getOrderById(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe("createOrder", () => {
        it("should create a new order for a user", async () => {
            // Arrange
            const newOrder = { id: "1", userId: "user1", total: 100 };
            mockOrderService.createOrder.resolves(newOrder);
            mockRequest.body = newOrder;

            // Act
            await orderController.createOrder(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(201)).to.be.true;
            expect(mockResponse.json.calledWith(newOrder)).to.be.true;
        });

        it("should return a 500 response when an error occurs while creating an order", async () => {
            // Arrange
            const error = new Error("Database error");
            mockOrderService.createOrder.rejects(error);
            mockRequest.body = { userId: "user1", total: 100 };

            // Act
            await orderController.createOrder(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe("updateOrder", () => {
        it("should update an order", async () => {
            // Arrange
            const updatedOrder = { id: "1", userId: "user1", total: 150 };
            mockOrderService.updateOrder.resolves(updatedOrder);
            mockRequest.body = updatedOrder;

            // Act
            await orderController.updateOrder(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.json.calledWith(updatedOrder)).to.be.true;
        });

        it("should return a 500 response when an error occurs while updating an order", async () => {
            // Arrange
            const error = new Error("Database error");
            mockOrderService.updateOrder.rejects(error);
            mockRequest.body = { userId: "user1", total: 150 };

            // Act
            await orderController.updateOrder(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe("deleteOrder", () => {
        it("should delete an order", async () => {
            // Arrange
            const orderId = "1";
            mockOrderService.deleteOrder.resolves();

            // Act
            await orderController.deleteOrder(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(200)).to.be.true;
            expect(mockResponse.json.calledWith({ message: "Order deleted successfully" })).to.be.true;
        });

        it("should return a 500 response when an error occurs while deleting an order", async () => {
            // Arrange
            const error = new Error("Database error");
            mockOrderService.deleteOrder.rejects(error);

            // Act
            await orderController.deleteOrder(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });
});
