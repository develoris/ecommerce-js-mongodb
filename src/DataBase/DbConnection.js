import { MongoClient } from 'mongodb';

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}.enuharq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&authMechanism=DEFAULT`;
const client = new MongoClient(url);
const dbName = `e-commerce_Ivan`;

export const connectDB = async () => {
    try {
        await client.connect();
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
