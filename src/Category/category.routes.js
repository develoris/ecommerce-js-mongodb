import { Router } from 'express'; 
import * as controller from './category.controller.js';
import verifyToken from '../middleware/authMiddleware.js';

const categoryRouter = Router();

categoryRouter.get('/',controller.getAll);
categoryRouter.post('/', verifyToken, controller.create);
categoryRouter.get('/:id',controller.getById);
categoryRouter.put('/:id', verifyToken, controller.updateById);
categoryRouter.delete('/:id', verifyToken, controller.deleteById);

export default categoryRouter;
