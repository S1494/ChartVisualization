import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Server connected at port : ${process.env.PORT}`);
  console.log(`Visit http://localhost:${process.env.PORT}`);
  connectDB().then(() => console.log("MongoDb Connected"));
});
