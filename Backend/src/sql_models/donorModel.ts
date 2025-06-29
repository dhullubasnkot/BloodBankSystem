import { PrismaClient, Role, BloodGroup } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export const PrismaDonorModels = {
  async createDonor(data: {
    userId: string;
    bloodGroup: BloodGroup;
    district: string;
    city: string;
    lastDonated?: Date;
    available?: boolean;
    notes?: string;
  }) {
    return prisma.donor.create({
      data: {
        id: randomUUID(),
        userId: data.userId,
        bloodGroup: data.bloodGroup,
        district: data.district,
        city: data.city,
        lastDonated: data.lastDonated,
        available: data.available ?? true,
        notes: data.notes,
      },
    });
  },

  async SearchDonorByBloodGroup(
    bloodGroup?: BloodGroup,
    district?: string,
    city?: string,
    available?: boolean
  ) {
    return prisma.donor.findMany({
      where: {
        bloodGroup,
        district,
        city,
        available,
      },
    });
  },
  async getAllListedBloodDonors() {
    return prisma.donor.findMany({
      // skip: 0,
      // take: 5,
      // where: {
      //   district: {
      //     contains: "Butwal",
      //   },
      // },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  },

  async GetDonorById(id: string) {
    return prisma.donor.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  },
};
