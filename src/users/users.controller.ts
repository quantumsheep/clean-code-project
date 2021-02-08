import { Request, Response } from "express";
import { UserService } from "./users.service";

export namespace UserController {
  export async function create(req: Request, res: Response) {
    const user = await UserService.create();
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

    const user = await UserService.update(id, {
      is_librarian: body.is_librarian,
    });

    res.json(user);
  }

  export async function getAll(req: Request, res: Response) {
    const users = await UserService.get()
      .select(['_id', 'is_librarian', 'created_date'])
      .lean();

    res.json(users);
  }

  export async function getMe(req: Request, res: Response) {
    res.json(req.user);
  }

  export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserService.getById(id).select(['_id', 'is_librarian', 'created_date']);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
      });
    }

    const data = user.toObject({ versionKey: false });

    res.json(user);
  }

  export async function getByIdFull(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserService.getById(id);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
      });
    }

    res.json(user.toObject({ versionKey: false }));
  }
}
