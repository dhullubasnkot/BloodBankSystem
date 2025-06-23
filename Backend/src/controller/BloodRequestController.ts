import { Request, Response } from "express";
import {
  createRequestBloodModal,
  deleteBloodRequestModal,
  getAllBloodRequestModal,
  getRequestByIDModal,
  updateBloodRequestModal,
} from "../sql_models/bloodrequestmodel";
import { error } from "console";

// create the blood request controller:

const createBloodRequest = async (req: Request, res: Response) => {
  try {
    console.log("controller");
    const createRequest = await createRequestBloodModal(req.body);
    console.log(createRequest);
    res.status(200).json({
      message: "Request sent for the blood",
      data: createRequest,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot create the request",
    });
  }
};
// get all the Request
const getBlooadRequestController = async (req: Request, res: Response) => {
  try {
    const getRequest = await getAllBloodRequestModal();
    if (!getRequest) {
      res.status(401).json({
        message: "Cannot get the data",
      });
    }
    res.status(200).json({
      message: "All data",
      data: getRequest,
    });
    return;
  } catch {
    res.status(500).json({
      message: "Unable to fetch the data",
    });
  }
};
// get the specific request
const getRequestByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const find = await getRequestByIDModal(userId);
    res.json(find);
    console.log(find?.userId);
  } catch {
    console.log("error");
  }
};

// update The Request

const updateRequestController = async (req: Request, res: Response) => {
  try {
    const updateRequest = await updateBloodRequestModal(req.body);
    console.log(updateRequest);
    if (!updateRequest) {
      res.status(401).json({
        message: "Cannot Update the data",
      });
    }
    res.status(200).json({
      message: "Updated data",
      data: updateRequest,
    });
  } catch {
    console.log("error");
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// delete Request
const deleteRequestController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const deleteRequest = await deleteBloodRequestModal(userId);
    if (!deleteRequest) {
      res.json("Cannot Delete the data");
    }
    res.status(200).json({
      message: "Deleted data",
    });
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// export the function
export {
  createBloodRequest,
  getBlooadRequestController,
  getRequestByID,
  updateRequestController,
  deleteRequestController,
};
