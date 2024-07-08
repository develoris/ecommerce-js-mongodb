import { Router } from 'express'; 
import * as controller from './product.controller.js';

const productRouter = Router();

productRouter.get('/',controller.getAll);
productRouter.get('/:id',controller.getById);
productRouter.post('/create', controller.create);
productRouter.put('/:id', controller.update);
productRouter.delete('/:id', controller.deleteOne);

export default productRouter;
