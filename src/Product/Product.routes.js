import { Router } from 'express'; 
import * as controller from './product.controller.js';
import verifyToken from '../middleware/authMiddleware.js';

const productRouter = Router();

productRouter.get('/',controller.getAll);
productRouter.post('/create', verifyToken, controller.create);
productRouter.get('/me', verifyToken, controller.productMe);
productRouter.get('/:id',controller.getById);
productRouter.put('/:id', verifyToken, controller.update);
productRouter.delete('/:id', verifyToken, controller.deleteOne);

export default productRouter;
