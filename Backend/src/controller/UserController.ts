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
    const { email, password } = req.body;
    const { token, user } = await PrismaSqlModels.login(email, password);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600 * 1000,
      path: "/",
    });

    res.json({ user });
  } catch (error: any) {
    console.error("Error during login:", error);
    res.status(401).json({ message: "Invalid Email Or Password" });
  }
}
