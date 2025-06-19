// // src/controller/authController.ts
// import { Request, Response } from "express";
// import { RefreshToken } from "@prisma/client";

// export async function RefreshTokenController(req: Request, res: Response) {
//   try {
//     const refreshToken = req.cookies.refresh_token;

//     if (!refreshToken) {
//       return res.status(401).json({ message: "No refresh token provided" });
//     }

//     const { accessToken } = await refreshToken(refreshToken);

//     res.cookie("auth_token", accessToken, {
//       httpOnly: true,
//       maxAge: 60 * 1000,
//     });

//     res.status(200).json({ message: "Access token refreshed" });
//   } catch (error: any) {
//     res.status(403).json({ message: "Could not refresh access token" });
//   }
// }
