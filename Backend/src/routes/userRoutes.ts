import express from "express";
import {
  CreateUserController,
  loginController,
  LogoutController,
} from "../controller/UserController";
import { authenticateToken } from "../middleware/auth";
const router = express.Router();

router.post("/", CreateUserController); //Create User
router.post("/login", loginController);
router.post("/logout", authenticateToken, LogoutController);

export default router;
