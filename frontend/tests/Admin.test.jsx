import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Admin from '../src/Components/pages/user/Admin';
import * as userService from '../src/services/userService';
import InfoModal from '../src/Components/utils/InfoModal';

jest.mock('../src/services/userService');
jest.mock('./src/Components/utils/InfoModal');

describe('Admin Component', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'fake-token');
        localStorage.setItem('role', 'admin');
    });

    afterEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('fetches and displays users on mount', async () => {
        const mockUsers = [
            { _id: '1', email: 'user1@example.com', role: 'user' },
            { _id: '2', email: 'user2@example.com', role: 'admin' },
        ];

        userService.fetchAdminData.mockResolvedValueOnce(mockUsers);

        render(
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('user1@example.com - user')).toBeInTheDocument();
            expect(screen.getByText('user2@example.com - admin')).toBeInTheDocument();
        });
    });

    test('shows access denied modal if user is not an admin', async () => {
        localStorage.setItem('role', 'user');

        render(
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Access denied. Admins only.')).toBeInTheDocument();
        });
    });

    test('removes a user when remove button is clicked', async () => {
        const mockUsers = [
            { _id: '1', email: 'user1@example.com', role: 'user' },
            { _id: '2', email: 'user2@example.com', role: 'admin' },
        ];

        userService.fetchAdminData.mockResolvedValueOnce(mockUsers);
        userService.deleteUser.mockResolvedValueOnce();

        render(
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('user1@example.com - user')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Remove', { selector: 'button' }));

        await waitFor(() => {
            expect(userService.deleteUser).toHaveBeenCalledWith('1');
            expect(screen.queryByText('user1@example.com - user')).not.toBeInTheDocument();
        });
    });

    test('updates user role when role button is clicked', async () => {
        const mockUsers = [
            { _id: '1', email: 'user1@example.com', role: 'user' },
            { _id: '2', email: 'user2@example.com', role: 'admin' },
        ];

        userService.fetchAdminData.mockResolvedValueOnce(mockUsers);
        userService.updateUserRole.mockResolvedValueOnce();

        render(
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('user1@example.com - user')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Promote to Admin', { selector: 'button' }));

        await waitFor(() => {
            expect(userService.updateUserRole).toHaveBeenCalledWith('1', 'admin');
            expect(screen.getByText('user1@example.com - admin')).toBeInTheDocument();
        });
    });

    test('handles errors while removing user', async () => {
        const mockUsers = [
            { _id: '1', email: 'user1@example.com', role: 'user' },
            { _id: '2', email: 'user2@example.com', role: 'admin' },
        ];

        userService.fetchAdminData.mockResolvedValueOnce(mockUsers);
        userService.deleteUser.mockRejectedValueOnce(new Error('Failed to delete user'));

        render(
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('user1@example.com - user')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Remove', { selector: 'button' }));

        await waitFor(() => {
            expect(userService.deleteUser).toHaveBeenCalledWith('1');
            expect(screen.getByText('An error occurred while removing the user.')).toBeInTheDocument();
        });
    });

    test('handles errors while updating user role', async () => {
        const mockUsers = [
            { _id: '1', email: 'user1@example.com', role: 'user' },
            { _id: '2', email: 'user2@example.com', role: 'admin' },
        ];

        userService.fetchAdminData.mockResolvedValueOnce(mockUsers);
        userService.updateUserRole.mockRejectedValueOnce(new Error('Failed to update user role'));

        render(
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('user1@example.com - user')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Promote to Admin', { selector: 'button' }));

        await waitFor(() => {
            expect(userService.updateUserRole).toHaveBeenCalledWith('1', 'admin');
            expect(screen.getByText('An error occurred while updating the user role.')).toBeInTheDocument();
        });
    });
});
