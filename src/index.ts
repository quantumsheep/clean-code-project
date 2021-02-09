import express from 'express';
import helmet from 'helmet';
import { BooksRouter } from './books/books.router';
import { UsersRouter } from './users/users.router';

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', UsersRouter);
app.use('/books', BooksRouter);

app.listen(3000, () => console.log(`Listening on http://localhost:3000`));
