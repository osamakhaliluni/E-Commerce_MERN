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
});

export const useCart = () => useContext(CartContext);
