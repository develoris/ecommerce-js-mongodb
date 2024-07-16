import { ObjectId } from 'mongodb';
import { getCollection } from '../DataBase/DbConnection.js';
import errorHandler from '../middleware/errorHandler.js';

export const getAll = async () => {
    try {
        const getAll = await getCollection('Category').find({}).toArray();
        return getAll;
    } catch (error) {
        throw error;
    }
}

export const create = async (dtlBody) => {
    try {
        const categoryExist = await getCollection('Category').findOne({ category: dtlBody.category});
        if (categoryExist) {
            throw new Error('This category already exist')
        }
        const newDtl = await getCollection('Category').insertOne(dtlBody);
        return newDtl;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {string} id 
 * @returns 
 */
export const getById = async (id) => {
    try {
        const _id = new ObjectId(id);

        const getOne = await getCollection('Category').findOne({ _id });
        return getOne;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {string} id 
 * @returns 
 */
export const deleteById= async (id) => {
    try {
        const _id = new ObjectId(id);
        
        const categoryExist = await getCollection('Category').findOne({ _id });
        if (!categoryExist) {
            throw new Error(`This category dosen't exist`)
        }
        const deleteById = await getCollection('Category').deleteOne({_id});
        return deleteById;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {string} id 
 */
export const updateById = async (id, category) => {
    try {
        const _id = new ObjectId(id)
        const categoryExist = await getCollection('Category').findOne({ _id });
        if (!categoryExist) {
            throw new Error(`This category dosen't exist`)
        }
        const updateResult = await getCollection('Category').updateOne({ _id }, { $set: {category} });
        return updateResult;
    } catch (error) {
        throw error;
    }
}