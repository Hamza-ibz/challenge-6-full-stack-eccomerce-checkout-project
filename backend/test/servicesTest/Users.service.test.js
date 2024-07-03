import chai from "chai";
import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UsersService from "../../src/services/Users.service.js";
import Users from "../../src/models/Users.model.js";
import chaiAsPromised from "chai-as-promised";


chai.use(chaiAsPromised); // If using chai-as-promised

describe("UsersService Unit Tests", () => {
    afterEach(() => {
        sinon.restore();
    });

    describe("getUsers", () => {
        it("should return all users", async () => {
            const fakeUsers = [{ name: "User 1" }, { name: "User 2" }];
            sinon.stub(Users, "find").resolves(fakeUsers);

            const usersService = new UsersService();
            const users = await usersService.getUsers();

            expect(users).to.deep.equal(fakeUsers);
        });

        it("should handle errors during getUsers", async () => {
            sinon.stub(Users, "find").rejects(new Error("Database error"));

            const usersService = new UsersService();

            // Using chai-as-promised to assert on rejection
            await expect(usersService.getUsers()).to.be.rejectedWith("Database error");
        });
    });

    describe("updatePassword", () => {
        it("should update the user's password", async () => {
            const userId = "user_id";
            const currentPassword = "current_password";
            const newPassword = "new_password";

            const hashedPassword = await bcrypt.hash(currentPassword, 10);
            const user = { _id: userId, password: hashedPassword, save: sinon.stub().resolves() };

            sinon.stub(Users, "findById").resolves(user);
            sinon.stub(bcrypt, "compare").resolves(true);
            sinon.stub(bcrypt, "hash").resolves("hashed_new_password");

            const usersService = new UsersService();
            await usersService.updatePassword(userId, currentPassword, newPassword);

            expect(user.password).to.equal("hashed_new_password");
            expect(user.save.calledOnce).to.be.true;
        });

        it("should handle errors during updatePassword", async () => {
            sinon.stub(Users, "findById").rejects(new Error("User not found"));

            const usersService = new UsersService();

            // Using chai-as-promised to assert on rejection
            await expect(usersService.updatePassword("non_existing_id", "current_password", "new_password")).to.be.rejectedWith("User not found");
        });
    });

    describe("registerUser", () => {
        it("should register a new user", async () => {
            const newUser = { name: "New User", email: "newuser@example.com", password: "password123" };
            const savedUser = { ...newUser, _id: "generated_id" };

            sinon.stub(bcrypt, "hash").resolves("hashed_password");
            sinon.stub(Users.prototype, "save").resolves(savedUser);

            const usersService = new UsersService();
            const user = await usersService.registerUser(newUser);

            expect(user).to.deep.include(savedUser);
        });

        it("should handle errors during registerUser", async () => {
            sinon.stub(bcrypt, "hash").rejects(new Error("Hashing error"));

            const usersService = new UsersService();

            // Using chai-as-promised to assert on rejection
            await expect(usersService.registerUser({})).to.be.rejectedWith("Hashing error");
        });
    });

    describe("loginUser", () => {
        it("should login a user and return a token", async () => {
            const email = "user@example.com";
            const password = "password123";
            const user = { _id: "user_id", email, password: await bcrypt.hash(password, 10), role: "user" };

            sinon.stub(Users, "findOne").resolves(user);
            sinon.stub(bcrypt, "compare").resolves(true);
            sinon.stub(jwt, "sign").returns("fake_token");

            const usersService = new UsersService();
            const result = await usersService.loginUser(email, password);

            expect(result.token).to.equal("fake_token");
            expect(result.role).to.equal("user");
        });

        it("should handle errors during loginUser", async () => {
            sinon.stub(Users, "findOne").resolves(null);

            const usersService = new UsersService();

            // Using chai-as-promised to assert on rejection
            await expect(usersService.loginUser("non_existing_user@example.com", "password")).to.be.rejectedWith("Invalid credentials for Email");
        });
    });

    describe("deleteUserById", () => {
        it("should delete a user by ID", async () => {
            const userId = "user_id";
            const deletedUser = { _id: userId, name: "Deleted User" };

            sinon.stub(Users, "findOneAndDelete").resolves(deletedUser);

            const usersService = new UsersService();
            const result = await usersService.deleteUserById(userId);

            expect(result).to.deep.equal(deletedUser);
        });

        it("should handle errors during deleteUserById", async () => {
            sinon.stub(Users, "findOneAndDelete").resolves(null);

            const usersService = new UsersService();

            // Using chai-as-promised to assert on rejection
            await expect(usersService.deleteUserById("non_existing_id")).to.be.rejectedWith("User not found");
        });
    });

    describe("updateUserRoleById", () => {
        it("should update the user's role by ID", async () => {
            const userId = "user_id";
            const newRole = "admin";
            const user = { _id: userId, role: "user", save: sinon.stub().resolves() };

            sinon.stub(Users, "findById").resolves(user);

            const usersService = new UsersService();
            await usersService.updateUserRoleById(userId, newRole);

            expect(user.role).to.equal(newRole);
            expect(user.save.calledOnce).to.be.true;
        });

        it("should handle errors during updateUserRoleById", async () => {
            sinon.stub(Users, "findById").rejects(new Error("User not found"));

            const usersService = new UsersService();

            // Using chai-as-promised to assert on rejection
            await expect(usersService.updateUserRoleById("non_existing_id", "admin")).to.be.rejectedWith("User not found");
        });
    });
});
