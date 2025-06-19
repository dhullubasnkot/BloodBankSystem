import express from "express";
import {
  CreateDonorController,
  SearchDonorController,
} from "../controller/DonorController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/", CreateDonorController);
router.get("/search", authenticateToken, SearchDonorController);
export default router;
