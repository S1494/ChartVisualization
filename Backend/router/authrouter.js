import express from "express";
import {
  loginGet,
  loginPost,
  logoutPost,
  signupGet,
  signupPost,
} from "../controller/AuthCon.js";

const AuthRouter = express.Router();

AuthRouter.route("/login").get(loginGet).post(loginPost);
AuthRouter.route("/signup").get(signupGet).post(signupPost);
AuthRouter.route("/logout").post(logoutPost);

export default AuthRouter;
