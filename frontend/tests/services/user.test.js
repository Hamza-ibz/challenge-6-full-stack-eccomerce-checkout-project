import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import {
    updatePassword,
    registerUser,
    loginUser,
    fetchAdminData,
    deleteUser,
    updateUserRole
} from '../../src/services/userService';

// Mock axios
vi.mock('axios');

const BASE_URL = 'http://127.0.0.1:3000/users';

describe('userService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    describe('updatePassword', () => {
        it('should update the password successfully', async () => {
            // Arrange
            const formData = { password: 'newPassword' };
            const responseData = { message: 'Password updated successfully' };
            axios.post.mockResolvedValue({ data: responseData });
            localStorage.setItem('token', 'test-token');

            // Act
            const result = await updatePassword(formData);

            // Assert
            expect(result).toEqual(responseData);
            expect(axios.post).toHaveBeenCalledWith(
                `${BASE_URL}/update-password`,
                formData,
                { headers: { 'Authorization': `Bearer test-token` } }
            );
        });

        it('should return an error when update fails', async () => {
            // Arrange
            const formData = { password: 'newPassword' };
            const errorMessage = 'An error occurred while updating the password';
            axios.post.mockRejectedValue({ response: { data: { message: errorMessage } } });
            localStorage.setItem('token', 'test-token');

            // Act
            const result = await updatePassword(formData);

            // Assert
            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe(errorMessage);
        });
    });

    describe('registerUser', () => {
        it('should register the user successfully', async () => {
            // Arrange
            const formData = { username: 'testuser', password: 'testpassword' };
            const responseData = { message: 'User registered successfully' };
            axios.post.mockResolvedValue({ data: responseData });

            // Act
            const result = await registerUser(formData);

            // Assert
            expect(result).toEqual(responseData);
            expect(axios.post).toHaveBeenCalledWith(
                `${BASE_URL}/register`,
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
        });


    });

    describe('loginUser', () => {
        it('should login the user successfully', async () => {
            // Arrange
            const formData = { username: 'testuser', password: 'testpassword' };
            const responseData = { token: 'test-token' };
            axios.post.mockResolvedValue({ data: responseData });

            // Act
            const result = await loginUser(formData);

            // Assert
            expect(result).toEqual(responseData);
            expect(axios.post).toHaveBeenCalledWith(
                `${BASE_URL}/login`,
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
        });


    });

    describe('fetchAdminData', () => {
        it('should fetch admin data successfully', async () => {
            // Arrange
            const responseData = { data: 'admin data' };
            axios.get.mockResolvedValue({ data: responseData });
            localStorage.setItem('token', 'test-token');

            // Act
            const result = await fetchAdminData();

            // Assert
            expect(result).toEqual(responseData);
            expect(axios.get).toHaveBeenCalledWith(
                `${BASE_URL}/admin`,
                { headers: { 'Authorization': `Bearer test-token` } }
            );
        });

        it('should return an error when fetching admin data fails', async () => {
            // Arrange
            const errorMessage = 'Fetching admin data failed';
            axios.get.mockRejectedValue({ response: { data: { message: errorMessage } } });
            localStorage.setItem('token', 'test-token');

            // Act
            await expect(fetchAdminData()).rejects.toThrow(errorMessage);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user successfully', async () => {
            // Arrange
            const userId = 1;
            axios.delete.mockResolvedValue();
            localStorage.setItem('token', 'test-token');

            // Act
            await deleteUser(userId);

            // Assert
            expect(axios.delete).toHaveBeenCalledWith(
                `${BASE_URL}/${userId}`,
                { headers: { 'Authorization': `Bearer test-token` } }
            );
        });

        it('should return an error when deleting a user fails', async () => {
            // Arrange
            const userId = 1;
            const errorMessage = 'An error occurred while deleting the user';
            axios.delete.mockRejectedValue({ response: { data: { message: errorMessage } } });
            localStorage.setItem('token', 'test-token');

            // Act
            await expect(deleteUser(userId)).rejects.toThrow(errorMessage);
        });
    });

    describe('updateUserRole', () => {
        it('should update the user role successfully', async () => {
            // Arrange
            const userId = 1;
            const newRole = 'admin';
            const responseData = { message: 'User role updated successfully' };
            axios.put.mockResolvedValue({ data: responseData });
            localStorage.setItem('token', 'test-token');

            // Act
            const result = await updateUserRole(userId, newRole);

            // Assert
            expect(result).toEqual(responseData);
            expect(axios.put).toHaveBeenCalledWith(
                `${BASE_URL}/role/${userId}`,
                { role: newRole },
                { headers: { 'Authorization': `Bearer test-token` } }
            );
        });

        it('should return an error when updating user role fails', async () => {
            // Arrange
            const userId = 1;
            const newRole = 'admin';
            const errorMessage = 'An error occurred while updating the user role';
            axios.put.mockRejectedValue({ response: { data: { message: errorMessage } } });
            localStorage.setItem('token', 'test-token');

            // Act
            await expect(updateUserRole(userId, newRole)).rejects.toThrow(errorMessage);
        });
    });
});
