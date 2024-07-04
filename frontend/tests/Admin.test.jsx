

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Admin from '../src/Components/pages/user/Admin';
import * as userService from '../src/services/userService';

vi.mock('../src/services/userService');

describe('Admin Component', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'mockToken');
        localStorage.setItem('role', 'admin');
    });

    afterEach(() => {
        localStorage.clear();
        vi.resetAllMocks();
    });

    test('displays access denied modal when user is not admin', async () => {
        localStorage.setItem('role', 'user');
        render(<Admin />, { wrapper: MemoryRouter });

        await waitFor(() => {
            expect(screen.getByText('Access denied. Admins only.')).toBeInTheDocument();
        });
    });
});
