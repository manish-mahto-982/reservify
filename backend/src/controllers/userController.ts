import { CookieOptions, NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import sendToken from "../utils/jwtToken";
import { validationResult } from "express-validator";

export const handleRegister = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json({ message: err.array() });
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      const newUser = new User(req.body);
      await newUser.save();

      return sendToken(newUser, 201, res); //201 for 'Created'
    }
    next(new ErrorHandler("User already exist", 400));
  }
);

export const handleLogin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json({ message: err.array() });
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (user === null)
      return next(new ErrorHandler("Invalid email or password", 401));
    const isPasswordMatched = await user?.comparePassword(password);
    if (!isPasswordMatched)
      return next(new ErrorHandler("Password does not match", 400));
    sendToken(user, 200, res);
  }
);

export const handleLogout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const options: CookieOptions = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };
    res.cookie("auth_token", null, options);
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  }
);
