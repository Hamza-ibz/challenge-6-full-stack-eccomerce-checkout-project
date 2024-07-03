import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/userService';
import { useLocation } from 'react-router-dom';
import InfoModal from '../../utils/InfoModal';

const Login = ({ setLoggedIn }) => {
    const location = useLocation();
    const { successfulRegistration } = location.state || { successfulRegistration: { message: '', display: false } };
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState({ message: ``, display: false });
    const [loggedIn, setLoggedInState] = useState(false);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
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

        const response = await loginUser(formData);
        if (response instanceof Error) {
            setError({
                message: "Login Failed. " + (response.response?.data?.message || response.message || "An unknown error occurred."),
                display: true,
            });
        } else {
            localStorage.setItem('token', response.token); // Store the token in local storage
            setLoggedIn(true);
            setLoggedInState(true);
            setShowModal(true); // Show modal on successful login
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xl bg-white rounded-lg shadow-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                <div className="flex justify-center items-center mb-6">
                    <FontAwesomeIcon icon={faUser} className="text-5xl text-blue-500 mr-4" />
                </div>
                {error.display && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded" role="alert">{error.message}</div>}
                {successfulRegistration.display && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mb-4 rounded" role="alert">{successfulRegistration.message}</div>}
                {showModal && (
                    <InfoModal
                        closeModal={closeModal}
                        message={"User has Logged in successfully."}
                    />
                )}
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <Nav.Link as={Link} to="/register" className="text-blue-500 hover:underline">Register here</Nav.Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
