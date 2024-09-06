import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

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

export const addProduct = async ({ userId, productId, quantity, price }) => {
  try {
    const cart = await getActiveCart({ userId });
    var product = await productModel.findOne({ _id: productId });
    if (product.quantity < quantity) {
      throw new Error("Not enough stock");
    }
    const exists = cart.products.find((p) => {
      return p.productId.toString() === productId.toString();
    });
    if (exists) {
      exists.quantity += quantity;
    } else {
      cart.products.push({
        productId,
        quantity,
        price: price ? price : product.price,
      });
      await cart.save();
    }
    return cart;
  } catch (err) {
    throw err;
  }
};
