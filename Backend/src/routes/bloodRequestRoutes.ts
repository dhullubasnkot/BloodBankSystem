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
bloodRequqestRouoter.get("/", getBlooadRequestController); //get blood request
bloodRequqestRouoter.put("/", updateRequestController);//update blood
bloodRequqestRouoter.post("/deleterequest", deleteRequestController);//delete bloood
bloodRequqestRouoter.get("/:id", getRequestByID);//getRequestByID

export default bloodRequqestRouoter;
