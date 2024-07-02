import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../../services/userService';
import InfoModal from '../../utils/InfoModal';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState({ message: ``, display: false });
    const [successfulRegistration, setSuccessfulRegistration] = useState({ message: ``, display: false });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({ message: '', display: false });

        // Validate password strength
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError({
                message: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.",
                display: true,
            });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError({
                message: "Passwords do not match.",
                display: true,
            });
            return;
        }

        // Set default favouriteLocations
        const userData = {
            // username: formData.username,
            email: formData.email,
            password: formData.password,
            // favouriteLocations: [], // Default location value
        };

        const response = await registerUser(userData);
        if (response instanceof Error) {
            setError({
                message: `Registration failed. ${response.response?.data?.message || response.message || "An unknown error occurred."}`,
                display: true,
            });
        } else {
            setSuccessfulRegistration({
                message: "You have registered successfully",
                display: true,
            });
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            navigate('/login', { state: { successfulRegistration: { message: "You have registered successfully", display: true } } });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xl bg-white rounded-lg shadow-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
                <div className="flex justify-center items-center mb-6">
                    <FontAwesomeIcon icon={faUserPlus} className="text-5xl text-blue-500 mr-4" />
                    {/* <span className="text-3xl font-semibold text-gray-700">Your App Name</span> */}
                </div>
                {error.display && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded" role="alert">{error.message}</div>}
                {successfulRegistration.display && <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 mb-4 rounded" role="alert">{successfulRegistration.message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-gray-700 font-semibold">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Register</button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Nav.Link as={Link} to="/login" className="text-blue-500 hover:underline">Login here</Nav.Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
