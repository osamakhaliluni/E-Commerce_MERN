import express from "express";
import { register, login } from "../services/userServices.js";

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
    console.error(error);
    return; // Ensure the error is not swallowed by the catch block above. Otherwise, the client might not receive the error message.  // eslint-disable-line no-unreachable-code
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
    console.error(error);
  }
});

export default router;
