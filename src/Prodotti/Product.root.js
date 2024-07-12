import { Router } from 'express'; 
import * as controller from './product.controller.js';
import verifyToken from '../middleware/authMiddleware.js';

const productRouter = Router();

productRouter.get('/',controller.getAll);
productRouter.get('/:id',controller.getById);
productRouter.post('/create', verifyToken, controller.create);
productRouter.put('/:id', verifyToken, controller.update);
productRouter.delete('/:id', verifyToken, controller.deleteOne);

export default productRouter;
