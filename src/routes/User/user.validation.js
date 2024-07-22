import { Joi } from 'express-validation';

export const createUserValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    dateofbirth: Joi.date().iso().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?._-])[A-Za-z\d#$@!%&*?._-]{4,30}$/).required(),
  }),
};
  
  export const loginUserValidation = {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),  // Aggiunto .required() per obbligare il campo password
    }),
  };
  
  export const updateUserValidation = {
    params: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
    body: Joi.object({
      name: Joi.string(),
      surname: Joi.string(),
      dateofbirth: Joi.date().iso(),
      email: Joi.string().email()
      //password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?._-])[A-Za-z\d#$@!%&*?._-]{4,30}$/),
      //group: Joi.string(),
    }).min(1),  // Almeno un campo deve essere presente
  };

  export const idValidation = {
    params: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
  };