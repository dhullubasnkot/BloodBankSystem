import express from "express";
import {
  CreateDonorController,
  GetAllListedBloodDonorsController,
  GetDonorById,
  SearchDonorController,
} from "../controller/DonorController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/", CreateDonorController);
router.get("/search", SearchDonorController);
router.get("/", authenticateToken, GetAllListedBloodDonorsController);
router.get("/:id", GetDonorById);
export default router;
