import { Db, MongoClient } from 'mongodb';

//const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}.enuharq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&authMechanism=DEFAULT`;
const url = `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?${process.env.MONGO_PARAMS}`;

//const url = process.env.MONGO_URL;
export const client = new MongoClient(url//, { useNewUrlParser: true, useUnifiedTopology: true }
);
//const dbName = `e-commerce_Ivan`;
const dbName = process.env.MONGO_DBNAME;
/**
 * @type {Db}
 */

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

export const getCollection2 = (cName) => client.db(dbName).collection(cName);

