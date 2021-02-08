import { Router } from 'express';
import { authGuard } from './guards/auth.guard';
import { librarianGuard } from './guards/librarian.guard';
import { UserController } from './users.controller';
const router = Router();

router.get('/', librarianGuard, UserController.getAll);
router.post('/', librarianGuard, UserController.create);

router.get('/me', authGuard, UserController.getMe);

router.get('/:id', authGuard, UserController.getById);
router.get('/:id/full', librarianGuard, UserController.getByIdFull);

router.put('/:id', librarianGuard, UserController.update);

export { router as UsersRouter };
