import { Request, Response } from "express";
import { createDonation, getDonorStats } from "../sql_models/DonationStats";
import { GetAllDonationStats } from "../sql_models/DonationStats";
export const donateController = async (req: Request, res: Response) => {
  try {
    const { donorId, requesterId, requestId, location, notes } = req.body;

    const donation = await createDonation({
      donorId,
      requesterId,
      requestId,
      location,
      notes,
    });

    res.status(201).json({ message: "Donation recorded", donation });
  } catch (err) {
    console.error("Donation error:", err);
    res.status(500).json({ message: "Failed to record donation" });
  }
};

export const donorStatsController = async (req: Request, res: Response) => {
  try {
    const { donorId } = req.params;
    const stats = await getDonorStats(donorId);
    res.json(stats);
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

export const GetAllDonationStatsController = async (
  req: Request,
  res: Response
) => {
  try {
    const stats = await GetAllDonationStats();
    res.json(stats);
  } catch (err) {
    console.error("Get all donation stats error:", err);
    res.status(500).json({ message: "Failed to fetch all donation stats" });
  }
};
