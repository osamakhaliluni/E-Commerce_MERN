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
      return p.productId.toString() === productId;
    });
    if (exists) {
      throw new Error("Product already exists");
    }
    cart.products.push({
      productId,
      quantity,
      price: price ? price : product.price,
    });
    await cart.save();
    return cart;
  } catch (err) {
    throw new Error(`Failed to save product in cart: ${err.message}`);
  }
};

export const updateProduct = async ({ userId, productId, price, quantity }) => {
  try {
    const cart = await getActiveCart({ userId });
    const product = await productModel.findOne({ _id: productId });

    if (!product) {
      throw new Error("Product not found");
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId.toString()
    );

    if (productIndex === -1) {
      throw new Error("Product does not exist in the cart");
    }

    if (product.quantity < quantity) {
      throw new Error("Not enough stock");
    }

    // Update product details
    cart.products[productIndex].quantity = quantity
      ? quantity
      : cart.products[productIndex].quantity;
    cart.products[productIndex].price = price
      ? price
      : cart.products[productIndex].price;

    await cart.save();
    return cart;
  } catch (e) {
    throw new Error(`Failed to update product in the cart: ${e.message}`);
  }
};
