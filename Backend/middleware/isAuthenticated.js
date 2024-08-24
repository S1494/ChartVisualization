import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

console.log("jwt secret", jwt_secret);

function isAuthenticated(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("token form middleware page ", token);

  if (!token) {
    return res.status(400).json({
      message: "Unauthorized user - No token.",
      redirect: "/auth/login",
      ok: "test",
    });
  }

  jwt.verify(token, jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        message: "Unauthorized user -  Token verification failed",
        err: err,
        redirect: "/auth/login",
      });
    }
    req.user = decoded;
    console.log("used checked - logged in");
    return next();
  });

  console.log("used checked - NOT logged in");
}

export default isAuthenticated;
