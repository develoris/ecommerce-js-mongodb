import { Router } from 'express';
import * as controller from './product.controller.js';
import verifyToken from '../../middleware/authMiddleware.js';
import { validate } from 'express-validation';
import * as val from './product.validation.js'

const productRouter = Router();

productRouter.get('/', controller.getAll);
productRouter.post('/', verifyToken, validate(val.createProductValidation, {}, {}), controller.create);
productRouter.get('/me', verifyToken, controller.productMe);
productRouter.get('/:id', validate(val.idValidation, {}, {}), controller.getById);
productRouter.put('/:id', verifyToken, validate(val.updateProductValidation, {}, {}), controller.update);
productRouter.delete('/:id', verifyToken, validate(val.idValidation, {}, {}), controller.deleteOne);

export default productRouter;
