import { PrismaSqlModels } from "../sql_models/userModels";
import { Request, Response } from "express";

export async function CreateUserController(req: Request, res: Response) {
  const { name, email, phone, password, role, isDonor } = req.body;
  try {
    const NewUser = await PrismaSqlModels.createUser(
      name,
      email,
      phone,
      password,
      role,
      isDonor
    );
    console.log(NewUser);
    res.status(201).json({
      message: "User Created Successfully",
      user: NewUser,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password, deviceId } = req.body;

    const { accessToken, refreshToken, user, donorId } =
      await PrismaSqlModels.login(email, password, deviceId);

    res.cookie("auth_token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 2 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user,
      donorId, // include donorId here
    });
  } catch (error: any) {
    console.error("Error during login:", error);
    res.status(401).json({ message: "Invalid Email Or Password" });
  }
}

export async function LogoutController(req: Request, res: Response) {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error: any) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Failed to logout" });
  }
}
