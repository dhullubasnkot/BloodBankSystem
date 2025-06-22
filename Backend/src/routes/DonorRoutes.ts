import express from "express";
import {
  CreateDonorController,
  GetAllListedBloodDonorsController,
  SearchDonorController,
} from "../controller/DonorController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/", CreateDonorController);
router.get("/search", SearchDonorController);
router.get("/",authenticateToken, GetAllListedBloodDonorsController);
export default router;
