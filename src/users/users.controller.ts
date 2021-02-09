import { Request, Response } from "express";
import { BorrowingService } from "../borrowing/borrowing.service";
import { TokenGuardData } from "./guards/token.guard";
import { UsersService } from "./users.service";

export namespace UsersController {
  export async function create(req: Request, res: Response) {
    const user = await UsersService.create();
    res.json(user);
  }

  export async function update(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body ?? {};

    if (body.is_librarian !== null && body.is_librarian !== undefined) {
      if (typeof body.is_librarian !== 'boolean') {
        return res.status(400).json({
          error: 'is_librarian should be a boolean',
        });
      }
    }

    const user = await UsersService.update(id, {
      is_librarian: body.is_librarian,
    });

    res.json(user);
  }

  export async function getAll(req: Request, res: Response) {
    const users = await UsersService.get()
      .select(['_id', 'is_librarian', 'created_date'])
      .lean();

    res.json(users);
  }

  export async function getMe(req: Request, res: Response) {
    res.json(req.user);
  }

  export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UsersService.getById(id).select(['_id', 'is_librarian', 'created_date']);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
      });
    }

    const data = user.toObject({ versionKey: false });
    res.json(data);
  }

  export async function getByIdFull(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UsersService.getById(id);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
      });
    }

    res.json(user.toObject({ versionKey: false }));
  }

  export async function getBorrowedBooks(req: Request & TokenGuardData, res: Response) {
    const { id } = req.params;

    if (id !== req.user._id && !req.user.is_librarian) {
      return res.status(401).json({
        error: 'Unauthorized',
      });
    }

    const borrowed = await BorrowingService.getByUser(id).lean();
    res.json(borrowed);
  }

  export async function getMyBorrowedBooks(req: Request & TokenGuardData, res: Response) {
    const borrowed = await BorrowingService.getByUser(req.user._id).lean();
    res.json(borrowed);
  }
}
