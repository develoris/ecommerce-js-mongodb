import { Router } from 'express'; 
import * as controller from './user.controller.js';
import verifyToken from '../../middleware/authMiddleware.js';
import { validate } from 'express-validation';
import * as V from './user.validation.js';


const userRouter = Router();

userRouter.get('/',controller.getAll);
userRouter.post('/', validate(V.register, {}, {}), controller.create);
userRouter.post('/login', validate(V.login, {}, {}), controller.loginUser);
userRouter.delete('/logout', verifyToken, controller.deleteToken);
userRouter.get('/me', verifyToken, controller.getMe);
userRouter.post('/refresh',  controller.refreshToken);
userRouter.put('/:id',verifyToken, validate(V.updateUser, {}, {}), controller.updateUser);
userRouter.get('/:id', validate(V.idValidation, {}, {}), controller.getbyId);

export default userRouter;
 