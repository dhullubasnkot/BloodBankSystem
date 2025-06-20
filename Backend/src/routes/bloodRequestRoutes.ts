import { Router } from "express";
import { createBloodRequest, deleteRequestController, getBlooadRequestController, getRequestByID, updateRequestController } from "../controller/bloodRequestController";

const bloodRequqestRouoter= Router()

bloodRequqestRouoter.post("/",createBloodRequest)
bloodRequqestRouoter.get("/",getBlooadRequestController)
bloodRequqestRouoter.post("/get",getRequestByID)
bloodRequqestRouoter.put("/",updateRequestController)
bloodRequqestRouoter.post("/deleterequest",deleteRequestController)

export{bloodRequqestRouoter}