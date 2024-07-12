import { Router } from 'express'; 
import * as controller from './cart.controller.js';
import verifyToken from '../middleware/authMiddleware.js';

const carrelloRouter = Router();

carrelloRouter.post('/', verifyToken, controller.createCart);
carrelloRouter.put('/:idCart/addProduct/:idProduct', verifyToken, controller.addProductToCart);
carrelloRouter.get('/:id',verifyToken, controller.getCartWithDetails); // Aggiungi questa rotta
carrelloRouter.get('/', controller.getAll);

export default carrelloRouter;
