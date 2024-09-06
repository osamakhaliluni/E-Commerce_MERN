import express from "express";
import { addProduct, getActiveCart } from "../services/cartServices.js";
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

router.post("/items", validateJWT, async (req, res) => {
  const userId = req.user._id.toString();
  const { productId, quantity, price } = req.body;
  try {
    const response = await addProduct({ userId, productId, quantity, price });
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
});

export default router;
