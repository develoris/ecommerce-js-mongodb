import { ObjectId } from 'mongodb';
import { getCollection } from '../../DataBase/DbConnection.js';

/**
 * @returns {Promise<any[]>} all products with category and user details replacing the respective fields 
 */
export const getProduct = async () => {
    try {
        const products = await getCollection('Product').aggregate([
            {
                $lookup: {
                    from: 'Category',          
                    localField: 'category',    
                    foreignField: '_id',       
                    as: 'categoryDetails'      
                }
            },
            {
                $lookup: {
                    from: 'User',              // Collection da cui fare la lookup
                    localField: 'userId',      // Campo nella collection 'Product'
                    foreignField: '_id',       // Campo nella collection 'User'
                    as: 'userDetails'          // Nome del campo risultante
                }
            },
            {
                $addFields: {
                    category: { $arrayElemAt: ['$categoryDetails', 0] }, // Sostituisce il campo 'category' con il primo elemento di 'categoryDetails'
                    user: {
                        name: { $arrayElemAt: ['$userDetails.name', 0] },
                        surname: { $arrayElemAt: ['$userDetails.surname', 0] },
                        fullname: {
                            $concat: [
                                { $arrayElemAt: ['$userDetails.name', 0] },
                                ' ',
                                { $arrayElemAt: ['$userDetails.surname', 0] }
                            ]
                        },
                        email: { $arrayElemAt: ['$userDetails.email', 0] }
                    }
                }
            },
            {
                $project: {
                    categoryDetails: 0,
                    userDetails: 0,
                    userId: 0
                }
            }
        ]).toArray();

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
        const product = await getCollection('Product').aggregate([
            {
                $match: { _id } 
            },
            {
                $lookup: {
                    from: 'Category',         
                    localField: 'category',   
                    foreignField: '_id',       
                    as: 'categoryDetails'      
                }
            },
            {
                $lookup: {
                    from: 'User',              
                    localField: 'userId',      
                    foreignField: '_id',       
                    as: 'userDetails'         
                }
            },
            {
                $addFields: {
                    category: { $arrayElemAt: ['$categoryDetails', 0] }, // Sostituisce il campo 'category' con il primo elemento di 'categoryDetails'
                    user: {
                        name: { $arrayElemAt: ['$userDetails.name', 0] },
                        surname: { $arrayElemAt: ['$userDetails.surname', 0] },
                        fullname: { 
                            $concat: [
                                { $arrayElemAt: ['$userDetails.name', 0] },
                                ' ',
                                { $arrayElemAt: ['$userDetails.surname', 0] }
                            ]
                        },
                        email: { $arrayElemAt: ['$userDetails.email', 0] }
                    }
                }
            },
            {
                $project: {
                    categoryDetails: 0,  // Rimuove il campo 'categoryDetails'
                    userDetails: 0,      // Rimuove il campo 'userDetails'
                    userId: 0            // Rimuove il campo 'userId'
                }
            }
        ]).toArray();

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
 * @param {DataObj} DataObj 
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
