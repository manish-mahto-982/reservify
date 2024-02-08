import { NextFunction, Request, Response } from "express";

const catchAsyncErrors =
  (
    thenFunc: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(thenFunc(req, res, next)).catch(next);

export default catchAsyncErrors