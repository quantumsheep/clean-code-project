import { Router } from 'express';
import { authGuard } from './guards/auth.guard';
import { librarianGuard } from './guards/librarian.guard';
import { UsersController } from './users.controller';

const router = Router();

router.get('/', librarianGuard, UsersController.getAll);
router.post('/', librarianGuard, UsersController.create);

router.get('/me', authGuard, UsersController.getMe);

router.get('/:id', authGuard, UsersController.getById);
router.get('/:id/full', librarianGuard, UsersController.getByIdFull);

router.put('/:id', librarianGuard, UsersController.update);

router.get('/me/borrowed', authGuard, UsersController.getMyBorrowedBooks);
router.get('/:id/borrowed', authGuard, UsersController.getBorrowedBooks);

export { router as UsersRouter };
