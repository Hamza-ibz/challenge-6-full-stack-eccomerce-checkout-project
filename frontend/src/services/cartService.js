import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000/cart';

export const fetchCart = async () => {
    const response = await axios.get(BASE_URL, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const addToCart = async (product) => {
    const response = await axios.post(BASE_URL, product, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const updateCartItem = async (id, amount) => {
    const response = await axios.put(`${BASE_URL}/${id}`, { amount }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const removeCartItem = async (productId) => {

    try {
        const response = await axios.delete(BASE_URL, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            data: productId
        });
        return response.data;
    } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
    }
};

export const clearCart = async () => {
    const response = await axios.delete(`${BASE_URL}/all`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};
