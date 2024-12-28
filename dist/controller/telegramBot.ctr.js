"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastTenDay = exports.getMessagesWithDate = void 0;
exports.botFn = botFn;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const telegramBot_schema_1 = require("../schema/telegramBot.schema");
const botToken = "8039211955:AAGzWATkrQxtNoTf4xEEx3tvkZ3_8V7gx5I";
const bot = new node_telegram_bot_api_1.default(botToken, { polling: true });
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
function botFn() {
    bot.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const chatId = msg.chat.id;
        if (msg.text === "/start") {
            bot.sendMessage(chatId, `Hello ${(_a = msg.from) === null || _a === void 0 ? void 0 : _a.first_name} . The bot started to work`);
        }
        else if (msg.text === "/help") {
            bot.sendMessage(chatId, `If you have problem using this bot you can contact this group : @javoh1r20_08`);
        }
        else {
            yield telegramBot_schema_1.botModel.create({
                first_name: (_b = msg.from) === null || _b === void 0 ? void 0 : _b.first_name,
                user_id: (_c = msg.from) === null || _c === void 0 ? void 0 : _c.id,
                message: msg.text,
            });
            bot.sendMessage(chatId, `Hello ${(_d = msg.from) === null || _d === void 0 ? void 0 : _d.first_name} . Your message was accepted by our admins`);
        }
    }));
}
const getMessagesWithDate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const messagesOfToday = yield telegramBot_schema_1.botModel.find({ date: { $gte: today } });
        if (!messagesOfToday) {
            return res.json({
                messages: [],
                message: "NoOne sent a message yet",
            });
        }
        res.json({ messages: messagesOfToday });
    }
    catch (error) {
        next(error);
    }
});
exports.getMessagesWithDate = getMessagesWithDate;
const getLastTenDay = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        const tenDay = new Date(today.setDate(today.getDate() - 10));
        const lastTenDayMessages = yield telegramBot_schema_1.botModel.find({
            date: { $gte: tenDay },
        });
        if (!lastTenDayMessages) {
            return res.json({
                messages: [],
                message: "NoOne sent a message yet",
            });
        }
        res.json({ messages: lastTenDayMessages });
    }
    catch (error) {
        next(error);
    }
});
exports.getLastTenDay = getLastTenDay;
