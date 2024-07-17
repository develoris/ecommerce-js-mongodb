import * as service from './category.service.js';
/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
export const getAll = async (req, res, next) => {
    try {
        const getAll = await service.getAll();
        return res.send({getAll})
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
    const category = req.body.category
    try {
        const create = await service.create(category);
        const getCategory = await service.getById(create.insertedId);
        return res.send({getCategory});
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
export const getById = async (req, res, next) => {
    const id = req.params.id

    try {
        const getById = await service.getById(id);
        return getById
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
export const deleteById = async (req, res, next) => {
    const id = req.params.id
    try {
        await service.deleteById(id);
        const getAll = await service.getAll()
        return res.send({getAll});
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
export const updateById = async (req, res, next) => {
    const id = req.params.id;
    const { category } = req.body;
    try {
        await service.updateById(id, category);
        const getAll = await service.getById(id)
        return res.send({getAll});
    } catch (error) {
        next(error);
    }

}