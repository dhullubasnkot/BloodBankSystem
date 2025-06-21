import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "your_refresh_secret";

export interface AuthRequest extends Request {
  user?: any;
}

function generateAccessToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2m" });
}

export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.auth_token;
  const refreshToken = req.cookies?.refresh_token;

  if (!token && !refreshToken) {
    return res
      .status(401)
      .json({ message: "No token found, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    if (decoded.type !== "access") throw new Error("Invalid access token");

    req.user = decoded;
    return next();
  } catch (error) {
    console.log("Access token expired or invalid:", (error as Error)?.message);

    try {
      const decodedRefresh = jwt.verify(
        refreshToken,
        JWT_REFRESH_SECRET
      ) as any;

      if (decodedRefresh.type !== "refresh")
        throw new Error("Invalid refresh token type");

      const stored = await prisma.refreshToken.findUnique({
        where: { userId: decodedRefresh.id },
      });

      if (!stored || stored.rtoken !== refreshToken) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      const newAccessToken = generateAccessToken({
        id: decodedRefresh.id,
        name: decodedRefresh.name,
        email: decodedRefresh.email,
        type: "access",
      });

      res.cookie("auth_token", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 2 * 60 * 1000, // 2 minutes
      });

      req.user = jwt.decode(newAccessToken);
      return next();
    } catch (err) {
      return res
        .status(403)
        .json({ message: "Refresh token expired or invalid" });
    }
  }
}
