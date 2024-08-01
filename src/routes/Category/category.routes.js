import { Router } from 'express';
import * as controller from './category.controller.js';
import verifyToken from '../../middleware/authMiddleware.js';
import { validate } from 'express-validation';
import { idValidation, createcategoryValidation, updatecategorytValidation } from './category.validation.js';

const categoryRouter = Router();

categoryRouter.get('/', controller.getAll);
categoryRouter.post('/', verifyToken, validate(createcategoryValidation, {}, {}), controller.create);
categoryRouter.get('/:id', validate(idValidation, {}, {}), controller.getById);
categoryRouter.put('/:id', verifyToken, validate(updatecategorytValidation, {}, {}), controller.updateById);
categoryRouter.delete('/:id', verifyToken, validate(idValidation, {}, {}), controller.deleteById);

export default categoryRouter;
