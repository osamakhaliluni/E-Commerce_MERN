import express from "express";
import { getActiveCart } from "../services/cartServices.js";
import validateJWT from "../middlewares/validateJWT.js";

const router = express.Router();

router.get("/", validateJWT, async (req, res) => {
  const userID = req.user._id.toString();
  console.log(userID);
  try {
    const cart = await getActiveCart({ userId: userID });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
});

export default router;
