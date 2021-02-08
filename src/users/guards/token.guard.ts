import { ParsedQs } from 'qs';
import { UserService } from "../users.service";
import { MiddlewareFunction } from "../../middlewares/middleware.interface";
import { IUser } from '../../models/user.model';
import { Request, Response } from 'express';

function getTokenQuery(token: string | ParsedQs | string[] | ParsedQs[]): string {
  if (Array.isArray(token)) {
    return getTokenQuery(token[0]);
  } else {
    return token as string;
  }
}

function getTokenHeader(authorization: string) {
  console.log('authorization', authorization)
  const bearer = 'Bearer ';

  if (authorization?.startsWith?.(bearer)) {
    return authorization.slice(bearer.length);
  }

  return authorization;
}

export interface TokenGuardData {
  user?: IUser;
  passed_token_check: boolean;
}

export const tokenGuard: MiddlewareFunction = async (req, res, next) => {
  const token = getTokenQuery(req.query.token) ?? getTokenHeader(req.headers.authorization);

  if (token) {
    const user = await UserService.getByToken(token);

    if (user) {
      req.user = user.toObject({ versionKey: false });
    }
  }

  next();
}

export const tokenGuardPromise = async (req: Request, res: Response) => new Promise<void>(async (resolve) => {
  await tokenGuard(req, res, () => resolve());
  resolve();
});
