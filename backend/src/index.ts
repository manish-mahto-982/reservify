import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import helmet, { crossOriginResourcePolicy } from "helmet";
import connectDatabase from "./config/db";
import userRoute from "./routes/userRoute";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const PORT = process.env.PORT || 8000;
connectDatabase();
app.get("/api/v1/test", async (req: Request, res: Response) => {
  res.json({ message: "success!" });
});

app.use("/api/v1/user", userRoute);

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
