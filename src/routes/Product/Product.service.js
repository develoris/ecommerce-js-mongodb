import { ObjectId } from 'mongodb';
import { getCollection } from '../../DataBase/DbConnection.js';
import { lookup_product, lookup_productById } from './product.lookup.js';

/**
 * @returns {Promise<any[]>} all products with category and user details replacing the respective fields 
 */
export const getProduct = async () => {
    try {
        const products = await getCollection('Product').aggregate(lookup_product).toArray();

        return products;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<any>}
 */
export const getProductById = async (id) => {
    try {
        const _id = new ObjectId(id);
        const product = await getCollection('Product').aggregate(lookup_productById(_id)).toArray();

        return product[0]; // Restituisce il primo elemento dell'array risultante
    } catch (error) {
        throw error;
    }
};


/**
 * 
 * @param {dataObj} dataObj 
 * @returns {Promise<any>}
 */
export const create = async (dataObj) => {
    try {
        dataObj.userId = new ObjectId(dataObj.userId);
        dataObj.category = new ObjectId(dataObj.category);
        const newProduct = await getCollection('Product').insertOne(dataObj);
        return newProduct;
    } catch (error) {
        throw error;
    }
};

/**
 * 
 * @param {dataObj} dataObj 
 * @param {string} id 
 * @returns {Promise<any>} risultato dell'update
 */
export const updateById = async (dataObj, id) => {
    try {
        const _id = new ObjectId(id);
        const updatedProduct = await getCollection('Product').updateOne({ _id }, { $set: dataObj });
        return updatedProduct;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<any>}
 */
export const deleteOne = async (id) => {
    try {
        const _id = new ObjectId(id);
        const deleteResult = await getCollection('Product').deleteOne({ _id });
        return deleteResult;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {string} userId 
 * @returns {Promise<any>}
 */
export const getProductByUserId = async (userId) => {
    try {
        const _id = new ObjectId(userId);
        const products = await getCollection('Product').find({ userId: _id }).toArray();
        return products;
    } catch (error) {
        throw error;
    }
}
