"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./db/config"));
const telegramBot_ctr_1 = require("./controller/telegramBot.ctr");
const bot_routes_1 = __importDefault(require("./router/bot.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(bot_routes_1.default);
(0, config_1.default)();
(0, telegramBot_ctr_1.botFn)();
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log("server is running on the " + PORT);
});
