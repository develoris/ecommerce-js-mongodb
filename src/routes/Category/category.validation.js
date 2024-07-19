import { Joi } from 'express-validation';

export const createcategoryValidation = {
    body: Joi.object({
      category: Joi.string().required(),  // Corretto: usa parentesi dopo string
    }),
  };
  
  export const updatecategorytValidation = {
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