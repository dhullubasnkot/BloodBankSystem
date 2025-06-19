import express from "express";
import {
  CreateUserController,
  loginController,
} from "../controller/UserController";
const router = express.Router();

router.post("/", CreateUserController);
router.post("/login", loginController);

export default router;
