import mongoose from "mongoose";

const connectDB = async () =>
  await mongoose.connect(process.env.DB_URI).catch((e) => {
    console.log(e);
  });

export default connectDB;
