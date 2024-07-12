import jwt from 'jsonwebtoken';
import { getCollection } from '../DataBase/DbConnection.js';
import { ObjectId } from 'mongodb';


const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Access denied' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const usersCollection = getCollection('User');
        const tokenCollection = getCollection('Token');
        const idUser = decoded.userId
        const userId = new ObjectId(""+idUser);
        const userToken = await tokenCollection.findOne({ userId: userId });
        const user = await usersCollection.findOne({ _id: userId });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        if (userToken.token === token) {
            req.user = decoded;
            next();
        } else {
            res.status(401).send('I token non combaciano');
        }

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export default verifyToken;
