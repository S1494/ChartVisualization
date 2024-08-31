import express, { urlencoded } from "express";
import dashboardRouter from "./router/dashboardRouter.js";
import AnalyticRoute from "./router/Analyticroute.js";
import AuthRouter from "./router/authrouter.js";
import AdminRouter from "./router/AdminRoute.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.Client_URL,
    // origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

console.log(process.env.Client_URL);

app.use("/dashboard", dashboardRouter);
app.use("/analytic", AnalyticRoute);
app.use("/auth", AuthRouter);
app.use("/admin", AdminRouter);
app.use(urlencoded({ extended: true }));

export default app;
