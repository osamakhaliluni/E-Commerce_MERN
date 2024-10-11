import cartModel from "../models/cartModel.js";
import orderModel from "../models/orderModel.js";
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

export const clearCart = async ({ userId }) => {
  try {
    const cart = await getActiveCart({ userId });
    cart.products = [];
    cart.totalPrice = 0;
    cart.save();
    return cart;
  } catch (err) {
    throw new Error(`Failed to clear Cart: ${err.message}`);
  }
};

export const addProductToCart = async ({
  userId,
  productId,
  quantity,
  price,
}) => {
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
      title: product.title,
      image: product.image,
      description: product.description,
      category: product.category,
      price: price ? price : product.price,
    });
    cart.totalPrice += price * quantity;

    await cart.save();
    return cart;
  } catch (err) {
    throw new Error(`Failed to save product in cart: ${err.message}`);
  }
};

export const updateProductInCart = async ({
  userId,
  productId,
  price,
  quantity,
}) => {
  try {
    const cart = await getActiveCart({ userId });
    const product = await productModel.findOne({ _id: productId });

    if (!product) {
      throw new Error("Product not found");
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      throw new Error("Product does not exist in the cart");
    }

    if (product.quantity < quantity) {
      throw new Error("Not enough stock");
    }

    cart.totalPrice -=
      cart.products[productIndex].price * cart.products[productIndex].quantity;

    cart.products[productIndex].quantity = quantity
      ? quantity
      : cart.products[productIndex].quantity;
    cart.products[productIndex].price = price
      ? price
      : cart.products[productIndex].price;

    cart.totalPrice +=
      cart.products[productIndex].price * cart.products[productIndex].quantity;

    await cart.save();
    return cart;
  } catch (e) {
    throw new Error(`Failed to update product in the cart: ${e.message}`);
  }
};

export const deleteProductInCart = async ({ productId, userId }) => {
  try {
    const cart = await getActiveCart({ userId });
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex === -1) {
      throw new Error("Product not found in the cart");
    }
    cart.totalPrice -=
      cart.products[productIndex].price * cart.products[productIndex].quantity;

    cart.products.splice(productIndex, 1);
    await cart.save();
    return cart;
  } catch (e) {
    throw new Error(`Failed to delete product from the cart: ${e.message}`);
  }
};

export const checkout = async ({ userId, address }) => {
  try {
    if (!address) {
      throw new Error("Address is required");
    }

    const cart = await getActiveCart({ userId });
    if (cart.products.length === 0) {
      throw new Error("Cart is empty");
    }

    for (const product of cart.products) {
      const productInStock = await productModel.findOne({
        _id: product.productId,
      });
      if (!productInStock) {
        throw new Error(`Product with ID ${product.productId} not found`);
      }
      if (productInStock.quantity < product.quantity) {
        throw new Error(
          `Not enough stock for product: ${productInStock.title}`
        );
      }
    }

    for (const product of cart.products) {
      await productModel.findByIdAndUpdate(
        product.productId,
        { $inc: { quantity: -product.quantity } },
        { new: true }
      );
    }

    const productList = await Promise.all(
      cart.products.map(async (product) => {
        const pro = await productModel.findOne({ _id: product.productId });
        if (!pro) {
          throw new Error(`Product with ID ${product.productId} not found`);
        }
        return {
          title: pro.title,
          image: pro.image,
          price: product.price,
          quantity: product.quantity,
        };
      })
    );

    const order = await orderModel.create({
      userId,
      products: productList,
      totalPrice: cart.totalPrice,
      status: "pending",
      address: address,
    });

    cart.totalPrice = 0;
    cart.products = [];
    cart.status = "complete";
    await cart.save();

    return order;
  } catch (e) {
    throw new Error(`Failed to checkout: ${e.message}`);
  }
};
