import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import User, { IUser } from "../models/userModel";

// below declare is important to prevent the line no 22 req.user warning [to know remove the below code ie(6 to 12) u will get to know]
declare global {
  namespace Express {
    interface Request {
      user: IUser | null;
    }
  }
}
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { auth_token } = req.cookies;
  if (!auth_token)
    next(new ErrorHandler("Please login to access this resource", 401)); //401 Unauthorized
  try {
    const decodedData = jwt.verify(
      auth_token,
      process.env.JWT_SECRET as string
    );
    const userId = (decodedData as JwtPayload).userId;
    req.user = await User.findById(userId);
    next();
  } catch (error) {
    console.error("error auth.js", error);
    new ErrorHandler("Internal Server Error", 500);
  }
};
