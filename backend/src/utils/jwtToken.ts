import { CookieOptions, Response } from "express";
import { IUser } from "../models/userModel";

const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = user.getJWTToken();
  // options for cookie
  const options: CookieOptions = {
    expires: new Date(
      Date.now() +
      parseInt(process.env.COOKIE_EXPIRE as string, 10) * 24 * 60 * 60 * 100
    ),
    httpOnly: true,
  };
  return res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};

export default sendToken;
