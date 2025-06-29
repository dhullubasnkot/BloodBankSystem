import { PrismaClient, RequestStatus, Role, BloodGroup } from "@prisma/client";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();

// Blood Request Create:
async function createRequestBloodModal(data: {
  // id: string;

  userId: string;
  name: string;
  phone: string;
  bloodGroup: BloodGroup;
  district: string;
  city: string;
  status?: RequestStatus;
  fulfilledAt?: Date;
  notes?: string;
}) {
  const createRequest = await prisma.requestBlood.create({
    data: {
      id: randomUUID(),

      userId: data.userId,
      name: data.name,
      phone: data.phone,
      bloodGroup: data.bloodGroup,
      district: data.district,
      city: data.city,
      status: data.status,
      fulfilledAt: data.fulfilledAt,
      notes: data.notes,
    },
  });
  return createRequest;
}

// get ALl Blood Request

async function getAllBloodRequestModal() {
  const reqeuest = await prisma.requestBlood.findMany();
  return reqeuest;
}
// get Request by User ID
async function getRequestByIDModal(userId: string) {
  const finbyid = await prisma.requestBlood.findFirst({
    where: {
      userId: userId,
    },
  });
  return finbyid;
}
// update Request by UserID
async function updateBloodRequestModal(data: {
  userId: string;
  name: string;
  phone: string;
  bloodGroup?: BloodGroup;
  district?: string;
  city?: string;
  status?: RequestStatus;
  fulfilledAt?: Date;
  notes?: string;
}) {
  const updateRequestdata = await prisma.requestBlood.updateMany({
    where: {
      userId: data.userId,
    },
    data: {
      bloodGroup: data.bloodGroup,
      phone: data.phone,
      district: data.district,
      city: data.city,
      status: data.status,
      fulfilledAt: data.fulfilledAt,
      notes: data.notes,
    },
  });
  const finbyid = await prisma.requestBlood.findFirst({
    where: {
      userId: data.userId,
    },
  });
  return finbyid;
}
async function deleteBloodRequestModal(userId: string) {
  const deleteRequest = await prisma.requestBlood.deleteMany({
    where: {
      userId: userId,
    },
  });
  return deleteRequest;
}
export {
  createRequestBloodModal,
  getAllBloodRequestModal,
  getRequestByIDModal,
  updateBloodRequestModal,
  deleteBloodRequestModal,
};
