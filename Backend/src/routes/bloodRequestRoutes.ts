import { Router } from "express";
import {
  createBloodRequest,
  deleteRequestController,
  getBlooadRequestController,
  getRequestByID,
  updateRequestController,
} from "../controller/BloodRequestController";

const bloodRequqestRouoter = Router();

bloodRequqestRouoter.post("/", createBloodRequest); //create Blood Requestt
bloodRequqestRouoter.get("/", getBlooadRequestController);
bloodRequqestRouoter.put("/", updateRequestController);
bloodRequqestRouoter.post("/deleterequest", deleteRequestController);
bloodRequqestRouoter.get("/:id", getRequestByID);

export default bloodRequqestRouoter;
