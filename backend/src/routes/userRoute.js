import express from "express";
import { register, login, getMyOrders } from "../services/userServices.js";
import validateJWT from "../middlewares/validateJWT.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const token = await register({ name, email, password });
    res
      .status(201)
      .json({ message: "User registered successfully", token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await login({ email, password });
    res
      .status(200)
      .json({ message: "User logged in successfully", token: token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get("/my-orders", validateJWT, async (req, res) => {
  const userId = req.user._id.toString();
  try {
    const orders = await getMyOrders({ userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
    return;
  }
});

export default router;
