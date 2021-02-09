import { Router } from 'express';
import { authGuard } from '../users/guards/auth.guard';
import { librarianGuard } from '../users/guards/librarian.guard';
import { BooksController } from './books.controller';

const router = Router();

router.get('/', BooksController.search);
router.post('/', librarianGuard, BooksController.create);

router.get('/:id', BooksController.getById);
router.put('/:id', librarianGuard, BooksController.update);

router.post('/:id/borrow', authGuard, BooksController.borrowBook);
router.post('/:id/return', authGuard, BooksController.returnBook);

router.get('/:id/borrowed', BooksController.isBorrowed);

export { router as BooksRouter };
