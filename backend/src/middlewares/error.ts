import { NextFunction, Response, Request } from "express";
import ErrorHandler from "../utils/errorHandler";

const error = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  // wrong mongodb id error
  if (err.name === "CastError") {
    //@ts-ignore
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  //@ts-ignore
  if (err.code === 1000) {
    //@ts-ignore
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid, Try again`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({ success: false, message: err.message });
};
