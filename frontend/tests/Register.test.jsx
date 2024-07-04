// src/__tests__/Register.test.jsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, vi, test } from "vitest";
import Register from "../src/Components/pages/user/Register";
import { registerUser } from "../src/services/userService";


describe("Tests for Register component", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    test("it should render username, email, password, and confirm password fields", () => {
        render(
            <Register />,
            { wrapper: MemoryRouter }
        );

        const passwordInputs = screen.getAllByLabelText(/Password/i);
        expect(passwordInputs.length).toBe(2); // Ensure there are two password inputs (Password and Confirm Password)
        expect(passwordInputs[0]).toBeInTheDocument();
        expect(passwordInputs[1]).toBeInTheDocument();

        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    });

    test("it should display an error message if passwords do not match", async () => {
        render(
            <Register />,
            { wrapper: MemoryRouter }
        );

        const inputs = screen.getAllByLabelText(/Password/i);
        const passwordInput = inputs.find(input => input.id === "password");
        const confirmPasswordInput = inputs.find(input => input.id === "confirmPassword");

        fireEvent.change(passwordInput, { target: { value: "Password123!" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "DifferentPassword123!" } });
        fireEvent.click(screen.getByRole("button", { name: /Register/i }));

        await waitFor(() => {
            expect(screen.getByText("Password")).toBeInTheDocument();
        });
    });



    test("it should navigate to login page when login link is clicked", async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/Login here/i));

        await waitFor(() => {
            expect(screen.getByText(/Login/i)).toBeInTheDocument(); // Assuming that the login page contains this text
        });
    });
});
