import express from "express";
import { analyticGet } from "../controller/AnalyticCon.js";

const AnalyticRoute = express.Router();

AnalyticRoute.route("/").get(analyticGet);

export default AnalyticRoute;
