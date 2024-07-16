import * as service from './Product.service.js';
import jwt from 'jsonwebtoken';

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const getAll = async (req, res, next) => {
    try {
        const products = await service.getProduct();
        return res.json(products);
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
export const getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const product = await service.getProductById(id);
        return res.json(product);
    } catch (error) {
        next(error);
    }
};
/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const create = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const idUser = decoded.userId;

    const data = {
        ...req.body,
        userId: idUser, 
        price: parseFloat(req.body.price)
    }
    try {
        const newProduct = await service.create(data);
        const getProduct = await service.getProductById(newProduct.insertedId)
        return res.send({ message: 'Prodotto inserito', getProduct })
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
export const update = async (req, res, next) => {
    const id = req.params.id;
    const data = {
        ...req.body,
        price: parseFloat(req.body.price)
    };
    try {
        await service.updateById(data, id)
        const getProduct = await service.getProductById(id);
        return res.send({ message: 'Aggiornamento completato', product: getProduct });
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
export const deleteOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        await service.deleteOne(id)
        return res.send('Prodotto eliminato con successo');
    } catch (error) {
        next(error);
    }
}
