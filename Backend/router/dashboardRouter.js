import { Router } from "express";
import { dashboardGet } from "../controller/dashboardCon.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const dashboardRouter = Router();

dashboardRouter.route("/").get(isAuthenticated, dashboardGet);

export default dashboardRouter;
