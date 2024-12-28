import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/config";
import { botFn } from "./controller/telegramBot.ctr";
import botRouter from "./router/bot.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(botRouter);
connectDB();
botFn();
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log("server is running on the " + PORT);
});
