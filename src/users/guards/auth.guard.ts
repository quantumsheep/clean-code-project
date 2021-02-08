import { MiddlewareFunction } from "../../middlewares/middleware.interface";
import { TokenGuardData, tokenGuardPromise } from "./token.guard";

export const authGuard: MiddlewareFunction<TokenGuardData> = async (req, res, next) => {
  if (!req.passed_token_check) {
    await tokenGuardPromise(req, res);
  }

  if (!req.user) {
    res.status(403).json({
      error: 'Forbidden',
    });
  } else {
    next();
  }
}
