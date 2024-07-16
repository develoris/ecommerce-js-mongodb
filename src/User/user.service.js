import { ObjectId } from 'mongodb';
import { getCollection } from '../DataBase/DbConnection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (bodyObj) => {
    try {
        const hashPassword = await bcrypt.hash(bodyObj.password, 10);
        const data = {
            ...bodyObj,
            password: hashPassword
        };
        const emailExist = await getCollection('User').findOne({ email: bodyObj.email })
         if (emailExist) {
             throw new Error (`This user already exist`)
         }
        const newUser = await getCollection('User').insertOne(data);
        return newUser;
    } catch (error) {
        throw error;
    }
}

export const getAllUser = async () => {
    try {
        const getAll = await getCollection('User').find().toArray();
        return getAll;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<any>} product by id
 */
export const getUserById = async (id) => {
    try {
        const _id = new ObjectId(id);
        const user = await getCollection('User').findOne({ _id });
        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * 
 * @param {string} id 
 * @returns {Promise<any>} product by id
 */
export const updateUser = async (id, dataObj) => {
    const _id = new ObjectId(id);
    try {
        const hashPassword = await bcrypt.hash(dataObj.password, 10);
        const data = {
            ...dataObj,
            password: hashPassword
        };
        const updateUser = await getCollection('User').updateOne({ _id }, { $set: data });
        return updateUser;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<any>} product by id
 */
export const deleteUser = async (id) => {
    const _id = new ObjectId(id);
    try {
        const deleteUser = await getCollection('User').deleteOne({ _id });
        return deleteUser;
    } catch (error) {
        throw error;
    }
}

export const login = async (email, password) => {
    try {
        const user = await getCollection('User').findOne({ email: email });
        if (!user) {
            return { status: 401, message: 'The email is wrong' };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'The password is wrong' });
        }

        const tokenPayload = { userId: user._id, email: user.email, fullName: `${user.name} ${user.surname}` };
        const expInSecTok = +process.env.TOKEN_TIME_SECOND;
        const expInSecRefTok = +process.env.REFRESH_TOKEN_TIME_SECOND;

        const tokenExist = await getCollection('Token').findOne({  userId: user._id });
        if (tokenExist) {
            await getCollection('Token').deleteOne({  userId: user._id });
        } 

        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
            expiresIn: expInSecTok
        })
        const refreshToken = jwt.sign({ userId: user._id, email: user.email, fullName: `${user.name} ${user.surname}` }, process.env.SECRET_KEY, { 
            expiresIn: expInSecRefTok
        });

        await getCollection('Token').insertOne({
            userId: user._id,
            token,
            refreshToken,
            expInSecTok
        })

        return { token, refreshToken, expiresIn: expInSecTok, type: 'Bearer' }
    } catch (error) {
        throw error;
    }
}


/**
 * 
 * @param {string} id 
 */
export const getMe = async (id) => {
    try {
        const _id = new ObjectId (id)

        const userMe = await getCollection('User').findOne({_id})
        return userMe;
    } catch (error) {
        throw error;
    }
}

export const refreshToken = async (refreshTk) => {
    try {
        const decoded = jwt.verify(refreshTk, process.env.SECRET_KEY);
        const tokenPayload = { userId: decoded.userId, email: decoded.email, fullName: decoded.fullName };
        const accessToken = jwt.sign(tokenPayload, process.env.SECRET_KEY, { 
            expiresIn: process.env.TOKEN_TIME_SECOND
        });
        return accessToken;
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
}

/**
 * 
 * @param {string} id_user 
 * @returns 
 */
export const logoutUser = async (id_user) => {
    try {
        const _id = new ObjectId (id_user)
        const result = await getCollection('Token').deleteOne({userId: _id});
        if (result.deletedCount >= 1) {
            return true;
        } else {
            throw new Error('No tokens found for the given user');
        }
    } catch (error) {
        throw error;
    }
}