import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import {
    fetchCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} from '../../src/services/cartService';

// Mock axios
vi.mock('axios');

const BASE_URL = 'http://127.0.0.1:3000/cart';

describe('cartService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    describe('fetchCart', () => {
        it('should fetch and transform the cart successfully', async () => {
            // Arrange
            const cartData = {
                products: [
                    {
                        product: {
                            id: '1',
                            title: 'Product 1',
                            description: 'Description 1',
                            category: 'Category 1',
                            image: 'Image 1',
                            price: 100,
                            rating: 4.5,
                        },
                        quantity: 2,
                    },
                ],
            };
            const transformedCart = [
                {
                    id: '1',
                    title: 'Product 1',
                    description: 'Description 1',
                    category: 'Category 1',
                    image: 'Image 1',
                    price: 100,
                    rating: 4.5,
                    amount: 2,
                },
            ];
            axios.get.mockResolvedValue({ data: cartData });
            localStorage.setItem('token', 'test-token');

            // Act
            const result = await fetchCart();

            // Assert
            expect(result).toEqual(transformedCart);
            expect(axios.get).toHaveBeenCalledWith(BASE_URL, {
                headers: {
                    'Authorization': `Bearer test-token`,
                },
            });
        });
    });

    describe('addToCart', () => {
        it('should add a product to the cart successfully', async () => {
            // Arrange
            const product = { id: '1', title: 'Product 1', price: 100 };
            const responseData = { message: 'Product added to cart successfully' };
            axios.post.mockResolvedValue({ data: responseData });
            localStorage.setItem('token', 'test-token');

            // Act
            const result = await addToCart(product);

            // Assert
            expect(result).toEqual(responseData);
            expect(axios.post).toHaveBeenCalledWith(BASE_URL, product, {
                headers: {
                    'Authorization': `Bearer test-token`,
                    'Content-Type': 'application/json',
                },
            });
        });
    });

    describe('updateCartItem', () => {
        it('should update the cart item successfully', async () => {
            // Arrange
            const id = '1';
            const amount = 3;
            const responseData = { message: 'Cart item updated successfully' };
            axios.put.mockResolvedValue({ data: responseData });
            localStorage.setItem('token', 'test-token');

            // Act
            const result = await updateCartItem(id, amount);

            // Assert
            expect(result).toEqual(responseData);
            expect(axios.put).toHaveBeenCalledWith(`${BASE_URL}/${id}`, { amount }, {
                headers: {
                    'Authorization': `Bearer test-token`,
                    'Content-Type': 'application/json',
                },
            });
        });
    });

    describe('removeCartItem', () => {
        it('should remove the cart item successfully', async () => {
            // Arrange
            const productId = { id: '1' };
            const responseData = { message: 'Cart item removed successfully' };
            axios.delete.mockResolvedValue({ data: responseData });
            localStorage.setItem('token', 'test-token');

            // Act
            const result = await removeCartItem(productId);

            // Assert
            expect(result).toEqual(responseData);
            expect(axios.delete).toHaveBeenCalledWith(BASE_URL, {
                headers: {
                    'Authorization': `Bearer test-token`,
                },
                data: productId,
            });
        });

        it('should throw an error if removing the cart item fails', async () => {
            // Arrange
            const productId = { id: '1' };
            const errorMessage = 'Error removing item from cart';
            axios.delete.mockRejectedValue(new Error(errorMessage));
            localStorage.setItem('token', 'test-token');

            // Act & Assert
            await expect(removeCartItem(productId)).rejects.toThrow(errorMessage);
            expect(axios.delete).toHaveBeenCalledWith(BASE_URL, {
                headers: {
                    'Authorization': `Bearer test-token`,
                },
                data: productId,
            });
        });
    });

    describe('clearCart', () => {
        it('should clear the cart successfully', async () => {
            // Arrange
            const responseData = { message: 'Cart cleared successfully' };
            axios.delete.mockResolvedValue({ data: responseData });
            localStorage.setItem('token', 'test-token');

            // Act
            const result = await clearCart();

            // Assert
            expect(result).toEqual(responseData);
            expect(axios.delete).toHaveBeenCalledWith(`${BASE_URL}/all`, {
                headers: {
                    'Authorization': `Bearer test-token`,
                },
            });
        });
    });
});
