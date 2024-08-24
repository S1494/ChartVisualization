import express, { urlencoded } from "express";
import dashboardRouter from "./router/dashboardRouter.js";
import AnalyticRoute from "./router/Analyticroute.js";
import AuthRouter from "./router/authrouter.js";
import AdminRouter from "./router/AdminRoute.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "*",
  })
  //   {
  //   origin: "https://chart-visualization-six.vercel.app",
  //   methods: ["GET", "POST"],
  //   allowedHeaders: ["Content-Type", "Authorization"],
  //   credentials: true, // Allows cookies to be sent and received
  // }
);

app.use(express.json());

app.use("/dashboard", dashboardRouter);
app.use("/analytic", AnalyticRoute);
app.use("/auth", AuthRouter);
app.use("/admin", AdminRouter);
app.use(urlencoded({ extended: true }));

export default app;
