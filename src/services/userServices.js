import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async ({ email, name, password }) => {
  const findUser = await userModel.findOne({ email });
  try {
    if (findUser) {
      throw new Error("Email already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ email, name, password: hashPassword });
    await newUser.save();
    console.log("Registration Data:", {
      email: newUser.email,
      name: newUser.name,
      password: newUser.password,
    });
    return generateJWT({
      email: newUser.email,
      name: newUser.name,
      password: newUser.password,
    });
  } catch (error) {
    throw error;
  }
};

export const login = async ({ email, password }) => {
  const user = await userModel.findOne({ email });
  try {
    if (!user) {
      throw new Error("User not found");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Invalid password");
    }
    return generateJWT({ email: user.email, password: user.password });
  } catch (e) {
    throw e;
  }
};

const generateJWT = (data) => {
  return jwt.sign(data, "5Wjk254g$K#Bh5&sz~.>EmHw%DYv/kU|", {
    expiresIn: "5 days",
  });
};
