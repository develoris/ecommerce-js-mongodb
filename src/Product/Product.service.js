import { ObjectId } from 'mongodb';
import { getCollection } from '../DataBase/DbConnection.js';  

//const getCollection('Product') = getCollection('Product');

/**
 * Return Array Of Products
 * @returns {Promise<any[]>} all products
 */
export const getProduct = async () => {
    try {    
        const products = await getCollection('Product').find({}).toArray();
        return products;
    } catch (error) {
       throw error
    }
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<any>} product by id
 */
export const getProductById = async (id) => {
    try {
        const _id = new ObjectId(id);
        // const product = await getCollection('Product').findOne({ _id });
        const product = await getCollection('Product').findOne({ _id });
        return product;
    } catch (error) {
        throw error;
    }
};

/**
 * 
 * @param {dataObj} dataObj 
 * @returns {Promise<any>} riusltato della create
 */
export const create = async (dataObj) => {
try {
    const newProduct = await getCollection('Product').insertOne(dataObj);
    return newProduct;
} catch (error) {
    throw error;
}
};


/**
 * 
 * @param {DataObj} dataObj 
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
 * @returns {Promise<any>} risultato della delete
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


