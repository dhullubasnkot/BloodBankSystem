import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import DonorRoutes from "./routes/DonorRoutes";
import cookieParser from "cookie-parser";
dotenv.config();

import express from "express";

const app = express();
const PORT = process.env.ENV_PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/user", userRoutes);
app.use("/donor", DonorRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
