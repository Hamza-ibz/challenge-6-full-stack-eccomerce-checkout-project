// src/Components/pages/admin/Admin.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAdminData, deleteUser } from '../../../services/userService';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const role = localStorage.getItem('role');

                if (!token || role !== 'admin') {
                    throw new Error('Access denied. Admins only.');
                }

                const data = await fetchAdminData();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching admin data:', error);
                alert('Access denied. Admins only.');
                navigate('/');
            }
        };

        fetchData();
    }, [navigate]);

    const handleRemoveUser = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error removing user:', error);
            alert('An error occurred while removing the user.');
        }
    };

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Admin Page</h1>
            <h2 className="text-2xl font-semibold mb-4">Users List</h2>
            <ul className="list-disc pl-8">
                {users.map(user => (
                    <li key={user._id} className="mb-2 flex justify-between items-center">
                        <div>
                            {user.email} - {user.role}
                        </div>
                        <button
                            // onClick={() => handleRemoveUser(user._id)}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
