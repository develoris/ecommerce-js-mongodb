import { Router } from 'express';
import * as controller from './cart.controller.js';
import verifyToken from '../../middleware/authMiddleware.js';
import { validate } from 'express-validation';
import { addProductToCartValidation, idValidation } from './cart.validation.js';

const carrelloRouter = Router();

carrelloRouter.post('/', verifyToken, controller.createCart);
carrelloRouter.get('/', controller.getAll);
carrelloRouter.get('/me', verifyToken, controller.getMe);
carrelloRouter.get('/:id', verifyToken, validate(idValidation, {}, {}), controller.getCartWithDetails);
carrelloRouter.put('/:idCart/addProduct/:idProduct', verifyToken, validate(addProductToCartValidation, {}, {}), controller.addProductToCart);

export default carrelloRouter;
