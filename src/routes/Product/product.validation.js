import { Joi } from 'express-validation';

export const createProductValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    category: Joi.string().hex().length(24).required(),
    description: Joi.string().required(),
    qty_stock: Joi.number().integer().required(),
    price: Joi.number().precision(2).required(),
    status: Joi.string().valid('active', 'inactive').required(),
    image: {
      name: Joi.string().required(),
      type: Joi.string().valid('image/JPEG', 'image/JPG', 'image/PNG').insensitive().required(),
      data: Joi.string().required()
    }
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
    image: {
      name: Joi.string(),
      type: Joi.string().valid('image/JPEG', 'image/JPG', 'image/PNG').insensitive(),
      data: Joi.string()
    }
  }).min(1),  // Almeno un campo deve essere presente
};

export const idValidation = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const getProductQuery = {
  query: Joi.object({
    page: Joi.number().required(),
    limit: Joi.number().required(),
    sort: Joi.string(),
    order: Joi.string().valid('asc', 'desc').insensitive(),
    // minPrice: Joi.number().precision(2),
    // maxPrice: Joi.number().precision(2)
  })
}