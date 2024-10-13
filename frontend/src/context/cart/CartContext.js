import { createContext, useContext } from "react";

export const CartContext = createContext({
  cartItems: [
    {
      id: null,
      title: null,
      price: null,
      quantity: null,
      image: null,
    },
  ],
  totalPrice: null,
  addItemToCart: () => {},
  updateItemInCart: () => {},
  removeItemFromCart: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);
