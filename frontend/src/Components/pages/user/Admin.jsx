import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAdminData, deleteUser, updateUserRole } from '../../../services/userService';
import InfoModal from '../../utils/InfoModal';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
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
                setShowModal(true);
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

    const handleUpdateUserRole = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole);
            setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
        } catch (error) {
            console.error('Error updating user role:', error);
            alert('An error occurred while updating the user role.');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/');
    };

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-4xl font-bold text-center mb-8">Admin Page</h1>
            <h2 className="text-3xl font-semibold mb-6">Users List</h2>
            <ul className="space-y-4">
                {users.map(user => (
                    <li key={user._id} className="flex justify-between items-center bg-white p-4 rounded shadow-md">
                        <div className="text-lg font-medium text-gray-700">
                            {user.email} - <span className="font-semibold text-blue-600">{user.role}</span>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleRemoveUser(user._id)}
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                            >
                                Remove
                            </button>
                            <button
                                onClick={() => handleUpdateUserRole(user._id, user.role === 'admin' ? 'user' : 'admin')}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                {user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {showModal && (
                <InfoModal
                    closeModal={closeModal}
                    message="Access denied. Admins only."
                />
            )}
        </div>
    );
};

export default Admin;


// // src/Components/pages/admin/Admin.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchAdminData, deleteUser, updateUserRole } from '../../../services/userService';

// const Admin = () => {
//     const [users, setUsers] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const role = localStorage.getItem('role');

//                 if (!token || role !== 'admin') {
//                     throw new Error('Access denied. Admins only.');
//                 }

//                 const data = await fetchAdminData();
//                 setUsers(data);
//             } catch (error) {
//                 console.error('Error fetching admin data:', error);
//                 alert('Access denied. Admins only.');
//                 navigate('/');
//             }
//         };

//         fetchData();
//     }, [navigate]);

//     const handleRemoveUser = async (userId) => {
//         try {
//             await deleteUser(userId);
//             setUsers(users.filter(user => user._id !== userId));
//         } catch (error) {
//             console.error('Error removing user:', error);
//             alert('An error occurred while removing the user.');
//         }
//     };

//     const handleUpdateUserRole = async (userId, newRole) => {
//         try {
//             await updateUserRole(userId, newRole);
//             setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
//         } catch (error) {
//             console.error('Error updating user role:', error);
//             alert('An error occurred while updating the user role.');
//         }
//     };

//     return (
//         <div className="min-h-screen p-8 bg-gray-100">
//             <h1 className="text-4xl font-bold text-center mb-8">Admin Page</h1>
//             <h2 className="text-3xl font-semibold mb-6">Users List</h2>
//             <ul className="space-y-4">
//                 {users.map(user => (
//                     <li key={user._id} className="flex justify-between items-center bg-white p-4 rounded shadow-md">
//                         <div className="text-lg font-medium text-gray-700">
//                             {user.email} - <span className="font-semibold text-blue-600">{user.role}</span>
//                         </div>
//                         <div className="flex space-x-2">
//                             <button
//                                 onClick={() => handleRemoveUser(user._id)}
//                                 className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
//                             >
//                                 Remove
//                             </button>
//                             <button
//                                 onClick={() => handleUpdateUserRole(user._id, user.role === 'admin' ? 'user' : 'admin')}
//                                 className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//                             >
//                                 {user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
//                             </button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Admin;
