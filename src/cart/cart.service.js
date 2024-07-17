import { ObjectId } from 'mongodb';
import { getCollection } from '../DataBase/DbConnection.js';

/**
 * 
 * @param {string} id 
 * @returns {Promise<any>}
 */
export const createCart = async (id) => {
    const cart = {
        idUtente: id,
        status: 'active',
        dataCreation: new Date(),
        qty: 0,
        totPrice: 0,
        products: []
    };
    try {
        const newCart = await getCollection('Cart').insertOne(cart);
        return newCart;
    } catch (error) {
        throw error;
    }
};

/**
 * 
 * @param {string} cartId 
 * @param {string} productId 
 * @returns {Promise<any>}
 */
export const addProductToCart = async (cartId, productId) => {
    try {
        const cartObjectId = new ObjectId(cartId);
        const productObjectId = new ObjectId(productId);
        const product = await getCollection('Product').findOne({ _id: productObjectId });

        if (!product) {
            throw new Error('Prodotto non trovato');
        }

        if (product.qty_stock <= 0) {
            throw new Error('Prodotto non disponibile in stock');
        }

        const updatedCart = await getCollection('Cart').updateOne(
            { _id: cartObjectId },
            {
                $push: { products: productObjectId },
                $inc: { qty: 1, totPrice: product.price }
            }
        );

        await getCollection('Product').updateOne(
            { _id: productObjectId },
            { $inc: { qty_stock: -1 } }
        );

        return updatedCart;
    } catch (error) {
        throw error;
    }
};

/**
 * @param {string} id 
 * @returns {Promise<any>}
 */
export const getCartById = async (id) => {
    try {
        const _id = new ObjectId(id);
        const cart = await getCollection('Cart').findOne({ _id });
        return cart;
    } catch (error) {
        throw error;
    }
};

/**
 * 
 * @param {string} id 
 * @returns {Promise<any>}
 */
export const getCartByIdWithDetails = async (id) => {
    try {
        const _id = new ObjectId(id);
        const cart = await getCollection('Cart').aggregate([
            { $match: { _id } },
            {
                $lookup: {
                    from: 'Product',
                    localField: 'products',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            }
        ]).toArray();

        return cart[0];
    } catch (error) {
        throw error;
    }
};

/**
 * 
 * @returns {Promise<any[]>}
 */
export const getAll = async () => {
    try {
        const cart = await getCollection('Cart').find({}).toArray()
        return cart;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<any>}
 */
export const getMe = async (id) => {
    try {
        const idUtente = new ObjectId(id);
        const users = await getCollection('Cart').findOne({ idUtente });
        const cart = await getCollection('Cart').aggregate([
            { $match: { idUtente } },
            {
                $lookup: {
                    from: 'Product',
                    localField: 'products',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            }
        ]).toArray();

        return cart[0];
    } catch (error) {
        throw error;
    }
};
