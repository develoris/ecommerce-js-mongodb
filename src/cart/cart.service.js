import { ObjectId } from 'mongodb';
import { getCollection } from '../DataBase/DbConnection.js';
import { getProductById } from '../Prodotti/Product.service.js';

const carrelloCollection = getCollection('Carrello');
const prodottiCollection = getCollection('Prodotti');

/**
 * Create a new empty cart
 * @returns {Promise<any>} The result of the insert operation
 */
export const createCart = async () => {
    const cart = {
        status: 'active',
        dataCreation: new Date(),
        qty: 0,
        totPrice: 0,
        products: []
    };
    try {
        const newCart = await carrelloCollection.insertOne(cart);
        return newCart;
    } catch (error) {
        throw error;
    }
};

/**
 * Update cart by adding a product ID
 * @param {string} cartId - The ID of the cart to update
 * @param {string} productId - The ID of the product to add
 * @returns {Promise<any>} The result of the update operation
 */
export const addProductToCart = async (cartId, productId) => {
    try {
        const cartObjectId = new ObjectId(cartId);
        const productObjectId = new ObjectId(productId);
        
        // Get the product details
        const product = await getProductById(productObjectId);
        if (!product) {
            throw new Error('Prodotto non trovato');
        }

        if (product.qty_stock <= 0) {
            throw new Error('Prodotto non disponibile in stock');
        }
        // Find the cart
        const cart = await carrelloCollection.findOne({ _id: cartObjectId });

        if (!cart) {
            throw new Error('Carrello non trovato');
        }

        // Update the cart
        const updatedCart = await carrelloCollection.updateOne(
            { _id: cartObjectId },
            {
                $push: { products: productObjectId },
                $inc: { qty: 1, totPrice: product.price }
            }
        );

        return updatedCart;
    } catch (error) {
        throw error;
    }
};

/**
 * Get a cart by ID
 * @param {string} id - The ID of the cart
 * @returns {Promise<any>} The cart with the specified ID
 */
export const getCartById = async (id) => {
    try {
        const _id = new ObjectId(id);
        const cart = await carrelloCollection.findOne({ _id });
        return cart;
    } catch (error) {
        throw error;
    }
};

/**
 * Get a cart by ID with product details
 * @param {string} id - The ID of the cart
 * @returns {Promise<any>} The cart with product details
 */
export const getCartByIdWithDetails = async (id) => {
    try {
        const _id = new ObjectId(id);
        const cart = await carrelloCollection.aggregate([
            { $match: { _id } },
            {
                $lookup: {
                    from: 'Prodotti', // The collection to join with
                    localField: 'products', // Field from the input documents
                    foreignField: '_id', // Field from the documents of the "from" collection
                    as: 'productDetails' // Output array field
                }
            }
        ]).toArray();

        return cart[0]; // Assuming you want the first (and only) document in the array
    } catch (error) {
        throw error;
    }
};
