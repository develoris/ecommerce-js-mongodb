import { Joi } from 'express-validation';

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

  export const idValidation = {
    params: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
  };