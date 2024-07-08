import { Router } from 'express'; 
import * as controller from './cart.controller.js';

const carrelloRouter = Router();

carrelloRouter.post('/create', controller.createCart);
carrelloRouter.put('/:id/add', controller.addProductToCart);
carrelloRouter.get('/:id/details', controller.getCartWithDetails); // Aggiungi questa rotta

export default carrelloRouter;
