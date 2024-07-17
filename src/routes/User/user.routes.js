import { Router } from 'express'; 
import * as controller from './user.controller.js';
import verifyToken from '../../middleware/authMiddleware.js';

const userRouter = Router();

userRouter.get('/',controller.getAll);
userRouter.post('/',controller.create);
userRouter.post('/login', controller.loginUser);
userRouter.delete('/logout', verifyToken, controller.deleteToken);
userRouter.get('/me', verifyToken, controller.getMe);
userRouter.post('/refresh',  controller.refreshToken);
userRouter.put('/:id',verifyToken, controller.updateUser);
userRouter.get('/:id', controller.getbyId);

export default userRouter;
