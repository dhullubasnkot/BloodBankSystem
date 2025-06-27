import { PrismaClient, Role } from "@prisma/client";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import { PrismaDonorModels } from "./donorModel";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "your_jwt_refresh_secret";

const ACCESS_EXPIRES_IN = "2m";
const REFRESH_EXPIRES_IN = "7d";

export const PrismaSqlModels = {
  async createUser(
    name: string,
    email: string,
    phone: string,
    password: string,
    role?: string,
    isDonor?: boolean
  ) {
    if (role && !Object.values(Role).includes(role as Role)) {
      throw new Error("Invalid role provided");
    }

    return await prisma.user.create({
      data: {
        id: randomUUID(),
        name,
        email,
        phone,
        password,
        role: (role as Role) ?? Role.REQUESTER,
        isDonor: isDonor ?? false,
      },
    });
  },

  async checkUserCredentials(email: string, password: string) {
    return await prisma.user.findFirst({
      where: { email, password },
    });
  },

  async login(email: string, password: string, deviceId?: string) {
  const user = await this.checkUserCredentials(email, password);
  if (!user) throw new Error("Invalid email or password");

  const { id, name } = user;
  const resolvedDeviceId = deviceId || "unknown_device";

  const accessToken = jwt.sign(
    { id, name, email, deviceId: resolvedDeviceId, type: "access" },
    JWT_SECRET,
    { expiresIn: ACCESS_EXPIRES_IN }
  );

  const refreshToken = jwt.sign(
    {
      id,
      name,
      email,
      type: "refresh",
      jti: randomUUID(),
      deviceId: resolvedDeviceId,
    },
    JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRES_IN }
  );

  await prisma.refreshToken.deleteMany({ where: { userId: id } });

  await prisma.refreshToken.create({
    data: {
      rtoken: refreshToken,
      userId: id,
      deviceId: resolvedDeviceId,
    },
  });

 
  const donor = await prisma.donor.findUnique({
    where: { userId: id },
    select: {
      id: true,
      
    },
  });

  return {
    accessToken,
    refreshToken,
    user: { id, name, email },
    donorId: donor?.id || null,
  };
},


  async LogoutModel(userId: string, deviceId?: string) {
    await prisma.refreshToken.deleteMany({
      where: {
        userId: userId,
        deviceId: deviceId || "unknown_device",
      },
    });
    return { message: "Logout successful" };
  },
};
