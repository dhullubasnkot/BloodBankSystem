import { Router } from "express";
import {
  createBloodRequest,
  deleteRequestController,
  getBlooadRequestController,
  getRequestByID,
  updateRequestController,
} from "../controller/BloodRequestController";

const bloodRequqestRouoter = Router();

bloodRequqestRouoter.post("/", createBloodRequest);
bloodRequqestRouoter.get("/", getBlooadRequestController);
bloodRequqestRouoter.put("/", updateRequestController);
bloodRequqestRouoter.post("/deleterequest", deleteRequestController);
bloodRequqestRouoter.get("/:id", getRequestByID);

export default bloodRequqestRouoter;
