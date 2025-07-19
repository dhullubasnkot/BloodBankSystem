import express from "express";
import {
  CreateDonorController,
  GetAllListedBloodDonorsController,
  GetDonorById,
  SearchDonorController,
} from "../controller/DonorController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/", CreateDonorController); //CreateDonorController
router.get("/search", SearchDonorController); //Search Donor Controller
router.get("/", authenticateToken, GetAllListedBloodDonorsController); //GetAllListedBloodDonorController
router.get("/:id", GetDonorById); //GetDonorById
export default router;
