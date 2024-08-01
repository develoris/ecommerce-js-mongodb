import { ObjectId } from 'mongodb';
import * as service from './cart.service.js';
import jwt from 'jsonwebtoken';

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const createCart = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const idUser = "" + decoded.userId;
        const userId = new ObjectId(idUser);

        const newCart = await service.createCart(userId);
        const getCart = await service.getCartById(newCart.insertedId);
        return res.send(getCart);
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
    const cartId = req.params.idCart;
    const productId = req.params.idProduct;

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

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const getAll = async (req, res, next) => {
    try {
        const cart = await service.getAll();
        return res.json(cart);
    } catch (error) {
        next(error);
    }
}

// export const getMe = async (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader.split(' ')[1];
//     try {
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         const idUser = "" + decoded.userId; 
//         const userId = new ObjectId(idUser);

//         const getMe = await service.getCartById(userId)
//         return getMe;
//     } catch (error) {
//         next(error);
//     }
// }

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const getMe = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const idUser = decoded.userId;
        const cart = await service.getMe(idUser);
        if (!cart) {
            return res.status(404).json({ message: 'Carrello non trovato' });
        }
        return res.json(cart);
    } catch (error) {
        next(error);
    }
}