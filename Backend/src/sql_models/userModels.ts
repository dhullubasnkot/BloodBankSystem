import { PrismaClient, Role } from "@prisma/client";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "your_jwt_refresh_secret";

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
      where: {
        email,
        password,
      },
    });
  },

  async login(email: string, password: string) {
    const user = await this.checkUserCredentials(email, password);
    if (!user) {
      throw new Error("Invalid email or passwordjhbjhgb");
    }

    const { id, name } = user;

    const accessToken = jwt.sign({ id, name, email }, JWT_SECRET, {
      expiresIn: 2,
    });

    const refreshToken = jwt.sign({ id, name, email }, JWT_REFRESH_SECRET, {
      expiresIn: 20000000000, // 20 seconds,
    });

    await prisma.refreshToken.upsert({
      where: { userId: id },
      update: {
        rtoken: refreshToken,
        createdAt: new Date(),
      },
      create: {
        rtoken: refreshToken,
        userId: id,
      },
    });

    await prisma.loginSession.create({
      data: {
        id: randomUUID(),
        userId: id,
        loggedInAt: new Date(),
        success: true,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: { id, name, email },
    };
  },
};
