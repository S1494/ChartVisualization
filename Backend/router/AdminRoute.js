import express from "express";
import { projectDataGet } from "../controller/AdminCon.js";

const AdminRouter = express.Router();

AdminRouter.route("/projectdata").get(projectDataGet);

export default AdminRouter;
