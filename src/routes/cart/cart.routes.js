import { Router } from 'express'; 
import * as controller from './cart.controller.js';
import verifyToken from '../../middleware/authMiddleware.js';

const carrelloRouter = Router();

carrelloRouter.post('/', verifyToken, controller.createCart);
carrelloRouter.get('/', controller.getAll);
carrelloRouter.get('/me', verifyToken, controller.getMe);
carrelloRouter.get('/:id',verifyToken, controller.getCartWithDetails);
carrelloRouter.put('/:idCart/addProduct/:idProduct', verifyToken, controller.addProductToCart);

export default carrelloRouter;
