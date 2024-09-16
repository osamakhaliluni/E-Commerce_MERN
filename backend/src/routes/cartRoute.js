import express from "express";
import {
  addProductToCart,
  getActiveCart,
  updateProductInCart,
  deleteProductInCart,
  clearCart,
  checkout,
} from "../services/cartServices.js";
import validateJWT from "../middlewares/validateJWT.js";

const router = express.Router();

router.get("/", validateJWT, async (req, res) => {
  const userID = req.user._id.toString();
  console.log(userID);
  try {
    const cart = await getActiveCart({ userId: userID });
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
    return;
  }
});

router.delete("/", validateJWT, async (req, res) => {
  const userId = req.user._id.toString();
  try {
    const response = await clearCart({ userId });
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
    return;
  }
});

router.post("/items", validateJWT, async (req, res) => {
  const userId = req.user._id.toString();
  const { productId, quantity, price } = req.body;
  try {
    const response = await addProductToCart({
      userId,
      productId,
      quantity,
      price,
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
    return;
  }
});

router.put("/items", validateJWT, async (req, res) => {
  const userId = req.user._id.toString();
  const { productId, quantity, price } = req.body;
  try {
    const response = await updateProductInCart({
      userId,
      productId,
      quantity,
      price,
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/items/:productId", validateJWT, async (req, res) => {
  const userId = req.user._id.toString();
  const { productId } = req.params;
  try {
    const response = await deleteProductInCart({ userId, productId });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/checkout", validateJWT, async (req, res) => {
  const userId = req.user._id.toString();
  const { address } = req.body;
  try {
    const response = await checkout({ userId, address });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
