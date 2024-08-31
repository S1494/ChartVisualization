import { Router } from "express";
import { dashboardGet } from "../controller/dashboardCon.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const dashboardRouter = Router();

dashboardRouter.route("/").get(dashboardGet); // remove the isAuthenticated as the tokens cause issue

export default dashboardRouter;
