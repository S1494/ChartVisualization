import authSchema from "../model/authSchema.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

export function loginGet(req, res) {
  res.send("ok login");
}

export function signupGet(req, res) {
  res.send("ok signup");
}

//login post
export async function loginPost(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await authSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, jwt_secret, {
      expiresIn: "1h",
    });
    console.log("Token from login pagee", token);

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//signup post
export async function signupPost(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  const { name, email, password } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  const newUser = new authSchema({
    name,
    email,
    password,
  });

  console.log(name);
  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export function logoutPost(req, res) {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    return res.status(200).json({ message: "Logged out successfully" });
  });
}
