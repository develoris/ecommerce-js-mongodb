import { Router } from 'express'; 
import * as controller from './product.controller.js';
import verifyToken from '../../middleware/authMiddleware.js';
import { validate } from 'express-validation';
import { createProductValidation, updateProductValidation, idValidation } from './product.validation.js';

const productRouter = Router();

productRouter.get('/',controller.getAll);
productRouter.post('/', verifyToken, validate(createProductValidation, {}, {}), controller.create);
productRouter.get('/me', verifyToken, controller.productMe);
productRouter.get('/:id', validate(idValidation, {}, {}), controller.getById);
productRouter.put('/:id', verifyToken, validate(updateProductValidation, {}, {}),controller.update);
productRouter.delete('/:id', verifyToken, validate(idValidation, {}, {}), controller.deleteOne);

export default productRouter;
