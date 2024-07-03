import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000/users';

export const updatePassword = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BASE_URL}/update-password`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return new Error(error.response?.data?.message || 'An error occurred while updating the password.');
    }
};

export const registerUser = async (formData) => {
    // console.log(formData);
    try {
        const response = await axios.post(`${BASE_URL}/register`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        // throw new Error(error.response?.data?.message || error.message);
        return error;
    }
};

export const loginUser = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        // throw new Error(error.response?.data?.message || error.message);
        return error;
    }


};

export const fetchAdminData = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/admin`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching admin data.');
    }
};

export const deleteUser = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`${BASE_URL}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while deleting the user.');
    }
};


export const updateUserRole = async (userId, newRole) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${BASE_URL}/role/${userId}`, { role: newRole }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while updating the user role.');
    }
};