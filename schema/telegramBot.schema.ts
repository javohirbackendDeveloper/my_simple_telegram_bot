import mongoose, { model } from "mongoose";

const telegramBotSchema = new mongoose.Schema({
  first_name: {
    type: String,
    minlength: [2, "The firstname must be more than 2 characters"],
    maxlength: [100, "The firstname must be less than 100 characters"],
    default: "user",
  },
  user_id: {
    type: Number,
  },
  message: {
    type: String,
    minlength: [2, "The message must be more than 2 characters"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const botModel = model("telegramMessage", telegramBotSchema);
