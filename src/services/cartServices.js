import cartModel from "../models/cartModel.js";

const createCart = async (userId) => {
  try {
    var cart = await cartModel.create({ userId });
    cart.save();
    return cart;
  } catch (err) {
    throw err;
  }
};

export const getActiveCart = async ({ userId }) => {
  try {
    const cart = await cartModel.findOne({ userId, status: "active" });
    if (!cart) {
      cart = await createCart(userId);
    }
    return cart;
  } catch (err) {
    throw err;
  }
};
