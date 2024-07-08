import * as service from './cart.service.js';

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const createCart = async (req, res, next) => {
    try {
        const newCart = await service.createCart();
        const getCart = await service.getCartById(newCart.insertedId);
        return res.send({ message: 'Carrello creato', cart: getCart });
    } catch (error) {
        next(error);
    }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const addProductToCart = async (req, res, next) => {
    const cartId = req.params.id;
    const productId = req.body.productId;

    try {
        await service.addProductToCart(cartId, productId);
        const getCart = await service.getCartByIdWithDetails(cartId);
        return res.send({ message: 'Prodotto aggiunto al carrello', cart: getCart });
    } catch (error) {
        next(error);
    }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const getCartWithDetails = async (req, res, next) => {
    const id = req.params.id;

    try {
        const cart = await service.getCartByIdWithDetails(id);
        if (!cart) {
            return res.status(404).json({ message: 'Carrello non trovato' });
        }
        return res.json(cart);
    } catch (error) {
        next(error);
    }
}
