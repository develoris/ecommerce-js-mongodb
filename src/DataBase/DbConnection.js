import { Db, MongoClient } from 'mongodb';

//const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}.enuharq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&authMechanism=DEFAULT`;
const url = `mongodb://localhost:27017`;
export const client = new MongoClient(url//, { useNewUrlParser: true, useUnifiedTopology: true }
);
//const dbName = `e-commerce_Ivan`;
const dbName = `E-commerce`;
/**
 * @type {Db}
 */
export let clientDb;
export const connectDB = async () => {
    try {
        await client.connect();
        clientDb = client.db(dbName);
        console.log(`Connected successfully to MongoDB`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

export const getCollection = (collectionName) => {
    const db = client.db(dbName);
    return db.collection(collectionName);
};
