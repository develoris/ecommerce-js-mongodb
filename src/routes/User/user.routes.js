import { Router } from 'express'; 
import * as controller from './user.controller.js';
import verifyToken from '../../middleware/authMiddleware.js';
import { validate } from 'express-validation';
import { createUserValidation, loginUserValidation, updateUserValidation, idValidation } from './user.validation.js';


const userRouter = Router();

userRouter.get('/',controller.getAll);
userRouter.post('/', validate(createUserValidation, {}, {}), controller.create);
userRouter.post('/login', validate(loginUserValidation, {}, {}), controller.loginUser);
userRouter.delete('/logout', verifyToken, controller.deleteToken);
userRouter.get('/me', verifyToken, controller.getMe);
userRouter.post('/refresh',  controller.refreshToken);
userRouter.put('/:id',verifyToken, validate(updateUserValidation, {}, {}), controller.updateUser);
userRouter.get('/:id', validate(idValidation, {}, {}), controller.getbyId);

export default userRouter;
 