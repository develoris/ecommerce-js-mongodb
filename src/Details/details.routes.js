import { Router } from 'express'; 
import * as controller from './details.controller.js';
import verifyToken from '../middleware/authMiddleware.js';

const detailRouter = Router();

detailRouter.get('/',controller.getAll);
detailRouter.post('/create', verifyToken, controller.create);
detailRouter.get('/:id',controller.getById);
detailRouter.put('/:id', verifyToken, controller.update);
detailRouter.delete('/:id', verifyToken, controller.deleteOne);

export default detailRouter;
