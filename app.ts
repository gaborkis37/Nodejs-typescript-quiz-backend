import express from "express";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from "./src/routes/UserRouter";
import QuizRouter from "./src/routes/QuizRouter";

dotenv.config();

const app: express.Application = express();
app.use(cors());
app.use(express.json());
const server: http.Server = http.createServer(app);
const port = Number.parseInt(process.env.PORT) | 9000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB CONNECTION SUCCESS"))
  .catch((error: Error) => console.log(error));

app.use("/users", UserRouter.userRoutes());
app.use("/quiz", QuizRouter.quizRoutes());

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
