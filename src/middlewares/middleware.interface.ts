import { NextFunction, Request, Response } from "express";

export type MiddlewareFunction<RequestAddon = unknown> = (req: Request & RequestAddon, res: Response, next: NextFunction) => any | Promise<any>;
