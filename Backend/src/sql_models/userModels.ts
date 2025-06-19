import { PrismaClient, Role } from "@prisma/client";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

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
        email: email,
        password: password,
      },
    });
  },

  async login(email: string, password: string) {
    const user = await this.checkUserCredentials(email, password);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const { id, name } = user;

    const token = jwt.sign({ id, name, email }, JWT_SECRET, {
      expiresIn: 10 * 60,
    });
    await prisma.loginSession.create({
      data: {
        id: randomUUID(),
        userId: id,
        loggedInAt: new Date(),
        success: Boolean(token),
      },
    });

    return { token, user: { id, name, email } };
  },
};
