import { ObjectId } from 'mongodb';
import { getCollection } from '../../DataBase/DbConnection.js';

/**
 * @returns {Promise<any[]>}
 */
export const getAll = async () => {
    try {
        const getAll = await getCollection('Category').find({}).toArray();
        return getAll;
    } catch (error) {
        throw error;
    }
}

/**
 * @param {string} category 
 * @returns {Promise<any>}
 */
export const create = async (category) => {
    try {
        const categoryExist = await getCollection('Category').findOne({ category });
        if (categoryExist) {
            throw new Error('This category already exist')
        }
        const newCategory = { category }; // Creazione dell'oggetto documento con il campo category
        const newDtl = await getCollection('Category').insertOne(newCategory);
        return newDtl;
    } catch (error) {
        throw error;
    }
}

/**
 * @param {string} id 
 * @returns {Promise<any>}
 */
export const getById = async (id) => {

    const _id = new ObjectId(id);
    try {
        const getOne = await getCollection('Category').findOne({ _id });
        return getOne;
    } catch (error) {
        throw error;
    }
}

/**
 * @param {string} id 
 * @returns {Promise<any>}
 */
export const deleteById = async (id) => {
    try {
        const _id = new ObjectId(id);

        const categoryExist = await getCollection('Category').findOne({ _id });
        if (!categoryExist) {
            throw new Error(`This category dosen't exist`)
        }
        const deleteById = await getCollection('Category').deleteOne({ _id });
        return deleteById;
    } catch (error) {
        throw error;
    }
}

/** 
 * @param {string} id 
 * @param {string} category 
 * @returns {Promise<any>}
 */
export const updateById = async (id, category) => {
    try {
        const _id = new ObjectId(id)
        const categoryExist = await getCollection('Category').findOne({ _id });
        if (!categoryExist) {
            throw new Error(`This category dosen't exist`)
        }
        const updateResult = await getCollection('Category').updateOne({ _id }, { $set: { category } });
        return updateResult;
    } catch (error) {
        throw error;
    }
}