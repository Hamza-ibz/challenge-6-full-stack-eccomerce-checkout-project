
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, vi, test } from "vitest";
import Login from "../src/Components/pages/user/Login.jsx";
import { loginUser } from "../src/services/userService.js";

vi.mock("../src/services/userService.js");

describe("Tests for Login component", () => {
    const mockSetLoggedIn = vi.fn();

    beforeEach(() => {
        localStorage.clear();
        mockSetLoggedIn.mockClear();
        vi.clearAllMocks();
    });

    test("it should render email and password fields", () => {
        render(
            <Login setLoggedIn={mockSetLoggedIn} />,
            { wrapper: MemoryRouter }
        );

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });

    test("it should render the success message if registration is successful", () => {
        const successfulRegistration = { message: "You have registered successfully", display: true };

        render(
            <MemoryRouter initialEntries={[{ state: { successfulRegistration } }]}>
                <Login setLoggedIn={mockSetLoggedIn} />
            </MemoryRouter>
        );

        expect(screen.getByText(successfulRegistration.message)).toBeInTheDocument();
    });

    test("it should log in the user and display the success modal on successful login", async () => {
        const token = "testToken";
        loginUser.mockResolvedValueOnce({ token, role: "user" });

        render(
            <MemoryRouter>
                <Login setLoggedIn={mockSetLoggedIn} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password" } });
        fireEvent.click(screen.getByRole("button", { name: /Login/i }));

        await waitFor(() => {
            expect(localStorage.getItem("token")).toBe(token);
            expect(localStorage.getItem("role")).toBe("user");
            expect(mockSetLoggedIn).toHaveBeenCalledWith(true);
            expect(screen.getByText("User has Logged in successfully.")).toBeInTheDocument();
        });
    });

    test("it should display an error message on login failure", async () => {
        const errorMessage = "Invalid credentials";
        loginUser.mockResolvedValueOnce(new Error(errorMessage));

        render(
            <MemoryRouter>
                <Login setLoggedIn={mockSetLoggedIn} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "wrongpassword" } });
        fireEvent.click(screen.getByRole("button", { name: /Login/i }));

        await waitFor(() => {
            expect(screen.getByText(`Login Failed. ${errorMessage}`)).toBeInTheDocument();
        });
    });

    test("it should navigate to register page when register link is clicked", async () => {
        render(
            <MemoryRouter>
                <Login setLoggedIn={mockSetLoggedIn} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/Register here/i));

        await waitFor(() => {
            expect(screen.getByText(/Register/i)).toBeInTheDocument();
        });
    });
});
