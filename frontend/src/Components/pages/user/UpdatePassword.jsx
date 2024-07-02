import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { updatePassword } from '../../../services/userService';

const UpdatePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState({ message: '', display: false });
    const [message, setMessage] = useState({ content: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({
            message: '',
            display: false,
        });

        // Validate password strength
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(formData.newPassword)) {
            setError({
                message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.',
                display: true,
            });
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError({
                message: 'Passwords do not match.',
                display: true,
            });
            return;
        }

        const response = await updatePassword(formData);
        if (response instanceof Error) {
            setMessage({ content: 'Failed to update password. ' + response.message + ' Please try again.', type: 'error' });
        } else {
            setMessage({ content: 'Password updated successfully!', type: 'success' });
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Update Password</h2>
                <div className="flex justify-center mb-4">
                    <FontAwesomeIcon icon={faKey} className="text-gray-500 text-2xl" />
                </div>
                {error.display && (
                    <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">
                        {error.message}
                    </div>
                )}
                {message.content && (
                    <div className={`p-2 mb-4 rounded ${message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {message.content}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="currentPassword" className="block text-gray-700 mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            id="currentPassword"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="block text-gray-700 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
