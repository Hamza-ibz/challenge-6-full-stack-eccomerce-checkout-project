import { expect } from 'chai';
import sinon from 'sinon';
import UserController from '../../src/controllers/User.controller.js';

describe('UserController Unit Tests', () => {
    let userController, mockUserService, mockRequest, mockResponse;

    beforeEach(() => {
        mockUserService = {
            getUsers: sinon.stub(),
            registerUser: sinon.stub(),
            loginUser: sinon.stub(),
            updatePassword: sinon.stub(),
            deleteUserById: sinon.stub(),
            updateUserRoleById: sinon.stub(),
        };
        userController = new UserController(mockUserService);
        mockRequest = {
            body: {},
            params: {},
            userId: '1',
        };
        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
        };
    });

    describe('registerUser', () => {
        it('should successfully register a user and return the user data', async () => {
            const newUser = { _id: '1', email: 'newuser@example.com' };
            mockUserService.registerUser.resolves(newUser);
            mockRequest.body = newUser;

            await userController.registerUser(mockRequest, mockResponse);

            expect(mockResponse.status.calledWith(201)).to.be.true;
            expect(mockResponse.json.calledWith(newUser)).to.be.true;
        });

        it('should return a 400 response when the request body is null', async () => {
            mockRequest.body = null;

            await userController.registerUser(mockRequest, mockResponse);

            expect(mockResponse.status.calledWith(400)).to.be.true;
            expect(mockResponse.json.calledWith({ message: 'Invalid User' })).to.be.true;
        });

        it('should return a 500 response when an error occurs during user registration', async () => {
            const error = new Error('Unable to create User');
            mockUserService.registerUser.rejects(error);
            mockRequest.body = { email: 'user1@example.com', password: 'password' };

            await userController.registerUser(mockRequest, mockResponse);

            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe('loginUser', () => {
        it('should successfully log in a user and return a token', async () => {
            const result = { token: 'someToken' };
            mockRequest.body = { email: 'user1@example.com', password: 'password' };
            mockUserService.loginUser.resolves(result);

            await userController.loginUser(mockRequest, mockResponse);

            expect(mockResponse.json.calledWith(result)).to.be.true;
        });

        it('should return a 500 response when an error occurs during login', async () => {
            const error = new Error('Invalid User');
            mockRequest.body = { email: 'user1@example.com', password: 'wrongPassword' };
            mockUserService.loginUser.rejects(error);

            await userController.loginUser(mockRequest, mockResponse);

            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe('getUsers', () => {
        it('should return a list of users', async () => {
            const users = [{ email: 'user1@example.com' }];
            mockUserService.getUsers.resolves(users);

            await userController.getUsers(mockRequest, mockResponse);

            expect(mockResponse.json.calledWith(users)).to.be.true;
        });

        it('should return a 500 response when an error occurs while retrieving users', async () => {
            const error = new Error();
            mockUserService.getUsers.rejects(error);

            await userController.getUsers(mockRequest, mockResponse);

            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe('updatePassword', () => {
        it('should successfully update the user\'s password', async () => {
            mockRequest.body = { currentPassword: 'oldPassword', newPassword: 'newPassword' };

            await userController.updatePassword(mockRequest, mockResponse);

            expect(mockResponse.status.calledWith(200)).to.be.true;
            expect(mockResponse.json.calledWith({ message: 'Password updated successfully' })).to.be.true;
        });

        it('should return a 500 response when an error occurs during password update', async () => {
            const error = new Error('Error updating password');
            mockRequest.body = { currentPassword: 'oldPassword', newPassword: 'newPassword' };
            mockUserService.updatePassword.rejects(error);

            await userController.updatePassword(mockRequest, mockResponse);

            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe('deleteUserById', () => {
        it('should successfully delete a user by ID', async () => {
            mockRequest.params = { id: '1' };
            const deletedUser = { id: '1', email: 'user1@example.com' };
            mockUserService.deleteUserById.resolves(deletedUser);

            await userController.deleteUserById(mockRequest, mockResponse);

            expect(mockResponse.status.calledWith(200)).to.be.true;
            expect(mockResponse.json.calledWith({ message: 'User deleted successfully', deletedUser })).to.be.true;
        });

        it('should return a 500 response when an error occurs during user deletion', async () => {
            const error = new Error('Error deleting user');
            mockRequest.params = { id: '1' };
            mockUserService.deleteUserById.rejects(error);

            await userController.deleteUserById(mockRequest, mockResponse);

            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });

    describe('updateUserRoleById', () => {
        it('should successfully update user role by ID', async () => {
            mockRequest.params = { id: '1' };
            mockRequest.body = { role: 'admin' };
            const updatedUser = { id: '1', email: 'user1@example.com', role: 'admin' };
            mockUserService.updateUserRoleById.resolves(updatedUser);

            await userController.updateUserRoleById(mockRequest, mockResponse);

            expect(mockResponse.status.calledWith(200)).to.be.true;
            expect(mockResponse.json.calledWith({ message: 'User role updated successfully', updatedUser })).to.be.true;
        });

        it('should return a 500 response when an error occurs during role update', async () => {
            const error = new Error('Error updating user role');
            mockRequest.params = { id: '1' };
            mockRequest.body = { role: 'admin' };
            mockUserService.updateUserRoleById.rejects(error);

            await userController.updateUserRoleById(mockRequest, mockResponse);

            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });
});
