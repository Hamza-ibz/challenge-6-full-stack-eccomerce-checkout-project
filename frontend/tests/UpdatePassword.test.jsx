import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import UpdatePassword from '../src/Components/pages/user/UpdatePassword';
import { updatePassword } from '../src/services/userService';

// Mock the updatePassword service
vi.mock('../src/services/userService');

describe('UpdatePassword Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders UpdatePassword component correctly', () => {
        // Arrange: Render the component
        render(<UpdatePassword />);

        // Assert: Check if all elements are rendered correctly
        expect(screen.getByRole('heading', { name: /Update Password/i })).toBeInTheDocument();
        expect(screen.getByLabelText('Current Password')).toBeInTheDocument();
        expect(screen.getByLabelText('New Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
    });

    test('displays error message when passwords do not match', async () => {
        // Arrange: Render the component
        render(<UpdatePassword />);

        // Act: Fill the form with mismatched passwords and submit
        fireEvent.change(screen.getByLabelText('Current Password'), { target: { value: 'currentPassword123' } });
        fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'NewPassword123!' } });
        fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'DifferentPassword123!' } });
        fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

        // Assert: Check if the error message is displayed
        await waitFor(() => {
            expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
        });
    });

    test('displays error message when password does not meet criteria', async () => {
        // Arrange: Render the component
        render(<UpdatePassword />);

        // Act: Fill the form with a short password and submit
        fireEvent.change(screen.getByLabelText('Current Password'), { target: { value: 'currentPassword123' } });
        fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'short' } });
        fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'short' } });
        fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

        // Assert: Check if the error message is displayed
        await waitFor(() => {
            expect(screen.getByText(/Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character/i)).toBeInTheDocument();
        });
    });

    test('displays success message when password is updated successfully', async () => {
        // Arrange: Mock the service response and render the component
        updatePassword.mockResolvedValueOnce({});
        render(<UpdatePassword />);

        // Act: Fill the form with valid passwords and submit
        fireEvent.change(screen.getByLabelText('Current Password'), { target: { value: 'currentPassword123' } });
        fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'NewPassword123!' } });
        fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'NewPassword123!' } });
        fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));

        // Assert: Check if the success message is displayed
        await waitFor(() => {
            expect(screen.getByText(/Password updated successfully!/i)).toBeInTheDocument();
        });
    });


});
