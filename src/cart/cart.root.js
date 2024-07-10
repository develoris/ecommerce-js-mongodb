import { Router } from 'express'; 
import * as controller from './cart.controller.js';

const carrelloRouter = Router();

carrelloRouter.post('/', controller.createCart);
carrelloRouter.put('/:idCart/addProduct/:idProduct', controller.addProductToCart);
carrelloRouter.get('/:id', controller.getCartWithDetails); // Aggiungi questa rotta

export default carrelloRouter;
