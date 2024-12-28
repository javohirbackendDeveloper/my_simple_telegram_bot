import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectDB() {
  try {
    const MONGODB_URL = process.env.MONGODB_URL as string;
    if (!MONGODB_URL) {
      console.log("Sizning urlda muammo bor");
    }
    await mongoose
      .connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => console.log("connected"));
  } catch (error) {
    console.error(error);
  }
}

export default connectDB;
