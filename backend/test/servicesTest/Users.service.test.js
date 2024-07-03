// backend/test/servicesTest/Users.service.test.js

import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../../src/models/Users.model.js'; // Adjust path as per your project structure
import UsersService from '../../src/services/Users.service.js'; // Adjust path as per your project structure

const JWT_SECRET = process.env.JWT_SECRET || 'hamza_jwt_not-so-secret_key';

describe('UsersService Unit Tests', () => {
    let usersService;

    beforeEach(() => {
        usersService = new UsersService();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getUsers', () => {
        it('should call find on the Users model', async () => {
            const findStub = sinon.stub(Users, 'find').returns([]);

            await usersService.getUsers();

            expect(findStub.calledOnce).to.be.true;
            findStub.restore();
        });

        it('should return the result of calling find on the Users model', async () => {
            const users = [{ _id: '1', email: 'test@example.com' }];
            const findStub = sinon.stub(Users, 'find').resolves(users);

            const result = await usersService.getUsers();

            expect(result).to.deep.equal(users);
            findStub.restore();
        });

        it('should return an empty array if there are no users', async () => {
            const users = [];
            const findStub = sinon.stub(Users, 'find').returns(users);

            const result = await usersService.getUsers();

            expect(result).to.deep.equal(users);
            findStub.restore();
        });
    });

    describe('registerUser', () => {
        it('should hash the password and save the user', async () => {
            const newUser = { email: 'test@example.com', password: 'password' };
            const hashedPassword = 'hashedPassword';
            const saveStub = sinon.stub(Users.prototype, 'save').resolves(newUser);
            const hashStub = sinon.stub(bcrypt, 'hash').resolves(hashedPassword);

            const result = await usersService.registerUser(newUser);

            expect(hashStub.calledOnce).to.be.true;
            expect(saveStub.calledOnce).to.be.true;
            expect(result).to.equal(newUser);
            hashStub.restore();
            saveStub.restore();
        });

        it('should throw an error when saving fails', async () => {
            const newUser = { email: 'test@example.com', password: 'password' };
            const error = new Error('Invalid User');
            const saveStub = sinon.stub(Users.prototype, 'save').throws(error);
            const hashStub = sinon.stub(bcrypt, 'hash').resolves('hashedPassword');

            try {
                await usersService.registerUser(newUser);
                expect.fail('Expected error was not thrown');
            } catch (err) {
                expect(err).to.equal(error);
            }
            hashStub.restore();
            saveStub.restore();
        });
    });

    describe('loginUser', () => {

        it('should throw an error for invalid email', async () => {
            const email = 'invalid@example.com';
            const password = 'password';
            const findOneStub = sinon.stub(Users, 'findOne').resolves(null);

            try {
                await usersService.loginUser(email, password);
                expect.fail('Expected error was not thrown');
            } catch (err) {
                expect(err.message).to.equal('Invalid credentials for for Email');
            }
            findOneStub.restore();
        });

        it('should throw an error for invalid password', async () => {
            const user = { _id: '1', email: 'test@example.com', password: 'hashedPassword' };
            const email = 'test@example.com';
            const password = 'invalidPassword';
            const findOneStub = sinon.stub(Users, 'findOne').resolves(user);
            const compareStub = sinon.stub(bcrypt, 'compare').resolves(false);

            try {
                await usersService.loginUser(email, password);
                expect.fail('Expected error was not thrown');
            } catch (err) {
                expect(err.message).to.equal('Invalid credentials for Password');
            }
            findOneStub.restore();
            compareStub.restore();
        });
    });

    describe('updatePassword', () => {
        it('should update the password for valid current password', async () => {
            const userId = '1';
            const currentPassword = 'currentPassword';
            const newPassword = 'newPassword';
            const user = { _id: '1', password: 'hashedPassword', save: sinon.stub().resolves() };
            const findByIdStub = sinon.stub(Users, 'findById').resolves(user);
            const compareStub = sinon.stub(bcrypt, 'compare').resolves(true);
            const hashStub = sinon.stub(bcrypt, 'hash').resolves('newHashedPassword');

            await usersService.updatePassword(userId, currentPassword, newPassword);

            expect(findByIdStub.calledOnce).to.be.true;
            expect(compareStub.calledOnce).to.be.true;
            expect(hashStub.calledOnce).to.be.true;
            expect(user.save.calledOnce).to.be.true;
            findByIdStub.restore();
            compareStub.restore();
            hashStub.restore();
        });

        it('should throw an error for incorrect current password', async () => {
            const userId = '1';
            const currentPassword = 'currentPassword';
            const newPassword = 'newPassword';
            const user = { _id: '1', password: 'hashedPassword', save: sinon.stub().resolves() };
            const findByIdStub = sinon.stub(Users, 'findById').resolves(user);
            const compareStub = sinon.stub(bcrypt, 'compare').resolves(false);

            try {
                await usersService.updatePassword(userId, currentPassword, newPassword);
                expect.fail('Expected error was not thrown');
            } catch (err) {
                expect(err.message).to.equal('Current password is incorrect');
            }
            findByIdStub.restore();
            compareStub.restore();
        });

        it('should throw an error if user is not found', async () => {
            const userId = '1';
            const currentPassword = 'currentPassword';
            const newPassword = 'newPassword';
            const findByIdStub = sinon.stub(Users, 'findById').resolves(null);

            try {
                await usersService.updatePassword(userId, currentPassword, newPassword);
                expect.fail('Expected error was not thrown');
            } catch (err) {
                expect(err.message).to.equal('User not found');
            }
            findByIdStub.restore();
        });
    });

    // Additional tests can be added for deleteUserById, updateUserRoleById, etc.
});
