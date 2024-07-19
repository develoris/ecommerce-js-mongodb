import { Joi } from 'express-validation';

export const createUserValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    dateofbirth: Joi.date().iso().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  }),
};

export const loginUserValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),  // Aggiunto .required() per obbligare il campo password
  }),
};

export const updateUserValidation = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object({
    name: Joi.string(),
    surname: Joi.string(),
    dateofbirth: Joi.date().iso(),  // Corretto dateOfBirth in dateofbirth per consistenza
    email: Joi.string().email(),
    password: Joi.string().min(3).max(30),
    group: Joi.string(),
  }).min(1),  // Almeno un campo deve essere presente
};

export const createProductValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    category: Joi.string().hex().length(24).required(),
    description: Joi.string().required(),
    qty_stock: Joi.number().integer().required(),
    price: Joi.number().precision(2).required(),
    status: Joi.string().valid('active', 'inactive').required(),
  }),
};

export const updateProductValidation = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),  // Assicura che l'ID sia una stringa esadecimale di 24 caratteri
  }),
  body: Joi.object({
    name: Joi.string(),
    category: Joi.string().hex().length(24),
    description: Joi.string(),
    qty_stock: Joi.number().integer(),
    price: Joi.number().precision(2),
    status: Joi.string().valid('active', 'inactive'),
  }).min(1),  // Almeno un campo deve essere presente
};

export const addProductToCartValidation = {
  params: Joi.object({
    idCart: Joi.string().hex().length(24).required(),  // Assicura che idCart sia una stringa esadecimale di 24 caratteri
    idProduct: Joi.string().hex().length(24).required(),  // Assicura che idProduct sia una stringa esadecimale di 24 caratteri
  }),
};

export const createCartValidation = {
  body: Joi.object({
    category: Joi.string().required(),  // Corretto: usa parentesi dopo string
  }),
};

export const updateCartValidation = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),  // Assicura che l'ID sia una stringa esadecimale di 24 caratteri
  }),
  body: Joi.object({
    category: Joi.string().required(),  // Corretto: usa parentesi dopo string
  }),
};

export const idValidation = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};
