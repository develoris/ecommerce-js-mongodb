import { ObjectId } from 'mongodb';
import { getCollection, client, clientDb } from '../DataBase/DbConnection.js';
import { getProductById } from '../Prodotti/Product.service.js';

const cartCollection = getCollection('Carrello');
const productCollection = getCollection('Prodotti');

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
        const newCart = await getCollection('Carrello').insertOne(cart);
        return newCart;
    } catch (error) {
        throw error;
    }
};

/**
 * Update cart by adding a product ID
 * @param {string} cartId - The ID of the cart to update
 * @param {string} productId - The ID of the product to add
 * @param {Object} options - Transaction options
 * @returns {Promise<any>} The result of the update operation
 */
export const addProductToCart = async (cartId, productId) => {
    const session = client.startSession();
    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' }
    };

    try {
            // const productColl = session.
        await session.withTransaction(async (session) => {
            const cartObjectId = new ObjectId(cartId);
            const productObjectId = new ObjectId(productId);
            // const product = await getProductById(productObjectId, { session });
            const product = await client.db('E-commerce').collection('Prodotti').findOne({ _id: productObjectId }, {session})
            if (!product) {
                throw new Error('Prodotto non trovato');
            }

            if (product.qty_stock <= 0) {
                throw new Error('Prodotto non disponibile in stock');
            }

            const updatedCart =  await clientDb.collection('Carrello').updateOne(
                { _id: cartObjectId },
                {
                    $push: { products: productObjectId },
                    $inc: { qty: 1, totPrice: product.price }
                },
                { session }
            );

            // Decrease the product stock quantity
            await getCollection('Prodotti').updateOne(
                { _id: productObjectId },
                { $inc: { qty_stock: -1 } },
                { session }
            );

            return updatedCart;
        }, transactionOptions);
    } catch (error) {
        throw error;
    } finally {
        await session.endSession();
        // await client.close();
    }

    // let txnRes = await client.withSession(async (session) =>
    //    await session.withTransaction(async (session) => {
    //     const productObjectId = new ObjectId(productId);
    //     const product = await getProductById(productObjectId, { session });
    //     console.log(product);
    //     //   const savingsColl = client.db("bank").collection("savings_accounts");
    //     //   await savingsColl.findOneAndUpdate(
    //     //     {account_id: "9876"}, 
    //     //     {$inc: {amount: -100 }}, 
    //     //     { session });
      
    //     //   const checkingColl = client.db("bank").collection("checking_accounts");
    //     //   await checkingColl.findOneAndUpdate(
    //     //     {account_id: "9876"}, 
    //     //     {$inc: {amount: 100 }}, 
    //     //     { session });
    //     //   // ... perform other operations
    //     //   return "Transaction committed.";
    //     }, null)
    //   );
    //   console.log(txnRes);
};

/**
 * Get a cart by ID
 * @param {string} id - The ID of the cart
 * @returns {Promise<any>} The cart with the specified ID
 */
export const getCartById = async (id) => {
    try {
        const _id = new ObjectId(id);
        const cart = await getCollection('Carrello').findOne({ _id });
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
        const cart = await getCollection('Carrello').aggregate([
            { $match: { _id } },
            {
                $lookup: {
                    from: 'Prodotti',
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
