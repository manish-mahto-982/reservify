import express from "express";
import { handleLogin, handleLogout, handleRegister } from "../controllers/userController";
import { check } from "express-validator";
const router = express.Router();
router.post(
  "/register",
  [
    check("name", "Name is required").isString(),
    check("email", "Email id is required").isEmail(),
    check(
      "password",
      "Password with 8 or more character is required!"
    ).isLength({ min: 8 }),
  ],
  handleRegister
);

router.post(
  "/login",
  [
    check("email", "Email id is Required").isEmail(),
    check(
      "password",
      "Password with 8 or more character is required!"
    ).isLength({ min: 8 }),
  ],
  handleLogin
);

router.post("/logout", handleLogout)

export default router;