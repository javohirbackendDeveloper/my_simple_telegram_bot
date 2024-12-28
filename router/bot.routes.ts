import { Router, RequestHandler } from "express";
import {
  getLastTenDay,
  getMessagesWithDate,
} from "../controller/telegramBot.ctr";

const botRouter: Router = Router();

botRouter.get("/getMessageOfToday", getMessagesWithDate as RequestHandler);

botRouter.get("/getLastTenDay", getLastTenDay as RequestHandler);

export default botRouter;
