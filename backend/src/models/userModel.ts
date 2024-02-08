import { Schema, Document, model } from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export interface IUser {
  name: string;
  email: string;
  avatar: { public_id: string; url: string };
  role: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  getJWTToken(): string;
}

const userSchema = new Schema({
  name: { type: String, required: [true, "Please enter your name"] },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "This email is already used"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false, //IMPORTANT: this don't allow to select the field form db
  },
  // avatar: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: [true, "Avatar image url is required"],
  //   },
  // },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
const User = model<IUser>("User", userSchema);

export default User;
