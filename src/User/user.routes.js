import { Router } from 'express'; 
import * as controller from './user.controller.js';
import verifyToken from '../middleware/authMiddleware.js';

const userRouter = Router();

userRouter.get('/',controller.getAll);
userRouter.post('/',controller.create);
userRouter.put('/:id',verifyToken, controller.updateUser);
userRouter.get('/:id', controller.getbyId);
userRouter.post('/login', controller.loginUser);
userRouter.get('/me', verifyToken, controller.getMe);

export default userRouter;
