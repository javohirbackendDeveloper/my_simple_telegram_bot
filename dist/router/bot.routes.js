"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const telegramBot_ctr_1 = require("../controller/telegramBot.ctr");
const botRouter = (0, express_1.Router)();
botRouter.get("/getMessageOfToday", telegramBot_ctr_1.getMessagesWithDate);
botRouter.get("/getLastTenDay", telegramBot_ctr_1.getLastTenDay);
exports.default = botRouter;
