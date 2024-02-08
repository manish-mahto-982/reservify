import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import sendToken from "../utils/jwtToken";

export const handleRegister = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      user = new User(req.body);
      await user.save();
      sendToken(user, 201, res);
    }
    new ErrorHandler("User already exist", 400);
  }
);
