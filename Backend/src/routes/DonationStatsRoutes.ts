import express from "express";
import {
  donateController,
  donorStatsController,
  GetAllDonationStatsController,
} from "../controller/DonationStatsController";

const router = express.Router();

router.post("/", donateController);
router.get("/", GetAllDonationStatsController);
router.get("/:donorId", donorStatsController);

export default router;
