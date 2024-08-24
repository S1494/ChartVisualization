import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

authSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("authSchema", authSchema);
