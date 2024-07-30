import { ObjectId } from 'mongodb';
import { getCollection } from '../../DataBase/DbConnection.js';
import { lookup_product, lookup_productById, lookup_productByUserId } from './product.lookup.js';

/**
 * 
 * @param {queryObj} queryParams 
 * @returns 
 */
export const getProduct = async (queryParams) => {
    try {
        const { page, limit , sort = 'name', order = 'asc', minPrice, maxPrice, ...fieldsFilter} = queryParams;

        const skip = (page - 1) * limit;
        
        const filter = {...fieldsFilter};
        if (minPrice) filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
        if (maxPrice) filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };

        for (const [key, value] of Object.entries(fieldsFilter)) {
            if (Array.isArray(value)) {
                filter[key] = { $in: value };
            } else if (typeof value === 'string' && value.includes(',')) {
                filter[key] = { $in: value.split(',') };
            } else if (typeof value === 'string') {
                // Utilizza $regex per la ricerca parziale
                filter[key] = { $regex: value, $options: 'i' }; // 'i' per case-insensitive
            } else {
                filter[key] = value;
            }
        }
        
        const pipeline = [
            { $match: filter },
            ...lookup_product,
            { $skip: skip },
            { $limit: +limit },
            { $sort: { [sort]: order === 'asc' ? 1 : -1 } }
        ];

        const products = await getCollection('Product')
            .aggregate(pipeline)
            .toArray();

        // Conta il numero totale di documenti
        const totalProducts = await getCollection('Product').countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        // Costruisce i percorsi per i link
        const buildPath = (page) => `/products?sort=${sort}&order=${order}&limit=${limit}&page=${page}`;
        
        return {
            pages: totalPages,
            products: products.map(p => {delete p.userId; return p}),
            first: buildPath(1),
            previous: page > 1 ? buildPath(page - 1) : null,
            next: page < totalPages ? buildPath(page + 1) : null
        };
    } catch (error) {
        console.error('Error in getProduct:', error); // Add detailed error logging
        throw error;
    }
};

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
        
        const products = await getCollection('Product').aggregate(lookup_productByUserId(_id)).toArray();
        return products;
    } catch (error) {
        throw error;
    }
}
