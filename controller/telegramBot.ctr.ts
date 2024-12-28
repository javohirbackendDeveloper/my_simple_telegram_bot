import TelegramBot from "node-telegram-bot-api";
import { botModel } from "../schema/telegramBot.schema";
import { NextFunction, Request, Response } from "express";

const botToken = "8039211955:AAGzWATkrQxtNoTf4xEEx3tvkZ3_8V7gx5I";
const bot = new TelegramBot(botToken as string, { polling: true });

bot.setMyCommands([
  {
    command: "/start",
    description: "Botni ishga tushirish",
  },
  {
    command: "/help",
    description: "botning documentatsiyasi",
  },
]);

export function botFn() {
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    if (msg.text === "/start") {
      bot.sendMessage(
        chatId,
        `Hello ${msg.from?.first_name} . The bot started to work`
      );
    } else if (msg.text === "/help") {
      bot.sendMessage(
        chatId,
        `If you have problem using this bot you can contact this group : @javoh1r20_08`
      );
    } else {
      await botModel.create({
        first_name: msg.from?.first_name,
        user_id: msg.from?.id,
        message: msg.text,
      });
      bot.sendMessage(
        chatId,
        `Hello ${msg.from?.first_name} . Your message was accepted by our admins`
      );
    }
  });
}

export const getMessagesWithDate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const messagesOfToday = await botModel.find({ date: { $gte: today } });

    if (!messagesOfToday) {
      return res.json({
        messages: [],
        message: "NoOne sent a message yet",
      });
    }

    res.json({ messages: messagesOfToday });
  } catch (error) {
    next(error);
  }
};

export const getLastTenDay = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const today = new Date();

    const tenDay = new Date(today.setDate(today.getDate() - 10));

    const lastTenDayMessages = await botModel.find({
      date: { $gte: tenDay },
    });

    if (!lastTenDayMessages) {
      return res.json({
        messages: [],
        message: "NoOne sent a message yet",
      });
    }

    res.json({ messages: lastTenDayMessages });
  } catch (error) {
    next(error);
  }
};
