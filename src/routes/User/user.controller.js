import * as service from './user.service.js';
import jwt from 'jsonwebtoken';

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const getAll = async (req, res, next) => {
    try {
        const users = await service.getAllUser();
        return res.json(users);
    } catch (error) {
        next(error);
    }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const create = async (req, res, next) => {
    const data = {
        ...req.body,
        group: "User",
        insertAt: new Date()
    }
    try {
        await service.createUser(data);

        return res.send(`User registered successfully`)
    } catch (error) {
        next(error);
    }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const getbyId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const getUser = await service.getUserById(id)
        return res.send({getUser})
    } catch (error) {
        next(error);
    }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const data = {
        ...req.body
    }
    try {
        await service.updateUser(id, data);
        const getUserUpdated = await service.getUserById(id)
        return res.send (getUserUpdated);
    } catch (error) {
        next(error)
    }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        await service.deleteUser(id);
        const getAll = await service.getAllUser();
        return getAll;
    } catch (error) {
        next(error)
    }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const loginUser = async (req,res,next) => {
    const { email, password }= req.body;
    try {
        const token = await service.login(email, password);
        return res.send(token)
    } catch (error) {
        next(error);
    }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const getMe = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const idUser = decoded.userId;
        const user = await service.getMe(idUser);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const refreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).send('Access Denied. No refresh token provided.');
    }
    try {
        const newAccessToken = await service.refreshToken(refreshToken);
        return res.send({accessToken: newAccessToken});
    } catch (error) {
        next(error);
    }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const deleteToken = async (req, res, next) => {
    const idUser = req.user.userId;
    try {
        await service.logoutUser(idUser);
        return res.send({message: 'Logout effettuato'});
    } catch (error) {
        next(error)
    }
}