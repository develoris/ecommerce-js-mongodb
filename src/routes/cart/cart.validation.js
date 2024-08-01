import { Joi } from 'express-validation';

export const addProductToCartValidation = {
  params: Joi.object({
    idCart: Joi.string().hex().length(24).required(),  // Assicura che idCart sia una stringa esadecimale di 24 caratteri
    idProduct: Joi.string().hex().length(24).required(),  // Assicura che idProduct sia una stringa esadecimale di 24 caratteri
  }),
};

export const idValidation = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};