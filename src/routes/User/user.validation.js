import { Joi } from 'express-validation';
import joiDate from '@joi/date';
const joiExtend = Joi.extend(joiDate)
export const register = {
  body: Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    dateOfBirth: joiExtend.date().format('YYYY-MM-DD').utc().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?._-])[A-Za-z\d#$@!%&*?._-]{4,30}$/).required(),
  }),
};
  
  export const login = {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),  // Aggiunto .required() per obbligare il campo password
    }),
  };
  
  export const updateUser = {
    params: Joi.object({
      id: Joi.string().hex().length(24).required(),
    }),
    body: Joi.object({
      name: Joi.string(),
      surname: Joi.string(),
      dateOfBirth: joiExtend.date().format('YYYY-MM-DD').utc(),
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