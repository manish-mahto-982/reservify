import express from "express";
import { handleRegister } from "../controllers/userController";
const router = express.Router();
router.post('/register',handleRegister)

export default router 