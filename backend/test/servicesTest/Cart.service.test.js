import { expect } from 'chai';
import sinon from 'sinon';
import CartService from '../../src/services/Cart.service.js';
import Cart from '../../src/models/Cart.model.js';
import Product from '../../src/models/Product.model.js';

describe('CartService Unit Tests', () => {
    let cartService;

    before(() => {
        cartService = new CartService();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getCart', () => {
        it('should return user\'s cart', async () => {
            const userId = 'user123';
            const fakeCart = {
                user: userId,
                products: [{ product: 'product123', quantity: 1 }]
            };
            sinon.stub(Cart, 'findOne').returns({
                populate: sinon.stub().returns(fakeCart)
            });

            const result = await cartService.getCart(userId);
            expect(result).to.deep.equal(fakeCart);
        });


    });



    describe('removeFromCart', () => {

        it('should throw an error when product is not found in cart', async () => {
            const userId = 'user123';
            const fakeProduct = {
                _id: 'product123',
                price: 10
            };
            sinon.stub(Product, 'findOne').returns(fakeProduct);

            const fakeCart = {
                user: userId,
                products: [{ product: 'otherProductId', quantity: 1 }],
                save: sinon.stub().resolves()
            };
            sinon.stub(Cart, 'findOne').returns(fakeCart);

            try {
                await cartService.removeFromCart(userId, 'product123');
                throw new Error('Test case should have thrown an error');
            } catch (error) {
                expect(error.message).to.equal('Product not found in cart');
            }
        });
    });

});
