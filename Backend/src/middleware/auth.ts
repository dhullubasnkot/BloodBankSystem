import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "your_jwt_refresh_secret";

export interface AuthRequest extends Request {
  user?: any;
}

function generateAccessToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1m" });
}

export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.cookies?.auth_token;
  const refreshToken = req.cookies?.refresh_token;

  if (!token && !refreshToken) {
    res.status(401).json({ message: "No token found, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next(); // pass control to next middleware or route handler
  } catch (error) {
    console.log("Access token expired or invalid:", (error as Error)?.message);

    try {
      const decodedRefresh = jwt.verify(refreshToken, REFRESH_SECRET) as any;

      const stored = await prisma.refreshToken.findUnique({
        where: {
          userId: decodedRefresh.id,
        },
      });

      if (!stored || stored.rtoken !== refreshToken) {
        res.status(401).json({ message: "Invalid refresh token" });
        return;
      }

      const newAccessToken = generateAccessToken({
        id: decodedRefresh.id,
        name: decodedRefresh.name,
        email: decodedRefresh.email,
      });

      res.cookie("auth_token", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 1000, // 1 minute
        path: "/",
      });

      req.user = jwt.decode(newAccessToken);
      next(); // continue after refreshing token
    } catch (err) {
      res.status(403).json({ message: "Refresh token expired or invalid" });
    }
  }
}
