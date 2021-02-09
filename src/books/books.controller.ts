import { Request, Response } from "express";
import { BorrowingService } from "../borrowing/borrowing.service";
import { TokenGuardData } from "../users/guards/token.guard";
import { BooksService } from "./books.service";

export namespace BooksController {
  export async function search(req: Request, res: Response) {
    const query = (Array.isArray(req.query.search) ? req.query.search[0] : req.query.search) as string;

    const books = await BooksService.search(query).lean();
    res.json(books);
  }

  export async function create(req: Request, res: Response) {
    const body = req.body ?? {};

    if (!body.name || typeof body.name !== 'string') {
      return res.status(400).json({
        error: 'name should be a non-empty string',
      });
    }

    if (!body.author || typeof body.author !== 'string') {
      return res.status(400).json({
        error: 'author should be a non-empty string',
      });
    }

    const book = await BooksService.create({
      name: body.name,
      author: body.author,
    });

    res.json(book);
  }

  export async function update(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body ?? {};

    if (body.name !== null && body.name !== undefined) {
      if (typeof body.name !== 'string') {
        return res.status(400).json({
          error: 'name should be a string',
        });
      }
    }

    if (body.author !== null && body.author !== undefined) {
      if (typeof body.author !== 'string') {
        return res.status(400).json({
          error: 'author should be a string',
        });
      }
    }

    const book = await BooksService.update(id, {
      name: body.name,
      author: body.author,
    });

    res.json(book);
  }

  export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    const book = await BooksService.getById(id);

    if (!book) {
      return res.status(404).json({
        error: 'Not Found',
      });
    }

    const data = book.toObject({ versionKey: false });
    res.json(data);
  }

  export async function isBorrowed(req: Request, res: Response) {
    const { id } = req.params;

    const isBorrowed = await BorrowingService.isBorrowed(id);

    res.json({
      is_borrowed: isBorrowed,
    });
  }

  export async function borrowBook(req: Request & TokenGuardData, res: Response) {
    const { id } = req.params;

    if (await BorrowingService.isBorrowed(id)) {
      return res.status(409).json({
        error: 'Book already borrowed',
      });
    }

    const count = await BorrowingService.borrowCount(req.user._id);

    if (count >= 3) {
      return res.status(400).json({
        error: `Already borrowing ${count} books`,
      });
    }

    const borrowing = await BorrowingService.borrowBook(req.user._id, id);
    res.json(borrowing);
  }

  export async function returnBook(req: Request & TokenGuardData, res: Response) {
    const { id } = req.params;

    if (!await BorrowingService.isBorrowedBy(id, req.user._id)) {
      return res.status(409).json({
        error: 'This book is not borrowed by you',
      });
    }

    const borrowing = await BorrowingService.returnBook(req.user._id, id);
    res.json(borrowing);
  }
}
