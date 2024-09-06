import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const validateJWT = (req, res, next) => {
  const authorizationHeader = req.get("authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Authorization not provided" });
  }
  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  jwt.verify(
    token,
    "5Wjk254g$K#Bh5&sz~.>EmHw%DYv/kU|",
    async (err, payload) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      if (!payload) {
        return res.status(401).json({ message: "User not found" });
      }
      const user = await userModel.findOne({ email: payload.email });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;
      next();
    }
  );
};

export default validateJWT;
