import { Request, Response } from "express";
import { PrismaDonorModels } from "../sql_models/donorModel";
import { BloodGroup } from "@prisma/client";

export async function CreateDonorController(req: Request, res: Response) {
  try {
    const {
      userId,
      bloodGroup,
      district,
      city,
      lastDonated,
      available,
      notes,
    } = req.body;
    const donor = await PrismaDonorModels.createDonor({
      userId,
      bloodGroup,
      district,
      city,
      lastDonated,
      available,
      notes,
    });
    res.status(201).json(donor);
  } catch (error) {
    res.status(500).json({ error: "Failed to create donor" });
    console.error("Error creating donor:", error);
  }
}

export async function SearchDonorController(req: Request, res: Response) {
  try {
    const { bloodGroup, district, city, available } = req.query;

    const donors = await PrismaDonorModels.SearchDonorByBloodGroup(
      bloodGroup as BloodGroup | undefined,
      district as string | undefined,
      city as string | undefined,
      available === "true" ? true : undefined
    );
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error: "Failed to search Donors" });
    console.log("Error Searching Donors:", error);
  }
}

export async function GetAllListedBloodDonorsController(
  req: Request,
  res: Response
) {
  try {
    const donors = await PrismaDonorModels.getAllListedBloodDonors();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all listed blood donors" });
    console.error("Error fetching all listed blood donors:", error);
  }
}

export async function GetDonorById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Donor ID is required" });
      return;
    }
    const donor = await PrismaDonorModels.GetDonorById(id);
    if (!donor) {
      res.status(404).json({ error: "Donor not found" });
      return;
    }
    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donor by ID" });
    console.error("Error fetching donor by ID:", error);
  }
}
