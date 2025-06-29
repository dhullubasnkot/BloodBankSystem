import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createDonation = async (data: {
  donorId: string;
  requesterId: string;
  requestId?: string | null;
  location?: string;
  notes?: string;
}) => {
  return prisma.donationRecord.create({
    data,
  });
};

export const getDonorStats = async (donorId: string) => {
  const totalDonations = await prisma.donationRecord.count({
    where: { donorId },
  });

  const totalRequests = await prisma.requestBlood.count();

  return { totalDonations, totalRequests };
};

export const GetAllDonationStats = async () => {
  const totalDonations = await prisma.donationRecord.count();
  const totalDonors = await prisma.donor.count();
  const totalRequests = await prisma.requestBlood.count();

  const donationDetails = await prisma.donationRecord.findMany({
    select: {
      id: true,
      donorId: true,
      requesterId: true,
      requestId: true,
    },
  });

  return {
    totalDonations,
    totalDonors,
    totalRequests,
    donationDetails,
  };
};
